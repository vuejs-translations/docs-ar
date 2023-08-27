---
outline: deep
---

# أساسيات التفاعلية {#reactivity-fundamentals}

:::tip تفضيلات واجهة البرمجة
هاته الصفحة والعديد من المحاور الأخرى في المرجع تحتوي على محتوى مختلف بواجهة الخيارات و  الواجهة التركيبية. تفضيلك الحاليل هو <span class="options-api">واجهة الخيارات</span><span class="composition-api">الواجهة التركيبية</span>. يمكنك التبديل بين نمطي الواجهتين باستخدام مفاتيح التبديل "تفضيلات واجهة البرمجة" في أعلى جانب الشريط الجانبي الأيسر.
:::

<div class="options-api">

## التصريح بحالة تفاعلية \* {#declaring-reactive-state}

مع واجهة الخيارات، نستخدم خيار `data` للتصريح بحالة تفاعلية داخل المكون. قيمة الخيار يجب أن تكون دالة تعيد كائن `{}`. ستقوم Vue باستدعاء الدالة عند إنشاء نسخة جديدة من المكون، وتغليف الكائن المعاد في نظام تفاعليته. أي خاصيات من المستوى الأعلى من المكونات الأم أو من جذر التطبيق لهذا الكائن متاحة على مستوى نسخة المكون (this في التوابع وخطافات دورة الحياة) :

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` هي خطاف دورة حياة سنشرحها لاحقا
  mounted() {
    // `this` يشير إلى نسخة المكون
    console.log(this.count) // => 1

    // الخاصيات من الكائن المعاد يمكن تغييرها
    this.count = 2
  }
}
```

[اختبره في حقل التجارب](https://play.vuejs.org/#eNp9kl1qAjEQx68y5ElBd2kfRYXeIw9uNX7hZpck2oL40PpZ79EuFayIlmJPMrlNJ7u6QguFXTL/SeY3k5mM2V0ce6OhYBVW1U3Vi02dS/EYR8pAS7SD4cDAmEuAVmCCQjGzAZQwQyUvCqAZDaWpwE2mJ26ZlLh0q+9DI3TbotUAu7RrwA/8wsQ+Ae7sCvf4Dri1a0yccbALPJJva5eYgJ2Rd2ufMXGkM+VahUObbk8Td41H+veAr3ZmX4AoB0pDwIT03E7tyi6yoGYkdTQQ3iDqFFywl9ZedLBa3d0gZ7tYgiT4mVa3AQItMuKU9NtFzPFEckdFpJnIu8FvElSPu0XGu6aCGtymDeKSvqqft52EEWE8CIwglaU/4c6xKzAeZ02GSRqUH2Ql1gvduMphEHt9HUkaZdofft7QnFF4VgVnNGunOesaE+uK7+t20z2AvvYi1fHJ8hSl6YXCEzos36voQQtFYM5ooDnDJ+dIqLISsiWUUP8xfx39w700g01+ACxIF8Y=)

هاته الخاصيات التابعة لنسخة المكون تُضاف فقط عند إنشاء النسخة لأول مرة، لذا يجب التأكد من وجود كلها في الكائن المعاد من الدالة `data`. حين تقتضي الضرورة، استخدم `null`، `undefined` أو بعض القيم المؤقتة للخاصيات التي لا تتوفر قيمها الحقيقية عندئذ.

من الممكن إضافة خاصية جديدة مباشرة إلى `this` دون تضمينها في `data`. لكن لن تتمكن الخصائص المضافة بهذه الطريقة من تشغيل تحديثات تفاعلية.

Vue تستخدم البادئة `$` لتوفير واجهات برمجة للخاصيات الجذرية داخل نسخة المكون. كما أنها تحجز البادئة `_` للخاصيات الداخلية. يجب عليك تجنب استخدام أسماء لخاصيات الـ`data` الرئيسية التي تبدأ بأحد هذه الرموز.

### الوسيط التفاعلي مقابل الأصلي \* {#reactive-proxy-vs-original}

في Vue 3، يتم جعل البيانات تفاعلية عن طريق استخدام [JavaScript وسائط](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). يجب على المستخدمين القادمين من Vue 2 أن يكونوا على علم بالحالة المحددة التالية:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

عندما تصل إلى `this.someObject` بعد تعيينه، فإن القيمة هي وسيط تفاعلي لـ `newObject` الأصلي. **على عكس Vue 2، فإن `newObject` الأصلي يبقى غير متغير ولن يتم جعله تفاعليًا: تأكد  دائمًا من الوصول إلى الحالة التفاعلية كخاصية لـ `this`.**

</div>

<div class="composition-api">

## التصريح بحالة تفاعلية  \*\* {#declaring-reactive-state-1}

### `ref()` \*\* {#ref}

في الواجهة التركيبية، الطريقة الموصى بها للتصريح بالحالة التفاعلية هي استخدام دالة [`()ref`](/api/reactivity-core#ref):

```js
import { ref } from 'vue'

const count = ref(0)
```

الدالة `()ref` تأخذ الوسيط وتعيده مغلفا داخل كائن تفاعلي مع خاصية `value.`:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

> اطلع أيضا على : [كيفية إضافة النوع إلى ref](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

من أجل الوصول إلى المرجع التفاعلي في قالب المكون، قم بتصريحه وإرجاعه من دالة `()setup` للمكون:

```js{5,9-11}
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}
```

```vue-html
<div>{{ count }}</div>
```

تجدر الملاحظة أننا **لم** نحتاج إلى إضافة `value.` عند استخدام المرجع التفاعلي في قالب المكون. بشكل ملائم، يفك المرجع تلقائيًا عند استخدامه داخل القوالب (مع بعض [التنبيهات](#caveat-when-unwrapping-in-templates)).

يمكنك أيضًا تغيير المرجع مباشرة في معالجات الأحداث:

```vue-html{1}
<button @click="count++">
  {{ count }}
</button>
```

من أجل الشيفرة المعقدة، يمكننا التصريح يالدوال التي تغيّر المراجع في نفس النطاق وعرضها كتوابع إلى جانب الحالة:

```js{7-10,15}
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // .value مطلوب في جافاسكريبت
      count.value++
    }

    // لا تنسى عرض الدالة أيضًا.
    return {
      count,
      increment
    }
  }
}
```

الدوال المعروضة يمكن استخدامها كمستمعات للأحداث:

```vue-html{1}
<button @click="increment">
  {{ count }}
</button>
```

هنا المثال المباشر على [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo)، بدون استخدام أي أدوات بناء.

### `<script setup>` \*\* {#script-setup}

عرض الحالة والتوابع يدويا من خلال `()setup` يمكن أن يكون مطولا. لحسن الحظ، يمكن تجنب ذلك عند استخدام [المكونات أحادية الملف (SFCs)](/guide/scaling-up/sfc). يمكننا تبسيط الاستخدام مع `<script setup>`:

```vue{1}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNcllvYe2dgwQqiZhDhxE3L3jrW4/DPvv1/UK8Zhz6juSm82uciwIef4MOR8DImhQMIFKiwpeGgEbQwZsoE2BhsyMUwH0d66475ksuwCgSOb0CNx20ExBCc77POase8NVUN6PBdlSwKjj+vMKAlAvzOzWJ52dfYzGXXpjPoBAKX856uopDGeFfnq8XKp+gWq4FAi)

استيرادات المستوى الأعلى، المتغيرات والدوال المعرفة في `<script setup>` يمكن استخدامها تلقائيا في قالب نفس المكون. تخيل القالب كدالة JavaScript معرفة في نفس النطاق - لديها بشكل طبيعي الوصول إلى كل شيء معرف بجانبها.

:::tip ملاحظة
في بقية الدليل، سنستخدم بشكل أساسي صيغة المكونات أحادية الملف + `<script setup>` في أمثلة الواجهة البرمجية التركيبية، حيث أن هذا هو الاستخدام الأكثر شيوعا لمطوري Vue.

إذا لم تكن تستخدم المكونات أحادية الملف، يمكنك استخدام الواجهة البرمجية التركيبية مع خيار [`()setup`](/api/composition-api-setup).
:::

### لماذ المراجع التفاعلية Refs؟ \*\* {#why-refs}

ربما تتساءل لماذا نحتاج إلى المراجع مع `value.` بدلا من الاستخدام المباشر للمتغيرات العادية. لشرح ذلك، سنحتاج إلى مناقشة نظام التفاعلية في Vue بشكل موجز.

عند استخدام المرجع في قالب المكون، وتغيير قيمة المرجع لاحقا، يكتشف Vue تلقائيا التغيير ويحدث الـDOM وفقا لذلك. يتم ذلك بفضل نظام التفاعلية القائم على تتبع الاعتماديات. عندما يصير المكون للمرة الأولى، يقوم Vue **بتتبع** كل مرجع استخدم خلال التصيير. في وقت لاحق، عندما يتغير المرجع، سيؤدي ذلك إلى **تشغيل** إعادة التصيير للمكونات التي تتتبعه.

في Javascript القياسية، لا يوجد طريقة لكشف الوصول أو التغيير للمتغيرات العادية. ومع ذلك، يمكننا اعتراض عمليات الحصول والتعيين لخصائص الكائن باستخدام توابع الحصول والتعيين.

الخاصية `value.` تعطي Vue الفرصة لكشف متى تم الوصول إلى المرجع أو تغييره. وراء الكواليس، تقوم Vue بتتبع في دالته المحصلة، وتقوم بالتشغيل في دالة التعيين. من الناحية المفهومية، يمكنك تخيل المرجع ككائن يبدو كالتالي:

```js
// شيفرة وهمية، ليست تنفيذ فعلي
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

خاصية أخرى جميلة للمراجع هي أنه على عكس المتغيرات العادية، يمكنك تمرير المراجع إلى الدوال مع الاحتفاظ بالوصول إلى أحدث قيمة و ربط التفاعلية. هذا مفيد بشكل خاص عند إعادة تنظيم الشيفرة المعقدة إلى شيفرة قابلة لإعادة الاستخدام.

نظام التفاعلية يناقش بتفاصيل أكثر في قسم [التفاعلية بالتفصيل](/guide/extras/reactivity-in-depth).
</div>

<div class="options-api">

## التصريح بالتوابع \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

لإضافة التوابع إلى نسخة المكون ، نستخدم خيار `methods`. يجب أن يكون هذا كائنًا يحتوي على التوابع المطلوبة:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // التوابع يمكن استدعاؤها في خطافات دورة الحياة أو في توابع أخرى!
    this.increment()
  }
}
```

تربط Vue قيمة الـ`this` تلقائيًا مع التوابع حتى تُشير دائمًا إلى نسخة المكون. يؤكد هذا من أن التابع يحافظ على القيمة `this` الصحيحة إذا كان مستخدمًا كمستمع للأحداث أو رد نداء. يُحبَّذ تجنب استخدام الدوال السهمية عند تعريف الـ`methods`، حيث يمنع ذلك Vue من ربط قيمة الـ`this` المناسبة:

```js
export default {
  methods: {
    increment: () => {
      //`this`  هنا لا يمكن الوصول إلى  !
    }
  }
}
```

تمامًا مثل جميع الخاصيات الأخرى في نسخة المكون ، يمكن الوصول إلى `methods` من داخل قالب المكون. والتي تُستخدم عادة كمستمعات للأحداث:

```vue-html
<button @click="increment">{{ count }}</button>
```

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNplj9EKwyAMRX8l+LSx0e65uLL9hy+dZlTWqtg4BuK/z1baDgZicsPJgUR2d656B2QN45P02lErDH6c9QQKn10YCKIwAKqj7nAsPYBHCt6sCUDaYKiBS8lpLuk8/yNSb9XUrKg20uOIhnYXAPV6qhbF6fRvmOeodn6hfzwLKkx+vN5OyIFwdENHmBMAfwQia+AmBy1fV8E2gWBtjOUASInXBcxLvN4MLH0BCe1i4Q==)

في المثال أعلاه، سيستدعى التابع `increment` عند النقر على `<button>`.

</div>

### التفاعلية العميقة {#deep-reactivity}

<div class="options-api">

في Vue، الحالة تفاعلية عميقة بشكل افتراضي. هذا يعني أنه يمكنك توقع كشف التغييرات حتى عند تغيير الكائنات المتداخلة أو المصفوفات:

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // هذا سيعمل كما هو متوقع
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

المراجع يمكن أن تحمل أي نوع قيمة، بما في ذلك الكائنات المتداخلة بشكل عميق، المصفوفات، أو هياكل البيانات المدمجة في JavaScript مثل `Map`.

المرجع يجعل قيمته تفاعلية بشكل عميق. هذا يعني أنه يمكنك توقع كشف التغييرات حتى عند تغيير الكائنات المتداخلة أو المصفوفات:

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // هذه ستعمل كما هو متوقع
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

القيم غير الأساسية تتحول إلى وسائط تفاعلية عبر [`()reactive`](#reactive)، والتي ستناقش أدناه.

من الممكن أيضًا الاستغناء عن التفاعل العميق مع [المراجع السطحية](/api/reactivity-advanced#shallowref). بالنسبة للمراجع السطحية، يتم تتبع الوصول إلى `value.` فقط من أجل التفاعلية. يمكن استخدام المراجع السطحية لتحسين الأداء عن طريق تجنب تكلفة مراقبة الكائنات الكبيرة، أو في الحالات التي تدار الحالة الداخلية بواسطة مكتبة خارجية.

للمزيد من القراءة:

- [تقليل تكلفة التفاعلية للهياكل الكبيرة غير المتغيرة](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
- [الدمج مع أنظمة خارجية لإدارة الحالة ](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

</div>

### توقيت تحديثات الـDOM {#dom-update-timing}

عندما تقوم بتغيير الحالة التفاعلية، يُحدَّث DOM تلقائيًا. ومع ذلك ، يجب أن يُذكر أن تحديثات DOM لا تُطبق بشكل متزامن. بدلاً من ذلك ، تُخزن Vue تحديثاتها في الذاكرة المؤقتة حتى تطبق في "النبضة الموالية" في دورة التحديث لضمان أن يحدث كل مكون مرة واحدة فقط بغض النظر عن عدد التغييرات في الحالة التي قمت بها.

لانتظار اكتمال تحديث DOM بعد تغيير الحالة ، يمكنك استخدام الواجهة البرمجية العامة [()nextTick](/api/general.html#nexttick) :

<div class="composition-api">

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
    // الوصول إلى DOM المحدث
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // الوصول إلى DOM المحدث
    }
  }
}
```

</div>

<div class="composition-api">

## `reactive()` \*\* {#reactive}

هناك طريقة أخرى للتصريح بالحالة التفاعلية، مع الواجهة البرمجية  `()reactive`. على عكس المرجع الذي يغلف القيمة الداخلية في كائن خاص، `()reactive` يجعل الكائن نفسه تفاعليا:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

> انظر أيضا: [كيفية إضافة النوع إلى reactive](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

الاستخدام في القالب:

```vue-html
<button @click="state.count++">
  {{ state.count }}
</button>
```

الكائنات التفاعلية هي [وسائط JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) وتتصرف مثل الكائنات العادية. الفرق هو أن Vue قادرة على تتبع الوصول إلى خاصيات وتغييرات الكائن التفاعلي. إذا كنت ترغب في معرفة التفاصيل، سنشرح كيفية عمل نظام التفاعلية في Vue  في قسم [التفاعل بالتفصيل](/guide/extras/reactivity-in-depth.html) - لكننا نوصي بقراءته بعد إتمام الدليل الرئيسي.

الدالة `()reactive` تحوّل الكائن بشكل عميق: الكائنات المتداخلة تغلف أيضًا مع `()reactive` عند الوصول إليها. كما تستدعى من قبل `()ref` داخليا عندما تكون قيمة المرجع كائن. مشابهة للمراجع السطحية، هناك أيضا الواجهة البرمجية [`()shallowReactive`](/api/reactivity-advanced#shallowreactive) للاستغناء عن التفاعل العميق.

### الوسيط التفاعلي مقابل الأصلي \*\* {#reactive-proxy-vs-original-1}

من المهم ملاحظة أن القيمة الراجعة من `()reactive` هي عبارة عن وسيط [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) للكائن الأصلي ، وهو ليس مساويًا له :

```js
const raw = {}
const proxy = reactive(raw)

// الوسيط ليس مساويًا للأصلي
console.log(proxy === raw) // false
```

فقط الوسيط هو المتفاعل - تغيير الكائن الأصلي لن يتسبب في تحديثه. لذلك ، أفضل ممارسة عند العمل مع نظام التفاعلية في Vue هي استخدام **النسخ الوسيطة فقط من الحالات**.

من أجل ضمان الوصول المستمر إلى الوسيط،  استدعاء `()reactive` على نفس الكائن يعيد دائمًا نفس الوسيط ، و استدعاء `()reactive` على وسيط موجود يعيد أيضًا نفس الوسيط:

```js
// استدعاء reactive() على نفس الكائن يعيد نفس الوسيط
console.log(reactive(raw) === proxy) // true

// استدعاء reactive() على وسيط موجود يعيد نفس الوسيط
console.log(reactive(proxy) === proxy) // true
```

تُطبق هذه القاعدة أيضًا على الكائنات المتداخلة. بسبب التفاعل العميق، تصبح الكائنات المتداخلة داخل كائن تفاعلي أيضًا عبارة عن وسائط:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### محدودية `()reactive` \*\* {#limitations-of-reactive}

الواجهة البرمجية لـ`()reactive`  لها بعض المحدوديات:

1.  **أنواع قيم محدودة:** يعمل فقط مع أنواع الكائنات (الكائنات والمصفوفات و [أنواع المجموعات](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) مثل `Map` و `Set`). لا يمكن أن يحتوي على [أنواع البيانات الأولية](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) مثل `string` ، `number` أو `boolean`.

2. **عدم القدرة على استبدال الكائن بأكمله** بما أن تتبع التفاعل في Vue يعمل على مستوى الوصول إلى الخاصية أي تحديثه لابد أن يتم بواسطة خاصية، يجب أن نبقى دائمًا على نفس المرجع للكائن التفاعلي. وهذا يعني أننا لا يمكننا بسهولة "استبدال" كائن تفاعلي لأن الاتصال التفاعلي مع المرجع الأول قد فُقِد:

   ```js
   let state = reactive({ count: 0 })

   // المرجع السابق ({ count: 0 }) لم يعد يتم تتبعه
   // (الاتصال التفاعلي قد فُقِد!)
   state = reactive({ count: 1 })
   ```

3. **غير متوافق مع التفكيك:** عندما نقوم بتفكيك خاصية نوع الكائن التفاعلي الأولي إلى متغيرات محلية، أو عندما نمرر هذه الخاصية إلى دالة، سنفقد الاتصال التفاعلي:

   ```js
   const state = reactive({ count: 0 })

   // count لم يعد متصلا بـ state.count عند التفكيك
   let { count } = state
   // لا يؤثر على الحالة الأصلية
   count++

   // الدالة تستقبل رقم عادي ولن تكون
   // قادرة على تتبع التغييرات لـ state.count
   // يجب علينا تمرير الكائن بأكمله للحفاظ على التفاعلية
   callSomeFunction(state.count)
   ```

بسبب هذه المحدوديات، نوصي باستخدام `()ref` كواجهة برمجية أساسية للتصريح بالحالة التفاعلية.

## تفاصيل إضافية حول فك ref \*\* {#additional-ref-unwrapping-details}

### كخاصية لكائن تفاعلي (reactive) \*\* {#ref-unwrapping-as-reactive-object-property}

يفك المرجع تلقائيًا عند الوصول إليه أو تغييره كخاصية لكائن تفاعلي. بعبارة أخرى، يتصرف كخاصية عادية:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

إذا تم تعيين ref جديدة لخاصية مرتبطة بـref موجودة ، فسَتَسْبدل الـref القديمة:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// ref الأصلية الآن غير متصلة بـ state.count
console.log(count.value) // 1
```

يحدث فك المرجع فقط عندما يضمن داخل كائن تفاعلي عميق. لا ينطبق عند الوصول إليه كخاصية لـ [كائن تفاعلي سطحي](/api/reactivity-advanced#shallowreactive).

### التنبيه في المصفوفات والمجموعات \*\* {#caveat-in-arrays-and-collections}

على عكس الكائنات التفاعلية، لا يوجد فك عند الوصول إلى المرجع كعنصر في مصفوفة تفاعلية أو نوع مجموعة مدمج مثل `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// يجب إضافة  .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// يجب إضافة  .value
console.log(map.get('count').value)
```

### تنبيه عند الفك في قالب \*\* {#caveat-when-unwrapping-in-templates}

فك المرجع في قوالب ينطبق فقط إذا كان المرجع خاصية في أعلى المستوى في سياق تصيير القالب.

في المثال أدناه، `count` و `object` هما خاصيتان في أعلى المستوى، ولكن `object.id` ليس كذلك:

```js
const count = ref(0)
const object = { id: ref(0) }
```

لذلك، هذا التعبير يعمل كما هو متوقع:

```vue-html
{{ count + 1 }}
```

...بينما هذا **لا** يعمل كما هو متوقع:

```vue-html
{{ object.id + 1 }}
```

النتيجة المصيرة ستكون `1[object Object]` لأن `object.id` لم يفك عند تقييم التعبير ويظل كائن مرجع. لإصلاح هذا، يمكننا تفكيك `id` إلى خاصية مستوى أعلى:

```js
const { id } = object
```

```vue-html
{{ id + 1 }}
```

الآن النتيجة المصيرة ستكون `2`.

شيء آخر يجب ملاحظته هو أن المرجع يفك إذا كانت القيمة المقيّمة النهائية لتعبير نصي (أي علامة <code v-pre>{{ }}</code>)، لذلك ستصير الشيفرة الآتية النتيجة `1`:

```vue-html
{{ object.id }}
```

هذه ميزة ملائمة للاقحام النصي ومكافئة لـ <code v-pre>{{ object.id.value }}</code>.

</div>

<div class="options-api">

### التوابع ذوات الحالة \* {#stateful-methods}

في بعض الحالات ، قد نحتاج إلى إنشاء دالة تابعة ديناميكية ، على سبيل المثال إنشاء معالج حدث مؤجل:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    //  تأجيل معالجة الحدث مع Lodash
    click: debounce(function () {
      //  ... الرد على النقر ...
    }, 500)
  }
}
```

ومع ذلك ، فإن هذا النهج يشكل معضلة للمكونات القابلة لإعادة الاستخدام لأنها دالة مؤجلة هي دالة **ذات حالة**: إذا كانت عدة نسخ من المكونات تشارك نفس الدالة المؤجلة ، فسيكون تعارض بينهم.

من أجل الحفاظ على استقلال دالة مؤجلة لكل نسخة من المكون عن الآخرين ، يمكننا إنشاء الإصدار المؤجل في مرحلة الحياة `created`:

```js
export default {
  created() {
    //  كل نسخة مكون الآن لديها نسخة من المعالج المؤجل
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // إلغاء المؤقت أيضًا هو فكرة جيدة
    // عند إزالة المكون  
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... الرد على النقر ...
    }
  }
}
```

</div>
