---
footer: false
---

# المقدمة {#introduction}

:::info أنت بصدد تصفح توثيق الإصدار 3 الخاص بـVue

- انتهى دعم فيو 2 في **Dec 31, 2023**. اعرف المزيد عن [Vue 2 نهاية حياة](https://v2.vuejs.org/eol/).
- إذا كنت تريد الترقية من فيو 2 فراجع [دليل الترقية](https://v3-migration.vuejs.org/).
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="ar vue-mastery-link">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description"> تعلم Vue مع دروس الفيديو على <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## ماهي Vue ؟  {#what-is-vue}

Vue (تنطق **ڨْيُو**) هو إطار عمل مبني  بالـJavaScript لإنشاء واجهات المستخدم. يعتمد على HTML و CSS و JavaScript  المعيارية ويوفر نموذج برمجة تصريحي هدفه وصف وظيفة البرمجية و ليس كيفية عملها،  أحد ركائز هذا الإطار هو المكونات بحيث يساعدك على تطوير واجهات المستخدم بكفاءة بشكل متدرج من أبسط الصفحات إلى أعقد التطبيقات.

 مثال بسيط :

<div class="options-api">

```js
import {  createApp } from 'vue'

createApp({
    data() {
        return {
            count: 0
        }
    }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    العداد: {{ count }}
  </button>
</div>
```

**النتيجة**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
      العداد: {{ count }}
  </button>
</div>

يوضح المثال أعلاه ميزتين أساسيتين في Vue :

- **التصيير التصريحي** : يقوم Vue بتعزيز الـHTML المعياري و اثرائه ببعض السمات الموجهة و اقحام متغيرات و تعبيرات برمجية بداخله  و ذلك باستخدام وسم القالب (template) التي تتيح لنا وصف مخرج الـHTML بشكل تصريحي استنادًا إلى حالة تلك المتغيرات و التعبيرات المتحكم فيها من الـJavaScript .

- **التفاعلية** : يمكن لـVue بشكل تلقائي تتبع التحولات الطارئة على حالة المتغير المعرف في شيفرة الـJS وتقوم بتحديث شجرة DOM بكفاءة عند حدوث ذلك.

ربما يكون لديك العديد من الأسئلة لحد الآن، لكن لا داعي للقلق، سنقوم بإجابة كل تلك الأسئلة في حينها، فقط يرجى قراءة التوثيق بشكل متأني حتى تفهم بشكل ممتاز ما توفره Vue.

:::tip المتطلبات الأساسية
نفترض عبر بقية التوثيق أن تكون لديك معرفة أساسية بـ HTML ، CSS و JavaScript. إذا كنت جديدًا تمامًا في مجال تطوير الواجهات الأمامية ، فقد لا تكون  فكرة محبذة التخطي مباشرة إلى إطار العمل كخطوة أولى - فهم الأساسيات ثم العودة! يمكنك التحقق من مستوى معرفتك عبر القاء نظرة على هذه المقدمات المختصرة حول [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) و [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) و [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) . الخبرة مسبقة مع أطر العمل الأخرى تساعد، ولكنها ليست مطلوبة. 

:::

## إطار عمل تقدمي {#the-progressive-framework}

Vue هو إطار عمل ونظام بيئي يغطي معظم الميزات المشتركة المطلوبة في تطوير الواجهات الأمامية. في ظل وجود بنيات مختلفة في بناء تطبيقات و أنظمة الويب و التي تختلف من حيث تعقيدات الشكل و الحجم، مع وضع هذا في الاعتبار بني إطار Vue ليكون قابل للتبني بشكل متدرج. اعتمادًا على حالة استخدام التي تحاول معالجتها، يمكنك توظيف Vue بطرق مختلفة نسرد منها ما يلي: 

- تحسين الـHTML الثابت بدون خطوة بناء
- التضمين كمكونات ويب في أي صفحة
- التطبيقات أحادية الصفحة (SPA)
- التطوير المتكامل (Fullstack) /التصيير من طرف الخادم (SSR)
- Jamstack / توليد موقع ثابت (SSG)
- استهداف سطح المكتب والجوال و تقنية WebGL وحتى محرر الأوامر

إذا بدت لك هذه المفاهيم غريبة و لا تستطيع اسيتعابها، فلا داعي للقلق! فكل من  الدرس التوجيهي والدليل  لا يتطلبان سوى معرفة أساسية بلغة HTML و JavaScript، و يمكنك المواصلة بدون أن تكون خبيرا  في هاته اللغات.

إذا كنت مطورًا متمرسًا ومهتمًا بكيفية توظيف Vue بشكل أفضل في أدوات و أساليب عملك، أو كنت مهتمًا بمعرفة ما تعنيه هذه المصطلحات ، فنحن نناقشها بمزيد من التفصيل في قسم [ طرق استخدام Vue](/guide/extras/ways-of-using-vue).

بصرف النظر عن المرونة التي تتمتع بها Vue في تطوير مختلف الحلول و على مختلف، فإن القاسم المشترك بينها هو تطبيقها المعارف الأساسية و القواعد التي بنيت عليها Vue. حتى لو كنت مجرد مبتدئ الآن، فإن المعرفة المكتسبة على طول طريق التعلم ستبقى مفيدة مع نموك للتعامل مع أهداف أكثر طموحًا في المستقبل. إذا كنت من المتمرسين، فيمكنك اختيار الطريقة المثلى للاستفادة من Vue بناءً على المشكلات التي تحاول حلها مع الاحتفاظ بنفس الإنتاجية. هذا هو السبب في أننا نطلق على Vue اسم "الإطار التقدمي": إنه إطار يمكن أن ينمو معك ويتكيف مع احتياجاتك من أبسط الحلول إلى أعقدها.

## المكونات أحادية الملف {#single-file-components}

في معظم مشاريع Vue المُنشأة عن طريق أدوات البناء مثل Webpack أو Vite، نقوم بتأليف مكونات Vue باستخدام تنسيق ملف يشبه HTML يسمى **المكون أحادي الملف** (يُعرف أيضًا باسم ملفات `vue.` ، والمختصرة باسم **SFC**). يقوم ملف Vue أحادي الملف، كما يوحي الاسم ، بتغليف شيفرة المكون (JavaScript) و القالب باستعمال وسم template الذي يمثل الـ(HTML) و التنسيقات (CSS) في ملف واحد. هذا هو المثال السابق ، مكتوبًا بصيغة SFC. 

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">العداد: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">العداد: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

SFC هي خاصية مُميِّزة لـVue وهي الطريقة الموصى بها لتأليف مكونات Vue **إذا كانت** حالة الاستخدام الخاصة بك تستدعي إعدادًا لعملية بناء. يمكنك معرفة المزيد في القسم المخصص له حول [الدافع وراء تبني الـSFC و كيفية توظيفه](/guide/scaling-up/sfc) - و ما عليك ادراكه هو أن هاته الصيغة تقوم Vue بترجمتها لشيفرة قابلة للتصيير و ذلك عن طريق اعدادات أدوات البناء. 

## أنماط الواجهة البرمجية  (API) {#api-styles}

يمكن تأليف مكونات Vue بنمطين مختلفين من واجهات برمجة التطبيقات: **واجهة الخيارات** و **الواجهة التركيبية**.

### واجهة الخيارات لبرمجة التطبيقات {#options-api}

باستخدام واجهة الخيارات، نحدد شيفرة المكون باستخدام كائن مؤلف من خاصيات مثل `data` و `methods` و `mounted` . يتم عرض الخاصيات التي تحددها الخيارات في دوال `this` الداخلية، حيث `this` ترمز إلى نسخة المكون:

```vue
<script>
export default {

  // الخاصيات المستعادة من data() تصير متفاعلة و تعرض عبر this.
  data() {
    return {
      count: 0
    }
  },

  // Methods هي دوال تغير الحالة و تنشط التحديثات.
  // يمكن ربطها كمستمعات للأحداث في القوالب.
  methods: {
    increment() {
      this.count++
    }
  },

  // خطافات دورة الحياة تُستدعى في مراحل مختلفة من دورة حياة المكون.
  // ستُستدعى هذه الدالة عند تركيب المكون.

  mounted() {
    console.log(`العداد الابتدائي ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">العداد : {{ count }}</button>
</template>
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp1UkFOwzAQ/MrK4kDVNuFchQr+4UPT1G1TEjuyHUCqcgAVqepDKARB1FNVXuL8hnVMUi5IkZzZXc/MrndNbrPMu88ZGZFARTLO9Jhy9pgJqWHG5mGeaFhTDuD7YD7Nvt6Yd6hfTFk/mb05WWizs1CHlz1XCSCZziVvEUAkcq5HcOVwYY9iQHlLa0mremtPB8p6B6Y03/XOHFykU95i/Fhv6uffSsxUWPaBZkrLlzK9FDM1asVjHkmWMq7P7gD0MlZeY6rf/8fTlzmigO2xhMbcAdWdFZTbu65TS8FmZ+pIcCUS5iVicTlpqk+mwurKXd2bN3RsA6/Y4cX67KPwJr3GAuX4BX73FAg0S7Mk1AwRQDDNtRYcbqIkju6uKekapGT8VxEnsHaDh6IIfHcNKQK/4yMDEqf2pYdpmHkrJThuQdMJ0jYJRUk3SUpwTSymZKl1pka+r+aR3Z2V8oRc+PjnSdSLU+YxlQ6nUjwoJpGYkrY3UvwAOBkPOg==)

### الواجهة التركيبية لبرمجة التطبيقات {#composition-api}

باستخدام الواجهة التركيبية، نحدد شيفرة المكون باستخدام دوال مستوردة من وحدة vue في ملف الـSFC ، يتم أيضا استخدام الواجهة التركيبية مع صيغة الـ[ `<script setup>` ](/api/sfc-script-setup). السمة `setup` هي تلميح يجعل Vue ينفذ تحويلات وقت التصريف التي تسمح لنا باستخدام الواجهة التركيبية مع  شيفرة أقل. على سبيل المثال ، يمكن استخدام الاستيرادات والمتغيرات  / الدوال المُصرح بها  في أعلى `<script setup>` مباشرةً في القالب دون الحاجة لاستعادتها من دخل توابع كائن المكون.

في المثال الموالي إليك نفس المكون ، بنفس القالب بالضبط ، ولكن باستخدام الواجهة التركيبية و صيغة الـ `<script setup>` :

```vue
<script setup>
import { ref, onMounted } from 'vue'

// حالة تفاعلية
const count = ref(0)

// الدوال التي تعدل على الحالة وتنشط التحديثات
function increment() {
  count.value++
}

// الدوال الخاصة بدورة الحياة
onMounted(() => {
  console.log(`العداد الابتدائي ${count.value}.`)
})
</script>

<template>
  <button @click="increment"> العداد : {{ count }}</button>
</template>
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp1kkFOwzAQRa8yspBo1TZhXaUVHIAbeNE2OCUlsSPbKYsoC6QKQQ9CaBBUSCDUmzi3YRw3FRsWUTxj/zfzxy7IVZZ565yRMQlUKONMg2I6z6aUx2kmpIYCJIuGIPi1yLlmN1BCJEUK56g6p5xy3wfzbqpmY3Zg6ubBVObQbJqt2VEeCq40hFYJEwvqXfQ7jVXsmyf7d0HdbBFgDpjFjGU8u42Ojofr5tF8mZ+jAHf2WOgNS9aURzkPdSw4xDyULGVc9/pQUA6uAW89T3I2GFBe/tvCB5K+rY/XNv9pl20HWKWyhk5j6CF7Mu3wXImEeYlY9mbtefSA5/dOXCGtbhMv6PCs+NNN6c1wHiV+ge/Gj4PHQLM0S+aaYQQQLHKt0dZlmMTh3YSSkz9Kpq5EV28MRXEcd1kGvhMiJPBPRDIk7mZH6TzzVkpwvPvWBoLbDUUJcmzG5vCabUzJrdaZGvu+ikL7YlbKE3Lp48qTWC9OmcdUOlpIca+YRDAlFoGzLkn5C1F2Gs4=)

### أيهما تختار؟ {#which-to-choose}

كلا النمطين قادران تمامًا على تغطية حالات الاستخدام الشائعة. و يمثلان واجهتين مختلفتين مدعومتين من نفس النظام الأساسي. في الواقع، الواجهة التركيبية تعتبر قاعدة لتنفيذ واجهة الخيارات، و على طول التوثيق تقدم المعارف و المفاهيم حول Vue باستخدام الواجهتين.

تتمحور واجهة الخيارات حول مفهوم "نسخة المكون" ( `this` كما رأينا في المثال) و هي تجسيد للكائن الممثل للمكون، والذي يتماشى بشكل أفضل مع النموذج الذهني لفئة للمستخدمين المتعودين على لغات برمجية كائنية التوجه، كما أنه أكثر ملاءمة للمبتدئين من خلال عدم التطرق إلى تفاصيل و مفاهيم التفاعل و ايضا تسمح لهم بتنظيم الشيفرة عبر مجموعة الخيارات و الخاصيات المدمجة في كائن المكون.

تتمحور الواجهة التركيبية حول التصريح عن متغيرات الحالة التفاعلية مباشرة في نطاق دالة و تركيب حالة  من دوال متعددة من أجل تبسيط التعقيدات و تجزئة شيفرة المكون إلى أجزاء ذات مسؤولية محددة. تتميز الواجهة بشكل متحرر في كتابة الشيفرة وتتطلب فهمًا لكيفية عمل التفاعلية في Vue من أجل استخدامها بفعالية. في المقابل، تتيح مرونتها أساليب أكثر قوة لتنظيم وإعادة استخدام الشيفرة.

يمكنك معرفة المزيد حول المقارنة بين النمطين والفوائد المحتملة للواجهة التكوينية في [الأسئلة الشائعة حول الواجهة التركيبية](/guide/extras/composition-api-faq).

إذا كنت جديدًا على Vue ، فإليك توصيتنا العامة:

- لغرض التعلم ، اتبع النمط الذي يبدو لك أسهل في الفهم. مع العلم أن المفاهيم و المعارف الأساسية لـVue تُقدم باستخدام كلا النمطين، و تبقى لك الحرية في الانتقال إلى النمط الآخر وقتما شئت.

- من أجل الاستخدام في نسخة الانتاج:

  - تبنى واجهة الخيارات إذا كنت لا تستخدم أدوات بناء ، أو تخطط لاستخدام Vue بشكل أساسي في سيناريوهات قليلة التعقيد ، على سبيل المثال في تحسين متدرج لصفحة ويب ثابتة.

  - اتبع نهج الواجهة التركيبية + الملفات أحادية الملف إذا كنت تخطط لإنشاء تطبيقات كاملة باستخدام Vue.

ليس عليك الالتزام بنمط واحد فقط أثناء مرحلة التعلم. سنوفر في بقية التوثيق نماذج التعليمات البرمجية في كلا النمطين حيثما أمكن، ويمكنك التبديل بينهما في أي وقت باستخدام **مفتاح تبديل تفضيلات الواجهات (API)** في الجزء العلوي من الشريط الجانبي الأيسر.

## هل يزال لديك أسئلة؟ {#still-got-questions}

إذا لم يزل  لديك أسئلة تفضل بالقاء نظرة على قسم [الأسئلة الشائعة](/about/faq).

## اختر مسارك في طريق التعلم {#pick-your-learning-path}

 لمختلف المطورين أساليب تعلم مختلفة. لا تتردد في اختيار مسار تعليمي يناسب ميولاتك - على الرغم من أننا نوصي بمطالعة كل المحتوى، إن أمكن!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">الدليل</p>
    <p class="next-steps-caption">يرشدك الدليل عبر كل جانب من جوانب إطار العمل بالتفصيل الكامل.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">الدرس التوجيهي</p>
    <p class="next-steps-caption">بالنسبة لأولئك الذين يفضلون تعلم الأشياء بشكل تطبيقي.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">الأمثلة</p>
    <p class="next-steps-caption">استكشف أمثلة على الميزات الأساسية ومهام واجهة المستخدم الشائعة.</p>
  </a>
</div>
