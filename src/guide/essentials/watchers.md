# الخاصيات المُراقبة {#watchers}

## مثال أساسي {#basic-example}

الخاصيات المحسوبة تسمح لنا بحساب القيم المشتقة بشكل تصريحي. ومع ذلك، هناك حالات حيث نحتاج إلى تنفيذ "تأثيرات جانبية" بالرد على تغييرات الحالة - على سبيل المثال، تعديل DOM، أو تغيير جزء آخر من الحالة بناءً على نتيجة عملية غير متزامنة.

<div class="options-api">

مع واجهة الخيارات، يمكننا استخدام خيار [`watch`](/api/options-state#watch) لتشغيل دالة عند تغيير خاصية تفاعلية :

```js
export default {
  data() {
    return {
      question: '',
      answer: 'عادة ما تحتوي الأسئلة على علامة استفهام. ;-)'
    }
  },
  watch: {
    // عندما تتغير الخاصية  `question`  سيتم تشغيل هذه الدالة
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'قيد التفكير ...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'خطأ! تعذر الوصول إلى الخادم. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  اطرح سؤال نعم/لا:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9U91u0zAUfpVDbpyIxhG3pSniCRD3uQmZw1I1TrCdhqrKBdDC2GsMqFZpGxNCU9/EfhuO42SCTeKmrs/P5+9838nGe1nXdNUwb+rNZCaKWoFkqqnnCS/KuhIKNiBYPoE2VdkpdJCLqgSCHSThCc8qLhW8a5hURcUhtrU+IcGYSblsmRjj+qj3+kZfgtnpPeiDvtIHc2bOQe/NVl/oX/oHnpegj2ZrvvYHZnY2ssfkwXwwX2yAwvMwsI8kvKfljwQmkMo1z8DnrH09xAKI57BJOECR/5OgBT9h718hrxckgDmEzwJXBwNtukqXDUPyxHw05/rG0bQsPuH1FiilKIKtV2I9tgK4yQWT2Jm2aaEgZ5YkOVWqltMoWjPJK9qqPErrwo7h+h486rtexKELWXE/CKircPUdZL0jPhOiEvfMH8EA0df6Tl88sXof9U/kbccwZ/o3Sr8F/d1pbUe7tvZYeQk8hR53eMse+NMh11nk1gQXBC+KlfUyVQxvADO7NY4EAt3pW30FaNs3iw3mM9q5i6yjU1c1K3jdKFiFZXXClnHijS4mHkQOMBoQEXmzGSaL45iggmiagyRTYkEJdJ2rn0X3rLyJ57Y4LNO6lxH3vFcqGRIy8aajdomHa23viTdaJfPMfh0LSSvxNsJ/VDRcFSWjTJbhG1G1ErVeIMrkL4wIgysmQsFwwwQ69h/MB6WPcEfpve4PlnZ0Dg==)

خيار `watch` يدعم أيضًا مسارًا مفصولًا بنقطة كمفتاح (خاصية):

```js
export default {
  watch: {
    // ملاحظة: مسارات بسيطة فقط. لا تدعم التعبيرات.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

مع الواجهة التركيبية، يمكننا استخدام الدالة [`watch`](/api/reactivity-core#watch) لتشغيل دالة عند تغيير حالة تفاعلية :

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('عادة ما تحتوي الأسئلة على علامة استفهام. ;-)')

watch(question, async (newQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'قيد التفكير ...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value =  'خطأ! تعذر الوصول إلى الخادم. ' + error
    }
  }
})
</script>

<template>
  <p>
      اطرح سؤال نعم/لا:
    <input v-model="question" />
  </p>
  <p>{{ answer==='yes'?'نعم':'لا' }}</p>
</template>
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9U91u0zAUfpVDbpyIxhG3pSniCRD3uQmZw1I1TrCdhqrKBdDC2GsMqFZpGxNCU9/EfhuO42SCTeKmrs/P5+9838nGe1nXdNUwb+rNZCaKWoFkqqnnCS/KuhIKNiBYPoE2VdkpdJCLqgSCHSThCc8qLhW8a5hURcUhtrU+IcGYSblsmRjj+qj3+kZfgtnpPeiDvtIHc2bOQe/NVl/oX/oHnpegj2ZrvvYHZnY2ssfkwXwwX2yAwvMwsI8kvKfljwQmkMo1z8DnrH09xAKI57BJOECR/5OgBT9h718hrxckgDmEzwJXBwNtukqXDUPyxHw05/rG0bQsPuH1FiilKIKtV2I9tgK4yQWT2Jm2aaEgZ5YkOVWqltMoWjPJK9qqPErrwo7h+h486rtexKELWXE/CKircPUdZL0jPhOiEvfMH8EA0df6Tl88sXof9U/kbccwZ/o3Sr8F/d1pbUe7tvZYeQk8hR53eMse+NMh11nk1gQXBC+KlfUyVQxvADO7NY4EAt3pW30FaNs3iw3mM9q5i6yjU1c1K3jdKFiFZXXClnHijS4mHkQOMHKICLzZDIPFcUxQQPTMIZIpsZgEus6Vz6J7Ut7Ec0sclmndq4hr3guVDAmZeNNRusTDrbb3xBudknlmP46FpJV4G+E/KhquipJRJsvwjahaiVIvEGXyF0aEwRUToWC4YAIN+w/mg9JHuKPyXvcHXvNz7g==)

### أنواع مصادر الدالة المُراقبة {#watch-source-types}

يمكن أن تكون الوسيطة الأولى في `watch` أنواعًا مختلفة من "المصادر" التفاعلية (reactive sources): يمكن أن تكون `ref` (بما في ذلك المراجع المحسوبة)، أو كائن تفاعلي (reactive object)، أو [دالة getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description)، أو مصفوفة تحتوي على عدة مصادر.

```js
const x = ref(0)
const y = ref(0)

// ref وحيد
watch(x, (newX) => {
  console.log(`x يساوي ${newX}`)
})

// دالة مُحصِّلة
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`مجموع x + y يساوي: ${sum}`)
  }
)

// مصفوفة من مصادر متعددة
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x يساوي ${newX} و y يساوي ${newY}`)
})
```

تجدر الإشارة إلى أنه لا يمكنك مراقبة خاصية من كائن تفاعلي كهذا المثال :

```js
const obj = reactive({ count: 0 })

//  لن يشتغل هذا لأننا نمرر رقمًا إلى
// watch()
watch(obj.count, (count) => {
  console.log(`العداد: ${count}`)
})
```

بدلاً من ذلك استعمل دالة مُحصِّلة لارجاع الخاصية: 

```js
// بدلاً من ذلك استعمل دالة مُحصِّلة لارجاع الخاصية:
watch(
  () => obj.count,
  (count) => {
    console.log(`العداد: ${count}`)
  }
)
```

</div>

## الخاصيات المُراقبة العميقة {#deep-watchers}

<div class="options-api">

الدالة `watch` سطحية افتراضيًا: ستُشغَّل الدالة المُراقبة فقط عندما  تُعيَّن  قيمة جديدة للخاصية المُراقَبة - لن تُشغَّل عند تغيير الخاصية المتداخلة. إذا كنت تريد أن تشغل الدالة المُراقِبة على جميع التغييرات المتداخلة، فستحتاج إلى استخدام دالة مُراقبة عميقة :

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // ملاحظة: هنا `newValue` سيكون مساويًا لـ  `oldValue` 
        // على التغييرات المتداخلة طالما لم يتم استبدال الكائن نفسه.
        
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

عندما تستدعي `()watch` مباشرةً على كائن تفاعلي، سيُنشئ تلقائيًا دالة مُراقبة عميقة  - ستُشغَّل دالة رد النداء على جميع التغييرات المتداخلة :

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // تشغل عند التغييرات المتداخلة للخاصية  ملاحظة:
  // `newValue` سيكون مساويًا لـ `oldValue` هنا
  // لأنهما يشيران إلى نفس الكائن!
})

obj.count++
```

يجب التمييز بين هذا وبين دالة getter التي تُرجع كائنًا تفاعليًا (reactive object) — في هذه الحالة الأخيرة، لن يتم تشغيل الـ callback إلا إذا أعادت دالة الـ getter كائنًا مختلفًا.


```js
watch(
  () => state.someObject,
  () => {
    // تشغل فقط عند استبدال state.someObject
  }
)
```

ومع ذلك، يمكنك فرض الحالة الثانية داخل  دالة مراقبة عميقة عن طريق استخدام الخيار "deep" بشكل صريح :

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // ملاحظة: `newValue` سيكون مساويًا لـ `oldValue` هنا
    // *إلا إذا* تم استبدال state.someObject
  },
  { deep: true }
)
```

</div>

في Vue 3.5 وما فوق، يمكن أن يكون خيار `deep` أيضًا رقمًا يحدد أقصى عمق للتفحص (max traversal depth) — أي عدد المستويات التي يجب أن يجتازها Vue داخل خصائص الكائن المتداخلة.

:::warning تحذير
المراقبة العميقة (deep watch) تتطلب المرور على جميع الخصائص المتداخلة داخل الكائن المُراقَب، وقد تكون مكلفة من ناحية الأداء عند استخدامها مع هياكل بيانات كبيرة. استخدمها فقط عند الضرورة وكن على دراية بتأثيرها على الأداء.
:::


## الدوال المُراقِبة الفورية {#eager-watchers}

الدالة `watch` خاملة افتراضيًا: لن تُستدعى دالة رد النداء حتى يُغيَّر المصدر المراقَب. ولكن في بعض الحالات قد نرغب في تشغيل نفس شيفرة رد النداء بشكل فوري - على سبيل المثال، قد نرغب في جلب بعض البيانات الأولية ثم إعادة جلبها عند تغيير الحالة المرتبطة بها.

<div class="options-api">

يمكننا فرض تشغيل دالة رد النداء للخاصية المُراقبة فورًا عن طريق التصريح بها باستخدام كائن يحتوي على دالة المعالجة `handler` لتنفيذ الشيفرة المستندة على تغير المصدر المُراقَب وخيار `immediate: true`:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
      // سيتم تشغيله فورًا عند إنشاء المكون.   
      },
      // فرض تشغيل دالة رد النداء فورًا
      immediate: true
    }
  }
  // ...
}
```

التنفيذ الأولي لدالة المعالجة سيحدث قبل مرحلة `created`. ستكون Vue قد قام عالجت خيارات `data` و `computed` و `methods`، لذا ستكون هذه الخاصيات متاحة في الاستدعاء الأول.

</div>

<div class="composition-api">

يمكننا فرض تشغيل دالة رد النداء للخاصية المُراقبة فورًا عن طريق التصريح بها باستخدام كائن يحتوي على دالة المعالجة `handler` لتنفيذ الشيفرة المستندة على تغير المصدر المُراقَب وخيار `immediate: true`:

```js
watch(source, (newValue, oldValue) => {
  // سيتم تشغيله فورًا ثم مرة أخرى عند تغيير المصدر `source`
}, { immediate: true })
```

</div>

## المراقبة لمرة واحدة {#once-watchers}

- مدعومة فقط في الإصدار 3.4 وما فوق

يتم تنفيذ دالة الـ callback الخاصة بالـ watcher كلما تغيّر المصدر المُراقَب.  
إذا كنت تريد تشغيل الـ callback مرة واحدة فقط عند أول تغيير في المصدر، استخدم الخيار `once: true`.


<div class="options-api">

```js
export default {
  watch: {
    source: {
      handler(newValue, oldValue) {
        // عند تغيّر `source`، يُشغَّل مرة واحدة فقط
      },
      once: true
    }
  }
}
```

</div>

<div class="composition-api">

```js
watch(
  source,
  (newValue, oldValue) => {
    // عند تغيّر `source`، يُشغَّل مرة واحدة فقط
  },
  { once: true }
)
```

</div>

<div class="composition-api">

## `()watchEffect` \*\* {#watcheffect}

من الشائع أن تستخدم دالة رد النداء نفس الحالة المرتبطة بالمصدر المُراقَب. على سبيل المثال، فإن الشيفرة التالية تستخدم مُراقِب لتحميل مورد عن بعد عند تعيين المتغير التفاعلي `todoId`:

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

على وجه الخصوص، تجدر الإشارة إلى أن الدالة المُراقِبة تستخدم `todoId` مرتين، مرة كمصدر ومرة أخرى داخل الدالة المُعالجة.

يمكن تبسيط هذا باستخدام [`()watchEffect`](/api/reactivity-core#watcheffect). يسمح لنا `()watchEffect` بتتبع الاعتماديات التفاعلية للدالة المعالجة تلقائيًا. يمكن إعادة كتابة المُراقِب أعلاه كما يلي:

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

هنا، ستُشغَّل الدالة المُعالِجة فورًا، لا تحتاج إلى تحديد `immediate: true`. خلال تنفيذها، سيتم تتبع `todoId.value` تلقائيًا كاعتمادية (مماثلة للخاصيات المحسوبة). عندما يتغير `todoId.value`، سيتم تشغيل الدالة المعالجة مرة أخرى. مع `()watchEffect`، لم نعد نحتاج  إلى تمرير `todoId` بشكل صريح كقيمة مصدرية.

يمكنك التحقق من [هذا المثال](/examples/#fetching-data) لـ `()watchEffect` و كيفية تحميل البيانات التفاعلية داخل دالتها المعالجة.

بالنسبة للأمثلة مثل هذه، مع اعتمادية واحدة فقط، فإن فائدة `()watchEffect` غير ملموسة نسبيا. ولكن للدوال المُراقِبة التي لديها عدة اعتماديات، فإن استخدام `()watchEffect` يزيل قائمة الاعتماديات المضافة يدويًا. بالإضافة إلى ذلك، إذا كنت بحاجة إلى مراقبة عدة خاصيات في سلسلة بيانات متداخلة، فقد تثبت الدالة `()watchEffect`  فعاليتها مقارنة بالدالة المُراقِبة العميقة، حيث سيتم تتبع الخاصيات المستخدمة فقط في الدالة المعالجة، بدلاً من تتبعها جميعا بشكل تكراري .

:::tip ملاحظة
`()watchEffect` يتتبع الاعتماديات فقط خلال تنفيذها **المتزامن**. عند استخدامه مع دالة مُعالِجة غير متزامنة، وحدها الخاصيات التي يتم الوصول إليها قبل النبضة الأولى لـ`await` ستُتبَّع .
:::

### `watch` مقابل `watchEffect` {#watch-vs-watcheffect}

`watch` و `watchEffect` كلتاهما تسمحان لنا بتنفيذ تأثير جانبية بشكل تفاعلي. الفرق الرئيسي بينهما هو طريقة تتبع اعتمادياتهما التفاعلية :

- `watch` تتبع فقط المصدر المراقب بشكل صريح. لن يتم تتبع أي شيء يتم الوصول إليه داخل الدالة المُعالجة. بالإضافة إلى ذلك، فإن الدالة المعالجة تتفاعل فقط عندما يتغير المصدر بالفعل. `watch` تفصل التتبع الاعتمادي عن التأثير الجانبي، مما يمنحنا مزيدًا من التحكم الدقيق في متى يجب تشغيل الدالة المعالجة.

- `watchEffect`, من ناحية أخرى، تجمع التتبع الاعتمادي والتأثير الجانبي في طور واحد. تتبع كل الخاصيات التفاعلية التي يتم الوصول إليها خلال تنفيذها بشكل متزامن.هذه الدالة تعتبر أكثر ملاءمة وعادة ما يؤدي ذلك إلى تقليل الشيفرة، ولكنه يجعل اعتمادياته التفاعلية أقل وضوحًا.

</div>

## تنظيف التأثيرات الجانبية {#side-effect-cleanup}

في بعض الأحيان قد نقوم بتنفيذ تأثيرات جانبية (side effects)، مثل الطلبات غير المتزامنة (asynchronous requests)، داخل الـ watcher:


<div class="composition-api">

```js
watch(id, (newId) => {
  fetch(`/api/${newId}`).then(() => {
    // منطق الـ callback
  })
})
```

</div>
<div class="options-api">

```js
export default {
  watch: {
    id(newId) {
      fetch(`/api/${newId}`).then(() => {
        // منطق الـ callback
      })
    }
  }
}
```

</div>

لكن ماذا لو تغيّر `id` قبل اكتمال الطلب؟ عند انتهاء الطلب السابق، سيقوم بتشغيل الـ callback باستخدام قيمة `id` أصبحت قديمة بالفعل (stale).  
في الحالة المثالية، نريد إلغاء الطلب القديم عندما يتغير `id` إلى قيمة جديدة.

يمكننا استخدام واجهة [`onWatcherCleanup()`](/api/reactivity-core#onwatchercleanup) <sup class="vt-badge" data-text="3.5+" /> لتسجيل دالة تنظيف (cleanup function)، والتي سيتم استدعاؤها عندما يتم إبطال الـ watcher وقبل إعادة تشغيله:


<div class="composition-api">

```js {10-13}
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // منطق الـ callback
  })

  onWatcherCleanup(() => {
    // إلغاء الطلب القديم
    controller.abort()
  })
})
```

</div>
<div class="options-api">

```js {12-15}
import { onWatcherCleanup } from 'vue'

export default {
  watch: {
    id(newId) {
      const controller = new AbortController()

      fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
        // منطق الـ callback
      })

      onWatcherCleanup(() => {
        // إلغاء الطلب القديم
        controller.abort()
      })
    }
  }
}
```

</div>

لاحظ أن `onWatcherCleanup` مدعومة فقط في Vue 3.5+ ويجب استدعاؤها أثناء التنفيذ المتزامن (synchronous execution) لدالة تأثير `watchEffect` أو دالة الـ callback في `watch`: لا يمكنك استدعاؤها بعد جملة `await` في دالة غير متزامنة (async).

بدلاً من ذلك، تُمرَّر أيضًا دالة `onCleanup` إلى دوال الـ callback للمراقب كالوسيط الثالث<span class="composition-api">، وإلى دالة تأثير `watchEffect` كأول وسيط</span>:

<div class="composition-api">

```js
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // منطق التنظيف
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // منطق التنظيف
  })
})
```

</div>
<div class="options-api">

```js
export default {
  watch: {
    id(newId, oldId, onCleanup) {
      // ...
      onCleanup(() => {
        // منطق التنظيف
      })
    }
  }
}
```

</div>

يعمل هذا في الإصدارات السابقة لـ 3.5. بالإضافة إلى ذلك، الـ `onCleanup` الممرَّرة عبر وسيط الدالة مرتبطة بنسخة المراقب (watcher) وليست خاضعة لقيد التزامن (synchronous constraint) الخاص بـ `onWatcherCleanup`.

## توقيت تنفيذ الدالة المعالجة {#callback-flush-timing}

لما تُعدل حالة تفاعلية، فإنها قد تُشغل كل من تحديثات مكونات Vue والدوال المراقِبة المُنشأة من قبلك.

بمثل تحديثات المكون، تُجمَّع دوال الـ callback للمراقبين التي أنشأها المستخدم لتجنب استدعاءات مكررة. على سبيل المثال، قد لا نريد أن يُنفَّذ المراقب ألف مرة إذا دفعنا ألف عنصر بشكل متزامن إلى مصفوفة يتم مراقبتها.

افتراضيًا، تُستدعى دالة الـ callback للمراقب **بعد** تحديثات المكون الأب (إن وُجدت)، و**قبل** تحديثات DOM للمكون المالك. هذا يعني أنه إذا حاولت الوصول إلى DOM المكون المالك نفسه داخل callback المراقب، فسيكون الـ DOM في حالة ما قبل التحديث (pre-update state).

### مراقبون بعد التحديث (post watchers) {#post-watchers}

إذا أردت الوصول إلى DOM المكون المالك داخل callback المراقب **بعد** أن تُحدِّثه Vue، فستحتاج إلى تحديد الخيار `flush: 'post'`:

<div class="options-api">

```js{6}
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js{2,6}
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

تمتلك `()watchEffect` مسمى ملائم أيضًا لخاصية التنفيذ بعد التحديث، وهي الدالة `()watchPostEffect`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* نفذت بعد تحديثات  Vue */
})
```

</div>

### مراقبون متزامنون (sync watchers) {#sync-watchers}

من الممكن أيضًا إنشاء مراقب يُنفَّذ بشكل متزامن، قبل أي تحديثات تديرها Vue:

<div class="options-api">

```js{6}
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'sync'
    }
  }
}
```

</div>

<div class="composition-api">

```js{2,6}
watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})
```

لدى استدعاء `watchEffect()` المتزامن أيضًا اسم بديل مريح، وهو `watchSyncEffect()`:

```js
import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* يُنفَّذ بشكل متزامن عند تغيّر البيانات التفاعلية */
})
```

</div>

:::warning استخدم بحذر
لا تمتلك المراقبات المتزامنة (sync watchers) تجميعًا (batching) وتُطلَق في كل مرة يُكتشف فيها تحوّر تفاعلي (reactive mutation). يمكن استخدامها لمراقبة قيم منطقية بسيطة، لكن تجنب استخدامها على مصادر بيانات قد تُعدَّل بشكل متزامن عدة مرات، مثل المصفوفات.
:::

<div class="options-api">

## الدالة `()this.$watch`  \* {#this-watch}

من الممكن أيضًا إنشاء دوال مُراقِبة بشكل مباشر باستخدام [دالة النسخة `()watch$`](/api/component-instance#watch):

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

هذا مفيد عندما تحتاج إلى إعداد دالة مراقِبة بشكل شرطي، أو مراقبة شيء ما فقط كاستجابة لتفاعل المستخدم. ويسمح لك أيضًا بإيقاف المراقبة في وقت مبكر.

</div>

## إيقاف خاصية مراقِبة {#stopping-a-watcher}

<div class="options-api">

الخاصيات المُراقِبة المُنشأة من خلال خاصية `watch` أو دالة `()this.$watch` تُوقف تلقائيًا عند إزالة المكون الحامل لها، لذا في معظم الحالات لا تهتم بشأن إيقاف الخاصية المراقِبة بنفسك.

في حالات نادرة، قد تحتاج إلى إيقاف خاصية مراقِبة قبل إزالة المكون الحامل لها. حيث يمكنك القيام بذلك بواسطة الدالة المُرجَعة من الواجهة البرمجية لـ `()this.$watch` :

```js
const unwatch = this.$watch('foo', callback)

// ...عندما لا تحتاج إلى المراقبة بعد ذلك:
unwatch()
```

</div>

<div class="composition-api">

الخاصيات المراقِبة المصرحة بشكل تزامني داخل `setup()` أو `<script setup>` مرتبطة بنسخة المكون الحامل لها، وسيتم إيقافها تلقائيًا عند فصله. في معظم الحالات، لا تهتم بشأن إيقاف الخاصية المراقِبة بنفسك.

الجوهر هنا هو أن الخاصية المراقِبة يجب أن تُنشأ **بشكل متزامن** : إذا تم إنشاء الخاصية المراقِبة في دالة رد نداء غير متزامنة، فلن تكون مرتبطة بالمكون الحامل لها ويجب إيقافها يدويًا لتجنب التسريبات في الذاكرة. هنا مثال:

```vue
<script setup>
import { watchEffect } from 'vue'

// هذا سيوقف تلقائيًا
watchEffect(() => {})

//هذا لن يوقف تلقائيًا!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

من أجل إيقاف الخاصية المراقِبة يدويًا، استخدم الدالة المُرجَعة. هذا يعمل لكل من `watch` و `watchEffect`:

```js
const unwatch = watchEffect(() => {})

// ... في وقت لاحق، عندما لا تعود محتاجا إلى المراقبة  
unwatch()
```

تجدر الإشارة إلى أن هناك حالات نادرة جدًا حيث تحتاج إلى إنشاء مراقِبين بشكل غير متزامن، ويجب تفضيل الإنشاء المتزامن في أي وقت ممكن. إذا كنت بحاجة إلى الانتظار لبعض البيانات غير المتزامنة، يمكنك جعل شيفرة الدالة المراقبة شرطية بدلاً من ذلك :

```js
// بيانات ستُحمّل بشكل غير متزامن 
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // قم ببعض المعالجة عندما يتم تحميل البيانات 
  }
})
```

</div>
