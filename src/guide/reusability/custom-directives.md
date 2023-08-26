# المُوجِّهات المخصصة {#custom-directives}

<script setup>
const vFocus = {
  mounted: el => {
    el.focus()
  }
}
</script>

## مقدمة {#introduction}

بالإضافة إلى مجموعة من الموجهات الافتراضية المتوفرة المدمجة مع الإطار (مثل `v-model` أو `v-show`) ، تسمح لك Vue أيضًا بتسجيل موجهات مخصصة خاصة بك.

لقد أدرجنا شكلين من أشكال إعادة استخدام الشيفرة في Vue: [المكونات](/guide/essentials/component-basics) و [composables](./composables). المكونات هي البنية الرئيسية ، في حين أن composables متميزة في إعادة استخدام منطق حالة المكون. الموجهات المخصصة ، بدورها، تهدف في الغالب إلى إعادة استخدام منطق يتضمن وصول متدني المستوى إلى الـDOM  على عناصر عادية.

مُوجهة مخصصة تُعرَّف ككائن يحتوي على مراحل حياة مشابهة لما تحتويه المكونات. تتلقى دوال مراحل الحياة  العنصر الذي عُينت الموجهة عليه. هذا مثال على موجهة تركز على  إدخال عندما يُدرج العنصر في DOM بواسطة Vue:

<div class="composition-api">

```vue
<script setup>
//تمكين v-focus في القوالب
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    //تمكين v-focus في القوالب
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

<div class="demo">
  <input v-focus placeholder="هذا العنصر سيركز عليه" />
</div>

في حالة عدم النقر في أي مكان آخر على الصفحة ، يجب أن يكون الإدخال أعلاه مركزًا عليه تلقائيًا. هذه الموجهة أكثر فائدة من السمة `autofocus` لأنها تعمل ليس فقط عند تحميل الصفحة - بل تعمل أيضًا عند إدراج العنصر بشكل ديناميكي من قبل Vue.

<div class="composition-api">

في `<script setup>` ، يمكن استخدام أي متغير camelCase يبدأ بالبادئة `v` كموجهة مخصصة. في المثال أعلاه ، يمكن استخدام `vFocus` في القالب كـ `v-focus`.

في حالة عدم استخدام `<script setup>` ، يمكن تسجيل الموجهات المخصصة باستخدام خيار `directives`:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    //تمكين v-focus في القوالب
    focus: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

مثل المكونات ، يجب تسجيل الموجهات المخصصة حتى يمكن استخدامها في القوالب. في المثال أعلاه ، نستخدم التسجيل المحلي عبر خيار `directives`.

</div>

من الشائع أيضًا تسجيل الموجهات المخصصة على مستوى التطبيق بشكل عام:

```js
const app = createApp({})

// جعل v-focus متاحًا في جميع المكونات
app.directive('focus', {
  /* ... */
})
```

:::tip ملاحظة
يجب استخدام الموجهات المخصصة فقط عندما يمكن الوصول إلى الوظائف المطلوبة فقط عن طريق التحكم المباشر في DOM. يجب تفضيل القوالب التصريحية باستخدام الموجهات المدمجة مثل `v-bind` عند الإمكان لأنها أكثر كفاءة و ملاءمة للتصيير من جانب الخادم.
:::

## خطافات الموجهة {#directive-hooks}

يمكن لكائن تعريف الموجهة توفير عدة دوال خطافة (كلها اختيارية):

```js
const myDirective = {
  //تستدعى قبل تطبيق سمات 
  // العنصر المرتبطة أو مستمعي الحدث
  created(el, binding, vnode, prevVnode) {
    // انظر أدناه للحصول على تفاصيل الوسيط
  },
  // تستدعى مباشرة قبل إدراج العنصر في DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // تستدعى عندما يوصَّل المكون 
  // الأب وجميع أبنائه المرتبطين بالعنصر.
  mounted(el, binding, vnode, prevVnode) {},
  // تستدعى قبل تحديث المكون الأب
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // تستدعى بعد تحديث 
  // المكون الأب وجميع أبنائه
  updated(el, binding, vnode, prevVnode) {},
  // تستدعى قبل فصل المكون الأب
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // تستدعى عند فصل المكون الأب
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### وسائط دوال الخطافات {#hook-arguments}

مررت دوال الخطافات الوسائط التالية:

- `el`: العنصر المرتبط بالموجهة. يمكن استخدامه للتحكم المباشر في DOM. 

- `binding`: كائن يحتوي على الخصائص التالية.

  - `value`: القيمة الممررة إلى الموجهة. على سبيل المثال في `"v-my-directive="1 + 1`, ستكون القيمة `2`. 
  - `oldValue`: القيمة السابقة، متاحة فقط في `beforeUpdate` و `updated`. متاحة سواء تغيرت القيمة أم لا. 
  -  `arg`: الوسيط الممرر إلى الموجهة، إذا كان موجودًا. على سبيل المثال في `v-my-directive:foo`, سيكون الوسيط `"foo"`.
  - `modifiers`: كائن يحتوي على المعدلات، إذا كانت موجودة. على سبيل المثال في `v-my-directive.foo.bar`, سيكون كائن المعدلات `{ foo: true, bar: true }`.
  - `instance`:  نسخة المكون حيث تستخدم الموجهة.
  - `dir`: كائن تعريف الموجهة.

- `vnode`: VNode الأساسي يمثل العنصر المرتبط.
- `prevNode`: VNode يمثل العنصر المرتبط من التصيير السابق. متاح فقط في `beforeUpdate` و `updated`.

كمثال، لنعتبر استخدام الموجهة التالي:

```vue-html
<div v-example:foo.bar="baz">
```

سيكون كائن الوسيط `binding` بالشكل التالي:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* قيمة `baz` */,
  oldValue: /* قيمة `baz` من التحديث السابق */
}
```

مثل الموجهات المدمجة، يمكن أن تكون وسائط الموجهات المخصصة ديناميكية. على سبيل المثال:

```vue-html
<div v-example:[arg]="value"></div>
```

سيُحدَّث وسيط الموجهة بشكل تفاعلي وفقًا لخاصية `arg` في حالة المكون.

:::tip ملاحظة 
باستثناء `el`، يجب عليك التعامل مع هذه الوسائط كقراءة فقط ولا تقم بتعديلها. إذا كنت بحاجة إلى مشاركة المعلومات عبر الخطافات، فننصحك بالقيام بذلك من خلال [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) للعنصر.
:::

## اختصار الدالة {#function-shorthand}

من الشائع أن يكون للموجهة المخصصة نفس السلوك فقط بخطافات `mounted` و `updated`، بدون حاجة للخطافات الأخرى. في هذه الحالات، يمكننا تعريف الموجهة كدالة:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // هذا سيستدعى لكل من `mounted` و `updated`
  el.style.color = binding.value
})
```

##  الكائنات المجردة {#object-literals}

إذا كانت الموجهة الخاصة بك تحتاج إلى عدة قيم، يمكنك أيضًا إرسال كائن مجرد JavaScript. تذكر أنه يمكن للموجهات أن تأخذ أي تعبير JavaScript سليم.

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## الاستخدام على المكونات {#usage-on-components}

عند استخدامها على المكونات، ستطبق الموجهات المخصصة دائمًا على العنصر الجذري للمكون، مثل [السمات المستترة](/guide/components/attrs).

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- قالب MyComponent -->

<div><!-- سيتم تطبيق الموجهة v-demo هنا -->
  <span>محتوى المكون</span>
</div>
```

تجدر الملاحظة أن المكونات قد تحتوي على أكثر من عنصر جذري. عند تطبيقها على مكون متعدد الأجزاء، سيتجاهل المصرف الموجهة وسيطلق تحذير. على عكس السمات، لا يمكن تمرير الموجهات إلى عنصر مختلف باستخدام `v-bind="$attrs"`. عمومًا، **لا** ينصح باستخدام الموجهات المخصصة على المكونات.
