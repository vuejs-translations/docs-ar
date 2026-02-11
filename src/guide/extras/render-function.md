---
outline: deep
---

# دوال التصيير و JSX {#render-functions-jsx}

نوصي باستخدام القوالب لبناء التطبيقات في معظم الحالات. ومع ذلك ، هناك حالات نحتاج فيها إلى القوة البرمجية الكاملة لـ JavaScript. هنا يمكننا استخدام **دوال التصيير**.

> إذا كنت جديدًا على مفهوم الـDOM الافتراضي ودوال التصيير ، فتأكد من قراءة الفصل [آلية التصيير](/guide/extras/rendering-mechanism) أولاً.
## استخدام أساسي {#basic-usage}

### إنشاء عقد افتراضية {#creating-vnodes}

توفر Vue دالة `()h` لإنشاء عقد افتراضية:

```js
import { h } from 'vue'

const vnode = h(
  'div', // نوع العنصر
  { id: 'foo', class: 'bar' }, // خاصيات
  [
    /* العقد الأبناء */
  ]
)
```

`()h` هي اختصار لـ **hyperscript** - والذي يعني "JavaScript الذي ينتج HTML (لغة ترميز النص الفائق)". هذا الاسم موروث من الاصطلاحات المشتركة بين العديد من تنفيذات DOM الافتراضية. يمكن أن يكون الاسم الأكثر وصفًا هو `()createVNode` ، ولكن الاسم الأقصر يساعد عندما تضطر إلى استدعاء هذه الدالة عدة مرات في دالة التصيير.

دالة `()h` مصممة لتكون مرنة للغاية:

```js
// كل الوسائط ما عدا النوع اختيارية
h('div')
h('div', { id: 'foo' })

//كل من الخاصيات الأصلية والسمات يمكن استخدامها في خاصيات Vue
// يقوم Vue تلقائيًا باختيار الطريقة الصحيحة لتعيينها
h('div', { class: 'bar', innerHTML: 'السلام عليكم' })

// يمكن إضافة معدلات الخاصيات مثل `.prop` و `.attr`
// بالبادئة `.` و `^` على التوالي  
h('div', { '.name': 'some-name', '^width': '100' })

// class و style لديهم نفس الدعم لقيمة الكائن / المصفوفة 
// التي لديهم في القوالب
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// يجب تمرير مستمعي الأحداث كـ onXxx
h('div', { onClick: () => {} })

// العقد الأبناء يمكن أن يكون سلسلة نصية
h('div', { id: 'foo' }, 'السلام عليكم')

// يمكن حذف الخاصيات عندما لا توجد خاصيات
h('div', 'السلام عليكم')
h('div', [h('span', 'السلام عليكم')])

// يمكن أن تحتوي مصفوفة العقد الأبناء على عقد افتراضي وسلاسل نصية
h('div', ['السلام عليكم', h('span', 'السلام عليكم')])
```

العقدة الافتراضية الناتجة لها الشكل التالي:

```js
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```

:::warning ملاحظة
تحتوي واجهة `VNode` الكاملة على العديد من الخاصيات الداخلية الأخرى ، ولكن من المستحسن بشدة تجنب الاعتماد على أي خاصيات غير تلك المدرجة هنا. هذا يتجنب الكسر غير المقصود في حال  تغيرت الخاصيات الداخلية.
:::

### التصريح بدوال التصيير #declaring-render-functions}

<div class="composition-api">

عند استخدام القوالب مع الواجهة التركيبية ، تستخدم قيمة إرجاع خطاف `()setup` لعرض البيانات على القالب. عند استخدام دوال التصيير ، يمكننا إرجاع الدالة المصيّرة مباشرةً بدلاً من ذلك:

```js
import { ref, h } from 'vue'

export default {
  props: {
    /* ... */
  },
  setup(props) {
    const count = ref(1)

    // إرجاع دالة التصيير
    return () => h('div', props.msg + count.value)
  }
}
```

دالة التصيير معلنة داخل `()setup` لذلك لديها بشكل طبيعي الوصول إلى الخاصيات وأي حالة تفاعلية صرح بها في نفس النطاق.

بالإضافة إلى إرجاع عقدة واحدة ، يمكنك أيضًا إرجاع سلاسل نصية أو مصفوفات:

```js
export default {
  setup() {
    return () => 'السلام عليكم!'
  }
}
```

```js
import { h } from 'vue'

export default {
  setup() {
    // استخدام مصفوفة لإرجاع عقدة أبناء متعددة
    return () => [
      h('div'),
      h('div'),
      h('div')
    ]
  }
}
```

:::tip ملاحظة
تأكد من إرجاع دالة بدلاً من إرجاع القيم مباشرةً! تستدعى دالة `()setup` مرة واحدة فقط لكل مكون ، بينما سستدعى دالة التصيير المرجعة عدة مرات.
:::

</div>
<div class="options-api">

يمكننا التصريح بدوال التصيير باستخدام خيار `render`:

```js
import { h } from 'vue'

export default {
  data() {
    return {
      msg: 'السلام عليكم'
    }
  },
  render() {
    return h('div', this.msg)
  }
}
```

دالة `()render` لديها الوصول إلى نسخة المكون عبر `this`.

بالإضافة إلى إرجاع عقدة واحدة ، يمكنك أيضًا إرجاع سلاسل نصية أو مصفوفات:

```js
export default {
  render() {
    return 'السلام عليكم!'
  }
}
```

```js
import { h } from 'vue'

export default {
  render() {
    // استخدام مصفوفة لإرجاع عقدة أبناء متعددة
    return [
      h('div'),
      h('div'),
      h('div')
    ]
  }
}
```

</div>

إذا لم تكن تحتاج دالة التصيير إلى أي حالة من نسخة المكون ، فيمكن أيضًا إعلانها مباشرةً كدالة لغرض الإيجاز:

```js
function السلام عليكم() {
    return 'السلام عليكم!'
}
```

هذا صحيح، هذا مكون Vue صالح! اطلع على فصل [المكونات الوظيفية](#functional-components) لمزيد من التفاصيل حول هذه الصيغة.

### العقد الافتراضية لابد أن تكون فريدة {#vnodes-must-be-unique}

جميع العقد في شجرة المكون يجب أن تكون فريدة. وهذا يعني أن دالة التصيير التالية غير صالحة:

```js
function render() {
  const p = h('p', 'hi')
  return h('div', [ 
    // 😬 - عقدة مكررة!
    p,
    p
  ])
}
```

إذا كنت تريد حقًا تكرار نفس العنصر / المكون عدة مرات ، فيمكنك القيام بذلك باستخدام دالة منتِجة. على سبيل المثال ، فإن دالة التصيير التالية هي طريقة صالحة تمامًا لتصيير 20 فقرة متطابقة:

```js
function render() {
  return h(
    'div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hi')
    })
  )
}
```

### Using Vnodes in `<template>`

```vue
<script setup>
import { h } from 'vue'

const vnode = h('button', ['Hello'])
</script>

<template>
  <!-- Via <component /> -->
  <component :is="vnode">Hi</component>

  <!-- Or directly as element -->
  <vnode />
  <vnode>Hi</vnode>
</template>
```

A vnode object has been declared in `setup()`, you can use it like a normal component for rendering.

:::warning
A vnode represents an already created render output, not a component definition. Using a vnode in `<template>` does not create a new component instance, and the vnode will be rendered as-is.

This pattern should be used with care and is not a replacement for normal components.
:::

## JSX / TSX {#jsx-tsx}

[JSX](https://facebook.github.io/jsx/) هو امتداد شبيه بـ XML لـ JavaScript يسمح لنا بكتابة شيفرة مثل هذه:

```jsx
const vnode = <div>السلام عليكم</div>
```

داخل تعبيرات JSX ، استخدم الأقواس المنحنية لتضمين القيم الديناميكية:

```jsx
const vnode = <div id={dynamicId}>السلام عليكم, {userName}</div>
```

`create-vue` و Vue CLI لديهما خيارات لاطلاق المشاريع بصيغة قاعدية مع دعم JSX معد مسبقًا. إذا كنت تقوم بتهيئة JSX يدويًا ، فيرجى الرجوع إلى توثيق [`vue/babel-plugin-jsx@`](https://github.com/vuejs/jsx-next) للحصول على التفاصيل.


على الرغم من أن React قدمته لأول مرة ، إلا أن JSX ليس لديها دلالات وقت التشغيل محددة ويمكن تصريفها إلى عديد من المخرجات المختلفة. إذا كنت قد عملت مع JSX من قبل ، فلاحظ أن **تصريف JSX في Vue مختلف عن تصريف JSX في React** ، لذلك لا يمكنك استخدام تحويل JSX في React في تطبيقات Vue. بعض الاختلافات الملحوظة عن JSX في React تشمل:

- يمكنك استخدام سمات HTML مثل `class` و `for` كخاصيات - لا حاجة لاستخدام `className` أو `htmlFor`.
- تمرير العناصر الأبناء إلى المكونات (أي المنافذ) [يعمل بشكل مختلف](#passing-slots).

توفر تعريفات النوع في Vue أيضًا استنباط النوع لاستخدام TSX. عند استخدام TSX ، تأكد من تحديد `"jsx": "preserve"` في `tsconfig.json` حتى يترك TypeScript بناء صيغة JSX سليمًا لتصريف JSX في Vue من أجل معالجته.

Similar to the transform, Vue's JSX also needs different type definitions.

Starting in Vue 3.4, Vue no longer implicitly registers the global `JSX` namespace. To instruct TypeScript to use Vue's JSX type definitions, make sure to include the following in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue"
    // ...
  }
}
```

You can also opt-in per file by adding a `/* @jsxImportSource vue */` comment at the top of the file.

If there is code that depends on the presence of the global `JSX` namespace,  you can retain the exact pre-3.4 global behavior by explicitly importing or referencing `vue/jsx` in your project, which registers the global `JSX` namespace.

إذا كانت هناك شيفرة تعتمد على وجود مساحة الأسماء العامة `JSX` ، فيمكنك الاحتفاظ بالسلوك العام الدقيق قبل 3.4 عن طريق الإشارة إلى `vue/jsx` بشكل صريح ، والذي يسجل مساحة الأسماء العامة `JSX`.

## وصفات لاستخدام دالة التصيير {#render-function-recipes}

أدناه سنقدم بعض الوصفات الشائعة لتنفيذ ميزات القالب بما يقابلها من دوال تصيير / JSX.

### `v-if` {#v-if}

القالب:

```vue-html
<div>
  <div v-if="ok">نعم</div>
  <span v-else>لا</span>
</div>
```

المقابل باستخدام دالة التصيير / JSX:

<div class="composition-api">

```js
h('div', [ok.value ? h('div', 'نعم') : h('span', 'لا')])
```

```jsx
<div>{ok.value ? <div>نعم</div> : <span>لا</span>}</div>
```

</div>
<div class="options-api">

```js
h('div', [this.ok ? h('div', 'نعم') : h('span', 'لا')])
```

```jsx
<div>{this.ok ? <div>نعم</div> : <span>لا</span>}</div>
```

</div>

### `v-for` {#v-for}

القالب:

```vue-html
<ul>
  <li v-for="{ id, text } in items" :key="id">
    {{ text }}
  </li>
</ul>
```

المقابل باستخدام دالة التصيير / JSX:

<div class="composition-api">

```js
h(
  'ul',
  // مع الافتراض أن `items` هو مرجع بقيمة مصفوفة
  items.value.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {items.value.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>
<div class="options-api">

```js
h(
  'ul',
  this.items.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {this.items.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>

### `v-on` {#v-on}

الخاصيات التي تبدأ بـ `on` تليها حرف كبير تعامل على أنها مستمعات للأحداث. على سبيل المثال ، `onClick` هو المقابل لـ `click@` في القوالب.

```js
h(
  'button',
  {
    onClick(event) {
      /* ... */
    }
  },
  'انقر هنا'
)
```

```jsx
<button
  onClick={(event) => {
    /* ... */
  }}
>
  انقر هنا
</button>
```

#### معدلات الأحداث {#event-modifiers}

لمعدلات الأحداث `passive.` و `capture.` و `once.` ، يمكن دمجها بعد اسم الحدث باستخدام صيغة سنام الجمل camelCase.

على سبيل المثال:

```js
h('input', {
  onClickCapture() {
    /* مستمع في وضع الالتقاط */
  },
  onKeyupOnce() {
    /* يشغل مرة واحدة فقط */
  },
  onMouseoverOnceCapture() {
    /* مرة واحدة + التقاط */
  }
})
```

```jsx
<input
  onClickCapture={() => {}}
  onKeyupOnce={() => {}}
  onMouseoverOnceCapture={() => {}}
/>
```

بالنسبة لمعدلات الأحداث والمفاتيح الأخرى ، يمكن استخدام الدالة المساعدة [`withModifiers`](/api/render-function#withmodifiers):

```js
import { withModifiers } from 'vue'

h('div', {
  onClick: withModifiers(() => {}, ['self'])
})
```

```jsx
<div onClick={withModifiers(() => {}, ['self'])} />
```

### المكونات {#components}

لإنشاء عقدة افتراضية لمكون ، يجب أن يكون أول وسيط يُمرر إلى `()h` هو تعريف المكون. هذا يعني عند استخدام دوال التصيير ، فمن غير الضروري تسجيل المكونات - يمكنك استخدام المكونات المستوردة مباشرة:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return h('div', [h(Foo), h(Bar)])
}
```

```jsx
function render() {
  return (
    <div>
      <Foo />
      <Bar />
    </div>
  )
}
```

كما نرى ، يمكن لـ `h` العمل مع المكونات المستوردة من أي تنسيق ملف طالما أنها مكون Vue صالح.

المكونات الديناميكية بسيطة الاستخدام مع دوال التصيير:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return ok.value ? h(Foo) : h(Bar)
}
```

```jsx
function render() {
  return ok.value ? <Foo /> : <Bar />
}
```

إذا سُجل مكون بالاسم ولا يمكن استيراده مباشرة (على سبيل المثال ، سُجل على المستوى العام من قبل مكتبة ما) ، فيمكن حله بشكل برمجي باستخدام الدالة المساعدة [`()resolveComponent`](/api/render-function#resolvecomponent).

### تصيير المنافذ {#rendering-slots}

<div class="composition-api">

في دوال التصيير ، يمكن الوصول إلى المنافذ من سياق `()setup`. كل منفذ من كائن `slots` هو **دالة تعيد مصفوفة من العقد الافتراضية**:

```js
export default {
  props: ['message'],
  setup(props, { slots }) {
    return () => [
      // منفذ افتراضي:
      // <div><slot /></div>
      h('div', slots.default()),

      // منفذ مسمى:
      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        slots.footer({
          text: props.message
        })
      )
    ]
  }
}
```

المقابل باستخدام JSX:

```jsx
// افتراضي
<div>{slots.default()}</div>

// مسمى
<div>{slots.footer({ text: props.message })}</div>
```

</div>
<div class="options-api">

في دوال التصيير ، يمكن الوصول إلى المنافذ من خلال [`this.$slots`](/api/component-instance#slots):

```js
export default {
  props: ['message'],
  render() {
    return [
      // <div><slot /></div>
      h('div', this.$slots.default()),

      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        this.$slots.footer({
          text: this.message
        })
      )
    ]
  }
}
```

المقابل باستخدام JSX:

```jsx
// <div><slot /></div>
<div>{this.$slots.default()}</div>

// <div><slot name="footer" :text="message" /></div>
<div>{this.$slots.footer({ text: this.message })}</div>
```

</div>

### تمرير المنافذ {#passing-slots}

تمرير المكونات الأبناء إلى المكونات الآباء يعمل بشكل مختلف قليلاً عن تمرير المكونات الأبناء إلى العناصر. بدلاً من مصفوفة ، نحتاج إلى تمرير دالة منفذ، أو كائن من دوال المنافذ. يمكن لدوال المنافذ إرجاع أي شيء يمكن لدالة التصيير العادية إرجاعه - والذي سيُطبّع دائمًا  إلى مصفوفات من العقد الافتراضية عند الوصول إليه في المكون الإبن.

```js
// منفذ افتراضي واحد
h(MyComponent, () => 'السلام عليكم')

// منافذ مسماة
// لاحظ أن `null` مطلوب لتجنب
// معاملة كائن المنافذ على أنه خاصية
h(MyComponent, null, {
  default: () => 'default slot',
  foo: () => h('div', 'foo'),
  bar: () => [h('span', 'one'), h('span', 'two')]
})
```

المقابل باستخدام JSX:

```jsx
// default
<MyComponent>{() => 'السلام عليكم'}</MyComponent>

// named
<MyComponent>{{
  default: () => 'default slot',
  foo: () => <div>foo</div>,
  bar: () => [<span>one</span>, <span>two</span>]
}}</MyComponent>
```

تمرير المنافذ كدوال يسمح لها بأن تُستدعى بشكل خامل من قبل المكون الإبن. هذا يؤدي إلى تتبع اعتمادات المنفذ من قبل المكون الإبن بدلاً من المكون الأب، مما يؤدي إلى تحديثات أكثر دقة وكفاءة.

### Scoped Slots {#scoped-slots}

To render a scoped slot in the parent component, a slot is passed to the child. Notice how the slot now has a parameter `text`. The slot will be called in the child component and the data from the child component will be passed up to the parent component.

```js
// parent component
export default {
  setup() {
    return () => h(MyComp, null, {
      default: ({ text }) => h('p', text)
    })
  }
}
```

Remember to pass `null` so the slots will not be treated as props.

```js
// child component
export default {
  setup(props, { slots }) {
    const text = ref('hi')
    return () => h('div', null, slots.default({ text: text.value }))
  }
}
```

JSX equivalent:

```jsx
<MyComponent>{{
  default: ({ text }) => <p>{ text }</p>  
}}</MyComponent>
```

  ### المكونات المدمجة {#built-in-components}

يجب استيراد [المكونات المدمجة](/api/built-in-components) مثل `<KeepAlive>`و `<Transition>`و  `<TransitionGroup>`و  ` <Teleport> `  و `<Suspense>` للاستخدام في دوال التصيير:

<div class="composition-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  setup () {
    return () => h(Transition, { mode: 'out-in' }, /* ... */)
  }
}
```

</div>
<div class="options-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  render () {
    return h(Transition, { mode: 'out-in' }, /* ... */)
  }
}
```

</div>

### `v-model` {#v-model}

وسعت السمة الموجهة `v-model` إلى خاصيات `modelValue` و `onUpdate:modelValue` أثناء تصريف القالب - سنضطر إلى توفير هذه الخصائص بأنفسنا:

<div class="composition-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h(SomeComponent, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value)
      })
  }
}
```

</div>
<div class="options-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  render() {
    return h(SomeComponent, {
      modelValue: this.modelValue,
      'onUpdate:modelValue': (value) => this.$emit('update:modelValue', value)
    })
  }
}
```

</div>

### السمات الموجهة المخصصة {#custom-directives}

يمكن تطبيق السمات الموجهة المخصصة على العقد الافتراضية باستخدام الدالة المساعدة [`withDirectives`](/api/render-function#withdirectives):

```js
import { h, withDirectives } from 'vue'

// سمة موجهة مخصصة  
const pin = {
  mounted() { /* ... */ },
  updated() { /* ... */ }
}

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h('div'), [
  [pin, 200, 'top', { animate: true }]
])
```

إذا سجلت السمة الموجهة بالاسم ولا يمكن استيرادها مباشرة ، فيمكن حلها باستخدام الدالة المساعدة [`resolveDirective`](/api/render-function#resolvedirective).

### مراجع القالب {#template-refs}

<div class="composition-api">

مع الواجهة التركيبية ، تنشأ مراجع القالب عن طريق تمرير `()ref` نفسه كخاصية إلى العقدة الافتراضية:

```js
import { h, ref } from 'vue'

export default {
  setup() {
    const divEl = ref()

    // <div ref="divEl">
    return () => h('div', { ref: divEl })
  }
}
```

or (with version >= 3.5)

```js
import { h, useTemplateRef } from 'vue'

export default {
  setup() {
    const divEl = useTemplateRef('my-div')

    // <div ref="divEl">
    return () => h('div', { ref: 'my-div' })
  }
}
```

</div>
<div class="options-api">

مع واجهة الخيارات ، تنشأ مراجع القالب عن طريق تمرير اسم المرجع كسلسلة في خاصيات العقدة الافتراضية:

```js
export default {
  render() {
    // <div ref="divEl">
    return h('div', { ref: 'divEl' })
  }
}
```

</div>

## الدوال الوظيفية {#functional-components}

المكونات الوظيفية هي شكل بديل من المكونات لا تحتوي على أي حالة خاصة بها. إنها تعمل مثل الدوال النقية: استقبال الخاصيات، وارجاع العقد الافتراضية. تُصير دون إنشاء نسخة مكون (أي لا يوجد `this`)، وبدون خطافات دورة حياة المكون العادية.

لإنشاء مكون وظيفي نستخدم دالة عادية، بدلاً من كائن خيارات. الدالة هي عملياً دالة `render` للمكون.

<div class="composition-api">

بصمة المكون الوظيفي هي نفسها بصمة خطاف `()setup`:

```js
function MyComponent(props, { slots, emit, attrs }) {
  // ...
}
```

</div>
<div class="options-api">

بما أنه لا يوجد مرجع `this` للمكون الوظيفي، ستمرر Vue الخاصيات كشكل وسيط أول:

```js
function MyComponent(props, context) {
  // ...
}
```

الوسيط الثاني، `context`، يحتوي على ثلاث خاصيات: `attrs`، `emit`، و `slots`. هذه مكافئة لخاصيات النسخة [`attrs$`](/api/component-instance#attrs)و [`emit$`](/api/component-instance#emit) و [`slots$`](/api/component-instance#slots) على التوالي.

</div>

معظم خيارات التهيئة العادية للمكونات غير متوفرة للمكونات الوظيفية. ومع ذلك، من الممكن تعريف [`props`](/api/options-state#props) و [`emits`](/api/options-state#emits) عن طريق إضافتهم كخاصيات:

```js
MyComponent.props = ['value']
MyComponent.emits = ['click']
```

إذا لم يُحدَّد خيار `props`، فإن كائن `props` الممرر للدالة سيحتوي على جميع السمات، بشكل مشابه لـ `attrs`. لن تطبع أسماء الخاصيات إلى نمط سنام الجمل camelCase إلا إذا حُدد خيار `props`.

بالنسبة للمكونات الوظيفية مع `props` صريحة، [السمات المستترة](/guide/components/attrs) تعمل بنفس الطريقة مع المكونات العادية. ومع ذلك، بالنسبة للمكونات الوظيفية التي لا تحدد `props` بشكل صريح، فإن السمات `class`، `style`، ومستمعات الحدث `onXxx` فقط ستورث من `attrs` بشكل افتراضي. في كلا الحالتين، يمكن تعيين `inheritAttrs` إلى `false` لتعطيل توريث السمات:

```js
MyComponent.inheritAttrs = false
```

يمكن تسجيل المكونات الوظيفية واستهلاكها تماماً مثل المكونات العادية. إذا قمت بتمرير دالة كوسيط أول لـ `()h`، فسيتعامل معها كمكون وظيفي.

### إضافة النوع إلى المكونات الوظيفية <sup class="vt-badge ts" /> {#typing-functional-components}

Functional Components can be typed based on whether they are named or anonymous. [Vue - Official extension](https://github.com/vuejs/language-tools) also supports type checking properly typed functional components when consuming them in SFC templates.

**المكونات الوظيفية المسماة**

```tsx
import type { SetupContext } from 'vue'
type FComponentProps = {
  message: string
}

type Events = {
  sendMessage(message: string): void
}

function FComponent(
  props: FComponentProps,
  context: SetupContext<Events>
) {
  return (
    <button onClick={() => context.emit('sendMessage', props.message)}>
        {props.message} {' '}
    </button>
  )
}

FComponent.props = {
  message: {
    type: String,
    required: true
  }
}

FComponent.emits = {
  sendMessage: (value: unknown) => typeof value === 'string'
}
```

**المكونات الوظيفية مجهولة الإسم**

```tsx
import type { FunctionalComponent } from 'vue'

type FComponentProps = {
  message: string
}

type Events = {
  sendMessage(message: string): void
}

const FComponent: FunctionalComponent<FComponentProps, Events> = (
  props,
  context
) => {
  return (
    <button onClick={() => context.emit('sendMessage', props.message)}>
        {props.message} {' '}
    </button>
  )
}

FComponent.props = {
  message: {
    type: String,
    required: true
  }
}

FComponent.emits = {
  sendMessage: (value) => typeof value === 'string'
}
```
