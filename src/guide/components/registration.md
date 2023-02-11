# تسجيل المكون {#component-registration}

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="درس Vue.js مجاني حول تسجيل المكونات"/>

> لقراءة هذه الصفحة يجب عليك أولا الاطلاع على [أساسيات المكونات](/guide/essentials/component-basics).  ثم العودة إلى هنا.

أي مكون Vue يحتاج إلى أن يكون "مسجلا" لكي تتمكن Vue من تحديد شيفرته التنفيذية عندما يُعثر عليه في قالب. هناك طريقتان لتسجيل المكونات: عامة ومحلية.

## التسجيل العام {#global-registration}

يمكننا جعل المكونات متاحة بشكل عام في [تطبيق Vue](/guide/essentials/application.html) الحالي باستخدام التابع `()app.component`:

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // الاسم المسجل
  'MyComponent',
  // الشيفرة التنفيذية
  {
    /* ... */
  }
)
```


إذا كنت تستخدم المكونات أحادية الملف، ستقوم بتسجيل الملفات المستوردة ذات الامتداد  `.vue`:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

التابع `()app.component` يمكن استدعاؤه بشكل متسلسل:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

المكونات المسجلة بشكل عام يمكن استخدامها في قالب أي مكون داخل هذا التطبيق:

```vue-html
<!-- سيشتغل هذا في أي مكون داخل التطبيق -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

هذا ينطبق حتى على المكونات الفرعية، مما يعني أن جميع  المكونات الثلاثة ستكون متاحة _داخل بعضها_.

## التسجيل المحلي {#local-registration}

بالرغم من أن التسجيل العام ملائم، إلا أن لديه بعض العيوب:

1. التسجيل العام يمنع أنظمة البناء من إزالة المكونات غير المستخدمة (أي "التجزئة الشجرية"). إذا قمت بتسجيل المكون بشكل عام ولكن لم تستخدمه في أي مكان في التطبيق، فسيتم تضمينه في الحزمة النهائية.
  
2. التسجيل العام يجعل العلاقات بين الاعتماديات أقل وضوحًا في التطبيقات الكبيرة. يجعل من الصعب العثور على شيفرة المكون الابن من طرف المكون الأب الذي يستخدمه. يمكن أن يؤثر ذلك على الصيانة على المدى الطويل و هو نفس حالة استخدام عدد كبير من المتغيرات العامة.

التسجيل المحلي يحدد نطاق توفر المكونات المسجلة داخل المكون الحالي فقط. يجعل العلاقة بين الاعتماديات أكثر وضوحًا، ويكون أكثر ملاءمة للتجزئة الشجرية.

<div class="composition-api">

عند استخدام المكونات أحادية الملف (SFC) مع `<script setup>`، يمكن استخدام المكونات المستوردة بشكل محلي دون الحاجة لتسجيلها:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

في الحالات التي لا تستخدم فيها صيغة `<script setup>`، ستحتاج إلى استخدام خيار `components`:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

التسجيل المحلي يتم عن طريق استخدام خيار `components`:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

لكل خاصية في كائن `components`، سيكون المفتاح (اسم الخاصية على يسار `:` ) هو اسم المكون المسجل، بينما ستحتوي القيمة على الشيفرة التنفيذية للمكون. المثال أعلاه يستخدم اختصار الخاصية من مواصفات ES2015 ويعادل:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

تجدر الإشارة إلى أن **المكونات المسجلة محليًا _غير_ متوفرة  في المكونات الأبناء**. في هذه الحالة، سيتاح المكون `ComponentA`  للمكون الحالي فقط، وليس لأي من المكونات الأبناء في شجرة التطبيق.

## طريقة تسمية المكونات {#component-name-casing}

على  طول الدليل، نستخدم أسماء بنمط باسكال PascalCase عند تسجيل المكونات. هذا لأن:


1. الأسماء المكتوبة بنمط باسكال PascalCase هي مُعرِّفات JavaScript صالحة. يسهل ذلك استيراد وتسجيل المكونات في JavaScript. ويساعد أيضًا المحررات IDEs في التكملة التلقائية.

2. `<PascalCase />` يجعل المسألة أكثر وضوحًا أن هذا الوسم هو مكون Vue بدلاً من عنصر HTML أصلي في القوالب. ويفر"ق أيضًا مكونات Vue عن العناصر المخصصة (مكونات الويب).


هذا هو النمط الموصى به عند العمل مع المكونات أحادية الملف SFC أو القوالب النصية. ومع ذلك، كما تم بحثه في [ تنبيهات حول تحليل قالب الـDOM](/guide/essentials/component-basics.html#dom-template-parsing-caveats), الوسوم الكتوبة بنمط باسكال PascalCase لا يمكن استخدامها في قوالب DOM.

لحسن الحظ، يدعم Vue تحليل الوسوم المكتوبة بنمط أسياخ الشواء kebab-case للمكونات المسجلة باستخدام نمط باسكال PascalCase. وهذا يعني أن المكون المسجل باسم `MyComponent` يمكن استدعاؤه في القالب عبر `<MyComponent>` و `<my-component>` . ويسمح لنا هذا باستخدام نفس شيفرة تسجيل مكون الـJavaScript بغض النظر عن مصدر القالب.

