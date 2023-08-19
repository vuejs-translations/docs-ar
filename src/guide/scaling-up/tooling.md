# الأدوات {#tooling}

## التجربة عبر النت {#try-it-online}

لا تحتاج إلى تثبيت أي شيء على جهازك لتجربة المكونات أحادية الملف  - هناك حقول تجارب عبر الإنترنت تسمح لك بالقيام بذلك مباشرة في المتصفح:

- [حقل تجارب المكونات أحادية الملف](https://sfc.vuejs.org)
  - دائما تنشر مع أحدث تعديل  لـVue
  - مصمم لفحص نتائج تصريف المكون
- [Vue + Vite على منصة StackBlitz](https://vite.new/vue)
  - بيئة عمل مشابهة لـلمحررات المألوفة تتشغل بخادوم تطوير Vite الفعلي داخل المتصفح
  - قريبة من الإعداد المحلي داخل جهازك

من المستحسن أيضًا استخدام هذه الحقول عبر الإنترنت لتقديم استنساخ للمشاكل عند إبلاغ عن الأخطاء.

## تهيئة المشروع {#project-scaffolding}

### أداة Vite {#vite}

[Vite](https://vitejs.dev/) هي أداة بناء خفيفة وسريعة مع دعم المكونات أحادية الملف بالدرجة الأولى. أنشئ من قبل Evan You، والذي بدوره أنشأ Vue!

للبدء مع Vite + Vue، قم بتشغيل الأمر التالي:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">$</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

هذا الأمر سيقوم بتثبيت وتنفيذ [create-vue](https://github.com/vuejs/create-vue), وهي الأداة الرسمية لتهيئة مشاريع Vue.

- لمعرفة المزيد حول Vite، قم بزيارة [Vite توثيق](https://vitejs.dev).
- لتهيئة السلوك الخاص بـVue في مشروع Vite، على سبيل المثال تمرير خيارات إلى مصرف Vue، قم بزيارة [ توثيق ملحق Vue في Vite](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme)

كلا الحقلين عبر الإنترنت المذكورين أعلاه يدعمان تنزيل الملفات كمشروع Vite.

### أداة Vue CLI  {#vue-cli}

[Vue CLI](https://cli.vuejs.org/) هي سلسلة الأدوات الرسمية المبنية على webpack لـVue. وهي الآن في وضع الصيانة ونوصي ببدء المشاريع الجديدة مع Vite ما لم تكن تعتمد على ميزات webpack فقط. ستوفر Vite تجربة تطوير أفضل في معظم الحالات.

لمعرفة المزيد حول الترحيل من Vue CLI إلى Vite:

- [دليل الترحيل من Vue CLI إلى Vite من VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [أدوات / ملحقات تساعد على الترحيل التلقائي](https://github.com/vitejs/awesome-vite#vue-cli)

### ملاحظة حول تصريف القوالب في المتصفح {#note-on-in-browser-template-compilation}

عند استخدام Vue دون عملية بناء، تُكتب قوالب المكونات إما مباشرة في صفحة الـHTML  أو كسلاسل نصية مضمنة في الـJavaScript. في هذه الحالات، يحتاج Vue إلى شحن مصرف القوالب إلى المتصفح لإجراء تصريف قوالب في وقت التشغيل. من ناحية أخرى، لن يكون المصرف ضروريًا إذا قمنا بترجمة القوالب مسبقًا بعملية بناء. لتقليل حجم الحزمة المبنية، توفر Vue [بنيات متعددة](https://unpkg.com/browse/vue@3/dist/) محسنة لحالات الاستخدام المختلفة.

- بنية ملفات  تبدأ بـ `vue.runtime.*` و التي هي **بنيات وقت التشغيل فقط**: لا تتضمن المصرف. عند استخدام هذه البنيات، يجب تصريف جميع القوالب مسبقًا عبر عملية بناء.

- بنية ملفات لا تتضمن `.runtime` هي **بنيات كاملة**: تتضمن المصرف وتدعم ترجمة القوالب مباشرة في المتصفح. ومع ذلك، ستزيد حمولة البنية بحوالي 14 كيلوبايت.

تستخدم الإعدادات الافتراضية للأدوات لدينا بنية وقت التشغيل فقط لأن جميع القوالب في ملفات SFC مصرفة مسبقًا. إذا كنت بحاجة إلى تصريف القوالب في المتصفح حتى مع عملية بناء لأي سبب، يمكنك القيام بذلك عن طريق إعداد أداة البناء لتعيين الاسم البديل  إلى `vue/dist/vue.esm-bundler.js` بدلاً من `vue`.

إذا كنت تبحث عن بديل خفيف الوزن للاستخدام بدون عملية بناء، اطلع على [petite-vue](https://github.com/vuejs/petite-vue).

## دعم المحررات {#ide-support}

 إعداد المحرر الموصى به هو [VSCode](https://code.visualstudio.com/) + إضافة [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) . توفر الإضافة ابراز الصيغة ودعم TypeScript والتحسس الذكي لتعبيرات القالب وخاصيات المكون.

  :::tip ملاحظة
  Volar يحل محل [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)، الإضافة الرسمية السابقة لـ VSCode لـ Vue 2. إذا كنت تستخدم Vetur حاليًا، تأكد من تعطيلها في مشاريع Vue 3.
  :::

- [محرر WebStorm](https://www.jetbrains.com/webstorm/) يوفر أيضًا دعمًا رائعًا مدمجًا للمكونات أحادية الملف.

- المحررات الأخرى التي تدعم [ بروتوكول خدمة اللغة Language Service Protocol](https://microsoft.github.io/language-server-protocol/)  يمكنها أيضًا الاستفادة من الميزات الأساسية لـVolar عبر LSP:

  - دعم محرر Sublime Text عبر [LSP-Volar](https://github.com/sublimelsp/LSP-volar).

  - دعم vim / Neovim عبر [coc-volar](

  - دعم emacs عبر [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/)

## أدوات التطوير و التحكم في المتصفح {#browser-devtools}

<VueSchoolLink href="https://vueschool.io/lessons/using-vue-dev-tools-with-vuejs-3" title="Free Vue.js Devtools Lesson"/>

تتيح لك إضافة أدوات Vue للتطوير في المتصفح  تصفح شجرة مكونات تطبيق Vue وفحص حالة المكونات الفردية وتتبع أحداث إدارة الحالة وتحليل أداء التطبيق.

![devtools screenshot](https://raw.githubusercontent.com/vuejs/devtools/main/media/screenshot-shadow.png)

- [التوثيق](https://devtools.vuejs.org/)
- [إضافة كروم](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [إضافة فايرفوكس](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [تطبيق إلكترون مستقل](https://devtools.vuejs.org/guide/installation.html#standalone)

## TypeScript {#typescript}

الصفحة الرئيسية: [استخدام Vue مع TypeScript](/guide/typescript/overview).

- [Volar](https://github.com/johnsoncodehk/volar) توفر التحقق من النوع للمكونات أحادية الملف باستخدام تكتيل `<"script lang="ts>`، بما في ذلك تعبيرات القالب والتحقق من صحة الخاصيات بين المكونات.

- استخدم [`vue-tsc`](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc) لتنفيذ نفس التحقق من النوع من خلال سطر الأوامر أو لإنشاء ملفات `d.ts` للمكونات أحادية الملف.

## الاختبار {#testing}

الصفحة الرئيسية: [دليل الاختبار](/guide/scaling-up/testing).

- [إطار Cypress](https://www.cypress.io/) موصى به للاختبارات E2E. يمكن استخدامه أيضًا لاختبار المكونات  أحادية الملف لـVue عبر [Cypress Component Test Runner](https://docs.cypress.io/guides/component-testing/introduction).

- [Vitest](https://vitest.dev/) هو مشغل اختبارات أنشئ من قبل أعضاء فريق Vue / Vite ويركز على السرعة. صُمم خصيصًا للتطبيقات المبنية بـVite لتوفير نفس حلقة الملاحظات الفورية لاختبار الوحدات / المكونات.

- يمكن جعل [Jest](https://jestjs.io/) يعمل مع Vite عبر [vite-jest](https://github.com/sodatea/vite-jest). ومع ذلك، فإن هذا ينصح به فقط إذا كان لديك مجموعات اختبارات Jest موجودة من قبل وتحتاج إلى ترحيلها إلى إعداد Vite المبني على Vite، حيث يوفر Vitest وظائف مماثلة مع تكامل أكثر فعالية.

## تدقيق الشيفرة {#linting}

فريق Vue يواصل التطوير على [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)، وهو ملحق [ESLint](https://eslint.org/) يدعم قواعد التدقيق الخاصة بالمكونات أحادية الملف.

يمكن للمطورين الذين استخدموا Vue CLI سابقًا أن يكونوا على دراية بتكوين مدققي الشيفرة عبر محملات webpack. ومع ذلك، عند استخدام إعداد عملية بناء مرتكزة على Vite، فإننا نوصي بشكل عام بـ:

1. تنفيذ الأمور `npm install -D eslint eslint-plugin-vue`، ثم اتباع دليل [الإعداد](https://eslint.vuejs.org/user-guide/#usage) لـ`eslint-plugin-vue`.

2. إعداد إضافات ESLint للمحرر، على سبيل المثال [ESLint الداعم لـVSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)، حتى تحصل على ملاحظات التدقيق مباشرة في المحرر خلال التطوير. وهذا يجنب أيضًا تكلفة التدقيق غير الضرورية عند بدء خادوم التطوير.

3. تشغيل ESLint كجزء من أمر إنشاء الإنتاج، حتى تحصل على ملاحظات التدقيق الكاملة قبل الانتقال إلى مرحلة الإنتاج.

4. (اختياري) إعداد الأدوات مثل [lint-staged](https://github.com/okonet/lint-staged) لتدقيق الملفات المعدلة تلقائيًا عند الإيداع عبر git.

## تنسيق الشيفرة {#formatting}

- إضافة [Volar](https://github.com/johnsoncodehk/volar) لـVSCode توفر تنسيق لمكونات Vue أحادية الملف.

- كبديل آخر، يوفر [Prettier](https://prettier.io/) دعمًا مدمجًا لتنسيق مكونات Vue أحادية الملف.

## دمج كتل مخصصة في الـSFC {#sfc-custom-block-integrations}

الكتل المخصصة تُصرف إلى استيرادات لنفس ملف Vue مع استعلامات طلب مختلفة. يعتمد الأمر على أداة البناء الأساسية لمعالجة طلبات الاستيراد هذه.

- إذا كنت تستخدم Vite، فإنه يجب استخدام ملحق Vite لتحويل الكتل المخصصة المطابقة إلى شيفرة JavaScript قابلة للتنفيذ. [مثال](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- إذا كنت تستخدم Vue CLI أو تهيئة webpack خام، فإنه يجب إعداد محمل webpack لتحويل الكتل الموجودة. [مثال](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## الحزم متدنية المستوى {#lower-level-packages}

### `@vue/compiler-sfc` {#vue-compiler-sfc}

- [التوثيق](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

هذه الحزمة جزء من مشروع Vue الرئيسي وتُنشر دائمًا مع نفس الإصدار مع الحزمة الرئيسية `vue`. ويتم تُضمن كاعتمادية للحزمة الرئيسية `vue` وتمرر تحت مسمى `vue/compiler-sfc` حتى لا تحتاج إلى تثبيتها بشكل منفرد.

هذه الحزمة توفر أدوات متدنية المستوى لمعالجة مكونات Vue أحادية الملف وهي مخصصة لمطور الأدوات التي تحتاج إلى دعم مكونات Vue أحادية الملف في أدوات مخصصة.

:::tip ملاحظة
 دائمًا فضل استخدام هذه الحزمة عبر استيراد عميق `vue/compiler-sfc` لأنه يضمن أن إصداره متزامن مع وحدة تشغيل Vue.
:::

### `@vitejs/plugin-vue` {#vitejs-plugin-vue}

- [التوثيق](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)

الملحق الرسمي الذي يوفر دعمًا لمكونات Vue أحادية الملف في Vite.

### `vue-loader` {#vue-loader}

- [التوثيق](https://vue-loader.vuejs.org/)

المحمل الرسمي الذي يوفر دعمًا لمكونات Vue أحادية الملف في webpack. إذا كنت تستخدم Vue CLI، يرجى الاطلاع أيضًا على [التوثيقات حول تعديل خيارات `vue-loader` في Vue CLI](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

## حقول تجارب أخرى {#other-online-playgrounds}

- [ حقل تجارب مكتبة VueUse](https://play.vueuse.org)
- [Vue + Vite على مستوى موقع Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue على موقع CodeSandbox](https://codesandbox.io/s/vue-3)
- [Vue على موقع  Codepen](https://codepen.io/pen/editor/vue)
- [Vue على موقع  Components.studio](https://components.studio/create/vue3)
- [Vue على موقع  WebComponents.dev](https://webcomponents.dev/create/cevue)

<!-- TODO ## Backend Framework Integrations -->
