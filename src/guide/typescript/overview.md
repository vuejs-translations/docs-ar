---
outline: deep
---

# استخدام Vue مع TypeScript {#using-vue-with-typescript}

نظام الأنواع مثل TypeScript يمكنه اكتشاف العديد من الأخطاء الشائعة عبر التحليل الساكن في وقت البناء. هذا يقلل من فرصة الأخطاء في وقت التشغيل في مرحلة الإنتاج ، ويسمح لنا أيضًا بالتحكم بشكل أكثر تأكيدًا في إعادة تنظيم الشيفرة في التطبيقات الكبيرة. TypeScript يحسن أيضًا تركيز المطورين عبر الإكمال التلقائي المستند إلى النوع في محررات الشيفرات.

Vue مكتوب بلغة TypeScript ويوفر دعم TypeScript بدرجة أولى، جميع حزم Vue الرسمية تأتي مع تعريفات الأنواع المجمعة التي يجب أن تعمل بشكل مباشر.

## إعداد المشروع {#project-setup}

[أداة `create-vue`](https://github.com/vuejs/create-vue), هي أداة إنشاء المشاريع الرسمية ، تقدم خيارات لإنشاء مشروع Vue مع دعم Vite و TypeScript.

### نظرة شاملة {#overview}

مع الإعداد المعتمد على Vite ، يصرف خادم التطوير والمجمع فقط ولا تُنفذ أي عملية فحص للأنواع. هذا يضمن أن خادوم تطوير Vite يبقى سريعًا بشكل مذهل حتى عند استخدام TypeScript.

- خلال عملية التطوير ، نوصي بالاعتماد على [إعداد](#ide-support) جيد للمحرر للحصول على ملاحظات فورية حول الأخطاء النوعية.

- إذا كنت تستخدم SFC ، فاستخدم [أداة `vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/vue-tsc) للتحقق من الأنواع وإنشاء تعريفات الأنواع عبر سطر الأوامر. `vue-tsc` هو عبارة عن متحكم في الأوامر ، وهو واجهة سطر الأوامر الخاصة بـ TypeScript. يعمل بشكل كبير على نفس الطريقة مثل `tsc` باستثناء أنه يدعم SFC Vue بالإضافة إلى ملفات TypeScript. يمكنك تشغيل `vue-tsc` في وضع مراقبة في الوقت نفسه مع خادوم تطوير Vite ، أو استخدام ملحق Vite مثل [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) الذي يقوم بتشغيل التحققات في موضع عمل منفصل.

- Vue CLI يوفر أيضًا دعم TypeScript ، ولكن لم يعد موصى به. اطلع على  [الملاحظات أدناه](#note-on-vue-cli-and-ts-loader).

### دعم محررات النصوص {#ide-support}

- [Visual Studio Code](https://code.visualstudio.com/) (VSCode) موصى به بشدة لدعمه الرائع لـ TypeScript.

  - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) هو ملحق VSCode الرسمي الذي يوفر دعم TypeScript داخل SFC Vue ، بالإضافة إلى العديد من الميزات الرائعة.

    :::tip نصيحة
    Volar يستبدل [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) ، ملحق VSCode الرسمي السابق لـ Vue 2. إذا كنت تمتلك Vetur حاليًا ، تأكد من تعطيله في مشاريع Vue 3.
    :::

  - [ملحق TypeScript Vue ](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) مطلوب أيضًا للحصول على دعم الأنواع للمستوردات `*.vue` في ملفات TS.

- [WebStorm](https://www.jetbrains.com/webstorm/) يوفر أيضًا دعم TypeScript و Vue بشكل جاهز.محررات JetBrains الأخرى تدعمهم، إما بشكل جاهز أو عبر [ملحق مجاني](https://plugins.jetbrains.com/plugin/9442-vue-js). As of version 2023.2, WebStorm and the Vue Plugin come with built-in support for the Vue Language Server. You can set the Vue service to use Volar integration on all TypeScript versions, under Settings > Languages & Frameworks > TypeScript > Vue. By default, Volar will be used for TypeScript versions 5.0 and higher.

### إعداد `tsconfig.json` {#configuring-tsconfig-json}

المشاريع المنشأة عبر `create-vue` تتضمن `tsconfig.json` مُعد مسبقًا. يجرد الإعداد الأساسي في حزمة [`‎@vue/tsconfig`](https://github.com/vuejs/tsconfig) . داخل المشروع ، نستخدم [مراجع المشروع](https://www.typescriptlang.org/docs/handbook/project-references.html) لضمان الأنواع الصحيحة للشيفرة التي تعمل في بيئات مختلفة (على سبيل المثال ، يجب أن تكون الشيفرة الخاصة بالتطبيق والاختبار مختلفة في الحقول العامة).

عند إعداد `tsconfig.json` يدويًا ، يتضمن بعض الخيارات الملحوظة:

- [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) مضبوط على `true` لان Vite يستخدم [esbuild](https://esbuild.github.io/) لترجمه TypeScript  ويعتمد على محدوديات الترجمة للملف الواحد. [`compilerOptions.verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) هو [a superset of `isolatedModules`](https://github.com/microsoft/TypeScript/issues/53601) وهو خيار جيد أيضًا - إنه ما يستخدمه [`@vue/tsconfig`](https://github.com/vuejs/tsconfig).

- إذا كنت تستخدم واجهة الخيارات ، فيجب عليك تعيين [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) إلى `true` (أو على الأقل تمكين [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis) ، وهو جزء من العلم `strict`) لاستغلال التحقق من الأنواع لـ `this` في خيارات المكون. وإلا ستُعامَل `this` كـ `any`.

- إذا قمت بإعداد الأسماء البديلة للمحلل في أداة البناء الخاصة بك ، على سبيل المثال الاسم البديل `*/@*` المعد افتراضيا في مشروع `create-vue` ، فيجب عليك أيضًا إعداده لـ TypeScript عبر [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths).

- If you intend to use TSX with Vue, set [`compilerOptions.jsx`](https://www.typescriptlang.org/tsconfig#jsx) to `"preserve"`, and set [`compilerOptions.jsxImportSource`](https://www.typescriptlang.org/tsconfig#jsxImportSource) to `"vue"`.

اطلع أيضا على:

- [التوثيق الرسمي لخيارات مصرف TypeScript ](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [تنبيهات عن تصريف TypeScript بواسطة esbuild](https://esbuild.github.io/content-types/#typescript-caveats)

### ملاحظة بخصوص Vue CLI و `ts-loader` {#note-on-vue-cli-and-ts-loader}

في الإعدادات المستندة على webpack مثل Vue CLI ، من الشائع تنفيذ التحقق من النوع كجزء من سلسلة تحويل الوحدة ، على سبيل المثال مع `ts-loader`. ومع ذلك ، ليس هذا حل نظيف لأن النظام النوعي يحتاج إلى معرفة كامل مخطط الوحدة لإجراء عمليات التحقق من النوع. لا تكون خطوة تحويل الوحدة الفردية مناسبة للمهمة. يؤدي ذلك إلى مشاكل التالية:

- `ts-loader` يمكنه فقط التحقق من النوع في الشيفرة بعد التحويل. لا يتوافق هذا مع الأخطاء التي نراها في المحرر أو من `vue-tsc` ، والتي تنعكس مباشرة على الشيفرة المصدرية.

- يمكن أن يكون التحقق من النوع بطيئًا. عندما يُجرى في نفس مسلك التنفيذ / العملية مع تحويلات الشيفرة ، فإنه يؤثر بشكل كبير على سرعة إنشاء التطبيق بأكمله.

- لدينا التحقق من النوع يعمل بالفعل في محررنا في عملية منفصلة ، لذلك لا يوجد تكلفة لتأخير تجربة التطوير.

إذا كنت تستخدم حاليًا Vue 3 + TypeScript عبر Vue CLI ، فنحن ننصح بشدة بالترحيل إلى Vite. كما نعمل أيضًا على خيارات CLI لتمكين دعم TS transpile-only ، حتى تتمكن من التبديل إلى `vue-tsc` للتحقق من النوع.

## ملاحظات عامة عن الاستخدام {#general-usage-notes}

### `()defineComponent` {#definecomponent}

لتمكين TypeScript من تحديد الأنواع بشكل صحيح داخل خيارات المكون ، نحتاج إلى تعريف المكونات باستخدام [`()defineComponent`](/api/general#definecomponent):

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // تمكين تحديد الأنواع
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // type: string | undefined
    this.msg // type: string
    this.count // type: number
  }
})
```

تدعم الدالة `()defineComponent` أيضًا تحديد الخاصيات الممررة إلى `setup()` عند استخدام الواجهة التركيبية بدون `<script setup>`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // تمكين تحديد الأنواع
  props: {
    message: String
  },
  setup(props) {
    props.message // type: string | undefined
  }
})
```

اطلع أيضًا على:

- [ملاحظة بخصوص التخلص من الشيفرات الميتة في webpack](/api/general#note-on-webpack-treeshaking)
- [اختبارات الأنواع لـ `defineComponent`](https://github.com/vuejs/core/blob/main/packages-private/dts-test/defineComponent.test-d.tsx)

:::tip نصيحة
تمكن الدالة `()defineComponent` أيضًا تحديد الأنواع للمكونات المعرفة في JavaScript العادي.
:::

### الاستخدام في المكونات أحادية الملف {#usage-in-single-file-components}

لاستخدام TypeScript في المكونات أحادية الملف، أضف سمة `"lang="ts` إلى وسوم `<script>` . عندما يكون `"lang="ts` موجودًا ، تتمتع جميع تعبيرات القالب أيضًا بالتحقق من النوع بشكل أكثر صرامة.

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 1
    }
  }
})
</script>

<template>
  <!-- تمكين التحقق من الأنواع والإكمال التلقائي -->
  {{ count.toFixed(2) }}
</template>
```

يمكن استخدام `"lang="ts` أيضًا مع `<script setup>`:

```vue
<script setup lang="ts">
// تمكين TypeScript
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
   <!-- تمكين التحقق من الأنواع والإكمال التلقائي -->
  {{ count.toFixed(2) }}
</template>
```

### TypeScript في القوالب {#typescript-in-templates}

عنصر القالب `<template>` يدعم أيضًا TypeScript في تعبيرات الربط عند استخدام `<"script lang="ts>` أو `<"script setup lang="ts>` . هذا مفيد في حالات تحتاج فيها إلى تنفيذ تحويل الأنواع في تعبيرات القالب.

هنا مثال مزعج:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- خطأ لأن x يمكن أن يكون  سلسلة نصية -->
  {{ x.toFixed(2) }}
</template>
```

يمكن تجاوز هذه المشكلة عن طريق التحويل السطري الأنواع  :

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip نصيحة
إذا كنت تستخدم Vue CLI أو إعداد webpack ، فتتطلب  تعبيرات TypeScript في القالب الاعتمادية `vue-loader@^16.8.0`.
:::

### Usage with TSX {#usage-with-tsx}

Vue also supports authoring components with JSX / TSX. Details are covered in the [Render Function & JSX](/guide/extras/render-function.html#jsx-tsx) guide.

## مكونات معممة {#generic-components}

المكونات المعممة مدعومة في حالتين:

- في المكونات أحادية الملف SFC : [`<script setup>` مع سمة `generic`](/api/sfc-script-setup.html#generics)
- دالة التصيير و JSX   : [مع بصمة الدالة `()defineComponent`](/api/general.html#function-signature)

## وصفات محددة لكل واجهة {#api-specific-recipes}

- [TS و الواجهة التركيبية](./composition-api)
- [TS و واجهة الخيارات](./options-api)
