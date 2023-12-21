# شمولية الوصول {#accessibility}

شمولية الوصول في الويب (و المعروفة اختصارا بـa11y) هي عبارة عن ممارسة تإنشاء مواقع ويب يمكن استخدامها من قبل أي شخص - سواء كان لديه إعاقة أو اتصال بطيء أو برامج تشغيل قديمة أو مكسورة أو ببيئة غير ملائمة. على سبيل المثال، إضافة ترجمة للفيديو ستساعد على توفير الوصول للمستخدمين الذين لديهم اعاقة سمعية أو مستخدمين الذين يعيشون في بيئة صاخبة ولا يستطيعون سماع هاتفهم. بشكل مماثل، تأكد من أن نصك ليس ذو تباين منخفض جدا لأنه سيساعد على توفير الوصول للمستخدمين الذين لديهم اعاقة بصرية أو مستخدمين الذين يحاولون استخدام هاتفهم في ظل الشمس القوية.

جاهز للانطلاق ولكن لست متأكدا من أين تبدأ؟

اطلع على [دليل تخطيط وإدارة شمولية الوصول في الويب](https://www.w3.org/WAI/planning-and-managing/) المقدم من [مؤسسة الشبكة العالمية (W3C)](https://www.w3.org/)

## رابط التخطي {#skip-link}

يجب عليك إضافة رابط في أعلى كل صفحة يذهب مباشرة إلى منطقة المحتوى الرئيسي حتى يتمكن المستخدمون من تخطي المحتوى الذي يتكرر على عدة صفحات ويب.

عادة ما يتم ذلك في أعلى `App.vue` حيث سيكون هو العنصر الأول الذي يمكن التركيز عليه في جميع الصفحات:

```vue-html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink" class="skip-link">تخطى إلى المحتوى الرئيسي</a>
  </li>
</ul>
```

لإخفاء الرابط إلا إذا رُكز عليه، يمكنك إضافة التنسيق التالي:

```css
.skip-link {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skip-link:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
```

بمجرد تغيير المستخدم التوجيه، أعد تركيز على رابط التخطي. يمكن الوصول إلى ذلك من خلال استدعاء التركيز على رابط التخطي من مرجع القالب (بفرض استخدام `vue-router`):

<div class="options-api">

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus()
    }
  }
}
</script>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)
</script>
```

</div>

[اطلع على رابط التخطي إلى المحتوى الرئيسي](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## هيكلية المحتوى {#content-structure}

واحدة من أهم قطع شمولية الوصول هو التأكد من أن التصميم يمكنه دعم تنفيذ شمولية الوصول. لا يجب أن يُعتبر التصميم فقط كالتباين اللوني واختيار الخط وتحجيم النص واللغة، بل أيضًا كيفية هيكلة المحتوى في التطبيق.

### الترويسات {#headings}

يمكن للمستخدمين تنقل التطبيق من خلال الترويسات. امتلاك ترويسات وصفية لكل قسم من التطبيق يجعل تنبؤ محتوى كل قسم أسهل للمستخدمين. عندما يتعلق الأمر بالترويسات، هناك بعض ممارسات شمولية الوصول الموصى بها:

- اجعل الترويسات متداخلة حسبت رتبتها: `<h1>` - `<h6>`
- لا تتخطى الترويسات داخل قسم
- استخدم علامات الترويسة الفعلية بدلاً من تنسيق النص لإعطاء مظهر مرئي للترويسات

[اقرأ المزيد عن الترويسات](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```vue-html
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">عنوان رئيسي</h1>
  <section aria-labelledby="section-title-1">
    <h2 id="section-title-1"> عنوان قسم </h2>
    <h3>عنوان فرعي للقسم</h3>
    <!-- محتوى -->
  </section>
  <section aria-labelledby="section-title-2">
    <h2 id="section-title-2"> عنوان قسم </h2>
    <h3>عنوان فرعي للقسم</h3>
    <!-- محتوى -->
    <h3>عنوان فرعي للقسم</h3>
    <!-- محتوى -->
  </section>
</main>
```

### العناصر المُميِّزة {#landmarks}

[العناصر المميزة](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) توفر الوصول البرمجي إلى الأقسام داخل التطبيق. يمكن للمستخدمين الذين يعتمدون على التقنيات المساعدة التنقل إلى كل قسم من التطبيق وتخطي المحتوى. يمكنك استخدام [أدوار ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) لمساعدتك في الحصول على ذلك.

| HTML            | ARIA Role            | Landmark Purpose                                                                                                 |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| header          | role="banner"‎        | العنوان الرئيسي: عنوان الصفحة                                                                                    |
| nav             | role="navigation"‎    | مجموعة من الروابط المناسبة للاستخدام عند تنقل الوثيقة أو الوثائق ذات الصلة                                        |
| main            | role="main"‎          | المحتوى الرئيسي أو المركزي للوثيقة.                                                                              |
| footer          | role="contentinfo"‎   | معلومات عن الوثيقة الأصلية: الحاشيات / حقوق النشر / روابط إلى بيان الخصوصية                                       |
| aside           | role="complementary"‎ | يدعم المحتوى الرئيسي ، ولكنه مفصول ومعناه على حدة في محتوىه                                                      |
| search          | role="search"‎        | هذا القسم يحتوي على وظيفة البحث للتطبيق                                                                          |
| form            | role="form"‎          | مجموعة من عناصر النموذج المرتبطة                                                                                 |
| section         | role="region"‎        | المحتوى الذي يتعلق به والذي يرغب المستخدمون بالتنقل إليه بشكل عام. يجب توفير تسمية لهذا العنصر                   |

:::tip نصيحة:
يُوصى باستخدام عناصر HTML المميزة مع سمات دور عنصر مميز مكررة لتحسين التوافق مع [المتصفحات القديمة التي لا تدعم عناصر HTML5 الدلالية](https://caniuse.com/#feat=html5semantic).
:::

[اطلع اكثر على العناصر المميزة](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

## النماذج الدلالية {#semantic-forms}

عند إنشاء نموذج ، يمكنك استخدام العناصر التالية: `<form>` ، `<label>` ، `<input>` ، `<textarea>` و `<button>`

عادة توضع عناصر التسميات (labels) على الأعلى أو على يسار حقول النموذج:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

<!-- <common-codepen-snippet title="Simple Form" slug="dyNzzWZ" :height="368" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

لاحظ كيف يمكنك تضمين `'autocomplete='on` على عنصر النموذج وسيطبق على جميع الإدخالات في النموذج الخاص بك. يمكنك أيضًا تعيين [قيم مختلفة لسمة الإكمال التلقائي](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) لكل إدخال.

### عناصر التسميات (labels) {#labels}

قم بإضافة عناصر التسميات (labels) لوصف الغرض من جميع عناصر التحكم في النموذج ؛ ربط `for` و `id`:

```vue-html
<label for="name">الاسم</label>
<input type="text" name="name" id="name" v-model="name" />
```

<!-- <common-codepen-snippet title="Form Label" slug="XWpaaaj" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

إذا فحصت هذا العنصر في أدوات التطوير لـChrome وفتحت علامة التبويب Accessibility داخل علامة التبويب للعناصر (Elements) ، سترى كيف يحصل الإدخال على اسمه من عنصر التسمية:

![أدوات تطوير Chrome تظهر اسم الإدخال الوصولي من عنصر التسمية](./images/AccessibleLabelChromeDevTools.png)

:::warning تحذير:
على الرغم من أنك ربما قد رأيت عناصر التسميات (labels) تغطي حقول الإدخال مثل هذا:

```vue-html
<label>
  الاسم:
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

إن تعيين عناصر التسميات (labels) بشكل صريح مع معرف مطابق هو أفضل دعم للتقنية المساعدة.
:::

#### سمة `aria-label` {#aria-label}

يمكنك أيضًا إعطاء الإدخال اسمًا قابلاً للوصول باستخدام [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label).

```vue-html
<label for="name">الاسم</label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```

<!-- <common-codepen-snippet title="Form ARIA label" slug="NWdvvYQ" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

لا تتردد في فحص هذا العنصر في أدوات تطوير Chrome لرؤية كيف تغير اسم الوصول:

![Chrome Developer Tools showing input accessible name from aria-label](./images/AccessibleARIAlabelDevTools.png)

#### سمة `aria-labelledby` {#aria-labelledby}

استخدام [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) مماثل ل `aria-label` باستثناء أنه يستخدم إذا كان نص التسمية مرئيًا على الشاشة. يُربط بعناصر أخرى بمعرفاتها `id` ويمكنك ربط عدة معرفات:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">الفواتير</h1>
  <div class="form-item">
    <label for="name">الاسم:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="اسم الفاتورة"
    />
  </div>
  <button type="submit">ارسال</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA labelledby" slug="MWJvvBe" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

![أدوات تطوير Chrome تظهر اسم الإدخال الوصولي من aria-labelledby](./images/AccessibleARIAlabelledbyDevTools.png)

#### سمة `aria-describedby` {#aria-describedby}

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) يستخدم بنفس الطريقة مثل `aria-labelledby` باستثناء أنه يوفر وصفًا مع معلومات إضافية قد يحتاجها المستخدم. يمكن استخدامه لوصف معايير أي إدخال:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">الفواتير</h1>
  <div class="form-item">
    <label for="name">الاسم الكامل:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="اسم الفاتورة"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">يرجى تقديم الاسم الأول والأخير.</p>
  </div>
  <button type="submit">ارسال</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA describedby" slug="gOgxxQE" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

يمكنك رؤية الوصف عن طريق فحص أدوات تطوير Chrome:

![أدوات تطوير Chrome تظهر اسم الإدخال الوصولي من aria-labelledby والوصف مع aria-describedby](./images/AccessibleARIAdescribedby.png)

### سمة Placeholder {#placeholder}

تجنب استخدام placeholders لأنها قد تشوش على العديد من المستخدمين.

واحدة من المشاكل مع placeholders هي أنها لا تلبي [معايير تباين الألوان](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) افتراضيًا؛ إصلاح تباين الألوان يجعل placeholder تبدو مثل البيانات المدخلة في حقول الإدخال. بنظرة إلى المثال التالي، يمكنك رؤية أن المحتوى النائب (placeholder) لاسم العائلة الذي يلبي معايير تباين الألوان يبدو مثل البيانات المدخلة:

![محتوى نائب (placeholder) وصولي](./images/AccessiblePlaceholder.png)

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      type="text"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
      :placeholder="item.placeholder"
    />
  </div>
  <button type="submit">ارسال</button>
</form>
```

```css
/* https://www.w3schools.com/howto/howto_css_placeholder.asp */

#lastName::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}

#lastName:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

#lastName::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}
```

يفضل تقديم كل المعلومات التي يحتاجها المستخدم لملء النماذج خارج أي إدخالات.

### التعليمات {#instructions}

عند إضافة تعليمات لحقول الإدخال الخاصة بك، تأكد من ربطها بشكل صحيح مع الإدخال.
يمكنك تقديم تعليمات إضافية وربط معرفات متعددة داخل [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby). هذا يسمح بتصميم أكثر مرونة.

```vue-html
<fieldset>
  <legend>استخدام aria-labelledby</legend>
  <label id="date-label" for="date">التاريخ الحالي:</label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>
```

بدلاً من ذلك، يمكنك إرفاق التعليمات مع الإدخال باستخدام [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby):

```vue-html
<fieldset>
  <legend>استخدام aria-describedby</legend>
  <label id="dob" for="dob">تاريخ الميلاد:</label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

<!-- <common-codepen-snippet title="Form Instructions" slug="WNREEqv" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### اخفاء المحتوى {#hiding-content}

عادةً ما لا ينصح بإخفاء التسميات بصورة مرئية، حتى إذا كان الإدخال له اسم وصولي. ومع ذلك، إذا كانت وظيفة الإدخال يمكن فهمها بواسطة المحتوى المحيط، فإذن يمكننا إخفاء التسمية المرئية.

لننظر إلى حقل البحث هذا:

```vue-html
<form role="search">
  <label for="search" class="hidden-visually">Search: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Search</button>
</form>
```

يمكننا القيام بذلك لأن زر البحث سيساعد المستخدمين الذي يمكنهم الرؤية على تحديد هدف حقل الإدخال.

يمكننا استخدام CSS لإخفاء المكونات بصورة مرئية ولكن تبقى متاحة للتقنيات المساعدة:

```css
.hidden-visually {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```

<!-- <common-codepen-snippet title="Form Search" slug="QWdMqWy" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

#### سمة `aria-hidden="true"` {#aria-hidden-true}

إضافة `aria-hidden="true"` ستخفي المكون من التقنيات المساعدة ولكن ستبقي متاحة بصورة مرئية للمستخدمين الآخرين. لا تستخدمه على المكونات التي يمكن التركيز عليها، بل على المحتوى المزين والمكرر والخارج عن الشاشة.

```vue-html
<p>هذا لا يختفي في قارئات الشاشة.</p>
<p aria-hidden="true">هذا مخفي في قارئات الشاشة.</p>
```

### الأزرار {#buttons}

عند استخدام الأزرار داخل نموذج، يجب عليك تعيين النوع لمنع إرسال النموذج.
يمكنك أيضًا استخدام إدخال لإنشاء أزرار:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- الأزرار -->
  <button type="button">الغاء</button>
  <button type="submit">ارسال</button>

  <!-- أزرار الادخال -->
  <input type="button" value="الغاء" />
  <input type="submit" value="ارسال" />
</form>
```

<!-- <common-codepen-snippet title="Form Buttons" slug="JjEyrYZ" :height="467" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### الصور الوظيفية {#functional-images}

يمكنك استخدام هذه التقنية لإنشاء صور وظيفية.

- حقول الإدخال

  - ستعمل هذه الصور كزر إرسال في النماذج

  ```vue-html
  <form role="search">
    <label for="search" class="hidden-visually">بحث: </label>
    <input type="text" name="search" id="search" v-model="search" />
    <input
      type="image"
      class="btnImg"
      src="https://img.icons8.com/search"
      alt="بحث"
    />
  </form>
  ```

- أيقونات

```vue-html
<form role="search">
  <label for="searchIcon" class="hidden-visually">بحث: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">بحث</span>
  </button>
</form>
```

<!-- <common-codepen-snippet title="Functional Images" slug="jOyLGqM" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

## المعايير {#standards}

تحالف الشبكة العالمية (W3C) للويب ومبادرة شمولية الوصول للويب (WAI) تطور معايير شمولية الويب للمكونات المختلفة:

- [إرشادات الوصول إلى المستخدم (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
  - متصفحات الويب ومشغلات الوسائط، بما في ذلك بعض جوانب التقنيات المساعدة
- [إرشادات الوصول إلى أدوات التأليف (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
  - أدوات التأليف
- [إرشادات الوصول إلى محتوى الويب (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  - محتوى الويب - يستخدمه المطورون وأدوات التأليف وأدوات تقييم الوصول

### إرشادات الوصول إلى محتوى الويب (WCAG) {#web-content-accessibility-guidelines-wcag}

[WCAG 2.1](https://www.w3.org/TR/WCAG21/) تستند على [WCAG 2.0](https://www.w3.org/TR/WCAG20/) وتسمح بتنفيذ التقنيات الجديدة من خلال التعامل مع التغييرات في الويب. تشجع W3C على استخدام الإصدار الأحدث من WCAG عند تطوير أو تحديث سياسات الوصول إلى الويب.

#### المبادئ الإرشادية لمعايير WCAG 2.1 (المختصرة بـ POUR) : {#wcag-2-1-four-main-guiding-principles-abbreviated-as-pour}

- [محسوس](https://www.w3.org/TR/WCAG21/#perceivable)
  - يجب أن يتمكن المستخدمون من استيعاب المعلومات التي تعرض
- [قابل للتشغيل](https://www.w3.org/TR/WCAG21/#operable)
  - يمكن تشغيل نماذج والمراقبات واستخدام التنقل
- [مفهوم](https://www.w3.org/TR/WCAG21/#understandable)
  - يجب أن تكون المعلومات وعملية واجهة المستخدم مفهومة لجميع المستخدمين
- [متين](https://www.w3.org/TR/WCAG21/#robust)
  - يجب أن يتمكن المستخدمون من الوصول إلى المحتوى مع تطور التقنيات

#### مبادرة شمولية ويب – تطبيقات الإنترنت الغنية سهلة الوصول (WAI-ARIA) {#web-accessibility-initiative-–-accessible-rich-internet-applications-wai-aria}

توفر W3C WAI-ARIA إرشادات حول كيفية إنشاء محتوى ديناميكي ومُراقبات واجهة المستخدم المتقدمة.

- [تطبيقات الإنترنت الغنية سهلة الوصول (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [ممارسات تأليف WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

## الموارد {#resources}

### التوثيقات {#documentation}

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [تطبيقات الإنترنت الغنية سهلة الوصول (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [ممارسات تأليف WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

### التقنيات المساعدة {#assistive-technologies}

- قارئات الشاشة
  - [NVDA](https://www.nvaccess.org/download/)
  - [VoiceOver](https://www.apple.com/accessibility/mac/vision/)
  - [JAWS](https://www.freedomscientific.com/products/software/jaws/?utm_term=jaws%20screen%20reader&utm_source=adwords&utm_campaign=All+Products&utm_medium=ppc&hsa_tgt=kwd-394361346638&hsa_cam=200218713&hsa_ad=296201131673&hsa_kw=jaws%20screen%20reader&hsa_grp=52663682111&hsa_net=adwords&hsa_mt=e&hsa_src=g&hsa_acc=1684996396&hsa_ver=3&gclid=Cj0KCQjwnv71BRCOARIsAIkxW9HXKQ6kKNQD0q8a_1TXSJXnIuUyb65KJeTWmtS6BH96-5he9dsNq6oaAh6UEALw_wcB)
  - [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)
- أدوات التكبير
  - [MAGic](https://www.freedomscientific.com/products/software/magic/)
  - [ZoomText](https://www.freedomscientific.com/products/software/zoomtext/)
  - [Magnifier](https://support.microsoft.com/en-us/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

### الاختبار {#testing}

- الأدوات الآلية
  - [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
  - [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
  - [ARC Toolkit](https://chrome.google.com/webstore/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce?hl=en-US)
- أدوات الألوان
  - [WebAim Color Contrast](https://webaim.org/resources/contrastchecker/)
  - [WebAim Link Color Contrast](https://webaim.org/resources/linkcontrastchecker)
- أدوات أخرى مساعدة
  - [HeadingMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=en…)
  - [Color Oracle](https://colororacle.org)
  - [NerdeFocus](https://chrome.google.com/webstore/detail/nerdefocus/lpfiljldhgjecfepfljnbjnbjfhennpd?hl=en-US…)
  - [Visual Aria](https://chrome.google.com/webstore/detail/visual-aria/lhbmajchkkmakajkjenkchhnhbadmhmk?hl=en-US)
  - [موقع Silktide لمحاكاة شمولية الوصول للمواقع](https://chrome.google.com/webstore/detail/silktide-website-accessib/okcpiimdfkpkjcbihbmhppldhiebhhaf?hl=en-US)

### المستخدمون {#users}

منظمة الصحة العالمية تقدر أن 15٪ من سكان العالم يعانون من نوع معين من الإعاقة ، و 2-4٪ منهم بشدة. هذا يعني أنه يوجد حوالي مليار شخص في جميع أنحاء العالم ، مما يجعل الأشخاص ذوي الإعاقة هم أكبر أقلية في العالم.

توجد مجموعة واسعة من الإعاقات ، ويمكن تقسيمها تقريبًا إلى أربع فئات:

- _[بصرية ](https://webaim.org/articles/visual/)_ - يمكن لهؤلاء المستخدمين الاستفادة من استخدام قارئات الشاشة وتكبير الشاشة وتحكم في التباين الشاشة أو عرض البرايل.
- _[سمعية](https://webaim.org/articles/auditory/)_ - يمكن لهؤلاء المستخدمين الاستفادة من الترجمة أو النصوص أو مقاطع الفيديو بلغة الإشارة.
- _[حركية](https://webaim.org/articles/motor/)_ - يمكن لهؤلاء المستخدمين الاستفادة من مجموعة من [أنظمة المساعدة للمعاقين الحركين](https://webaim.org/articles/motor/assistive): برامج التعرف على الصوت ، تتبع العين ، التحكم بمفتاح واحد ، مسح الرأس ، مفتاح التحكم بالزفير والشفط ، الفأرة الكبيرة ، لوحة المفاتيح القابلة للتكيف أو أنظمة مساعدة أخرى.
- _[إدراكية](https://webaim.org/articles/cognitive/)_ - يمكن لهؤلاء المستخدمين الاستفادة من الوسائط الإضافية ، والتنظيم الهيكلي للمحتوى ، والكتابة الواضحة والبسيطة.

اطلع على الروابط التالية من WebAim للتعرف على المستخدمين:

- [آفاق شمولية الوصول إلى الويب: استكشاف تأثيره وفوائده للجميع](https://www.w3.org/WAI/perspective-videos/)
- [قصص المستخدمين على الويب](https://www.w3.org/WAI/people-use-web/user-stories/)
