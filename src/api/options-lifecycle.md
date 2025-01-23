# الخيارات: دورة الحياة {#options-lifecycle}

:::info اطلع أيضا على
من أجل استخدام مشترك لخطافات دورة الحياة، انظر إلى [دليل - خطافات دورة الحياة](/guide/essentials/lifecycle)
:::

## beforeCreate {#beforecreate}

يستدعى عندما تُهيأ نسخة المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **التفاصيل**

  Called immediately when the instance is initialized and props are resolved.

  Then the props will be defined as reactive properties and the state such as `data()` or `computed` will be set up.

  لاحظ أن خطاف `()setup` من الواجهة التركيبية يستدعى قبل أي خطافات واجهة الخيارات، حتى `beforeCreate()`.

## created {#created}

يستدعى بعد أن تنتهي النسخة من معالجة جميع خيارات الحالة ذات الصلة.

- **النوع**

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **التفاصيل**

  عندما يستدعى هذا الخطاف، يُهيأ ما يلي: البيانات التفاعلية، الخاصيات المحسوبة، التوابع، والدوال المراقبة. ومع ذلك، لم تبدأ مرحلة الوصل، ولن تكون خاصية `$el` متاحة بعد.

## beforeMount {#beforemount}

يستدعى مباشرة قبل أن يوصل المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **التفاصيل**

  عندما يستدعى هذا الخطاف، ينتهي المكون من إعداد حالته التفاعلية، ولكن لم ينشأ أي عقد DOM بعد. هو على وشك تنفيذ تأثير تصيير DOM لأول مرة.

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

## mounted {#mounted}

يستدعى بعد أن يوصل المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **التفاصيل**

  يعتبر المكون موصولا بعد:

  - كل مكوناته الأبناء المتزامنة قد وُصلت (لا يشمل المكونات الأبناء الغير متزامنة أو المكونات داخل أشجار `<Suspense>`).

  - أنشئت شجرة الـDOM الخاصة به وإدراجها في حاوية الأب. تجدر الملاحظة أنه يضمن فقط أن شجرة DOM للمكون في المستند إذا كانت حاوية جذر التطبيق أيضًا في المستند.

  هذا الخطاف يستخدم عادة لأداء الآثار الجانبية التي تحتاج إلى الوصول إلى DOM المكون المصير، أو لتقييد الكود المتعلق بـDOM للعميل في [تطبيق مصير على الخادم](/guide/scaling-up/ssr).

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

## beforeUpdate {#beforeupdate}

يستدعى مباشرة قبل أن يقوم المكون بتحديث شجرة DOM بسبب تغيير حالة تفاعلية.

- **النوع**

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **التفاصيل**

  يمكن استخدام هذا الخطاف للوصول إلى حالة DOM قبل أن يقوم Vue بتحديث DOM. كما أنه آمن لتعديل حالة المكون داخل هذا الخطاف.

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

## updated {#updated}

تسجل دالة رد نداء لتكون مستدعاة بعد أن يحدث المكون تحديثا لشجرة DOM بسبب تغيير حالة تفاعلية.

- **النوع**

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **التفاصيل**

  يستدعى خطاف التحديث للمكون الأب بعد ذلك من مكوناته الأبناء.

  يستدعى هذا الخطاف بعد أي تحديث DOM للمكون، والذي يمكن أن يسببه تغييرات حالة مختلفة، لأنه يمكن دمج تغييرات حالة متعددة في دورة تصيير واحدة لأسباب أداء. إذا كنت بحاجة إلى الوصول إلى DOM المحدث بعد تغيير حالة محدد، استخدم [nextTick()](/api/general#nexttick) بدلا من ذلك..

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

  :::warning تنبيه
  لا تغير حالة المكون في خطاف التحديث - هذا سيؤدي على الأرجح إلى حلقة تحديث لا نهائية!
  :::

## beforeUnmount {#beforeunmount}

يستدعى مباشرة قبل أن تفصل نسخة المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **التفاصيل**

  عندما يستدعى هذا الخطاف، النسخة المكون لا تزال مفعلة بالكامل.  

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

## unmounted {#unmounted}

يستدعى بعد أن تفصل نسخة المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **التفاصيل**

  يعتبر المكون مفصولا بعد:

  - كل مكوناته الأبناء قد فصلت.

  - أوقفت جميع التأثيرات التفاعلية المرتبطة به (تأثير التصيير والخاصيات المحسوبة / الخاصيات المراقبة التي أنشئت أثناء `()setup`).

  استخدم هذا الخطاف لتنظيف الآثار الجانبية التي تم أنشئت يدويًا مثل المؤقتات، مستمعات أحداث DOM أو اتصالات الخادم.

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

## errorCaptured {#errorcaptured}

يستدعى عندما يُلتقط خطأ ينتقل من مكون إبن.

- **النوع**

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
  ```

- **التفاصيل**

  يمكن أن تُلتقط الأخطاء من المصادر التالية:

  - تصيير المكون
  - معالجات الأحداث
  - خطافات دورة الحياة
  - دالة `()setup`
  - الدوال المراقبة
  - خطافات السمات الموجهة المخصصة
  - خطافات الانتقال

  يستقبل الخطاف ثلاثة وسيطات: الخطأ، نسخة المكون التي أحدثت الخطأ، وسلسلة معلومات تحدد نوع مصدر الخطأ.

  :::tip
  In production, the 3rd argument (`info`) will be a shortened code instead of the full information string. You can find the code to string mapping in the [Production Error Code Reference](/error-reference/#runtime-errors).
  :::
  
   يمكنك تعديل حالة المكون في `()errorCaptured` لعرض حالة الخطأ للمستخدم. ومع ذلك، من المهم أن حالة الخطأ لا يجب أن تصيّر المحتوى الأصلي الذي تسبب في الخطأ؛ وإلا سيُلقى المكون في حلقة تصيير لا نهائية.

  يمكن للخطاف أن يرجع `false` لمنع الخطأ من الانتشار أكثر. انظر إلى تفاصيل انتشار الخطأ أدناه.

  **قواعد انتشار الخطأ**

  - بشكل افتراضي، ترسل جميع الأخطاء إلى مستوى جذر التطبيق [`app.config.errorHandler`](/api/application#app-config-errorhandler) إذا عرف، بحيث يمكن الإبلاغ عن هذه الأخطاء لخدمة تحليلية في مكان واحد.

  - إذا كانت هناك عدة خطافات `errorCaptured` على سلسلة الوراثة أو سلسلة الأب للمكون، سيستدعى كل منها على نفس الخطأ، بالترتيب من الأسفل إلى الأعلى. هذا مشابه لآلية الفقاعة في أحداث DOM الأصلية.

  - إذا ألقى الخطاف `()errorCaptured` نفسه خطأ، يرسل هذا الخطأ والخطأ الملتقط الأصلي إلى `app.config.errorHandler`.

  - يمكن لخطاف `()errorCaptured` أن يرجع `false` لمنع الخطأ من الانتشار أكثر. هذا يعني بشكل أساسي "تم التعامل مع هذا الخطأ ويجب تجاهله." سيمنع أي خطافات `()errorCaptured` إضافية أو `app.config.errorHandler` من الاستدعاء لهذا الخطأ.

  **Error Capturing Caveats**
  
  - In components with async `setup()` function (with top-level `await`) Vue **will always** try to render component template, even if `setup()` throwed error. This will likely cause more errors because during render component's template might try to access non-existing properties of failed `setup()` context. When capturing errors in such components, be ready to handle errors from both failed async `setup()` (they will always come first) and failed render process.

  - <sup class="vt-badge" data-text="SSR only"></sup> Replacing errored child component in parent component deep inside `<Suspense>` will cause hydration mismatches in SSR. Instead, try to separate logic that can possibly throw from child `setup()` into separate function and execute it in the parent component's `setup()`, where you can safely `try/catch` the execution process and make replacement if needed before rendering the actual child component.

  **Error Capturing Caveats**
  
  - In components with async `setup()` function (with top-level `await`) Vue **will always** try to render component template, even if `setup()` throwed error. This will likely cause more errors because during render component's template might try to access non-existing properties of failed `setup()` context. When capturing errors in such components, be ready to handle errors from both failed async `setup()` (they will always come first) and failed render process.

  - <sup class="vt-badge" data-text="SSR only"></sup> Replacing errored child component in parent component deep inside `<Suspense>` will cause hydration mismatches in SSR. Instead, try to separate logic that can possibly throw from child `setup()` into separate function and execute it in the parent component's `setup()`, where you can safely `try/catch` the execution process and make replacement if needed before rendering the actual child component.

## renderTracked <sup class="vt-badge dev-only" /> {#rendertracked}

يستدعى عندما يتم تتبع اعتمادية تفاعلية بواسطة تأثير تصيير المكون.

**هذا الخطاف للوضع التطويري فقط ولا يستدعى أثناء التصيير من طرف الخادم.**

- **النوع**

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **اطلع أيضًا على** [التفاعلية بالتفصيل](/guide/extras/reactivity-in-depth)

## renderTriggered <sup class="vt-badge dev-only" /> {#rendertriggered}

يستدعى عندما يشغل اعتمادية تفاعلية تأثير تصيير المكون لإعادة التشغيل.

**هذا الخطاف للوضع التطويري فقط ولا يستدعى أثناء التصيير من طرف الخادم.**

- **النوع**

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **اطلع أيضًا على** [التفاعلية بالتفصيل](/guide/extras/reactivity-in-depth)

## activated {#activated}

يستدعى بعد أن تُدرج نسخة المكون في DOM كجزء من شجرة مخزنة بواسطة [`<KeepAlive>`](/api/built-in-components#keepalive).

**هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

- **النوع**

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **اطلع أيضًا على** [دليل - دورة حياة النسخة المخزنة](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## deactivated {#deactivated}

يستدعى بعد أن تُزال نسخة المكون من DOM كجزء من شجرة مخزنة بواسطة [`<KeepAlive>`](/api/built-in-components#keepalive).

**هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

- **النوع**

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **اطلع أيضًا على** [دليل - دورة حياة النسخة المخزنة](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## serverPrefetch <sup class="vt-badge" data-text="فقط في وضع تصيير من طرف الخادوم" /> {#serverprefetch}

دالة غير متزامنة لتكون تحل قبل أن تُصيّر نسخة المكون على الخادم.

- **النوع**

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **التفاصيل**

  إذا أرجعت الدالة رد نداء من النوع Promise، سينتظر مصيّر الخادم حتى يُحل الوعد قبل تصيير المكون.

  هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم ويمكن استخدامه لأداء جلب البيانات فقط من الخادم.

- **مثال**

  ```js
  export default {
    data() {
      return {
        data: null
      }
    },
    async serverPrefetch() {
      // يصير المكون كجزء من الطلب الأولي
      // جلب البيانات مسبقا على الخادم لأنه أسرع من العميل
      this.data = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.data) {
      // إذا كانت البيانات مساوية لـ null عند التوصيل، فهذا يعني أن المكون
      // يصيّر بشكل ديناميكي على العميل.
      // قم بجلب البيانات من العميل بدلا من ذلك.
        this.data = await fetchOnClient(/* ... */)
      }
    }
  }
  ```

- **اطلع أيضا على** [التصيير من طرف الخادم](/guide/scaling-up/ssr)
