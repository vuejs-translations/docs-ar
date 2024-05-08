<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // The docs for v-model used to be part of this page. Attempt to redirect outdated links.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# أحداث المكونات {#component-events}

> لقراءة هذه الصفحة يجب عليك أولا الاطلاع على [أساسيات المكونات](/guide/essentials/component-basics). ثم العودة إلى هنا.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="درس Vue.js مجاني حول الأحداث المخصصة"/>
</div>

## الإرسال والاستماع للأحداث {#emitting-and-listening-to-events}

يمكن للمكون إرسال أحداث مخصصة مباشرة في تعبيرات القالب (على سبيل المثال ، في معالج `v-on`) باستخدام التابع المدمج `emit$`:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">انفر الزر</button>
```

<div class="options-api">

التابع `$emit()` متوفر أيضًا على نسخة المكون باستخدام `this.$emit()`:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

المكون الأب يمكنه الاستماع لها باستخدام `v-on`:

```vue-html
<MyComponent @some-event="callback" />
```

المعدل `.once` مدعوم أيضًا على مستمعي أحداث المكون:

```vue-html
<MyComponent @some-event.once="callback" />
```

مثل المكونات والخصائص ، توفر أسماء الأحداث تحويل تلقائي لحالة الأحرف. يمكن ملاحظة أننا أرسلنا حدث مكتوب بنمط سنام الجمل camelCase ، لكن يمكننا الاستماع له باستخدام مستمع مكتوب بنمط أسياخ الشواء kebab-case داخل المكون الأب. كما في [تسمية الخاصيات](/guide/components/props#prop-name-casing) ، نوصي باستخدام مستمعي أحداث بنمط kebab-case في القوالب.

:::tip ملاحظة
على عكس أحداث DOM الأصلية، فإن أحداث المكونات المرسلة لا تنتشر عبر شجرة مكونات التطبيق. يمكنك الاستماع فقط إلى الأحداث المرسلة من المكون الابن المباشر. إذا كان هناك حاجة للتواصل بين المكونات الشقيقة أو المكونات المتداخلة بعمق، فاستخدم ناقل خارجي للأحداث أو [حلول إدارة الحالة العامة](/guide/scaling-up/state-management).
:::

## وسائط الحدث {#event-arguments}

في بعض الأحيان ، يكون من المفيد إرسال قيمة معينة مع الحدث. على سبيل المثال، قد نرغب في أن يكون المكون `<BlogPost>` مسؤولًا عن حجم تكبير النص. في هذه الحالات ، يمكننا إرسال وسائط إضافية إلى `emit$` لتوفير هذه القيمة:

```vue-html
<button @click="$emit('increaseBy', 1)">
زيادة بـ 1
</button>
```

ثم، عندما نستمع إلى الحدث في المكون الأب، يمكننا استخدام الدالة السهمية السطرية كمستمع، والتي تسمح لنا بالوصول إلى وسيط الحدث المرسل:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

أو، إذا كان معالج الحدث عبارة عن تابع:

```vue-html
<MyButton @increase-by="increaseCount" />
```

ثم ستُمرَّر القيمة كأول وسيط لهذا التابع:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip ملاحظة
تمرر جميع الوسائط الإضافية المرسلة عبر `()emit$` بعد اسم الحدث إلى المستمع. على سبيل المثال ، مع `emit('foo', 1, 2, 3)$` ستتلقى دالة المستمع ثلاثة وسائط.
:::

## التصريح بالأحداث المرسلة {#declaring-emitted-events}

يمكن للمكون التصريح بشكل واضح عن الأحداث التي سيقوم بإرسالها باستخدام <span class="composition-api"> التعليمة العامة [`()defineEmits`](/api/sfc-script-setup#defineprops-defineemits) </span><span class="options-api">خيار [`emits`](/api/options-state#emits) </span>:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

`emit$` هو التابع الذي استخدمناه في `<template>` غير متاح داخل قسم `<script setup>` للمكون ، ولكن `()defineEmits` تعيد دالة مكافئة يمكننا استخدامها بدلاً من ذلك:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

التعليمة العامة `()defineEmits` **لا يمكن** استخدامها داخل دالة ، يجب وضعها مباشرة داخل `<script setup>` ، كما هو الحال في المثال أعلاه.

إذا كنت تستخدم الدالة `setup` بدلاً من `<script setup>` ، فيجب عليك الإعلان عن الأحداث باستخدام خيار [`emits`](/api/options-state#emits) ، ويتم توفير التابع `emit` في سياق `()setup` كوسيط ثاني:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

كما هو الحال مع الخاصيات الأخرى في سياق `()setup` ، يمكن تفكيك `emit` بأمان:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

خيار `emits` يدعم أيضًا صيغة الكائن، إذا كنت تستخدم الـTypescript تستطيع تمرير وسائط ذات نوع، والتي تسمح لنا بتنفيذ التحقق من صحة الحمولة الممررة للأحداث المرسلة في وقت التشغيل :

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    // اعد `true` أو `false` للإشارة إلى
    // نجاح / فشل التحقق
  }
})
</script>
```

إذا كنت تستخدم TypeScript مع `<script setup>` ، فمن الممكن أيضًا تعريف الأحداث المرسلة باستخدام التوصيفات النوعية البحتة:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

أكثر تفاصيل حول : [إضافة الأنواع إلى الأحداث المرسلة](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload: { email: string, password: string }) {
       // اعد true` أو `false` للإشارة إلى
       // نجاح / فشل التحقق
    }
  }
}
```

أكثر تفاصيل حول : [إضافة الأنواع إلى الأحداث المرسلة](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

</div>

على الرغم من أن الأمر اختياري، إلا أنه ينصح بتعريف جميع الأحداث المرسلة من أجل توثيق جيد لكيفية عمل المكون. كما يسمح لـ Vue باستبعاد المستمعين المعروفين من [السمات المستترة](/guide/components/attrs#v-on-listener-inheritance) ، وتجنب الحالات القصوى الناتجة عن أحداث الـDOM الموزعة يدويا من المكتبات الخارجية.

:::tip ملاحظة
إذا تم تعريف حدث أصلي (على سبيل المثال ، `click`) في خيار `emits` ، فسينصت المستمع الآن فقط إلى أحداث `click` المنشأة من المكون ولن يستجيب لأحداث `click` الأصلية.
:::

## التحقق من صحة الأحداث {#events-validation}

مثلما هو الحال بالنسبة للتحقق من صحة نوع الخاصية ، يمكن التحقق من صحة الحدث المرسل إذا تم تعريفه باستخدام صيغة الكائن بدلاً من صيغة المصفوفة.

لإضافة التحقق ، يعطىالحدث دالة كقيمة والتي تتلقى الوسائط الممررة إلى الاستدعاء <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> وتعيد قيمة منطقية لتشير إلى صحة الحدث من عدمها.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // لا يوجد تحقق
  click: null,

  // تحقق من حدث الإرسال
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('وسائط حدث الإرسال غير صالحة!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // لا يوجد تحقق
    click: null,

    // تحقق من حدث الإرسال
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('وسائط حدث الإرسال غير صالحة!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>

## الأحداث كخاصيات {#events-props}

يمكنك أيضًا تعريف وتمرير الأحداث كخاصيات، عن طريق إضافة النص `on` 
مع اسم الحدث بالحروف الكبيرة. استخدام `props.onEvent` له سلوك مختلف عن استخدام `emit('event')`، حيث سيمرر الأول فقط المستمع المعتمد على الخاصية (سواء `event@` أو `on-event:`)

:::warning
إذا مُرِّر كل من `:onEvent` و `event@` فقد يكون `props.onEvent` مصفوفة من الدوال بدلاً من دالة، هذا السلوك غير مستقر وقد يتغير في المستقبل.
:::

لهذا السبب، يُفضل استخدام `emit('event')` بدلاً من `props.onEvent` عند إرسال الأحداث.