<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>
<style>
.lambdatest {
  background-color: var(--vt-c-bg-soft);
  border-radius: 8px;
  padding: 12px 16px 12px 12px;
  font-size: 13px;
  a {
    display: flex;
    color: var(--vt-c-text-2);
  }
  img {
    background-color: #fff;
    padding: 12px 16px;
    border-radius: 6px;
    margin-right: 24px;
  }
  .testing-partner {
    color: var(--vt-c-text-1);
    font-size: 15px;
    font-weight: 600;
  }
}
</style>

# الاختبار {#testing}

## لماذا الحاجة للاختبار؟ {#why-test}

الاختبارات الآلية تساعدك أنت و فريقك على بناء تطبيقات Vue معقدة بسرعة و بثقة عن طريق منع الإعادات و تشجيعك على تقسيم التطبيق الخاص بك إلى دوال، وحدات، أصناف، ومكونات قابلة للاختبار. كما هو الحال مع أي تطبيق، يمكن أن يتعطل تطبيق Vue الجديد الخاص بك بعدة طرق، و من المهم أن تتمكن من الكشف عن هذه المشاكل و إصلاحها قبل الإصدار.

في هذا الدليل، سنغطي المصطلحات الأساسية و نوفر لك أدوات معينة موصى بها لاختيارها في انشاء تطبيق Vue 3 الخاص بك.

هناك قسم خاص ب Vue يتحدث عن الدوال التركيبية. انظر إلى قسم [اختبار الدوال التركيبية](#testing-composables) أدناه لمزيد من التفاصيل.

## متى تختبر؟ {#when-to-test}

ابدأ الاختبار في وقت مبكر! نوصيك بالبدء في كتابة الاختبارات في أقرب وقت ممكن من بدء التطوير. كلما انتظرت أكثر لإضافة الاختبارات إلى التطبيق الخاص بك، كلما كان التطبيق الخاص بك لديه الكثير من الاعتمادبات، و كلما كان من الصعب البدء في اعتماد الاختبارات.

## أنواع الاختبارات {#testing-types}

لما تصمم استراتيجية لاختبار تطبيق Vue الخاص بك، يجب عليك استخدام أنواع الاختبارات التالية:

- **الوحدة**: يتحقق من أن الادخلات إلى دالة معينة، صنف، أو دالة تركيبية تنتج المخرج المتوقع أو الآثار الجانبية.
- **المكون**: تحقق من أن المكون الخاص بك قد وُصل، يُصير، يمكن التفاعل معه، و يتصرف كما هو متوقع منه. هذه الاختبارات تستورد الكثير من الشيفرات أكثر من اختبارات الوحدات، و هي أكثر تعقيدا، و تستغرق وقت أكثر للتنفيذ.
- **الشامل**: يتحقق من الميزات التي تمتد عبر عدة صفحات و تقوم بطلبات شبكة حقيقية مع تطبيق Vue الخاص بك. هذه الاختبارات تشمل عادة تشغيل قاعدة بيانات أو التعامل مع واجهة خلفية أخرى.

كل نوع من أنواع الاختبارات يلعب دورا في استراتيجية اختبار التطبيق الخاص بك، و كل نوع منها سيحميك من أنواع مختلفة من المشاكل.

## نظرة عامة {#overview}

سنتحدث باختصار عن كل واحدة منها، و كيف يمكنك تنفيذها في تطبيقات Vue، و نوفر بعض التوصيات العامة.

## اختبار الوحدات {#unit-testing}

اختبارات الوحدات تكتب للتحقق من أن الوحدات الصغيرة و المستقلة من الشيفرة تعمل كما هو متوقع منها. اختبار وحدة يغطي عادة دالة واحدة، صنف، دالة تركيبية، أو وحدة. اختبارات الوحدات تركز على الصحة المنطقية و تهتم فقط بجزء صغير من وظائف التطبيق بشكل عام. قد يقومون بتجاهل أجزاء كبيرة من بيئة التطبيق الخاص بك (مثل الحالة الأولية، الأصناف الكبيرة، وحدات الطرف الثالث، و طلبات الشبكة).

بصفة عامة، ستكتشف اختبارات الوحدات المشاكل في شيفرة العمل و الصحة المنطقية للدالة.

لننظر إلى هذه الدالة `increment` على سبيل المثال:

```js
// helpers.js
export function increment(current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

لأنها مستقلة جدا، سيكون من السهل استدعاء دالة الزيادة و التأكد من أنها تعيد ما هو متوقع، لذلك سنكتب اختبار وحدة.

إذا فشل أي من هذه الإدعاءات، فإنه من الواضح أن المشكلة محدودة في دالة `increment`.

```js{4-16}
// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
  test('زيادة الرقم الحالي بـ1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('لا يقوم الزيادة فوق الحد الأقصى', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('لديه الحد الأقصى الافتراضي', () => {
    expect(increment(10)).toBe(10)
  })
})
```

كما ذكرنا سابقا، يُطبق عادة اختبار الوحدات على شيفرة العمل، المكونات، الأصناف، و الوحدات، أو الدوال التي لا تتضمن تصيير واجهة المستخدم، طلبات الشبكة، أو أي مشاكل بيئية أخرى.

هذه عادة وحدات JavaScript / TypeScript عادية و غير مرتبطة بـ Vue. بشكل عام، كتابة اختبارات الوحدات لشيفرة العمل في تطبيقات Vue لا تختلف بشكل كبير عن تطبيقات تستخدم أطر عمل أخرى.

هناك حالتين تستخدم فيهما اختبارالوحدات لميزات Vue:

1. الدوال التركيبية
2. المكونات

### الدوال التركيبية {#composables}

فئة من الدوال المخصصة لتطبيقات Vue هي [الدوال التركيبية](/guide/reusability/composables)، و التي قد تحتاج إلى معالجة خاصة أثناء الاختبارات.
اطلع على [اختبار الدوال التركيبية](#testing-composables) أدناه لمزيد من التفاصيل.

### اختبار الوحدات للمكونات {#unit-testing-components}

يمكن اختبار المكون بطريقتين:

1. اختبارات الصندوق الأبيض: اختبار الوحدات

   الاختبارات المعروفة بـ "اختبارات الصندوق الأبيض" تهتم بتفاصيل تنفيذ و اعتماديات المكون. تركز على **عزل**  المكون تحت الاختبار. هذه الاختبارات عادة ما تشمل محاكاة بعض المكونات الأبناء أو كلهم، و إعداد حالة اللواحق و الاعتماديات (مثل Pinia).

2. اختبارات الصندوق الأسود: اختبار المكون

        الاختبارات المعروفة بـ"اختبارات الصندوق الأسود" لا تهتم بتفاصيل التنفيذ للمكون. هذه الاختبارات تحاكي بأقل قدر ممكن لاختبار التكامل بين المكون و النظام بأكمله. عادة ما تصير جميع المكونات الأبناء و تعتبر أكثر من "اختبار تكامل". اطلع على [التوصيات لاختبار المكون](#component-testing) أدناه.

### التوصية {#recommendation}

- [إطار Vitest](https://vitest.dev/)

  بما أن الإعداد الرسمي الذي أنشئ بواسطة `create-vue` يعتمد على [Vite](https://vitejs.dev/)، نوصي باستخدام إطار اختبار الوحدات الذي يمكنه الاستفادة من نفس التهيئة و نفق التحويل مباشرة من Vite. أداة [Vitest](https://vitest.dev/) هي إطار اختبار الوحدات المصمم خصيصا لهذا الغرض، و قد أنشئ و طُور من قبل أعضاء فريق Vue / Vite. يتكامل مع مشاريع Vite بأقل جهد،  و يعتبر سريعا جدا.

### خيارات أخرى {#other-options}

- [Jest](https://jestjs.io/) is a popular unit testing framework. However, we only recommend Jest if you have an existing Jest test suite that needs to be migrated over to a Vite-based project, as Vitest offers a more seamless integration and better performance.

في تطبيقات Vue، المكونات هي الكتل الرئيسية لواجهة المستخدم. لذلك، المكونات هي الوحدة الطبيعية للفصل عند التحقق من سلوك التطبيق. من ناحية تفصيلية، اختبار المكون يقع في مكان ما فوق اختبار الوحدة و يمكن اعتباره نوع من اختبار التكامل. يجب أن يشمل اختبلر المكونات معظم تطبيق Vue و نوصي بأن يكون لكل مكون ملف مواصفاته الخاص.

اختبارات المكونات يجب أن تكشف المشاكل المتعلقة بخاصيات المكون، الأحداث، المنافذ التي يوفرها، التنسيقات، الفئات، خطافات دورة الحياة، و أكثر.

اختبارات المكونات لا يجب أن تقوم بمحاكاة المكونات الأبناء، بل يجب أن تختبر التفاعلات بين المكون و المكونات الأبناء الخاصة به من خلال التفاعل مع المكونات كما يفعل المستخدم. على سبيل المثال، يجب أن يقوم اختبار المكون بالنقر على عنصر مثل ما يفعل المستخدم بدلا من التفاعل بشكل برمجي مع المكون.

اختبارات المكونات يجب أن تركز على واجهات المكون العامة بدلا من التفاصيل الداخلية للشيفرة التنفيذية. بالنسبة لمعظم المكونات، الواجهة العامة محدودة إلى: الأحداث المنشورة، الخاصية، و المنافذ. عند الاختبار، تذكر أن **تختبر ما يفعله المكون، وليس كيف يفعله**.

**قم بـ**

- بالنسبة للمنطق **البصري**: تأكد من الناتج الصحيح للتصيير بناءً على الخاصيات و المنافذ المدخلة.
- بالنسبة للمنطق **السلوكي**: تأكد من تحديثات الناتج الصحيح للتصيير أو الأحداث المنشورة بشكل صحيح بالرد على أحداث مدخلات المستخدم.

  في المثال أدناه، نظهر مكون Stepper يحتوي على عنصر DOM مسمى "increment" و يمكن النقر عليه. نمرر خاصية تسمى `max` التي تمنع Stepper من التزايد بعد `2`، لذلك إذا قمنا بالنقر على الزر 3 مرات، يجب أن تبقى واجهة المستخدم تظهر `2` فقط.

  لا نعرف شيئا عن الشيفرة التنفيذية Stepper، فقط أن "المدخل" هو خاصية `max` و "المخرج" هو حالة DOM كما سيراها المستخدم.

<VTCodeGroup>
  <VTCodeGroupTab label="Vue Test Utils">

  ```js
  const valueSelector = '[data-testid=stepper-value]'
  const buttonSelector = '[data-testid=increment]'

  const wrapper = mount(Stepper, {
    props: {
      max: 1
    }
  })

  expect(wrapper.find(valueSelector).text()).toContain('0')

  await wrapper.find(buttonSelector).trigger('click')

  expect(wrapper.find(valueSelector).text()).toContain('1')
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="Cypress">

  ```js
  const valueSelector = '[data-testid=stepper-value]'
  const buttonSelector = '[data-testid=increment]'

  mount(Stepper, {
    props: {
      max: 1
    }
  })

  cy.get(valueSelector).should('be.visible').and('contain.text', '0')
    .get(buttonSelector).click()
    .get(valueSelector).should('contain.text', '1')
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="Testing Library">

  ```js
  const { getByText } = render(Stepper, {
    props: {
      max: 1
    }
  })

  getByText('0') // Implicit assertion that "0" is within the component

  const button = getByRole('button', { name: /increment/i })

  // Dispatch a click event to our increment button.
  await fireEvent.click(button)

  getByText('1')

  await fireEvent.click(button)
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

- **لا تقم بـ**

    لا تقم باختبار التوابع و الحالة خاصة (private) بنسخة المكون. اختبار التفاصيل التنفيذية تجعل الاختبارات غير متينة، لأنها أكثر عرضة للكسر و تتطلب التحديثات عند تغيير الشيفرة التنفيذية.

   وظيفة المكون النهائية هي تصيير الناتج الصحيح للـDOM، لذلك الاختبارات التي تركز على ناتج ال DOM توفر نفس مستوى التأكد من الصحة (إذا لم تكن أكثر) بينما هي أكثر صلابة و تحمل التغيير.

    لا تعتمد على لقطات الاختبارات فقط. تأكيد السلسلة النصية للـHTML المصير لا يصف الحقيقة. اكتب الاختبارات بقصد معين.

    إذا كان تابع معين يحتاج إلى اختبار دقيق، ففكر في استخراجه إلى دالة مستقلة و كتابة اختبار وحدة لها. إذا لم يمكن استخراجها بشكل نظيف، فقد تُختبر كجزء من اختبار المكون أو اختبار التكامل أو الاختبار الشامل الذي يغطيها.
  
### التوصية {#recommendation-1}

- [مكتبة Vitest](https://vitest.dev/) للمكونات أو الدوال التركيبية التي تُصير بدون تصميم مرئي  (مثل دالة [`useFavicon`](https://vueuse.org/core/useFavicon/#usefavicon) في VueUse). يمكن اختبار المكونات و الـDOM باستخدام [`@vue/test-utils`](https://github.com/vuejs/test-utils).

- [اختبار المكونات في Cypress](https://on.cypress.io/component) للمكونات التي يتوقع أن تعمل بشكل صحيح بعد تصيير التنسيقات بشكل صحيح أو تفعيل الأحداث الأصلية للـDOM. يمكن استخدامه مع مكتبة الاختبارات عبر ملحق [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro).

الفروقات الرئيسية بين Vitest و مشغلات الاختبار القائمة على المتصفح هي السرعة و سياق التنفيذ. بشكل مختصر، المشغلات القائمة على المتصفح، مثل Cypress، يمكنها اكتشاف المشاكل التي لا يمكن للمشغلات القائمة على العقد، مثل Vitest، اكتشافها (على سبيل المثال، مشاكل التنسيقات، أحداث DOM الأصلية الحقيقية، الكوكيز، التخزين المحلي، و فشل الشبكة)، ولكن المشغلات القائمة على المتصفح أبطأ بدرجات متعددة من Vitest لأنها تفتح متصفحًا، و تجمع ملفات الأنماط الخاصة بك، و أكثر. Cypress هو مشغل قائم على المتصفح يدعم اختبار المكونات. يرجى قراءة [صفحة المقارنة لـ Vitest](https://vitest.dev/guide/comparisons.html#cypress) للحصول على أحدث المعلومات في المقارنة بين Vitest و Cypress.

### وصل المكتبات {#mounting-libraries}

  يتضمن اختبار المكونات عادةً وصل المكون الذي يُختبر بشكل مستقل، وتشغيل أحداث إدخال المستخدم المحاكية، وتأكيد على الناتج المُصيّر للـDOM. هناك مكتبات مساعدة مخصصة تجعل هذه المهام أسهل.

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library) هي مكتبة اختبارات Vue متخصصة في اختبار المكونات دون الاعتماد على التفاصيل التنفيذية. تأخذ بعين الاعتبار سهولة الوصول، يجعل نهجها أيضًا إعادة هيكلة البرمجيات بسهولة. يتبنى مبدؤها أنه كلما كانت الاختبارات أكثر تشابهًا مع طريقة استخدام البرمجيات، زادت الثقة التي تمنحها.

- [`@vue/test-utils`](https://github.com/vuejs/test-utils) هي المكتبة الرسمية لاختبار المكونات على المستوى الأدنى التي كتبت لتوفر للمستخدمين الوصول إلى الواجهات البرمجبة الخاصة بـVue. كما أنها المكتبة ذات المستوى الأدنى التي بنيت عليها `@testing-library/vue`.

 نوصي باستخدام `testing-library/vue@` لاختبار المكونات في التطبيقات، لأن تركيزها يتوافق أفضل مع أولويات اختبار التطبيقات. استخدم `vue/test-utils@` فقط إذا كنت تبني مكونات متقدمة تتطلب اختبار الواجهات البرمجية الخاصة بـVue.

### خيارات أخرى {#other-options-1}

- [Nightwatch](https://nightwatchjs.org/) هو مشغل اختبار E2E مع دعم اختبار المكونات. ([مشروع مثال](https://github.com/nightwatchjs-community/todo-vue))

- [WebdriverIO](https://webdriver.io/docs/component-testing/vue) لاختبار المكونات عبر المتصفحات الذي يعتمد على التفاعل الأصلي للمستخدم بناءً على الأتمتة الموحدة. يمكن أيضًا استخدامه مع Testing Library.

## الاختبارات الشاملة {#e2e-testing}

على الرغم من أن اختبارات الوحدات توفر للمطورين بعض الدرجة من الثقة، إلا أن اختبارات الوحدات واختبارات للمكونات محدودة في قدرتها على توفير تغطية شاملة للتطبيق عند النشر إلى الإنتاج. بالتالي، توفر الاختبارات الشاملة (E2E) التغطية على ما يمكن أن يعتبر أهم جانب من التطبيق: ماذا يحدث عندما يستخدم المستخدمون تطبيقاتك بشكل فعلي.

تركز الاختبارات الشاملة على سلوك التطبيقات متعددة الصفحات التي تقوم بطلبات شبكة في تطبيق Vue الذي صار في مرحلة الإنتاج. وتشمل عادةً تشغيل قاعدة بيانات أو خلفية أخرى وقد  تشغل حتى في بيئة تجريبية مباشرة.

الاختبارات الشاملة تلتقط عادةً مشاكل مع موجه التطبيق، مكتبة إدارة الحالة، المكونات على المستوى الأعلى (على سبيل المثال، مكونات App أو Layout)، الملحقات العامة أو أي معالجة للطلب. كما ذكرنا أعلاه، فإنها تلتقط المشاكل الحرجة التي قد تكون مستحيلة الالتقاط مع اختبارات الوحدات أو اختبارات المكونات.

لا تقوم الاختبارات الشاملة باستيراد أي شيء من شيفرة تطبيق Vue، بل تعتمد بالكامل على اختبار التطبيق عن طريق التنقل بين الصفحات بالكامل في متصفح حقيقي.

تقوم الاختبارات الشاملة بتحقق من العديد من الطبقات في التطبيق. يمكنها أن تستهدف التطبيق المبني محليًا، أو حتى بيئة تجريبية مباشرة. اختبار بيئة تجريبية مباشرة لا تتضمن فقط شيفرة واجهة المستخدم الأمامية والخادم الثابت، بل تشمل جميع خدمات الخلفية والبنية المرتبطة.

- [WebdriverIO](https://webdriver.io/docs/component-testing/vue) for cross-browser component testing that relies on native user interaction based on standardized automation. It can also be used with Testing Library.

> كلما كانت اختباراتك مشابهة لطريقة استخدام البرمجيات الخاصة بك، كلما أعطتك المزيد من الثقة. - [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106) - مؤلف Testing Library

باختبار كيف تؤثر عمليات المستخدمين على التطبيق، فإن الاختبارات الشاملة هي غالبًا مفتاح الثقة الأعلى في ما إذا كان التطبيق يعمل بشكل صحيح أم لا.

### إختيار أداة الاختبارات الشاملة {#choosing-an-e2e-testing-solution}

على الرغم من أن الاختبارات الشاملة على الويب حصلت على سمعة سلبية بسبب اختبارات غير موثوق بها (غير مستقرة) وتبطئ عملية التطوير، إلا أن أدوات الاختبارات الشاملة الحديثة قد أجرت خطوات متقدمة لإنشاء اختبارات أكثر ثباتًا  تفاعلًا وفائدة. عند اختيار إطار عمل اختبارات شاملة، فإن الأقسام التالية توفر بعض الإرشادات حول الأشياء التي يجب أخذها بعين الاعتبار عند اختيار إطار عمل اختبارات لتطبيقك.

#### الاختبار عبر عدة متصفحات {#cross-browser-testing}

واحدة من الفوائد الرئيسية المعروفة عن الاختبارات الشاملة هي قدرتها على اختبار التطبيق عبر عدة متصفحات. على الرغم من أنه قد يبدو مرغوبًا أن يكون لديك تغطية متصفح متعددة 100٪، إلا أنه من المهم ملاحظة أن اختبار المتصفحات المتعددة لديها عوائد تناقصية على موارد الفريق بسبب الوقت الإضافي وقوة الجهاز المطلوبة لتشغيلها بشكل مستمر. بالتالي، من المهم أن تكون على وعي بهذه التنازلات عند اختيار مقدار اختبار المتصفحات المتعددة التي تحتاجها لتطبيقك.

#### حلقات رد أسرع {#faster-feedback-loops}

واحدة من المشاكل الرئيسية للاختبارات الشاملة والتطوير هي أن تشغيل الجملة بأكملها يستغرق وقتًا طويلاً. عادة ما يتم فعل ذلك فقط في الدورات المستمرة للدمج والتسليم (CI / CD). قدمت إطارات الاختبارات الشاملة الحديثة مساعدة لحل هذه المشكلة من خلال إضافة ميزات مثل التوازي، والتي تسمح لدورات CI / CD بتشغيل أسرع بكثير من السابق. بالإضافة إلى ذلك، عند التطوير محليًا، يمكن أن تساعد القدرة على تشغيل اختبار واحد للصفحة التي تعمل عليها بينما توفر إعادة التحميل النشطة للاختبارات على تعزيز سير عمل المطور وإنتاجيته.

#### تجربة تنقيح الأخطاء بدرجة أولى {#first-class-debugging-experience}

بالرغم من أن المطورين عادة ما يعتمدون على قراءة السجلات في نافذة الطرفية للمساعدة في تحديد ما هو الخطأ في الاختبار، إلا أن إطارات الاختبارات الشاملة الحديثة تسمح للمطورين بالاستفادة من الأدوات المتعودين، على سبيل المثال، أدوات التطوير في المتصفح.

#### الاستظهار في الوضع غير الرسومي {#visibility-in-headless-mode}

When end-to-end (E2E) tests are run in continuous integration/deployment pipelines, they are often run in headless browsers (i.e., no visible browser is opened for the user to watch). A critical feature of modern E2E testing frameworks is the ability to see snapshots and/or videos of the application during testing, providing some insight into why errors are happening. Historically, it was tedious to maintain these integrations.

### Recommendation {#recommendation-2}

- [Playwright](https://playwright.dev/) is a great E2E testing solution that supports Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari. It has an informative UI, excellent debuggability, built-in assertions, parallelization, traces and is designed to eliminate flaky tests. Support for [Component Testing](https://playwright.dev/docs/test-components) is available, but marked experimental. Playwright is open source and maintained by Microsoft.

- [Cypress](https://www.cypress.io/) has an informative graphical interface, excellent debuggability, built-in assertions, stubs, flake-resistance, and snapshots. As mentioned above, it provides stable support for [Component Testing](https://docs.cypress.io/guides/component-testing/introduction). Cypress supports Chromium-based browsers, Firefox, and Electron. WebKit support is available, but marked experimental. Cypress is MIT-licensed, but some features like parallelization require a subscription to Cypress Cloud.

<div class="lambdatest">
  <a href="https://lambdatest.com" target="_blank">
    <img src="/images/lambdatest.svg">
    <div>
      <div class="testing-partner">Testing Sponsor</div>
      <div>Lambdatest is a cloud platform for running E2E, accessibility, and visual regression tests across all major browsers and real devices, with AI assisted test generation!</div>
    </div>
  </a>
</div>

### Other Options {#other-options-2}

- [Nightwatch](https://nightwatchjs.org/) is an E2E testing solution based on [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver). This gives it the widest browser support range, including native mobile testing. Selenium-based solutions will be slower than Playwright or Cypress.

- [WebdriverIO](https://webdriver.io/) is a test automation framework for web and mobile testing based on the WebDriver protocol.

## وصفات {#recipes}

### إضافة Vitest إلى مشروع {#adding-vitest-to-a-project}

في مشروع Vue المستند على Vite، قم بتشغيل:

```sh
> npm install -D vitest happy-dom @testing-library/vue
```

بعد ذلك، قم بتحديث إعدادات Vite لإضافة كتلة خيار `test`:

```js{6-12}
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    //تمكين الواجهة البرمجية العامة للاختبار مثل jest
    globals: true,
    // محاكاة DOM مع happy-dom
    // (يتطلب تثبيت happy-dom كإعتمادية مساوية)
    environment: 'happy-dom'
  }
})
```

:::tip
إذا كنت تستخدم TypeScript، قم بإضافة `vitest/globals` إلى حقل `types` في ملف `tsconfig.json` الخاص بك.

```json
// tsconfig.json

{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

:::

 ثم أنشئ ملفًا بامتداد `test.js.*` في مشروعك. يمكنك وضع جميع ملفات الاختبار في  مجلد الاختبار في جذر المشروع، أو في مجلدات اختبار بجوار ملفات المصدر الخاصة بك. سيبحث Vitest عنها تلقائيًا باستخدام الترتيب المصطلح عليه.

```js
// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // تأكيد الناتج
  getByText('...')
})
```

أخيرًا، قم بتحديث `package.json` لإضافة نص أمر الاختبار وتشغيله:

```json{4}
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
> npm test
```

### اختبار الدوال التركيبية {#testing-composables}

> قبل قراءة هذا القسم يجب أولا أن تكون قد اطلعت على قسم [الدوال التركيبية](/guide/reusability/composables).

عندما يتعلق الأمر باختبارات الدوال التركيبية، يمكننا تقسيمها إلى فئتين: الدوال التركيبية التي لا تعتمد على نسخة مكون مضيفة، والدوال التركيبية التي تعتمد عليه.

تعتمد الدالة التركيبية على نسخة مكون مضيفة عند استخدامها للواجهات التالية:

- خطافات دورة الحياة
- دوال أو خيارات Provide / Inject

إذا كانت الدالة التركيبية تستخدم فقط الواجهات البرمجية التفاعلية ، فإنه يمكن أن يتم اختبارها عن طريق استدعاءها مباشرة وتأكيد الحالة / التوابع التي أُرجعت:

```js
// counter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}
```

```js
// counter.test.js
import { useCounter } from './counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
```

الدالة التركيبية التي تعتمد على خطافات دورة الحياة أو Provide / Inject يجب تغليفها في مكون مضيف لتُختبر. يمكننا إنشاء دالة مساعدة مثل ما يلي:

```js
// test-utils.js
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // حذف تحذير القالب المفقود
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // إرجاع النتيجة ونسخة التطبيق
  // لاختبار provide / unmount
  return [result, app]
}
```

```js
import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // محاكاة provide لاختبار الحقن
  app.provide(...)
  // تشغيل التأكيدات
  expect(result.foo.value).toBe(1)
  // تشغيل خطاف onUnmounted إذا لزم الأمر
  app.unmount()
})
```

بالنسبة للدوال التركيبية المعقدة أكثر، يمكن أن يكون من الأسهل أيضًا اختبارها عن طريق كتابة اختبارات للمكون المغلف باستخدام تقنيات [اختبار المكون](#component-testing).

<!--
TODO more testing recipes can be added in the future e.g.
- How to set up CI via GitHub actions
- How to do mocking in component testing
-->
