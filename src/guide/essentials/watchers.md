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

`watch`'s first argument can be different types of reactive "sources": it can be a ref (including computed refs), a reactive object, a [getter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description), or an array of multiple sources:

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
    console.log(`Count is: ${count}`)
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

This should be differentiated with a getter that returns a reactive object - in the latter case, the callback will only fire if the getter returns a different object:

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

In Vue 3.5+, the `deep` option can also be a number indicating the max traversal depth - i.e. how many levels should Vue traverse an object's nested properties.

:::warning Use with Caution
Deep watch requires traversing all nested properties in the watched object, and can be expensive when used on large data structures. Use it only when necessary and beware of the performance implications.
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

## Once Watchers {#once-watchers}

- Only supported in 3.4+

Watcher's callback will execute whenever the watched source changes. If you want the callback to trigger only once when the source changes, use the `once: true` option.

<div class="options-api">

```js
export default {
  watch: {
    source: {
      handler(newValue, oldValue) {
        // when `source` changes, triggers only once
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
    // when `source` changes, triggers only once
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

بالنسبة للأمثلة مثل هذه، مع اعتمادية واحدة فقط، فإن فائدة `()watchEffect` غير ملموسة نسبيا. ولكن hلدوال المُراقِبة التي لديها عدة اعتماديات، فإن استخدام `()watchEffect` يزيل قائمة الاعتماديات المضافة يدويًا. بالإضافة إلى ذلك، إذا كنت بحاجة إلى مراقبة عدة خاصيات في سلسلة بيانات متداخلة، فقد تثبت الدالة `()watchEffect`  فعاليتها مقارنة بالدالة المُراقِبة العميقة، حيث سيتم تتبع الخاصيات المستخدمة فقط في الدالة المعالجة، بدلاً من تتبعها جميعا بشكل تكراري .

:::tip ملاحظة
`()watchEffect` يتتبع الاعتماديات فقط خلال تنفيذها **المتزامن**. عند استخدامه مع دالة مُعالِجة غير متزامنة، وحدها الخاصيات التي يتم الوصول إليها قبل النبضة الأولى لـ`await` ستُتبَّع .
:::

### `watch` مقابل `watchEffect` {#watch-vs-watcheffect}

`watch` و `watchEffect` كلتاهما تسمحان لنا بتنفيذ تأثير جانبية بشكل تفاعلي. الفرق الرئيسي بينهما هو طريقة تتبع اعتمادياتهما التفاعلية :

- `watch` تتبع فقط المصدر المراقب بشكل صريح. لن يتم تتبع أي شيء يتم الوصول إليه داخل الدالة المُعالجة. بالإضافة إلى ذلك، فإن الدالة المعالجة تتفاعل فقط عندما يتغير المصدر بالفعل. `watch` تفصل التتبع الاعتمادي عن التأثير الجانبي، مما يمنحنا مزيدًا من التحكم الدقيق في متى يجب تشغيل الدالة المعالجة.

- `watchEffect`, من ناحية أخرى، تجمع التتبع الاعتمادي والتأثير الجانبي في طور واحد. تتبع كل الخاصيات التفاعلية التي يتم الوصول إليها خلال تنفيذها بشكل متزامن.هذه الدالة تعتبر أكثر ملاءمة وعادة ما يؤدي ذلك إلى تقليل الشيفرة، ولكنه يجعل اعتمادياته التفاعلية أقل وضوحًا.

</div>

## Side Effect Cleanup {#side-effect-cleanup}

Sometimes we may perform side effects, e.g. asynchronous requests, in a watcher:

<div class="composition-api">

```js
watch(id, (newId) => {
  fetch(`/api/${newId}`).then(() => {
    // callback logic
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
        // callback logic
      })
    }
  }
}
```

</div>

But what if `id` changes before the request completes? When the previous request completes, it will still fire the callback with an ID value that is already stale. Ideally, we want to be able to cancel the stale request when `id` changes to a new value.

We can use the [`onWatcherCleanup()`](/api/reactivity-core#onwatchercleanup) <sup class="vt-badge" data-text="3.5+" /> API to register a cleanup function that will be called when the watcher is invalidated and is about to re-run:

<div class="composition-api">

```js {10-13}
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // callback logic
  })

  onWatcherCleanup(() => {
    // abort stale request
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
        // callback logic
      })

      onWatcherCleanup(() => {
        // abort stale request
        controller.abort()
      })
    }
  }
}
```

</div>

Note that `onWatcherCleanup` is only supported in Vue 3.5+ and must be called during the synchronous execution of a `watchEffect` effect function or `watch` callback function: you cannot call it after an `await` statement in an async function.

Alternatively, an `onCleanup` function is also passed to watcher callbacks as the 3rd argument<span class="composition-api">, and to the `watchEffect` effect function as the first argument</span>:

<div class="composition-api">

```js
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // cleanup logic
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // cleanup logic
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
        // cleanup logic
      })
    }
  }
}
```

</div>

This works in versions before 3.5. In addition, `onCleanup` passed via function argument is bound to the watcher instance so it is not subject to the synchronously constraint of `onWatcherCleanup`.

## توقيت تنفيذ الدالة المعالجة {#callback-flush-timing}

لما تُعدل حالة تفاعلية، فإنها قد تُشغل كل من تحديثات مكونات Vue والدوال المراقِبة المُنشأة من قبلك.

Similar to component updates, user-created watcher callbacks are batched to avoid duplicate invocations. For example, we probably don't want a watcher to fire a thousand times if we synchronously push a thousand items into an array being watched.

By default, a watcher's callback is called **after** parent component updates (if any), and **before** the owner component's DOM updates. This means if you attempt to access the owner component's own DOM inside a watcher callback, the DOM will be in a pre-update state.

### Post Watchers {#post-watchers}

If you want to access the owner component's DOM in a watcher callback **after** Vue has updated it, you need to specify the `flush: 'post'` option:

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

### Sync Watchers {#sync-watchers}

It's also possible to create a watcher that fires synchronously, before any Vue-managed updates:

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

Sync `watchEffect()` also has a convenience alias, `watchSyncEffect()`:

```js
import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* executed synchronously upon reactive data change */
})
```

</div>

:::warning Use with Caution
Sync watchers do not have batching and triggers every time a reactive mutation is detected. It's ok to use them to watch simple boolean values, but avoid using them on data sources that might be synchronously mutated many times, e.g. arrays.
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
