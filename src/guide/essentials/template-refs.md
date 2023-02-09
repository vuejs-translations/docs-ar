# مراجع القالب {#template-refs}

بينما يخفي نموذج التصيير التصريحي لـ Vue  معظم عمليات DOM المباشرة بالنسبة لك، فقد يكون هناك حالات تحتاج فيها إلى الوصول المباشر إلى عناصر DOM الأساسية. للوصول إلى هذا، يمكننا استخدام السمة الخاصة `ref` :

```vue-html
<input ref="input">
```

`ref` هو سمة خاصة، مماثلة لسمة `key` التي تم مناقشتها في محور `v-for`. يسمح لنا بالحصول على مرجع مباشر لعنصر DOM محدد أو نسخة مكون ابن بعد وصله. قد يكون هذا مفيدًا عندما تريد، على سبيل المثال، التركيز برمجيًا على عنصر إدخال  على مكون موصول بالـDOM أو تهيئة مكتبة طرف ثالث على عنصر معين.
`ref` هو سمة خاصة، مماثلة لسمة `key` التي تم مناقشتها في محور `v-for`. يسمح لنا بالحصول على مرجع مباشر لعنصر DOM محدد أو نسخة مكون ابن بعد وصله. قد يكون هذا مفيدًا عندما تريد، على سبيل المثال، التركيز برمجيًا على عنصر إدخال  على مكون موصول بالـDOM أو تهيئة مكتبة طرف ثالث على عنصر معين.

## الوصول إلى المراجع {#accessing-the-refs}

<div class="composition-api">

للحصول على المرجع باستخدام الواجهة التركيبية، نحتاج إلى التصريح بمتغير تفاعلي ref بنفس الاسم داخل شيفرة الـJavascript :


```vue
<script setup>
import { ref, onMounted } from 'vue'
// التصريح بمتغير تفاعلي لحفظ مرجع العنصر
// يجب أن يكون الاسم مطابق لقيمة مرجع القالب
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

إذا كنت لا تستخدم `<script setup>`، تأكد من إرجاع المرجع (ref) من `()setup` أيضًا :

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

المرجع الناتج سيُعرض على `this.$refs`:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

تجدر الإشارة إلى أنه يمكنك الوصول إلى المرجع **بعد وصل المكون.** إذا حاولت الوصول إلى <span class="options-api">`$refs.input`</span><span class="composition-api">`input`</span> في تعبيرات القالب، سيكون معدوم `null` في أول تصيير . لأن العنصر يكون غير متوفر حتى يتهيأ التصيير الأولي.

<div class="composition-api">

إذا كنت تحاول مراقبة تغييرات مرجع القالب، تأكد من إدراج الحالة حيث يكون مرجع القالب ذو قيمة معدومة `null` :
```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
  
    // غير موصول بعد، أو العنصر تم إزالته (على سبيل المثال
    //،بواسطة 
    // v-if)
  }
})
```

اطلع أيضًا على : [إضافة الأنواع للمراجع](/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />

</div>

## المراجع داخل حلقات `v-for` {#refs-inside-v-for}

> يتطلب النسخة v3.2.25 أو أعلى

<div class="composition-api">

لما يُستخدم المرجع `ref` داخل `v-for`، يجب أن يحتوي المرجع المقابل على قيمة مصفوفة، والتي ستُملأ بالعناصر بعد وصل المكون :

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ID0gcmVmKFsxLCAyLCAzXSlcblxuY29uc3QgaXRlbVJlZnMgPSByZWYoW10pXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGFsZXJ0KGl0ZW1SZWZzLnZhbHVlLm1hcChpID0+IGkudGV4dENvbnRlbnQpKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtUmVmc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

لما يُستخدم المرجع `ref` داخل `v-for`، يجب أن يحتوي المرجع المقابل على قيمة مصفوفة :

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogWzEsIDIsIDNdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuJHJlZnMuaXRlbXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

تجب الإشارة إلى أن مرجع المصفوفة **لا** يضمن نفس الترتيب الذي تحتوي عليه المصفوفة المصدرية.

## المراجع المُنشأة بالدوال {#function-refs}

بدلاً من القيمة النصية، يمكن أيضاً ربط السمة `ref` بدالة، والتي ستُستدعى في كل تحديث للمكون وتُعطيك الحرية الكاملة في مكان تخزين مرجع العنصر. تستقبل الدالة مرجع العنصر كأول وسيط :

```vue-html
<input :ref="(el) => { /* انسب
                     el 
                إلى متغير تفاعلي أو خاصية */ }">
```

تجدر الإشارة إلى أننا نستخدم ربط ديناميكي `:ref`  لذا نستطيع تمرير دالة بدلاً من سلسلة نصية تحتوي على اسم المرجع. عند فصل العنصر، سيكون الوسيط `null`. بالطبع، يمكنك استخدام تابع/دالة بدلاً من دالة سطرية.
## مرجع على مكون {#ref-on-component}

> هذا القسم يفترض معرفتك بـ[المكونات](/guide/essentials/component-basics). يمكنك تخطيه والعودة إليه لاحقاً.

`ref` يمكن أيضاً استخدامه على مكون ابن. في هذه الحالة، سيكون المرجع على نسخة مكون :

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {

  // سيحتوي 
  // child.value 
  // على نسخة من 
  // <Child />
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child
    // سيحتوي على نسخة من 
    // <Child />
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">إذا كان المكون الابن يستخدم واجهة الخيارات أو لا يستخدم `<script setup>`، سيكون المرجع المستخدم مطابقاً لـ</span><span class="options-api">سيكون المرجع المستخدم مطابقاً لـ</span> `this` للمكون الابن، مما يعني أن المكون الأب سيكون لديه الوصول الكامل إلى كل خاصيات ودوال المكون الابن. هذا يجعل من السهل إنشاء ارتباطات قوبة بين المكون الأب والابن، لذا يجب استخدام مراجع المكونات فقط عند الحاجة القصوى - في معظم الحالات، يجب عليك محاولة تنفيذ التفاعلات بين المكون الأب والابن باستخدام واجهة الخاصيات وإرسال الأحداث القياسية أولاً.

<div class="composition-api">

الاستثناء هنا هو أن المكونات التي تستخدم `<script setup>` هي **خاصة (private) افتراضياً**: لن يتمكن المكون الأب من الوصول إلى أي شيء إلا إذا اختار المكون الابن تعريف واجهة عامة باستخدام التعليمة `defineExpose`:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

//لا تحتاج التعليمات العامة للمصرف  مثل 
// defineExpose
// لأن تكون مستوردة
defineExpose({
  a,
  b
})
</script>
```

عندما يحصل المكون الأب على نسخة من هذا المكون عبر مراجع القالب، سيكون المكون المسترجع على الشكل `{ a: number, b: number }` (المراجع تُفك تلقائياً مثل المكونات العادية).

اطلع أيضا على [إضافة الأنواع إلى مراجع القالب](/guide/component-provide-inject.html#private-components) <sup class="vt-badge ts" />

</div>
<div class="options-api">

خيار `expose` يمكن استخدامه لتقييد الوصول إلى نسخة المكون الابن:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

في المثال أعلاه، سيكون للمكون الأب الحق في الوصول إلى `publicData` و `publicMethod` فقط.

</div>
