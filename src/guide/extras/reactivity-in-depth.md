---
outline: deep
---

<script setup>
import SpreadSheet from './demos/SpreadSheet.vue'
</script>

# التفاعلية بالتفصيل {#reactivity-in-depth}

واحدة من أكثر ميزات Vue تميزًا هي نظام التفاعلية المنفرد. حالة المكون تتكون من كائنات JavaScript تفاعلية. عند تعديلها، تُحدث واجهة العرض. وهذا ما يجعل إدارة الحالة بسيطة وبديهية، ولكن من المهم أيضًا فهم كيفية عملها لتجنب بعض الأخطاء الشائعة. في هذا القسم ، سنقوم بالتنقيب في بعض التفاصيل على مستوى أدنى من نظام التفاعلية في Vue.

## ماهي التفاعلية؟ {#what-is-reactivity}

هذا المصطلح يظهر في البرمجة كثيرًا في هذه الأيام، ولكن ماذا يقصد الناس عندما يقولون ذلك؟ التفاعلية هي نمط برمجي يسمح لنا بالتكيف مع التغييرات بطريقة تصريحية. المثال الكلاسيكي الذي يظهره الناس عادة، لأنه مثال رائع، هو جدول بيانات Excel:

<SpreadSheet />

هنا تُعرف الخلية A2 عبر صيغة `= A0 + A1` (يمكنك النقر فوق A2 لعرض أو تحرير الصيغة) ، لذلك يعطينا جدول البيانات 3. لا مفاجآت هناك. ولكن إذا قمت بتحديث A0 أو A1 ، فستلاحظ أن A2 يُحدث تلقائيًا أيضًا.

لا يعمل JavaScript عادة بهذه الطريقة. إذا كنا سنكتب شيئًا مماثلا في JavaScript:

```js
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // سيبقى 3
```

عندما نقوم بتغيير `A0` ، لا يتغير `A2` تلقائيًا.

لذا كيف يمكننا فعل ذلك في JavaScript؟ أولاً ، من أجل إعادة تشغيل الشيفرة التي تحدث `A2` ، دعنا نقوم بتغليفها داخل دالة:

```js
let A2

function update() {
  A2 = A0 + A1
}
```

ثم ، نحتاج إلى تحديد بعض المصطلحات:

- الدالة `()update` تنتج **تأثير جانبي**، أو **تأثير** بشكل مختصر، لأنها تعدل حالة البرنامج.

- `A0` و `A1` تعتبر **اعتماديات** للتأثير، حيث تستخدم قيمهم لتنفيذ التأثير. يفترض أن التأثير هو **مشترِك** في الاعتماديات.

ما نحتاجه هو دالة سحرية يمكنها استدعاء `()update` (التأثير) كلما تغير `A0` أو `A1` (الاعتماديات):


```js
whenDepsChange(update)
```

تقوم الدالة `()whenDepsChange` بالمهام التالية:

1. تتبع عندما تُقرأ قيمة متغير ما. على سبيل المثال عند تقييم التعبير `A0 + A1` ، يُقرأ كل من `A0` و `A1`.

2. إذا قُرئ متغير ما عندما يكون هناك تأثير قيد التشغيل حاليًا ، فاجعل هذا التأثير مشترِكًا في هذا المتغير. على سبيل المثال لأن `A0` و `A1` تقرأ قيمتهما عند تنفيذ `()update` ، يصبح `()update` مشتركًا في كل من `A0` و `A1` بعد أول استدعاء.

3. تكتشف عندما يُعدل متغير ما. على سبيل المثال عندما تُعين قيمة جديدة لـ `A0` ، تُعلم جميع التأثيرات المشترِكة بها بإعادة التشغيل.

## كيف تعمل التفاعلية في Vue {#how-reactivity-works-in-vue}

لا يمكننا تتبع قراءة وكتابة المتغيرات المحلية كما في المثال. لا يوجد آلية للقيام بذلك في JavaScript الأساسي. ما **يمكننا** فعله ، على الرغم من ذلك ، هو اعتراض قراءة وكتابة **خاصيات الكائن**.

There are two ways of intercepting property access in JavaScript: [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) / [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set#description) and [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Vue 2 used getter / setters exclusively due to browser support limitations. In Vue 3, Proxies are used for reactive objects and getter / setters are used for refs. Here's some pseudo-code that illustrates how they work:

```js{4,9,17,22}
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

:::tip ملاحظة
تهدف مقاطع الشيفرة هنا وفيما يلي إلى شرح المفاهيم الأساسية بأبسط شكل ممكن، لذا تحذف العديد من التفاصيل ، وتُتَجاهل الحالات الحدية.
:::

هذا يشرح بعض [قيود الكائنات التفاعلية](/guide/essentials/reactivity-fundamentals#limitations-of-reactive) التي ناقشناها في قسم الأساسيات:

- عندما تعين أو تفكك خاصية كائن تفاعلي إلى متغير محلي، فإن الوصول إلى هذا المتغير أو تعيينه يصبح غير تفاعلي لأنه لم يعد يُشغل خطافات الوصول / التعيين على كائن المصدر. لاحظ أن هذا "الانفصال" يؤثر فقط على ربط المتغير - إذا كان المتغير يشير إلى قيمة غير أساسية مثل كائن، فإن تغيير الكائن سيظل تفاعليًا.

- الوسيط المُرجع من `()reactive` ، على الرغم من أنه يتصرف تمامًا مثل الأصلي ، له هوية مختلفة إذا قارناه بالأصل باستخدام عامل `===`.

داخل `()track` ، نتحقق مما إذا كان هناك تأثير يعمل حاليًا. إذا كان هناك واحد، فإننا نبحث عن تأثيرات المُشتركين (المخزنة في مجموعة Set) للخاصية التي تكون قيد المتابعة ، ونضيف التأثير إلى المجموعة (Set):

```js
// سيعين هذا قبل تشغيل التأثير. 
// سنتعامل مع هذا لاحقًا.
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```

تخزن اشتراكات التأثير في هيكل بيانات عام `<<<WeakMap<target, Map<key, Set<effect`. إذا لم يُعثر على مجموعة تأثيرات مشتركة لخاصية (اُتبعت للمرة الأولى) ، فستُنشأ. هذا ما تفعله وظيفة `()getSubscribersForProperty` ، بإيجاز  وللتبسيط، سنتخطى تفاصيلها.

داخل `()trigger` ، نبحث مرة أخرى عن تأثيرات مشتركي الخاصية. ولكن هذه المرة نقوم باستدعائها بدلاً من ذلك:

```js
function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}
```

الآن دعونا نعود إلى دالة `()whenDepsChange`:

```js
function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}
```

يقوم بتغليف الدالة الخام `()update` في تأثير يضع نفسه كتأثير نشط حاليًا قبل تشغيل التحديث الفعلي. هذا يمكن استدعاءات `()track`  أثناء التحديث لتحديد التأثير النشط الحالي.

في هذه النقطة، لقد قمنا بإنشاء تأثير يتتبع تلقائيًا اعتمادياته، ويعيد تشغيلها كلما تغيرت إحدى الاعتماديات. نسمي هذا **تأثيرًا تفاعليا**.

يوفر Vue واجهة برمجية تسمح لك بإنشاء تأثيرات تفاعلية: [`()watchEffect`]. في الواقع، قد لاحظت أنه يعمل بشكل مشابه لـ `()whenDepsChange` السحرية في المثال. يمكننا الآن إعادة صياغة المثال الأصلي باستخدام الواجهات البرمجية لـVue الفعلية:

```js
import { ref, watchEffect } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = ref()

watchEffect(() => {
  // تتبع
  A2.value = A0.value + A1.value
})

// تشغل التأثير
A0.value = 2
```

استخدام تأثير تفاعلي لتغيير مرجع تفاعلي ليس أكثر حالات الاستخدام إثارة للاهتمام - في الواقع، باستخدام خاصية محسوبة يجعلها تصريحية بشكل أكبر :

```js
import { ref, computed } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = computed(() => A0.value + A1.value)

A0.value = 2
```

داخليًا، تدير `()computed` إبطال صلاحيتها وإعادة حسابها باستخدام تأثير تفاعلي.

إذا هل يوجد مثال على تأثير تفاعلي شائع ومفيد؟ حسنًا، تحديث DOM! يمكننا تنفيذ "تصيير تفاعلي" بسيط مثل هذا:

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `Count is: ${count.value}`
})

// يحدث الـ DOM
count.value++
```

في الواقع، هذا قريب جدًا من كيفية إبقاء مكون Vue على حالة متزامنة مع DOM - كل نسخة مكون تنشئ تأثيرًا تفاعليًا لتصيير وتحديث الـDOM. بالطبع، تستخدم مكونات Vue طرقًا أكثر كفاءة لتحديث DOM من `()innerHTML`. لقد نوقش هذا في [آلية التصيير](./rendering-mechanism).

<div class="options-api">

`()ref`و `()computed` و `()watchEffect`  هم دوال من الواجهة الواجهة التركيبية. إذا كنت تستخدم واجهة  الخيارات فقط مع Vue حتى الآن، ستلاحظ أن الواجهة  التركيبية أقرب إلى كيفية عمل نظام التفاعلية في Vueخلف الكواليس. في الواقع، في Vue 3 تنفذ واجهة الخيارات بالاعتماد على الواجهة التركيبية. يؤدي الوصول إلى الخاصية على نسخة المكون (`this`) إلى تتبع الحصول وتعيين القيمة من أجل تتبع التفاعل، والخيارات مثل `watch` و `computed` تستدعي مكافئاتها في الواجهة التركيبية داخليًا.
</div>

## التفاعلية في وقت التشغيل مقابل وقت التصريف {#runtime-vs-compile-time-reactivity}

نظام التفاعلية في Vue هو أساسًا يعتمد على وقت التشغيل: الشيفرة يُتتبع ويشغل أثناء تشغيل الشيفرة مباشرة في المتصفح. إيجابيات التفاعلية في وقت التشغيل هي أنه يمكن أن يعمل دون خطوة بناء، وهناك حالات محددة أقل. من ناحية أخرى، يجعل هذا مقيدًا بقيود صيغ الـJavaScript, مما يؤدي إلى الحاجة إلى حاويات القيمة مثل Vue refs.

بعض الإطارات ، مثل [Svelte](https://svelte.dev/) ، تختار التغلب على مثل هذه القيود من خلال تنفيذ التفاعلية أثناء التصريف. يحلل ويحول الشيفرة من أجل محاكاة التفاعلية. تتيح له الخطوة التصريفية تغيير الصيغة الأساسية لـ JavaScript نفسها - على سبيل المثال ، حقن الشيفرة ضمنيًا التي تنفذ تحليل الاعتمادية وتشغيل التأثيرات حول الوصول إلى المتغيرات المحلية. العيب هو أن مثل هذه التحويلات تتطلب خطوة بناء ، وتغيير بنية الجملة الأساسية لـ JavaScript هو أساسًا إنشاء لغة تبدو مثل JavaScript ولكن تترجم إلى شيء آخر.

فريق Vue قام بالاستكشاف في هذا الاتجاه من خلال ميزة تجريبية تسمى [تحويل التفاعلية](/guide/extras/reactivity-transform) ، ولكن في النهاية قررنا أنها لن تكون مناسبة للمشروع للأسباب [الموضحة هنا](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028)

## تنقيح أخطاء التفاعلية {#reactivity-debugging}

من الرائع أن نظام التفاعلية في Vue يتتبع الاعتماديات تلقائيًا، ولكن في بعض الحالات قد نريد معرفة بالضبط ماهي الاعتمادية التي تحت قيد المتابعة، أو ما الذي يتسبب في إعادة تصيير المكون.

### خطافات تنقيح المكون {#component-debugging-hooks}

يمكننا تنقيح ماهي الاعتماديات التي استخدمت أثناء تصيير المكون وماهي الاعتمادية التي تسبب في التحديث باستخدام خطافات دورة حياة <span class="options-api">`renderTracked`</span><span class="composition-api">`onRenderTracked`</span> و <span class="options-api">`renderTriggered`</span><span class="composition-api">`onRenderTriggered`</span>. سيتلقى كلا الخطافين حدث تنقيح يحتوي على معلومات حول الاعتمادية المطلوبة. من المستحسن وضع تعليمة `debugger` في دوال رد النداء لفحص الاعتمادية تفاعليًا:

<div class="composition-api">

```vue
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  renderTracked(event) {
    debugger
  },
  renderTriggered(event) {
    debugger
  }
}
```

</div>


:::tip ملاحظة
خطافات تنقيح المكون تعمل فقط في وضع التطوير.
:::

تحتوي كائنات حدث التنقيح على النوع التالي:

<span id="debugger-event"></span>

```ts
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type:
    | TrackOpTypes /* 'get' | 'has' | 'iterate' */
    | TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

### التنقيح المحسوب للأخطاء  {#computed-debugging}

<!-- TODO options API equivalent -->

يمكننا تنقيح الخاصيات المحسوبة عن طريق تمرير كائن خيارات ثاني إلى `()computed`  مع دوال رد النداء `onTrack` و `onTrigger`:

- ستستدعى `onTrack` عندما تُتبع خاصية تفاعلية أو مرجع كاعتمادية.
- ستستدعى `onTrigger` عندما تشغل دالة رد النداء للمراقب بسبب تغيير اعتمادية.

ستستقبل كلا الدالتين حدث تنقيح بنفس [التنسيق](#debugger-event) كخطافات تنقيح المكون:

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // تشغل عندما تتبع count.value كاعتمادية
    debugger
  },
  onTrigger(e) {
    // تشغل عندما يتغير count.value
    debugger
  }
})

// الوصول إلى plusOne ، يجب أن يشغل onTrack
console.log(plusOne.value)

// تغيير count.value ، يجب أن يشغل onTrigger
count.value++
```

:::tip ملاحظة
خيارات `onTrack` و `onTrigger` للدالة المحسوبة تعمل فقط في وضع التطوير.
:::
### تنقيح الدوال المراقبة  {#watcher-debugging}

<!-- TODO options API equivalent -->

بشكل مشابه لـ `computed()` ، تدعم المراقبات أيضًا خيارات `onTrack` و `onTrigger`:

```js
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

:::tip ملاحظة 
خيارات `onTrack` و `onTrigger` للمراقب تعمل فقط في وضع التطوير.
:::

## الاندماج مع أنظمة الحالة الخارجية {#integration-with-external-state-systems}

يعمل نظام التفاعلية في Vue عن طريق تحويل كائنات JavaScript العادية إلى وسائط تفاعلية. يمكن أن يكون التحويل العميق غير ضروري أو غير مرغوب فيه أحيانًا عند الاندماج مع أنظمة إدارة الحالة الخارجية (على سبيل المثال ، إذا كانت الحلول الخارجية تستخدم أيضًا وسائط Proxies).

فكرة دمج نظام التفاعلية في Vue مع حلول إدارة الحالة الخارجية هي الاحتفاظ بالحالة الخارجية في [`shallowRef`](/api/reactivity-advanced#shallowref). يكون المرجع السطحي متفاعلاً فقط عند الوصول إلى خاصية `value.` - يترك القيمة الداخلية سليمة. عندما تتغير الحالة الخارجية ، استبدل قيمة المرجع لتشغيل التحديثات.

### البيانات غير القابلة للتغيير {#immutable-data}

إذا كنت تقوم بتنفيذ ميزة التراجع / الإعادة ، فمن المحتمل أنك تريد التقاط لقطة لحالة التطبيق في كل تحرير للمستخدم. ومع ذلك ، فإن نظام التفاعلية القابل للتغيير في Vue ليس الأنسب لهذا إذا كانت شجرة الحالة كبيرة ، لأن سَلسَلة كائن الحالة بالكامل في كل تحديث يمكن أن يكون مكلفًا من حيث تكاليف وحدة المعالجة المركزية والذاكرة.

تحل [هياكل البيانات غير القابلة للتغيير](https://en.wikipedia.org/wiki/Persistent_data_structure) هذه بعدم تغيير كائنات الحالة أبدًا - بدلاً من ذلك ، ينشئ كائنات جديدة تشارك نفس الأجزاء غير المتغيرة مع القديمة. هناك طرق مختلفة لاستخدام البيانات غير القابلة للتغيير في JavaScript ، ولكن نوصي باستخدام [Immer](https://immerjs.github.io/immer/) مع Vue لأنه يتيح لك استخدام البيانات غير القابلة للتغيير مع الحفاظ على صيغة مريحة وقابلة للتغيير.

يمكننا دمج Immer مع Vue عبر دالة تركيبية بسيطة:

```js
import { produce } from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```

[Try it in the Playground](https://play.vuejs.org/#eNp9VMFu2zAM/RXNl6ZAYnfoTlnSdRt66DBsQ7vtEuXg2YyjRpYEUU5TBPn3UZLtuE1RH2KLfCIfycfsk8/GpNsGkmkyw8IK4xiCa8wVV6I22jq2Zw3CbV2DZQe2srpmZ2km/PmMK8a4KrRCxxbCQY1j1pgyd3DrD0s27++OFh689z/0OOEkTBlPvkNuFfvbAE/Gra/UilzOko0Mh2A+ufcHwd9ij8KtWUjwMsAqlxgjcLU854qrVaMKJ7RiTleVDBRHQpWwO4/xB8xHoRg2v+oyh/MioJepT0ClvTsxhnSUi1LOsthN6iMdCGgkBacTY7NGhjd9ScG2k5W2c56M9rG6ceBPdbOWm1AxO0/a+uiZFjJHpFv7Fj10XhdSFBtyntTJkzaxf/ZtQnYguoFNJkUkmAWGs2xAm47onqT/jPWHxjjYuUkJhba57+yUSaFg4tZWN9X6Y9eIcC8ZJ1FQkzo36QNqRZILQXjroAqnXb+9LQzVD3vtnMFpljXKbKq00HWU3/X7i/QivcxKgS5aUglVXjxNAGvK8KnWZSNJWa0KDoGChzmk3L28jSVcQX1o1d1puwfgOpdSP97BqsfQxhCCK9gFTC+tXu7/coR7R71rxRWXBL2FpHOMOAAeYVGJhBvFL3s+kGKIkW5zSfKfd+RHA2u3gzZEpML9y9JS06YtAq5DLFmOMWXsjkM6rET1YjzUcSMk2J/G1/h8TKGOb8HmV7bdQbqzhmLziv0Bd3Govywg2O1x8Umvua3ARffN/Q/S1sDZDfMN5x2glo3nGGFfGlUS7QEusL0NcxWq+o03OwcKu6Ke/+fwhIb89Y3Sj3Qv0w+9xg7/AWfvyMs=)

### آلات الحالات {#state-machines}

[آلة الحالة](https://en.wikipedia.org/wiki/Finite-state_machine) هي نموذج لوصف جميع الحالات الممكنة التي يمكن أن يكون عليها التطبيق ، وجميع الطرق الممكنة التي يمكن أن ينتقل بها من حالة إلى أخرى. على الرغم من أنه قد يكون زيادة غير ضرورية للمكونات البسيطة ، إلا أنه يمكن أن يساعد في جعل تدفقات الحالة المعقدة أكثر قوة وقابلية للإدارة.

واحدة من أكثر تنفيذات آلة الحالة شيوعًا في JavaScript هي [XState](https://xstate.js.org/). إليك مكونًا يتكامل معه:

```js
import { createMachine, interpret } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine(options) {
  const machine = createMachine(options)
  const state = shallowRef(machine.initialState)
  const service = interpret(machine)
    .onTransition((newState) => (state.value = newState))
    .start()
  const send = (event) => service.send(event)

  return [state, send]
}
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1hY2hpbmUgfSBmcm9tICcuL21hY2hpbmUuanMnXG4gIFxuY29uc3QgW3N0YXRlLCBzZW5kXSA9IHVzZU1hY2hpbmUoe1xuICBpZDogJ3RvZ2dsZScsXG4gIGluaXRpYWw6ICdpbmFjdGl2ZScsXG4gIHN0YXRlczoge1xuICAgIGluYWN0aXZlOiB7IG9uOiB7IFRPR0dMRTogJ2FjdGl2ZScgfSB9LFxuICAgIGFjdGl2ZTogeyBvbjogeyBUT0dHTEU6ICdpbmFjdGl2ZScgfSB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cInNlbmQoJ1RPR0dMRScpXCI+XG4gICAge3sgc3RhdGUubWF0Y2hlcyhcImluYWN0aXZlXCIpID8gXCJPZmZcIiA6IFwiT25cIiB9fVxuICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ4c3RhdGVcIjogXCJodHRwczovL3VucGtnLmNvbS94c3RhdGVANC4yNy4wL2VzL2luZGV4LmpzP21vZHVsZVwiXG4gIH1cbn0iLCJtYWNoaW5lLmpzIjoiaW1wb3J0IHsgY3JlYXRlTWFjaGluZSwgaW50ZXJwcmV0IH0gZnJvbSAneHN0YXRlJ1xuaW1wb3J0IHsgc2hhbGxvd1JlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU1hY2hpbmUob3B0aW9ucykge1xuICBjb25zdCBtYWNoaW5lID0gY3JlYXRlTWFjaGluZShvcHRpb25zKVxuICBjb25zdCBzdGF0ZSA9IHNoYWxsb3dSZWYobWFjaGluZS5pbml0aWFsU3RhdGUpXG4gIGNvbnN0IHNlcnZpY2UgPSBpbnRlcnByZXQobWFjaGluZSlcbiAgICAub25UcmFuc2l0aW9uKChuZXdTdGF0ZSkgPT4gKHN0YXRlLnZhbHVlID0gbmV3U3RhdGUpKVxuICAgIC5zdGFydCgpXG4gIGNvbnN0IHNlbmQgPSAoZXZlbnQpID0+IHNlcnZpY2Uuc2VuZChldmVudClcblxuICByZXR1cm4gW3N0YXRlLCBzZW5kXVxufSJ9)

### مكتبة RxJS {#rxjs}

[RxJS](https://rxjs.dev/) هي مكتبة للعمل مع تدفقات الأحداث غير المتزامنة. توفر مكتبة [VueUse](https://vueuse.org/) إضافة [`vueuse/rxjs@`](https://vueuse.org/rxjs/readme.html) لربط تدفقات RxJS مع نظام التفاعلية في Vue.

## Connection to Signals {#connection-to-signals}

لقد قامت العديد من الإطارات الأخرى بتقديم أوليات تفاعلية مماثلة للمراجع من الواجهة التركيبية في Vue، تحت مصطلح "الإشارات":

- [Solid Signals](https://www.solidjs.com/docs/latest/api#createsignal)
- [Angular Signals](https://angular.dev/guide/signals)
- [Preact Signals](https://preactjs.com/guide/v10/signals/)
- [Qwik Signals](https://qwik.builder.io/docs/components/state/#usesignal)

بشكل أساسي، الإشارات هي نوع من الأوليات التفاعلية مثل المراجع في Vue. إنها حاوية قيمة توفر تتبع الاعتمادية عند الوصول، وتشغيل التأثيرات الجانبية عند التغيير. هذا النمط القائم على الأوليات التفاعلية ليس مفهومًا جديدًا بشكل خاص في عالم الواجهة الأمامية: إنه يعود إلى تنفيذات مثل [Knockout observables](https://knockoutjs.com/documentation/observables.html) و [Meteor Tracker](https://docs.meteor.com/api/tracker.html) منذ أكثر من عقد من الزمن. واجهة خيارات Vue ومكتبة إدارة حالة React [MobX](https://mobx.js.org/) مبنية أيضًا على نفس المبادئ، ولكنها تخفي الأوليات وراء خاصيات الكائن.

Although not a necessary trait for something to qualify as signals, today the concept is often discussed alongside the rendering model where updates are performed through fine-grained subscriptions. Due to the use of Virtual DOM, Vue currently [relies on compilers to achieve similar optimizations](/guide/extras/rendering-mechanism#compiler-informed-virtual-dom). However, we are also exploring a new Solid-inspired compilation strategy, called [Vapor Mode](https://github.com/vuejs/core-vapor), that does not rely on Virtual DOM and takes more advantage of Vue's built-in reactivity system.

### تنازلات تصميم الواجهات البرمجية {#api-design-trade-offs}

تصميم إشارات Preact و Qwik مشابه جدًا لـ [shallowRef](/api/reactivity-advanced#shallowref) في Vue: توفر الثلاثة واجهة قابلة للتغيير عبر خاصية `value.`. سنركز النقاش على إشارات Solid و Angular.

#### إشارات Solid {#solid-signals}

تصميم الواجهة البرمجية `()createSignal` في Solid يؤكد على الفصل بين القراءة والكتابة. تعرض الإشارات كدوال محصلة مقروءة فقط ومنفصلة عن الدوال المُعيِّنة:

```js
const [count, setCount] = createSignal(0)

count() // الوصول
setCount(1) // تحديث القيمة
```

لاحظ كيف يمكن تمرير إشارة `count` دون الدالة المُعيِّنة. هذا يضمن أن الحالة لا يمكن تغييرها أبدًا ما لم تعرض الدالة المُعيِّنة أيضًا بشكل صريح. قد يكون موضوعًا لمتطلبات المشروع والذوق الشخصي ما إذا كانت هذه الضمانات الآمنة تبرر صيغة أكثر تفصيلاً - ولكن في حالة تفضيلك لهذا النمط من الواجهات البرمجية، يمكنك تكراره بسهولة في Vue:

```js
import { shallowRef, triggerRef } from 'vue'

export function createSignal(value, options) {
  const r = shallowRef(value)
  const get = () => r.value
  const set = (v) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (options?.equals === false) triggerRef(r)
  }
  return [get, set]
}
```

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNpdUk1TgzAQ/Ss7uQAjgr12oNXxH+ix9IAYaDQkMV/qMPx3N6G0Uy9Msu/tvn2PTORJqcI7SrakMp1myoKh1qldI9iopLYwQadpa+krG0TLYYZeyxGSojSSs/d7E8vFh0ka0YhOCmPh0EknbB4mPYfTEeqbIelD1oiqXPRQCS+WjoojAW8A1Wmzm1A39KYZzHNVYiUib85aKeCx46z7rBuySqQe6h14uINN1pDIBWACVUcqbGwtl17EqvIiR3LyzwcmcXFuTi3n8vuF9jlYzYaBajxfMsDcomv6E/m9E51luN2NV99yR3OQKkAmgykss+SkMZerxMLEZFZ4oBYJGAA600VEryAaD6CPaJwJKwnr9ldR2WMedV1Dsi6WwB58emZlsAV/zqmH9LzfvqBfruUmNvZ4QN7VearjenP4aHwmWsABt4x/+tiImcx/z27Jqw==)

#### إشارات Angular {#angular-signals}

Angular تخضع لبعض التغييرات الأساسية من خلال التخلي عن الفحص القذر وإدخال تنفيذها الخاص للأوليات التفاعلية. تبدو الواجهة البرمجية للإشارات في Angular هكذا:


```js
const count = signal(0)

count() // access the value
count.set(1) // set new value
count.update((v) => v + 1) // update based on previous value
```

مرة أخرى، يمكننا تكرار الواجهة البرمجية بسهولة في Vue:

```js
import { shallowRef } from 'vue'

export function signal(initialValue) {
  const r = shallowRef(initialValue)
  const s = () => r.value
  s.set = (value) => {
    r.value = value
  }
  s.update = (updater) => {
    r.value = updater(r.value)
  }
  return s
}
```

[Try it in the Playground](https://play.vuejs.org/#eNp9Ul1v0zAU/SuWX9ZCSRh7m9IKGHuAB0AD8WQJZclt6s2xLX+ESlH+O9d2krbr1Df7nnPu17k9/aR11nmgt7SwleHaEQvO6w2TvNXKONITyxtZihWpVKu9g5oMZGtUS66yvJSNF6V5lyjZk71ikslKSeuQ7qUj61G+eL+cgFr5RwGITAkXiyVZb5IAn2/IB+QWeeoHO8GPg1aL0gH+CCl215u7mJ3bW9L3s3IYihyxifMlFRpJqewL1qN3TknysRK8el4zGjNlXtdYa9GFrjryllwvGY18QrisDLQgXZTnSX8pF64zzD7pDWDghbbI5/Hoip7tFL05eLErhVD/HmB75Edpyd8zc9DUaAbso3TrZeU4tjfawSV3vBR/SuFhSfrQUXLHBMvmKqe8A8siK7lmsi5gAbJhWARiIGD9hM7BIfHSgjGaHljzlDyGF2MEPQs6g5dpcAIm8Xs+2XxODTgUn0xVYdJ5RxPhKOd4gdMsA/rgLEq3vEEHlEQPYrbgaqu5APNDh6KWUTyuZC2jcWvfYswZD6spXu2gen4l/mT3Icboz3AWpgNGZ8yVBttM8P2v77DH9wy2qvYC2RfAB7BK+NBjon32ssa2j3ix26/xsrhsftv7vQNpp6FCo4E5RD6jeE93F0Y/tHuT3URd2OLwHyXleRY=)

بالمقارنة مع المراجع في Vue، توفر الواجهات البرمجية القائمة على الدوال المحصلة في Solid و Angular بعض التنازلات المثيرة للاهتمام عند استخدامها في مكونات Vue:

- `()` أقل تفصيلاً  من `value.`، ولكن تحديث القيمة أكثر تفصيلاً.
- لا يوجد فك تغليف للمراجع: الوصول إلى القيم يتطلب دائمًا `()`. هذا يجعل وصول القيم متسقًا في كل مكان. هذا يعني أيضًا أنه يمكنك تمرير الإشارات الخام أسفل كخاصيات المكون.

سواء كانت هذه الواجهات البرمجية تناسبك إلى حد ما بشكل شخصي. هدفنا هنا هو إظهار التشابه الأساسي والتنازلات بين هذه التصاميم المختلفة للواجهات البرمجية. نريد أيضًا أن نظهر أن Vue مرن: لست مقيدًا حقًا بالواجهات البرمجية الحالية. إذا لزم الأمر، يمكنك إنشاء أوليات تفاعلية برمجية خاصة بك لتناسب احتياجات أكثر تحديدًا.
