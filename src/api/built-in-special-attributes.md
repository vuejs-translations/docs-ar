# سمات مدمجة خاصة {#built-in-special-attributes}

## key {#key}

السمة الخاصة `key` تُستخدم أساسًا كتلميح لخوارزمية الـDOM الافتراضي في Vue لتحديد العقد الافتراضية عند المطابقة بين قائمة العقد الجديدة والقائمة القديمة.

- **تتوقع قيمة من نوع:** `number | string | symbol`

- **التفاصيل**

  بدون مفاتيح، تستخدم Vue خوارزمية تقلل من حركة العناصر وتحاول إصلاح/إعادة استخدام العناصر من نفس النوع في المكان قدر الإمكان. مع المفاتيح، ستعيد ترتيب العناصر بناءً على تغيير ترتيب المفاتيح، وستُزال/تُتلف العناصر التي لم تعد موجودة من الآن فصاعدا.

  يجب أن تحتوي العناصر الأبناء لنفس الأب المشترك على **مفاتيح وحيدة**. ستتسبب المفاتيح المكررة في أخطاء تصييرية.

  حالة الاستخدام الأكثر شيوعًا هي مع `v-for`:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  يمكن أيضًا استخدامه لإجبار استبدال عنصر/مكون بدلاً من إعادة استخدامه. يمكن أن يكون ذلك مفيدًا عندما تريد:

  - تشغيل بشكل صحيح خطافات دورة حياة مكون
  - تشغيل الانتقالات

  على سبيل المثال:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  عندما يتغير `text`، سيستبدل `<span>` دائمًا بدلاً من إصلاحه، لذا سيشغل انتقال.

- **اطلع أيضًا على** [الدليل - تصيير القوائم - الحفاظ على الحالة مع `key`](/guide/essentials/list#maintaining-state-with-key)

## ref {#ref}

يشير إلى [مرجع القالب](/guide/essentials/template-refs).

- **تتوقع قيمة من نوع:** `string | Function`

- **التفاصيل**

  `ref` يستخدم لتسجيل مرجع إلى عنصر أو مكون ابن.

  في واجهة الخيارات، سيسجل المرجع تحت كائن `this.$refs` للمكون:

  ```vue-html
  <!--  تُخزن كـ this.$refs.p -->
  <p ref="p">hello</p>
  ```

  في الواجهة التركيبية، سيخزن المرجع في ref بالاسم المطابق:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const p = ref()
  </script>

  <template>
    <p ref="p">السلام عليكم</p>
  </template>
  ```

  إذا استخدمت على عنصر DOM عادي، سيكون المرجع هو هذا العنصر؛ إذا استخدمت على مكون ابن، سيكون المرجع هو نسخة المكون الابن.

  بدلاً من ذلك، يمكن لـ `ref` قبول دالة كقيمة توفر التحكم الكامل في مكان تخزين المرجع:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  ملاحظة مهمة حول توقيت تسجيل المرجع: لأن المراجع تُنشأ بذاتها نتيجة لدالة التصيير، يجب عليك الانتظار حتى يُوصَّل المكون قبل الوصول إليها.

  `this.$refs` أيضًا غير تفاعلي، لذا يجب ألا تحاول استخدامه في القوالب لربط البيانات.

- **اطلع أيضًا على**
  - [الدليل - مراجع القوالب](/guide/essentials/template-refs)
  - [الدليل - إضافة الأنواع إلى مراجع القوالب](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [الدليل - إضافة الأنواع إلى مراجع قوالب المكون](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## is {#is}

يستخدم لربط [المكونات الديناميكية](/guide/essentials/component-basics#dynamic-components).

- **يتوقع قيمة من نوع:** `string | Component`

- **الاستخدامعلى العناصر الأصلية** <sup class="vt-badge">3.1+</sup>

  عندما تستخدم السمة `is` على عنصر HTML أصلي، ستترجم على أنها [عنصر مدمج مخصص](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)، وهو ميزة أصلية لمنصة الويب.

  ومع ذلك، هناك حالة استخدام حيث قد تحتاج Vue إلى استبدال عنصر أصلي بمكون Vue، كما هو موضح في [تنبيهات تحليل القوالب في DOM](/guide/essentials/component-basics#in-dom-template-parsing-caveats). يمكنك إضافة بادئة لقيمة السمة `is` بـ `:vue` حتى يقوم Vue بدلاً من ذلك بتصيير العنصر كمكون Vue :

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **اطلع أيضًا على**

  - [العنصر الخاص المدمج - `<component>`](/api/built-in-special-elements#component)
  - [المكونات الديناميكية](/guide/essentials/component-basics#dynamic-components)
