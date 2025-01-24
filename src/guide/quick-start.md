---
footer: false
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# انطلاقة سريعة {#quick-start}

##  تجربة Vue على الانترنت {#try-vue-online}

- من أجل الحصول على نظرة عامة عن Vue، يمكنك تجربته مباشرة في [حقل التجارب](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==).

- إذا كنت تفضل إعداد HTML بسيط دون أي خطوات بناء، يمكنك استخدام [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)  كنقطة البداية.

- إذا كنت معتادًا على Node.js ومفهوم أدوات البناء، يمكنك أيضًا تجربة إعداد بنية كاملة داخل متصفحك على منصة [StackBlitz](https://vite.new/vue).

## إنشاء تطبيق Vue {#creating-a-vue-application}

:::tip متطلبات مسبقة

- الاعتياد على سطر الأوامر
- تنصيب [Node.js](https://nodejs.org/) الإصدار 18.3 أو أعلى
  :::

في هذا القسم سنقدم كيفية إنشاء [تطبيق أحادي الصفحة باستعمال Vue](/guide/extras/ways-of-using-vue#single-page-application-spa) على جهازك. سيكون المشروع الذي سيبنى يستخدم إعداد بنية مرتكزة على [Vite](https://vitejs.dev) والتي تسمح لنا باستخدام [المكونات أحادية الملف](/guide/scaling-up/sfc) (SFCs).

تأكد من أن لديك إصدارًا محدثًا من [Node.js](https://nodejs.org/) مثبتًا ، وأن المجلد الحالي هو المجلد الذي تنوي فيه إنشاء المشروع، ثم قم بتشغيل الأمر التالي في سطر الأوامر (بدون علامة `$` ):


<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  # For Yarn (v1+)
  $ yarn create vue

  # For Yarn Modern (v2+)
  $ yarn create vue@latest
  
  # For Yarn ^v4.11
  $ yarn dlx create-vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh
  $ bun create vue@latest
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

هذا الأمر سيقوم بتثبيت وتنفيذ [create-vue](https://github.com/vuejs/create-vue)، و التي تعتبر الأداة الرسمية لإنشاء مشاريع Vue. ستتلقى الأسئلة الإختيارية لعدة ميزات مثل TypeScript ودعم الاختبارات:
<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Nightwatch / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… No / <span style="color:#89DDFF;text-decoration:underline">Yes</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue DevTools 7 extension for debugging? (experimental) <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

إذا كنت غير متأكد من خيار ، فاختر `No` بالضغط على مفتاح `Enter`. بمجرد إنشاء المشروع ، اتبع التعليمات لتثبيت الاعتماديات وبدء خادم التطوير:

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh-vue
  $ cd {{'<your-project-name>'}}
  $ npm install
  $ npm run dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh-vue
  $ cd {{'<your-project-name>'}}
  $ pnpm install
  $ pnpm run dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh-vue
  $ cd {{'<your-project-name>'}}
  $ yarn
  $ yarn dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh-vue
  $ cd {{'<your-project-name>'}}
  $ bun install
  $ bun run dev
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm run build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm run build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  $ yarn build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh
  $ bun run build
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

بعد تنفيذ هاته الأوامر ستحصل على مشروعك الأول في Vue،  ما ستلاحظه هو أن المكونات المولدة مكتوبة باستخدام [الواجهة التركيبية](/guide/introduction#composition-api) و `<script setup>`، بدلاً من [واجهة الخيارات](/guide/introduction#options-api). إليك بعض الإرشادات الإضافية :

- محرر النصوص الموصى به هو [Visual Studio Code](https://code.visualstudio.com/) + [إضافة Volar ](https://marketplace.visualstudio.com/items?itemName=Vue.volar). أما إذا كنت تستخدم محررات أخرى، فاطلع على [قسم دعم المحررات](/guide/scaling-up/tooling#ide-support).
- نناقش المزيد من التفاصيل حول الأدوات، بما في ذلك الدمج مع إطارات الواجهة الخلفية  في [دليل الأدوات](/guide/scaling-up/tooling).
- لكي تتعلم المزيد حول أداة البناء الأساسية Vite ،  اطلع على [توثيق Vite](https://vitejs.dev).
- إذا اخترت استخدام TypeScript ، فاطلع [دليل استخدام TypeScript](typescript/overview).

لما تنهي تطوير تطبيقك و تريد ادخاله لمرحلة الإنتاج، قم بتشغيل الأمر التالي:

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm run build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">
  
  ```sh
  $ pnpm run build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">
  
  ```sh
  $ yarn build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">
  
  ```sh
  $ bun run build
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

هذا الأمر سينشئ إصداراً جاهزاً للإنتاج من تطبيقك في مجلد `./dist` على مستوى مجلد المشروع.اطلع على [دليل نشر الانتاج](/guide/best-practices/production-deployment) لمعرفة المزيد حول توصيل تطبيقك إلى مرحلة الانتاج.

[الخطوات الموالية >](#next-steps)

## استخدام Vue  من شبكات تسليم المحتوى (CDN) {#using-vue-from-cdn}

 تستطيع استخدام Vue مباشرةً من شبكات تسليم المحتوى (CDN) عبر وسم الـ`</script>`:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

هنا استخدمنا [unpkg](https://unpkg.com/)، لكن يمكنك أيضاً استخدام أي شبكة تسليم المحتوى (CDN) تقدم حزم npm، مثل [jsdelivr](https://www.jsdelivr.com/package/npm/vue) أو [cdnjs](https://cdnjs.com/libraries/vue). بالطبع، يمكنك أيضاً تنزيل هذا الملف في جهازك واعداده بنفسك داخل مشروعك.

لما تستخدم Vue من شبكة تسليم المحتوى (CDN)، لا يوجد "خطوة بناء" متضمنة. هذا يجعل الإعداد أكثر بساطة، ومناسب لتعزيز HTML ثابت أو دمجه مع إطار الواجهة الخلفية. لكن لن تتمكن من استخدام صيغة المكونات أحادية الملف (SFC).

### استخدام عملية بناء عامة {#using-the-global-build}

الرابط اعلاه يحمل *عملية البناء العامة* لـ Vue، حيث يتم تعريض جميع واجهات برمجة التطبيقات (API) على المستوى الأعلى كخاصيات على الكائن العام `Vue`. هنا مثال كامل لاستخدام عملية البناء العامة:

<div class="options-api">

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

[عرض على  Codepen](https://codepen.io/vuejs-examples/pen/QWJwJLp)

</div>

<div class="composition-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[عرض على  Codepen](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::tip ملاحظة
الكثير من الأمثلة في الواجهة التركيبية في جميع أنحاء الدليل ستستخدم الصيغة `<script setup>`، والتي تتطلب أدوات البناء. إذا كنت تنوي استخدام واجهة التركيبية بدون خطوة بناء، فاطلع على استخدام [خيار `()setup`](/api/composition-api-setup).
:::

</div>

### استخدام عملية البناء بوحدات الـES {#using-the-es-module-build}

فيما تبقى من التوثيق، سنستخدم بشكل أساسي صيغة [وحدات ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).  معظم المتصفحات الحديثة تدعم وحدات الـES  بشكل أصلي، لذا يمكننا استخدام Vue من شبكة تسليم المحتوى (CDN) عبر وحدات ES الأصلية مثل هذا المثال:

<div class="options-api">

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

</div>

<div class="composition-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

</div>

كما تلاحظ أننا نستخدم وسم `<script type="module">`, والرابط المستورد من شبكة تسليم المحتوى (CDN) يشير إلى النسخة المبنية بـ**وحدات الـES** بدلا من كائن Vue.

<div class="options-api">

[عرض على  Codepen](https://codepen.io/vuejs-examples/pen/VwVYVZO)

</div>
<div class="composition-api">

[عرض على  Codepen](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### تمكين خرائط الاستيراد {#enabling-import-maps1}

في المثال أعلاه، استوردنا الواجهات من الرابط الكامل لشبكة تسليم المحتوى (CDN)، لكن في باقي التوثيق سترى شيفرات شبيهة بالمثال الموالي:

```js
import { createApp } from 'vue'
```

نستطيع اعلام المتصفح على مكان استيراد وحدة `vue` عبر استخدام [خرائط الاستيراد](https://caniuse.com/import-maps) :

<div class="options-api">

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

[عرض على  Codepen](https://codepen.io/vuejs-examples/pen/wvQKQyM)

</div>

<div class="composition-api">

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
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[عرض على  Codepen](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

تستطيع أيضاً إضافة مدخلات للاعتماديات الأخرى إلى خريطة الاستيراد - لكن تأكد من أنها تشير إلى الإصدار الأصلي لوحدات الـES للمكتبة التي تنوي استخدامها.

:::tip دعم خرائط الاستيراد في المتصفح
خرائط الاستيراد هي ميزة متصفح جديدة نسبيًا. تأكد من استخدام متصفح ضمن [نطاق الدعم](https://caniuse.com/import-maps). وبشكل خاص، فهي مدعومة فقط في Safari 16.4+.
:::

:::warning ملاحظات عن الاستخدام في الإنتاج
الأمثلة السابقة تستخدم الإصدار التطويري لـVue - إذا كنت تنوي استخدام Vue من شبكة تسليم المحتوى (CDN) في الإنتاج، تأكد من مراجعة [دليل نشر الإنتاج](/guide/best-practices/production-deployment#without-build-tools).

While it is possible to use Vue without a build system, an alternative approach to consider is using [`vuejs/petite-vue`](https://github.com/vuejs/petite-vue) that could better suit the context where [`jquery/jquery`](https://github.com/jquery/jquery) (in the past) or [`alpinejs/alpine`](https://github.com/alpinejs/alpine) (in the present) might be used instead.
:::

### تقسيم وحدات الـES {#splitting-up-the-modules}

بينما نتعمق في الدليل، قد نحتاج إلى تقسيم الشفرة إلى ملفات JavaScript منفصلة لتسهيل إدارتها. على سبيل المثال:

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>العداد {{ count }}</div>`
}
```

</div>
<div class="composition-api">

```js
// my-component.js
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>Count is: {{ count }}</div>`
}
```

</div>

إذا فتحت ملف `index.html` أعلاه مباشرةً في متصفحك، ستجد أنه يرمي بخطأ لأن وحدات الـES لا يمكن أن تعمل عبر البروتوكول `//:file`، وهو البروتوكول الذي يستخدمه المتصفح عند فتح ملف محلي.

لأسباب أمنية، فإن وحدات الـES يمكن أن تعمل فقط عبر البروتوكول `//:http`، وهو البروتوكول الذي يستخدمه المتصفح عند فتح صفحات على الويب. من أجل أن تعمل وحدات الـES على جهازنا المحلي، نحتاج إلى تقديم ملف `index.html` عبر البروتوكول `//:http`،، مع خادم HTTP محلي.

لبدء خادم HTTP محلي، تأكد أولاً من تثبيت [Node.js](https://nodejs.org/en/)، ثم قم بتشغيل `npx serve` من سطر الأوامر في نفس المجلد الذي يوجد به ملف HTML الخاص بك. يمكنك أيضًا استخدام أي خادم HTTP آخر يمكنه تقديم الملفات الثابتة مع أنواع MIME الصحيحة.

ربما لاحظت أن قالب المكون المستورد مضمن كسلسلة JavaScript. إذا كنت تستخدم VSCode، يمكنك تثبيت إضافة [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) وإضافة تعليق `/*html*/` للسلاسل النصية للحصول على تمييز الصيغة لها.

## الخطوات الموالية {#next-steps}

إذا تخطيت [المقدمة](/guide/introduction)، ننصحك بشدة بقراءتها قبل الانتقال إلى باقي التوثيق.

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
