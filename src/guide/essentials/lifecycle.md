# خطافات دورة الحياة {#lifecycle-hooks}

كل نسخة من مكون Vue تمر بمجموعة من الخطوات الإعدادية عند إنشائها - على سبيل المثال ، يحتاج إلى إعداد مراقبة البيانات وتجميع القالب ووصل النسخة على الـDOM وتحديثه عند تغيير البيانات. على طول الطريق ، يقوم أيضًا بتشغيل الدوال المسماة خطافات دورة الحياة ، مما يمنح المستخدمين فرصة لإضافة الشيفرة الخاصة بهم في مراحل محددة.

## تسجيل خطافات دورة الحياة {#registering-lifecycle-hooks}

على سبيل المثال ، يمكن استخدام <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> لتشغيل الشيفرة بعد انتهاء التصيير الأولي للمكون  وإنشاء عقد الـDOM:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`المكون مُوصّل الآن.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`المكون مُوصّل الآن.`)
  }
}
```

</div>

يوجد أيضًا خطافات أخرى ستستدعى في مراحل مختلفة من دورة حياة النسخة ، والأكثر شيوعًا هي <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted)، [`onUpdated`](/api/composition-api-lifecycle.html#onupdated)، و [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted).</span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted)، [`updated`](/api/options-lifecycle.html#updated)، و [`unmounted`](/api/options-lifecycle.html#unmounted).</span>

<div class="options-api">

كل خطافات دورة الحياة تستدعى مع سياق `this` الخاص بها الذي يشير إلى النسخة النشطة الحالية من المكون التي تستدعيها. تجدر الملاحظة أن هذا يعني أنه يجب عليك تجنب استخدام الدوال السهمية عند تعريف خطافات دورة الحياة، حيث لن تتمكن من الوصول إلى نسخة المكون عبر `this` إذا قمت ذلك.

</div>

<div class="composition-api">

عند استدعاء `onMounted`، تربط Vue تلقائيًا الدالة المسجلة مع نسخة المكون النشطة الحالية. يتطلب هذا أن تُسجل هذه الخطافات **بشكل متزامن** أثناء إعداد المكون. على سبيل المثال، الشيفرة الموالية غير صالحة :

```js
setTimeout(() => {
  onMounted(() => {
    // هذا لن يشتغل
  })
}, 100)
```

جدر الملاحظة أن هذا لا يعني أن الاستدعاء يجب أن يكون موضوعًا في `()setup` أو `<script setup>` . يمكن استدعاء `()onMounted` في دالة خارجية بشرط أن تكون سلسلة الاستدعاء متزامنة وتنشأ من داخل `()setup`.

</div>

## الرسم البياني للخطافات {#lifecycle-diagram}

أدناه رسم بياني لدورة حياة النسخة. لا تحتاج إلى فهم كل شيء بالضبط الآن ، ولكن عندما تتعلم وتبني المزيد ، سيكون مرجعًا مفيدًا.

![Component lifecycle diagram](./images/lifecycle.png)

اطلع على <span class="composition-api">[مرجع واجهة برمجة التطبيقات لخطافات دورة الحياة](/api/composition-api-lifecycle.html)</span><span class="options-api">[مرجع واجهة برمجة التطبيقات لخطافات دورة الحياة](/api/options-lifecycle.html)</span> للحصول على تفاصيل عن جميع خطافات دورة الحياة وحالات استخدامها .
