# الخيارات: الحالة {#options-state}

## data {#data}

هي دالة تعيد الحالة النشطة الأولية لنسخة المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **التفاصيل**

  الدالة من المتوقع أن تعيد كائن JavaScript عادي ، والذي سيُجعل نشطًا بواسطة Vue. بعد إنشاء النسخة ، يمكن الوصول إلى كائن البيانات النشط باسم `this.$data`. كما تقوم نسخة المكون بتمثيل جميع الخاصيات الموجودة في كائن البيانات data ، لذلك `this.a` سيكون مكافئًا لـ `this.$data.a`.

  يجب تضمين جميع خاصيات البيانات الأولية في كائن البيانات المُرجع. إضافة خاصيات جديدة إلى `this.$data` ممكن ، ولكن **لا** يُنصح به. إذا لم يكن القيمة المطلوبة للخاصية متاحة بعد ، فيجب تضمين قيمة فارغة مثل `undefined` أو `null` كعنصر نائب للتأكد من أن Vue يعرف أن الخاصية موجودة.

   الخاصيات التي تبدأ بـ `_` أو `$` لن تُمثل على نسخة المكون لأنها قد تتعارض مع خاصيات Vue الداخلية وتوابع الواجهة البرمجية. سيتعين عليك الوصول إليها كـ `this.$data._property`.

   **لا** يُنصح بإرجاع كائنات تتمتع بسلوك ذو حالة مثل كائنات الواجهة البرمجية للمتصفح وخاصيات النموذج الأساسية (prototype). يجب أن يكون الكائن المُرجع كائنًا عاديًا يمثل فقط حالة المكون.

- **مثال**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    created() {
      console.log(this.a) // 1
      console.log(this.$data) // { a: 1 }
    }
  }
  ```

  تجدر الملاحظة أنه إذا كنت تستخدم دالة سهمية مع خاصية `data` ، فلن يكون `this` هو نسخة المكون ، ولكن يمكنك الوصول إلى النسخة كأول وسيط للدالة:

  ```js
  data: (vm) => ({ a: vm.myProp })
  ```

- **اطلع أيضًا على** [التفاعلية بالتفصيل](/guide/extras/reactivity-in-depth)

## props {#props}

تصرح بخاصيات المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop<T = any> = PropOptions<T> | PropType<T> | null

  interface PropOptions<T> {
    type?: PropType<T>
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown, rawProps: object) => boolean
  }

  type PropType<T> = { new (): T } | { new (): T }[]
  ```

  > الأنواع مبسطة لتسهيل القراءة.

- **التفاصيل**

  في Vue ، يجب التصريح بجميع الخاصيات المكون بوضوح. يمكن التصريح بخاصيات المكون بشكلين:

  - صيغة بسيطة باستخدام مصفوفة من السلاسل النصية
  - صيغة كاملة باستخدام كائن حيث يكون مفتاح كل خاصية هو اسم الخاصية ، والقيمة هي نوع الخاصية (دالة بناء) أو خيارات متقدمة.

  مع الصيغة القائمة على الكائنات ، يمكن لكل خاصية تحديد الخيارات التالية:

  - **`type`**: يمكن أن يكون أحد البناة الأساسيين الموالين: `String` ، `Number` ، `Boolean` ، `Array` ، `Object` ، `Date` ، `Function` ، `Symbol` ، أي دالة بناء مخصصة أو مصفوفة من هؤلاء. في وضع التطوير ، سيتحقق Vue مما إذا كانت قيمة الخاصية تطابق النوع المعلن ، وسيشغل تحذيرًا إذا لم يكن كذلك. انظر [التحقق من الخاصية](/guide/components/props#prop-validation) لمزيد من التفاصيل.

    تجدر الملاحظة أيضا أن الخاصية ذات النوع `Boolean` تؤثر على سلوك تحويل قيمتها في كل من وضع التطوير والإنتاج. انظر [تحويل القيمة المنطقية](/guide/components/props#boolean-casting) لمزيد من التفاصيل.

  - **`default`**: يحدد قيمة افتراضية للخاصية عندما لا تمرر من قبل المكون الأب أو لها قيمة `undefined`. يجب إرجاع القيم الافتراضية للكائن أو المصفوفة باستخدام دالة منتجة. تتلقى الدالة المنتجة أيضًا كائن الخاصيات الخام كوسيط.

  - **`required`**: يحدد ما إذا كانت الخاصية مطلوبة. في بيئة غير إنتاجية ، سيُرسل تحذير على وحدة التحكم إذا كانت هذه القيمة صحيحة ولم  تُمرر الخاصية.

  - **`validator`**: دالة التحقق المخصصة التي تأخذ قيمة الخاصية كوسيط وحيد. في وضع التطوير ، سيُرسل تحذير على وحدة التحكم إذا كانت هذه الدالة تعيد قيمة خاطئة (أي فشل التحقق).

- **مثال**

  تصريح بسيط:

  ```js
  export default {
    props: ['size', 'myMessage']
  }
  ```

  التصريح عن طريق كائن مع التحققات:
 
  ```js
  export default {
    props: {
      // التحقق من النوع
      height: Number,
      // التحقق من النوع بالإضافة إلى التحققات الأخرى
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  ```

- **اطلع أيضًا على**
  - [الخاصيات](/guide/components/props)
  - [إضافة الأنواع إلى الخاصيات](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

## computed {#computed}

التصريح بالخاصيات المحسوبة لعرضها على نسخة المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter<any> | WritableComputedOptions<any>
    }
  }

  type ComputedGetter<T> = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance
  ) => T

  type ComputedSetter<T> = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions<T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<T>
  }
  ```

- **التفاصيل**

  الخيار يقبل كائن حيث يكون المفتاح هو اسم الخاصية المحسوبة ، والقيمة إما دالة محصلة محسوبة، أو كائن يحتوي على توابع `get` و `set` (للخاصيات المحسوبة القابلة للكتابة).

  جميع المحصلات والمعينات لها سياق `this` مرتبط تلقائيًا بنسخة المكون.

  تجدر الملاحظة أنه إذا كنت تستخدم دالة سهمية مع خاصية محسوبة ، فلن يشير `this` إلى نسخة المكون ، ولكن يمكنك الوصول إلى النسخة كأول وسيط للدالة:

  ```js
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  ```

- **lehg**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // قابل للقراءة فقط
      aDouble() {
        return this.a * 2
      },
      // قابل للكتابة
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.aDouble) // => 2
      console.log(this.aPlus) // => 2

      this.aPlus = 3
      console.log(this.a) // => 2
      console.log(this.aDouble) // => 4
    }
  }
  ```

- **اطلع أيضًا على**
  - [الخاصيات المحسوبة](/guide/essentials/computed)
  - [إضافة الأنواع إلى الخاصيات المحسوبة](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

## methods {#methods}

التصريح بالتوابع لتدمج في نسخة المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **التفاصيل**

  يمكن الوصول إلى التوابع المصرح مباشرةً على نسخة المكون، أو استخدامها في تعبيرات القوالب. جميع الوظائف لها سياق `this` مرتبط تلقائيًا بنسخة المكون ، حتى عند تمريرها.

  تجنب استخدام الدوال السهمية عند التصريح بالتوابع ، لأنها لن تتمكن من الوصول إلى نسخة المكون عبر `this`.

- **Example**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    },
    created() {
      this.plus()
      console.log(this.a) // => 2
    }
  }
  ```

- **اطلع أيضًا على** [معالجة الأحداث](/guide/essentials/event-handling)

## watch {#watch}

التصريح بدوال مراقبة لتكون مستدعاة عند تغيير البيانات.

- **النوع**

  ```ts
  interface ComponentOptions {
    watch?: {
      [key: string]: WatchOptionItem | WatchOptionItem[]
    }
  }

  type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type ObjectWatchOptionItem = {
    handler: WatchCallback | string
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > الأنواع مبسطة لتسهيل القراءة.

- **التفاصيل**

  يتوقع الخيار `watch` كائنًا حيث تكون المفاتيح هي خاصيات نسخة المكون النشطة المعدة للمراقبة (على سبيل المثال الخاصيات المعلنة عبر `data` أو `computed`) - والقيم هي الدوال المقابلة. تتلقى دالة رد النداء القيمة الجديدة والقيمة القديمة للمصدر المراقَب.

  بالإضافة إلى خاصية المستخدمة على مستوى الجذر، يمكن أن يكون المفتاح مسارًا بسيطًا مفصولًا بنقاط، على سبيل المثال `a.b.c`. لاحظ أن هذا الاستخدام **لا** يدعم التعبيرات المعقدة - تُدعم مسارات مفصولة بنقطة فقط. إذا كنت بحاجة إلى مراقبة مصادر بيانات معقدة ، فيرجى استخدام الواجهة البرمجية الأمرية [`()watch$`](/api/component-instance#watch) بدلاً من ذلك.

  يمكن أن تكون القيمة أيضًا سلسلة من اسم الدالة (المصرح بها عبر `methods`) ، أو كائن يحتوي على خيارات إضافية. عند استخدام صيغة الكائن ، يجب أن يصرح بدالة رد النداء تحت مفتاح `handler`. تشمل الخيارات الإضافية:

  - **`immediate`**: تشغيل دالة رد النداء على الفور عند إنشاء الدالة المراقبة. ستكون القيمة القديمة `undefined` في الاستدعاء الأول.
  - **`deep`**: فرض المرور العميق للمصدر إذا كان كائنًا أو مصفوفة ، بحيث تنشط دالة رد النداء على التغييرات العميقة. انظر [المراقبون العميقون](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: ضبط وقت تفريغ دالة رد النداء. انظر [توقيت تفريغ دالة رد النداء](/guide/essentials/watchers#callback-flush-timing) و [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: تنقيح اعتماديات الدالة المراقبة. اطلع على [تنقيح الدالة المراقبة](/guide/extras/reactivity-in-depth#watcher-debugging).

  تجنب استخدام الدوال السهمية عند تصريح دوال مراقبة لأنها لن تتمكن من الوصول إلى نسخة المكون عبر `this`.

- **مثال**

  ```js
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // مراقبة خاصية على مستوى الجذر
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // اسم الدالة على شكل سلسلة نصية
      b: 'someMethod',
      // ستستدعى دالة رد النداء كلما تغيرت أي من خاصيات الكائن المراقب بغض النظر عن عمقها المتداخل
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // مراقبة خاصية متداخلة واحدة:
      'c.d': function (val, oldVal) {
        // افعل شيئًا ما
      },
      // ستستدعى دالة رد النداء على الفور بعد بدء المراقبة
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // يمكنك تمرير مصفوفة من دوال رد النداء ، ستستدعى واحدة تلو الأخرى
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    },
    created() {
      this.a = 3 // => new: 3, old: 1
    }
  }
  ```

- **اطلع أيضًا على** [الدوال المراقبة](/guide/essentials/watchers)

## emits {#emits}

التصريح بالأحداث المخصصة التي يرسلها المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **التفاصيل**

  يمكن التصريح بالأحداث المرسلة بصيغتين:

  - صيغة بسيطة باستخدام مصفوفة من السلاسل النصية
  - صيغة كاملة باستخدام كائن حيث يكون مفتاح كل خاصية هو اسم الخاصية ، والقيمة إما `null` أو دالة التحقق.

  ستتلقى دالة التحقق الوسيط الإضافي الذي يمرر إلى استدعاء `emit$` للمكون. على سبيل المثال ، إذا أُستدعي `this.$emit('foo', 1)` ، فسيتلقى مُتحقق `foo` المقابل الوسيط `1`. يجب أن تعيد دالة التحقق قيمة منطقية للإشارة إلى ما إذا كانت وسائط الحدث صالحة.

  تجدر الملاحظة أن خيار `emits` يؤثر على الأحداث التي تعتبر مستمعات لأحداث المكون ، بدلاً من مستمعات الأحداث الأصلية للـDOM. ستُزال مستمعات الأحداث المصرح بها من كائن `attrs$` للمكون ، لذلك لن  تُمرر إلى عنصر جذر المكون. اطلع على [السمات المستترة](/guide/components/attrs) لمزيد من التفاصيل.

- **Example**

  صيغة المصفوفة:

  ```js
  export default {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  }
  ```

  صيغة الكائن:

  ```js
  export default {
    emits: {
      // بدون تحقق  
      click: null,

      // مع التحقق
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  }
  ```

- **اطلع أيضًا على**
  - [السمات المستترة](/guide/components/attrs)
  - [إضافة الأنواع إلى الأحداث المرسلة](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

## expose {#expose}

التصريح بالخاصيات العامة المكشوفة عندما يُوصل إلى نسخة المكون من قبل المكون الأب عبر مراجع القوالب.

- **النوع**

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **التفاصيل**

  بشكل افتراضي ، تكشف نسخة المكون عن جميع خاصيات النسخة للمكون الأب عند الوصول إليها عبر `$parent` ، `$root` ، أو مراجع القوالب. يمكن أن يكون هذا غير مرغوب فيه ، لأن المكون على الأرجح يحتوي على حالة داخلية أو توابع يجب الاحتفاظ بها كخاصية خاصة لتجنب الارتباط الوثيق.

  يتوقع الخيار `expose` قائمة من سلاسل أسماء الخاصيات. عند استخدام `expose` ،ستعرض الخاصيات المدرجة صراحة فقط على النسخة العامة للمكون.

  `expose` يؤثر فقط على الخاصيات المعرفة بواسطة المستخدم - لا يقوم بتصفية خاصيات نسخة المكون المدمجة.

- **مثال**

  ```js
  export default {
    // ستكون `publicMethod` فقط متاحة على النسخة العامة
    expose: ['publicMethod'],
    methods: {
      publicMethod() {
        // ...
      },
      privateMethod() {
        // ...
      }
    }
  }
  ```
