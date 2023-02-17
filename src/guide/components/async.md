# المكونات الغير متزامنة {#async-components}

## الاستخدام الأساسي {#basic-usage}

في التطبيقات الكبيرة ، قد نحتاج إلى تقسيم التطبيق إلى أجزاء أصغر وتحميل مكون من الخادم عند الحاجة. لجعل ذلك ممكنًا ، تحتوي Vue على دالة 
[`defineAsyncComponent`](/api/general.html#defineasynccomponent) من أجل إنشاء مكون جديد

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ... تحميل المكون من الخادم
    resolve(/* المكون المُحمل */)
  })
})
// ... استخدم `AsyncComp` مثل مكون عادي
```
كما تري , `defineAsyncComponent` يقبل وظيفة أداة التحميل (Loader Function) والتي ترجع وعداً (Promise) . رد الوعد `resolve` يجب استدعائه عندما يتم استرجاع المكون الخاص بك من الخادم . يمكنك ايضاً إستدعاء الرفض `reject(reason)` للإشارة إلي فشل التحميل


[ES module dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) أيضاً يرجع وعداً (Promise), لذالك سنستحدمه في معظم الأوقات مع `defineAsyncComponent` . تدعم حزم مثل Vite و Webpack البنية أيضًا (وستستخدمها كنقاط تقسيم للحزمة), حتى نتمكن من استخدامه لاستيراد Vue SFCs:


```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```
النتيجة `AsyncComp` هو عبارة عن مكون مُغلف يستدعي وظيفة أداة التحميل فقط عندما يتم عرضها فعليًا على الصفحة. بالإضافة إلي ذالك , سيتم تمرير أي الخاصيات (Props) او منافذ (Slots) إلي المكون الداخلي , لذالك يمكنك استخدام الغُلاف غير المتزامن (Async Wrapper) لأستبدال المكون الأب أثناء التحميل البطئ (Lazy Loading) بسلاسة.


 المكونات الغير متزامنة يمكن ان يتم تسجيلها [بشكل عام](/guide/components/registration.html#global-registration) مثل المكونات العادية , بإستخدام `app.component()`:


```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

<div class="options-api">

يمكنك أيضاً إستخدام `defineAsyncComponent` عند [تسجيل المكون بشكل محلي](/guide/components/registration.html#local-registration):

```vue
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

</div>

<div class="composition-api">

يمكن أيضًا تعريفها مباشرة داخل المكون الرئيسي الخاص بها:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

</div>

## حالات التحميل و الخطأ {#loading-and-error-states}

تتضمن العمليات غير المتزامنة حتمًا حالات التحميل والخطأ `defineAsyncComponent()`
يدعم التعامل مع هذه الحالات عبر الخيارات المتقدمة:

```js
const AsyncComp = defineAsyncComponent({
  // وظيفة أداة التحميل
  loader: () => import('./Foo.vue'),

  // مكون لكي يتم إستخدامه أثناء تحميل المكون غير المتزامن (Async Component)
  loadingComponent: LoadingComponent,

  // التأخير قبل إظهار مكون التحميل. الافتراضي: 200 مللي ثانية.
  delay: 200,

  // مكون لاستخدامه في حالة فشل التحميل
  errorComponent: ErrorComponent,
  // سيتم عرض مكون الخطأ إذا كانت المهلة المقدمة تجاوزت
  // الافتراضي: ما لا نهاية
  timeout: 3000
})
```

إذا تم توفير مكون التحميل (Loading Component) ، فسيتم عرضه أولاً أثناء تحميل المكون الداخلي. يوجد تأخير افتراضي يبلغ 200 مللي ثانية قبل عرض مكون التحميل - وهذا لأنه في الأنترنت السريع ، قد يتم استبدال حالة التحميل بسرعة كبيرة وينتهي بها الأمر وكأنها وميض.

إذا تم توفير مكون خطأ (Error Component)، فسيتم عرضه عند رفض الوعد الذي أرجعته وظيفة أداة التحميل . يمكنك أيضًا تحديد مهلة (Timeout) لعرض مكون الخطأ عندما يستغرق الطلب وقتًا طويلاً.

## الاستخدام مع Suspense {#using-with-suspense}

المكونات غير متزامنة يمكن ان تستخدم مع المكون المدمج `<Suspense>` .  تم توثيق التفاعل بين 
`<Suspense>` و المكونات الغير متزامنة في [الفصل المخصص `<Suspense>`](/guide/built-ins/suspense.html).

