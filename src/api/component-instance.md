#  نسخة المكون {#component-instance}

:::info معلومة
هذه الصفحة توثق الخاصيات والدوال المدمجة المكشوفة على النسخة العامة للمكون، أي `this`.

جميع الخاصيات المدرجة على هذه الصفحة لا يمكن تعديلها (باستثناء الخاصيات المتداخلة في `$data`).
:::

## data$ {#data}

الكائن المرجع من خيار [`data`](./options-state#data)، يجعل تفاعليًا من طرف المكون. النسخة العامة للمكون توكل الوصول إلى الخاصيات على كائن البيانات الخاص به.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## props$ {#props}

كائن يمثل الخاصيات الحالية للمكون، بعد حلها.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **التفاصيل**

  فقط الخاصيات المعلنة عبر خيار [`props`](./options-state#props) ستدرج. النسخة العامة للمكون توكل الوصول إلى الخاصيات على كائن الخاصيات الخاص به.

## el$ {#el}

عنصر  الـDOM الجذر الذي تديره النسخة العامة للمكون.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $el: Node | undefined
  }
  ```

- **التفاصيل**

  `$el` سيكون `undefined` حتى  [يوصل](./options-lifecycle#mounted) المكون.

  - بالنسبة للمكونات ذات عنصر جذر واحد، `$el` سيشير إلى هذا العنصر.
  - بالنسبة للمكونات ذات عنصر جذر نصي، `$el` سيشير إلى عنصر النص.
  - بالنسبة للمكونات ذات عناصر جذر متعددة، `$el` سيكون عنصر DOM البديل الذي يستخدمه Vue لتتبع موضع المكون في DOM (عنصر نصي، أو عنصر تعليق في وضع تصيير من طرف الخادوم).

  :::tip ملاحظة
  بغرض التناسق، يوصى باستخدام [مراجع القالب](/guide/essentials/template-refs) للوصول المباشر إلى العناصر بدلاً من الاعتماد على `$el`.
  :::

## options$ {#options}

الخيارات المحلولة للمكون المستخدمة لتثبيت النسخة العامة الحالية للمكون.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **التفاصيل**

  يكشف كائن `options$` الخيارات المحلولة للمكون الحالي وهو نتيجة الدمج لهذه المصادر المحتملة:

  - المخاليط العامة  
  - المكون `extends` الأساسي
  - مخاليط المكون

  عادة ما يستخدم لدعم خيارات المكون المخصصة:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **اطلع أيضًا على** [`app.config.optionMergeStrategies`](/api/application#app-config-optionmergestrategies)

## parent$ {#parent}

النسخة الأم، إذا كانت النسخة العامة الحالية للمكون لديها نسخة أم. سيكون `null` للنسخة الجذر نفسها.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## root$ {#root}

النسخة الجذر لشجرة المكون الحالية. إذا لم يكن للنسخة العامة الحالية للمكون أي أباء ستكون هذه القيمة هي نفسها.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## slots$ {#slots}

كائن يمثل [المنافذ](/guide/components/slots) التي يمررها المكون الأم.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **التفاصيل**

  عادة ما يستخدم عند كتابة [دوال التصيير](/guide/extras/render-function) يدويًا، ولكن يمكن أيضًا استخدامه للكشف عما إذا كان المنفذ موجودا.

  يُعرض كل منفذ على `this.$slots` كدالة ترجع مصفوفة من تحت المفتاح المقابل لاسم المنفذ. يُعرض المنفذ الافتراضي كعقد افتراضية `this.$slots.default`.

  إذا كان المنفذ [منفذ ذو نطاق](/guide/components/slots#scoped-slots)، فإن الوسائط التي تمرره إلى دوال المنفذ متاحة للمنفذ كخاصيات المنفذ.

- **اطلع أيضًا على** [دوال التصيير - تصيير المنافذ](/guide/extras/render-function#rendering-slots)

## refs$ {#refs}

كائن من عناصر DOM ونسخ المكونات، مسجلة عبر [مراجع القالب](/guide/essentials/template-refs).

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **اطلع أيضًا على**

  - [مراجع القالب](/guide/essentials/template-refs)
  - [السمات الخاصة - ref](./built-in-special-attributes.md#ref)

## attrs$ {#attrs}

كائن يحتوي على السمات الخاصة بالمكون.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **التفاصيل**

  [السمات المستترة](/guide/components/attrs) هي السمات ومعالجات الأحداث التي يمررها المكون الأب، ولكن ليست معلنة كخاصية أو حدث مرسل من طرف المكون الإبن.

  بشكل افتراضي، سيورث كل شيء في `attrs$` تلقائيًا على عنصر الجذر للمكون إذا كان هناك عنصر جذر واحد فقط. يُعطل هذا السلوك إذا كان للمكون عناصر جذر متعددة، ويمكن تعطيله صراحة باستخدام خيار [`inheritAttrs`](./options-misc#inheritattrs).
[Fallthrough Attributes](/guide/components/attrs)

- **اطلع أيضًا على**

  - [السمات المستترة](/guide/components/attrs)

## ()watch$ {#watch}

واجهة برمجية أمرية لإنشاء الدوال المراقبة.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **التفاصيل**

  الوسيط الأول هو مصدر المراقبة. يمكن أن يكون سلسلة نصية لاسم خاصية المكون، سلسلة مسار محددة بنقاط، أو دالة محصلة.

  الوسيط الثاني هو دالة رد النداء. تستقبل دالة رد النداء القيمة الجديدة والقيمة القديمة للمصدر المراقَب.

  - **`immediate`**: تشغيل دالة رد النداء على الفور عند إنشاء الدالة المراقبة. ستكون القيمة القديمة `undefined` في الاستدعاء الأول.
  - **`deep`**: فرض المرور العميق للمصدر إذا كان كائنًا أو مصفوفة ، بحيث تنشط دالة رد النداء على التغييرات العميقة. انظر [المراقبون العميقون](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: ضبط وقت تفريغ دالة رد النداء. انظر [توقيت تفريغ دالة رد النداء](/guide/essentials/watchers#callback-flush-timing) و [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: تنقيح اعتماديات الدالة المراقبة. اطلع على [تنقيح الدالة المراقبة](/guide/extras/reactivity-in-depth#watcher-debugging).

- **مثال**

  مراقبة اسم خاصية:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  مراقبة مسار محدد بنقاط:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  استخدام دالة محصلة في التعبيرات المعقدة

  ```js
  this.$watch(
    // في كل مرة يعيد فيها التعبير `this.a + this.b`
    // نتيجة مختلفة، سيتم استدعاء المعالج.
    // كما لو كنا نراقب خاصية محسوبة
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  توقيف الدالة المراقبة:

  ```js
  const unwatch = this.$watch('a', cb)

  // لاحقا...
  unwatch()
  ```

- **اطلع أيضًا على**
  - [خيارات - `watch`](/api/options-state#watch)
  - [دليل - الدوال المراقبة](/guide/essentials/watchers)

## ()emit$ {#emit}

تشغل حدث مخصص على النسخة الحالية للمكون. ستمرر أي وسائط إضافية إلى دالة رد النداء للمستمع.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **مثال**

  ```js
  export default {
    created() {
      // فقط الحدث
      this.$emit('foo')
      // مع وسائط إضافية
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **اطلع أيضًا على**

  - [المكون - الأحداث](/guide/components/events)
  - [خيار `emits`](./options-state#emits)

## ()forceUpdate$ {#forceupdate}

إجبار النسخة الحالية للمكون على إعادة التصيير.

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **التفاصيل**

  يجب أن يكون هذا مطلوبًا نادرًا نظرًا لنظام الاستجابة التلقائي الكامل لـ Vue. الحالات الوحيدة التي قد تحتاجها هي عندما تكون قد أنشأت بشكل صريح حالة غير تفاعلية للمكون باستخدام الواجهات البرمجية التفاعلية المتقدمة .

## ()nextTick$ {#nexttick}

النسخة المرتبطة بالنسخة العامة لـ [`()nextTick`](./general#nexttick).

- **النوع**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **التفاصيل**

  الفرق الوحيد عن النسخة العامة لـ `()nextTick` هو أن دالة رد النداء التي تمررها إلى `()this.$nextTick` سيكون لها سياق `this` مرتبط بالنسخة الحالية للمكون.

- **اطلع أيضًا على** [`()nextTick`](./general#nexttick)
