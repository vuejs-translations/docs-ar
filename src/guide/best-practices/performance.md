---
outline: deep
---

# الأداء {#performance}

## نظرة عامة {#overview}

صمم Vue ليكون فعالاً في حالات الاستخدام الأكثر شيوعًا دون الحاجة إلى إجراء تحسينات يدوية. ومع ذلك ، هناك دائمًا سيناريوهات صعبة تتطلب مزيدًا من الضبط الدقيق. في هذا القسم ، سنناقش ما يجب الانتباه إليه عندما يتعلق الأمر بالأداء في تطبيق Vue.

أولاً ، دعنا نناقش الجانبين الرئيسيين لأداء الويب:

- **Page Load Performance**: how fast the application shows content and becomes interactive on the initial visit. This is usually measured using web vital metrics like [Largest Contentful Paint (LCP)](https://web.dev/lcp/) and [Interaction to Next Paint](https://web.dev/articles/inp).

- **تحديث الأداء**: مدى سرعة تحديث التطبيق استجابةً لما يدخله المستخدم. على سبيل المثال ، مدى سرعة تحديث القائمة عندما يكتب المستخدم في مربع بحث ، أو مدى سرعة تبديل الصفحة عندما ينقر المستخدم على رابط في تطبيق أحادي الصفحة (SPA).

في حين أنه سيكون من المثالي تعظيم كليهما ، تميل هياكل الواجهة المختلفة إلى التأثير على مدى سهولة تحقيق الأداء المطلوب في هذه الجوانب. بالإضافة إلى ذلك ، يؤثر نوع التطبيق الذي تقوم ببنائه بشكل كبير على ما يجب أن تحدده من أولويات الأداء. لذلك ، فإن الخطوة الأولى لضمان الأداء الأمثل هي اختيار البنية المناسبة لنوع التطبيق الذي تقوم ببنائه:

- اطلع على [طرق استخدام Vue](/guide/extras/ways-of-using-vue) لترى كيف يمكنك الاستفادة من Vue بطرق مختلفة.

- Jason Miller يناقش أنواع تطبيقات الويب والتنفيذ / التسليم المثالي لكل منها في [التطبيقات النموذجية](https://jasonformat.com/application-holotypes/).

## خيارات التحليل {#profiling-options}

لتحسين الأداء ، نحتاج أولاً إلى معرفة كيفية قياسه. هناك عدد من الأدوات الرائعة التي يمكن أن تساعد في هذا الصدد:

لتحليل أداء التحميل لعمليات نشر الإنتاج:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

لتحليل الأداء أثناء التطوير المحلي:

- [لوحة أداء أدوات التطوير المدمجة الخاصة بChrome](https://developer.chrome.com/docs/devtools/evaluate-performance/)
  - [`app.config.performance`](/api/application#app-config-performance) يُمكّن علامات الأداء الخاصة بـ Vue في الجدول الزمني لأداء أدوات التطوير المدمجة الخاصة بChrome.
- [Vue DevTools Extension](/guide/scaling-up/tooling#browser-devtools) يوفر أيضًا ميزة تحليل ملامح الأداء.

## تحسينات تحميل الصفحة {#page-load-optimizations}

هناك العديد من الجوانب الحيادية لإطار العمل لتحسين أداء تحميل الصفحة - راجع [دليل web.dev هذا](https://web.dev/fast/) للحصول على تقرير شامل. هنا ، سنركز بشكل أساسي على التقنيات الخاصة بـ Vue.

### اختيار المخطط الصحيح {#choosing-the-right-architecture}

إذا كانت حالة الاستخدام لديك حساسة لأداء تحميل الصفحة ، فتجنب شحنها على أنها تطبيق أحادي صفحة SPA خالص من جانب المستخدم. تريد أن يرسل الخادوم الخاص بك مباشرةً HTML يحتوي على المحتوى الذي يريد المستخدمون رؤيته. يعاني العرض الخالص من جانب المستخدم من بطء الوقت في الوصول إلى المحتوى. يمكن تخفيف ذلك باستخدام [التصيير من الخادوم (SSR)](/guide/extras/ways-of-using-vue#fullstack-ssr) أو [توليد موقع ساكن (SSG)](/guide/extras/ways-of-using-vue#jamstack-ssg). تحقق من [دليل توجيه التصيير من الخادوم SSR](/guide/scaling-up/ssr) لمعرفة المزيد حول أداء التصيير من الخادوم SSR باستخدام Vue. إذا لم يكن لتطبيقك متطلبات تفاعلية غنية ، فيمكنك أيضًا استخدام خادوم تقليدي لتصيير HTML وتحسينه باستخدام Vue على المستخدم.

إذا كان التطبيق الرئيسي الخاص بك يجب أن يكون تطبيق أحادي الصفحة SPA ، ولكن يحتوي على صفحات تسويقية (واجهة ، حول ، مدونة) ، اشحنها بشكل منفصل! يجب نشر صفحات التسويق الخاصة بك بشكل مثالي بتنسيق HTML ثابت مع الحد الأدنى من JS ، باستخدام توليد موقع ساكن SSG.

### حجم الحزمة و عدم وجود شيفرات ميتة {#bundle-size-and-tree-shaking}

من أكثر الطرق فعالية لتحسين أداء تحميل الصفحات هي شحن حزم JavaScript أصغر حجمًا. فيما يلي بعض الطرق لتقليل حجم الحزمة عند استخدام Vue:

- استخدم عملية بناء إن أمكن.

  - العديد من واجهات Vue البرمجية تكون ["بعدم وجود شيفرات ميتة"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) إذا تجمعت عبر أداة بناء حديثة. على سبيل المثال ، إذا لم تستخدم المكوّن المدمج `<Transition>` ، فلن يُضمَّن في حزمة الإنتاج النهائية. يمكن أن يؤدي حذف الشيفرات الميتة أيضًا إلى إزالة الوحدات الأخرى غير المستخدمة في الشيفرة المصدرية الخاصة بك.

  - عند استخدام عملية بناء ، تُصرف القوالب مسبقًا ، لذلك لا نحتاج إلى شحن مصرف Vue إلى المتصفح. هذا يوفر **14kb** على الأقل + ملفات JavaScript مضغوطة ويتجنب تكلفة التصريف وقت التشغيل.

- كن حذرًا من الحجم عند إدخال اعتماديات جديدة! في التطبيقات الواقعية ، غالبًا ما تكون الحزم المتضخمة نتيجة لإدخال إعتمادات ثقيلة دون إدراك ذلك.

  - إذا كنت تستخدم عملية بناء، ففضل الإعتماديات التي تقدم تنسيقات وحدات ES وتكون ملائمة لحذف الشيفرات الميتة. على سبيل المثال ، يفضل `lodash-es` على `lodash`.

  - تحقق من حجم الإعتمادية وقيّم ما إذا كانت تستحق الوظيفة التي توفرها. لاحظ أنه إذا كانت الإعتمادية مناسبة لحذف الشيفرات الميتة ، فسيعتمد زيادة الحجم على الواجهات البرمجية التي تستوردها منها. يمكن استخدام أدوات مثل [bundlejs.com](https://bundlejs.com/) لإجراء فحوصات سريعة ، ولكن القياس باستخدام إعداد البناء الفعلي سيكون دائمًا هو الأكثر دقة.

- إذا كنت تستخدم Vue بشكل أساسي للتحسين التقدمي وتفضل تجنب عملية البناء ، ففكر في استخدام [petite-vue](https://github.com/vuejs/petite-vue) (فقط **6kb**) بدلاً من ذلك.

### تقسيم الشيفرة {#code-splitting}

تقسيم الشيفرة هو المكان الذي تقوم فيه أداة البناء بتقسيم حزمة التطبيق إلى أجزاء متعددة أصغر ، والتي يمكن تحميلها عند الطلب أو بالتوازي. من خلال التقسيم المناسب للشيفرة ، يمكن تنزيل الميزات المطلوبة عند تحميل الصفحة على الفور ، مع تحميل أجزاء إضافية عند الحاجة فقط ، وبالتالي تحسين الأداء.

مجموعات مثل Rollup (التي يعتمد عليها Vite) أو webpack يمكنها إنشاء أجزاء مقسمة تلقائيًا عن طريق اكتشاف بنية الاستيراد الديناميكي لـ ESM:

```js
// lazy.js و إعتماداتها سيفصلون إلى جزء منفصل
// وستحمل فقط عند استدعاء `loadLazy()`.
function loadLazy() {
  return import('./lazy.js')
}
```

من الأفضل استخدام التحميل الخامل في الميزات غير المطلوبة فورًا بعد التحميل الأولي للصفحة. في تطبيقات Vue ، يمكن استخدام هذا مع ميزة Vue [المكون الغير متزامن](/guide/components/async) لإنشاء أجزاء مقسمة لأشجار المكونات:

```js
import { defineAsyncComponent } from 'vue'

//  سينشيء جزء منفصل لـ Foo.vue و إعتماداته.
// سيجلب عند الطلب فقط عند عرض
// المكون غير المتزامن على الصفحة.
const Foo = defineAsyncComponent(() => import('./Foo.vue'))
```

بالنسبة للتطبيقات التي تستخدم Vue Router ، يوصى بشدة باستخدام التحميل الخامل لمكونات التوجيه. يحتوي Vue Router على دعم صريح للتحميل البطيء ، منفصل عن `defineAsyncComponent`. راجع [توجيهات التحميل الخامل](https://router.vuejs.org/guide/advanced/lazy-loading.html) للمزيد من التفاصيل.

## تحديث التحسينات {#update-optimizations}

### استقرار الخاصيات {#props-stability}

في Vue ، يحدّث المكون الابن فقط عندما تتغير على الأقل واحدة من الخاصيات المستلمة. تأمل المثال التالي:

```vue-html
<ListItem
  v-for="item in list"
  :id="item.id"
  :active-id="activeId" />
```

داخل المكون `<ListItem>` ، يستخدم خاصيتي `id` و` activeId` لتحديد ما إذا كان العنصر الحالي هو العنصر النشط أم لا. رغم أن هذا يشتغل كما هو مطلوب ، تكمن المشكلة في أنه كلما تغيرت `activeId` ، يجب تحديث **كل** `<ListItem>` في القائمة!

بشكل مثالي، يجب فقط تحديث العناصر التي تغيّرت حالتها النشطة. يمكننا تحقيق ذلك عن طريق نقل حساب الحالة النشطة إلى المكون الأب، وجعل`<ListItem>` يقبل مباشرةً خاصية `active` بدلاً من ذلك:

```vue-html
<ListItem
  v-for="item in list"
  :id="item.id"
  :active="item.id === activeId" />
```

الآن ، بالنسبة لمعظم المكونات ، ستظل الخاصية `active` كما هي عند تغيير` activeId` ، لذلك لم تعد بحاجة إلى التحديث. بشكل عام ، الفكرة هي الحفاظ على استقرار الخاصيات التي تنتقل إلى المكونات الأبناء قدر الإمكان.

### `v-once` {#v-once}

`v-once` هي مُوجهة مدمجة تُستخدم لتصيير المحتوى الذي يعتمد على بيانات وقت التشغيل ولكنها لا تحتاج إلى التحديث مطلقًا. ستُتخطى الشجرة الفرعية sub-tree التي اُستخدم عليها لجميع التحديثات المستقبلية بشكل كامل. اطلع على [مرجع واجهة برمجة التطبيق (API)](/api/built-in-directives#v-once) للحصول على مزيد من التفاصيل

### `v-memo` {#v-memo}

`v-memo` هي موجهة مدمجة يمكن استخدامها شرطيا لتخطي تحديث الأشجار الفرعية sub-trees الكبيرة أو قوائم `v-for`. اطلع على [مرجع واجهة برمجة التطبيق (API)](/api/built-in-directives#v-memo) للحصول على مزيد من التفاصيل.

### Computed Stability {#computed-stability}

In Vue 3.4 and above, a computed property will only trigger effects when its computed value has changed from the previous one. For example, the following `isEven` computed only triggers effects if the returned value has changed from `true` to `false`, or vice-versa:

```js
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // true

// will not trigger new logs because the computed value stays `true`
count.value = 2
count.value = 4
```

This reduces unnecessary effect triggers, but unfortunately doesn't work if the computed creates a new object on each compute:

```js
const computedObj = computed(() => {
  return {
    isEven: count.value % 2 === 0
  }
})
```

Because a new object is created each time, the new value is technically always different from the old value. Even if the `isEven` property remains the same, Vue won't be able to know unless it performs a deep comparison of the old value and the new value. Such comparison could be expensive and likely not worth it.

Instead, we can optimize this by manually comparing the new value with the old value, and conditionally returning the old value if we know nothing has changed:

```js
const computedObj = computed((oldValue) => {
  const newValue = {
    isEven: count.value % 2 === 0
  }
  if (oldValue && oldValue.isEven === newValue.isEven) {
    return oldValue
  }
  return newValue
})
```

[Try it in the playground](https://play.vuejs.org/#eNqVVMtu2zAQ/JUFgSZK4UpuczMkow/40AJ9IC3aQ9mDIlG2EokUyKVt1PC/d0lKtoEminMQQC1nZ4c7S+7Yu66L11awGUtNoesOwQi03ZzLuu2URtiBFtUECtV2FkU5gU2OxWpRVaJA2EOlVQuXxHDJJZeFkgYJayVC5hKj6dUxLnzSjZXmV40rZfFrh3Vb/82xVrLH//5DCQNNKPkweNiNVFP+zBsrIJvDjksgGrRahjVAbRZrIWdBVLz2yBfwBrIsg6mD7LncPyryfIVnywupUmz68HOEEqqCI+XFBQzrOKR79MDdx66GCn1jhpQDZx8f0oZ+nBgdRVcH/aMuBt1xZ80qGvGvh/X6nlXwnGpPl6qsLLxTtitzFFTNl0oSN/79AKOCHHQuS5pw4XorbXsr9ImHZN7nHFdx1SilI78MeOJ7Ca+nbvgd+GgomQOv6CNjSQqXaRJuHd03+kHRdg3JoT+A3a7XsfcmpbcWkQS/LZq6uM84C8o5m4fFuOg0CemeOXXX2w2E6ylsgj2gTgeYio/f1l5UEqj+Z3yC7lGuNDlpApswNNTrql7Gd0ZJeqW8TZw5t+tGaMdDXnA2G4acs7xp1OaTj6G2YjLEi5Uo7h+I35mti3H2TQsj9Jp6etjDXC8Fhu3F9y9iS+vDZqtK2xB6ZPNGGNVYpzHA3ltZkuwTnFf70b+1tVz+MIstCmmGQzmh/p56PGf00H4YOfpR7nV8PTxubP8P2GAP9Q==)

Note that you should always perform the full computation before comparing and returning the old value, so that the same dependencies can be collected on every run.

## تحسينات عامة {#general-optimizations}

> تؤثر النصائح التالية على كلٍ من تحميل الصفحة و تحديث الأداء.

### جعل القوائم الكبيرة افتراضية {#virtualize-large-lists}

أحد أكثر مشاكل الأداء شيوعًا في جميع تطبيقات الواجهة الأمامية هو عرض قوائم كبيرة. بغض النظر عن مدى أداء إطار العمل ، فإن عرض قائمة بآلاف العناصر **سيكون** بطيئًا نظرًا للعدد الهائل من عُقد DOM التي يحتاج المتصفح للتعامل معها.

لكن، لا يتعين علينا بالضرورة عرض كل هذه العقد مقدمًا. في معظم الحالات ، يمكن لحجم شاشة المستخدم عرض مجموعة فرعية صغيرة فقط من قائمتنا الكبيرة. يمكننا تحسين الأداء بشكل كبير بجعل **القوائم افتراضية** ، وهي تقنية عرض العناصر الموجودة حاليًا أو القريبة من الإطار المعروض فقط في قائمة كبيرة.

إن إنجاز افتراضية القائمة ليس بالأمر السهل ، لحسن الحظ هناك مكتبات موجودة يمكنك استخدامها مباشرة:

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)
- [vueuc/VVirtualList](https://github.com/07akioni/vueuc)

### تقليل التكلفة التفاعلية للهياكل الكبيرة غير القابلة للتغيير {#reduce-reactivity-overhead-for-large-immutable-structures}

نظام التفاعلية لـVue عميق بشكل افتراضي. على الرغم من أن هذا يجعل إدارة الحالة بديهية ، إلا أنه ينشئ مستوى معينًا من الحمل الزائد عندما يكون حجم البيانات كبيرًا ، لأن كل وصول إلى الخاصيات يقوم بتشغيل اعتراضات الوسيط التي تقوم بتتبع الإعتماديات. يصبح هذا ملحوظًا عادةً عند التعامل مع مصفوفات كبيرة من الكائنات المتداخلة بعمق ، حيث يحتاج التصيير الفردي إلى الوصول إلى أكثر من 100000 خاصية ، لذلك يجب أن يؤثر فقط على استخدام محدد للغاية.

توفر Vue طريقة للإفلات من التفاعلات العميقة باستخدام [`shallowRef()`](/api/reactivity-advanced#shallowref) و [`shallowReactive()`](/api/reactivity-advanced#shallowreactive). تُنشئ الواجهات البرمجية السطحية حالة تفاعلية فقط على مستوى الجذر ، وتبقي جميع الكائنات المتداخلة كما هي. هذا يحافظ على الوصول السريع إلى الخاصيات المتداخلة ، مع التضحية بأنه يجب علينا الآن التعامل مع جميع الكائنات المتداخلة على أنها غير قابلة للتغيير ، ولا يمكن تشغيل التحديثات إلا عن طريق استبدال حالة الجذر:

```js
const shallowArray = shallowRef([
  /* قائمة كبيرة من الكائنات العميقة */
])

// هذا لن يؤدي إلى التحديثات...
shallowArray.value.push(newObject)
// هذا يؤدي:
shallowArray.value = [...shallowArray.value, newObject]

// هذا لن يؤدي إلى التحديثات...
shallowArray.value[0].foo = 1
// هذا يؤدي:
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
```

### تجنب التجريدات الغير ضرورية للمكون {#avoid-unnecessary-component-abstractions}

في بعض الأحيان ، قد ننشئ [مكونات عديمة التصيير](/guide/components/slots#renderless-components) أو مكونات ذات ترتيب أعلى (أي مكونات تُصيّر مكونات أخرى مع خاصيات إضافية) من أجل تجريد أفضل أو تنظيم للشيفرة. على الرغم من عدم وجود خطأ في هذا الأمر ، ضع في اعتبارك أن نسخ المكون أكثر تكلفة بكثير من عناصر الـDOM العادية ، وأن إنشاء الكثير منها باتباع أنماط التجريد سينجر عنه تكاليف في الأداء.

تجدر الملاحظة أن حذف عدد قليل فقط من النسخ لن يكون له تأثير ملحوظ ، لذلك لا تقلق إذا صُيِّر المكون عدة مرات فقط في التطبيق. أفضل سيناريو للنظر في هذا التحسين هو مرة أخرى في القوائم الكبيرة. تخيل قائمة تضم 100 عنصر حيث يحتوي كل مكون عنصر على العديد من المكونات الأبناء. قد تؤدي إزالة أحد تجريدات المكون غير الضرورية هنا إلى تقليل المئات من نسخ المكون.
