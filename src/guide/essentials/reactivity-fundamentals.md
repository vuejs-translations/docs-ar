---
outline: deep
---

# أساسيات التفاعلية {#reactivity-fundamentals}

:::tip تفضيلات واجهة البرمجة
هاته الصفحة والعديد من المحاور الأخرى في المرجع تحتوي على محتوى مختلف بواجهة الخيارات و  الواجهة التركيبية. تفضيلك الحاليل هو <span class="options-api">واجهة الخيارات</span><span class="composition-api">الواجهة التركيبية</span>. يمكنك التبديل بين نمطي الواجهتين باستخدام مفاتيح التبديل "تفضيلات واجهة البرمجة" في أعلى جانب الشريط الجانبي الأيسر.
:::

## التصريح بحالة تفاعلية {#declaring-reactive-state}

<div class="options-api">

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

[اختبره في حقل التجارب](https://sfc.vuejs.org/#eNp9kl1qAjEQx68y5ElBd2kfRYXeIw9uNX7hZpck2oL40PpZ79EuFayIlmJPMrlNJ7u6QguFXTL/SeY3k5mM2V0ce6OhYBVW1U3Vi02dS/EYR8pAS7SD4cDAmEuAVmCCQjGzAZQwQyUvCqAZDaWpwE2mJ26ZlLh0q+9DI3TbotUAu7RrwA/8wsQ+Ae7sCvf4Dri1a0yccbALPJJva5eYgJ2Rd2ufMXGkM+VahUObbk8Td41H+veAr3ZmX4AoB0pDwIT03E7tyi6yoGYkdTQQ3iDqFFywl9ZedLBa3d0gZ7tYgiT4mVa3AQItMuKU9NtFzPFEckdFpJnIu8FvElSPu0XGu6aCGtymDeKSvqqft52EEWE8CIwglaU/4c6xKzAeZ02GSRqUH2Ql1gvduMphEHt9HUkaZdofft7QnFF4VgVnNGunOesaE+uK7+t20z2AvvYi1fHJ8hSl6YXCEzos36voQQtFYM5ooDnDJ+dIqLISsiWUUP8xfx39w700g01+ACxIF8Y=)

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

يمكننا إنشاء كائن تفاعلي أو مصفوفة باستخدام دالة [`()reactive`](/api/reactivity-core.html#reactive):

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

الكائنات التفاعلية هي [وسائط JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) وتتصرف مثل الكائنات العادية. الفرق هو أن Vue قادرة على تتبع الوصول إلى خاصيات وتغييرات الكائن التفاعلي. إذا كنت ترغب في معرفة التفاصيل، سنشرح كيفية عمل نظام التفاعلية في Vue  في قسم [التفاعل بالتفصيل](/guide/extras/reactivity-in-depth.html) - لكننا نوصي بقراءته بعد إتمام الدليل الرئيسي.

الق نظرة على: [إضافة النوع لـReactive](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

لاستخدام الحالة التفاعلية في قالب المكون، قم بتعريفها وارجاعها من دالة `()setup` للمكون:

```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup` هو خطافة خاصة مخصصة للواجهة التركيبية API.
  setup() {
    const state = reactive({ count: 0 })

    // اعرض الحالة في القالب
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

بشكل مماثل، يمكننا إعلان الدوال التي تغير الحالة التفاعلية في نفس النطاق وتعرضها كتوابع جنبًا إلى جنب مع الحالة:

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // لا تنسى عرض الدالة أيضًا.
    return {
      state,
      increment
    }
  }
}
```
التوابع المعروضة عادة ما تستخدم كمستمعات للأحداث:

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### صيغة `<script setup>`  \*\* {#script-setup}

عرض الحالة يدويا والدوال عبر `()setup` يمكن أن يكون مطولا. لحسن الحظ، فإنه مطلوب فقط عند عدم استخدام عملية بناء. عند استخدام مكونات أحادية الملف (SFCs)، يمكننا تبسيط الاستخدام بشكل كبير باستخدام صيغة `<script setup>`:

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[اختبر الشيفرة في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBzdGF0ZS5jb3VudCsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPlxuICAgIHt7IHN0YXRlLmNvdW50IH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

الاستيرادات ذات المستوى الأعلى والمتغيرات المعرفة في `<script setup>` متاحة تلقائيًا في قالب في نفس المكون.

> بالنسبة لبقية الدليل، سنستخدم أساسًا صيغة`<script setup>`  + المكونات أحادية الملف في  أمثلة شيفرة الواجهة التركيبية وهي الطريقة الشائعة المتبعة من طرف المطورين بـVue.

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

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

في المثال أعلاه ، سيتم استدعاء التابع `increment`  عند النقر فوق الزر `<button>`.

</div>

### توقيت تحديثات الـDOM {#dom-update-timing}

عندما تقوم بتغيير الحالة التفاعلية، يتم تحديث DOM تلقائيًا. ومع ذلك ، يجب أن يُذكر أن تحديثات DOM لا تُطبق بشكل متزامن. بدلاً من ذلك ، تُخزن Vue تحديثاتها في الذاكرة المؤقتة حتى يتم تطبيقها في "النبضة الموالية" في دورة التحديث لضمان أن يتم تحديث كل مكون مرة واحدة فقط بغض النظر عن عدد التغييرات في الحالة التي قمت بها.

لانتظار اكتمال تحديث DOM بعد تغيير الحالة ، يمكنك استخدام الواجهة البرمجية العامة [()nextTick](/api/general.html#nexttick) :

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // الوصول إلى DOM المحدث
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // الوصول إلى DOM المحدث
      })
    }
  }
}
```

</div>

### التفاعلية العميقة {#deep-reactivity}

في Vue ، تكون الحالة تفاعلية بشكل عميق افتراضيًا. وهذا يعني أنه يمكنك توقع اكتشاف التغييرات لما تغير خاصية عميقة في  الكائنات أو الجداول المتداخلة :

<div class="options-api">

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

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // هذا سيعمل كما هو متوقع
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

من الممكن أيضًا إنشاء [كائنات تفاعلية سطحية](/api/reactivity-advanced.html#shallowreactive) بشكل صريح حيث يتم تتبع التفاعلية فقط في المستوى القاعدي، ولكن هذه عادة ما تكون مطلوبة فقط في حالات الاستخدام المتقدمة.

<div class="composition-api">

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

الواجهة البرمجية لـ`()reactive`  لها محدوديتين:

1.  يعمل فقط مع أنواع الكائنات (الكائنات والمصفوفات و [أنواع المجموعات](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) مثل `Map` و `Set`). لا يمكن أن يحتوي على [أنواع البيانات الأولية](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) مثل `string` ، `number` أو `boolean`.


2. بما أن تتبع التفاعل في Vue يعمل على مستوى الوصول إلى الخاصية أي تحديثه لابد أن يتم بواسطة خاصية، يجب أن نبقى دائمًا على نفس المرجع للكائن التفاعلي. وهذا يعني أننا لا يمكننا بسهولة "استبدال" كائن تفاعلي لأن الاتصال التفاعلي مع المرجع الأول قد فُقِد:


   ```js
   let state = reactive({ count: 0 })

   // المرجع أعلاه ({ count: 0 }) لم يعد يتم تتبعه (فقد الاتصال التفاعلي!)
   state = reactive({ count: 1 })
   ```

   و هذا يعني أيضا أنه عندما نعين أو نفك الخاصية من الكائن المتفاعل إلى متغيرات محلية ، أو عندما نمرر هذه الخاصية إلى دالة ، فسنفقد الاتصال التفاعلي:

   ```js
   const state = reactive({ count: 0 })

   // n
   // هي متغير محلي مفصول
   // من 
   // state.count.
   let n = state.count
   // لا يؤثر على الحالة الأصلية
   n++

   // count
   // هو ايضا مفصول عن 
   // state.count
   let { count } = state
   // لا يؤثر على الحالة الأصلية
   count++

   // الدالة تستقبل رقمًا عاديًا و
   // لن تتمكن من تتبع التغييرات في 
   // state.count
   callSomeFunction(state.count)
   ```

## المتغيرات التفاعلية باستخدام `()ref` \*\* {#reactive-variables-with-ref}

لمعالجة محدودية `()reactive`، توفر Vue أيضًا دالة [`()ref`](/api/reactivity-core.html#ref) التي تسمح لنا بإنشاء متغيرات تفاعلية **"refs"** يمكنها الاحتفاظ بأي نوع من أنواع القيم:

```js
import { ref } from 'vue'

const count = ref(0)
```

`()ref` تأخذ الوسيط وتعيده مغلفًا داخل كائن مرجع مع خاصية `value.`:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

الق نظرة على: [إضافة النوع إلى Refs](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />


بشكل مماثل لخاصيات الكائن المتفاعل ، فإن الخاصية `value.` للمتغير ref تفاعلية بدورها. بالإضافة إلى ذلك ، عند الحصول على أنواع الكائن ، يحول المتغير ref تلقائيًا الخاصية `value.` بواسطة الدالة `()reactive`.

A ref containing an object value can reactively replace the entire object:

ref المحتوي على قيمة كائن يمكنه استبدال كامل الكائن بشكل تفاعلي:

```js
const objectRef = ref({ count: 0 })

// سيعمل بشكل تفاعلي
objectRef.value = { count: 1 }
```
الـRefs يمكن أيضًا تمريرها كوسائط عبر الدوال أو فكها من الكائنات العادية دون فقدان التفاعلية:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// تمرير 
// ref
// للدالة
// تحتاج  للوصول إلى القيمة عبر
// .value
// لكن ستبقي محافظة على بالتفاعلية
callSomeFunction(obj.foo)

// تحافظ على التفاعلية
const { foo, bar } = obj
```

بشكل أخر ، يسمح لنا `()ref` بإنشاء "مرجع" إلى أي قيمة وتمريرها دون فقدان التفاعلية. هذه القدرة مهمة جدًا لأنها مستخدمة بانتظام عند استخراج الشيفرة إلى [الدوال التركيبية](/guide/reusability/composables.html).

### فك الـref في القالب \*\* {#ref-unwrapping-in-templates}

عند الوصول إلى الـRefs كخاصيات في القالب ، يتم تلقائيًا "فك" الـRefs بحيث لا تحتاج إلى استخدام `value.`. هذا مثال *العداد* السابق ، باستخدام `()ref`   :

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    <!-- لا حاجة لاستخدام -->
    <!-- .value -->
    {{ count }} 
  </button>
</template>
```

[اختبره في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)


تجدر الملاحظة إلى أن الفك ينطبق فقط إذا كان الـRefs خاصية على المستوى الأعلى في سياق تصيير القالب. على سبيل المثال ، `foo` هي خاصية على المستوى الأعلى ، ولكن `object.foo` ليست كذلك.

إذا، ليكن لدينا الكائن التالي:

```js
const object = { foo: ref(1) }
```

 التعبير التالي **لن** يعمل كما هو متوقع :

```vue-html
{{ object.foo + 1 }}
```
النتيجة المصيرة ستكون `[object Object]` لأن `object.foo` هو كائن ref. يمكننا إصلاح ذلك من خلال جعل `foo` خاصية على المستوى الأعلى:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```
الآن ، ستكون نتيجة التصيير `2`.

شيء آخر يجب الإشارة إليه هو أن الـref سيُفكَّك أيضًا إذا كان عبارة عن آخر قيمة مقدرة كنص مُقحم (أي علامة <code v-pre>{{ }}</code>) ، المثال الموالي سيُصيِّر القيمة `1`:

```vue-html
{{ object.foo }}
```

هذه مجرد ميزة مناسبة في الاقحام النصي بدل استعمال <code v-pre>{{ object.foo.value }}</code>.

### فك Ref داخل كائنات تفاعلية {#ref-unwrapping-in-reactive-objects}

عند الوصول إلى `ref` أو تغييره كخاصية لكائن تفاعلي، تُفك العبارة أيضًا تلقائيًا حتى تتصرف كخاصية عادية:

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
// ref 
// الأصلية الآن غير متصلة بـ 
// state.count
console.log(count.value) // 1
```

فك الـref يحدث فقط عند الوصول إلى الـref داخل كائن تفاعلي عميق. لا ينطبق ذلك عند الوصول إلى الـref كخاصية لـ [كائن تفاعلي سطحي](/api/reactivity-advanced.html#shallowreactive).



### فك Ref في المجموعات و المصفوفات {#ref-unwrapping-in-arrays-and-collections}

على عكس الكائنات التفاعلية ، لا يتم تنفيذ أي فك عند الوصول إلى الـref كعنصر في مصفوفة تفاعلية أو أي نوع مجموعة أصلي مثل `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// يجب إضافة 
// .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// يجب إضافة 
// .value
console.log(map.get('count').value)
```

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

<div class="composition-api">

## التحويلات التفاعلية <sup class="vt-badge experimental" /> \*\* {#reactivity-transform}

الحاجة لاستخدام `.value` مع الـrefs هو أحد العيوب المفروضة من قبل قيود  الـ JavaScript. لكن مع تحويلات وقت التصريف، يمكننا تحسين الأداء من خلال إضافة `.value` تلقائيًا في المواقع المناسبة. يوفر Vue تحويلًا في وقت التصريف يسمح لنا بكتابة مثال "العداد" السابق كما يلي:
```vue
<script setup>
let count = $ref(0)

function increment() {
  //لا تحتاج ل 
  // .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```
يمكنك الاطلاع على المزيد حول [تحويل التفاعلية](/guide/extras/reactivity-transform.html) في القسم المخصص لها. تجدر الملاحظة إلى أنه ما زال في طور التجريب وقد يتغير قبل الانتهاء منه.

</div>
