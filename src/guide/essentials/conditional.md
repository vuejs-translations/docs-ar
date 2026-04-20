# التصيير الشرطي {#conditional-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="Free Vue.js Conditional Rendering Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="Free Vue.js Conditional Rendering Lesson"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if` {#v-if}

السمة الموجهة `v-if` تستخدم لتصيير شرطي لكتلة من الشيفرة. سيتم تصيير الكتلة فقط إذا كان تعبير السمة الموجهة يعيد قيمة صحيحة.

```vue-html
<h1 v-if="awesome">Vue رائعة!</h1>
```

## `v-else` {#v-else}

تستطيع استخدام السمة الموجهة `v-else` لتحديد "كتلة else" لـ `v-if`:

```vue-html
<button @click="awesome = !awesome">تبديل</button>

<h1 v-if="awesome">Vue رائعة!</h1>
<h1 v-else>أوه لا 😢</h1>
```

<div class="demo">
  <button @click="awesome = !awesome">تبديل</button>
  <h1 v-if="awesome">Vue رائعة!</h1>
  <h1 v-else>أوه لا 😢</h1>
</div>

<div class="composition-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9kE1OwzAQha8y9aYgNbG6rdIKLsHKmzZMaEr8o7GTLqLsKoE4ATskkCiwQSy5iXMLjoDTFIpAYjfz/N5n+9Xs1Ji4KpFNWGJTyo0Di640M6FyaTQ5qIEwgwYy0hKGwToUSqhUK+tgvkarJcK08xw5KvFYqIT3oIAIi0NpirnDsCWL0jmt4CQt8vRyKtghPtiPgs38i3/yr+1Nu0l4H+hByzFUUZ4dYsF7ViL4N7/1j/7dPw8Svhx39+ysWFic+Yf2ur2CduO38HF3e//l4N/PYiPWfzSScxOvrFahilooALE/sIJNYKd0Wiig2wVbOmfshHObpV2BKxtruuBhiqlULpcYo5XRgvTaIgWwYKMfDB7ECikiVOdISP8xf1n/cDtsI1TDmk8rYa1q)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9kNFKwzAUhl/lLFcKa8NuSzf0JbzKTded2c42DclJJ4zdDRSfwDtBwak34qVvkr6Fj2BCyxwKhhDOn/Ofj+TfsHOl4tYiS1hqcl0qmgmJ16rRBAtcZrYi2AgJsMgoOznta0EayWoZlCDwK1ujaWpMgLTF3rINPX/4nfID2gvCWlUZoVcA6dwSNRLO8qrMr6aCDSSYwmgoBZu5N/fi3ru7bpfyfqAfLibQRuXyZ8x7LyyC+3B79+w+3eso5cXkyIyVwZl76m67G+h2bg9fD/ePgyflh6exMSvrEEJUZypemUb6gPq/Dw0jWNKnEe58gkELVhApk3BulnmIdWXiRl9yX8XaSiprjNHU0Vw3a4PagwUbHzG4v2xRRxrlAjXq/5i/rH+4ARviZ9tvaiizdw==)

</div>

 السمة `v-else` يجب أن تتبعها السمة الموجهة `v-if` أو السمة الموجهة `v-else-if` - وإلا فلن يتم التعرف عليها.

## `v-else-if` {#v-else-if}

الموجهة `v-else-if`، كما يشير  الاسم، تعمل ككتلة "else if" لـ `v-if`. يمكن استخدامها أيضًا بشكل متسلسل عدة مرات:

```vue-html
<div v-if="type === 'A'">
  أ
</div>
<div v-else-if="type === 'B'">
  ب
</div>
<div v-else-if="type === 'C'">
  ج
</div>
<div v-else>
  غير ذلك...
</div>
```

مشابهة لـ `v-else`، يجب أن يأتي عنصر `v-else-if` مباشرة بعد عنصر `v-if` أو عنصر `v-else-if`.

## `v-if` على `<template>` {#v-if-on-template}

بما أن `v-if` عبارة عن توجيه (directive)، فيجب ربطه بعنصر واحد فقط. ولكن ماذا لو أردنا إظهار أو إخفاء أكثر من عنصر؟

في هذه الحالة يمكننا استخدام `v-if` على عنصر `<template>`، والذي يعمل كغلاف غير مرئي (invisible wrapper). النتيجة النهائية التي يتم عرضها لن تتضمن عنصر `<template>`.


```vue-html
<template v-if="ok">
  <h1>العنوان</h1>
  <p>الفقرة 1</p>
  <p>الفقرة 2</p>
</template>
```

`v-else` و `v-else-if` يمكن استخدامها أيضًا على `<template>`.

## `v-show` {#v-show}

خيار آخر لعرض العنصر بشكل شرطي هو السمة `v-show`. الاستخدام مثل `v-if` هو نفسه إلى حد كبير:

```vue-html
<h1 v-show="ok">السلام عليكم</h1>
```

الفرق هو أن العنصر مع `v-show` سيُصيَّر دائمًا  و يبقى موجودا في DOM؛ `v-show` يقوم فقط بتبديل خاصية  `display` في الـCSS للعنصر.

`v-show` لا تدعم العنصر `<template>`، ولا يعمل أيضا مع `v-else`.

## `v-if` مقابل `v-show` {#v-if-vs-v-show}

`v-if` هو تصيير شرطي "حقيقي"  لأنه يضمن أن مستمعي الأحداث والمكونات الفرعية داخل الكتلة الشرطية تُدمر وتُعاد إنشاؤها بشكل صحيح أثناء التبديلات.

`v-if` هي أيضا سمة "خاملة": إذا كان الشرط غير مستوفى (false) عند التصيير الأولي، فلن تقوم بأي شيء - لن يتم تصيير الكتلة الشرطية حتى يصبح الشرط مستوفى (true) للمرة الأولى.

بالمقارنة ، `v-show` تعتبر أبسط - يتم دائمًا تصيير العنصر بغض النظر عن الشرط الأولي، بالاستناد على التبديل المبني على CSS.

بشكل عام، `v-if` لديها تكاليف تبديل أعلى بينما `v-show` لديها تكاليف تصيير أولية أعلى. لذلك، استخدم `v-show` إذا كنت بحاجة إلى التبديل على عنصر معين بشكل متكرر جدًا، و `v-if` إذا كان الشرط غير مرجح أن يتغير في وقت التشغيل.

## `v-if` مع `v-for` {#v-if-with-v-for}

عندما يتم استخدام `v-if` و `v-for` على نفس العنصر، سيتم تقييم `v-if` أولًا. راجع [دليل عرض القوائم](list#v-for-with-v-if) لمزيد من التفاصيل.

::: warning ملاحظة
لا يُنصح باستخدام `v-if` و `v-for` على نفس العنصر بسبب أولوية التنفيذ غير المباشرة. راجع [دليل عرض القوائم](list#v-for-with-v-if) لمزيد من التفاصيل.
:::

