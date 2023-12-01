# الواجهة التفاعلية : الأساسيات {#reactivity-api-core}

:::info اطلع أيضًا على
لفهم أفضل للواجهات التفاعلية، يوصى بقراءة الفصول التالية في الدليل:

- [أساسيات التفاعلية](/guide/essentials/reactivity-fundamentals) (مع تفضيل الواجهة التركيبية)
- [التفاعلية بالتفصيل](/guide/extras/reactivity-in-depth)
  :::

## ()ref {#ref}

يأخذ قيمة داخلية ويعيد كائنًا مرجعيًا تفاعليًا وقابلًا للتغيير، والذي يحتوي على خاصية واحدة `.value` تشير إلى القيمة الداخلية.

- **النوع**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **التفاصيل**

  الكائن المرجعي ref قابل للتغيير - أي يمكنك تعيين قيم جديدة لـ `value.`. كما أنه تفاعلي - أي أن أي عمليات قراءة لـ `value.` متتبعة، وعمليات الكتابة ستؤدي إلى تنشيط الآثار المرتبطة.

  إذا عُيِّن كائن كقيمة للمرجع، فإن الكائن يتفاعل بشكل عميق مع [()reactive](#reactive). هذا يعني أيضًا إذا كان الكائن يحتوي على مراجع متداخلة، فستفك بشكل عميق.

  لتجنب التحويل العميق، استخدم [`()shallowRef`](./reactivity-advanced#shallowref) بدلاً من ذلك.

- **مثال**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value = 1
  console.log(count.value) // 1
  ```

- **اطلع أيضًا على**
  - [أساسيات التفاعلية مع `()ref`](/guide/essentials/reactivity-fundamentals#ref)
  - [إضافة النوع إلى `()ref`](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />  

## ()computed {#computed}

يأخذ دالة محصلة ويعيد مرجع تفاعلي تفاعلي للقراءة فقط [ref](#ref) للقيمة المُرجعة من الدالة المحصلة. يمكنه أيضًا أخذ كائن مع دوال `get` و `set` لإنشاء مرجع تفاعلي قابل للكتابة.

- **النوع**

  ```ts
   // للقراءة فقط
  function computed<T>(
    getter: () => T,
    // انظر الرابط "تنقيح الدوال المحسوبة" أدناه
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // قابل للكتابة
  function computed<T>(
    options: {
      get: () => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **مثال**

  إنشاء مرجع محسوب للقراءة فقط:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // خطأ
  ```

  إنشاء مرجع محسوب قابل للكتابة:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  تنقيح:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **اطلع أيضًا على**
  - [الخاصيات المحسوبة](/guide/essentials/computed)
  - [تنقيح الخاصيات المحسوبة](/guide/extras/reactivity-in-depth#computed-debugging)
  - [إضافة النوع إلى `()computed`](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />

## ()reactive {#reactive}

يعيد وسيط تفاعلي للكائن.

- **النوع**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **التفاصيل**

  التحويل التفاعلي هو "عميق": يؤثر على جميع الخاصيات المتداخلة. يفك الكائن التفاعلي أيضًا بشكل عميق أي خاصيات تكون [مراجع](#ref) مع الحفاظ على التفاعلية.

  يجب أيضًا ملاحظة أنه لا يوجد فك للمراجع عند الوصول إلى المرجع كعنصر من مصفوفة تفاعلية أو نوع مجموعة أصلية مثل `Map`.

  لتجنب التحويل العميق والاحتفاظ بالتفاعلية فقط على مستوى الجذر، استخدم [()shallowReactive](./reactivity-advanced#shallowreactive) بدلاً من ذلك.

  الكائن المعاد والكائنات المتداخلة به مغلفة بـ [وسيط ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) و **ليست** مساوية للكائنات الأصلية. يوصى بالعمل حصريًا مع الوسيط التفاعلي وتجنب الاعتماد على الكائن الأصلي.

- **مثال**

  إنشاء كائن تفاعلي:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  فك المرجع:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // المرجع سيفك
  console.log(obj.count === count.value) // true

  // سيقوم بتحديث `obj.count`
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // سيقوم أيضًا بتحديث المرجع `count`
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  لاحظ أن المراجع **لا** تفك عند الوصول إليها كعناصر مصفوفة أو مجموعات:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // نحتاج إلى .value هنا
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // نحتاج إلى .value هنا 
  console.log(map.get('count').value)
  ```

  عند تعيين [ref](#ref) إلى خاصية `reactive`، سيفك المرجع التفاعلي تلقائيًا أيضًا:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **اطلع أيضًا على**
  - [أساسيات التفاعلية](/guide/essentials/reactivity-fundamentals)
  - [إضافة النوع إلى `()reactive`](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

## ()readonly {#readonly}

يأخذ كائنًا (تفاعليًا أو عاديًا) أو [مرجع تفاعلي ref](#ref) ويعيد وسيطًا قابل للقراءة فقط إلى المتغير الأصلي.

- **النوع**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **التفاصيل**

الوسيط القابل للقراءة هو بطبيعته عميق: أي خاصية متداخلة يوصل إليها ستكون قابلة للقراءة أيضًا. كما أنه يتمتع بنفس سلوك فك المرجع كـ `()reactive`، باستثناء أن القيم المفككة ستكون أيضًا قابلة للقراءة.

  من أجل تجنب التحويل العميق، استخدم [()shallowReadonly](./reactivity-advanced#shallowreadonly) بدلاً من ذلك.

- **مثال**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // تعمل لتتبع التفاعلية
    console.log(copy.count)
  })

  // تغيير المتغير الأصلي سيؤدي إلى تنشيط المراقبين التي تعتمد على النسخة
  original.count++

  // تغيير النسخة سيفشل ويؤدي إلى إصدار تحذير
  copy.count++ // تحذير!
  ```

## ()watchEffect {#watcheffect}

يقوم بتشغيل دالة على الفور مع تتبع تفاعلي للاعتماديات وإعادة تشغيلها كلما غُيِّرت الاعتماديات.

- **النوع**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): StopHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **التفاصيل**

  الوسيط الأول هو دالة التأثيرات التي ستشغل. تستقبل دالة التأثيرات دالة يمكن استخدامها لتسجيل استدعاء دالة رد النداء الخاصة بالتنظيف. ستستدعى هذه الدالة مباشرة قبل يُعاد تشغيل التأثيرات مرة أخرى، ويمكن استخدامها لتنظيف التأثيرات الجانبية غير الصالحة، على سبيل المثال طلب معلق غير متزامن (انظر المثال أدناه).

  الوسيط الثاني هو كائن خيارات اختياري يمكن استخدامه لضبط توقيت تنشيط التأثيرات أو لتنقيح اعتماديات التأثيرات.

  بشكل افتراضي، ستعمل التأثيرات قبل تصيير المكون. سيؤدي ضبط `flush: 'post'` إلى تأجيل التأثيرات حتى بعد تصيير المكون. انظر [توقيت تنشيط التأثيرات](/guide/essentials/watchers#callback-flush-timing) لمزيد من المعلومات. في حالات نادرة، قد يكون من الضروري تنشيط مراقب على الفور عندما يتغير اعتماد تفاعلي، على سبيل المثال لإلغاء تخزين مؤقت. يمكن تحقيق ذلك باستخدام `flush: 'sync'`. ومع ذلك، يجب استخدام هذا الإعداد بحذر، حيث يمكن أن يؤدي إلى مشاكل في الأداء واتساق البيانات إذا حُدثت خاصيات متعددة في نفس الوقت.

  الوسيط المعاد هو دالة تسمح بإيقاف تشغيل التأثيرات مرة أخرى.

- **مثال**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  تنظيف التأثيرات الجانبية:

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // سيتم استدعاء `cancel` إذا تغير `id`
    // بحيث يتم إلغاء الطلب المعلق السابق
    // إذا لم يكتمل بعد
    onCleanup(cancel)
    data.value = await response
  })
  ```

  توقيف الدالة المراقبة:

  ```js
  const stop = watchEffect(() => {})

  // عندما لا تعد الدالة المراقبة مطلوبة:
  stop()
  ```

  الخيارات:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **اطلع أيضًا على**
  - [الدوال المراقبة](/guide/essentials/watchers#watcheffect)
  - [تنقيح الدوال المراقبة](/guide/extras/reactivity-in-depth#watcher-debugging)

## ()watchPostEffect {#watchposteffect}

إسم بديل لـ [`()watchEffect`](#watcheffect) مع خيار `flush: 'post'`.

## ()watchSyncEffect {#watchsynceffect}

إسم بديل لـ [`()watchEffect`](#watcheffect) مع خيار `flush: 'sync'`.

## ()watch {#watch}

يراقب مصادر بيانات تفاعلية واحدة أو أكثر ويستدعي دالة رد النداء عند تغير المصادر.

- **النوع**

  ```ts
  // مراقبة مصدر واحد 
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): StopHandle

  // مراقبة مصادر متعددة
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): StopHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // مرجع تفاعلي ref
    | (() => T) // دالة محصلة
    | T extends object
    ? T
    : never // كائن تفاعلي

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > الأنواع مبسطة للقراءة.

- **التفاصيل**

  `()watch` هي خاملة بشكل افتراضي - أي أن دالة رد النداء لا تستدعى إلا عند تغير المصدر المراقب.

  الوسيط الأول هو **المصدر** للدالة المراقبة. يمكن أن يكون المصدر أحد ما يلي:

  - دالة محصلة تعيد قيمة
  - مرجع تفاعلي ref
  - كائن تفاعلي
  - ... أو مصفوفة من ما سبق.

  الوسيط الثاني هو دالة رد النداء التي ستستدعى عند تغير المصدر. تستقبل دالة رد النداء ثلاثة وسائط: القيمة الجديدة، القيمة القديمة، ودالة لتسجيل استدعاء دالة رد النداء الخاصة بالتنظيف. ستستدعى دالة التنظيف هذه مباشرة قبل ما يُعاد تشغيل التأثيرات مرة أخرى، ويمكن استخدامها لتنظيف التأثيرات الجانبية غير الصالحة، على سبيل المثال طلب معلق غير متزامن.

  عند مراقبة مصادر متعددة، تستقبل دالة رد النداء مصفوفتين تحتوي على القيم الجديدة / القديمة المقابلة لمصفوفة المصدر.

  الوسيط الثالث الاختياري هو كائن خيارات يدعم الخيارات التالية:

  - **`immediate`**: تنشيط دالة رد النداء على الفور عند إنشاء المراقب. ستكون القيمة القديمة `undefined` في المرة الأولى.
  - **`deep`**: فرض التنقيح العميق للمصدر إذا كان كائنًا، بحيث تنشط دالة رد النداء على التغييرات العميقة. انظر [الدوال المراقبة العميقة](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: ضبط توقيت تنشيط دالة رد النداء. انظر [توقيت تنشيط دالة رد النداء](/guide/essentials/watchers#callback-flush-timing) و [`()watchEffect`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: تنقيح اعتماديات الدالة المراقبة. انظر [تنقيح الدوال المراقبة](/guide/extras/reactivity-in-depth#watcher-debugging).

  مقارنة بـ [`()watchEffect`](#watcheffect)، `()watch` تسمح لنا بـ:

  - تنفيذ التأثيرات الجانبية بشكل خامل؛
  - أكثر تحديدًا حول ما يجب أن يؤدي إلى إعادة تشغيل الدالة المراقبة؛
  - الوصول إلى القيمة السابقة والحالية للحالة المراقَبة.

- **مثال**

  مراقبة دالة محصلة:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  مراقبة مرجع تفاعلي:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  عند مراقبة مصادر متعددة، تستقبل دالة رد النداء مصفوفتين تحتوي على القيم الجديدة / القديمة المقابلة لمصفوفة المصدر:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  عند استخدام مصدر دالة محصلة، تنشط الدالة المراقبة فقط إذا تغيرت قيمة إرجاع الدالة المحصلة. إذا كنت تريد تنشيط دالة رد النداء حتى على التغييرات العميقة، فستحتاج إلى فرض التأثيرات العميقة بشكل صريح مع `{ deep: true }`. لاحظ في الوضع العميق، ستكون القيمة الجديدة والقديمة هي نفس الكائن إذا نشطت دالة رد النداء بسبب تغيير عميق:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  عند مراقبة كائن تفاعلي مباشرة، تكون دالة المراقبة بشكل تلقائي في الوضع العميق:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* ينشط على التغيير العميق للحالة */
  })
  ```

  `()watch` يشترك في نفس توقيت التنشيط وخيارات التنقيح مع [`()watchEffect`](#watcheffect):

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  توقيف الدالة المراقبة:

  ```js
  const stop = watch(source, callback)

  // عندما لا تعد الدالة المراقبة مطلوبة:
  stop()
  ```

  تنظيف التأثيرات الجانبية:

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // ستستدعى `cancel` إذا تغير `id`
    // بحيث يتم إلغاء الطلب المعلق السابق
    onCleanup(cancel)
    data.value = await response
  })
  ```

- **اطلع أيضًا على**

  - [الدوال المراقبة](/guide/essentials/watchers)
  - [تنقيح الدوال المراقبة](/guide/extras/reactivity-in-depth#watcher-debugging)
