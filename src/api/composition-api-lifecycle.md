# الواجهة التركيبية: خطافات دورة الحياة {#composition-api-lifecycle-hooks}

:::info ملاحظة الاستخدام
يجب استدعاء جميع الواجهات البرمجية الواردة في هذه الصفحة بشكل متزامن خلال مرحلة `()setup` للمكون. انظر إلى [دليل - خطافات دورة الحياة](/guide/essentials/lifecycle) لمزيد من التفاصيل.
:::

## ()onMounted {#onmounted}

تسجل دالة رد نداء لتكون مستدعاة بعد أن يوصل المكون.

- **النوع**

  ```ts
  function onMounted(callback: () => void): void
  ```

- **التفاصيل**

  يعتبر المكون موصولا بعد:

  - كل مكوناته الأبناء المتزامنة قد وُصلت (لا يشمل المكونات الأبناء الغير متزامنة أو المكونات داخل أشجار `<Suspense>`).

  - أنشئت شجرة الـDOM الخاصة به وإدراجها في حاوية الأب. تجدر الملاحظة أنه يضمن فقط أن شجرة DOM للمكون في المستند إذا كانت حاوية جذر التطبيق أيضًا في المستند.

  هذا الخطاف يستخدم عادة لأداء الآثار الجانبية التي تحتاج إلى الوصول إلى DOM المكون المصير، أو لتقييد الكود المتعلق بـDOM للعميل في [تطبيق مصير على الخادم](/guide/scaling-up/ssr).

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

- **مثال**

  الوصول إلى عنصر عن طريق مراجع القالب:

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## ()onUpdated {#onupdated}

تسجل دالة رد نداء لتكون مستدعاة بعد أن يحدث المكون تحديثا لشجرة DOM بسبب تغيير حالة تفاعلية.

- **النوع**

  ```ts
  function onUpdated(callback: () => void): void
  ```

- **التفاصيل**

  يستدعى خطاف التحديث للمكون الأب بعد ذلك من مكوناته الأبناء.

  يستدعى هذا الخطاف بعد أي تحديث DOM للمكون، والذي يمكن أن يسببه تغييرات حالة مختلفة، لأنه يمكن دمج تغييرات حالة متعددة في دورة تصيير واحدة لأسباب أداء. إذا كنت بحاجة إلى الوصول إلى DOM المحدث بعد تغيير حالة محدد، استخدم [nextTick()](/api/general#nexttick) بدلا من ذلك.

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

  :::warning تنبيه
  لا تغير حالة المكون في خطاف التحديث - هذا سيؤدي على الأرجح إلى حلقة تحديث لا نهائية!
  :::

- **مثال**

  الوصول إلى DOM المحدث:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // المحتوى النصي يجب أن يكون نفسه كـ `count.value` الحالي
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## ()onUnmounted {#onunmounted}

تسجل دالة رد نداء لتكون مستدعاة بعد أن يُفصل المكون.

- **النوع**

  ```ts
  function onUnmounted(callback: () => void): void
  ```

- **التفاصيل**

  يعتبر المكون مفصولا بعد:

  - كل مكوناته الأبناء قد فصلت.

  - أوقفت جميع التأثيرات التفاعلية المرتبطة به (تأثير التصيير والخاصيات المحسوبة / الخاصيات المراقبة التي أنشئت أثناء `()setup`).

  استخدم هذا الخطاف لتنظيف الآثار الجانبية التي تم أنشئت يدويًا مثل المؤقتات، مستمعات أحداث DOM أو اتصالات الخادم.

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

- **مثال**

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## ()onBeforeMount {#onbeforemount}

تسجل دالة رد نداء لتكون مستدعاة مباشرة قبل أن يوصل المكون.

- **النوع**

  ```ts
  function onBeforeMount(callback: () => void): void
  ```

- **التفاصيل**

   عندما يستدعى هذا الخطاف، يكون المكون قد انتهى من إعداد حالته التفاعلية، ولكن لم تُنشأ أي عقد DOM بعد. هو على وشك تنفيذ تأثير تصيير DOM لأول مرة.

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

## ()onBeforeUpdate {#onbeforeupdate}

تسجل دالة رد نداء لتكون مستدعاة مباشرة قبل أن يحدث المكون تحديثا لشجرة DOM بسبب تغيير حالة تفاعلية.

- **النوع**

  ```ts
  function onBeforeUpdate(callback: () => void): void
  ```

- **التفاصيل**

  يمكن استخدام هذا الخطاف للوصول إلى حالة DOM قبل أن يحدث Vue تحديثا للـDOM. كما أنه آمن لتعديل حالة المكون داخل هذا الخطاف.

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

## ()onBeforeUnmount {#onbeforeunmount}

تسجل دالة رد نداء لتكون مستدعاة مباشرة قبل أن تُفصل نسخة المكون.

- **النوع**

  ```ts
  function onBeforeUnmount(callback: () => void): void
  ```

- **التفاصيل**

  عندما يستدعى هذا الخطاف، تكون نسخة المكون لا تزال تشتغل بالكامل.

  **هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

## ()onErrorCaptured {#onerrorcaptured}

تسجل دالة رد نداء لتكون مستدعاة عندما يلتقط خطأ مصدره من مكون إبن.

- **النوع**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
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

   يمكنك تعديل حالة المكون في `()errorCaptured` لعرض حالة الخطأ للمستخدم. ومع ذلك، من المهم أن حالة الخطأ لا يجب أن تصيّر المحتوى الأصلي الذي تسبب في الخطأ؛ وإلا سيُلقى المكون في حلقة تصيير لا نهائية.

  يمكن للخطاف أن يرجع `false` لمنع الخطأ من الانتشار أكثر. انظر إلى تفاصيل انتشار الخطأ أدناه.

  **قواعد انتشار الخطأ**

  - بشكل افتراضي، ترسل جميع الأخطاء إلى مستوى جذر التطبيق [`app.config.errorHandler`](/api/application#app-config-errorhandler) إذا عرف، بحيث يمكن الإبلاغ عن هذه الأخطاء لخدمة تحليلية في مكان واحد.

  - إذا كانت هناك عدة خطافات `()errorCaptured` على سلسلة الوراثة أو سلسلة الأب للمكون، سيستدعى كل منها على نفس الخطأ، بالترتيب من الأسفل إلى الأعلى. هذا مشابه لآلية الفقاعة في أحداث DOM الأصلية.

  - إذا ألقى الخطاف `()errorCaptured` نفسه خطأ، يرسل هذا الخطأ والخطأ الملتقط الأصلي إلى `app.config.errorHandler`.

  - يمكن لخطاف `()errorCaptured` أن يرجع `false` لمنع الخطأ من الانتشار أكثر. هذا يعني بشكل أساسي "تم التعامل مع هذا الخطأ ويجب تجاهله." سيمنع أي خطافات `()errorCaptured` إضافية أو `app.config.errorHandler` من الاستدعاء لهذا الخطأ.

## ()onRenderTracked <sup class="vt-badge dev-only" /> {#onrendertracked}

تسجل دالة رد نداء لتكون مستدعاة عندما يتم تتبع اعتمادية تفاعلية بواسطة تأثير تصيير المكون.

**هذا الخطاف للوضع التطويري فقط ولا يستدعى أثناء التصيير من طرف الخادم.**

- **النوع**

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **اطلع أيضا على** [التفاعلية بالتفصيل](/guide/extras/reactivity-in-depth)

## ()onRenderTriggered <sup class="vt-badge dev-only" /> {#onrendertriggered}

تسجل دالة رد نداء لتكون مستدعاة عندما تشغل اعتمادية تفاعلية تأثير تصيير المكون لإعادة التشغيل.

**هذا الخطاف للوضع التطويري فقط ولا يستدعى أثناء التصيير من طرف الخادم.**

- **النوع**

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

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

- **اطلع أيضا على** [التفاعلية بالتفصيل](/guide/extras/reactivity-in-depth)

## ()onActivated {#onactivated}

تسجل دالة رد نداء لتكون مستدعاة بعد أن تُدرج نسخة المكون في DOM كجزء من شجرة مخزنة بواسطة [`<KeepAlive>`](/api/built-in-components#keepalive).

**هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

- **النوع**

  ```ts
  function onActivated(callback: () => void): void
  ```

- **اطلع أيضا على** [دليل - دورة حياة النسخة المخزنة](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## ()onDeactivated {#ondeactivated}

تسجل دالة رد نداء لتكون مستدعاة بعد أن تُزال نسخة المكون من DOM كجزء من شجرة مخزنة بواسطة [`<KeepAlive>`](/api/built-in-components#keepalive).

**هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم.**

- **النوع**

  ```ts
  function onDeactivated(callback: () => void): void
  ```

- **اطلع أيضا على** [دليل - دورة حياة النسخة المخزنة](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## ()onServerPrefetch <sup class="vt-badge" data-text="فقط في وضع تصيير من طرف الخادوم" /> {#onserverprefetch}

تسجل دالة غير متزامنة لتكون محل حل قبل أن تُصيّر نسخة المكون على الخادم.

- **النوع**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **التفاصيل**

  إذا أرجعت الدالة رد نداء من النوع Promise، سينتظر مصيّر الخادم حتى يُحل الوعد قبل تصيير المكون.

  هذا الخطاف لا يستدعى أثناء التصيير من طرف الخادم ويمكن استخدامه لأداء جلب البيانات فقط من الخادم.

- **مثال**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // يصير المكون كجزء من الطلب الأولي
    // جلب البيانات مسبقا على الخادم لأنه أسرع من العميل
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // إذا كانت البيانات مساوية لـ null عند التوصيل، فهذا يعني أن المكون
      // يصيّر بشكل ديناميكي على العميل.
      // قم بجلب البيانات من العميل بدلا من ذلك.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **اطلع أيضا على** [التصيير من طرف الخادم](/guide/scaling-up/ssr)
