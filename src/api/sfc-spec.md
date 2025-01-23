# مواصفات صيغة المكونات أحادية الملف {#sfc-syntax-specification}

## نظرة عامة {#overview}

المكونات أحادية الملف في Vue، يصطلح عليها باستخدام امتداد الملف `vue.*`، هي صيغة ملف مخصصة تستخدم صيغة على نحو شبيه بـ HTML لوصف مكون Vue. المكونات أحادية الملف في Vue تتوافق من حيث الصيغة مع HTML.

كل ملف `*.vue` يتكون من ثلاثة أنواع من الكتل اللغوية ذات المستوى الأعلى: `<template>`، `<script>`، و `<style>`، واختياريًا كتل مخصصة إضافية:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'مرحبًا'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  يمكن أن يكون هذا على سبيل المثال توثيق للمكون.
</custom1>
```

## الكتل اللغوية {#language-blocks}

### `<template>` {#template}

- كل ملف `*.vue` يمكن أن يحتوي على كتلة `<template>` ذات مستوى أعلى واحد على الأكثر.

- ستُستخرج المحتويات وتُمرر إلى `vue/compiler-dom@`، وتصييرها مسبقًا إلى دوال تصيير، وتعليقها على المكون المصدر داخل خيار `render`.

### `<script>` {#script}

- كل ملف `*.vue` يمكن أن يحتوي على كتلة `<script>` ذات مستوى أعلى واحد على الأكثر (باستثناء [`<script setup>`](/api/sfc-script-setup)).

- تشغل الشيفرة كوحدة ES.

- التصدير الافتراضي يجب أن يكون كائن خيارات مكون Vue، إما ككائن عادي أو كقيمة إرجاع من [defineComponent](/api/general#definecomponent).

### `<script setup>` {#script-setup}

- كل ملف `*.vue` يمكن أن يحتوي على كتلة `<script setup>` ذات مستوى أعلى واحد على الأكثر (باستثناء `<script>` العادي).

- تعالج الشيفرة مسبقًا وتستخدم كدالة `()setup` للمكون، وهذا يعني أنها ستُشغل **في كل نسخة من المكون**. يُعرض الربط الأعلى مستوى في `<script setup>` تلقائيًا للقالب. لمزيد من التفاصيل، اطلع على [التوثيق المخصص لـ `<script setup>`](/api/sfc-script-setup).

### `<style>` {#style}

- يمكن أن يحتوي ملف `*.vue` واحد على عدة عناصر `<style>`.

- يمكن أن يحتوي عنصر `<style>` على سمات `scoped` أو `module` (انظر [ميزات صيغة المكونات أحادية الملف](/api/sfc-css-features) للمزيد من التفاصيل) للمساعدة في تغليف التنسيقات للمكون الحالي. يمكن مزج عدة عناصر `<style>` ذات أوضاع تغليف مختلفة في نفس المكون.

### كتل مخصصة {#custom-blocks}

يمكن تضمين كتل مخصصة إضافية في ملف `*.vue` لأي احتياجات محددة للمشروع، على سبيل المثال كتلة `<docs>`. بعض الأمثلة العملية للكتل المخصصة تشمل:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#i18n-custom-block)

معالجة الكتل المخصصة ستعتمد على الأدوات - إذا كنت تريد بناء تكاملات كتل مخصصة خاصة بك، انظر [قسم أدوات تكاملات كتل المكونات أحادية الملف](/guide/scaling-up/tooling#sfc-custom-block-integrations) للمزيد من التفاصيل.

## الاستنباط التلقائي لإسم المكون {#automatic-name-inference}

يستنبط اسم المكون أحادي الملف من **اسم الملف** في الحالات التالية:

- تنسيق تحذيرات التطوير
- فحص أدوات التطوير
- الإشارة الذاتية التكرارية، على سبيل المثال ملف يسمى `FooBar.vue` يمكن أن يشير إلى نفسه كـ `<FooBar/>` في قالبه. وهذا له أولوية أقل من المكونات المسجلة/المستوردة بشكل صريح.

## المعالجات المسبقة {#pre-processors}

الكتل يمكنها التصريح بلغات المعالجة المسبقة باستخدام سمة `lang`. أكثر الحالات شيوعًا هي استخدام TypeScript مع كتلة `<script>`:

```vue-html
<script lang="ts">
  // استخدم TypeScript
</script>
```

يمكن تطبيق `lang` على أي كتلة - على سبيل المثال يمكننا استخدام `<style>` مع [Sass](https://sass-lang.com/) و `<template>` مع [Pug](https://pugjs.org/api/getting-started.html):

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

لاحظ أن الدمج مع معالجات مسبقة مختلفة قد يختلف حسب سلسلة الأدوات. تحقق من الوثائق المعنية للحصول على أمثلة:

- [Vite](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## استيرادات `src`  {#src-imports}

إذا كنت تفضل تقسيم مكونات `*.vue` إلى ملفات متعددة، يمكنك استخدام سمة `src` لاستيراد ملف خارجي لكتلة لغوية:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

انتبه إلى أن استيرادات `src` تتبع نفس قواعد تحديد المسارات كطلبات وحدة webpack، وهذا يعني:

- يجب أن تبدأ المسارات النسبية بـ `./`
- يمكنك استيراد موارد من اعتماديات npm:

```vue
<!--  استيراد ملف من حزمة npm المثبتة "todomvc-app-css" -->
<style src="todomvc-app-css/index.css" />
```

استيرادات `src` تعمل أيضًا مع الكتل المخصصة، على سبيل المثال:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

:::warning Note
While using aliases in `src`, don't start with `~`, anything after it is interpreted as a module request. This means you can reference assets inside node modules:
```vue
<img src="~some-npm-package/foo.png">
```
:::

## Comments {#comments}

داخل كل كتلة يجب أن تستخدم الصيغة التعليقية للغة المستخدمة (HTML، CSS، JavaScript، Pug، إلخ). للتعليقات ذات المستوى الأعلى، استخدم الصيغة  التعليقية لـ HTML: `<!-- محتويات التعليق هنا -->`
