# الواجهة البرمجية للتفاعلية: دوال مساعدة {#reactivity-api-utilities}

## ()isRef {#isref}

تتحقق إذا كانت القيمة هي كائن مرجعي.

- **النوع**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  لاحظ أن النوع المرجع هو [نوع الدالة](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)، والذي يعني أن `isRef` يمكن استخدامه كحارس نوع:

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // نوع foo يحدد إلى Ref<unknown>
    foo.value
  }
  ```

## ()unref {#unref}

يعيد القيمة الداخلية إذا كان الوسيط هو مرجع، وإلا فإنه يعيد الوسيط نفسه. هذه دالة تجميلية لـ `val = isRef(val) ? val.value : val`.

- **النوع**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **مثال**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // يضمن unwrapped أن يكون رقم الآن
  }
  ```

## ()toRef {#toref}

يمكن استخدامها لتطبيع القيم / المراجع / المسترجعات إلى مراجع تفاعلية (3.3+).

يمكن أيضًا استخدامها لإنشاء مرجع لخاصية على كائن تفاعلي مصدري. يتم مزامنة المرجع المنشأ مع خاصيته المصدرية: تغيير خاصية المصدر سيحدث المرجع، والعكس صحيح.

- **النوع**

  ```ts
  // بصمة التطبيع (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

  // بصمة خاصية الكائن
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **مثال**

  بصمة التطبيع (3.3+):

  ```js
  // تعيد المراجع الموجودة كما هي
  toRef(existingRef)

  // تنشئ مرجعاً قابلا للقراءة فقط يستدعي الدالة المحصلة عند الوصول إلى .value
  toRef(() => props.foo)


  // تنشئ مراجع عادية من القيم غير الدالة
  // ما يعادل ref(1)
  toRef(1)
  ```

  بصمة خاصية الكائن:

  Normalization signature (3.3+):

  ```js
  // returns existing refs as-is
  toRef(existingRef)

  // creates a readonly ref that calls the getter on .value access
  toRef(() => props.foo)

  // creates normal refs from non-function values
  // equivalent to ref(1)
  toRef(1)
  ```

  Object property signature:

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // مرجع ذو اتجاهين يتزامن مع الخاصية الأصلية
  const fooRef = toRef(state, 'foo')

  // تحديث المرجع يحدث الأصل
  fooRef.value++
  console.log(state.foo) // 2

  // تحديث الأصل يحدث المرجع
  state.foo++
  console.log(fooRef.value) // 3
  ```

  تجدر الملاحظة أن هذا مختلف عن:

  ```js
  const fooRef = ref(state.foo)
  ```

  المرجع أعلاه **لا يتزامن** مع `state.foo`، لأن `()ref` يستقبل قيمة رقمية عادية.

  `toRef()` مفيدة عندما تريد تمرير مرجع خاصية إلى دالة تركيبية:

  ```vue
  <script setup>
  import { toRef } from 'vue'

  const props = defineProps(/* ... */)

  // تحول `props.foo` إلى مرجع، ثم تمرره إلى
  // دالة تركيبية
  useSomeFeature(toRef(props, 'foo'))

  // صيغة الدالة المحصلة - موصى بها في 3.3+
  useSomeFeature(toRef(() => props.foo))
  </script>
  ```

  عندما تستخدم `toRef` مع خاصيات المكون، فإن القيود المعتادة حول تغيير الخصائص لا تزال سارية. محاولة تعيين قيمة جديدة للمرجع التفاعلي  يعادل محاولة تعديل الخاصية مباشرة والتي لا يسمح بها. في هذا السيناريو قد ترغب في النظر في استخدام [`computed`](./reactivity-core#computed) مع `get` و `set` بدلاً من ذلك. انظر إلى دليل [استخدام `v-model` مع المكونات](/guide/components/v-model) لمزيد من المعلومات.

  عند استخدام بصمة خاصية الكائن، ستعيد `()toRef` مرجع قابل للاستخدام حتى لو لم تكن الخاصية المصدرية موجودة حاليًا. هذا يجعل من الممكن العمل مع الخاصيات الاختيارية، والتي لن تكون متاحة في [`toRefs`](#torefs).
## ()toValue <sup class="vt-badge" data-text="3.3+" /> {#tovalue}

تقوم بتطبيع القيم / المراجع / الدوال المحصلة إلى قيم. هذا مشابه لـ [unref()](#unref)، باستثناء أنه يقوم أيضًا بتطبيع الدوال المحصلة. إذا كان الوسيط هو دالة محصلة، فسيستدعى وستُرجع قيمته الناتجة.

يمكن استخدامها في [الدوال التركيبية](/guide/reusability/composables.html) لتطبيع وسيط يمكن أن يكون إما قيمة أو مرجع أو دالة محصلة.

- **النوع**

  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```

- **مثال**

  ```js
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1
  ```

  تطبيع الوسائط في الدوال التركيبية:

  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(() => toValue(id), id => {
      // تتفاعل مع تغييرات الوسيط
    })
  }

  // هذه الدالة التركيبية تدعم أي من الآتي:
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```

## ()toRefs {#torefs}

تحويل كائن تفاعلي إلى كائن عادي حيث تشير كل خاصية في الكائن الناتج إلى الخاصية المقابلة في الكائن الأصلي. ينشأ كل مرجع فردي باستخدام [`()toRef`](#toref).

- **النوع**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **مثال**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  Type of stateAsRefs: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // المرجع والخاصية الأصلية مرتبطان
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  `toRefs` مفيدة عند إرجاع كائن تفاعلي من دالة تركيبية بحيث يمكن للمكون المستهلك تفكيك / نشر الكائن المُرجع بدون فقدان التفاعلية:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...شيفرة منطقية يعمل على الحالة

    // تحويل إلى مراجع عند الإرجاع
    return toRefs(state)
  }

  // يمكن تفكيكها بدون فقدان التفاعلية
  const { foo, bar } = useFeatureX()
  ```

  `toRefs` ستنشئ مراجع فقط للخاصيات التي يمكن تعدادها على كائن المصدر عند وقت الاستدعاء. لإنشاء مرجع لخاصية قد لا تكون موجودة بعد، استخدم [`()toRef`](#toref) بدلاً من ذلك.

## ()isProxy {#isproxy}

  تتحقق إذا كان الكائن هو مرجع أُنشئ بواسطة [`()reactive`](./reactivity-core#reactive)،   [`()readonly`](./reactivity-core#readonly)، [`()shallowReactive`](./reactivity-advanced#shallowreactive) أو [`()shallowReadonly`](./reactivity-advanced#shallowreadonly).

- **النوع**

  ```ts
  function isProxy(value: unknown): boolean
  ```

## ()isReactive {#isreactive}

 تتحقق إذا كان الكائن هو مرجع أُنشئ بواسطة [`()reactive`](./reactivity-core#reactive) أو [`()shallowReactive`](./reactivity-advanced#shallowreactive).

- **النوع**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## ()isReadonly {#isreadonly}

تتحقق ما إذا كانت القيمة الممرة هي كائن قابل للقراءة فقط. يمكن تغيير خاصيات كائن قابل للقراءة فقط، ولكن لا يمكن تعيينها مباشرة عبر الكائن الممر.

يعتبر المراجع المنشأة بواسطة [`()readonly`](./reactivity-core#readonly) و [`()shallowReadonly`](./reactivity-advanced#shallowreadonly) كلاهما قابل للقراءة فقط، كما هو المرجع المحسوب[`()computed`](./reactivity-core#computed) بدون دالة `set`.

- **النوع**

  ```ts
  function isReadonly(value: unknown): boolean
  ```
