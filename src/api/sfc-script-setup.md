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

### القيم الافتراضية للخاصيات عند استخدام التصريح بالأنواع {#default-props-values-when-using-type-declaration}

أحد العيوب في التصريح النوعي فقط لـ`defineProps` هو أنه لا توجد طريقة لتوفير القيم الافتراضية للخاصيات. لحل هذه المشكلة، وُفِّرت أيضا التعليمة العامة للمصرف المسماة `withDefaults`:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'مرحبا',
  labels: () => ['one', 'two']
})
```

سيُصرف هذا إلى خيارات `default` للخصائص في زمن التشغيل. بالإضافة إلى ذلك، توفر الدالة المساعدة `withDefaults` فحوصات النوع للقيم الافتراضية، ويضمن أن نوع `props` المُرجع يحتوي على العلامات الاختيارية المزيلة للخاصيات التي لها قيم افتراضية مصرح بها.

## ()defineExpose {#defineexpose}

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

- مدعوم فقط في 3.3+.
- هذه تعليمة عامة. سترفع الخيارات إلى نطاق الوحدة ولا يمكنها الوصول إلى المتغيرات المحلية في `<script setup>` التي ليست ثوابت حرفية.

## ()defineSlots<sup class="vt-badge ts"/> {#defineslots}

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

- مدعوم فقط في 3.3+.

## `()useSlots` و `()useAttrs` {#useslots-useattrs}

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

:::warning ملاحظة
يجب استخدام `()async setup` بالتزامن مع `Suspense`، والتي لا تزال تعتبر ميزة تجريبية حاليًا. نخطط لإنهائها وتوثيقها في إصدار مستقبلي - ولكن إذا كنت فضوليًا الآن، يمكنك الرجوع إلى [اختباراتها](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts) لمعرفة كيفية عملها.
:::

## الأنواع المُعمَّمة <sup class="vt-badge ts" /> {#generics}

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

## التقييدات {#restrictions}

* بسبب الفرق في دلالات تنفيذ الوحدة، تعتمد الشيفرة داخل `<script setup>` على سياق ملف المكون. عند نقلها إلى ملفات خارجية `js.` أو `ts.`، قد يؤدي ذلك إلى الارتباك لكل من المطورين والأدوات. لذلك، **لا يمكن استخدام `<script setup>`** مع السمة `src`.
* `<script setup>` لا تدعم قالب  جذر المكون في الـDOM .([مناقشة ذات صلة](https://github.com/vuejs/core/issues/8391))
