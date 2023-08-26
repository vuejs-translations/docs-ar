# المكون Teleport {#teleport}

 <VueSchoolLink href="https://vueschool.io/lessons/vue-3-teleport" title="فيديو حول المكون Teleport"/>

`<Teleport>` هو مكون مدمج يسمح لنا بـ "نقل" جزء من قالب مكون معين إلى عنصر DOM موجودة خارج التسلسل المتداخل للـDOM لهذا المكون.

## الاستخدام الأساسي {#basic-usage}

في بعض الأحيان ، قد نواجه السيناريو التالي: جزء من قالب مكون معين ينتمي من ناحية منطقية إلى المكون ، ولكن من ناحية مظهرية ، يجب عرضه في مكان آخر في DOM ، خارج تطبيق Vue.

المثال الأكثر شيوعا لهذا هو عند بناء نافذة منبثقة تغطي الشاشة. من المفضل أن نريد أن ينتمي زر النافذة المنبثقة والنافذة نفسها في نفس المكون، لأنهما يتعلقان بحالة الفتح / الإغلاق للنافذة المنبثقة. ولكن هذا يعني أن النافذة ستعرض مع زرها، وهي عميقة في تسلسل التداخل في DOM التطبيق. يمكن أن تنشأ بعض المشاكل الصعبة عند تحديد موضع للنافذة من خلال CSS.

لنعتبر هيكل  الـ HTML التالي:

```vue-html
<div class="outer">
  <h3>مثال للمكون Teleport  في Vue</h3>
  <div>
    <MyModal />
  </div>
</div>
```

وهنا الشيفرةالتنفيذية للمكون `<MyModal>`:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">فتح النافذة المنبثقة</button>

  <div v-if="open" class="modal">
     <p>مرحبا من داخل النافذة المنبثقة</p>
    <button @click="open = false">غلق</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<template>
  <button @click="open = true"> افتح النافذة المنبثقة</button>

  <div v-if="open" class="modal">
    <p>مرحبا من داخل النافذة المنبثقة</p>
    <button @click="open = false">غلق</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>

المكون يحتوي على زر `<button>` لتشغيل فتح النافذة المنبثقة ، وعنصر `<div>` مع اسم الصنف `modal.` ، والذي سيحتوي على محتوى النافذة المنبثقة وزر لإغلاقها.

عند استخدام هذا المكون داخل الهيكل الأولي للـ HTML ، فإنه يوجد عدد من المشاكل المحتملة:

- `position: fixed` يحدد فقط وضعية العنصر بالنسبة لإطار الصفحة المعروض عندما لا يحتوي أي عنصر أب على خاصية `transform` ، `perspective` أو `filter`. إذا، مثلا، كنا ننوي تحريك العنصر الأصلي `<"div class="outer>` مع خاصية التحويل الخاصة بـCSS ، فسيؤدي ذلك إلى فشل تحديد نسق النافذة المنبثقة!


- `z-index` الخاص بالنافذة المنبثقة محدود بواسطة عناصرها الحاوية. إذا كان هناك عنصر آخر يتداخل مع `<"div class="outer>` وله `z-index` أعلى ، فسيغطي العنصر الآخر النافذة المنبثقة.

يوفر المكون `<Teleport>` طريقة نظيفة لحل هذه المشاكل ، حيث يسمح لنا بالخروج من الهيكل DOM المتداخل. دعونا نعدل `<MyModal>` لاستخدام `<Teleport>`:

```vue-html{3,8}
<button @click="open = true"> افتح النافذة المنبثقة</button>

<div v-if="open" class="modal">
  <p>مرحبا من داخل النافذة المنبثقة</p>
  <button @click="open = false">غلق</button>
</div>
```

قيمة الخاصية `to` للمكون Teleport هي عبارة عن سلسلة نصية تحتوي على محدد CSS أو عنصر HTML ، هنا نقول بشكل أساسي لـVue  "**انقل**  (teleport) هذا الجزء من القالب و قم بوصله بعنصر Body"

يمكنك الضغط على الزر أدناه وفحص عنصر `<body>` عبر أدوات التطوير و التحكم في المتصفح:

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo">
  <button @click="open = true"> افتح النافذة المنبثقة</button>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="open" class="demo modal-demo">
        <p style="margin-bottom:20px">مرحبا من داخل النافذة المنبثقة</p>
        <button @click="open = false">غلق</button>
      </div>
    </Teleport>
  </ClientOnly>
</div>

<style>
.modal-demo {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: var(--vt-c-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>

يمكن دمج `<Teleport>` مع [`<Transition>`](./transition) لإنشاء نوافذ منبثقة متحركة - انظر [المثال هنا](/examples/#modal).

:::tip ملاحظة 
قيمة الخاصية `to` للمكون Teleport يجب أن تكون موجودة بالفعل في DOM عند وصل المكون `<Teleport>` . من المفضل أن تكون عنصر HTML خارج تطبيق Vue بأكمله. إذا كنت تستهدف عنصر آخر مصير من قبل Vue ، فيجب عليك التأكد من أن العنصر موصول قبل وصل `<Teleport>`.
:::

## الاستخدام مع المكونات {#using-with-components}

`<Teleport>` تغير فقط الهيكل DOM المعروض - و لا يؤثر على الترتيب المنطقي للمكونات. و هذا يعني أنه إذا كان `<Teleport>` يحتوي على مكون ، فسيبقى هذا المكون ابنا منطقياً للمكون الأب الذي يحتوي على `<Teleport>`. سيظل تمرير الخصائص و إرسال الأحداث على نفس الطريقة.

هذا يعني أيضاً أن عملية الحقن من المكون الأب تعمل كما هو متوقع، و أن المكون الابن سيكون مدرجا تحت المكون الأب مباشرة في أدوات التطوير و التحكم لـVue ، بدلاً من وضعه حيث يُنقل المحتوى الفعلي إليه.

## تعطيل المكون Teleport {#disabling-teleport}

في بعض الحالات ، قد نرغب في تعطيل `<Teleport>` بشكل شرطي. على سبيل المثال ، قد نرغب في تقديم مكون كطبقة تغطية لسطح المكتب ، ولكن مضمنًا على الهاتف المحمول. يدعم `<Teleport>` خاصية `disabled` التي يمكن تبديلها بشكل ديناميكي:

```vue-html
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

حيث يمكن تحديث حالة `isMobile` بشكل ديناميكي عن طريق تتبع تغييرات استعلامات الوسائط.

## مكونات Teleport على نفس العنصر {#multiple-teleports-on-the-same-target}

حالة استخدام شائعة قد تكون عبارة عن مكون `<Modal>` قابل لإعادة الاستخدام، مع إمكانية وجود عدة نسخ نشطة منه في نفس الوقت. في هذا السيناريو، يمكن لعدة مكونات `<Teleport>` وصل محتوياتها على نفس العنصر الهدف. سيكون الترتيب ببساطة عبارة عن تذييل للمكونات داخله- ستكون الوصلات الأحدث موجودة بعد الوصلات الأقدم داخل العنصر الهدف.

ليكن الاستخدام الموالي

```vue-html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```


ستكون النتيجة المصيرة كالتالي:

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

---

**ذات صلة**

- [`<Teleport>` مرجع الواجهة البرمجية للمكون](/api/built-in-components#teleport)
- [معالجة Teleports  في حالة التصيير من جانب الخادم SSR](/guide/scaling-up/ssr#teleports)
