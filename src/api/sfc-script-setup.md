# \<script setup> {#script-setup}

`<script setup>` هو صيغة تجميلية في وقت التصريف لاستخدام الواجهة التركيبية داخل المكونات أحادية الملف (SFCs). إنها الصيغة الموصى بها إذا كنت تستخدم كل من SFCs والواجهة التركيبية. توفر عددًا من المزايا مقارنة بالصيغة العادية `<script>`:

- شيفرة أكثر إيجازا
- القدرة على التصريح بالخاصيات والأحداث المرسلة باستخدام TypeScript النقي
- أداء تشغيل أفضل (يصرف القالب إلى دالة تخريج في نفس النطاق، دون وجود وسيط بيني)
- أداء أفضل للمحرر لاستنباط النوع (أقل عمل لخادم اللغة لاستخراج الأنواع من الشيفرة)

## صيغة أساسية {#basic-syntax}

للتصريح بالصيغة، أضف السمة `setup` إلى كتلة `<script>`:

```vue
<script setup>
console.log('hello script setup')
</script>
```

الشيفرة الداخلية تصرف كمحتوى للدالة `()setup` للمكون. هذا يعني أنه على عكس `<script>` العادي، الذي يُشغل مرة واحدة فقط عند استيراد المكون لأول مرة، الشيفرة داخل `<script setup>` ستُشغل **في كل مرة تُنشأ فيها نسخة من المكون**.

### الربطات ذات المستوى الأعلى معروضة للقالب {#top-level-bindings-are-exposed-to-template}

عند استخدام `<script setup>`، أي ربطات ذات مستوى عالٍ (بما في ذلك المتغيرات وتصريحات الدوال والاستيرادات) المعلنة داخل `<script setup>` يمكن استخدامها مباشرة في القالب:

```vue
<script setup>
// متغير
const msg = 'Hello!'

// دوال 
function log() {
  console.log(msg)
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
</template>
```

الاستيرادات معروضة بنفس الطريقة. هذا يعني أنه يمكنك استخدام دالة المساعدة المستوردة مباشرة في تعبيرات القالب دون الحاجة إلى عرضها عبر خيار `methods`:

```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('مرحبا') }}</div>
</template>
```

## التفاعلية {#reactivity}

يجب إنشاء الحالة التفاعلية بوضوح باستخدام [واجهات التفاعلية](./reactivity-core). على غرار القيم المُرجعة من دالة `setup()`، يتم فك تغليف الإشارات تلقائيًا عند الإشارة إليها في القوالب:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## استخدام المكونات{#using-components}

القيم في نطاق `<script setup>` يمكن استخدامها مباشرة كأسماء عناصر مخصصة للمكونات :

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

اعتبر `MyComponent` كما لو كانت مشار إليها كمتغير. إذا كنت قد استخدمت JSX، فإن النموذج الذهني مشابه هنا. النسخة أسياخ الشواء المعادلة `<my-component>` تعمل أيضًا في القالب - ومع ذلك، يوصى بشدة باستخدام وسوم المكونات بصيغة باسكال (PascalCase) للحصول على التناسق. كما أنه يساعد على تمييزها عن العناصر المخصصة الأصلية.

### المكونات الديناميكية {#dynamic-components}

بما أن المكونات مشار إليها كمتغيرات بدلاً من التسجيل تحت مفاتيح نصية، يجب علينا استخدام الربط الديناميكي `is:` عند استخدام المكونات الديناميكية داخل `<script setup>`:

```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

لاحظ كيف يمكن استخدام المكونات كمتغيرات في تعبير ثلاثي.

### المكونات المتكررة {#recursive-components}

يمكن للمكونات أحادية الملف الإشارة إلى نفسها ضمنيًا عبر اسم الملف. على سبيل المثال، يمكن لملف يسمى `FooBar.vue` الإشارة إلى نفسه كـ `<FooBar/>` في قالبه.

لاحظ أن هذا له أولوية أقل من المكونات المستوردة. إذا كان لديك استيراد مسمى يتعارض مع الاسم المستنتج للمكون، يمكنك تسمية الاستيراد:

```js
import { FooBar as FooBarChild } from './components'
```

### المكونات ذات المجال الإسمي {#namespaced-components}

يمكنك استخدام علامات المكونات مع النقاط مثل `<Foo.Bar>` للإشارة إلى المكونات المتداخلة تحت خصائص الكائن. هذا مفيد عند استيراد مكونات متعددة من ملف واحد:

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

## استخدام الموجهات المخصصة {#using-custom-directives}

الموجهات المخصصة المسجلة على المستوى العامي تعمل كما هو معتاد. الموجهات المخصصة المحلية لا تحتاج إلى تسجيل صريح مع `<script setup>`، ولكن يجب أن تتبع مخطط التسمية `vNameOfDirective`:

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    //  افعل شيئًا ما مع العنصر
  }
}
</script>
<template>
  <h1 v-my-directive>هذه ترويسة</h1>
</template>
```

إذا كنت تستورد موجهة من مكان آخر، يمكن إعادة تسميتها لتناسب مخطط التسمية المطلوب:

```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

## ()defineProps و ()defineEmits {#defineprops-defineemits}

للتصريح بالخيارات مثل `props` و `emits` مع دعم استنباط النوع الكامل، يمكننا استخدام واجهات `defineProps` و `defineEmits`، والتي تتوفر تلقائيًا داخل `<script setup>`:

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
//  شيفرة الإعداد
</script>
```

- `defineProps` و `defineEmits` هما **تعليمات عامة للمصرف** فقط يمكن استخدامهما داخل `<script setup>`، ولا يحتاجان إلى استيراد، ويصرفان عند معالجة `<script setup>`.

- `defineProps` تقبل نفس القيمة كخيار `props`، بينما `defineEmits` تقبل نفس القيمة كخيار `emits`.

- `defineProps` و `defineEmits` توفر استنباط نوع صحيح استنادًا إلى الخيارات الممررة.

- الخيارات الممررة إلى `defineProps` و `defineEmits` سترفعها خارج setup إلى نطاق الوحدة. لذلك، لا يمكن للخيارات الإشارة إلى المتغيرات المحلية المعلنة في نطاق setup. سيؤدي القيام بذلك إلى خطأ في التصريف. ومع ذلك، _يمكنها_ الإشارة إلى الربطات المستوردة لأنها في نطاق الوحدة أيضًا.

### التصريح بالخاصيات/الأحداث المرسلة<sup class="vt-badge ts" /> {#type-only-props-emit-declarations}

يمكن أيضًا التصريح بالخاصيات والأحداث المرسلة باستخدام صيغة النوع النقية عن طريق تمرير وسيط نوع حرفي إلى `defineProps` أو `defineEmits`:

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: بديل، صيغة أكثر إيجازا
const emit = defineEmits<{
  change: [id: number] // الصيغة المسماة صف
  update: [value: string]
}>()
```

- `defineProps` أو `defineEmits` يمكنهم استخدام إما التصريح في زمن التشغيل أو التصريح النوعي. استخدام كلاهما في نفس الوقت سيؤدي إلى خطأ في التصريف.

- عند استخدام التصريح النوعي، يُنشأ التصريح في زمن التشغيل النوافق من التحليل الثابت تلقائيًا لإزالة الحاجة إلى التصريح المزدوج والتأكد من سلوك زمن التشغيل الصحيح.

  - في وضع التطوير، سيحاول المصرف استنباط التحقق من صحة الأنواع المقابلة في زمن التشغيل. على سبيل المثال هنا `foo: String` يُستنبط من النوع `foo: string`. إذا كان النوع مرجعًا إلى نوع مستورد، فستكون النتيجة المستنبطة `foo: null` (يساوي نوع `any`) لأن المصرف ليس لديه معلومات حول الملفات الخارجية.

  - في وضع الإنتاج، سيقوم المصرف بإنشاء تصريح بتنسيق المصفوفة لتقليل حجم الحزمة (ستصرف الخاصيات هنا إلى `['foo', 'bar']`)

- في الإصدار 3.2 وأقل، كان المعامل النوعي العام لـ `()defineProps` محدودًا بالنوع الحرفي أو مرجع إلى واجهة محلية.

  حُلّ هذا القيد في 3.3. يدعم أحدث إصدار من Vue الإشارة إلى الأنواع المستوردة ومجموعة محدودة من الأنواع المعقدة في موضع المعامل النوعي. ومع ذلك، لأن تحويل النوع في زمن التشغيل لا يزال قائمًا على AST (شجرة الصيغة المجردة)، فإن بعض الأنواع المعقدة التي تتطلب تحليل النوع الفعلي، على سبيل المثال الأنواع الشرطية، غير مدعومة. يمكنك استخدام الأنواع الشرطية لنوع خاصية واحدة، ولكن ليس كائن الخاصيات بأكمله.

### Reactive Props Destructure <sup class="vt-badge" data-text="3.5+" /> {#reactive-props-destructure}

In Vue 3.5 and above, variables destructured from the return value of `defineProps` are reactive. Vue's compiler automatically prepends `props.` when code in the same `<script setup>` block accesses variables destructured from `defineProps`:

```ts
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // runs only once before 3.5
  // re-runs when the "foo" prop changes in 3.5+
  console.log(foo)
})
```

The above is compiled to the following equivalent:

```js {5}
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` transformed to `props.foo` by the compiler
  console.log(props.foo)
})
```

In addition, you can use JavaScript's native default value syntax to declare default values for the props. This is particularly useful when using the type-based props declaration:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

### Default props values when using type declaration <sup class="vt-badge ts" /> {#default-props-values-when-using-type-declaration}

In 3.5 and above, default values can be naturally declared when using Reactive Props Destructure. But in 3.4 and below, Reactive Props Destructure is not enabled by default. In order to declare props default values with type-based declaration, the `withDefaults` compiler macro is needed:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'مرحبا',
  labels: () => ['one', 'two']
})
```

سيُصرف هذا إلى خيارات `default` للخصائص في زمن التشغيل. بالإضافة إلى ذلك، توفر الدالة المساعدة `withDefaults` فحوصات النوع للقيم الافتراضية، ويضمن أن نوع `props` المُرجع يحتوي على العلامات الاختيارية المزيلة للخاصيات التي لها قيم افتراضية مصرح بها.

:::info
Note that default values for mutable reference types (like arrays or objects) should be wrapped in functions when using `withDefaults` to avoid accidental modification and external side effects. This ensures each component instance gets its own copy of the default value. This is **not** necessary when using default values with destructure.
:::

## defineModel() {#definemodel}

- Only available in 3.4+

This macro can be used to declare a two-way binding prop that can be consumed via `v-model` from the parent component. Example usage is also discussed in the [Component `v-model`](/guide/components/v-model) guide.

Under the hood, this macro declares a model prop and a corresponding value update event. If the first argument is a literal string, it will be used as the prop name; Otherwise the prop name will default to `"modelValue"`. In both cases, you can also pass an additional object which can include the prop's options and the model ref's value transform options.

```js
// declares "modelValue" prop, consumed by parent via v-model
const model = defineModel()
// OR: declares "modelValue" prop with options
const model = defineModel({ type: String })

// emits "update:modelValue" when mutated
model.value = 'hello'

// declares "count" prop, consumed by parent via v-model:count
const count = defineModel('count')
// OR: declares "count" prop with options
const count = defineModel('count', { type: Number, default: 0 })

function inc() {
  // emits "update:count" when mutated
  count.value++
}
```

:::warning
If you have a `default` value for `defineModel` prop and you don't provide any value for this prop from the parent component, it can cause a de-synchronization between parent and child components. In the example below, the parent's `myRef` is undefined, but the child's `model` is 1:

```js
// child component:
const model = defineModel({ default: 1 })

// parent component:
const myRef = ref()
```

```html
<Child v-model="myRef"></Child>
```

:::

### Modifiers and Transformers {#modifiers-and-transformers}

To access modifiers used with the `v-model` directive, we can destructure the return value of `defineModel()` like this:

```js
const [modelValue, modelModifiers] = defineModel()

// corresponds to v-model.trim
if (modelModifiers.trim) {
  // ...
}
```

When a modifier is present, we likely need to transform the value when reading or syncing it back to the parent. We can achieve this by using the `get` and `set` transformer options:

```js
const [modelValue, modelModifiers] = defineModel({
  // get() omitted as it is not needed here
  set(value) {
    // if the .trim modifier is used, return trimmed value
    if (modelModifiers.trim) {
      return value.trim()
    }
    // otherwise, return the value as-is
    return value
  }
})
```

### Usage with TypeScript <sup class="vt-badge ts" /> {#usage-with-typescript}

Like `defineProps` and `defineEmits`, `defineModel` can also receive type arguments to specify the types of the model value and the modifiers:

```ts
const modelValue = defineModel<string>()
//    ^? Ref<string | undefined>

// default model with options, required removes possible undefined values
const modelValue = defineModel<string>({ required: true })
//    ^? Ref<string>

const [modelValue, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
//                 ^? Record<'trim' | 'uppercase', true | undefined>
```

## defineExpose() {#defineexpose}

المكونات التي تستخدم `<script setup>` هي **مغلقة افتراضيًا** - أي النسخة العامة للمكون، والتي يمكن إيجادها عبر مراجع القالب أو سلاسل `parent$`، لن تعرض أي من الربطات المعلنة داخل `<script setup>`.

لتعريض الخصائص بوضوح في مكون `<script setup>`، استخدم التعليمة العامة للمصرف `defineExpose`:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

عندما يحصل المكون الأب على نسخة من هذا المكون عبر مراجع القالب، ستكون النسخة المسترجعة على الشكل `{ a: number, b: number }` (تُفك الإشارات تلقائيًا تمامًا مثل النسخ العادية).

## ()defineOptions {#defineoptions}

- Only supported in 3.3+

يمكن استخدام هذه التعليمة للتصريح يخيارات المكون مباشرة داخل `<script setup>` دون الحاجة إلى استخدام كتلة `<script>` منفصلة:

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  customOptions: {
    /* ... */
  }
})
</script>
```

- هذه تعليمة عامة. سترفع الخيارات إلى نطاق الوحدة ولا يمكنها الوصول إلى المتغيرات المحلية في `<script setup>` التي ليست ثوابت حرفية.

## ()defineSlots<sup class="vt-badge ts"/> {#defineslots}

- Only supported in 3.3+

يمكن استخدام هذه التعليمة لتوفير تلميحات النوع لمحررات النصوص للتحقق من النوع واسم المنفذ.

`()defineSlots` تقبل وسيط نوعي فقط ولا تقبل وسائط في زمن التشغيل. يجب أن يكون الوسيط النوعي حرفي  حيث يكون مفتاح الخاصية هو اسم المنفذ، ونوع القيمة هو دالة المنفذ. أول وسيط للدالة هو الخاصيات التي يتوقع المنفذ استقبالها، وسيُستخدم نوعه لخاصيات المنفذ في القالب. يتم تجاهل نوع الإرجاع حاليًا ويمكن أن يكون `any`، ولكن قد نستفيد منه للتحقق من محتوى المنفذ في المستقبل.

كما أنها تُرجع كائن `slots`، والذي يعادل كائن `slots` المعرض على سياق خطاف `setup` أو المُرجع بواسطة `()useSlots`.

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

## `useSlots()` & `useAttrs()` {#useslots-useattrs}

يجب أن يكون استخدام `slots` و `attrs` داخل `<script setup>` نادرًا نسبيًا، لأنه يمكنك الوصول إليها مباشرة كـ `slots$` و `attrs$` في القالب. في الحالة النادرة التي تحتاج فيها إليهما، استخدم المساعدين `useSlots` و `useAttrs` على التوالي:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` و `useAttrs` هما دالتي زمن التشغيل فعليتين تُرجع ما يعادل `setupContext.slots` و `setupContext.attrs`. يمكن استخدامهما في دوال الواجهة التركيبية العادية أيضًا.

## الاستخدام إلى جانب `<script>` العادي {#usage-alongside-normal-script}

يمكن استخدام `<script setup>` إلى جانب `<script>` العادي. قد يكون هناك حاجة إلى `<script>` عادي في الحالات التي نحتاج فيها إلى:

- التصريح بالخيارات التي لا يمكن التعبير عنها في `<script setup>`، على سبيل المثال `inheritAttrs` أو الخيارات المخصصة الممكّنة عبر المكونات الإضافية (يمكن استبدالها بـ [`defineOptions`](/api/sfc-script-setup#defineoptions) في 3.3+).
- التصريح بالتصديرات المسماة.
- تشغيل الآثار الجانبية أو إنشاء الكائنات التي يجب أن تُشغل مرة واحدة فقط.

```vue
<script>
//  <script> عادي، يُنفذ في نطاق الوحدة (مرة واحدة فقط)
runSideEffectOnce()

//  التصريح بالخيارات الإضافية
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
//  يُنفذ في نطاق setup() (لكل نسخة)
</script>
```

الدعم لدمج `<script setup>` و `<script>` في نفس المكون محدود للسيناريوهات الموصوفة أعلاه. على وجه التحديد:

- **لا** تستخدم كتلة `<script>` منفصلة للخيارات التي يمكن تعريفها بالفعل باستخدام `<script setup>`، مثل `props` و `emits`.
- لا تُضاف المتغيرات التي أُنشئت داخل `<script setup>` كخاصيات إلى نسخة المكون، مما يجعلها غير قابلة للوصول من واجهة الخيارات. يُنصح بشدة بعدم خلط واجهات البرمجة بهذه الطريقة.

إذا وجدت نفسك في أحد السيناريوهات التي لا تُدعم، فيجب عليك النظر في التبديل إلى دالة [`()setup`](/api/composition-api-setup) صريحة، بدلاً من استخدام `<script setup>`.

## `await`ذات المستوى الأعلى   {#top-level-await}

يمكن استخدام `await` ذات المستوى الأعلى داخل `<script setup>`، وستُصرف الشيفرة الناتجة كـ `()async setup`:

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

بالإضافة إلى ذلك، سيُصرف التعبير المنتظر تلقائيًا في تنسيق يحافظ على سياق نسخة المكون الحالي بعد `await`.

:::warning Note
`async setup()` must be used in combination with [`Suspense`](/guide/built-ins/suspense.html), which is currently still an experimental feature. We plan to finalize and document it in a future release - but if you are curious now, you can refer to its [tests](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts) to see how it works.
:::

## Import Statements {#imports-statements}

Import statements in vue follow [ECMAScript module specification](https://nodejs.org/api/esm.html).
In addition, you can use aliases defined in your build tool configuration:

```vue
<script setup>
import { ref } from 'vue'
import { componentA } from './Components'
import { componentB } from '@/Components'
import { componentC } from '~/Components'
</script>
```

## Generics <sup class="vt-badge ts" /> {#generics}

يمكن التصريح بالوسائط النوعية المُعمَّمة باستخدام السمة `generic` على علامة `<script>`:

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

قيمة `generic` تعمل بالضبط كقائمة الوسائط بين `<...>` في TypeScript. على سبيل المثال، يمكنك استخدام وسائط متعددة، قيود `extends`، أنواع افتراضية، والإشارة إلى الأنواع المستوردة:

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

In order to use a reference to a generic component in a `ref` you need to use the [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) library as `InstanceType` won't work.

```vue
<script
  setup
  lang="ts"
>
import componentWithoutGenerics from '../component-without-generics.vue';
import genericComponent from '../generic-component.vue';

import type { ComponentExposed } from 'vue-component-type-helpers';

// Works for a component without generics
ref<InstanceType<typeof componentWithoutGenerics>>();

ref<ComponentExposed<typeof genericComponent>>();
```

## Restrictions {#restrictions}

- Due to the difference in module execution semantics, code inside `<script setup>` relies on the context of an SFC. When moved into external `.js` or `.ts` files, it may lead to confusion for both developers and tools. Therefore, **`<script setup>`** cannot be used with the `src` attribute.
- `<script setup>` does not support In-DOM Root Component Template.([Related Discussion](https://github.com/vuejs/core/issues/8391))
