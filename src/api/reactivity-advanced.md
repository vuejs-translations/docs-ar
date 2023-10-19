# الواجهة البرمجية للتفاعلية: الدليل المتقدم  {#reactivity-api-advanced}

## ()shallowRef {#shallowref}

نسخة سطحية من [`ref()`](./reactivity-core#ref).

- **النوع**

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **التفاصيل**

  على عكس `()ref`، تخزن القيمة الداخلية للمرجع السطحي وعرضها كما هي، ولن تُجعل تفاعلية بشكل عميق. فقط الوصول إلى `value.` هو تفاعلي.

  `()shallowRef` تستخدم عادة لتحسينات الأداء لهياكل البيانات الكبيرة، أو التكامل مع أنظمة إدارة الحالة الخارجية.

- **مثال**

  ```js
  const state = shallowRef({ count: 1 })

  // لا يشغل التغيير
  state.value.count = 2

  // يشغل التغيير
  state.value = { count: 2 }
  ```

- **اطلع أيضاً على**
  - [دليل - تقليل تكاليف التفاعل لهياكل البيانات الكبيرة غير المتغيرة](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
  - [دليل - الدمج مع أنظمة الحالة الخارجية](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

## ()triggerRef {#triggerref}

ترغم تشغيل التأثيرات التي تعتمد على [مرجع سطحي](#shallowref).  يستخدم هذا عادة بعد إجراء تغييرات عميقة على القيمة الداخلية للمرجع السطحي.

- **النوع**

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **مثال**

  ```js
  const shallow = shallowRef({
    greet: 'أهلا وسهلا'
  })

  // تطبع "أهلا وسهلا" مرة واحدة لأول مرة
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // لن يشغل هذا التأثير لأن المرجع سطحي  
  shallow.value.greet = 'مرحبا'

  // "تطبع "مرحبا 
    triggerRef(shallow)
  ```

## ()customRef {#customref}

ينشئ مرجع مخصص مع التحكم الصريح في تتبع الاعتماد وتحديثات التشغيل.

- **النوع**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **التفاصيل**

  `()customRef` يتوقع دالة منتجة، تستقبل `track` و `trigger` وتعيد كائنًا يحتوي على التوابع `get` و `set`.

  بشكل عام، يجب استدعاء `()track` داخل `()get`، ويجب استدعاء `()trigger` داخل `()set`. ومع ذلك، لديك التحكم الكامل في متى يجب استدعاؤهما، أو ما إذا كان يجب استدعاؤهما على الإطلاق.

- **مثال**

  إنشاء مرجع مؤجل يحدث القيمة فقط بعد فترة زمنية معينة بعد آخر مجموعة إستدعاءات:

  ```js
  import { customRef } from 'vue'

  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

  الاستخدام في المكون:

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hello')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [اختبرها في حقل التجارب](https://play.vuejs.org/#eNplUkFugzAQ/MqKC1SiIekxIpEq9QVV1BMXCguhBdsyaxqE/PcuGAhNfYGd3Z0ZDwzeq1K7zqB39OI205UiaJGMOieiapTUBAOYFt/wUxqRYf6OBVgotGzA30X5Bt59tX4iMilaAsIbwelxMfCvWNfSD+Gw3++fEhFHTpLFuCBsVJ0ScgUQjw6Az+VatY5PiroHo3IeaeHANlkrh7Qg1NBL43cILUmlMAfqVSXK40QUOSYmHAZHZO0KVkIZgu65kTnWp8Qb+4kHEXfjaDXkhd7DTTmuNZ7MsGyzDYbz5CgSgbdppOBFqqT4l0eX1gZDYOm057heOBQYRl81coZVg9LQWGr+IlrchYKAdJp9h0C6KkvUT3A6u8V1dq4ASqRgZnVnWg04/QWYNyYzC2rD5Y3/hkDgz8fY/cOT1ZjqizMZzGY3rDPC12KGZYyd3J26M8ny1KKx7c3X25q1c1wrZN3L9LCMWs/+AmeG6xI=)

## ()shallowReactive {#shallowreactive}

نسخة سطحية من [`()reactive`](./reactivity-core#reactive).

- **النوع**

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **التفاصيل**

  على عكس `()reactive`، لا يوجد تحويل عميق: فقط الخاصيات على مستوى الجذر هي تفاعلية لكائن تفاعلي سطحي. تخزن القيم الخاصة وتعرضها كما هي - وهذا يعني أيضًا أن الخاصيات ذات القيم المرجعية لن تُفك تلقائيًا.

  :::warning استخدمها بحذر
  يجب استخدام هياكل البيانات السطحية فقط لحالة مستوى الجذر في المكون. تجنب تضمينها داخل كائن تفاعلي عميق حيث ينشئ شجرة بسلوك غير متسق للتفاعل والتي يمكن أن تكون صعبة الفهم والتصحيح.
  :::

- **مثال**

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // تغيير خاصيات الحالة الخاصة تفاعلي
  state.foo++

  // ...ولكن لا يحول الكائنات المتداخلة
  isReactive(state.nested) // false

  // غير تفاعلي
  state.nested.bar++
  ```

## ()shallowReadonly {#shallowreadonly}

نسخة سطحية من [`()readonly`](./reactivity-core#readonly).

- **النوع**

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **التفاصيل**

  على عكس `()readonly`، لا يوجد تحويل عميق: فقط الخاصيات على مستوى الجذر هي للقراءة فقط. تخزن القيم الخاصة وتعرضها كما هي - وهذا يعني أيضًا أن الخاصيات ذات القيم المرجعية لن تُفك تلقائيًا.

  :::warning استخدمها بحذر
  يجب استخدام هياكل البيانات السطحية فقط لحالة مستوى الجذر في المكون. تجنب تضمينها داخل كائن تفاعلي عميق حيث ينشئ شجرة بسلوك غير متسق للتفاعل والتي يمكن أن تكون صعبة الفهم والتصحيح.
  :::

- **مثال**

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // تغيير خاصيات الحالة الخاصة سيفشل
  state.foo++

  // ...ولكن يعمل على الكائنات المتداخلة
  isReadonly(state.nested) // false

  // يعمل
  state.nested.bar++
  ```

## ()toRaw {#toraw}

يعيد الكائن الأصلي الخام للوسيط الذي أنشأته Vue.

- **النوع**

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **التفاعل**

  `()toRaw` يمكن أن يعيد الكائن الأصلي من الوسيط الذي أنشأته [`()reactive`](./reactivity-core#reactive)، [`()readonly`](./reactivity-core#readonly)، [`()shallowReactive`](#shallowreactive) أو [`()shallowReadonly`](#shallowreadonly).

  هذا هو مخرج الهروب الذي يمكن استخدامه للقراءة مؤقتًا دون تكبد تكاليف الوصول / التتبع أو الكتابة دون تشغيل التغييرات. **لا** يوصى بالاحتفاظ بمرجع دائم إلى الكائن الأصلي. استخدمها بحذر.

- **مثال**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## ()markRaw {#markraw}

يميز كائنًا بحيث لن يحول إلى وسيط أبدًا. يعيد الكائن نفسه.

- **النوع**

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **مثال**

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // يعمل أيضًا عند التضمين داخل كائنات تفاعلية أخرى
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning استخدمها بحذر
    `()markRaw` والواجهات البرمجية سطحية مثل `()shallowReactive` تسمح لك بالاستبعاد الاختياري من التحويل الافتراضي العميق للتفاعلية / للقراءة فقط وتضمين الكائنات الخام غير الموجهة في رسم الحالة الخاص بك. يمكن استخدامها لأسباب مختلفة:

  - بعض القيم ببساطة لا ينبغي أن تصبح تفاعلية، على سبيل المثال مثيل فئة طرف ثالث معقد، أو كائن مكون Vue.

  - يمكن أن يوفر تخطي تحويل الوسيط تحسينات في الأداء عند عرض قوائم كبيرة مع مصادر بيانات غير قابلة للتغيير.

  تعتبر هذه الواجهات ذات مستوى متقدم لأن الاستبعاد الخام هو فقط على مستوى الجذر، لذلك إذا قمت بتعيين كائن خام غير مميز مضمن في كائن تفاعلي ثم الوصول إليه مرة أخرى، فستحصل على الإصدار التفاعلي مرة أخرى. يمكن أن يؤدي هذا إلى **مخاطر الهوية** - أي القيام بعملية تعتمد على هوية الكائن ولكن باستخدام الإصدار الخام والتفاعلي لنفس الكائن:

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // على الرغم من أن `foo` مميز كخام، `foo.nested` ليس كذلك.
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  مخاطر الهوية نادرة بشكل عام. ومع ذلك، لاستخدام هذه الواجهات بشكل صحيح مع تجنب مخاطر الهوية بأمان يتطلب فهمًا قويًا لكيفية عمل نظام التفاعلية.

  :::

## ()effectScope {#effectscope}

تنشئ كائن نطاق تأثير يمكنه التقاط التأثيرات التفاعلية (أي المحسوبة والمراقبة) التي تُنشأ داخله بحيث يمكن التخلص من هذه التأثيرات معًا. لحالات الاستخدام المفصلة لهذه الواجهة البرمجية، يرجى الاطلاع على [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md).

- **النوع**

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // undefined إذا كان النطاق غير نشط
    stop(): void
  }
  ```

- **مثال**

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // للتخلص من جميع التأثيرات في النطاق
  scope.stop()
  ```

## ()getCurrentScope {#getcurrentscope}

يعيد النطاق النشط الحالي [effect scope](#effectscope) إذا كان هناك.

- **النوع**

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## ()onScopeDispose {#onscopedispose}

  يسجل دالة رد نداء للتخلض على النطاق النشط الحالي [effect scope](#effectscope). ستستدعى الدالة عندما يوقف النطاق التأثيري المرتبط.

يمكن استخدام هذه الطريقة كبديل غير مرتبط بالمكون لـ `()onUnmounted` في الدوال التركيبية القابلة لإعادة الاستخدام، لأن دالة `()setup` في كل مكون Vue تستدعى أيضًا في نطاق تأثيري.

- **النوع**

  ```ts
  function onScopeDispose(fn: () => void): void
  ```
