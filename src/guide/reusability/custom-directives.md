# المُوجِّهات المخصصة {#custom-directives}

<script setup>
const vHighlight = {
  mounted: el => {
    el.classList.add('is-highlight')
  }
}
</script>

<style>
  .vt-doc p.is-highlight {
    margin-bottom: 0;
}

.is-highlight {
  background-color: yellow;
  color: black;
}
</style>

## مقدمة {#introduction}

بالإضافة إلى مجموعة من الموجهات الافتراضية المتوفرة المدمجة مع الإطار (مثل `v-model` أو `v-show`) ، تسمح لك Vue أيضًا بتسجيل موجهات مخصصة خاصة بك.

لقد أدرجنا شكلين من أشكال إعادة استخدام الشيفرة في Vue: [المكونات](/guide/essentials/component-basics) و [composables](./composables). المكونات هي البنية الرئيسية ، في حين أن composables متميزة في إعادة استخدام منطق حالة المكون. الموجهات المخصصة ، بدورها، تهدف في الغالب إلى إعادة استخدام منطق يتضمن وصول متدني المستوى إلى الـDOM  على عناصر عادية.

A custom directive is defined as an object containing lifecycle hooks similar to those of a component. The hooks receive the element the directive is bound to. Here is an example of a directive that adds a class to an element when it is inserted into the DOM by Vue:

<div class="composition-api">

```vue
<script setup>
// enables v-highlight in templates
const vHighlight = {
  mounted: (el) => {
    el.classList.add('is-highlight')
  }
}
</script>

<template>
  <p v-highlight>This sentence is important!</p>
</template>
```

</div>

<div class="options-api">

```js
const highlight = {
  mounted: (el) => el.classList.add('is-highlight')
}

export default {
  directives: {
    // enables v-highlight in template
    highlight
  }
}
```

```vue-html
<p v-highlight>This sentence is important!</p>
```

</div>

<div class="demo">
  <p v-highlight>This sentence is important!</p>
</div>

<div class="composition-api">

In `<script setup>`, any camelCase variable that starts with the `v` prefix can be used as a custom directive. In the example above, `vHighlight` can be used in the template as `v-highlight`.

If you are not using `<script setup>`, custom directives can be registered using the `directives` option:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // enables v-highlight in template
    highlight: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

Similar to components, custom directives must be registered so that they can be used in templates. In the example above, we are using local registration via the `directives` option.

</div>

It is also common to globally register custom directives at the app level:

```js
const app = createApp({})

// make v-highlight usable in all components
app.directive('highlight', {
  /* ... */
})
```

## When to use custom directives {#when-to-use}

Custom directives should only be used when the desired functionality can only be achieved via direct DOM manipulation.

A common example of this is a `v-focus` custom directive that brings an element into focus.

<div class="composition-api">

```vue
<script setup>
//تمكين v-focus في القوالب
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    //تمكين v-focus في القوالب
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

This directive is more useful than the `autofocus` attribute because it works not just on page load - it also works when the element is dynamically inserted by Vue!

Declarative templating with built-in directives such as `v-bind` is recommended when possible because they are more efficient and server-rendering friendly.

## خطافات الموجهة {#directive-hooks}

يمكن لكائن تعريف الموجهة توفير عدة دوال خطافة (كلها اختيارية):

```js
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // تستدعى بعد تحديث 
  // المكون الأب وجميع أبنائه
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode) {}
}
```

### وسائط دوال الخطافات {#hook-arguments}

مررت دوال الخطافات الوسائط التالية:

- `el`: العنصر المرتبط بالموجهة. يمكن استخدامه للتحكم المباشر في DOM. 

- `binding`: كائن يحتوي على الخصائص التالية.

  - `value`: القيمة الممررة إلى الموجهة. على سبيل المثال في `"v-my-directive="1 + 1`, ستكون القيمة `2`. 
  - `oldValue`: القيمة السابقة، متاحة فقط في `beforeUpdate` و `updated`. متاحة سواء تغيرت القيمة أم لا. 
  -  `arg`: الوسيط الممرر إلى الموجهة، إذا كان موجودًا. على سبيل المثال في `v-my-directive:foo`, سيكون الوسيط `"foo"`.
  - `modifiers`: كائن يحتوي على المعدلات، إذا كانت موجودة. على سبيل المثال في `v-my-directive.foo.bar`, سيكون كائن المعدلات `{ foo: true, bar: true }`.
  - `instance`:  نسخة المكون حيث تستخدم الموجهة.
  - `dir`: كائن تعريف الموجهة.

- `vnode`: the underlying VNode representing the bound element.
- `prevVnode`: the VNode representing the bound element from the previous render. Only available in the `beforeUpdate` and `updated` hooks.

كمثال، لنعتبر استخدام الموجهة التالي:

```vue-html
<div v-example:foo.bar="baz">
```

سيكون كائن الوسيط `binding` بالشكل التالي:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* قيمة `baz` */,
  oldValue: /* قيمة `baz` من التحديث السابق */
}
```

مثل الموجهات المدمجة، يمكن أن تكون وسائط الموجهات المخصصة ديناميكية. على سبيل المثال:

```vue-html
<div v-example:[arg]="value"></div>
```

سيُحدَّث وسيط الموجهة بشكل تفاعلي وفقًا لخاصية `arg` في حالة المكون.

:::tip ملاحظة 
باستثناء `el`، يجب عليك التعامل مع هذه الوسائط كقراءة فقط ولا تقم بتعديلها. إذا كنت بحاجة إلى مشاركة المعلومات عبر الخطافات، فننصحك بالقيام بذلك من خلال [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) للعنصر.
:::

## اختصار الدالة {#function-shorthand}

من الشائع أن يكون للموجهة المخصصة نفس السلوك فقط بخطافات `mounted` و `updated`، بدون حاجة للخطافات الأخرى. في هذه الحالات، يمكننا تعريف الموجهة كدالة:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // هذا سيستدعى لكل من `mounted` و `updated`
  el.style.color = binding.value
})
```

##  الكائنات المجردة {#object-literals}

إذا كانت الموجهة الخاصة بك تحتاج إلى عدة قيم، يمكنك أيضًا إرسال كائن مجرد JavaScript. تذكر أنه يمكن للموجهات أن تأخذ أي تعبير JavaScript سليم.

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## الاستخدام على المكونات {#usage-on-components}

:::warning Not recommended
Using custom directives on components is not recommended. Unexpected behaviour may occur when a component has multiple root nodes.
:::

عند استخدامها على المكونات، ستطبق الموجهات المخصصة دائمًا على العنصر الجذري للمكون، مثل [السمات المستترة](/guide/components/attrs).

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- قالب MyComponent -->

<div><!-- سيتم تطبيق الموجهة v-demo هنا -->
  <span>محتوى المكون</span>
</div>
```

Note that components can potentially have more than one root node. When applied to a multi-root component, a directive will be ignored and a warning will be thrown. Unlike attributes, directives can't be passed to a different element with `v-bind="$attrs"`.
