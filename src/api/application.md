#  الواجهة البرمجية لانشاء تطبيق {#application-api}

## ()createApp {#createapp}

تنشئ نسخة من التطبيق

- **النوع**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **التفاصيل**

  الوسيط الأول هو المكون الجذر. الوسيط الثاني اختياري وهو الخصائص التي ستمرر إلى المكون الجذر.

- **مثال**

  مع مكون جذري سطري

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* خيارات المكون الجذري */
  })
  ```

  مع مكون مستورد

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **اطلع أيضا على** [دليل - إنشاء تطبيق في Vue](/guide/essentials/application)

## ()createSSRApp {#createssrapp}

تنشئ نسخة من التطبيق في [وضع الإنعاش من جانب الخادوم](/guide/scaling-up/ssr#client-hydration). الاستخدام هو بالضبط نفس استخدام `()createApp`.

## ()app.mount {#app-mount}

توصل  نسخة التطبيق في عنصر مُستوعِب

- **النوع**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **التفاصيل**

  الوسيط يمكن أن يكون عنصر DOM أو محدد CSS (سيستخدم أول عنصر مطابق). ترجع نسخة المكون الجذري.

  إذا كان للمكون قالب أو دالة تصيير محددة ، فسيحل محل أي عناصر DOM موجودة داخل العنصر المستوعب. وإلا ، إذا كان مصرف وقت التشغيل متاحًا ، فسيستخدم `innerHTML` للعنصر المستوعب كقالب.

    في وضع الإنعاش من جانب الخادوم ، سيقوم بانعاش عناصر DOM الموجودة داخل العنصر المستوعب. إذا كانت هناك [عدم تطابقات](/guide/scaling-up/ssr#hydration-mismatch) ، فستُحول عناصر DOM الموجودة لتتطابق مع الإخراج المتوقع.

  لكل نسخة من التطبيق ، يمكن استدعاء `()mount` مرة واحدة فقط.

- **مثال**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  يمكن أيضًا توصيله بعنصر DOM فعلي:

  ```js
  app.mount(document.body.firstChild)
  ```

## ()app.unmount {#app-unmount}

تفصل نسخة التطبيق الموصولة ، مما يؤدي إلى تشغيل خطاف `unmount` لفصل جميع المكونات في شجرة مكونات التطبيق.

- **النوع**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## ()app.component {#app-component}

تسجيل مكون عام إذا مرر اسم وتعريف مكون كسلسلة نصية، أو استرداد مكون مسجل بالفعل إذا مرر الاسم فقط.

- **النوع**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **مثال**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // تسجيل مكون (مكون كائن)
  app.component('my-component', {
    /* ... */
  })

  // استرداد مكون مسجل
  const MyComponent = app.component('my-component')
  ```

- **اطلع أيضا على** [تسجيل المكونات](/guide/components/registration)

## ()app.directive {#app-directive}

تسجيل سمة موجهة مخصصة عامة إذا مرر اسم وتعريف الموجهة، أو استرداد موجهة مسجلة بالفعل إذا مرر الاسم فقط.

- **النوع**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **مثال**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // تسجيل موجهة (موجهة كائن)
  app.directive('my-directive', {
    /* custom directive hooks */
  })

  // تسجيل موجهة (اختصار موجهة دالة)
  app.directive('my-directive', () => {
    /* ... */
  })

  // استرداد موجهة مسجلة
  const myDirective = app.directive('my-directive')
  ```

- **اطلع أيضا على** [الموجهات المخصصة](/guide/reusability/custom-directives)

## ()app.use {#app-use}

تثبيت [ملحق](/guide/reusability/plugins).

- **النوع**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **التفاصيل**

  تتوقع الملحق كوسيط أول ، وخيارات الملحق الاختيارية كوسيط ثاني.

  يمكن أن يكون الملحق كائنًا يحتوي على الدالة التابعة `()install` ، أو مجرد دالة ستستخدم كدالة `()install`. ستمرر الخيارات (الوسيط الثاني لـ `()app.use`) إلى دالة `()install` للملحق.

   عندما تستدعى `()app.use` على نفس الملحق عدة مرات ، سيثبت الملحق مرة واحدة فقط.

- **مثال**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **اطلع أيضا على** [الملحقات](/guide/reusability/plugins)

## ()app.mixin {#app-mixin}

تطبيق مخلوط عام (محدد للتطبيق). يطبق مخلوط عام خياراته المضمنة على كل نسخة من المكون في التطبيق.

:::warning غير موصى به
 المخلوطات في Vue 3 مدعومة بشكل رئيسي للتوافق مع الإصدارات السابقة ، نظرًا لاستخدامها الواسع في مكتبات النظام البيئي. يجب تجنب استخدام المخلوطات ، وخاصة المخلوطات العامة ، في شيفرة التطبيق.

من أجل إعادة استخدام الشيفرة ، نفضل [الدوال التركيبية](/guide/reusability/composables) بدلاً من ذلك.
:::

- **النوع**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## ()app.provide {#app-provide}

توفر قيمة يمكن حقنها في جميع المكونات الأبناء داخل التطبيق.

- **النوع**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **التفاصيل**

  تتوقع مفتاح الحقن كوسيط أول ، والقيمة المقدمة كوسيط ثاني. ترجع نسخة التطبيق نفسها.

- **مثال**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'مرحبا')
  ```

  داخل مكون في التطبيق:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'مرحبا'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'مرحبا'
    }
  }
  ```

  </div>

- **اطلع أيضا على**
  - [حقن/تزويد](/guide/components/provide-inject)
  - [حقن على مستوى التطبيق](/guide/components/provide-inject#app-level-provide)
  - [()app.runWithContext](#app-runwithcontext)

## app.runWithContext()<sup class="vt-badge" data-text="3.3+" /> {#app-runwithcontext}

تنفذ استدعاء لدالة رد نداء مع التطبيق الحالي كسياق حقن.

- **النوع**

  ```ts
  interface App {
    runWithContext<T>(fn: () => T): T
  }
  ```

- **التفاصيل**

  تتوقع دالة رد نداء وتستدعيها على الفور. خلال استدعاء دالة رد نداء المتزامنة ، يمكن لـ `()inject` البحث عن الحقنات من القيم المقدمة من التطبيق الحالي ، حتى عندما لا يكون هناك نسخة من المكون النشط حاليًا. سترجع قيمة الإرجاع أيضًا.

- **مثال**

  ```js
  import { inject } from 'vue'

  app.provide('id', 1)

  const injected = app.runWithContext(() => {
    return inject('id')
  })

  console.log(injected) // 1
  ```

## app.version {#app-version}

توفر إصدار Vue الذي أنشئ التطبيق به. هذا مفيد داخل [الملحقات](/guide/reusability/plugins) ، حيث قد تحتاج إلى شرط يعتمد على إصدارات Vue المختلفة.

- **النوع**

  ```ts
  interface App {
    version: string
  }
  ```

- **مثال**

  إجراء فحص إصدار داخل ملحق:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
         console.warn('هذا الملحق يتطلب Vue 3')
      }
    }
  }
  ```

- **اطلع أيضا على** [الواجهة البرمجية العامة - الإصدار](/api/general#version)

## app.config {#app-config}

كل نسخة من التطبيق تعرض كائن `config` يحتوي على إعدادات التكوين لهذا التطبيق. يمكنك تعديل خصائصه (الموثقة أدناه) قبل وصل التطبيق.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

تعيين معالج عام للأخطاء غير الملتقطة التي تنتشر من داخل التطبيق.

- **النوع**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` هو معلومات خطأ محددة لـ Vue ،
      // على سبيل المثال ، أي دالة التقط الخطأ فيها
      info: string
    ) => void
  }
  ```

- **التفاصيل**

  يتلقى معالج الأخطاء ثلاثة وسائط: الخطأ ، ونسخة المكون التي أثارت الخطأ ، وسلسلة معلومات تحدد نوع مصدر الخطأ.

  يمكنه التقاط الأخطاء من المصادر التالية:

  - تصييرات المكون
  - معالجات الأحداث
  - خطافات دورة الحياة
  - دالة `()setup`
  - الدوال المراقبة
  - خطافات الموجهات المخصصة
  - خطافات الانتقال

- **مثال**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // معالجة الخطأ ، على سبيل المثال ، الإبلاغ عنه إلى خدمة
  }
  ```

## app.config.warnHandler {#app-config-warnhandler}

تعيين معالج مخصص للتحذيرات في وقت التشغيل من Vue.

- **النوع**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **التفاصيل**

  يتلقى معالج التحذير رسالة التحذير كوسيط أول ، ونسخة المكون المصدر كوسيط ثاني ، وسلسلة تتبع المكون كوسيط ثالث.

  يمكن استخدامه لتصفية التحذيرات المحددة لتقليل ما يعرض في وحدة التحكم. يجب معالجة جميع تحذيرات Vue أثناء التطوير ، لذلك لا يُوصى بهذا إلا خلال جلسات التنقيح للتركيز على التحذيرات المحددة بين العديد منها ، ويجب إزالته بمجرد الانتهاء من التنقيح.

  :::tip
  التحذيرات تعمل فقط أثناء التطوير ، لذلك يتم تجاهل هذا التكوين في وضع الإنتاج.
  :::

- **مثال**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` هو تتبع تسلسل المكون 
  }
  ```

## app.config.performance {#app-config-performance}

قم بتعيين هذا على `true` لتمكين تتبع أداء تهيئة المكون ، والترجمة ، والتصيير ، والتصحيح في لوحة أدوات التطوير الأداء/الجدول الزمني للمتصفح. يعمل فقط في وضع التطوير وفي المتصفحات التي تدعم [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API.

- **النوع:** `boolean`

- **اطلع أيضا على** [دليل - الأداء](/guide/best-practices/performance)

## app.config.compilerOptions {#app-config-compileroptions}

قم بتهيئة خيارات مصرف وقت التشغيل. ستُمرَّر القيم المضبوطة على هذا الكائن إلى مصرف القوالب في المتصفح وتؤثر على كل مكون في التطبيق المهيأ. لاحظ أنه يمكنك أيضًا تجاوز هذه الخيارات على أساس المكون باستخدام الخيار [`compilerOptions`](/api/options-rendering#compileroptions).

::: warning مهم
  هذا الخيار التهيئي معمول به فقط عند استخدام عملية البناء الكامل (أي `vue.js` المستقل الذي يمكنه تصريف القوالب في المتصفح). إذا كنت تستخدم عملية بناء فقط في وقت التشغيل مع إعداد بناء ، يجب تمرير خيارات المصرف إلى `vue/compiler-dom@` عبر تهيئات أدوات البناء بدلاً من ذلك.

- لـ `vue-loader`: [تمرير عبر خيار المحمل `compilerOptions`](https://vue-loader.vuejs.org/options.html#compileroptions). انظر أيضًا [كيفية تكوينه في `vue-cli`](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

- لـ `vite`: [تمرير عبر خيارات `@vitejs/plugin-vue`](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options).
:::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

يحدد طريقة فحص للتعرف على العناصر المخصصة الأصلية.

- **النوع:** `(tag: string) => boolean`

- **التفاصيل**

  يجب أن ترجع `true` إذا كان يجب معاملة الوسم كعنصر مخصص أصلي. بالنسبة للوسم المطابق، ستقوم Vue بتصييرها كعنصر أصلي بدلاً من محاولة حلها كمكون Vue.

  لا تحتاج الوسوم الأصلية لـ HTML و SVG إلى أن تتطابق في هذه الدالة - يتعرف محلل Vue عليها تلقائيًا.

- **مثال**

  ```js
  // عامل جميع الوسوم التي تبدأ بـ 'ion-' كعناصر مخصصة
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **اطلع أيضا على** [Vue وعناصر الويب](/guide/extras/web-components)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

يعدل سلوك معالجة الفراغات في القوالب.

- **النوع:** `'condense' | 'preserve'`

- **النوع الافتراضي:** `'condense'`

- **التفاصيل**

  Vue تزيل  / تضغط الفراغات في القوالب لإنتاج إخراج مصرف أكثر كفاءة. الاستراتيجية الافتراضية هي "الضغط" ، مع السلوك التالي

  1. تضغط الفراغات الأولية / النهائية داخل عنصر إلى فراغ واحد.
  2. تزيل الفراغات بين العناصر التي تحتوي على أسطر جديدة.
  3. تضغط الفراغات المتتالية في عنصر نصي إلى فراغ واحد.

  سيؤدي تعيين هذا الخيار على `'preserve'` إلى تعطيل (2) و (3).

- **مثال**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

يعدل الفواصل المستخدمة لاقحام النص داخل القالب.

- **النوع:** `[string, string]`

- **النوع الافتراضي:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **التفاصيل**

  يستخدم هذا عادة لتجنب التعارض مع إطارات جانب الخادم التي تستخدم أيضًا صيغة الأقواس المزدوجة المعقوفة.

- **مثال**

  ```js
  // غيرت الفواصل إلى نمط سلسلة قوالب ES6
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

يعدل معاملة التعليقات HTML في القوالب.

- **النوع:** `boolean`

- **النوع الافتراضي:** `false`

- **التفاصيل**

  بشكل افتراضي ، سيقوم Vue بإزالة التعليقات في الإنتاج. سيؤدي تعيين هذا الخيار على `true` إلى إجبار Vue على الاحتفاظ بالتعليقات حتى في الإنتاج. يُحتفظ دائمًا بالتعليقات أثناء التطوير. يستخدم هذا الخيار عادةً عند استخدام Vue مع مكتبات أخرى تعتمد على تعليقات HTML.

- **مثال**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

كائن يمكن استخدامه لتسجيل الخاصيات العامة التي يمكن الوصول إليها على أي نسخة من المكون داخل التطبيق.

- **النوع**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **التفاصيل**

  هذا هو بديل `()Vue.prototype` في Vue 2 والذي لم يعد موجودًا في Vue 3. كما هو الحال مع أي شيء عام ، يجب استخدام هذا بحذر.

  إذا تعارضت خاصية عامة مع خاصية المكون الخاصة ، فسيكون لخاصية المكون الخاصة أولوية أعلى.

- **الاستخدام**

  ```js
  app.config.globalProperties.msg = 'مرحبا'
  ```

  يجعل هذا `msg` متاحًا داخل أي قالب مكون في التطبيق ، وأيضًا على `this` من أي نسخة من المكون:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'مرحبا'
    }
  }
  ```

- **اطلع أيضا على** [الدليل - تعزيز الخاصيات العامة](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

كائن لتحديد استراتيجيات الدمج لخيارات المكون المخصصة.

- **النوع**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **التفاصيل**

  تضيف بعض الملحقات / المكتبات دعمًا لخيارات المكون المخصصة (عن طريق حقن المخلوطات العامة). قد تتطلب هذه الخيارات منطق دمج خاص عندما يحتاج نفس الخيار إلى أن "يدمج" من مصادر متعددة (على سبيل المثال ، المخلوطات أو توريث المكون).

  يمكن تسجيل دالة استراتيجية دمج لخيار مخصص عن طريق تعيينه على كائن `app.config.optionMergeStrategies` باستخدام اسم الخيار كمفتاح.

  تتلقى دالة استراتيجية الدمج قيمة هذا الخيار المحدد على النسخة الأم والنسخة البنت كوسيطين أول وثاني على التوالي.

- **مثال**

  ```js
  const app = createApp({
    // خيار من ذات المكون
    msg: 'Vue',
    // خيار من مخلوط
    mixins: [
      {
        msg: 'مرحبا '
      }
    ],
    mounted() {
      // الخيارات المدمجة المعروضة على `()this.$options`
      console.log(this.$options.msg)
    }
  })

  // تعريف استراتيجية دمج مخصصة لـ `msg`
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // يعرض 'مرحبا Vue'
  ```

- **اطلع أيضا على** [نسخة المكون - `$options`](/api/component-instance#options)
