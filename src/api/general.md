# الواجهة البرمجية العامة : عام {#global-api-general}

## النسخة {#version}

تعرض النسخة الحالية لـ Vue.

- **النوع:** `string`

- **مثال**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## ()nextTick {#nexttick}

أداة مساعدة لانتظار تدفق تحديث DOM التالي.

- **النوع**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **التفاصيل**

  عندما تقوم بتغيير حالة تفاعلية في Vue ، لا تتطبيق تحديثات DOM الناتجة بشكل متزامن. بدلاً من ذلك ، يقوم Vue بتخزينها حتى "النبض التالي" لضمان أن يقوم كل مكون بالتحديث مرة واحدة فقط بغض النظر عن عدد تغييرات الحالة التي قمت بها.

يمكن استخدام `()nextTick` مباشرة بعد تغيير الحالة لانتظار اكتمال تحديثات DOM. يمكنك إما تمرير دالة رد النداء على الاستدعاء كوسيط ، أو انتظر الوعد المُرجع.

- **مثال**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // الـ DOM لم يحدث بعد
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // الـ DOM حدث الآن
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // الـ DOM لم يحدث بعد
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // الـ DOM حدث الآن
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **اطلع أيضا على** [`this.$nextTick()`](/api/component-instance#nexttick)

## ()defineComponent {#definecomponent}

دالة مساعدة لتعريف مكون في Vue مع ميزة استنباط النوع.

- **النوع**

  ```ts
  // صيغة الخيارات
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // صيغة الدالة (تتطلب 3.3+)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > النوع مبسط لتسهيل القراءة.

- **التفاصيل**

  الوسيط الأول يتوقع كائن خيارات المكون. ستكون القيمة المُرجعة هي نفس كائن الخيارات ، لأن الدالة في الأساس لا تفعل شيئًا في وقت التشغيل إنما الغرض منها استنباط النوع فقط.

 لاحظ أن نوع الإرجاع مميز قليلاً: سيكون نوع باني المكون هو نوع النسخة الذي يُستنبط من نوع نسخة المكون الذي يعتمد على الخيارات. يستخدم هذا لاستنباط النوع عندما يستخدم النوع المُرجع كعنصر في TSX.

  يمكنك استخراج نوع النسخة من المكون (المعادل لنوع `this` في خياراته) من نوع الإرجاع لـ `()defineComponent` مثل ما يلي:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### بصمة الدالة <sup class="vt-badge" data-text="3.3+" /> {#function-signature}

  `()defineComponent` لديها أيضًا بصمة بديلة يُقصد استخدامها مع الواجهة التركيبية و [دوال التصيير أو JSX](/guide/extras/render-function.html).

  بدلاً من تمرير كائن خيارات ، يتوقع تمرير دالة بدلاً من ذلك. تعمل هذه الدالة بنفس طريقة دالة الواجهة التركيبية [`()setup`](/api/composition-api-setup.html#composition-api-setup): تستقبل الخاصيات وسياق الإعداد. يجب أن تكون القيمة المُرجعة هي دالة تصيير - كل من `()h` و JSX مدعومان:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // استخدم الواجهة التركيبية هنا مثلما تفعل في <script setup>
      const count = ref(0)

      return () => {
        // دالة التصيير أو JSX
        return h('div', count.value)
      }
    },
    // خيارات إضافية ، على سبيل المثال إعلان الخاصيات والإرسال
    {
      props: {
        /* ... */
      }
    }
  )
  ```

    الحالة الرئيسية لاستخدام هذه البصمة هي مع TypeScript (وبخاصة مع TSX) ، حيث يدعم الوسيط المعمم:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // استخدم الواجهة التركيبية هنا مثلما تفعل في <script setup>
      const count = ref(0)

      return () => {
        // دالة التصيير أو JSX
        return <div>{count.value}</div>
      }
    },
    // التصريح بالخاصيات في وقت التشغيل يتطلب حاليًا تصريحيا يدويًا.
    {
      props: ['msg', 'list']
    }
  )
  ```

    في المستقبل ، نخطط لتوفير إضافة لـ Babel تستنبط وتحقن الخاصيات في وقت التشغيل (مثل `()defineProps` في المكونات أحادية الملف) بحيث يمكن حذف التصريح بالخاصيات في وقت التشغيل.

  ### ملاحظة حول التجزئة الشجرية على webpack {#note-on-webpack-treeshaking}

  بما أن `()defineComponent` هي استدعاء دالة، فقد يبدو أنها ستنتج آثارًا جانبية على بعض أدوات البناء ، على سبيل المثال webpack. سيمنع هذا المكون من الخضوع  للتجزئة الشجرية حتى عندما لا يستخدم المكون أبدًا.

  لإخبار webpack أن استدعاء الدالة هذا آمن للتجزئة الشجرية ، يمكنك إضافة تعليق `/*__PURE__#*/` قبل استدعاء الدالة:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  تجدر الملاحظة أن هذا ليس ضروريًا إذا كنت تستخدم Vite ، لأن Rollup (مجمع الإنتاج الأساسي الذي يستخدمه Vite) ذكي بما يكفي لتحديد أن `()defineComponent` هي في الواقع خالية من الآثار الجانبية دون الحاجة إلى تعليقات يدوية.

- **اطلع أيضا على** [دليل استخدام Vue مع Typescript](/guide/typescript/overview#general-usage-notes)

## ()defineAsyncComponent {#defineasynccomponent}

تعرف مكون غير متزامن يحمل بشكل خامل فقط عندما يصير. يمكن أن يكون الوسيط إما دالة تحميل أو كائن خيارات لمزيد من التحكم المتقدم في سلوك التحميل.

- **النوع**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **اطلع أيضا على** [دليل المكونات الغير متزامنة](/guide/components/async)

## ()defineCustomElement {#definecustomelement}

تقبل هذه الدالة نفس الوسيط الذي تقبله [`()defineComponent`](#definecomponent) ، ولكنها بدلاً من ذلك ترجع باني فئة [عنصر مخصص](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) أصلي.

- **Type**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  ```

  > النوع مبسط لتسهيل القراءة.

- **التفاصيل**

   بالإضافة إلى خيارات المكون العادية ، تدعم `()defineCustomElement` أيضًا خيارًا خاصًا `styles` ، والذي يجب أن يكون مصفوفة من سلاسل نصية CSS السطري ، لتوفير CSS الذي سيحقن في جذر الظل الخاص بالعنصر.

  القيمة المُرجعة هي باني عنصر مخصص يمكن تسجيله باستخدام [`()customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).

- **مثال**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* خيارات المكون */
  })

  // سجل العنصر المخصص.
  customElements.define('my-vue-element', MyVueElement)
  ```

- **اطلع أيضا على**

  - [دليل بناء عناصر مخصصة مع Vue](/guide/extras/web-components#building-custom-elements-with-vue)

  -  لاحظ أيضا أن `()defineCustomElement` يتطلب [تهيئة خاصة](/guide/extras/web-components#sfc-as-custom-element) عند استخدامه مع مكونات أحادية الملف.
