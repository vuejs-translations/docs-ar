# Vue ومكونات الويب {#vue-and-web-components}

[مكونات الويب](https://developer.mozilla.org/en-US/docs/Web/Web_Components) هي مصطلح عام لمجموعة من الواجهات البرمجية الأصلية للويب  التي تسمح للمطورين بإنشاء عناصر مخصصة قابلة لإعادة الاستخدام.

نعتبر Vue ومكونات الويب تقنيات مكملة لبعضها بشكل أساسي. تتمتع Vue بدعم ممتاز لكل من استهلاك وإنشاء عناصر مخصصة. سواء كنت تدمج عناصر مخصصة في تطبيق Vue موجود، أو تستخدم Vue لإنشاء وتوزيع عناصر مخصصة، فأنت في المكان الصحيح.

## استخدام عناصر مخصصة في Vue {#using-custom-elements-in-vue}

يحصل Vue على 100% في  [اختبارات العناصر المخصصة في كل مكان](https://custom-elements-everywhere.com/libraries/vue/results/results.html). يعمل استهلاك عناصر مخصصة داخل تطبيق Vue بشكل كبير على نفس طريقة استخدام عناصر HTML الأصلية، مع بعض الأشياء التي يجب مراعاتها:

### تخطي تحليل المكون {#skipping-component-resolution}

بشكل افتراضي، سيحاول Vue حل علامة HTML غير أصلية كمكون Vue مسجل قبل العود إلى تصييرها كعنصر مخصص. سيتسبب هذا في إصدار Vue لتحذير "فشل في حل المكون" أثناء التطوير. لإعلام Vue بأن بعض العناصر يجب معاملتها على أنها عناصر مخصصة وتخطي تحليل المكون، يمكننا تحديد [خيار `compilerOptions.isCustomElement` ](/api/application#app-config-compileroptions).

إذا كنت تستخدم Vue مع إعداد بناء، يجب تمرير الخيار عبر تكوينات البناء لأنه خيار في وقت التصريف.

#### مثال للتهيئة داخل المتصفح {#example-in-browser-config}

```js
// يعمل فقط إذا استخدم التصريف داخل المتصفح.
// إذا استخدمت أدوات البناء، انظر إلى أمثلة التهيئة أدناه.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
```

#### مثال للتهيئة عن طريق Vite {#example-vite-config}

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // تعامل مع جميع العلامات التي تحتوي على شرطة كعناصر مخصصة
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```

#### مثال للتهيئة مع Vue CLI {#example-vue-cli-config}

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // تعامل مع جميع العلامات التي تحتوي على شرطة كعناصر مخصصة
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }))
  }
}
```

### Passing DOM Properties {#passing-dom-properties}

بما أن سمات DOM يمكن أن تكون سلسلة نصية فقط، فإننا بحاجة إلى تمرير البيانات المعقدة إلى العناصر المخصصة كخاصيات DOM. عند تعيين الخاصيات على عنصر مخصص، يقوم Vue 3 تلقائيًا بفحص وجود خاصية DOM باستخدام المعامل `in` وسيفضل تعيين القيمة كخاصية DOM إذا كان المفتاح موجودًا. هذا يعني أنه في معظم الحالات، لن تحتاج إلى التفكير في هذا إذا كان العنصر المخصص يتبع [أفضل الممارسات الموصى بها](https://web.dev/custom-elements-best-practices/).

ومع ذلك، قد تكون هناك حالات نادرة حيث يجب تمرير البيانات كخاصية DOM، ولكن العنصر المخصص لا يحدد/يعكس الخاصية بشكل صحيح (مما يتسبب في فشل فحص `in`). في هذه الحالة، يمكنك إجبار ربط `v-bind` ليعين كخاصية DOM باستخدام المعدل `prop.`:

```vue-html
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- الاختصار الموافق -->
<my-element .user="{ name: 'jack' }"></my-element>
```

## بناء عناصر مخصصة باستخدام Vue{#building-custom-elements-with-vue}

فائدة العناصر المخصصة الأساسية هي أنه يمكن استخدامها مع أي إطار عمل، أو حتى بدون إطار عمل. وهذا يجعلها مثالية لتوزيع المكونات حيث قد لا يكون المستهلك النهائي يستخدم نفس المكونات الأساسية، أو عندما تريد عزل التطبيق النهائي عن تفاصيل التنفيذ للمكونات التي يستخدمها.

### دالة defineCustomElement {#definecustomelement}

Vue supports creating custom elements using exactly the same Vue component APIs via the [`defineCustomElement`](/api/custom-elements#definecustomelement) method. The method accepts the same argument as [`defineComponent`](/api/general#definecomponent), but instead returns a custom element constructor that extends `HTMLElement`:

```vue-html
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // خيارات مكون Vue العادية هنا
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement فقط: CSS لتحقن في shadow root
  styles: [`/* inlined css */`]
})

// تسجيل العنصر المخصص.
// بعد التسجيل، سترقى جميع العلامات `<my-vue-element>`
// على الصفحة.
customElements.define('my-vue-element', MyVueElement)

// يمكنك أيضًا إنشاء العنصر برمجيًا:
// (يمكن فقط القيام به بعد التسجيل)
document.body.appendChild(
  new MyVueElement({
    // الخاصيات الأولية (اختياري)
  })
)
```

#### دورة الحياة {#lifecycle}

- عنصر Vue المخصص سيقوم بوصل نسخة مكون Vue داخل جذر الظل ( shadow root ) عندما تستدعى [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) للعنصر للمرة الأولى.

- عندما تستدعى `disconnectedCallback` للعنصر، سيقوم Vue بالتحقق ما إذا كان العنصر مفصولًا عن المستند بعد تحديث عملية صغيرة.

  - إذا كان العنصر لا يزال في المستند، فهو حركة وسيُحتفظ بنسخة المكون.

  - إذا كان العنصر مفصولًا عن المستند، فهو إزالة وسيلغى وصل نسخة المكون.

#### الخاصيات {#props}

- ستعرف جميع الخاصيات (props) المصرح بها باستخدام الخيار `props` على العنصر المخصص كخاصيات. سيتعامل Vue تلقائيًا مع الانعكاس بين السمات / الخصائص عند الاقتضاء.

  - السمات دائمًا ما تنعكس على الخاصيات المقابلة.

  - تنعكس الخاصيات ذات القيم الأولية (`string`، `boolean` أو `number`) كسمات.

- يقوم Vue أيضًا بتحويل الخاصيات المصرح بها بأنواع `Boolean` أو `Number` إلى النوع المطلوب عند تعيينها كسمات (التي تكون دائمًا سلاسل نصية). على سبيل المثال، بالنظر إلى التصريحات الخاصة التالية:

  ```js
  props: {
    selected: Boolean,
    index: Number
  }
  ```

  واستخدام العنصر المخصص:

  ```vue-html
  <my-element selected index="1"></my-element>
  ```

  في المكون، سيُحول `selected` إلى `true` (boolean) و `index` إلى `1` (number).

#### الأحداث {#events}

ترسل الأحداث التي تصدر عبر `this.$emit` أو `emit` كحدث [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent) على العنصر المخصص. ستعرض وسائطا الحدث الإضافية (الحمولة) كمصفوفة على كائن CustomEvent كخاصية `detail`.

#### المنافذ {#slots}

داخل المكون، يمكن عرض المنافذ باستخدام عنصر `<slot/>` كالمعتاد. ومع ذلك، عند استهلاك العنصر الناتج، يقبل فقط [صيغة المنافذ الأصلية](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots):

- [المنافذ ذات النطاق](/guide/components/slots#scoped-slots) غير مدعومة.

- عند تمرير المنافذ المسماة، استخدم السمة `slot` بدلاً من السمة الموجهة `v-slot`:

  ```vue-html
  <my-element>
    <div slot="named">hello</div>
  </my-element>
  ```

#### تزويد/حقن {#provide-inject}

[الواجهة البرمجية لمبداأ التزويد/الحقن](/guide/components/provide-inject#provide-inject) وما يعادلها في [الواجهة التركيبية](/api/composition-api-dependency-injection#provide) تعمل أيضًا بين عناصر Vue المخصصة المحددة. ومع ذلك، تجدر الملاحظة أن هذا يعمل **فقط بين العناصر المخصصة**. أي أن عنصر Vue مخصص لن يكون قادرًا على حقن الخصائص التي وفرت بواسطة  العنصر المخصص غير مكون Vue.

#### App Level Config <sup class="vt-badge" data-text="3.5+" /> {#app-level-config}

You can configure the app instance of a Vue custom element using the `configureApp` option:

```js
defineCustomElement(MyComponent, {
  configureApp(app) {
    app.config.errorHandler = (err) => {
      /* ... */
    }
  }
})
```

### المكونات أحادية الملف كعناصر ممخصصة {#sfc-as-custom-element}

الدالة`defineCustomElement` تعمل أيضًا مع مكونات Vue أحادية الملف (SFCs). ومع ذلك، مع إعداد الأدوات الافتراضي، سيستخرج `<style>` داخل SFCs ودمجها في ملف CSS واحد أثناء بناء الإنتاج. عند استخدام SFC كعنصر مخصص، من المرجح أن يكون من المرغوب فيه حقن علامات `<style>` في جذر ظل العنصر المخصص بدلاً من ذلك.

أدوات SFC الرسمية تدعم استيراد SFCs في "وضع العنصر المخصص" (يتطلب `vitejs/plugin-vue@^1.4.0@` أو `vue-loader^16.5.0@`). يقوم SFC المحمل في وضع العنصر المخصص بتضمين علامات `<style>` كسلاسل CSS نصية ويعرضها تحت خيار `styles` للمكون. سيلتقط هذا بواسطة `defineCustomElement` وحقنه في جذر ظل العنصر عند التكوين.

للاشتراك في هذا الوضع، قم بتسمية ملف المكون باسم ينتهي بـ `.ce.vue`:

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ["/* inlined css */"]

// تحويل إلى معالج العنصر المخصص
const ExampleElement = defineCustomElement(Example)

// تسجيل
customElements.define('my-example', ExampleElement)
```

إذا كنت ترغب في تخصيص الملفات التي يجب استيرادها في وضع العنصر المخصص (على سبيل المثال، معاملة _جميع_ SFCs كعناصر مخصصة)، يمكنك تمرير الخيار `customElement` إلى ملحقات الإنشاء المعنية:

- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements)
- [vue-loader](https://github.com/vuejs/vue-loader/tree/next#v16-only-options)

### نصائح حول مكتبة عناصر Vue مخصصة {#tips-for-a-vue-custom-elements-library}

عند بناء عناصر مخصصة باستخدام Vue، ستعتمد العناصر على تشغيل Vue. هناك تكلفة حجم أساسي بحوالي 16 كيلوبايت اعتمادًا على عدد الميزات التي استخدمت. هذا يعني أنه ليس مثاليًا لاستخدام Vue إذا كنت تقوم بشحن عنصر مخصص واحد - قد ترغب في استخدام JavaScript الأساسي، أو [petite-vue](https://github.com/vuejs/petite-vue), أو الإطارات التي تتخصص في حجم التشغيل الصغير. ومع ذلك، فإن حجم القاعدة مبرر بشكل أكبر إذا كنت تقوم بشحن مجموعة من العناصر المخصصة ذات الشيفرة المنطقية المعقدة، حيث سيسمح Vue لكل مكون بأن يكتب بشيفرة أقل بكثير. كلما كنت تقوم بشحن عناصر معًا، كلما كان التضحية أفضل.

إذا كانت العناصر المخصصة ستستخدم في تطبيق يستخدم أيضًا Vue، يمكنك اختيار تطبيق Vue من الحزمة المبنية بحيث تستخدم العناصر نسخة واحدة من Vue من التطبيق المضيف.

يوصى بتصدير بناة العنصر الفردي لإعطاء المستخدمين الخاصين بك مرونة لاستيرادها عند الطلب وتسجيلها باسماء العلامات المطلوبة. يمكنك أيضًا تصدير دالة ملائمة لتسجيل جميع العناصر تلقائيًا. فيما يلي مثال على نقطة الدخول لمكتبة عناصر Vue المخصصة:

```js
// elements.js

import { defineCustomElement } from 'vue'
import Foo from './MyFoo.ce.vue'
import Bar from './MyBar.ce.vue'

const MyFoo = defineCustomElement(Foo)
const MyBar = defineCustomElement(Bar)

// تصدير العناصر الفردية
export { MyFoo, MyBar }

export function register() {
  customElements.define('my-foo', MyFoo)
  customElements.define('my-bar', MyBar)
}
```

A consumer can use the elements in a Vue file:

```vue
<script setup>
import { register } from 'path/to/elements.js'
register()
</script>

<template>
  <my-foo ...>
    <my-bar ...></my-bar>
  </my-foo>
</template>
```

Or in any other framework such as one with JSX, and with custom names:

```jsx
import { MyFoo, MyBar } from 'path/to/elements.js'

customElements.define('some-foo', MyFoo)
customElements.define('some-bar', MyBar)

export function MyComponent() {
  return <>
    <some-foo ... >
      <some-bar ... ></some-bar>
    </some-foo>
  </>
}
```

### Vue-based Web Components and TypeScript {#web-components-and-typescript}

When writing Vue SFC templates, you may want to [type check](/guide/scaling-up/tooling.html#typescript) your Vue components, including those that are defined as custom elements.

Custom elements are registered globally in browsers using their built-in APIs, and by default they won't have type inference when used in Vue templates. To provide type support for Vue components registered as custom elements, we can register global component typings by augmenting the [`GlobalComponents` interface](https://github.com/vuejs/language-tools/wiki/Global-Component-Types) for type checking in Vue templates (JSX users can augment the [JSX.IntrinsicElements](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements) type instead, which is not shown here).

Here is how to define the type for a custom element made with Vue:

```typescript
import { defineCustomElement } from 'vue'

// Import the Vue component.
import SomeComponent from './src/components/SomeComponent.ce.vue'

// Turn the Vue component into a Custom Element class.
export const SomeElement = defineCustomElement(SomeComponent)

// Remember to register the element class with the browser.
customElements.define('some-element', SomeElement)

// Add the new element type to Vue's GlobalComponents type.
declare module 'vue' {
  interface GlobalComponents {
    // Be sure to pass in the Vue component type here 
    // (SomeComponent, *not* SomeElement).
    // Custom Elements require a hyphen in their name, 
    // so use the hyphenated element name here.
    'some-element': typeof SomeComponent
  }
}
```

## Non-Vue Web Components and TypeScript {#non-vue-web-components-and-typescript}

Here is the recommended way to enable type checking in SFC templates of Custom Elements that are not built with Vue.

:::tip Note
This approach is one possible way to do it, but it may vary depending on the framework being used to create the custom elements.
:::

Suppose we have a custom element with some JS properties and events defined, and it is shipped in a library called `some-lib`:

```ts
// file: some-lib/src/SomeElement.ts

// Define a class with typed JS properties.
export class SomeElement extends HTMLElement {
  foo: number = 123
  bar: string = 'blah'

  lorem: boolean = false

  // This method should not be exposed to template types.
  someMethod() {
    /* ... */
  }

  // ... implementation details omitted ...
  // ... assume the element dispatches events named "apple-fell" ...
}

customElements.define('some-element', SomeElement)

// This is a list of properties of SomeElement that will be selected for type
// checking in framework templates (f.e. Vue SFC templates). Any other
// properties will not be exposed.
export type SomeElementAttributes = 'foo' | 'bar'

// Define the event types that SomeElement dispatches.
export type SomeElementEvents = {
  'apple-fell': AppleFellEvent
}

export class AppleFellEvent extends Event {
  /* ... details omitted ... */
}
```

The implementation details have been omitted, but the important part is that we have type definitions for two things: prop types and event types.

Let's create a type helper for easily registering custom element type definitions in Vue:

```ts
// file: some-lib/src/DefineCustomElement.ts

// We can re-use this type helper per each element we need to define.
type DefineCustomElement<
  ElementType extends HTMLElement,
  Events extends EventMap = {},
  SelectedAttributes extends keyof ElementType = keyof ElementType
> = new () => ElementType & {
  // Use $props to define the properties exposed to template type checking. Vue
  // specifically reads prop definitions from the `$props` type. Note that we
  // combine the element's props with the global HTML props and Vue's special
  // props.
  /** @deprecated Do not use the $props property on a Custom Element ref, 
    this is for template prop types only. */
  $props: HTMLAttributes &
    Partial<Pick<ElementType, SelectedAttributes>> &
    PublicProps

  // Use $emit to specifically define event types. Vue specifically reads event
  // types from the `$emit` type. Note that `$emit` expects a particular format
  // that we map `Events` to.
  /** @deprecated Do not use the $emit property on a Custom Element ref, 
    this is for template prop types only. */
  $emit: VueEmit<Events>
}

type EventMap = {
  [event: string]: Event
}

// This maps an EventMap to the format that Vue's $emit type expects.
type VueEmit<T extends EventMap> = EmitFn<{
  [K in keyof T]: (event: T[K]) => void
}>
```

:::tip Note
We marked `$props` and `$emit` as deprecated so that when we get a `ref` to a custom element we will not be tempted to use these properties, as these properties are for type checking purposes only when it comes to custom elements. These properties do not actually exist on the custom element instances.
:::

Using the type helper we can now select the JS properties that should be exposed for type checking in Vue templates:

```ts
// file: some-lib/src/SomeElement.vue.ts

import {
  SomeElement,
  SomeElementAttributes,
  SomeElementEvents
} from './SomeElement.js'
import type { Component } from 'vue'
import type { DefineCustomElement } from './DefineCustomElement'

// Add the new element type to Vue's GlobalComponents type.
declare module 'vue' {
  interface GlobalComponents {
    'some-element': DefineCustomElement<
      SomeElement,
      SomeElementAttributes,
      SomeElementEvents
    >
  }
}
```

Suppose that `some-lib` builds its source TypeScript files into a `dist/` folder. A user of `some-lib` can then import `SomeElement` and use it in a Vue SFC like so:

```vue
<script setup lang="ts">
// This will create and register the element with the browser.
import 'some-lib/dist/SomeElement.js'

// A user that is using TypeScript and Vue should additionally import the
// Vue-specific type definition (users of other frameworks may import other
// framework-specific type definitions).
import type {} from 'some-lib/dist/SomeElement.vue.js'

import { useTemplateRef, onMounted } from 'vue'

const el = useTemplateRef('el')

onMounted(() => {
  console.log(
    el.value!.foo,
    el.value!.bar,
    el.value!.lorem,
    el.value!.someMethod()
  )

  // Do not use these props, they are `undefined`
  // IDE will show them crossed out
  el.$props
  el.$emit
})
</script>

<template>
  <!-- Now we can use the element, with type checking: -->
  <some-element
    ref="el"
    :foo="456"
    :blah="'hello'"
    @apple-fell="
      (event) => {
        // The type of `event` is inferred here to be `AppleFellEvent`
      }
    "
  ></some-element>
</template>
```

If an element does not have type definitions, the types of the properties and events can be defined in a more manual fashion:

```vue
<script setup lang="ts">
// Suppose that `some-lib` is plain JS without type definitions, and TypeScript
// cannot infer the types:
import { SomeElement } from 'some-lib'

// We'll use the same type helper as before.
import { DefineCustomElement } from './DefineCustomElement'

type SomeElementProps = { foo?: number; bar?: string }
type SomeElementEvents = { 'apple-fell': AppleFellEvent }
interface AppleFellEvent extends Event {
  /* ... */
}

// Add the new element type to Vue's GlobalComponents type.
declare module 'vue' {
  interface GlobalComponents {
    'some-element': DefineCustomElement<
      SomeElementProps,
      SomeElementEvents
    >
  }
}

// ... same as before, use a reference to the element ...
</script>

<template>
  <!-- ... same as before, use the element in the template ... -->
</template>
```

Custom Element authors should not automatically export framework-specific custom element type definitions from their libraries, for example they should not export them from an `index.ts` file that also exports the rest of the library, otherwise users will have unexpected module augmentation errors. Users should import the framework-specific type definition file that they need.

## مكونات الويب مقابل مكونات Vue {#web-components-vs-vue-components}

هناك بعض المطورين يعتقدون أنه يجب تجنب نماذج المكونات الخاصة بالإطار، وأن استخدام عناصر الويب فقط يجعل التطبيق "مستقبلي". هنا سنحاول شرح لماذا نعتقد أن هذا هو اتخاذ مبسط للغاية للمشكلة.

هناك بالفعل مستوى معين من تداخل الميزات بين عناصر الويب ومكونات Vue: كلاهما يسمح لنا بتحديد مكونات قابلة لإعادة الاستخدام مع تمرير البيانات وإصدار الأحداث وإدارة دورة الحياة. ومع ذلك، تعتبر الواجهة البرمجية لعناصر الويب مستوى منخفض نسبيًا وأساسيًا. لبناء تطبيق فعلي، نحتاج إلى العديد من القدرات الإضافية التي لا تغطيها المنصة:

- نظام قوالب تصريحي وفعال؛

- نظام إدارة الحالة تفاعلية الذي يسهل استخراج وإعادة استخدام الشيفرة المنطقية للعناصر المشتركة؛

- طريقة فعالة لتصيير المكونات على الخادم وانعاشها على جانب العميل (SSR)، وهو أمر مهم لتحسين محركات البحث و[مقاييس Web Vitals مثل LCP](https://web.dev/vitals/) . ينطوي SSR لعناصر الويب الأصلية على محاكاة DOM في Node.js ثم تسلسل DOM المتحول، بينما يترجم Vue SSR إلى تجميع السلاسل كلما أمكن ذلك، وهو أكثر كفاءة بكثير.

نموذج المكونات في Vue مصمم مع هذه الاحتياجات في الاعتبار كنظام متماسك.

مع فريق هندسي متمكن، يمكنك بالتأكيد بناء ما يعادله على عناصر الويب الأصلية - ولكن هذا يعني أيضًا أنك تتحمل عبء الصيانة على المدى الطويل لإطار عمل داخلي، مع فقدان فوائد النظام البيئي والمجتمع من إطار عمل ناضج مثل Vue.

هناك أيضًا أطُرٌ بُنِيت باستخدام عناصر مخصصة كأساس لنموذج مكوناتها، ولكن جميعها بالضرورة يجب أن تُقدِم حلاً مميزًا للمشكلات المذكورة أعلاه. استخدام هذه الأطُر يستلزم الالتزام بقراراتها التقنية حول كيفية حل هذه المشكلات - والتي على الرغم مما قد يُعلَن، لا تقيك تلقائيًا من التحولات المحتملة في المستقبل.

هناك أيضًا بعض المجالات التي نجد فيها عناصر مخصصة تقييدية:

- تقييم المنافذ بحرص يعيق تكوين المكونات. [المنافذ ذات النطاق](/guide/components/slots#scoped-slots) في Vue هي آلية قوية لتكوين المكونات، والتي لا يمكن دعمها من قبل عناصر مخصصة بسبب طبيعة المنافذ الأصلية الحريصة. تعني المنافذ الحريصة أيضًا أن المكون الذي يستقبل المنفذ لا يمكنه التحكم في متى أو ما إذا كان سيقوم بتصيير جزء من محتوى المنفذ.

- يتطلب شحن عناصر مخصصة مع CSS محددة النطاق في ظل DOM اليوم تضمين CSS داخل JavaScript بحيث يمكن حقنها في الجذور الظلية في وقت التشغيل. كما أنها تؤدي إلى تكرار التنسيقات في العلامات في سيناريوهات التصيير من جانب الخادوم. هناك [ميزات منصة](https://github.com/whatwg/html/pull/4898/) تعمل في هذا المجال - ولكن حتى الآن لا تدعم بشكل عام، ولا تزال هناك مخاوف إنتاجية للأداء والتصيير من جانب الخادوم التي يجب معالجتها. في غضون ذلك، توفر ملفات SFC في Vue [آليات تحديد نطاق CSS](/api/sfc-css-features) تدعم استخراج التنسيقات إلى ملفات CSS عادية.

ستبقى Vue دائمًا متوافقًا مع أحدث المعايير في منصة الويب، وسنستفيد بسرور من أي شيء توفره المنصة إذا جعل عملنا أسهل. ومع ذلك، هدفنا هو توفير حلول تعمل بشكل جيد وتعمل اليوم. وهذا يعني أنه يجب علينا دمج ميزات المنصة الجديدة بعقلية نقدية - وهذا ينطوي على سد الفجوات حيث تفشل المعايير بينما تظل الحاجة قائمةً.
