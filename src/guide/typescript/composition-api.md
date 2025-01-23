# TypeScript مع الواجهة التركيبية {#typescript-with-composition-api}

> لقراءة هذه الصفحة يجب عليك أولا الاطلاع على  [استخدام Vue مع TypeScript](./overview).

## إضافة الأنواع لخاصيات المكون {#typing-component-props}

### استخدام `<script setup>` {#using-script-setup}

عند استخدام `<script setup>`، تدعم التعليمة العامة `()defineProps` تحديد أنواع الخاصيات على أساس الوسيط الذي مُرر:

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

هذا ما يُسمى بـ "التصريح أثناء زمن التشغيل"، لأن الوسيط المُمرر إلى `()defineProps` سيُستخدم كخيار `props` في زمن التشغيل.

ومع ذلك، فإنه عادة ما يكون أسهل تعريف الخاصيات باستخدام أنواع خالصة عبر وسيط معمم:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

هذا ما يُسمى بـ "التصريح على أساس الأنواع"، وسيحاول المصرف أن يفعل ما يمكنه من أجل تحديد خيارات زمن التشغيل المُقابلة للوسيط المعمم. في هذه الحالة، سيصرف المثال الثاني والأول بالضبط إلى خيارات زمن التشغيل المُماثلة.

يمكنك استخدام أو التصريح على أساس الأنواع أو التصريح أثناء زمن التشغيل، لكن لا يمكنك استخدامهما معا في نفس الوقت.

يمكننا أيضا نقل أنواع الخاصيات إلى نوع واجهة منفصل:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

This also works if `Props` is imported from an external source. This feature requires TypeScript to be a peer dependency of Vue.

```vue
<script setup lang="ts">
import type { Props } from './foo'

const props = defineProps<Props>()
</script>
```

#### Syntax Limitations {#syntax-limitations}

```vue
<script setup lang="ts">
import type { Props } from './foo'

const props = defineProps<Props>()
</script>
```

#### محدوديات الصيغة {#syntax-limitations}

في النسخة 3.2 وأقل، كان الوسيط النوعي لـ `()defineProps` محدودًا بالنوع الحرفي أو مرجع إلى واجهة محلية.

حُل هذا القيد في الإصدار 3.3. تدعم أحدث إصدارات Vue الإشارة إلى الأنواع المستوردة ومجموعة محدودة من الأنواع المعقدة في موضع وسيط النوع. ومع ذلك، لأن تحويل النوع إلى زمن التشغيل لا يزال يعتمد على AST، فإن بعض الأنواع المعقدة التي تتطلب تحليل النوع الفعلي ، على سبيل المثال الأنواع الشرطية، لا تُدعم. يمكنك استخدام الأنواع الشرطية لنوع خاصية واحدة ، ولكن ليس كائن الخاصيات بأكمله.

### القيم الافتراضية للخاصيات {#props-default-values}

عند استخدام التصريح على أساس الأنواع، فإننا نفقد القدرة على تعريف القيم الافتراضية للخاصيات. يمكن حل هذه المشكلة بواسطة التعليمة العامة للمصرف `withDefaults`:
When using type-based declaration, we lose the ability to declare default values for the props. This can be resolved by using [Reactive Props Destructure](/guide/components/props#reactive-props-destructure) <sup class="vt-badge" data-text="3.5+" />:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

In 3.4 and below, Reactive Props Destructure is not enabled by default. An alternative is to use the `withDefaults` compiler macro:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

هذا سيصرف إلى خيارات زمن التشغيل المعادلة للخيارات الافتراضية. بالإضافة إلى ذلك، توفر الدالة المساعدة `withDefaults` التحقق من الأنواع للقيم الافتراضية، وتضمن أن نوع الخاصيات المُرجع يحتوي على علامات اختيارية مزيلة للخاصيات التي لها قيم افتراضية مصرح بها.

:::info
Note that default values for mutable reference types (like arrays or objects) should be wrapped in functions when using `withDefaults` to avoid accidental modification and external side effects. This ensures each component instance gets its own copy of the default value. This is **not** necessary when using default values with destructure.
:::

### بدون `<script setup>` {#without-script-setup}

إذا كنت لا تستخدم `<script setup>`، فإنه من الضروري استخدام `()defineComponent` لتمكين استنباط نوع الخاصيات. يُستنبط نوع كائن الخاصيات المُمرر إلى `()setup` من الوسيط `props`.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- type: string
  }
})
```

### الأنواع المعقدة للخاصيات {#complex-prop-types}

باستخدام التصريح على أساس الأنواع، يمكن للخاصية استخدام نوع معقد كما هو الحال بالنسبة لأي نوع آخر:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```

بالنسبة للتصريح التشغيلي، يمكننا استخدام نوع `PropType`:

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

يعمل هذا بنفس الطريقة كما لو كنا نحدد خيار الخاصيات مباشرة:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    book: Object as PropType<Book>
  }
})
```

يُستخدم خيار الخاصيات `props` بشكل أكثر شيوعًا مع واجهة الخيارات ، لذا ستجد أمثلة أكثر تفصيلاً في دليل [TypeScript مع واجهة الخيارات ](/guide/typescript/options-api#typing-component-props). تنطبق التقنيات الموضحة في تلك الأمثلة أيضًا على التصريحات التشغيلية باستخدام `()defineProps`.

## تحديد نوع إرسالات المكون {#typing-component-emits}

في `<script setup>`، يمكن تحديد نوع دالة `emit` باستخدام إما التصريح التشغيلي أو التصريح على أساس الأنواع:

```vue
<script setup lang="ts">
// زمن التشغيل
const emit = defineEmits(['change', 'update'])

//  معتمدة على الخيارات
const emit = defineEmits({
  change: (id: number) => {
    // تعيد `true` أو `false` للإشارة إلى
    // نجاح / فشل التحقق
  },
  update: (value: string) => {
    // تعيد `true` أو `false` للإشارة إلى
    // نجاح / فشل التحقق
  }
})

// على أساس الأنواع
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

نوع الوسيط يمكن أن يكون مما يلي:

1. نوع دالة قابلة للاستدعاء، ولكن مكتوبة كنوع حرفي مع [توقيعات الاستدعاء](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures). سيستخدم كنوع الدالة `emit` المُرجعة.
2. نوع حرفي حيث تكون المفاتيح هي أسماء الأحداث ، والقيم هي أنواع مصفوفة / صف تمثل المعاملات المقبولة الإضافية للحدث. يستخدم المثال أعلاه الصفوف المسماة حتى يمكن لكل وسيط أن يكون له اسم صريح.

كما نرى، فإن تصريح النوع يمنحنا تحكمًا أدق في قيود النوع للأحداث المرسلة.

عند عدم استخدام `<script setup>`، يمكن لـ `()defineComponent` استنباط الأحداث المسموح بها لدالة `emit` المُعرضة على سياق الإعداد:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- التحقق من النوع/ التكملة الآلية
  }
})
```

## تحديد نوع `()ref` {#typing-ref}

يُستنبط نوع المرجع التفاعلي (ref) من القيمة الأولية: 

```ts
import { ref } from 'vue'

// النوع المستنبط: Ref<number>
const year = ref(2020)

// => خطأ TS: لا يمكن تعيين نوع 'string' إلى نوع 'number'.
year.value = '2020'
```

في بعض الأحيان ، قد نحتاج إلى تحديد أنواع معقدة لقيمة المرجع الداخلية. يمكننا القيام بذلك باستخدام نوع `Ref`:

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // صحيح!
```

أو ، عن طريق تمرير وسيط نوعي عند استدعاء `ref()` لتجاوز الاستنباط الافتراضي:

```ts
// النوع الناتج: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // صحيح!
```

إذا قمت بتحديد وسيط نوعي عام لكن تجاهلت القيمة الأولية ، فسيكون النوع الناتج نوعا متحدا يتضمن `undefined`:

```ts
// النوع المستنبط: Ref<number | undefined>
const n = ref<number>()
```

## تحديد نوع `()reactive` {#typing-reactive}

يستنبط `()reactive` أيضا النوع من الوسيط النوعي الخاص به:

```ts
import { reactive } from 'vue'

// النوع المستنبط: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

لتحديد نوع خاصية `reactive` ، يمكننا استخدام واجهات:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip نصيحة
لا يُوصى باستخدام وسيط نوعي عام لـ `()reactive` لأن النوع المُرجع ، والذي يتعامل مع فك المرجع التفاعلي المتداخل ، هو مختلف عن نوع وسيط النوع المعمم.
:::

## تحديد نوع `()computed` {#typing-computed}

يستنبط `()computed` نوعه بناءً على قيمة الإرجاع للمُحصل:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// النوع المستنبط: ComputedRef<number>
const double = computed(() => count.value * 2)

// => خطأ TS: لا يوجد خاصية 'split' على النوع 'number'.
const result = double.value.split('')
```

يمكنك أيضًا تحديد نوع محدد عبر وسيط نوعي معمم:

```ts
const double = computed<number>(() => {
  // خطأ في النوع إذا لم يرجع هذا الرقم
})
```

## تحديد نوع معالجات الأحداث {#typing-event-handlers}

عند التعامل مع أحداث DOM الأصلية ، قد يكون من المفيد تحديد الوسيط النوعي الذي نمرره إلى المعالج بشكل صحيح. دعونا نلقي نظرة على هذا المثال:

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` يحتوي على نوع `any` بشكل ضمني
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

بدون توصيفات النوع ، سيكون وسيط `event` ضمنيًا لديه نوع `any`. سيؤدي هذا أيضًا إلى خطأ TS إذا كان `"strict": true` أو `"noImplicitAny": true` التي تستخدامهما في `tsconfig.json`. لذلك ، يُوصى بتوصيف النوع الخاص بوسيط معالجات الأحداث بشكل صريح. بالإضافة إلى ذلك ، قد تحتاج إلى تحويل صريح للخصائص على `event`:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## تحديد النوع لدوال التزويد و الحقن {#typing-provide-inject}

 عادة تجرى عملية التزويد والحقن في مكونات مستقلة. لتحديد النوع الصحيح للقيم المحقونة ، توفر Vue واجهة `InjectionKey` ، وهي نوع معمم يستند على `Symbol`. يمكن استخدامه لمزامنة نوع القيمة المحقونة بين المزود والمستهلك:

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') //  تزويد قيمة غير سلسلة نصية ستؤدي إلى خطأ
const foo = inject(key) // نوع foo: string | undefined
```

يُوصى بوضع مفتاح الحقن في ملف منفصل حتى يمكن استيراده في مكونات متعددة.

عند استخدام مفاتيح الحقن النصية ، سيكون نوع القيمة المحقونة `unknown` ، ويحتاج إلى تعريف صريح عبر وسيط نوعي معمم:

```ts
const foo = inject<string>('foo') // type: string | undefined
```

لاحظ أن القيمة المحقونة لا يزال ممكنًا أن تكون `undefined` ، لأنه لا يوجد ضمان بأن مزود سيقدم هذه القيمة في وقت التشغيل.

يمكن إزالة نوع `undefined` عن طريق تزويد قيمة افتراضية:

```ts
const foo = inject<string>('foo', 'bar') // type: string
```

إذا كنت متأكدًا من أن القيمة مزودة دائمًا ، يمكنك أيضًا تحويل القيمة:

```ts
const foo = inject('foo') as string
```

## إضافة الأنواع إلى مراجع القالب{#typing-template-refs}

يجب إنشاء مراجع القالب بوسيط نوعي معمم صريح وقيمة افتراضية `null`:

With Vue 3.5 and `@vue/language-tools` 2.1 (powering both the IDE language service and `vue-tsc`), the type of refs created by `useTemplateRef()` in SFCs can be **automatically inferred** for static refs based on what element the matching `ref` attribute is used on.

In cases where auto-inference is not possible, you can still cast the template ref to an explicit type via the generic argument:

```ts
const el = useTemplateRef<HTMLInputElement>('el')
```

<details>
<summary>Usage before 3.5</summary>

Template refs should be created with an explicit generic type argument and an initial value of `null`:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

</details>

To get the right DOM interface you can check pages like [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#technical_summary).

## تحديد نوع مراجع القالب للمكون {#typing-component-template-refs}

## Typing Component Template Refs {#typing-component-template-refs}

With Vue 3.5 and `@vue/language-tools` 2.1 (powering both the IDE language service and `vue-tsc`), the type of refs created by `useTemplateRef()` in SFCs can be **automatically inferred** for static refs based on what element or component the matching `ref` attribute is used on.

In cases where auto-inference is not possible (e.g. non-SFC usage or dynamic components), you can still cast the template ref to an explicit type via the generic argument.

In order to get the instance type of an imported component, we need to first get its type via `typeof`, then use TypeScript's built-in `InstanceType` utility to extract its instance type:

```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

type FooType = InstanceType<typeof Foo>
type BarType = InstanceType<typeof Bar>

const compRef = useTemplateRef<FooType | BarType>('comp')
</script>

<template>
  <component :is="Math.random() > 0.5 ? Foo : Bar" ref="comp" />
</template>
```

In cases where the exact type of the component isn't available or isn't important, `ComponentPublicInstance` can be used instead. This will only include properties that are shared by all components, such as `$el`:

```ts
import { useTemplateRef } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = useTemplateRef<ComponentPublicInstance>('child')
```

In cases where the component referenced is a [generic component](/guide/typescript/overview.html#generic-components), for instance `MyGenericModal`:

```vue
<!-- MyGenericModal.vue -->
<script setup lang="ts" generic="ContentType extends string | number">
import { ref } from 'vue'

const content = ref<ContentType | null>(null)

const open = (newContent: ContentType) => (content.value = newContent)

defineExpose({
  open
})
</script>
```

It needs to be referenced using `ComponentExposed` from the [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) library as `InstanceType` won't work.

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import MyGenericModal from './MyGenericModal.vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

const modal = useTemplateRef<ComponentExposed<typeof MyGenericModal>>('modal')

const openModal = () => {
  modal.value?.open('newValue')
}
</script>
```

Note that with `@vue/language-tools` 2.1+, static template refs' types can be automatically inferred and the above is only needed in edge cases.
