# الخاصيات المحسوبة {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Free Vue.js Computed Properties Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Free Vue.js Computed Properties Lesson"/>
</div>

## مثال بسيط {#basic-example}

التعبيرات المدمجة في القالب هي طريقة جيدة، لكنها موجهة فقط للعمليات البسيطة. إذا وضعنا الكثير من الشيفرات داخل القالب فإنه سيصبح معقد وصعب الصيانة. على سبيل المثال، إذا  كان لدينا كائن مصفوفة متداخلة:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

و نريد عرض رسائل مختلفة بناءً على `author`  (المؤلف) إذا كان لديه كتب أو لا:

```vue-html
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```
عند هذه النقطة، يصبح القالب مزدحمًا قليلاً. يجب أن ننظر إليه لوهلة قبل أن ندرك أنه يقوم بحساب معين استنادًا إلى `author.books`. و أهم شيء، نحن ربما لا نريد تكرار نفس الحساب إذا كنا بحاجة إلى تضمينه في القالب أكثر من مرة.

لهذا السبب، في المعالجة المعقدة التي تتضمن بيانات تفاعلية متداخلة، يُوصى باستخدام **خاصية محسوبة**. هذا المثال السابق مع إعادة تصميمه بهاته الخاصية:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    //  خاصية محسوبة مُحصلة
    publishedBooksMessage() {
    // `this` يشير إلى  نسخة المكون
      return this.author.books.length > 0 ? 'نعم' : 'لا'
  }
}
```

```vue-html
<p>هل نشر كتبا؟</p>
<span>{{ publishedBooksMessage }}</span>
```

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNqNUs1Kw0AQfpVhL1GwiainECqKIAi9iRfjYZtMm9Rmd9mfaim5aPU1PFa8iODFN0nexk2aJqgowsLOzH77zcw3syBHQrgzg8QngYpkKnQ/ZHgruNQQ44iaqYZFyABiqunW9toGkKiNZBsPgBqdcOl3AQBGM/TBOeMJgxOOzk73NOT8Wvlw2UUAnAuDsAc9OIpnlEUYw6lJ4y/fGtC+BR1TlUa/Ig4s4jxBGMyVRjl3OsDVxszXRn3lNUPEM2E0xm0TwgynqUowPq7KHaBSdIydBK0IOkmVuxbArTtzp8jGOoE+7MIhOOVj8VE+OGDFKJfFqqlmnTlk9gReq7x1NGZiSjVaDwLRL5flXfEKluS9eIPyvngpnotV8RR4okJAoARl/cWiGcG/KoA8tzmrf1XyNiHZIWlWTb6XUeFOFGd2K+puw+ZBhaSVJyR2bSo/JInWQvmep0ZRtUsT5XI59qzlSsN0mqGLKusNJb9RKC1xSJqZ1RyeDc5Q9iSyGCXKvzi/QX/wbkQl+SdoQ/Wa)

 هنا صرحنا بخاصية محسوبة مسماة `publishedBooksMessage`.

 جرب تغيير قيمة `books` في البيانات و سترى كيف تتغير `publishedBooksMessage` وفقا لذلك.

يمكنك ربط الخصائص المحسوبة كبيانات في القوالب مثل أي خاصية عادية. يعرف Vue أن `this.publishedBooksMessage` يعتمد على `this.author.books`، لذلك سيقوم بتحديث أي ربط يعتمد على `this.publishedBooksMessage` عند تغيير `this.author.books`.

الق نظرة على: [إضافة النوع إلى الخصائص المحسوبة ](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

//مرجع خاصية محسوبة 
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'نعم' : 'لا'
})
</script>

<template>
  <p>هل نشر كتبا؟</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9Us1q20AQfpVhL3LAlkrbk3BUEgqFQm6ll24Pa2lsKbV2l52VSxA6NU0eI8eE3AK55E2kt8msrSSQv9vO3zff98224sDaeNOgSMWccldZD4S+sZnUVW2N89CCQ5X7aoNTyE1tG48FdLB0poaIJyOppc6NJg+q8aVxsP84MWmlBtCqxhSi76bU8NVgNA3JhTF/KIVf4Q0Q/WwQPsIMDoqN0jlv+NZUxdg6lj9x+VBRlb9S+8y1HyXC0Ql5dCfMCeC31N1eIJckoJ6oO1w+8LXNYl1RicVhIHOERGqFTP+hdzLZg/0MtiIcu+L0KDHeso/XqFe+hAw+wBeIhrP+bvgfAUsdTvtL5hDWz5OdrWwoBx5ru1YeOQKY22w4H06BB2/7Gxj+9df9VX/ZX8yT4D83kFU6a9s3iHYdg4eOsOURWUzF7nKzWtn4mIzm224lyLFAUqQ7USHHJwyxFKX3ltIkoWUefsQxxcatEn7FrtG+qjFGqmcLZ/4SOgaWYrzAFiPh5AbdzKEu0KF7D/NZ6wvcANuxfaK7B/XE7oo=)

لقد قمنا هنا بتعريف خاصية محسوبة باسم `publishedBooksMessage`.  
دالة `computed()` تتوقع تمرير [دالة getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) إليها، والقيمة المُعادة تكون **مرجعًا محسوبًا (computed ref)**.

وبشكل مشابه للمراجع العادية (refs)، يمكنك الوصول إلى النتيجة باستخدام `publishedBooksMessage.value`.

كما يتم فك التفاف (auto-unwrapped) المراجع المحسوبة تلقائيًا داخل القوالب (templates)، لذلك يمكنك استخدامها مباشرة بدون الحاجة إلى `.value` داخل تعبيرات القالب.


خاصية محسوبة  تتبع تلقائيًا إعتمادياتها التفاعلية. يعرف Vue أن حساب `publishedBooksMessage` يعتمد على `author.books`، لذلك سيقوم بتحديث أي ربط يعتمد على `publishedBooksMessage` عند تغيير `author.books`.

الق نظرة على: [إضافة النوع إلى الخاصيات المحسوبة ](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />

</div>

## تخزين بالخاصيات المحسوبة مقابل التوابع {#computed-caching-vs-methods}

ربما لاحظت أننا يمكننا الوصول إلى نفس النتيجة من خلال استدعاء تابع في التعبير:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// داخل المكون
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

</div>

<div class="composition-api">

```js
// داخل المكون
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

</div>

بدلا من خاصية محسوبة، يمكننا تعريف نفس الدالة كتابعة. من أجل الحصول على النتيجة النهائية، فإن كلا الطريقتين تفيان بنفس الغرض. ومع ذلك، فإن الفرق هو أن **الخاصيات المحسوبة مخزنة بناءً على إعتمادياتها التفاعلية.** ستقوم خاصية محسوبة بإعادة التقييم فقط عندما تتغير بعض إعتمادياتها التفاعلية. هذا يعني أنه بمجرد عدم تغير `author.books`، فإن الوصول المتعدد إلى `publishedBooksMessage` سيعيد النتيجة المحسوبة مسبقًا بدون الحاجة إلى تشغيل الدالة المحصلة مرة أخرى.

هذا يعني أيضا أن الخاصية المحسوبة التالية لن تَتحيَّن أبدا، لأن `()Date.now` ليست إعتمادية تفاعلية:

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

بالمقارنة، استدعاء تابع سيقوم بتشغيل الدالة **دائمًا** عندما يحدث إعادة التصيير.

لماذا نحتاج إلى التخزين؟ تصور أنه لدينا خاصية محسوبة مُكْلِفة مسماة `list`، والتي تتطلب المرور عبر جميع عناصر مصفوفة كبيرة والقيام بالكثير من الحسابات. ثم قد نملك خاصيات محسوبة أخرى تعتمد على `list` بدورها. بدون التخزين، سنقوم بتشغيل الدالة المحصلة على `list` عدة مرات أكثر من الضروري! في حالات لا تريد التخزين، استدع تابع بدلاً من ذلك.

## الخاصيات المحسوبة القابلة للكتابة {#writable-computed}

الخاصيات المحسوبة غير قابلة للتعيين افتراضيًا. إذا حاولت تعيين قيمة جديدة لخاصية محسوبة، ستحصل على تحذير خلال وقت التشغيل. في الحالات النادرة التي تحتاج إلى خاصية محسوبة "قابلة للكتابة"، يمكنك إنشاء واحدة من خلال توفير الدالتين المُحصِّلة و المعيّنة:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // مُحصلة
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // معيّنة
      set(newValue) {
        // ملاحظة: استخدمنا هنا صيغة التعيين عن طريق التفكيك.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

الآن عندما تقوم بتشغيل `  'محمد عبيدي' =  this.fullName ` سيتم تشغيل المعيّن وسيتم بالتالي تحديث  `this.firstName` و `this.lastName`.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // مُحصلة
  get() {
    return firstName.value + ' ' + lastName.value
  },
   // معيّنة
  set(newValue) {
  // ملاحظة: استخدمنا هنا صيغة التعيين عن طريق التفكيك.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

الآن عندما تقوم بتشغيل `  'محمد عبيدي' =  this.fullName ` سيتم تشغيل المعيّن وسيتم بالتالي تحديث  `this.firstName` و `this.lastName`.

</div>

## الحصول على القيمة السابقة {#previous}

- مدعومة فقط في الإصدار 3.4 وما فوق


<p class="options-api">
في حال احتجت إلى ذلك، يمكنك الحصول على القيمة السابقة التي أرجعتها الخاصية المحسوبة من خلال الوصول إلى الوسيط الثاني في دالة الـ getter:
</p>

<p class="composition-api">
في حال احتجت إلى ذلك، يمكنك الحصول على القيمة السابقة التي أرجعتها الخاصية المحسوبة من خلال الوصول إلى الوسيط الأول في دالة الـ getter:
</p>


<div class="options-api">

```js
export default {
  data() {
    return {
      count: 2
    }
  },
  computed: {
    // This computed will return the value of count when it's less or equal to 3.
    // When count is >=4, the last value that fulfilled our condition will be returned
    // instead until count is less or equal to 3
    alwaysSmall(_, previous) {
      if (this.count <= 3) {
        return this.count
      }

      return previous
    }
  }
}
```
</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

// This computed will return the value of count when it's less or equal to 3.
// When count is >=4, the last value that fulfilled our condition will be returned
// instead until count is less or equal to 3
const alwaysSmall = computed((previous) => {
  if (count.value <= 3) {
    return count.value
  }

  return previous
})
</script>
```
</div>

في حال كنت تستخدم خاصية محسوبة قابلة للكتابة (writable computed):


<div class="options-api">

```js
export default {
  data() {
    return {
      count: 2
    }
  },
  computed: {
    alwaysSmall: {
      get(_, previous) {
        if (this.count <= 3) {
          return this.count
        }

        return previous;
      },
      set(newValue) {
        this.count = newValue * 2
      }
    }
  }
}
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

const alwaysSmall = computed({
  get(previous) {
    if (count.value <= 3) {
      return count.value
    }

    return previous
  },
  set(newValue) {
    count.value = newValue * 2
  }
})
</script>
```

</div>


## الممارسات الجيّدة {#best-practices}

### يجب أن تكون الدوال المحصلة خالية من التأثيرات الجانبية {#getters-should-be-side-effect-free}

من المهم تذكّر أن دوال الـ computed getter يجب أن تقوم فقط بحسابات نقية (pure computation) وأن تكون خالية من أي تأثيرات جانبية (side effects).  
على سبيل المثال، **لا تقم بتعديل حالة أخرى (state)، أو تنفيذ طلبات غير متزامنة (async)، أو التلاعب بالـ DOM داخل computed getter!**

فكّر في الخاصية المحسوبة على أنها طريقة وصفية (declarative) لاشتقاق قيمة اعتمادًا على قيم أخرى — ومسؤوليتها الوحيدة هي حساب تلك القيمة وإرجاعها.

لاحقًا في هذا الدليل، سنناقش كيف يمكن تنفيذ التأثيرات الجانبية استجابةً لتغيّرات الحالة باستخدام [watchers](./watchers).


### تجنب تعيين القيمة المحسوبة {#avoid-mutating-computed-value}

القيمة المُرجعة من خاصية محسوبة هي حالة مشتقة. فكر فيها كلقطة مؤقتة - كلما تغيرت الحالة المصدرية، سيتم إنشاء لقطة جديدة. بديهيا لا يمكن تعديل لقطة، لذا يجب على أي قيمة محسوبة مُرجعة أن تُقرأ فقط وأن لا يتم تعديلها - بدلاً من ذلك، قم بتحديث الحالة المصدرية التي يعتمد عليها لتشغيل حسابات جديدة.
