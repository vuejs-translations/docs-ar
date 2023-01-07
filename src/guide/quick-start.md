---
footer: false
---

# انطلاقة سريعة {#quick-start}

##  تجربة Vue على الانترنت {#try-vue-online}

- من أجل الحصول على نظرة عامة عن Vue، يمكنك تجربته مباشرة في [حقل التجارب](https://sfc.vuejs.org/#eNo9j01qAzEMha+iapMWOjbdDm6gu96gG2/cjJJM8B+2nBaGuXvlpBMwtj4/JL234EfO6toIRzT1UObMexvpN6fCMNHRNc+w2AgwOXbPL/caoBC3EjcCCPU0wu6TvE/wlYqfnnZ3ae2PXHKMfiwQYArZOyYhAHN+2y9LnwLrarTQ7XeOuTFch5Am8u8WRbcoktGPbnzFOXS3Q3BZXWqKkuRmy/4L1eK4GbUoUTtbPDPnOmpdj4ee/1JVKictlSot8hxIUQ3Dd0k/lYoMtrglwfUPkXdoJg==).

- إذا كنت تفضل إعداد HTML بسيط دون أي خطوات بناء، يمكنك استخدام [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) هذا كنقطة البداية.

- إذا كنت معتادًا على Node.js ومفهوم أدوات البناء، يمكنك أيضًا تجربة إعداد بنية كاملة داخل متصفحك على [StackBlitz](https://vite.new/vue).

## إنشاء تطبيق Vue {#creating-a-vue-application}

:::tip متطلبات مسبقة

- الاعتياد على سطر الأوامر
- تنصيب [Node.js](https://nodejs.org/) الإصدار 16.0 أو أعلى
  :::

في هذا القسم سنقدم كيفية إنشاء [تطبيق واجهة مستخدم واحدة](/guide/extras/ways-of-using-vue.html#single-page-application-spa) Vue على جهازك المحلي. سيكون المشروع الذي أنشئ يستخدم إعداد بناء مبني على [Vite](https://vitejs.dev) ويسمح لنا باستخدام [المكونات أحادية الملف](/guide/scaling-up/sfc) Vue (SFCs).

تأكد من أن لديك إصدارًا محدثًا من [Node.js](https://nodejs.org/) مثبتًا ، ثم قم بتشغيل الأمر التالي في سطر الأوامر (بدون علامة `>`:)


<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

هذا الأمر سيقوم بتثبيت وتنفيذ [create-vue](https://github.com/vuejs/create-vue)، أداة إنشاء مشاريع Vue الرسمية. ستتلقى الأسئلة الإختيارية لعدة ميزات مثل TypeScript ودعم الاختبارات:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

إذا كنت غير متأكد من خيار ، فاختر `No` بالضغط على مفتاح `Enter`. بمجرد إنشاء المشروع ، اتبع التعليمات لتثبيت الاعتماديات وبدء خادم التطوير:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">اسم-مشروعك</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>


يجب أن يكون لديك مشروع Vue الأول الآن! لاحظ أن مكونات المثال في المشروع المولدة مكتوبة باستخدام [الواجهة التركيبية](/guide/introduction.html#composition-api) و `<script setup>`، بدلاً من [واجهة الخيارات](/guide/introduction.html#options-api). إليك بعض النصائح الإضافية:

- محرر النصوص الموصى به هو [Visual Studio Code](https://code.visualstudio.com/) + [Volar ](https://marketplace.visualstudio.com/items?itemName=Vue.volar). إذا كنت تستخدم محررات أخرى ، فتحقق من [قسم دعم المحررات](/guide/scaling-up/tooling.html#ide-support).

- المزيد من التفاصيل حول الأدوات، بما في ذلك الدمج مع إطارات الواجهة الخلفية ، يتم مناقشتها في [دليل الأدوات](/guide/scaling-up/tooling.html).
- لكي تتعلم المزيد حول أداة البناء الأساسية Vite ،  اطلع على [توثيق Vite](https://vitejs.dev).
- إذا اخترت استخدام TypeScript ، فاطلع [دليل استخدام TypeScript](typescript/overview.html).

لما تكون جاهزاً لتوصيل تطبيقك لمرحلة الإنتاج، قم بتشغيل الأمر التالي:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

هذا سينشئ إصداراً جاهزاً للإنتاج من تطبيقك في مجلد `./dist` للمشروع. تحقق من [دليل نشر الانتاج](/guide/best-practices/production-deployment.html) لمعرفة المزيد حول توصيل تطبيقك إلى مرحلة الانتاج.

[الخطوات الموالية >](#next-steps)


## استخدام Vue  من شبكات تسليم المحتوى (CDN) {#using-vue-from-cdn}

 تستطيع استخدام Vue مباشرةً من شبكات تسليم المحتوى (CDN) عبر وسم الـ`</script>`:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

هنا نستخدم [unpkg](https://unpkg.com/)، لكن يمكنك أيضاً استخدام أي شبكة تسليم المحتوى (CDN) تقدم حزم npm، مثل [jsdelivr](https://www.jsdelivr.com/package/npm/vue) أو [cdnjs](https://cdnjs.com/libraries/vue). بالطبع، يمكنك أيضاً تنزيل هذا الملف وتقديمه بنفسك.

لما تستخدم Vue من شبكة تسليم المحتوى (CDN)، لا يوجد "خطوة بناء" متضمنة. هذا يجعل الإعداد أكثر بساطة، ومناسب لتعزيز HTML ثابت أو دمجه مع إطار الواجهة الخلفية. ومع ذلك، لن تتمكن من استخدام صيغة المكونات أحادية الملف (SFC).

### استخدام عملية بناء عامة {#using-the-global-build}

الرابط اعلاه يحمل *عملية البناء العامة* لـ Vue، حيث يتم تعريض جميع واجهات برمجة التطبيقات (API) على المستوى الأعلى كخاصيات على الكائن العام `Vue`. هنا مثال كامل لاستخدام عملية البناء العامة:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'السلام عليكم!'
      }
    }
  }).mount('#app')
</script>
```

[عرض مثال على JSFiddle](https://jsfiddle.net/5arqghdL/)

### استخدام عملية البناء بوحدات الـES {#using-the-es-module-build}

فيما تبقى من التوثيق، سنستخدم أساساً صيغة [وحدات ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). تدعم معظم المتصفحات الحديثة وحدات الـES الآن بشكل أصلي، لذا يمكننا استخدام Vue من شبكة تسليم المحتوى (CDN) عبر وحدات ES الأصلية مثل هذا المثال:

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'السلام عليكم'
      }
    }
  }).mount('#app')
</script>
```
لاحظ أننا نستخدم `<script type="module">`, والرابط المستورد من شبكة تسليم المحتوى (CDN) يشير إلى **عملية البناء بوحدات الـES** بدلا من كائن Vue.

[عرض مثال على JSFiddle](https://jsfiddle.net/yyx990803/vo23c470/)

### تمكين خرائط الاستيراد {#enabling-import-maps1}

في المثال أعلاه، استوردنا الواجهات من الرابط الكامل لشبكة تسليم المحتوى (CDN)، لكن في باقي التوثيق سترى الشفرة مثل هذا المثال:

```js
import { createApp } from 'vue'
```

نستطيع اعلام المتصفح أين يجب العثور على استيراد `vue` عبر استخدام [خرائط الاستيراد](https://caniuse.com/import-maps):

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'السلام عليكم'
      }
    }
  }).mount('#app')
</script>
```

[عرض مثال على JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)

تستطيع أيضاً إضافة مدخلات للاعتماديات الأخرى إلى خريطة الاستيراد - لكن تأكد من أنها تشير إلى الإصدار الأصلي لوحدات الـES للمكتبة التي تنوي استخدامها.

:::tip دعم خرائط الاستيراد في المتصفحات 
خرائط الاستيراد مدعومة بشكل أصلي في المتصفحات المرتكزة على Chromium، لذا ننصح باستخدام Chrome أو Edge أثناء عملية التعلم.

إذا كنت تستخدم Firefox، فهي مدعومة فقط في الإصدار 102+ ويجب تمكينها حالياً عبر خيار `dom.importMaps.enabled` في `about:config`.

إذا كان متصفحك المفضل لا يدعم خرائط الاستيراد حتى الآن، يمكنك تعويضها باستخدام [es-module-shims](https://github.com/guybedford/es-module-shims).
:::

:::warning ملاحظات عن الاستخدام في الإنتاج
الأمثلة السابقة تستخدم الإصدار التطويري لـVue - إذا كنت تنوي استخدام Vue من شبكة تسليم المحتوى (CDN) في الإنتاج، تأكد من مراجعة [دليل نشر الإنتاج](/guide/best-practices/production-deployment.html#without-build-tools).
:::

### تقسيم وحدات الـES {#splitting-up-the-modules}

بينما نتعمق في الدليل، قد نحتاج إلى تقسيم الشفرة إلى ملفات الـJavaScript منفصلة لتسهيل إدارتها. على سبيل المثال:

```html
<!-- index.html -->
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
```
إذا فتحت الملف `index.html` المذكور أعلاه مباشرةً في المتصفح، ستجد أنه يطلب منك تحميل ملف `my-component.js`، ولكن يبدو أنه لا يستطيع العثور عليه. هذا لأن الوحدات الـES لا تعمل على بروتوكول `file://`، لذا ستحتاج إلى تشغيل ملف `index.html` عبر بروتوكول `http://` باستخدام خادم HTTP محلي.
 
لبدء خادم HTTP محلي، قم أولاً بتثبيت [Node.js](https://nodejs.org/en/) ثم قم بتشغيل `npx serve` من خلال سطر الأوامر في نفس المجلد الذي يحتوي على ملف HTML الخاص بك. يمكنك أيضاً استخدام أي خادم HTTP آخر يمكنه تقديم الملفات الثابتة مع أنواع MIME الصحيحة.

ربما لاحظت أن قالب العنصر المستورد مضمن كسلسلة JavaScript. إذا كنت تستخدم VSCode، يمكنك تثبيت إضافة [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) وإضافة تعليق `/*html*/` قبل السلاسل لابراز الصيغة البرمجية

### استخدام الواجهة التركيبية دون خطوة بناء {#using-composition-api-without-a-build-step}

الكثير من أمثلة الواجهة التركيبية ستستخدم صياغة `<script setup>` . إذا كنت تنوي استخدام واجهة التركيب دون خطوة بناء، فتحقق من استخدام [خيار `()setup` ](/api/composition-api-setup.html).



## الخطوات الموالية {#next-steps}

إذا تخطيت [المقدمة](/guide/introduction)، ننصحك بشدة بقراءتها قبل الانتقال إلى باقي التوثيق.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">واصل مع الدليل</p>
    <p class="next-steps-caption">يرشدك الدليل عبر كل جانب من جوانب إطار العمل بالتفصيل الكامل.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">جرب الدرس التوجيهي</p>
    <p class="next-steps-caption">بالنسبة لأولئك الذين يفضلون تعلم الأشياء بشكل تطبيقي.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">اطلع على الأمثلة</p>
    <p class="next-steps-caption">استكشف أمثلة على الميزات الأساسية ومهام واجهة المستخدم الشائعة.</p>
  </a>
</div>
