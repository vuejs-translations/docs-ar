# Vue ومكونات الويب {#vue-and-web-components}

[مكونات الويب](https://developer.mozilla.org/en-US/docs/Web/Web_Components) هي مصطلح عام لمجموعة من الواجهات البرمجية الأصلية للويب  التي تسمح للمطورين بإنشاء عناصر مخصصة قابلة لإعادة الاستخدام.

نعتبر Vue ومكونات الويب تقنيات مكملة لبعضها بشكل أساسي. تتمتع Vue بدعم ممتاز لكل من استهلاك وإنشاء عناصر مخصصة. سواء كنت تدمج عناصر مخصصة في تطبيق Vue موجود، أو تستخدم Vue لإنشاء وتوزيع عناصر مخصصة، فأنت في المكان الصحيح.

## استخدام عناصر مخصصة في Vue {#using-custom-elements-in-vue}

يحصل Vue على 100% في  [اختبارات العناصر المخصصة في كل مكان](https://custom-elements-everywhere.com/libraries/vue/results/results.html). يعمل استهلاك عناصر مخصصة داخل تطبيق Vue بشكل كبير على نفس طريقة استخدام عناصر HTML الأصلية، مع بعض الأشياء التي يجب مراعاتها:

### تخطي تحليل المكون {#skipping-component-resolution}

بشكل افتراضي، سيحاول Vue حل علامة HTML غير أصلية كمكون Vue مسجل قبل العود إلى تصييرها كعنصر مخصص. سيتسبب هذا في إصدار Vue لتحذير "فشل في حل المكون" أثناء التطوير. لإعلام Vue بأن بعض العناصر يجب معاملتها على أنها عناصر مخصصة وتخطي تحليل المكون، يمكننا تحديد [خيار `compilerOptions.isCustomElement` ](/api/application#app-config-compileroptions).

إذا كنت تستخدم Vue مع إعداد بناء، يجب تمرير الخيار عبر تكوينات البناء لأنه خيار في وقت التصريف.

#### مثال للتهيئة داخل المتصفح {#example-in-browser-config}

```js
// يعمل فقط إذا استخدم التصريف داخل المتصفح.
// إذا استخدمت أدوات البناء، انظر إلى أمثلة التهيئة أدناه.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
```

#### مثال للتهيئة عن طريق Vite {#example-vite-config}

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // تعامل مع جميع العلامات التي تحتوي على شرطة كعناصر مخصصة
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```

#### مثال للتهيئة مع Vue CLI {#example-vue-cli-config}

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // تعامل مع جميع العلامات التي تحتوي على شرطة كعناصر مخصصة
          isCustomElement: tag => tag.startsWith('ion-')
        }
      }))
  }
}
```

### Passing DOM Properties {#passing-dom-properties}

بما أن سمات DOM يمكن أن تكون سلسلة نصية فقط، فإننا بحاجة إلى تمرير البيانات المعقدة إلى العناصر المخصصة كخاصيات DOM. عند تعيين الخاصيات على عنصر مخصص، يقوم Vue 3 تلقائيًا بفحص وجود خاصية DOM باستخدام المعامل `in` وسيفضل تعيين القيمة كخاصية DOM إذا كان المفتاح موجودًا. هذا يعني أنه في معظم الحالات، لن تحتاج إلى التفكير في هذا إذا كان العنصر المخصص يتبع [أفضل الممارسات الموصى بها](https://web.dev/custom-elements-best-practices/).

ومع ذلك، قد تكون هناك حالات نادرة حيث يجب تمرير البيانات كخاصية DOM، ولكن العنصر المخصص لا يحدد/يعكس الخاصية بشكل صحيح (مما يتسبب في فشل فحص `in`). في هذه الحالة، يمكنك إجبار ربط `v-bind` ليعين كخاصية DOM باستخدام المعدل `prop.`:

```vue-html
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- الاختصار الموافق -->
<my-element .user="{ name: 'jack' }"></my-element>
```

## بناء عناصر مخصصة باستخدام Vue{#building-custom-elements-with-vue}

فائدة العناصر المخصصة الأساسية هي أنه يمكن استخدامها مع أي إطار عمل، أو حتى بدون إطار عمل. وهذا يجعلها مثالية لتوزيع المكونات حيث قد لا يكون المستهلك النهائي يستخدم نفس المكونات الأساسية، أو عندما تريد عزل التطبيق النهائي عن تفاصيل التنفيذ للمكونات التي يستخدمها.

### دالة defineCustomElement {#definecustomelement}

تدعم Vue إنشاء عناصر مخصصة باستخدام نفس الواجهة البرمجية للمكونات Vue عبر دالة [`defineCustomElement`](/api/general#definecustomelement). تقبل الدالة نفس الوسيط مثل [`defineComponent`](/api/general#definecomponent)، ولكنها بدلاً من ذلك تعيد بناءً مخصصًا للعنصر يمتد من `HTMLElement`:

```vue-html
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // خيارات مكون Vue العادية هنا
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement فقط: CSS لتحقن في shadow root
  styles: [`/* inlined css */`]
})

// تسجيل العنصر المخصص.
// بعد التسجيل، سترقى جميع العلامات `<my-vue-element>`
// على الصفحة.
customElements.define('my-vue-element', MyVueElement)

// يمكنك أيضًا إنشاء العنصر برمجيًا:
// (يمكن فقط القيام به بعد التسجيل)
document.body.appendChild(
  new MyVueElement({
    // الخاصيات الأولية (اختياري)
  })
)
```

#### دورة الحياة {#lifecycle}

- عنصر Vue المخصص سيقوم بوصل نسخة مكون Vue داخل جذر الظل ( shadow root ) عندما تستدعى [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) للعنصر للمرة الأولى.

- عندما تستدعى `disconnectedCallback` للعنصر، سيقوم Vue بالتحقق ما إذا كان العنصر مفصولًا عن المستند بعد تحديث عملية صغيرة.

  - إذا كان العنصر لا يزال في المستند، فهو حركة وسيُحتفظ بنسخة المكون.

  - إذا كان العنصر مفصولًا عن المستند، فهو إزالة وسيلغى وصل نسخة المكون.

#### الخاصيات {#props}

- ستعرف جميع الخاصيات (props) المصرح بها باستخدام الخيار `props` على العنصر المخصص كخاصيات. سيتعامل Vue تلقائيًا مع الانعكاس بين السمات / الخصائص عند الاقتضاء.

  - السمات دائمًا ما تنعكس على الخاصيات المقابلة.

  - تنعكس الخاصيات ذات القيم الأولية (`string`، `boolean` أو `number`) كسمات.

- يقوم Vue أيضًا بتحويل الخاصيات المصرح بها بأنواع `Boolean` أو `Number` إلى النوع المطلوب عند تعيينها كسمات (التي تكون دائمًا سلاسل نصية). على سبيل المثال، بالنظر إلى التصريحات الخاصة التالية:

  ```js
  props: {
    selected: Boolean,
    index: Number
  }
  ```

  واستخدام العنصر المخصص:

  ```vue-html
  <my-element selected index="1"></my-element>
  ```

  في المكون، سيُحول `selected` إلى `true` (boolean) و `index` إلى `1` (number).

#### الأحداث {#events}

ترسل الأحداث التي تصدر عبر `this.$emit` أو `emit` كحدث [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent) على العنصر المخصص. ستعرض وسائطا الحدث الإضافية (الحمولة) كمصفوفة على كائن CustomEvent كخاصية `detail`.

#### المنافذ {#slots}

داخل المكون، يمكن عرض المنافذ باستخدام عنصر `<slot/>` كالمعتاد. ومع ذلك، عند استهلاك العنصر الناتج، يقبل فقط [صيغة المنافذ الأصلية](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots):

- [المنافذ ذات النطاق](/guide/components/slots#scoped-slots) غير مدعومة.

- عند تمرير المنافذ المسماة، استخدم السمة `slot` بدلاً من السمة الموجهة `v-slot`:

  ```vue-html
  <my-element>
    <div slot="named">hello</div>
  </my-element>
  ```

#### تزويد/حقن {#provide-inject}

[الواجهة البرمجية لمبداأ التزويد/الحقن](/guide/components/provide-inject#provide-inject) وما يعادلها في [الواجهة التركيبية](/api/composition-api-dependency-injection#provide) تعمل أيضًا بين عناصر Vue المخصصة المحددة. ومع ذلك، تجدر الملاحظة أن هذا يعمل **فقط بين العناصر المخصصة**. أي أن عنصر Vue مخصص لن يكون قادرًا على حقن الخصائص التي وفرت بواسطة  العنصر المخصص غير مكون Vue.

### المكونات أحادية الملف كعناصر ممخصصة {#sfc-as-custom-element}

الدالة`defineCustomElement` تعمل أيضًا مع مكونات Vue أحادية الملف (SFCs). ومع ذلك، مع إعداد الأدوات الافتراضي، سيستخرج `<style>` داخل SFCs ودمجها في ملف CSS واحد أثناء بناء الإنتاج. عند استخدام SFC كعنصر مخصص، من المرجح أن يكون من المرغوب فيه حقن علامات `<style>` في جذر ظل العنصر المخصص بدلاً من ذلك.

أدوات SFC الرسمية تدعم استيراد SFCs في "وضع العنصر المخصص" (يتطلب `vitejs/plugin-vue@^1.4.0@` أو `vue-loader^16.5.0@`). يقوم SFC المحمل في وضع العنصر المخصص بتضمين علامات `<style>` كسلاسل CSS نصية ويعرضها تحت خيار `styles` للمكون. سيلتقط هذا بواسطة `defineCustomElement` وحقنه في جذر ظل العنصر عند التكوين.

للاشتراك في هذا الوضع، قم بتسمية ملف المكون باسم ينتهي بـ `.ce.vue`:

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ["/* inlined css */"]

// تحويل إلى معالج العنصر المخصص
const ExampleElement = defineCustomElement(Example)

// تسجيل
customElements.define('my-example', ExampleElement)
```

إذا كنت ترغب في تخصيص الملفات التي يجب استيرادها في وضع العنصر المخصص (على سبيل المثال، معاملة _جميع_ SFCs كعناصر مخصصة)، يمكنك تمرير الخيار `customElement` إلى ملحقات الإنشاء المعنية:

- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements)
- [vue-loader](https://github.com/vuejs/vue-loader/tree/next#v16-only-options)

### نصائح حول مكتبة عناصر Vue مخصصة {#tips-for-a-vue-custom-elements-library}

عند بناء عناصر مخصصة باستخدام Vue، ستعتمد العناصر على تشغيل Vue. هناك تكلفة حجم أساسي بحوالي 16 كيلوبايت اعتمادًا على عدد الميزات التي استخدمت. هذا يعني أنه ليس مثاليًا لاستخدام Vue إذا كنت تقوم بشحن عنصر مخصص واحد - قد ترغب في استخدام JavaScript الأساسي، أو [petite-vue](https://github.com/vuejs/petite-vue), أو الإطارات التي تتخصص في حجم التشغيل الصغير. ومع ذلك، فإن حجم القاعدة مبرر بشكل أكبر إذا كنت تقوم بشحن مجموعة من العناصر المخصصة ذات الشيفرة المنطقية المعقدة، حيث سيسمح Vue لكل مكون بأن يكتب بشيفرة أقل بكثير. كلما كنت تقوم بشحن عناصر معًا، كلما كان التضحية أفضل.

إذا كانت العناصر المخصصة ستستخدم في تطبيق يستخدم أيضًا Vue، يمكنك اختيار تطبيق Vue من الحزمة المبنية بحيث تستخدم العناصر نسخة واحدة من Vue من التطبيق المضيف.

يوصى بتصدير بناة العنصر الفردي لإعطاء المستخدمين الخاصين بك مرونة لاستيرادها عند الطلب وتسجيلها باسماء العلامات المطلوبة. يمكنك أيضًا تصدير دالة ملائمة لتسجيل جميع العناصر تلقائيًا. فيما يلي مثال على نقطة الدخول لمكتبة عناصر Vue المخصصة:

```js
import { defineCustomElement } from 'vue'
import Foo from './MyFoo.ce.vue'
import Bar from './MyBar.ce.vue'

const MyFoo = defineCustomElement(Foo)
const MyBar = defineCustomElement(Bar)

// تصدير العناصر الفردية
export { MyFoo, MyBar }

export function register() {
  customElements.define('my-foo', MyFoo)
  customElements.define('my-bar', MyBar)
}
```

إذا كان لديك العديد من المكونات، يمكنك أيضًا الاستفادة من ميزات أدوات البناء مثل [glob import](https://vitejs.dev/guide/features.html#glob-import) في Vite أو [`require.context`](https://webpack.js.org/guides/dependency-management/#requirecontext) في webpack لتحميل جميع المكونات من مجلد ما.

### مكونات الويب و Typescript {#web-components-and-typescript}

إذا كنت تقوم بتطوير تطبيق أو مكتبة، قد ترغب في [فحص النوع](/guide/scaling-up/tooling.html#typescript) لمكونات Vue الخاصة بك، بما في ذلك تلك التي عرفت كعناصر مخصصة.

العناصر المخصصة مسجلة على نطاق عام باستخدام الواجهات البرمجية  الأصلية، لذلك فبشكل افتراضي لن يكون لديها استنتاج النوع عند استخدامها في قوالب Vue. لتوفير دعم النوع لمكونات Vue المسجلة كعناصر مخصصة، يمكننا تسجيل الأنواع العامة للمكونات باستخدام واجهة [`GlobalComponents`](https://github.com/vuejs/language-tools/blob/master/packages/vscode-vue/README.md#usage) في قوالب Vue و / أو في [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements):

```typescript
import { defineCustomElement } from 'vue'

// مكون أحادي الملف
import CounterSFC from './src/components/counter.ce.vue'

// حول المكون إلى عناصر الويب
export const Counter = defineCustomElement(CounterSFC)

// register global typings
// سجل الأنواع العامة
declare module 'vue' {
  export interface GlobalComponents {
    'Counter': typeof Counter,
  }
}
```

## مكونات الويب مقابل مكونات Vue {#web-components-vs-vue-components}

هناك بعض المطورين يعتقدون أنه يجب تجنب نماذج المكونات الخاصة بالإطار، وأن استخدام عناصر الويب فقط يجعل التطبيق "مستقبلي". هنا سنحاول شرح لماذا نعتقد أن هذا هو اتخاذ مبسط للغاية للمشكلة.

هناك بالفعل مستوى معين من تداخل الميزات بين عناصر الويب ومكونات Vue: كلاهما يسمح لنا بتحديد مكونات قابلة لإعادة الاستخدام مع تمرير البيانات وإصدار الأحداث وإدارة دورة الحياة. ومع ذلك، تعتبر الواجهة البرمجية لعناصر الويب مستوى منخفض نسبيًا وأساسيًا. لبناء تطبيق فعلي، نحتاج إلى العديد من القدرات الإضافية التي لا تغطيها المنصة:

- نظام قوالب تصريحي وفعال؛

- نظام إدارة الحالة تفاعلية الذي يسهل استخراج وإعادة استخدام الشيفرة المنطقية للعناصر المشتركة؛

- طريقة فعالة لتصيير المكونات على الخادم وانعاشها على جانب العميل (SSR)، وهو أمر مهم لتحسين محركات البحث و[مقاييس Web Vitals مثل LCP](https://web.dev/vitals/) . ينطوي SSR لعناصر الويب الأصلية على محاكاة DOM في Node.js ثم تسلسل DOM المتحول، بينما يترجم Vue SSR إلى تجميع السلاسل كلما أمكن ذلك، وهو أكثر كفاءة بكثير.

نموذج المكونات في Vue مصمم مع هذه الاحتياجات في الاعتبار كنظام متماسك.

مع فريق هندسي متمكن، يمكنك بالتأكيد بناء ما يعادله على عناصر الويب الأصلية - ولكن هذا يعني أيضًا أنك تتحمل عبء الصيانة على المدى الطويل لإطار عمل داخلي، مع فقدان فوائد النظام البيئي والمجتمع من إطار عمل ناضج مثل Vue.

هناك أيضًا أطُرٌ بُنِيت باستخدام عناصر مخصصة كأساس لنموذج مكوناتها، ولكن جميعها بالضرورة يجب أن تُقدِم حلاً مميزًا للمشكلات المذكورة أعلاه. استخدام هذه الأطُر يستلزم الالتزام بقراراتها التقنية حول كيفية حل هذه المشكلات - والتي على الرغم مما قد يُعلَن، لا تقيك تلقائيًا من التحولات المحتملة في المستقبل.

هناك أيضًا بعض المجالات التي نجد فيها عناصر مخصصة تقييدية:

- تقييم المنافذ بحرص يعيق تكوين المكونات. [المنافذ ذات النطاق](/guide/components/slots#scoped-slots) في Vue هي آلية قوية لتكوين المكونات، والتي لا يمكن دعمها من قبل عناصر مخصصة بسبب طبيعة المنافذ الأصلية الحريصة. تعني المنافذ الحريصة أيضًا أن المكون الذي يستقبل المنفذ لا يمكنه التحكم في متى أو ما إذا كان سيقوم بتصيير جزء من محتوى المنفذ.

- يتطلب شحن عناصر مخصصة مع CSS محددة النطاق في ظل DOM اليوم تضمين CSS داخل JavaScript بحيث يمكن حقنها في الجذور الظلية في وقت التشغيل. كما أنها تؤدي إلى تكرار التنسيقات في العلامات في سيناريوهات التصيير من جانب الخادوم. هناك [ميزات منصة](https://github.com/whatwg/html/pull/4898/) تعمل في هذا المجال - ولكن حتى الآن لا تدعم بشكل عام، ولا تزال هناك مخاوف إنتاجية للأداء والتصيير من جانب الخادوم التي يجب معالجتها. في غضون ذلك، توفر ملفات SFC في Vue [آليات تحديد نطاق CSS](/api/sfc-css-features) تدعم استخراج التنسيقات إلى ملفات CSS عادية.

ستبقى Vue دائمًا متوافقًا مع أحدث المعايير في منصة الويب، وسنستفيد بسرور من أي شيء توفره المنصة إذا جعل عملنا أسهل. ومع ذلك، هدفنا هو توفير حلول تعمل بشكل جيد وتعمل اليوم. وهذا يعني أنه يجب علينا دمج ميزات المنصة الجديدة بعقلية نقدية - وهذا ينطوي على سد الفجوات حيث تفشل المعايير بينما تظل الحاجة قائمةً.
