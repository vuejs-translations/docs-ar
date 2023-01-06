---
footer: false
---

# المقدمة {#introduction}

:::info أنت بصدد تصفح توثيق الإصدار 3 الخاص بـVue

- سينتهي دعم Vue 2 في 31 ديسمبر 2023. تعرف على المزيد حول الموضوع هنا [دعم Vue 2 الممدد طويل المدى (LTS)](https://v2.vuejs.org/lts/) 
- تم نقل توثيق Vue 2 إلى [v2.vuejs.org](https://v2.vuejs.org/).
- للترقية من Vue 2 الق نظرة على [دليل الترقية](https://v3-migration.vuejs.org/).
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="ar vue-mastery-link">
  <a href="https://www.vuemastery.com/courses-path/beginner" target="_blank">
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

Vue (تنطق **ڨْيُو**) هو إطار عمل JavaScript لبناء واجهات المستخدم. يعتمد على HTML و CSS و JavaScript القاعدية ويوفر نموذج برمجة تعريفي وقائم على المكونات يساعدك على تطوير واجهات المستخدم بكفاءة ، سواء كانت بسيطة أو معقدة.


هذا مثال بسيط :

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

```vue-html
<div id="app">
  <button @click="count++">
    العداد: {{ count }}
  </button>
</div>
```

**نتيجة**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
      العداد: {{ count }}
  </button>
</div>


يوضح المثال أعلاه ميزتين أساسيتين لـ Vue :

- **التصيير التعريفي** : يقوم Vue بتوسيع الـHTML القاعدي باستخدام بنية نموذجية تتيح لنا وصف إخراج الـHTML بشكل تصريحي استنادًا إلى حالة الـJavaScript.

- **التفاعلية** : يتتبع Vue تلقائيًا تغييرات حالة JavaScript ويقوم بتحديث DOM بكفاءة عند حدوث التغييرات.

قد يكون لديك مسبقا أسئلة - لا داعي للقلق. سنغطي كل التفاصيل الصغيرة في بقية التوثيق. في الوقت الحالي ، يرجى القراءة بتأني حتى تفهم   بمستوى عالي  ما تقدمه Vue.

:::tip المتطلبات الأساسية
نفترض عبر بقية التوثيق أن تكون لديك معرفة أساسية بـ HTML ، CSS و JavaScript. إذا كنت جديدًا تمامًا في مجال تطوير الواجهات الأمامية ، فقد لا تكون  فكرة محبذة التخطي مباشرة إلى إطار العمل كخطوة أولى - فهم الأساسيات ثم العودة! يمكنك التحقق من مستوى معرفتك عبر القاء [نظرة عامة على الـJavascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). خبرة مسبقة مع أطر العمل الأخرى تساعد، ولكنها ليست مطلوبة. 
:::

## إطار عمل تقدمي {#the-progressive-framework}

Vue هو إطار عمل ونظام بيئي يغطي معظم الميزات المشتركة المطلوبة في تطوير الواجهات الأمامية. في المقابل شبكة الويب متنوعة للغاية - قد تختلف الأشياء التي نبنيها على الويب بشكل كبير في الشكل والحجم. مع وضع ذلك في الاعتبار ، تم تصميم Vue ليكون مرنًا وقابل للتبني بشكل متدرج. اعتمادًا على حالة استخدامك، يمكن استخدام Vue بطرق مختلفة نسرد منها ما يلي:

- تحسين الـHTML الثابت بدون خطوة بناء
- التضمين كمكونات ويب في أي صفحة
- التطبيقات أحادية الصفحة (SPA)
- Fullstack /التصيير من طرف الخادم (SSR)
- Jamstack / إنشاء موقع ثابت (SSG)
- استهداف سطح المكتب والجوال و تقنية WebGL وحتى محرر الأوامر

إذا وجدت هذه المفاهيم مخيفة، فلا تقلق! لا يتطلب البرنامج التعليمي والدليل سوى معرفة أساسية بلغة HTML و JavaScript ، ويجب أن تكون قادرًا على المتابعة دون أن تكون خبيرًا في أي منهما.

إذا كنت مطورًا متمرسًا ومهتمًا بكيفية دمج Vue بشكل أفضل في جعبتك ، أو كنت مهتمًا بمعرفة ما تعنيه هذه المصطلحات ، فنحن نناقشها بمزيد من التفصيل في [طرق استخدام Vue](/guide/extras/ways-of-using-vue).

بصرف النظر عن المرونة ، تُشارَك المعرفة الأساسية حول كيفية عمل Vue عبر جميع حالات الاستخدام هذه. حتى لو كنت مجرد مبتدئ الآن ، فإن المعرفة المكتسبة على طول الطريق ستبقى مفيدة مع نموك للتعامل مع أهداف أكثر طموحًا في المستقبل. إذا كنت من المحاربين القدامى ، فيمكنك اختيار الطريقة المثلى للاستفادة من Vue بناءً على المشكلات التي تحاول حلها ، مع الاحتفاظ بنفس الإنتاجية. هذا هو السبب في أننا نطلق على Vue اسم "الإطار التقدمي": إنه إطار يمكن أن ينمو معك ويتكيف مع احتياجاتك.

## المكونات أحادية الملف {#single-file-components}

في معظم مشاريع Vue المُنشأة عن طريق أدوات البناء، نقوم بتأليف مكونات Vue باستخدام تنسيق ملف يشبه HTML يسمى **المكون أحادي الملف** (يُعرف أيضًا باسم ملفات `vue.` ، والمختصرة باسم **SFC**). يقوم ملف Vue أحادي الملف، كما يوحي الاسم ، بتغليف منطق المكون (JavaScript) والقالب (HTML) والأنماط (CSS) في ملف واحد. هذا هو المثال السابق ، مكتوبًا بصيغة SFC :

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

SFC هي خاصية مُميِّزة لـVue وهي الطريقة الموصى بها لتأليف مكونات Vue **إذا كانت** حالة الاستخدام الخاصة بك تستدعي إعدادًا لعملية بناء. يمكنك معرفة المزيد حول [كيفية و سبب استعمال SFC](/guide/scaling-up/sfc) في الجزء المخصص لها - لكن في الوقت الحالي، فقط اعلم أن Vue سيتعامل مع جميع إعدادات أدوات البناء نيابةً عنك.

## أنماط واجهة برمجة التطبيقات (API) {#api-styles}

يمكن تأليف مكونات Vue بنمطين مختلفين لواجهة برمجة التطبيقات: **واجهة الخيارات لبرمجة التطبيقات** و **الواجهة التكوينية برمجة التطبيقات**.

### واجهة الخيارات لبرمجة التطبيقات {#options-api}

باستخدام واجهة الخيارات لبرمجة التطبيقات، نحدد منطق المكون باستخدام كائن من الخيارات مثل `data` و `methods` و `mounted`. يتم عرض الخاصيات التي تحددها الخيارات في دوال `this` الداخلية، التي ترمز إلى نسخة المكون:

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

### الواجهة التكوينية لبرمجة التطبيقات {#composition-api}

باستخدام الواجهة التكوينية، نحدد منطق المكون باستخدام وظائف API المستوردة. في SFCs ، يتم استخدام Composition API مع [`<script setup>`](/api/sfc-script-setup). السمة `setup` هي تلميح يجعل Vue ينفذ تحويلات وقت التصريف التي تسمح لنا باستخدام الواجهة التكوينية مع  شيفرة معيارية أقل. على سبيل المثال ، يمكن استخدام الاستيرادات والمتغيرات  / الدوال ذات المستوى الأعلى المُعلن عنها في `<script setup>` مباشرةً في القالب..

في المثال الموالي إليك نفس المكون ، بنفس القالب بالضبط ، ولكن باستخدام الواجهة التكوينية و `<script setup>` :

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

كلا النمطين قادران تمامًا على تغطية حالات الاستخدام الشائعة. إنهما واجهتين مختلفتين مدعومتين من نفس النظام الأساسي بالضبط. في الواقع ، يتم تنفيذ واجهة  الخيارات فوق مستوى الواجهة التكوينية! يتم مشاركة المفاهيم الأساسية والمعرفة حول Vue عبر الأسلوبين.

تتمحور واجهة الخيارات حول مفهوم "نسخة المكون" (`this` كما رأينا في المثال) ، والذي يتماشى بشكل أفضل مع النموذج الذهني لفئة للمستخدمين اصحاب  خلفية لغات البرمجة كائنية التوجه OOP. كما أنه أكثر ملاءمة للمبتدئين من خلال التخلص من تفاصيل التفاعل و ايضا تفرض عليهم تنظيم الشيفرة عبر مجموعة الخيارات.

تتمحور الواجهة التكوينية حول التصريح عن متغيرات الحالة التفاعلية مباشرة في نطاق دالة و تكوين حالة  من دوال متعددة من أجل التعامل مع التعقيد. تعتبر شكل ذو حرية أكبر وتتطلب فهمًا لكيفية عمل التفاعلية في Vue لاستخدامها بفعالية. في المقابل، تتيح مرونتها أنماطًا أكثر قوة لتنظيم وإعادة استخدام الشيفرة.

يمكنك معرفة المزيد حول المقارنة بين النمطين والفوائد المحتملة للواجهة التكوينية في [الأسئلة الشائعة حول الواجهة التكوينية](/guide/extras/composition-api-faq).

إذا كنت جديدًا على Vue ، فإليك توصيتنا العامة:

- لغرض التعلم ، اتبع النمط الذي يبدو لك أسهل في الفهم. مرة أخرى ، يتم مشاركة معظم المفاهيم الأساسية بين النمطين. يمكنك دائمًا اختيار النمط الآخر لاحقًا.

- من أجل الاستخدام في نسخة الانتاج:

  - اتبع واجهة الخيارات إذا كنت لا تستخدم أدوات بناء ، أو تخطط لاستخدام Vue بشكل أساسي في سيناريوهات منخفضة التعقيد ، على سبيل المثال تحسين متدرج.

  - اتبع نهج الواجهة التكوينية + الملفات أحادية الملف إذا كنت تخطط لإنشاء تطبيقات كاملة باستخدام Vue.

ليس عليك الالتزام بنمط واحد فقط أثناء مرحلة التعلم. ستوفر بقية التوثيق نماذج التعليمات البرمجية في كلا النمطين حيثما أمكن ، ويمكنك التبديل بينهما في أي وقت باستخدام **مفتاح تبديل تفضيلات الواجهات (API)** في الجزء العلوي من الشريط الجانبي الأيسر.

## هل يزال لديك أسئلة؟ {#still-got-questions}

الق نظرة على قسم [الأسئلة الشائعة](/about/faq).

## اختر مسارك في طريق التعلم {#pick-your-learning-path}

 لمختلف المطورين أساليب تعلم مختلفة. لا تتردد في اختيار مسار تعليمي يناسب تفضيلاتك - على الرغم من أننا نوصي بمراجعة كل المحتوى ، إن أمكن!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">جرب الدرس التعليمي</p>
    <p class="next-steps-caption">بالنسبة لأولئك الذين يفضلون تعلم الأشياء بشكل تطبيقي.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">اقرأ الدليل</p>
    <p class="next-steps-caption">يرشدك الدليل عبر كل جانب من جوانب إطار العمل بالتفصيل التام.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">الق نظرة على الأمثلة</p>
    <p class="next-steps-caption">استكشف أمثلة على الميزات الأساسية ومهام واجهة المستخدم الشائعة.</p>
  </a>
</div>
