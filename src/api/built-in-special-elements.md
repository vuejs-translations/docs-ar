# عناصر خاصة مدمجة {#built-in-special-elements}

:::info ليسوا مكونات
`<component>`، `<slot>` و `<template>` هي ميزات تشبه المكونات وجزء من صيغة القوالب. ولكن ليست مكونات حقيقية وتُزال أثناء تصريف القوالب. وبالتالي، تُكتب بشكل اعتيادي بأحرف صغيرة في القوالب.
:::

## `<component>` {#component}

"مكون وصفي" لتصيير المكونات أو العناصر الديناميكية.

- **الخاصيات**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **التفاصيل**

  المكون الفعلي الذي سيُصيَّر يُحدَّد بواسطة خاصية `is`.

  - عندما يكون `is` سلسلة نصية، فقد يكون اسم علامة HTML أو اسم مسجل لمكون.

  - بدلاً من ذلك، يمكن ربط `is` مباشرةً بتعريف مكون.

- **مثال**

  تصيير المكونات بالاسم المسجل (واجهة الخيارات):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  تصيير المكونات بالتعريف (  الواجهة التركيبية مع`<script setup>`):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  تصيير عناصر HTML:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  يمكن تمرير جميع المكونات المدمجة إلى `is`، ولكن يجب تسجيلها إذا كنت تريد تمريرها بالاسم. على سبيل المثال:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  لا يلزم التسجيل إذا قمت بتمرير المكون نفسه إلى `is` بدلاً من اسمه، على سبيل المثال في `<script setup>`.

  إذا استخدم `v-model` على عنصر `<component>`، فسيقوم مُصرف القوالب بتوسيعه إلى خاصية `modelValue` ومستمع حدث `update:modelValue`، تمامًا كما سيفعل لأي مكون آخر. ومع ذلك، لن يكون ذلك متوافقًا مع عناصر HTML الأصلية، مثل `<input>` أو `<select>`، ونتيجة لذلك، لن يعمل استخدام `v-model` مع عنصر HTML أصلي يتم يُنشأ بشكل ديناميكي:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- هذا لن يعمل لأن 'input' هو عنصر HTML أصلي -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  في الواقع، هذه الحالة الحدية ليست شائعة لأن حقول النموذج الأصلية عادة ما تكون ملفوفة في مكونات في التطبيقات الحقيقية. إذا كنت بحاجة إلى استخدام عنصر أصلي مباشرةً، فيمكنك تقسيم `v-model` إلى سمة وحدث يدويًا.

- **اطلع أيضًا على** [المكونات الديناميكية](/guide/essentials/component-basics#dynamic-components)

## `<slot>` {#slot}

يُشير إلى مخارج محتوى المنافذ في القوالب.

- **التفاصيل**

  ```ts
  interface SlotProps {
    /**
     * أي خاصيات مررت إلى <slot> لتمريرها كوسائط
     * للمنافذ المحددة
    */
    [key: string]: any
    /**
     * محجوز لتحديد اسم المنفذ.
     */
    name?: string
  }
  ```

- **التفاصيل**

   يمكن لعنصر `<slot>` استخدام الخاصية `name` لتحديد اسم المنفذ. عندما لا يُحدَّد `name`، فسيقوم بتصيير المنفذ الافتراضي. ستمرر السمات الإضافية الممررة إلى عنصر المنفذ كخاصيات المنفذ إلى المنفذ ذو النطاق المعرف في المكون الأب.

  سيستبدل العنصر نفسه بمحتوى المنفذ المطابق له.

  تُصرَّف عناصر `<slot>` في قوالب Vue إلى JavaScript، لذلك لا ينبغي الخلط بينها وبين [عناصر `<slot>` الأصلية](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

- **اطلع أيضًا على** [المكونات - المنافذ](/guide/components/slots)

## `<template>` {#template}

يُستخدم عنصر `<template>` كعنصر نائب عندما نريد استخدام موجهة مدمجة دون تصيير عنصر في DOM.

- **التفاصيل**

  تُشغَّل المعالجة الخاصة لـ `<template>` فقط إذا استخدمت مع واحدة من هذه الموجهات:

  - `v-if`, `v-else-if`, أو `v-else`
  - `v-for`
  - `v-slot`

  إذا لم تكن أي من تلك الموجهات موجودة، فستُصيَّر بدلاً من ذلك كعنصر `<template>` [الأصلي](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

  يمكن أن يحتوي `<template>` مع `v-for` أيضًا على [خاصية `key`](/api/built-in-special-attributes#key). سيتم تجاهل جميع السمات والموجهات الأخرى، لأنها ليست ذات معنى بدون عنصر مقابل.

  تستخدم المكونات أحادية الملف [عنصر `<template>` على المستوى الأعلى](/api/sfc-spec#language-blocks) لتغليف القالب بأكمله. هذا الاستخدام منفصل عن استخدام `<template>` الموضح أعلاه. لا يشكل العنصر على المستوى الأعلى جزءًا من القالب نفسه ولا يدعم صيغة القالب، مثل الموجهات.

- **اطلع أيضًا على**
  - [الدليل - `v-if` على `<template>`](/guide/essentials/conditional#v-if-on-template)
  - [الدليل - `v-for` على `<template>`](/guide/essentials/list#v-for-on-template)
  - [الدليل - المنافذ المسماة](/guide/components/slots#named-slots)
