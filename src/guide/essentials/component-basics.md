# أساسيات المكونات {#components-basics}

المكونات تسمح لنا بتقسيم واجهة المستخدم إلى قطع مستقلة وقابلة لإعادة الاستخدام، و تصورها على شكل قطع كل واحدة معزولة على حدة. من الشائع أن يُنظم تطبيق معين على شكل شجرة من المكونات المتداخلة :

![Component Tree](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

This is very similar to how we nest native HTML elements, but Vue implements its own component model that allows us to encapsulate custom content and logic in each component. Vue also plays nicely with native Web Components. If you are curious about the relationship between Vue Components and native Web Components, [read more here](/guide/extras/web-components).



## تعريف مكون {#defining-a-component}

عند استخدام عملية بناء، نحدد عادة كل مكون Vue في ملف منفصل باستخدام امتداد `.vue` - معروف باسم [مكون أحادي الملف ](/guide/scaling-up/sfc) (SFC اختصارا):

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">لقد نقرت عليّ {{ count }} مرّة.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">لقد نقرت عليّ {{ count }} مرّة.</button>
</template>
```

</div>

عند عدم استخدام عملية بناء، يمكن تعريف مكون Vue ككائن JavaScript عادي يحتوي على خيارات Vue المحددة :

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      لقد نقرت عليّ {{ count }} مرّة.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
       لقد نقرت عليّ {{ count }} مرّة.
    </button>`
  // يمكنها أيضا استهداف قالب موجود في DOM
  // template: '#my-template-element'
}
```

</div>

هنا القالب مضمن كسلسلة نصية تحتوي على شيفرة JavaScript ، وستُصرَّف من قبل Vue على الفور. يمكنك أيضًا استخدام محدد ID يشير إلى عنصر (عادة عناصر الـ`<template>` الأصلية) - ستستخدم Vue محتواه كمصدر للقالب.

المثال أعلاه يعرف مكونًا واحدًا ويصدره كتصدير افتراضي (`export default`) في ملف ذو امتداد `js.`، لكن يمكنك استخدام التصديرات المسماة (`export componentName`) لتصدير عدة مكونات من نفس الملف.

## استخدام مكون {#using-a-component}

:::tip ملاحظة
سنستخدم صيغة الـSFC فيما تبقى من هذا الدليل - المفاهيم حول المكونات هي نفسها بغض النظر عن ما إذا كنت تستخدم عملية بناء أم لا. يوضح قسم [الأمثلة](/examples/) استخدام المكونات في كلا الحالتين.
:::

من أجل استخدام مكون ابن، نحتاج إلى استيراده في المكون الأب. بفرض أننا وضعنا مكون "العداد" داخل ملف يسمى `ButtonCounter.vue`، سيُعرض المكون كتصدير افتراضي داخل الملف :

<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>هنا المكون الابن</h1>
  <ButtonCounter />
</template>
```

لكي تعرض المكون المستورد إلى القالب، تحتاج إلى [تسجيله](/guide/components/registration) باستخدام خيار `components`. سيكون المكون متاحًا كوسم باستخدام اسم الخاصية التي سُجل بها.

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>هنا المكون الابن</h1>
  <ButtonCounter />
</template>
```

باستخدام `<script setup>` ، يتم توفير المكونات المستوردة تلقائيًا في القالب.

</div>

من الممكن أيضًا تسجيل مكون بشكل عام، مما يجعله متاحًا لجميع المكونات في تطبيق معين دون الحاجة إلى استيراده. الأسباب الإيجابية  والسلبية للتسجيل العام مقابل المحلي ستُناقش في القسم المخصص [لتسجيل المكون](/guide/components/registration).

المكونات يمكن استخدامها مرات متعددة كما تريد:

```vue-html
<h1>هنا يوجد العدد من المكونات الابن</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNqVUktOwzAQvYrlDaC2MWyrUPG5hjdp6tKUxo5spyBF2fAJVXc9RQEhVV32JvZtGDu0Ii0CEUWy53nmjec9F/gyy4JpznAXhyqWSaZ7lCdpJqRGV7nWgl+LnGsm0VCKFB0FpIG60iPKEaKc3fuiARtG+USjwqGxACbOuFbdGkBNUgeVlMMfkl13CDRLs0mkmYt0ODrr2RdbmSWyczszH2aFzNI+mY1ZwdY+28rHsHm0M5dn3uuEpXm1VUig3vM05yH/AkOyuxNu41qgThplwVgJDuL56ejXgaJ4Ny/FIJGLKR5pnakuIWoYO93GKhDyhsAukNAoSVnAVNrpS3GnQNkxsLS/cRAAp0x2JOMDJkG7Xzj3Ug94t7rDKAd2Nl7CT6YOIh0dn2znk0znkm8jZzkwddFpHUOTPx1GKOz7S6CLeJLEt+cUe5JWi2J/DB+4++C8rmBZO3s3gMztAhVF3RGVJbwEs7YL8xZ4TlKT7nlXfgJ0ICRj)

</div>
<div class="composition-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNqVkUtuwjAQhq8y8oZWQNxuUUB9XMMbSE2BEtuyHbqIsukjRew4BW1VCbHkJvZtOk5QVUBFajaZ+T3zjcd/Tq6VimYZJx0Sm0SPlQXDbaZ6TIxTJbWFm8xaKW5lJizXMNQyhUZE99QAaDAR05qAvZhYnqpp3/KQ2Xh02fNvvnQr8As/d19uDW7lX9zWrTH0r76scgye/TzUuc+6YOXefRlT7K84+7eh/xJj+nMn0iL1eu20r6KJkQIfIGcCgO0ODCMdqJSg4YIhZ2RkrTIdSs0wCVtPTCT1PcUo0jhonPKIm7Q90PLR4LtMkNL6xaAozrhuay7uuOb6FPOg9IgbsAUTBa5yZMbfbuag+RCKnY+1b0wkUhgLSQBAN1ScXZyf8BMgHlQj4SqZjpOHLiNVb7PJSHUcPjTzKVhb4m8T3NyisvBLyPPdpKJA493GL91HVEFpTT2wqvgGCGILTg==)

</div>

تجدر الإشارة إلى أنه عند النقر فوق الأزرار ، يحافظ كل منها على عداده الخاص بشكل مستقل. هذا لأنه عند استخدامك للمكون ، يتم إنشاء **نسخة** جديدة منه في كل مرة.

في المكونات أحادية الملف SFC ، ينصح باستخدام أسماء الوسوم  بنمط باسكال `PascalCase` للمكونات الابن لتمييزها من عناصر HTML الأصلية. على الرغم من أن أسماء وسوم HTML الأصلية لا غير حساسة لحالة الأحرف، إلا أن Vue SFC هو صيغة مُصرَّفة لذلك يمكننا استخدام أسماء وسوم حساسة لحالة الأحرف. يمكننا أيضًا استخدام `/>` لإغلاق الوسم.

إذا كنت تكتب القوالب مباشرة في DOM (على سبيل المثال ، كمحتوى في عنصر `<template>` أصلي) ، فسيكون القالب خاضعا لسلوك المتصفح في تحليل الـHTML الأصلي . في هذه الحالات ، ستحتاج إلى استخدام نمط أسياخ الشواء `kebab-case` وعلامات إغلاق صريحة لوسوم المكونات : 

```vue-html
<!-- إذا كان هذا القالب مكتوبا في 
DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```
اطلع على [تنبيهات حول تحليل قالب DOM](#child-components) لمزيد من التفاصيل.

## تمريرالخاصيات {#passing-props}

إذا كنا بصدد تطوير مدونة ، فنحتاج بالتأكيد إلى مكون يمثل مقال، نريد أن تتشارك جميع مقالات المدونة نفس النسق، لكن بمحتوى مختلف. لن يكون هذا المكون مفيدًا إلا إذا كنت قادرًا على تمرير البيانات إليه ، مثل عنوان  ومحتوى المقال الذي نريد عرضه. هنا يأتي دور الخاصيات.

الخاصيات هي سمات مخصصة يمكنك تسجيلها في مكون. لتمرير عنوان إلى مكون "مقال المدونة" ، يجب علينا تعريفه في قائمة الخاصيات التي يقبلها هذا المكون، باستخدام  <span class="options-api">[`props`](/api/options-state#props)</span><span class="composition-api"> التعليمة العامة [`defineProps`](/api/sfc-script-setup#defineprops-defineemits)</span>:

<div class="options-api">

```vue
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

عندما يتم تمرير قيمة للخاصية ، تصبح هذه الخاصية متوفرة على مستوى نسخة مكون . يمكن الوصول إلى قيمة هذه الخاصية في القالب وفي سياق `this`  التابع للمكون ، مثل أي خاصية أخرى للمكون.

</div>
<div class="composition-api">

```vue
<!-- BlogPost.vue -->
<script setup>
 defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` هي تعليمة عامة تنفذ خلالزمن التصريف و  التي تتوفر فقط داخل `<script setup>` ولا تحتاج إلى استيرادها بشكل صريح. الخاصيات المعرفة داخله تعرض بشكل تلقائي للقالب. `defineProps` تعيد أيضًا كائنًا يحتوي على جميع الخاصيات الممررة إلى المكون، حتى نتمكن من الوصول إليها في شيفرة الـJavaScript إذا لزم الأمر :

```js
const props = defineProps(['title'])
console.log(props.title)
```

اطلع على : [إضافة الأنواع لخاصيات المكون](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

إذا كنت لا تستخدم `<script setup>` ، يجب عليك تعريف الخاصيات باستخدام خيار `props` ،وسيتم تمرير كائن الخاصيات إلى `()setup` كأول وسيط:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

المكون يمكن أن يحتوي على عدد غير محدود من الخاصيات، وبشكل افتراضي، يمكن تمرير أي قيمة إلى أي خاصية.

بمجرد تسجيل الخاصية، يمكنك تمرير البيانات إليها كسمة مخصصة، كما يلي :

```vue-html
<BlogPost title="رحلتي مع Vue.js" />
<BlogPost title="التدوين بـVue.js" />
<BlogPost title="لماذا العمل بـVue يعتبر ممتعا" />
```

في تطبيق عادي، من المحتمل أن يكون لديك مصفوفة من المقالات في المكون الأب:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: "رحلتي مع Vue.js" },
        { id: 2, title: "التدوين بـVue.js" },
        { id: 3, title: "لماذا العمل بـVue يعتبر ممتعا" }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: "رحلتي مع Vue.js" },
  { id: 2, title: "التدوين بـVue.js" },
  { id: 3, title: "لماذا العمل بـVue يعتبر ممتعا" }
])
```

</div>

ثم نريد عرض مكون لكل مقالة باستخدام `v-for`:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNqFU82O0zAQfpWRLwWpjcXPKQqV4Ak4cVlzCI276yWxLdspoKgShy5CfZGuVkKwx76J/TaMnSZKYbUbRZG/8Xyfx99MOvJW62zTcpKTwq6M0G7JpGi0Mg7e1eryvbIO1kY1MMvoEIiEGZMATPKvKbXi67KtHXQxulLIl1w6m/cBGKUi2s7jtypd+ez5sG+4a40cEIDGXGRfDDg+HYgqhxdzcMLVPAdG/L3/FXb+Luwh3PgjfGh5dm0ZOR1xTnw5JR4izf8OP8M+/AB/G74/Tn41IYcdHnbwf/wBks4x3ITdqAFh74+ofevvsSjMvEN4iLKD6sd+kTB+8C3oaD0Cxxtdl44jAigqsYFKmDeMGFczkoIYnhrK3GaxVjEl2gZC9vYxgnIOIP/Mv532MlHFaKTk6T5DPIGesCzGPvcVUCwBVwWdFEbmpB+SRVNqtE1JHKDUPXbawOPH7jOCAxMxI1fOaZtTaterOEXXNlPmkuIqM610ouEZt83ik1FfLDepH6duJA2KwQ03C8NlxQ03j2n+k/qf7mA/XmU612c/wkPTrY3C0+BiljybYTef6ODV62XX9eMD221BEZ+5SbZ/AQsfRlQ=)

</div>
<div class="composition-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9Uktu2zAQvcqAG6eALaKflaAYaE+QVTdhF6k1SphaJEHSLgpBQBdOUfgiDgIUbZa+CXmbDinbcL5acd6894Z6w459NKZYLpCVrHIzK40Hh35hpkLJ1mjroQOLDfTQWN3CiKijQ+vTXF+eaed3vYLvgeRINAChZloRwRDo4DRZnZynBn0dyLqEt2Pw0s+xBMHCffgTV+EuriHehC18XmBx7QSDfvxA8+5Ys0mK8Df+juv4C8Jt/Pmi7v2RLq5oxCb8CxvIFtt4E1cHOcR12JLtbbinqxDzjspNchTqyxuhKj6ERTFR4bE18wuPVEFVyyXU0p4KZv1csMTw1T6YnIlfThqdCCkVkGpIR7DEBCi/4Y9dr5B1QpOkzBff47kYBNPqkHoez2k+HSp+uBQbs2Ffk/bCUC5a0bK7bLtr0OwSMpIw2l2qBbvy3riSc9fM0kKvXaHtJadTYRfKyxYLdO3kq9XfHdoc+C7u7MEJXKKdWFQ1WrSveT6iPvFNtpR8T79y/MSeebQ1NlLhmdXGnZyPck6j1xcG1dWHadcNLwP6vuJUPwyw/w/JPS4N)

</div>

Notice how [`v-bind` syntax](/api/built-in-directives#v-bind) (`:title="post.title"`) is used to pass dynamic prop values. This is especially useful when you don't know the exact content you're going to render ahead of time.

هذا كل ما تحتاج إلى معرفته حول الخاصيات إلى حد الآن، ولكن بمجرد انتهاءك من قراءة هذه الصفحة وفهم محتواها، ننصحك بالعودة لاحقًا لقراءة الدليل الكامل على [الخاصيات](/guide/components/props).

## الاستماع للأحداث {#listening-to-events}

بينما نطور مكون `<BlogPost>`، قد تتطلب بعض الميزات التواصل مع المكون الأب. على سبيل المثال، قد نقرر تضمين ميزة سهولة الوصول (accessibility) لتكبير حجم النص في مقالات المدونة، بينما يُترك باقي الصفحة بحجمها الافتراضي.

في المكون الأب، يمكننا دعم هذه الميزة من خلال إضافة <span class="options-api">خاصية البيانات `data`</span><span class="composition-api">المرجع التفاعلي  `ref`</span>  باسم`postFontSize`:

<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

ويمكن استخدامه في القالب للتحكم في حجم الخط لجميع مقالات المدونة :

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

الآن، دعنا نضيف زر إلى قالب مكون `<BlogPost>`:

```vue{5}
<!-- BlogPost.vue, بدون <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>تكبير النص</button>
  </div>
</template>
```

الزر لا يقوم بأي شيئ حتى الآن - نريد أن يوصل النقر على الزر معلومة للمكون الأب لكي يقوم بتكبير حجم النص في جميع المقالات. لحل هذه المشكلة، توفر المكونات نظامًا مخصصًا للأحداث. يمكن للأب اختيار الاستماع إلى أي حدث من نسخة المكون الابن باستخدام `v-on` أو `@`، كما هو معتاد مع حدث الـDOM الأصلي :

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

ثم يمكن للمكون الابن إرسال حدث على نفسه باستدعاء  للتابع المدمج [**`emit$`**](/api/component-instance#emit)، وتمرير اسم الحدث 

```vue{5}
<!-- BlogPost.vue, بدون <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">تكبير النص</button>
  </div>
</template>
```

بفضل `"enlarge-text="postFontSize += 0.1@`، سيتم استقبال الحدث من قبل المكون الأب وتحديث قيمة `postFontSize`.

<div class="options-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNqNU81q20AQfpVhKSihtlS3PQnFpD30XCj0EuUgS2tHibQrdlduUmEo1AnFL+IQKG0OPfhNtG/T2dVP5P6ECCE0P9+3MzvfVORNUbjLkhKfBDIWaaGmIUvzggsFbzO+eM+lgrngOTiu1zkMwAkZQMjopU1N6DwqMwWV8cYc8YwyJf3GAT2VsVYj800iFR0cdnFBVSlYZwEUmIvok842TwVp4sNkBCpVGfUhJPV9/V2v6zu9AX1d7+BjSd1zGZL2iH3gyyFwa2D1D/1Nb/QN1Lf6y+PgVwOwXuNh2/pnvQXLs9PXet1zgN7UO+S+re+xKMy8Q3NraDvW057fdPmOM/Uh/YzMk8Zt8/CDb+D1I0FD0bzIIkXRAgiSdAm+VFcZPQpJBfOeZkgKz8GhuYN0BJJUYKZQWUgsA3IMp2Ke5XjOTZKhgJQ1UwhJF/Yv6FUbddNk4LdX00Ws8RA8piyLxIKOFb1Ubc5DeUfwwp10ydOgV1jTo4dN4l/g9a2TEWnEOc6jAsfFGQrXqiZsA1hvr7qQoFCNHZIzpQrpe56cx0a959LlYuHhnytKptKculTm45ngnyQVVgftlCyHh84lFWNBWUIFFY9x/pH6F283XmxluE97C/ivrSoEx9PgxLEX7DQqonlq98QZ3rJz+iT1xFkkJU5khlWMzVisMEKF4bPX06pqFA+rVeCh3UZmpVKcwXGcpfEFgp+ZCg72jz9EIlzKr7gSG9wCsyT6pv4VeA34v7Nd/QYfP6AT)

</div>
<div class="composition-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9U81u00AQfpXRCimpiG0CnCwnKkhwroTEpeaQ2Ot0W3vX2t0EimUJibRCeZFUlRD0wCFv4n0bZv2TuJTWJ898M9/8fVuQN3nurpaU+CRQkWS5BkX1Mp+GnGW5kBoKkDSBEhIpMhhg6GAPvU3F4kQo3WKu1zksI4YBhDwSHANydCqYWKrhqQW6rwAW+zAegWY6pT6EpLqrfpp1dWs2YK6qHXxcUvdchQTK0cPEl/3ErU2rfpkfZmOuobox355OftVLNmsstq1+V1uoeXbmyqz3HGA21Q65b6o7bAojb9HcWtqQfzoKeX/M94LrD+wrbacdIxx4zWpxqWhomuXpTFNr6SBmK/CVvkzpJCQFJG22f5/rOQxoNsByBGImMVLqNCTIYKcJurV3I66cRNggSwGMN9sPSQf7F/SyRV0W9/z1NjqkNg7gMeXpTC6oo+kX3cYc2pvAC3fcBU+DvRDqDgMPh8S/wNuPTkak0ZCTzXK8kOAowKJWTAtgvz7UHutDPVk7JGda58r3PJVEVmTnyhVy4eGfK5dcs4y6VGXOXIrPisr69O3haw4PnSsqHUl5TCWVT3H+E/qA19Li+UscpS/7/zykmCaM0xMpcjU8HdR7HVjVNP53GdPW399vDT+qGtyoVU2UzpTCS8yxumPPcRDE2etpUTTihrIMPLRbZL7UWnA4jlIWXWDyM4rlh/eLHyERvr/vqP4NCt6+B3Nd/Qm8JvnRm5Z/AZdfj4I=)

</div>

يمكننا اختيارياً التصريح بالأحداث المرسلة باستخدام <span class="options-api"> خيار [`emits`](/api/options-state#emits) </span> <span class="composition-api"> التعليمة العامة [`defineEmits`](/api/sfc-script-setup#defineprops-defineemits)</span> :

<div class="options-api">

```vue{5}
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{4}
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

هذه الشيفرة توثق جميع الأحداث التي يرسلها مكون ما و بشكل اختياري [تتحقق من صحتها](/guide/components/events#events-validation) . كما تسمح لـ Vue بتجنب تطبيقها تلقائياً كمستمعات أصلية على العنصر الجذري للمكون الابن.

<div class="composition-api">

مثل `defineProps`،  التعليمة العامة `defineEmits` يمكن استخدامها فقط في `<script setup>` ولا تحتاج إلى استيراد. يعيد `emit` دالة تعادل الدالة `emit$`. يمكن استخدامها لإرسال الأحداث في قسم `<script setup>` من المكون ، حيث لا يمكن الوصول إلى `emit$` مباشرة :

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

اطلع أيضا على: [إضافة الأنواع للأحداث المرسلة Emits](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />
  
إذا كنت لا تستخدم `<script setup>`، يمكنك تعريف الأحداث المرسلة باستخدام خيار `emits`. يمكنك الوصول إلى دالة `emit` كخاصية في سياق الخطافة setup (ممررة إلى `()setup` كوسيط ثاني) :

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

هذا كل ما تحتاج معرفته حول الأحداث المخصصة للمكونات لحد الآن، لكن بمجرد انتهائك من قراءة هذه الصفحة وفهم محتواها ، نوصيك بالعودة لاحقًا لقراءة الدليل الكامل حول [الأحداث المخصصة](/guide/components/events).

## توزيع المحتوى باستخدام المنافذ {#content-distribution-with-slots}

تمامًا كما هو الحال مع عناصر HTML، غالبًا ما يكون من المفيد أن تستطيع تمرير محتوى معين داخل أحد المكونات ، كما يلي :

```vue-html
<AlertBox>
  حدث خطأ ما.
</AlertBox>
```

وقد يتم تصييرها إلى شيء مثل:

:::danger هذا خطأ بهدف العرض
حدث خطأ ما.
:::

يمكن بلوغ ذلك باستخدام العنصر المخصص `<slot>`  الخاص بـVue:

```vue{5}
<!-- AlertBox.vue -->
<template>
  <div class="alert-box">
    <strong>هذا خطأ بهدف العرض</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

 كما رأيت أعلاه، نستخدم `<slot>` كعنصر نائب حيث نريد أن يوضع المحتوى الممرر من المكون الأب - وهذا كل شيء. لقد انتهينا!

<div class="options-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9UsGO1DAM/RUTDnvZNoDQCJUy0vIdubSNZ+jSJpGTDkWjPfIlHDgg4MivlL/B7nS6s7vSqj3Ezy8v9rOP6iaE/DCgKlQZG2pD2hrX9sFTgpsOKX30I+zI93CV6zMgF66MAzAOx5lqcVcNXYKjoI3n+w5digUc71XujOO/1OszHCTsQ1cllCiVZypHrJ2mX9Of6SdMv6e/03f49236kc+0tQ7mlXqVUNfqVHjWVyG/jd5xU3NBZklEo7giQQTjJiQ26lNKIRZax10jnd3G3NNe8ymnwaW2xxxjn9Xkv0QkFjbq+kJDM3hAygidRUJ6TvMR9YmuyIpN3Mql1zKcC6cAStseoOmqGD8YVQkzq/1o1JzkdEzk3X67OPeCPT8BS7omvTI7n+AUlZpVH1o6zyimrx1CbHxAy0i+vneeduepgJebzea9xLUnbq6A12GE6LvWAqG9yGRU2Xbg1XgbxhkOlbWt2xfw5tWC1FXzeU9+cDY7q+/eycdZtkf27tSQVGDSwpFn5qksayZlb9Xdf6+CBok=)

</div>
<div class="composition-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9UUFOwzAQ/MpiDr00MSBUoRAqlXf4ksRuSUlsa+2UoqpHXsKBAwKOfCX8hnWSVgEklEt2ZjyeHe/Ywtp40yiWsNQVWFoPTvnGzoUua2vQw6JS6G/NFpZoapjE/ACEYxOhU96foxM0eFXbKvMqTD49SGkCEL59az/aV2jf28/2Gb6e2pe4kx0tSZfyowWbsj5DVGc2XjujKeWusxoIJ1gCHRIwyhNmwe68ty7h3C2LEHLtYoMrTn8xNtqXtYqVq6MczYNTSMaCTUcenMCNwgiVlgoV/uf5S/rHN9juhd7TKuPaQtujpgBSWW6gqDLnbgTLgjLKzVawjiTaeTR6NR+aO6HOe2Cgc+RHZWU89FPKyfVnpd0bOf9YKXCFsUoSEh/v66ssTGUwgdPZbHYd5twgLZfAud2CM1UpAZUcMRFmsmxcApd228E2k7LUqwQuzgYkz4r7FZpGy+jgvrwKH7FUDxWv+4VCAuEHTbime5WgCStT7DnbfwMjhfVr)

</div>

هذا كل ما تحتاج إلى معرفته حول المنافذ إلى حد الآن ، ولكن بمجرد انتهائك من قراءة هذه الصفحة وفهم محتواها ، نوصيك بالعودة لاحقًا لقراءة الدليل الكامل حول [المنافذ](/guide/components/slots).

## المكونات الديناميكية {#dynamic-components}

في بعض الأحيان ، يكون من المفيد التبديل بين المكونات بشكل ديناميكي، مثلا في واجهة علامات التبويب:

<div class="options-api">

[افتح المثال في حقل التجارب](https://play.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEhvbWUsXG4gICAgUG9zdHMsXG4gICAgQXJjaGl2ZVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50VGFiOiAnSG9tZScsXG4gICAgICB0YWJzOiBbJ0hvbWUnLCAnUG9zdHMnLCAnQXJjaGl2ZSddXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cInRhYiBpbiB0YWJzXCJcbiAgICAgICA6a2V5PVwidGFiXCJcbiAgICAgICA6Y2xhc3M9XCJbJ3RhYi1idXR0b24nLCB7IGFjdGl2ZTogY3VycmVudFRhYiA9PT0gdGFiIH1dXCJcbiAgICAgICBAY2xpY2s9XCJjdXJyZW50VGFiID0gdGFiXCJcbiAgICAgPlxuICAgICAge3sgdGFiIH19XG4gICAgPC9idXR0b24+XG5cdCAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50VGFiXCIgY2xhc3M9XCJ0YWJcIj48L2NvbXBvbmVudD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZGVtbyB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDIwcHggMzBweDtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgb3ZlcmZsb3cteDogYXV0bztcbn1cblxuLnRhYi1idXR0b24ge1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjA7XG4gIG1hcmdpbi1ib3R0b206IC0xcHg7XG4gIG1hcmdpbi1yaWdodDogLTFweDtcbn1cbi50YWItYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWItYnV0dG9uLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNlMGUwZTA7XG59XG4udGFiIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogMTBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkhvbWUudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgSG9tZSBjb21wb25lbnRcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIlBvc3RzLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIFBvc3RzIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiQXJjaGl2ZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBBcmNoaXZlIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>
<div class="composition-api">

[افتح المثال في حقل التجارب](https://play.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuIFxuY29uc3QgY3VycmVudFRhYiA9IHJlZignSG9tZScpXG5cbmNvbnN0IHRhYnMgPSB7XG4gIEhvbWUsXG4gIFBvc3RzLFxuICBBcmNoaXZlXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cIihfLCB0YWIpIGluIHRhYnNcIlxuICAgICAgIDprZXk9XCJ0YWJcIlxuICAgICAgIDpjbGFzcz1cIlsndGFiLWJ1dHRvbicsIHsgYWN0aXZlOiBjdXJyZW50VGFiID09PSB0YWIgfV1cIlxuICAgICAgIEBjbGljaz1cImN1cnJlbnRUYWIgPSB0YWJcIlxuICAgICA+XG4gICAgICB7eyB0YWIgfX1cbiAgICA8L2J1dHRvbj5cblx0ICA8Y29tcG9uZW50IDppcz1cInRhYnNbY3VycmVudFRhYl1cIiBjbGFzcz1cInRhYlwiPjwvY29tcG9uZW50PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5kZW1vIHtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMjBweCAzMHB4O1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBvdmVyZmxvdy14OiBhdXRvO1xufVxuXG4udGFiLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMXB4O1xufVxuLnRhYi1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZTBlMGUwO1xufVxuLnRhYi1idXR0b24uYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiSG9tZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBIb21lIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiUG9zdHMudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgUG9zdHMgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJBcmNoaXZlLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIEFyY2hpdmUgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

يتم تحقيق الأمر أعلاه بواسطة عنصر `<component>` الخاص بـ Vue باستخدام السمة `is` الخاصة:

<div class="options-api">

```vue-html
<!-- يتغير المكون عند تغيير currentTab -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- يتغير المكون عند تغيير currentTab -->
<component :is="tabs[currentTab]"></component>
```

</div>

في المثال أعلاه، يمكن أن تحتوي القيمة الممررة إلى `:is` على أي من:

- اسم المكون المسجل كسلسلة نصية، أو
- كائن المكون المستورد حاليا

يمكنك أيضًا استخدام سمة `is` لإنشاء عناصر HTML عادية.

عند التبديل بين عدة مكونات مع `<"..."=component :is>`، سيتم فصل المكون الذي تم التبديل عنه. يمكننا إجبار المكونات غير النشطة على البقاء "نشطة" باستخدام المكون المدمج [`<KeepAlive>`](/guide/built-ins/keep-alive).

## تنبيهات حول تحليل قالب DOM {#dom-template-parsing-caveats}

إذا كنت تكتب قوالب Vue الخاصة بك مباشرة في DOM، فسيضطر Vue إلى استعادة نص قالب من DOM مباشرة. و قد يؤدي ذلك إلى بعض التحذيرات بسبب سلوك تحليل الـHTML الأصلي من طرف المتصفحات.

:::tip ملاحظة
تجدر الملاحظة إلى أن القيود التي نتحدث عنها أدناه تنطبق فقط في حالة إذا كنت تكتب قوالب Vue الخاصة بك مباشرة في DOM. **لا** ينطبق الأمر إذا كنت تستخدم قوالب سلسلة نصية من المصادر التالية :
  
- مكونات أحادي الملف
- قالب سلاسل نصية مضمنة (على سبيل المثال `'...' :template`)
- `<"script type="text/x-template>`
:::

### عدم الحساسية لحالة الأحرف {#case-insensitivity}

تكون الوسوم وأسماء السمات في HTML غير حساسة لحالة الأحرف، لذا ستقوم المتصفحات بتحويل أي حروف كبيرة إلى أحرف صغيرة. وهذا يعني أنه عند استخدام قوالب DOM،  أسماء المكونات بنمط باسكال (PascalCase) وأسماء الخاصيات بنمط سنام الجمل (camelCase) أو أسماء الأحداث `v-on` يجب أن يكتبوا بنمط أسياخ الشواء (kebab-case) :

```js
//نمط سنام الجمل في //JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- نظام أسياخ في HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

### الوسوم ذاتية الغلق {#self-closing-tags}

 في أمثلة الشيفرات السابقة كنا نستخدم الوسوم ذاتية الغلق للمكونات : 

```vue-html
<MyComponent />
```

 لأن محلل قوالب Vue يعتبر `</` كإشارة لإنهاء أي وسم، بغض النظر عن نوعها.

بالمقابل، في قوالب الـDOM، يجب علينا دائمًا تضمين وسوم الغلق بشكل صريح:

```vue-html
<my-component></my-component>
```

هذا لأن مواصفات HTML تسمح فقط [لعدد قليل من العناصر المحددة](https://html.spec.whatwg.org/multipage/syntax.html#void-elements) بحذف وسوم الغلق، وأكثرها شيوعًا هي عناصر `<input>` و `<img>`. بالنسبة لجميع العناصر الأخرى، إذا حذفت وسم الغلق، فسيفترض المحلل الأصلي لـ HTML أنك لم تنهي وسم الفتح. على سبيل المثال،  الشيفرة التالية:

```vue-html
<my-component /> <!-- نعتزم إغلاق الوسم هنا... -->
<span>مرحبا</span>
```

سُتحلل كالتالي:

```vue-html
<my-component>
  <span>مرحبا</span>
</my-component> <!-- ولكن المتصفح سيغلقها هنا. -->
```

### قيود وضع العنصر {#element-placement-restrictions}
  
بعض عناصر HTML مثل `<ul>` و `<ol>` و `<table>` و `<select>` لها قيود على ما يمكن أن يُعرض داخلها، وبعض العناصر مثل `<li>` و `<tr>` و `<option>` يمكن أن تظهر فقط داخل عناصر محددة.

هذا سيؤدي إلى مشاكل عند استخدام المكونات مع العناصر التي لها هذه القيود. على سبيل المثال:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

المكون المخصص `<blog-post-row>` سيُرفع كمحتوى غير صالح، مما يسبب أخطاء في الناتج النهائي المُصيّر. يمكننا استخدام السمة الخاصة [`is`](/api/built-in-special-attributes#is) كحل للمشكلة:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip ملاحظة
عند استخدام العناصر الأصلية لـ HTML، يجب أن تكون قيمة `is` مسبوقة بـ `:vue` لتُفسّر كمكون Vue. هذا مطلوب لتجنب الالتباس مع [عناصر HTML المدمجة المُخصَّصة](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example).
:::

هذا كل ما تحتاج إلى معرفته حول الأخطاء في تحليل قوالب DOM إلى حد الآن - و بالفعل قد وصلنا إلى آخر محور في _أساسيات_  Vue. مبارك عليك! لا يزال هناك المزيد لتعلمه، لكن أولاً، نوصي بالاستراحة للعب مع Vue بنفسك عن طريق إنشاء شيء ممتع، أو تحقق من بعض [الأمثلة](/examples/) إذا لم تقم بذلك بعد.

بمجرد أن تفهم ما تم تناوله حتى الآن، انتقل إلى الدليل لتتعلم المزيد عن المكونات بشكل عميق.
