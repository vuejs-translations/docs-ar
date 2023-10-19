# الواجهة التركيبية: ()setup {#composition-api-setup}

## استخدام أساسي {#basic-usage}

الخطاف `setup()` يعمل كنقطة الدخول لاستخدام الواجهة التركيبية في المكونات في الحالات التالية:

1. استخدام الواجهة التركيبية بدون عملية بناء
2. دمج الشيفرة المبنية على الواجهة التركيبية مع مكونات واجهة الخيارات

:::info ملاحظة
إذا كنت تستخدم الواجهة التركيبية مع مكونات الملف الواحد، فإنه يوصى بشدة باستخدام `<script setup>` للحصول على بناء أكثر اختصارًا وراحةً.
:::

 يمكننا تعريف حالة تفاعلية باستخدام [الواجهات التفاعلية](./reactivity-core) وعرضها للقالب عن طريق إرجاع كائن من `()setup`. ستتوفر الخاصيات في الكائن المُرجع أيضًا في نسخة المكون (إذا استخدمت خيارات أخرى):

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // عرض للقالب وخطافات واجهة الخيارات الأخرى
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

[المراجع التفاعلية](/api/reactivity-core#ref) المُرجعة من `setup`  [تفك تلقائيًا](/guide/essentials/reactivity-fundamentals#deep-reactivity) عند الوصول إليها في القالب لذا لا تحتاج إلى استخدام `value.` عند الوصول إليها. كما تفك بنفس الطريقة عند الوصول إليها على `this`.

`()setup` نفسها لا يمكنها الوصول إلى نسخة المكون - سيكون لـ `this` قيمة `undefined` داخل `()setup`. يمكنك الوصول إلى القيم المعروضة للواجهة التركيبية من واجهة الخيارات، ولكن ليس العكس.

`()setup` يجب أن تعيد كائنًا _بشكل متزامن_. الحالة الوحيدة التي يمكن استخدام `()async setup` فيها هي عندما يكون المكون هو مكون ابن لمكون [التعليق (Suspense)](../guide/built-ins/suspense).

## الوصول إلى الخاصيات {#accessing-props}

الوسيط الأول في دالة `()setup` هي الوسيط `props`. تمامًا كما هو متوقع في مكون قياسي، فإن `props` داخل دالة `()setup` هي تفاعلية وستحدث عند تمرير خاصيات جديدة.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

لاحظ أنه إذا قمت بتفكيك كائن `props`، فإن المتغيرات المفككة ستفقد التفاعلية. لذا يوصى دائمًا بالوصول إلى الخاصيات بالشكل `props.xxx`.

إذا كنت بحاجة حقًا إلى تفكيك الخاصيات، أو بحاجة إلى تمرير خاصية إلى دالة خارجية مع الاحتفاظ بالتفاعلية، فيمكنك القيام بذلك باستخدام الواجهات البرمجية المساعدة [()toRefs](./reactivity-utilities#torefs) و [()toRef](/api/reactivity-utilities#toref):

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // غير `props` إلى كائن من المراجع، ثم فكه
    const { title } = toRefs(props)
    //  `title` هو مرجع يتتبع `props.title`
    console.log(title.value)

    // أو، غير خاصية واحدة في `props` إلى مرجع
    const title = toRef(props, 'title')
  }
}
```

## سياق setup {#setup-context}

الوسيط الثاني الذي يمرر إلى دالة `()setup` هو كائن **سياق setup**. يعرض كائن السياق قيمًا أخرى قد تكون مفيدة داخل `()setup`:

```js
export default {
  setup(props, context) {
    // السمات (كائن غير تفاعلي، ما يعادل $attrs)
    console.log(context.attrs)

    // المنافذ (كائن غير تفاعلي، ما يعادل $slots)
    console.log(context.slots)

    // إرسال الأحداث (دالة، ما يعادل $emit)
    console.log(context.emit)

    // عرض الخاصيات العامة (دالة)
    console.log(context.expose)
  }
}
```

كائن السياق ليس تفاعليًا ويمكن تفكيكه بأمان:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs` و `slots` هما كائنان ذو حالة يحدثان دائمًا عند تحديث المكون نفسه. هذا يعني أنه يجب تجنب تفكيكهما والإشارة دائمًا إلى الخصائص كـ `attrs.x` أو `slots.x`. كما لاحظ أن خصائص `attrs` و `slots` **غير** تفاعلية. إذا كنت تنوي تطبيق آثار جانبية استنادًا إلى التغييرات التي تطرأ على `attrs` أو `slots`، فيجب عليك القيام بذلك داخل خطاف دورة حياة `()onBeforeUpdate`.

### عرض الخاصيات العامة {#exposing-public-properties}

`expose` هي دالة يمكن استخدامها لتحديد الخاصيات المعروضة عند الوصول إلى نسخة المكون من قبل مكون أب عبر [مراجع القالب](/guide/essentials/template-refs#ref-on-component):

```js{5,10}
export default {
  setup(props, { expose }) {
    // اجعل النسخة "مغلقة" -
    // أي لا تعرض أي شيء للأصل
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // عرض الحالة المحلية انتقائيًا
    expose({ count: publicCount })
  }
}
```

## الاستخدام مع دوال التصيير {#usage-with-render-functions}

`()setup` يمكن أن تعيد أيضًا [دالة تصيير](/guide/extras/render-function) يمكنها استخدام الحالة التفاعلية المعلنة في نفس النطاق مباشرة:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

إرجاع دالة تصيير يمنعنا من إرجاع أي شيء آخر. داخليًا لا ينبغي أن يكون هذا مشكلة، ولكن يمكن أن يكون مشكلة إذا أردنا عرض دوال هذا المكون لمكون أب عبر مراجع القالب.

يمكننا حل هذه المشكلة عن طريق استدعاء [`expose()`](#exposing-public-properties):

```js{8-10}
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

ستكون الدالة `increment` متاحة في المكون الأب عبر مرجع القالب.
