---
outline: deep
---

# السمات المستترة {#fallthrough-attributes}

> لقراءة هذه الصفحة يجب عليك أولا الاطلاع على [أساسيات المكونات](/guide/essentials/component-basics).  ثم العودة إلى هنا.

## توريث السمات {#attribute-inheritance}

"السمات المستترة" هي سمة أو مستمع لحدث `v-on` تُمرَّر إلى مكون، ولكنها ليست معرفة بشكل صريح في [الخاصيات](./props) أو [الأحداث المرسلة](./events#declaring-emitted-events) للمكون الذي مُرِّرت إليه.  أمثلة شائعة عن ذلك هي سمات `class` و `style` و `id`.

عندما يصيّر المكون واحد من العناصر الجذرية، سيتم إضافة السمات المستترة تلقائيًا إلى سمات العنصر الجذري.  على سبيل المثال، نعتبر المكون `<MyButton>` مع القالب التالي:

```vue-html
<!-- قالب <MyButton> -->
<button>انقر هنا</button>
```

و يستخدم المكون الأب هذا المكون بهذا الشكل:

```vue-html
<MyButton class="large" />
```

الـDOM النهائي المصيَّر سيكون:

```html
<button class="large">انقر هنا</button>
```

هنا، لم يصرح `<MyButton>` بـ `class` كخاصية مقبولة.  بالتالي،  تُعامل `class` كسمة مستترة وتضاف تلقائيًا إلى العنصر الجذري لـ `<MyButton>`.

### دمج `class` و `style` {#class-and-style-merging}

  إذا كان العنصر الجذري للمكون الابن يحتوي بالفعل على سمات `class` أو `style`، سيتم دمجها مع قيم `class` و `style` التي تُمرَّر من الأب.  في المثال السابق، نعتبر المكون `<MyButton>`  بالقالب التالي:

```vue-html
<!-- قالب <MyButton> -->
<button class="btn">انقر هنا</button>
```

ثم سيصيّر الـDOM النهائي كالتالي:

```html
<button class="btn large">انقر هنا</button>
```

###  توريث مستمعي الأحداث `v-on` {#v-on-listener-inheritance}

نفس القاعدة تنطبق على مستمعي الأحداث `v-on`:

```vue-html
<MyButton @click="onClick" />
```

سيُضاف مستمع الحدث `click` إلى العنصر الجذري لـ `<MyButton>`، أي العنصر الأصلي `<button>`.  عند النقر على الزر الأصلي `<button>`، ستستدعى الدالة `onClick` للمكون الأب.  إذا كان الزر الأصلي `<button>` يحتوي بالفعل على مستمع للحدث `click` مرتبط بـ `v-on`، فسيشغل كلا المستمعين.

### توريث المكونات المتداخلة  {#nested-component-inheritance}

إذا كان المكون يصيّر مكون آخر كعنصر جذري، على سبيل المثال، نعتبر المكون `<MyButton>` المصيَّر لـ`<BaseButton>` كعنصر جذري:

```vue-html
<!-- قالب <MyButton/> الذي يصيّر مكون آخر ببساطة -->
<BaseButton />
```

ثم ستُمرَّر السمات المستترة التي استلمت من `<MyButton>` تلقائيًا إلى `<BaseButton>`.

تجدر الإشارة أن:

1. السمات الممررة لا تشمل أي سمات تم تعريفها كخاصيات أو مستمعي أحداث `v-on` من قبل `<MyButton>` - بمعنى آخر، الخاصيات والمستمعين المعرفين بواسطة `<MyButton>` يُستهلكون مباشرة داخل هذا المكون دون تمريرهم إلى المكون الابن.

2. السمات الممررة قد تُقبل كخاصيات من قبل `<BaseButton>`، إذا عُرّفت من قبله.

## تعطيل توريث السمات {#disabling-attribute-inheritance}

إذا كنت لا تريد توريث السمات تلقائيًا، يمكنك تعيين `inheritAttrs: false` في خيارات المكون.

<div class="composition-api">

 منذ النسخة 3.3 يمكنك أيضًا استخدام [`defineOptions`](/api/sfc-script-setup#defineoptions) مباشرة في `<script setup>`:

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup باقي شيفرة
</script>
```

</div>

السيناريو الشائع لتعطيل توريث السمات هو عندما تحتاج إلى تطبيق السمات على عناصر أخرى عدا العنصر الجذري.  بتعيين خيار `inheritAttrs` إلى `false`، يمكنك الحصول على تحكم كامل على مكان تطبيق السمات المستترة.

هذه السمات المستترة يمكن الوصول إليها مباشرةً في تعبيرات القالب باستخدام `$attrs`:

```vue-html
<span>السمات المستترة: {{ $attrs }}</span>
```

الكائن `$attrs` يتضمن جميع السمات التي لم يُصرَّح بها من قبل خيارات `props` أو `emits` للمكون (على سبيل المثال، `class`، `style`، مستمعي الأحداث `v-on`، إلخ.).

بعض الملاحظات:

- على عكس الخاصيات، السمات المستترة تحافظ على حالة أحرفها الأصلية في JavaScript، لذا يجب الوصول إلى السمة مثل `foo-bar` باستخدام `$attrs['foo-bar']`.

- المستمع للحدث `v-on` مثل `@click` سيُصدّر كدالة في الكائن `$attrs.onClick`.

باستخدام مثال مكون `<MyButton>` من [القسم السابق](#attribute-inheritance) -  في بعض الأحيان قد نحتاج إلى تغليف عنصر `<button>` الفعلي بعنصر `<div>` إضافي لغرض التنسيق:

```vue-html
<div class="btn-wrapper">
  <button class="btn">انقر هنا</button>
</div>
```

نريد تطبيق جميع السمات المستترة مثل `class` ومستمعي الأحداث `v-on` على العنصر `<button>` الفعلي، وليس على العنصر `<div>` الخارجي. يمكننا الوصول إلى هذا الهدف بتعطيل توريث السمات `inheritAttrs: false` وتطبيق السمات المستترة باستخدام `"v-bind="$attrs`:

```vue-html{2}
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">انقر هنا</button>
</div>
```

تذكر أن [`v-bind` بدون وسيط](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) يربط جميع خاصيات الكائن كسمات للعنصر المستهدف.

## توريث السمات على عدة عناصر جذرية {#attribute-inheritance-on-multiple-root-nodes}

  على عكس المكونات التي لها عنصر جذر واحد، المكونات التي لها عدة عناصر جذرية لا تمتلك سلوك توريث السمات تلقائيًا. إذا لم يتم ربط `attrs$` بشكل صريح، سيُطلق تحذير تشغيلي.

```vue-html
<CustomLayout id="custom-layout" @click="changeValue" />
```

  إذا كان `<CustomLayout>` لديه قالب متعدد الجذور كما في المثال أدناه، سيُطلق تحذير لأن Vue لا يستطيع أن يتأكد على أي عنصر  سيُطبق السمات المستترة:

```vue-html
<header>...</header>
<main>...</main>
<footer>...</footer>
```

التحذير سيختفي إذا  رُبِط `attrs$` بشكل صريح:

```vue-html{2}
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## الوصول إلى السمات المستترة في JavaScript {#accessing-fallthrough-attributes-in-javascript}

<div class="composition-api">

إذا لزم الأمر، يمكنك الوصول إلى سمات المكون المستترة باستخدام الدالة التركيبية  `()useAttrs` في `<script setup>`:

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

إذا كنت لا تستخدم `<script setup>`، ستُعرف `attrs` كخاصية في نطاق الدالة `()setup`  (الوسيط الثاني):

```js
export default {
  setup(props, ctx) {
    // السمات المستترة معروضة كـ  ctx.attrs
    console.log(ctx.attrs)
  }
}
```

تجدر الإشارة إلى أن الكائن `attrs` هنا يعكس دائمًا السمات المستترة الأخيرة، ولكنه غير تفاعلي (لأسباب تتعلق بالأداء). لا يمكنك استخدام دالة مُراقبة لتتبع تغييراته. إذا كنت بحاجة إلى التفاعلية، استخدم خاصية. بدلا من ذلك، يمكنك استخدام دورة الحياة `()onUpdated` لإجراء تأثيرات جانبية مع قيمة `attrs` الأخيرة في كل تحديث.

</div>

<div class="options-api">

إذا لزم الأمر، يمكنك الوصول إلى سمات المكون المستترة عبر خاصية `$attrs` لنسخة المكون:

```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```

</div>
