---
outline: deep
---

# مكون Suspense {#suspense}

:::warning ميزة تجريبية
`<Suspense>` هي ميزة تجريبية. لا يتم ضمان الوصول إلى حالة مستقرة وقد تتغير واجهتها البرمجية قبل ذلك.
:::

`<Suspense>` هو مكون مدمج لتنظيم الاعتماديات اللاتزامنية في شجرة المكونات. يمكنه تصيير حالة التحميل أثناء انتظار تحميل عدة اعتماديات لاتزامنية متداخلة في شجرة المكونات.

## الاعتماديات اللاتزامنية {#async-dependencies}

لشرح المشكلة التي يحاول حلها `<Suspense>` وكيفية تفاعله مع هذه الاعتماديات اللاتزامنية ، فلنتخيل هيكلية مكونات كالتالي:

```
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus> (مكون مع async setup())
   └─ <Content>
      ├─ <ActivityFeed> (async component)
      └─ <Stats> (async component)
```

في شجرة المكونات ، هناك عدة مكونات متداخلة التي تعتمد على تحميل بعض الموارد اللاتزامنية أولاً. بدون `<Suspense>` ، سيحتاج كل منهم إلى معالجة الحالة أثناء تحميله / خطأه والحالة بعد تحميله. في أسوأ سيناريو، قد نرى ثلاثة عجلات تحميل على الصفحة، مع عرض المحتوى في أوقات مختلفة.

يمنحنا مكون `<Suspense>` القدرة على عرض حالات التحميل / الخطأ على المستوى الأعلى أثناء انتظار تحميل هذه الاعتماديات اللاتزامنية المتداخلة.

هناك نوعان من الاعتماديات اللاتزامنية التي يمكن لـ `<Suspense>` انتظارهما:

1. المكونات التي تحتوي على `()setup` لاتزامني. يشمل ذلك المكونات التي تستخدم `<script setup>` مع التعبيرات `await` على المستوى الأعلى.

2. [المكونات اللاتزامنية](/guide/components/async).

### دالة `async setup()` {#async-setup}

في الواجهة التركيبية يمكن أن تكون الدالة `()setup` داخل المكون لاتزامنية:

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

إذا كنت تستخدم `<script setup>` ، فسيجعل تواجد التعبيرات `await` على المستوى الأعلى المكون اعتمادية لاتزامنية بشكل تلقائي:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

### المكونات اللاتزامنية {#async-components}

المكونات اللاتزامنية هي ** "قابلة للتعليق" ** افتراضيًا. وهذا يعني أنه إذا كان لديه `<Suspense>` في سلسلة المكونات الأباء ، فسيعامل كاعتمادية لاتزامنية لـذلك `<Suspense>` . في هذه الحالة ، سيُتحكم في حالة التحميل من قبل `<Suspense>` ، وستُتجاهل خيارات تحميل المكون ، وخطأه ، وتأخيره ومهلته.

المكونات اللاتزامنية يمكن أن تكون أيضًا **"غير قابلة للتعليق"**. في هذه الحالة ، سنتجاهلها من قبل `<Suspense>` وستتحكم في حالة التحميل بنفسها. يمكنك تحديد `suspensible: false` في خيارات المكون لتعطيل التعليق.

## حالة التحميل {#loading-state}

المكون `<Suspense>` لديه منفذين: `default#` و `fallback#`. يسمح كلا المنفذين  بعنصر ابن مباشر **واحد** فقط. يُعرض العنصر في المنفذ الافتراضي إذا كان ذلك ممكنًا. إذا لم يكن ذلك ممكنًا ، سيُعرض العنصر في منفذ الاحتياط بدلاً من ذلك.

```vue-html
<Suspense>
  <!-- مكون مع اعتماديات لاتزامنية متداخلة -->
  <Dashboard />

  <!-- حالة التحميل عبر منفذ الاحتياط -->
  <template #fallback>
    تحميل...
  </template>
</Suspense>
```

عند التصيير الأولي ، سيقوم `<Suspense>` بتصيير محتوى منفذه الافتراضي في الذاكرة. إذا عُثر على أي اعتماديات لاتزامنية أثناء العملية، سيدخل حالة **انتظار**. خلال هذه الحالة، سيُعرض المحتوى الاحتياطي. عندما تُحمل جميع الاعتماديات اللاتزامنية التي عُثر عليها ، سيدخل `<Suspense>` حالة **محلولة** وسيُعرض محتوى المنفذ الافتراضي المحلول.

إذا لم يُعثر على اعتماديات لاتزامنية أثناء التصيير الأولي، سيذهب `<Suspense>` مباشرة إلى حالة محلولة.

بمجرد الوصول إلى الحالة المحلولة ، سيعود `<Suspense>` إلى حالة الانتظار فقط إذا استبدل العنصر الجذري في المنفذ `default#` . لن تؤدي اعتماديات لاتزامنية جديدة متداخلة بشكل أعمق في الشجرة إلى إعادة `<Suspense>` إلى حالة الانتظار.

عندما تحدث الإعادة، لن يُعرض المحتوى الاحتياطي على الفور. بدلاً من ذلك ، سيعرض `<Suspense>` المحتوى الافتراضي السابق أثناء الانتظار لتصيير المحتوى الافتراضي الجديد واعتمادياته اللاتزامنية. يمكن تكوين هذا السلوك باستخدام خاصية `timeout` المتوفرة: `<Suspense>` سيتغير إلى المحتوى الاحتياطي إذا استغرق أكثر من الزمن المحدد في `timeout` لتصيير المحتوى الافتراضي الجديد. ستؤدي القيمة `0` لـ`timeout` إلى عرض المحتوى الاحتياطي على الفور عند استبدال المحتوى الافتراضي.

## الأحداث {#events}

المكون `<Suspense>` يُصدر 3 أحداث: `pending` ، `resolve` و `fallback`. يشتغل الحدث `pending` عند دخول حالة الانتظار. يُرسل الحدث `resolve` عندما يُنتهى من تحليل المحتوى الجديد في المنفذ `default`. يُطلق الحدث `fallback` عندما تُعرض محتويات منفذ `fallback`.

الأحداث يمكن استخدامها، على سبيل المثال، لإظهار مؤشر تحميل على الـDOM القديم أثناء تحميل المكونات الجديدة.

## معالجة الأحداث {#error-handling}

`<Suspense>` لا يوفر حاليًا معالجة الأخطاء عبر المكون نفسه - ومع ذلك ، يمكنك استخدام خيار [`errorCaptured`](/api/options-lifecycle#errorcaptured) أو [`()onErrorCaptured`](/api/composition-api-lifecycle#onerrorcaptured) لالتقاط ومعالجة الأخطاء اللاتزامنية في المكون الأب لـ `<Suspense>`.

## الدمج مع مكونات أخرى {#combining-with-other-components}

من الشائع أن ترغب في استخدام `<Suspense>` بالتزامن مع مكونات [`<Transition>`](./transition) و [`<KeepAlive>`](./keep-alive).  ترتيب التداخل لهذه المكونات مهم جدا للحصول على اشتغالها بشكل صحيح.

بالإضافة إلى ذلك ، تُستخدم هذه المكونات بالتزامن مع المكون `<RouterView>` من [Vue Router](https://router.vuejs.org/).

المثال التالي يوضح كيفية التداخل بين هذه المكونات حتى تتصرف كل منها كما هو متوقع. للتركيبات الأكثر بساطة ، يمكنك إزالة المكونات التي لا تحتاج إليها:

```vue-html
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- المحتوى الرئيسي -->
          <component :is="Component"></component>

          <!-- حالة التحميل -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```

يحتوي Vue Router على دعم داخلي لـ[تحميل المكونات بطريقة خاملة](https://router.vuejs.org/guide/advanced/lazy-loading.html) باستخدام استيرادات ديناميكية. هذه مختلفة عن المكونات اللاتزامنية وحاليًا لن تتسبب في تشغيل `<Suspense>` . ومع ذلك ، لا يزال بإمكانهم الحصول على مكونات غير متزامنة كأبتاء ويمكن لتلك العناصر تشغيل `<Suspense>` بالطريقة المعتادة.

## Nested Suspense {#nested-suspense}

- Only supported in 3.3+

When we have multiple async components (common for nested or layout-based routes) like this:

```vue-html
<Suspense>
  <component :is="DynamicAsyncOuter">
    <component :is="DynamicAsyncInner" />
  </component>
</Suspense>
```

`<Suspense>` creates a boundary that will resolve all the async components down the tree, as expected. However, when we change `DynamicAsyncOuter`, `<Suspense>` awaits it correctly, but when we change `DynamicAsyncInner`, the nested `DynamicAsyncInner` renders an empty node until it has been resolved (instead of the previous one or fallback slot).

In order to solve that, we could have a nested suspense to handle the patch for the nested component, like:

```vue-html
<Suspense>
  <component :is="DynamicAsyncOuter">
    <Suspense suspensible> <!-- this -->
      <component :is="DynamicAsyncInner" />
    </Suspense>
  </component>
</Suspense>
```

If you don't set the `suspensible` prop, the inner `<Suspense>` will be treated like a sync component by the parent `<Suspense>`. That means that it has its own fallback slot and if both `Dynamic` components change at the same time, there might be empty nodes and multiple patching cycles while the child `<Suspense>` is loading its own dependency tree, which might not be desirable. When it's set, all the async dependency handling is given to the parent `<Suspense>` (including the events emitted) and the inner `<Suspense>` serves solely as another boundary for the dependency resolution and patching.

---

**Related**

- [`<Suspense>` API reference](/api/built-in-components#suspense)
