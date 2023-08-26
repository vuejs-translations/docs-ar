# الدوال التركيبية {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip ملاحظة
نفترض في هذا القسم أنه لديك معرفة أساسية بالواجهة التركيبية. إذا كنت تتعلم Vue باستخدام واجهة الخيارات فقط ، يمكنك تعيين تفضيل الواجهة التركيبية (باستخدام زر التبديل في أعلى الشريط الجانبي على اليسار) وإعادة قراءة الفصول [أساسيات التفاعل](/guide/essentials/reactivity-fundamentals) و [خطافات دورة الحياة](/guide/essentials/lifecycle).
:::

##  ماهي الدالة "التركيبية"؟ {#what-is-a-composable}

في سياق تطبيقات Vue ، تُعتبر الدالة "التركيبية" دالة تستخدم الواجهة التركيبية لـVue لتشكيل وإعادة استخدام **شيفرة ذات حالة**.    

  عند بناء تطبيقات الواجهة الأمامية، نحتاج في كثير من الأحيان إلى إعادة استخدام الشيفرة في المهام الشائعة. على سبيل المثال ، قد نحتاج إلى تنسيق التواريخ في العديد من الأماكن ، لذلك نقوم باستخراج دالة مستخدمة مرة أخرى لذلك. تشمل هذه الدالة المنسقة **الشيفرة ذات الحالة**: تأخذ بعض المدخلات وتعيد الناتج المتوقع على الفور. هناك العديد من المكتبات المتاحة لإعادة استخدام الشيفرة ذات الحالة - على سبيل المثال [lodash](https://lodash.com/) و [date-fns](https://date-fns.org/) ، والتي ربما قد سمعت بها من قبل.

على النقيض من ذلك، تشتمل الشيفرة ذات الحالة على إدارة الحالة التي تتغير مع مرور الوقت. مثال بسيط على ذلك هو تتبع الموقع الحالي للفأرة على صفحة. في السيناريوهات  الحقيقية على أرض الواقع، يمكن أن تكون  الشيفرة أكثر تعقيدًا مثل الحركات اللمسية أو حالة الاتصال بقاعدة البيانات.

## مثال تتبع حركة مؤشر الفأرة {#mouse-tracker-example}

إذا كنا نقوم بتنفيذ وظيفة تتبع الماوس باستخدام الواجهة التركيبية  مباشرة داخل مكون، فسيبدو كما يلي:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>موضع مؤشر الفأرة في: {{ x }}, {{ y }}</template>
```

لكن ماذا لو أردنا إعادة استخدام نفس الشيفرة في عدة مكونات؟ يمكننا استخراج الشيفرة إلى ملف خارجي ، كدالة تركيبية:

```js
// mouse.js ملف
import { ref, onMounted, onUnmounted } from 'vue'

// اصطلاحا، تبدأ أسماء الدوال التركيبية بـ  "use"
export function useMouse() {
  // حالة محصورة ومدارة من قبل الدالة التركيبية
  const x = ref(0)
  const y = ref(0)

  // يمكن للدالة التركيبية تحديث حالتها المدارة عبر مرور الوقت.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // يمكن للدالة التركيبية أيضًا الربط بدورة حياة
  // مكونها الأصلي لإعداد وتدمير الآثار الجانبية.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // عرض الحالة المدارة كقيمة مُرجعة
  return { x, y }
}
```

و هكذا يمكن استخدامه في المكونات:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>موضع مؤشر الفأرة: {{ x }}, {{ y }}</template>
```

<div class="demo">
  موضع مؤشر الفأرة: {{ x }}, {{ y }}
</div>

[Try it in the Playground](https://play.vuejs.org/#eNqNkj1rwzAQhv/KocUOGKVzSAIdurVjoQUvJj4XlfgkJNmxMfrvPcmJkkKHLrbu69H7SlrEszFyHFDsxN6drDIeHPrBHGtSvdHWwwKDwzfNHwjQWd1DIbd9jOW3K2qq6aTJxb6pgpl7Dnmg3NS0365YBnLgsTfnxiNHACvUaKe80gTKQeN3sDAIQqjignEhIvKYqMRta1acFVrsKtDEQPLYxuU7cV8Msmg2mdTilIa6gU5p27tYWKKq1c3ENphaPrGFW25+yMXsHWFaFlfiiOSvFIBJjs15QJ5JeWmaL/xYS/Mfpc9YYrPxl52ULOpwhIuiVl9k07Yvsf9VOY+EtizSWfR6xKK6itgkvQ/+fyNs6v4XJXIsPwVL+WprCiL8AEUxw5s=)

كما نلاحظ، تبقى الشيفرة الرئيسية متطابقة- كل ما علينا القيام به هو نقله إلى دالة خارجية وإرجاع الحالة التي يجب عرضها. تمامًا كما هو الحال داخل المكون، يمكنك استخدام مجموعة كاملة من [دوال الواجهة التركيبية](/api/#composition-api) في الدوال التركيبية. يمكن استخدام نفس دالة `()useMouse` الآن في أي مكون.

الجزء الأكثر جاذبية حول الدوال التركيبية هو أنه يمكنك أيضًا جعلها متداخلة: يمكن لدالة تركيبية واحدة استدعاء دالة تركيبية أخرى أو أكثر. وهذا يتيح لنا تركيب شيفرة عميقة باستخدام وحدات صغيرة ومنفصلة، مماثلة لكيفية تركيب تطبيق كامل باستخدام المكونات. في الواقع، هذا هو السبب في اختيارنا للتعبير عن مجموعة الواجهة البرمجية التي تجعل هذا النمط ممكنًا باسم الواجهة التركيبية.

على سبيل المثال، يمكننا استخراج شيفرة إضافة وإزالة مستمع حدث الـDOM إلى دالة تركيبية منفصلة:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // إذا أردت ، يمكنك أيضًا جعل هذا
  // يدعم محدد السلاسل النصية كهدف
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

والآن يمكن تبسيط `()useMouse` التركيبية إلى:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip ملاحظة
يمكن لكل نسخة مكون استدعاء `()useMouse` إنشاء نسخه من الحالة `x` و `y` لذلك لن يتداخلوا مع بعضهم البعض. إذا كنت ترغب في إدارة الحالة المشتركة بين المكونات ، قراءة فصل [إدارة الحالة](/guide/scaling-up/state-management).
:::

## مثال عن حالة لاتزامنية {#async-state-example}

الدالة التركيبية `()useMouse` لا تأخذ أي وسائط، لذلك دعونا ننظر إلى مثال آخر يستخدم وسيط. عند القيام بجلب البيانات غير المتزامنة ، نحن عادة نحتاج إلى معالجة حالات مختلفة: التحميل ، النجاح ، والخطأ:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">هناك خطأ ما: {{ error.message }}</div>
  <div v-else-if="data">
    حُملت البيانات:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>تحميل...</div>
</template>
```

قد يكون مزعجًا إعادة هذا النمط في كل مكون يحتاج إلى جلب البيانات. دعونا نستخرجه إلى دالة تركيبية:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

الآن في مكوننا يمكننا فقط القيام بـ:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

### قبول حالة تفاعلية {#accepting-reactive-state}

الدالة التركيبية `()useFetch` تأخذ سلسلة نصية عبارة عن عنوان URL ثابتة كإدخال - لذلك يقوم بالبحث مرة واحدة فقط ثم ينتهي. ماذا لو أردنا إعادة البحث كلما تغيرت العنوان URL؟ من أجل تحقيق هذا، نحتاج إلى تمرير الحالة التفاعلية إلى الدالة التركيبية، والسماح للدالة التركيبية بإنشاء مراقبين يقومون بإجراءات باستخدام الحالة الممررة.

على سبيل المثال، يجب أن تكون الدالة التركيبية `()useFetch` قادرة على قبول مرجع:

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// هذا يجب أن يؤدي إلى إعادة البحث
url.value = '/new-url'
```

Or, accept a getter function:

أو، قبول دالة محصلة:

```js
// إعادة البحث عند تغيير props.id
const { data, error } = useFetch(() => `/posts/${props.id}`)
```

يمكننا إعادة تنظيم تنفيذنا الحالي مع واجهتي البرمجة [`()watchEffect`](/api/reactivity-core.html#watcheffect) و [`()toValue`](/api/reactivity-utilities.html#tovalue):

```js{8,13}
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(() => {
    // إعادة تعيين الحالة قبل البحث .. 
    data.value = null
    error.value = null
    // toValue() يفك المراجع التفاعلية المحتملة or getters
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  })

  return { data, error }
}
```

`()toValue` هي واجهة برمجية أضيفت في النسخة 3.3. صممت لتطبيع المراجع أو الدوال المحصلة إلى قيم. إذا كان الوسيط مرجعًا، فإنه يعيد قيمة المرجع؛ إذا كان الوسيط دالة، فسيقوم بالاتصال بالدالة وإرجاع قيمة الإرجاع الخاصة بها. وإلا، فإنه يعيد الوسيط كما هو. يعمل بنفس الطريقة مثل [`()unref`](/api/reactivity-utilities.html#unref)، ولكن مع معاملة خاصة للدوال.

لاحظ أن `toValue(url)` يستدعى **داخل** خطاف `()watchEffect`. هذا يضمن تتبع أي اعتماديات تفاعلية يُتوصل إليها أثناء تطبيع `()toValue` بواسطة الدالة المراقبة.

الآن  هذه النسخة من `()useFetch` تقبل سلاسل نصية URL ثابتة ومراجع ودوال محصلة، مما يجعلها أكثر مرونة بكثير. ستشغل الآثار الجانبية على الفور، وستُتبع أي اعتماديات يُتوصل إليها أثناء `toValue(url)`. إذا لم تُتبع أي اعتماديات (على سبيل المثال، العنوان URL هو سلسلة بالفعل)، فإن الآثار الجانبية تعمل مرة واحدة فقط؛ وإلا، فسيعاد تشغيلها كلما تغيرت اعتمادية مُتتبعة.

هنا [النسخة المحدثة من `useFetch()`](https://play.vuejs.org/#eNptVMFu2zAM/RXOFztYZncodgmSYAPWnTZsKLadfFFsulHrSIZEJwuC/PtIyXaTtkALxxT5yPf45FPypevyfY/JIln6yumOwCP13bo0etdZR3ACh80cKrvresIaztA4u4OUi9KLpN7jN6RqO53nxRjKHz1nlqayxhNslMc/roUVpFuizi+K4tFb07Wqwq1ta3Q5HTtd2RpzblqQra0vGCCW65oreaIs/ZjOxmAf8MYRs2wGq/XU6D3X5HvV9sj5Y8UJakVqDuicdXMGJHfk0VcTj4wxOX9ZRFVYD34h3PGchPwG8N2qGjobZlpIYLnpiayB/YfGulWZaNAGPpUJfK5aXT1JRIbXZbI+nUDD+bwsYklAL2lZ6z1X64ZTw2CcKcAM3a1/2s6/gzsJAzKL3hA6rBfAWCE536H36gEDriwwFA4zTSMEpox7L8+L/pxacPv4K86Brcc4jGjFNV/5AS3TlrbLzqHwkLPYkt/fxFiLUto85Hk+ni+LScpknlwYhX147buD4oO7psGK5kD2r+zxhQdLg/9CSdObijSzvVoinGSeuPYwbPSP6VtZ8HgSJHx5JP8XA2TKH00F0V4BFaAouISvDHhiNrBB3j1CI90D5ZglfaMHuYXAx3Dc2+v4JbRt9wi0xWDymCpTbJ01tvftEbwFTakHcqp64guqPKgJoMYOTc1+OcLmeMUlEBzZM3ZUdjVqPPj/eRq5IAPngKwc6UZXWrXcpFVH4GmVqXkt0boiHwGog9IEpHdo+6GphBmgN6L1DA66beUC9s4EnhwdeOomMlMSkwsytLac5g7aR11ibkDZSLUABRk+aD8QoMiS1WSCcaKwISEZ2MqXIaBfLSpmchUb05pRsTNUIiNkOFjr9SZxyJTHOXx1YGR49eGRDP4rzRt6lmay86Re7DcgGTzAL74GrEOWDUaRL9kjb/fSoWzO3wPAlXNB9M1+KNrmcXF8uoab/PaCljQLwCN5oS93+jpFWmYyT/g8Zel9NEJ4S2fPpYMsc7i9uQlREeecnP8DWEwr0Q==), with an artificial delay and randomized error for demo purposes.

## اصطلاحات و ممارسات جيدة {#conventions-and-best-practices}

### التسمية {#naming}

من المصطلح عليه استخدام أسماء دالة تركيبية بنمط سنام الجمل camelCase والتي تبدأ بـ "use".

### وسائط الإدخال {#input-arguments}

الدالة التركيبية يمكنها قبول المراجع التفاعلية كوسائط حتى لو لم تعتمد عليها بهدف التفاعل. إذا كنت تكتب دالة تركيبية قد يستخدمها مطورون آخرون، فإنه من الممارسات الجيدة معالجة حالة وسائط الإدخال الخاصة بالمطورين كمراجع بدلاً من قيم خام. ستكون [`()toValue`](/api/reactivity-utilities.html#tovalue) مفيدة لهذا الغرض:

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // إذا كان maybeRefOrGetter مرجعًا أو محصلة،
  // سترجع قيمته المعيارية.
  // وإلا، يرجع كما هو.
  const value = toValue(maybeRefOrGetter)
}
```

إذا كانت الدالة التركيبية الخاصة بك تنشئ آثارًا تفاعلية عندما يكون المدخل مرجعًا أو محصلة، تأكد من مراقبة المرجع / المحصلة بشكل صريح باستخدام `()watch`، أو استدعاء `()toValue` داخل `()watchEffect` حتى يتتبع بشكل صحيح.

توفر [النسخة المحدثة من `()useFetch` التي ناقشناها سابقًا](#accepting-reactive-state) مثالًا ملموسًا على دالة تركيبية تقبل المراجع والمحصلات والقيم العادية كوسيط إدخال.

### قيم الإرجاع {#return-values}

ربما لاحظت أننا استخدمنا `()ref` بدلاً من `()reactive` في الدوال التركيبية. الممارسة الموصى بها هي استخدام دوال تركيبية لإرجاع كائن بسيط وغير تفاعلي يحتوي على مراجع تفاعلية متعددة. هذا يسمح بتفكيك الكائن في المكونات بينما يبقى تفاعلياً:

```js
// x و y  هما مرجعان تفاعليان
const { x, y } = useMouse()
```

ارجاع كائن تفاعلي من دالة تركيبية سيؤدي إلى فقدان تفاعلية الكائن المفكك بينما ستبقى المراجع متصلة بالحالة داخل الدالة التركيبية.

إذا كنت تفضل استخدام الحالة المرجعة من الدوال التركيبية كخاصيات للكائن، يمكنك تغليف الكائن المرجع بـ `()reactive` حتى يُفَك تغليف المراجع. على سبيل المثال:

```js
const mouse = reactive(useMouse())
//mouse.x مرتبط بالمرجع الأصلي
console.log(mouse.x)
```

```vue-html
موضع مؤشر الفأرة: {{ mouse.x }}, {{ mouse.y }}
```

### التأثيرات الجانبية {#side-effects}

من الممكن تنفيذ الآثار الجانبية (مثل إضافة مستمعين لحدث DOM أو جلب البيانات) في الدوال المُركَّبة، لكن يجب الانتباه إلى القواعد التالية:

- إذا كنت تعمل على تطبيق يستخدم [تصيير من جانب الخادم](/guide/scaling-up/ssr) (SSR)، فتأكد من تنفيذ الآثار الجانبية المتعلقة بـ DOM في مراحل حياة ما بعد الوصل، على سبيل المثال `()onMounted`. تُستدعي هذه الخطافات فقط في المتصفح، لذا يمكنك التأكد من أن الشيفرة الموجودة داخلها لديها وصول إلى DOM.

- تذكر تنظيف الآثار الجانبية في `()onUnmounted`. على سبيل المثال، إذا كانت الدالة التركيبية تضبط مستمعًا لحدث DOM، فيجب أن تزيل هذا المستمع في `()onUnmounted` كما رأيناه في مثال `()useMouse`. قد يكون من الجيد استخدام دالة تركيبية تقوم بذلك تلقائيًا بالنسبة لك، مثل `()useEventListener`.

### قيود الاستخدام {#usage-restrictions}

الدوال التركيبية يجب استدعاؤها **بشكل متزامن** في `<script setup>` أو في خطاف `()setup`. في بعض الحالات، يمكنك أيضًا استدعاؤها في خطافات حياة مثل `()onMounted`.

هذه القيود مهمة لأن هذه هي السياقات التي يمكن لـ Vue تحديد النسخة النشطة من المكون الحالي. يعد الوصول إلى النسخة النشطة من المكون ضروريًا لذلك:

1. يمكن تسجيل خطافات مراحل الحياة فيها.

2. الخاصيات المحسوبة والمراقبة يمكن ربطهم بها، حتى يمكن تفريغها عند إلغاء تثبيت الحالة لمنع التسربات في الذاكرة.

:::tip ملاحظة
`<script setup>` هي المكان الوحيد الذي يمكنك من استدعاء الدوال المركَّبة **بعد** استخدام `await`. يقوم المصرف بإعادة تعيين سياق الحالة النشطة تلقائيًا بعد العملة اللاتزامنية.
:::

## استخراج الدوال التركيبية لتنظيم الشيفرة {#extracting-composables-for-code-organization}

الدوال التركيبية المستخدمة يمكن استخراجها إلى ملفات مستقلة ليس فقط من أجل إعادة الاستخدام، بل أيضًا لتنظيم الشيفرة. مع نمو تعقيدات مكوناتك، قد ينتهي بك الأمر بمكونات كبيرة جدًا بحيث لا يمكن التنقل بينها وفهمها. تمنحك الواجهة التركيبية الحرية الكاملة لتنظيم شيفرة مكونك إلى دوال أصغر حجمًا بناءً على اهتمامات منطقية:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

إلى حد ما، يمكنك اعتبار هذه الدوال التركيبية المستخرجة كخدمات في نطاق المكونات التي يمكنها التواصل فيما بينها.

## استخدام الدوال التركيبية في واجهة الخيارات {#using-composables-in-options-api}

إذا كنت تستخدم واجهة الخيارات، يجب استدعاء الدوال التركيبية داخل `()setup`, ويجب إرجاع الخاصيات المربوطة المرجعة من `()setup` حتى يتم استعراضها على `this` والقالب:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // يمكن الوصول إلى خاصيات  setup() على `this`
    console.log(this.x)
  }
  // ...other options
}
```

## المقارنة مع تقنيات أخرى {#comparisons-with-other-techniques}

### المقارنة مع المخلوطات (mixins) {#vs-mixins}

المستخدمون القادمون من Vue 2 قد يكونون على دراية بخيار [mixins](/api/options-composition#mixins)، الذي يسمح أيضًا باستخراج شيفرة مكون إلى وحدات قابلة للإعادة الاستخدام. هناك ثلاثة عيوب رئيسية للمخلوطات:

1. **مصدر غير واضح**: عند استخدام العديد من المخلوطات، يصبح غير واضحًا أي خاصية مثبتة من قبل المخلوط، مما يجعل من الصعب تتبع التنفيذ وفهم سلوك المكون. هذا هو السبب في أننا نوصي باستخدام المراجع التفاعلية + تفكيك الخاصيات للدوال التركيبية: تجعل مصدر الخاصية واضحًا في المكونات المُستهلِكة.

2. **تداخلات الفضاءات الإسمية**: يمكن لمخلوطات متعددة  من مطورين مختلفين تسجيل نفس مفاتيح لخاصيات مختلفة، مما يسبب تداخلات الفضاءات الإسمية. مع الدوال التركيبية، يمكنك إعادة تسمية المتغيرات المفككة إذا كانت هناك مفاتيح متعارضة من الدوال التركيبية المختلفة.

3. **التواصل الضمني عبر المخلوطات**: يجب على المخلوطات المتعددة التي تحتاج إلى التفاعل مع بعضها البعض أن تعتمد على مفاتيح الخاصية المشتركة، مما يجعلها مرتبطة بشكل ضمني. مع الدوال التركيبية، يمكنك إرسال القيم التي تم إرجاعها من دالة تركيبية إلى دالة تركيبية أخرى كوسيط، مثل الدوال العادية.

للأسباب المذكورة أعلاه، لا نوصي بعد الآن باستخدام المخلوطات في Vue 3.  احتفظ بالميزة فقط من أجل الترقية و تعود الكثير من المطورين عليها.

### المقارنة مع المكونات عديمة التصيير {#vs-renderless-components}

في فصل منافذ المكونات، تحدثنا عن نمط [المكون عديم التصيير](/guide/components/slots#renderless-components) بناءً على المنافذ ذات النطاق، حتى أننا قمنا بتطبيق نفس العرض التوضيحي لتتبع مؤشر الفأرة باستخدام المكونات عديمة التصيير.

الميزة الرئيسية للدوال التركيبية على المكونات عديمة التصيير هي أن الدوال التركيبية لا تزيد تكلفة إضافية إلى نسخة المكون. عند استخدامها على مستوى كامل التطبيق، يمكن أن تصبح كمية نسخ المكونات الإضافية المنشأة من خلال نمط المكونات عديمة التصيير ذات تكلفة أداء ملحوظة.

التوصية هي استخدام الدوال التركيبية عند إعادة استخدام الشيفرة البحتة، واستخدام المكونات عند إعادة استخدام الشيفرة والنسق البصري (محتوى القالب).

### المقارنة مع خطافات Reactjs {#vs-react-hooks}

إذا كان لديك خبرة في React، فقد تلاحظ أن هذا يبدو مماثلاً لخطافات React المخصصة. تم إستلهام الواجهة التركيبية من قبل خطافات React، والدوال التركيبية في Vue هي مماثلة للخطافات React من حيث قدرات تركيب الشيفر. ومع ذلك، تعتمد الدوال التركيبية في Vue على نظام التفاعلية الدقيق لـ Vue، وهو مختلف بشكل أساسي عن نموذج تنفيذ خطافات React. يتم مناقشة ذلك بشكل أكثر تفصيلاً في [أسئلة وأجوبة حول الواجهة التركيبية](/guide/extras/composition-api-faq#comparison-with-react-hooks).

## للمزيد من الاطلاع {#further-reading}

- [نظام التفاعلية بالتفصيل](/guide/extras/reactivity-in-depth): لفهم كيفية عمل نظام التفاعلية في Vue  بشكل معمق.
- [إدارة الحالة](/guide/scaling-up/state-management): لإدارة الحالة المشتركة بين عدة مكوّنات.
- [اختبار الدوال التركيبية](/guide/scaling-up/testing#testing-composables): نصائح لاختبار الوحدات في الدوال التركيبية.
- [VueUse مكتبة](https://vueuse.org/): مجموعة متنامية من الدوال التركيبية لـVue.  الشيفرة المصدرية هي أيضا مصدر تعلم رائع.
