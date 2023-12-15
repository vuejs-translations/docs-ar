# ميزات الـCSS في المكونات أحادية الملف  {#sfc-css-features}

## تنسيقات الـCSS المحصورة {#scoped-css}

لما يكون عندك عنصر `<style>` مع الخاصية `scoped`، الـCSS الخاص بها سوف يطبق على العناصر الموجودة في المكون الحالي فقط. هذا مشابه للتنسيقات المحصورة في Shadow DOM. تأتي هذه الخاصية مع بعض التنبيهات، ولكن لا يتطلب أي polyfills. يمكن تحقيقها باستخدام PostCSS لتحويل ما يلي:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">مرحبا</div>
</template>
```

إلى ما يلي:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>مرحبا</div>
</template>
```

### العناصر الجذرية للمكون الابن {#child-component-root-elements}

مع سمة `scoped`، تنسيقات المكون الأب لن تتسرب إلى المكونات الأبناء. ومع ذلك، سيتأثر العنصر الجذر للمكون الابن بكل من تنسيقات الـCSS المحصورة للمكون الأب وتنسيقات الـCSS المحصورة للمكون الابن. هذا مصمم هكذا حتى يتمكن المكون الأب من تنسيق العنصر الجذر للمكون الابن لأغراض تخطيطية.

### المحدِّدات العميقة {#deep-selectors}

إذا كنت تريد محددًا في التنسيقات المحصورة أن يكون "عميقًا"، أي يؤثر على المكونات الأبناء، يمكنك استخدام الصنف الوهمي `()deep:`:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

المثال السابق سيُصرَّف إلى:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip ملاحظة
محتوى DOM الذي أُنشئ باستخدام `v-html` لا يتأثر بالتنسيقات المحصورة، ولكن يمكنك تنسيقها باستخدام المحددات العميقة.
:::

### مُحدِّدات المنافذ {#slotted-selectors}

بشكل افتراضي، التنسيقات المحصورة لا تؤثر على المحتويات التي عرضت بواسطة `<slot/>`، لأنها تعتبر مملوكة للمكون الأب الذي يمررها. لاستهداف محتوى المنفذ بشكل صريح، استخدم الصنف الوهمي `slotted:`:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### المحدِّدات العامة {#global-selectors}

إذا كنت تريد تطبيق قاعدة واحدة على نحو عام، يمكنك استخدام الصنف الوهمي `global:` بدلاً من إنشاء عنصر `<style>` آخر (انظر أدناه):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### خلط التنسيقات العامة والمحلية {#mixing-local-and-global-styles}

يمكنك أيضًا تضمين التنسيقات المحصورة وغير المحصورة في نفس المكون:

```vue
<style>
/* التنسيقات العامة */
</style>

<style scoped>
/* التنسيقات المحصورة */
</style>
```

### نصائح للتعامل مع التنسيقات المحصورة {#scoped-style-tips}

- **التنسيقات المحصورة لا تقضي على الحاجة إلى الأصناف**. بسبب الطريقة التي تقوم بها المتصفحات بتصيير المحددات المختلفة في CSS، ستكون `p { color: red }` أبطأ بكثير عندما تكون محصورة (أي عندما تكون مجتمعة مع محدد السمة). إذا كنت تستخدم الأصناف أو المعرفات بدلاً من ذلك، مثل `example { color: red }.`، فإنك تقضي على هذا الأثر الأدائي تقريبًا.

- **كن حذرًا مع المحددات الفرعية في المكونات المتكررة!** بالنسبة لقاعدة CSS مع محدد `a .b.`، إذا كان العنصر الذي يطابق `a.` يحتوي على مكون ابن متكرر، فسيُطابق كل عنصر `b.` في هذا المكون الابن بالقاعدة.

## وحدات الـCSS {#css-modules}

عنصر `<style module>` يُصرف كـ [وحدات الـCSS](https://github.com/css-modules/css-modules) ويعرض التنسيقات الناتجة للمكون ككائن تحت مفتاح `$style`:

```vue
<template>
  <p :class="$style.red">هذه الفقرة يجب أن تكون بلون أحمر</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

التنسيقات الناتجة مشفرة لتجنب التعارض، وتحقيق نفس التأثير لتحصين التنسيقات للمكون الحالي فقط.

راجع [مواصفات وحدات الـCSS](https://github.com/css-modules/css-modules) للحصول على مزيد من التفاصيل مثل [الاستثناءات العامة](https://github.com/css-modules/css-modules#exceptions) و[التركيب](https://github.com/css-modules/css-modules#composition).

### اسم تزويد مخصص {#custom-inject-name}

يمكنك تخصيص مفتاح الخاصية لكائن التنسيقات المزودة عن طريق إعطاء الخاصية `module` قيمة:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### الاستخدام مع الواجهة التركيبية {#usage-with-composition-api}

يمكن الوصول إلى التنسيقات المزودة في `()setup` و `<script setup>` عبر الدالة التركيبية `useCssModule`. بالنسبة لكتل `<style module>` مع أسماء تزويد مخصصة، تقبل `useCssModule` قيمة الخاصية `module` المطابقة كوسيط أول:

```js
import { useCssModule } from 'vue'

// داخل نطاق ()setup...
// افتراضيا، يرجع التنسيقات لـ <style module>
useCssModule()

// مسمى، يرجع التنسيقات لـ <style module="classes">
useCssModule('classes')
```

## دالة `v-bind()` في الـCSS {#v-bind-in-css}

عناصر `<style>` في المكونات أحادية الملف تدعم ربط قيم الـCSS بحالة المكون الديناميكية باستخدام دالة `v-bind` الـخاصة بالـCSS:

```vue
<template>
  <div class="text">مرحبا</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

تعمل هذه الصيغة مع [`<script setup>`](./sfc-script-setup)، وتدعم تعبيرات الـJavaScript (يجب أن تكون ملفوفة بعلامات اقتباس):

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

ستصرف القيمة الفعلية إلى خاصية CSS مخصصة و مشفرة، لذلك لا تزال التنسيقات ثابتة. ستطبق الخاصية المخصصة على عنصر الجذر للمكون عبر التنسيقات الداخلية وتحديثها بشكل تفاعلي إذا تغيرت القيمة المصدرية.
