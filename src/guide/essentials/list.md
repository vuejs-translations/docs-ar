# تصيير القوائم {#list-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/list-rendering-in-vue-3" title="درس Vue.js مجاني حول تصيير القوائم"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-list-rendering-in-vue" title="درس Vue.js مجاني حول تصيير القوائم"/>
</div>

## `v-for` {#v-for}

يمكنك استخدام السمة الموجهة `v-for` لتصيير قائمة من العناصر بناءً على مصفوفة. تتطلب السمة  `v-for` صيغة خاصة على شكل `item in items`، حيث `items` هو مصدر بيانات المصفوفة و `item` هو **الاسم المستعار** لعنصر المصفوفة الذي يتكرر في العملية:

<div class="composition-api">

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>

<div class="options-api">

```js
data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="item in items">
  {{ item.message }}
</li>
```

في داخل نطاق `v-for`،  تعبيرات القالب يمكنها الوصول إلى جميع خاصيات النطاق الأب. بالإضافة إلى ذلك، يدعم `v-for` أيضًا اسم بديل اختياري ثان يعمل كمؤشر للعنصر الحالي :

<div class="composition-api">

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>
<div class="options-api">

```js
data() {
  return {
    parentMessage: 'الأب',
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

<script setup>
const parentMessage = 'الأب'
const items = [{ message: 'Foo' }, { message: 'Bar' }]
</script>
<div class="demo">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</div>

<div class="composition-api">

[اختبرها على حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcGFyZW50TWVzc2FnZSA9IHJlZignUGFyZW50JylcbmNvbnN0IGl0ZW1zID0gcmVmKFt7IG1lc3NhZ2U6ICdGb28nIH0sIHsgbWVzc2FnZTogJ0JhcicgfV0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8bGkgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGl0ZW1zXCI+XG4gIFx0e3sgcGFyZW50TWVzc2FnZSB9fSAtIHt7IGluZGV4IH19IC0ge3sgaXRlbS5tZXNzYWdlIH19XG5cdDwvbGk+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[اختبرها على حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgcGFyZW50TWVzc2FnZTogJ1BhcmVudCcsXG4gICAgXHRpdGVtczogW3sgbWVzc2FnZTogJ0ZvbycgfSwgeyBtZXNzYWdlOiAnQmFyJyB9XVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGxpIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBpdGVtc1wiPlxuICBcdHt7IHBhcmVudE1lc3NhZ2UgfX0gLSB7eyBpbmRleCB9fSAtIHt7IGl0ZW0ubWVzc2FnZSB9fVxuXHQ8L2xpPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

النطاق المتغير لـ `v-for` مشابه لشيفرة الـJavaScript التالية:

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  //  لديها وصول إلى النطاق الخارجي 
  // `parentMessage`
  // لكن 
  // `item` و `index` 
  // متوفرة فقط هنا
  console.log(parentMessage, item.message, index)
})
```

تجدر الإشارة إلى أن قيمة `v-for` تتطابق مع وسائط دالة رد النداء لـ `forEach` . في الواقع ، يمكنك استخدام التفكيك على مسمى عنصر `v-for` مماثلًا لتفكيك معطيات الدالة :

```vue-html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- مع الاسم البديل للمؤشر -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```
بالنسبة لـ `v-for` المتداخلة، يعمل النطاق أيضًا مثل حالة الدوال المتداخلة. لدى كل نطاق `v-for` إمكانية الوصول إلى النطاقات الأب :

```vue-html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

يمكنك أيضا استخدام `of` كفاصل بدلا من `in`، بحيث أنها أقرب الى صيغة المُكرِّرات في الـJavascript :

```vue-html
<div v-for="item of items"></div>
```

## `v-for` مع كائن {#v-for-with-an-object}

يمكنك أيضا استخدام `v-for` للمرور عبر خاصيات الكائن. سيكون ترتيب المرور على أساس نتيجة استدعاء الدالة `()Object.keys` على الكائن :

<div class="composition-api">

```js
const myObject = reactive({
  title: 'كيف تصير القوائم في Vue',
  author: 'ابراهيم بوسجرة',
  publishedAt: '2016-04-10'
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    myObject: {
      title: 'كيف تصير القوائم في Vue',
      author: 'ابراهيم بوسجرة',
      publishedAt: '2016-04-10'
    }
  }
}
```

</div>

```vue-html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

يمكنك أيضا توفير اسم بديل لاسم الخاصية (كما هو متعارف عليه بالمفتاح):

```vue-html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

و آخر للمؤشر:

```vue-html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBteU9iamVjdCA9IHJlYWN0aXZlKHtcbiAgdGl0bGU6ICdIb3cgdG8gZG8gbGlzdHMgaW4gVnVlJyxcbiAgYXV0aG9yOiAnSmFuZSBEb2UnLFxuICBwdWJsaXNoZWRBdDogJzIwMTYtMDQtMTAnXG59KVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PHVsPlxuICAgIDxsaSB2LWZvcj1cIih2YWx1ZSwga2V5LCBpbmRleCkgaW4gbXlPYmplY3RcIj5cblx0XHQgIHt7IGluZGV4IH19LiB7eyBrZXkgfX06IHt7IHZhbHVlIH19XG5cdFx0PC9saT5cbiAgPC91bD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgbXlPYmplY3Q6IHtcbiAgXHQgICAgdGl0bGU6ICdIb3cgdG8gZG8gbGlzdHMgaW4gVnVlJyxcblx0ICAgICAgYXV0aG9yOiAnSmFuZSBEb2UnLFxuICAgICAgXHRwdWJsaXNoZWRBdDogJzIwMTYtMDQtMTAnXG4gICAgXHR9XG4gIFx0fVxuXHR9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8dWw+XG4gICAgPGxpIHYtZm9yPVwiKHZhbHVlLCBrZXksIGluZGV4KSBpbiBteU9iamVjdFwiPlxuXHRcdCAge3sgaW5kZXggfX0uIHt7IGtleSB9fToge3sgdmFsdWUgfX1cblx0XHQ8L2xpPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

## `v-for` مع مدى {#v-for-with-a-range}

`v-for` يمكنها أيضا أخذ عدد صحيح كمدى. في هذه الحالة سيكرر العنصر مرات كثيرة ، وفقا لمدى من `1 إلى n`.

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

تجدر الإشارة إلى أن `n` تبدأ بقيمة أولية من `1` بدلا من `0`.

## `v-for` على `<template>` {#v-for-on-template}

على غرار استخدام القالب مع `v-if` ، يمكنك أيضا استخدام عنصر الـ`<template>` مع `v-for` لتقديم كتلة من عناصر متعددة. على سبيل المثال :

```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` مع  `v-if` {#v-for-with-v-if}

:::warning ملاحظة
لا يوصى باستخدام `v-if` و `v-for` على نفس العنصر بسبب الأولوية المضمنة لـ`v-if`. اطلع على [دليل الأسلوب](/style-guide/rules-essential.html#avoid-v-if-with-v-for) للحصول على التفاصيل.
:::

عندما يتواجدان على نفس العنصر ، فإن `v-if` لها أولوية أعلى من `v-for`. وهذا يعني أن شرط `v-if` لن يكون قادرا على الوصول إلى المتغيرات من نطاق `v-for`:

```vue-html
<!--
سيتم إطلاق خطأ لأن الخاصية 
"todo"
 غير معرفة على النموذج.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

يمكن اصلاح هذا من خلال نقل `v-for` إلى علامة `<template>` (وهو أيضا أكثر وضوحا):

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## الحفاظ على الحالة مع `key` {#maintaining-state-with-key}

عندما تقوم Vue بتحديث قائمة العناصر المصيَّرة باستخدام `v-for` ، فإنه بشكل افتراضي تستخدم استراتيجية "التصحيح في المكان". إذا تغير ترتيب عناصر البيانات ، بدلاً من نقل عناصر DOM لكي تُطابِق ترتيب عناصر البيانات ، فستقوم Vue بتصحيح كل عنصر في المكان وتتأكد من أنه يعكس ما يجب تصييره في مكان الموافق لذلك المؤشر.

هذا الوضع الافتراضي فعال ، ولكن **مناسب فقط عندما لا يعتمد تصيير قائمة العناصر على حالة مكون ابن أو حالة DOM مؤقتة (على سبيل المثال قيم الإدخال في النموذج)**.

لتعطي Vue تلميحًا لكي يتمكن من تتبع هوية كل عنصر، وبالتالي إعادة استخدام و ترتيب العناصر الحالية، فإنك بحاجة إلى توفير سمة `key` وحيدة لكل عنصر:

```vue-html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

عند استخدام `<template v-for>` ، يجب وضع `key` على العنصر المُغلِّف `<template>`:

```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip ملاحظة
`key` هنا هو سمة خاصة تربط مع `v-bind`.  لا ينبغي الخلط بينها وبين متغير الخاصية المفتاحية عند [استخدام `v-for` مع كائن](#v-for-with-an-object).
:::

[يُوصى](/style-guide/rules-essential.html#use-keyed-v-for) بتوفير سمة `key` مع `v-for` في كل الأحوال الممكنة ، ما لم يكن المحتوى DOM المصيَّر بسيطًا (أي يحتوي على عناصر مكونات أو عناصر DOM ذات حالة) ، أو إذا كنت تعتمد على السلوك الافتراضي قصدا لتحسين الأداء.

الربط بـ `key` يتوقع قيمًا أولية - أي سلاسل نصية وأرقام. لا تستخدم الكائنات كمفاتيح `v-for`. لمزيد من المعلومات حول سمة `key` ، يرجى الاطلاع على [وثائق واجهة برمجة التطبيقات `key`](/api/built-in-special-attributes.html#key).


## `v-for` مع مكون {#v-for-with-a-component}

> هذا القسم يفترض أن تكون لك معرفة [يالمكونات](/guide/essentials/component-basics). لا تتردد في تخطيه والعودة إليه لاحقًا.

يمكنك مباشرة استخدام `v-for` على المكون ، مثل أي عنصر عادي (لا تنسى توفير `key`) :

```vue-html
<MyComponent v-for="item in items" :key="item.id" />
```
مع ذلك، لن يقوم هذا بتمرير أي بيانات تلقائيًا إلى المكون ، لأن المكونات لها نطاقات معزولة خاصة بها. لتمرير البيانات المتكررة إلى المكون ، يجب استخدام الخاصيات :

```vue-html
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

السبب في عدم تمرير `item` تلقائيًا إلى المكون هو أن ذلك يجعل المكون مرتبطًا بشكل كبير بكيفية عمل `v-for`. توضيح مصدر بيانات المكون يجعله قابل لإعادة الاستخدام في وضعيات أخرى.

<div class="composition-api">

اطلع على [هذا المثال لقائمة مهام بسيطة](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5jb25zdCBuZXdUb2RvVGV4dCA9IHJlZignJylcbmNvbnN0IHRvZG9zID0gcmVmKFtcbiAge1xuICAgIGlkOiAxLFxuICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gIH1cbl0pXG5cbmxldCBuZXh0VG9kb0lkID0gNFxuXG5mdW5jdGlvbiBhZGROZXdUb2RvKCkge1xuICB0b2Rvcy52YWx1ZS5wdXNoKHtcbiAgICBpZDogbmV4dFRvZG9JZCsrLFxuICAgIHRpdGxlOiBuZXdUb2RvVGV4dC52YWx1ZVxuICB9KVxuICBuZXdUb2RvVGV4dC52YWx1ZSA9ICcnXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVwiYWRkTmV3VG9kb1wiPlxuICAgIDxsYWJlbCBmb3I9XCJuZXctdG9kb1wiPkFkZCBhIHRvZG88L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgdi1tb2RlbD1cIm5ld1RvZG9UZXh0XCJcbiAgICAgIGlkPVwibmV3LXRvZG9cIlxuICAgICAgcGxhY2Vob2xkZXI9XCJFLmcuIEZlZWQgdGhlIGNhdFwiXG4gICAgLz5cbiAgICA8YnV0dG9uPkFkZDwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIDx1bD5cbiAgICA8dG9kby1pdGVtXG4gICAgICB2LWZvcj1cIih0b2RvLCBpbmRleCkgaW4gdG9kb3NcIlxuICAgICAgOmtleT1cInRvZG8uaWRcIlxuICAgICAgOnRpdGxlPVwidG9kby50aXRsZVwiXG4gICAgICBAcmVtb3ZlPVwidG9kb3Muc3BsaWNlKGluZGV4LCAxKVwiXG4gICAgPjwvdG9kby1pdGVtPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiVG9kb0l0ZW0udnVlIjoiPHNjcmlwdCBzZXR1cD5cbmRlZmluZVByb3BzKFsndGl0bGUnXSlcbmRlZmluZUVtaXRzKFsncmVtb3ZlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8bGk+XG4gICAge3sgdGl0bGUgfX1cbiAgICA8YnV0dG9uIEBjbGljaz1cIiRlbWl0KCdyZW1vdmUnKVwiPlJlbW92ZTwvYnV0dG9uPlxuICA8L2xpPlxuPC90ZW1wbGF0ZT4ifQ==) لترى كيفية تصيير قائمة من المكونات باستخدام `v-for`، وتمرير بيانات مختلفة إلى كل نسخة.

</div>
<div class="options-api">

اطلع على [هذا المثال لقائمة مهام بسيطة](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgVG9kb0l0ZW0gfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmV3VG9kb1RleHQ6ICcnLFxuICAgICAgdG9kb3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBuZXh0VG9kb0lkOiA0XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYWRkTmV3VG9kbygpIHtcbiAgICAgIHRoaXMudG9kb3MucHVzaCh7XG4gICAgICAgIGlkOiB0aGlzLm5leHRUb2RvSWQrKyxcbiAgICAgICAgdGl0bGU6IHRoaXMubmV3VG9kb1RleHRcbiAgICAgIH0pXG4gICAgICB0aGlzLm5ld1RvZG9UZXh0ID0gJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XCJhZGROZXdUb2RvXCI+XG4gICAgPGxhYmVsIGZvcj1cIm5ldy10b2RvXCI+QWRkIGEgdG9kbzwvbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICB2LW1vZGVsPVwibmV3VG9kb1RleHRcIlxuICAgICAgaWQ9XCJuZXctdG9kb1wiXG4gICAgICBwbGFjZWhvbGRlcj1cIkUuZy4gRmVlZCB0aGUgY2F0XCJcbiAgICAvPlxuICAgIDxidXR0b24+QWRkPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgPHVsPlxuICAgIDx0b2RvLWl0ZW1cbiAgICAgIHYtZm9yPVwiKHRvZG8sIGluZGV4KSBpbiB0b2Rvc1wiXG4gICAgICA6a2V5PVwidG9kby5pZFwiXG4gICAgICA6dGl0bGU9XCJ0b2RvLnRpdGxlXCJcbiAgICAgIEByZW1vdmU9XCJ0b2Rvcy5zcGxpY2UoaW5kZXgsIDEpXCJcbiAgICA+PC90b2RvLWl0ZW0+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJUb2RvSXRlbS52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXHRwcm9wczogWyd0aXRsZSddLFxuICBlbWl0czogWydyZW1vdmUnXVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGxpPlxuICAgIHt7IHRpdGxlIH19XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgncmVtb3ZlJylcIj5SZW1vdmU8L2J1dHRvbj5cbiAgPC9saT5cbjwvdGVtcGxhdGU+In0=) لترى كيفية تصيير قائمة من المكونات باستخدام `v-for`، وتمرير بيانات مختلفة إلى كل نسخة.

</div>

## كشف تغير المصفوفة {#array-change-detection}

### توابع التعديل {#mutation-methods}


Vue قادرة على كشف التغيرات عندما تُستدعى توابع تعديل المصفوفة التفاعلية وتشغيل التحديثات اللازمة. هذه هي توابع التعديل :

- `()push`
- `()pop`
- `()shift`
- `()unshift`
- `()splice`
- `()sort`
- `()reverse`

### استبدال مصفوفة {#replacing-an-array}

توابع التعديل، كما يشير الاسم، تعدل المصفوفة الأصلية التي تُستدعى عليها. بالمقابل، هناك أيضًا توابع غير تعديلية ، على سبيل المثال ، `()filter` ، `()concat` و `()slice` ، والتي لا تعدل المصفوفة الأصلية ولكن **تعيد دائمًا مصفوفة جديدة**. عند العمل مع توابع غير تعديلية ، يجب أن نستبدل المصفوفة القديمة بالجديدة :

<div class="composition-api">

```js
//  `items`
//  هو مرجع مع مصفوفة كقيمة
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

بما تتسائل عما إذا كان سيؤدي ذلك إلى تخلي Vue عن محتوى الـDOM الموجود وإعادة تصيير قائمة كاملة - لحسن الحظ،  هذا ليس هو الحال. تنفذ Vue بعض الاستدلالات الذكية لتحسين إعادة استخدام عنصر DOM ، لذلك استبدال مصفوفة بمصفوفة أخرى تحتوي على كائنات متداخلة هي عملية فعالة جدًا.

## عرض النتائج المنقحة / المصنفة {#displaying-filtered-sorted-results}

بعض الأحيان نريد عرض إصدار منقح أو مصنف من مصفوفة دون تعديلها أو إعادة تعيين البيانات الأصلية. في هذه الحالة ، يمكنك إنشاء خاصية محسوبة تعيد المصفوفة المنقحة أو المصنفة.

على سبيل المثال:

<div class="composition-api">

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
```

</div>

```vue-html
<li v-for="n in evenNumbers">{{ n }}</li>
```

في الحالات التي لا يمكن فيها استخدام خاصيات محسوبة (على سبيل المثال ، داخل حلقات `v-for` المتداخلة) ، يمكنك استخدام تابع أو دالة:

<div class="composition-api">

```js
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

</div>

```vue-html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```
كن حذرا  عند استخدام `()reverse` و `()sort` داخل خاصية محسوبة! هاتين الدالتين ستعدلان المصفوفة الأصلية، وهذا يجب تجنبه في محصلات الخاصية المحسوبة. قم بإنشاء نسخة من المصفوفة الأصلية قبل استدعاءهما :

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
