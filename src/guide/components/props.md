# الخاصيات {#props}

> لقراءة هذه الصفحة يجب عليك أولا الاطلاع على [أساسيات المكونات](/guide/essentials/component-basics). ثم العودة إلى هنا.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="درس Vue.js مجاني حول الخاصيات"/>
</div>

## التصريح بالخاصيات {#props-declaration}

المكونات في Vue تتطلب التصريح الواضح بخاصياتها لكي تعرف Vue أيُّ خاصيات خارجية ممررة إلى المكون يجب أن تُعامل كسمات مستترة (التي ستُناقش في [قسمها المخصص](/guide/components/attrs)).

<div class="composition-api">

في المكونات أحادية الملف التي تستخدم `<script setup>`، يمكن التصريح بالخاصيات باستخدام التعليمة العامة `defineProps()`:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

في المكونات التي لا تستعمل `<script setup>` ، يمكن التصريح بالخاصيات باستخدام خيار [`props`](/api/options-state#props):

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() تتلقى الخاصيات كأول وسيط
    console.log(props.foo)
  }
}
```

تجدر الملاحظة أن الوسيط المرسل إلى `()defineProps` هو نفس القيمة المقدمة لخيار `props`: نفس واجهة الخيارات للخاصيات مشتركة بين الأسلوبين.

</div>

<div class="options-api">

الخاصيات يُصرّح بها باستخدام خيار [`props`](/api/options-state#props):

```js
export default {
  props: ['foo'],
  created() {
    // الخاصيات معروضة على `this`
    console.log(this.foo)
  }
}
```

</div>

بالإضافة إلى التصريح بالخاصيات باستخدام مصفوفة من السلاسل النصية، يمكننا أيضا استخدام الصيغة الكائنية:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// في <script setup>
defineProps({
  title: String,
  likes: Number
})
```

```js
// في الملفات التي لا تستخدم <script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

في كل خاصية في صيغة التصريح الكائنية، يكون المفتاح هو اسم الخاصية، بينما يجب أن تكون القيمة دالة بانية للنوع المتوقع.

هذا لا يعني فقط توثيق مكونك، بل سيُحذر المطورين الآخرين الذين يستخدمون مكونك داخل وحدة التحكم للمتصفح في حال تم تمرير قيمة ذات نوع خاطئ. سنتحدث بتفصيل أكثر عن [التحقق من صحة الخاصيات](#prop-validation) في وقت لاحق داخل هذه الصفحة.

<div class="options-api">

اطلع أيضا على : [إضافة الأنواع للمكونات](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

إذا كنت تستخدم TypeScript مع `<script setup>`، فمن الممكن أيضا التصريح بالخاصيات باستخدام توصيفات النوع البحت:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

تفاصيل أكثر عن: [إضافة الأنواع للمكونات](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

## Reactive Props Destructure <sup class="vt-badge" data-text="3.5+" /> \*\* {#reactive-props-destructure}

Vue's reactivity system tracks state usage based on property access. E.g. when you access `props.foo` in a computed getter or a watcher, the `foo` prop gets tracked as a dependency.

So, given the following code:

```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // runs only once before 3.5
  // re-runs when the "foo" prop changes in 3.5+
  console.log(foo)
})
```

In version 3.4 and below, `foo` is an actual constant and will never change. In version 3.5 and above, Vue's compiler automatically prepends `props.` when code in the same `<script setup>` block accesses variables destructured from `defineProps`. Therefore the code above becomes equivalent to the following:

```js {5}
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` transformed to `props.foo` by the compiler
  console.log(props.foo)
})
```

In addition, you can use JavaScript's native default value syntax to declare default values for the props. This is particularly useful when using the type-based props declaration:

```ts
const { foo = 'hello' } = defineProps<{ foo?: string }>()
```

If you prefer to have more visual distinction between destructured props and normal variables in your IDE, Vue's VSCode extension provides a setting to enable inlay-hints for destructured props.

### Passing Destructured Props into Functions {#passing-destructured-props-into-functions}

When we pass a destructured prop into a function, e.g.:

```js
const { foo } = defineProps(['foo'])

watch(foo, /* ... */)
```

This will not work as expected because it is equivalent to `watch(props.foo, ...)` - we are passing a value instead of a reactive data source to `watch`. In fact, Vue's compiler will catch such cases and throw a warning.

Similar to how we can watch a normal prop with `watch(() => props.foo, ...)`, we can watch a destructured prop also by wrapping it in a getter:

```js
watch(() => foo, /* ... */)
```

In addition, this is the recommended approach when we need to pass a destructured prop into an external function while retaining reactivity:

```js
useComposable(() => foo)
```

The external function can call the getter (or normalize it with [toValue](/api/reactivity-utilities.html#tovalue)) when it needs to track changes of the provided prop, e.g. in a computed or watcher getter.

</div>

  ## تفاصيل تمرير الخاصيات {#prop-passing-details}

### طريقة تسمية الخاصية {#prop-name-casing}

نصرح بأسماء الخاصيات الطويلة باستخدام نمط سنام الجمل camelCase لتجنب استخدام علامات التنصيص عند استخدامها كمفاتيح الخاصية، ويسمح لنا بإيرادها مباشرة في تعبيرات القالب لأنها مُعرِّفات JavaScript صالحة:

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

تقنيا، يمكنك أيضا استخدام camelCase عند تمرير الخاصيات إلى مكون ابن (باستثناء [قوالب DOM](/guide/essentials/component-basics#dom-template-parsing-caveats)). ومع ذلك، فإن المصطلح عليه هو استخدام kebab-case في جميع الحالات لتتوافق مع نمط كتابة سمات HTML:

```vue-html
<MyComponent greeting-message="مرحبا" />
```

نستخدم [نمط باسكال PascalCase لوسوم المكونات](/guide/components/registration#component-name-casing) عند الإمكان لأنه يحسن قابلية القراءة للقوالب بتمييز مكونات Vue من العناصر الأصلية. ومع ذلك، لا يوجد فائدة عملية كبيرة في استخدام نمط سنام الجمل camelCase عند تمرير الخاصيات، لذا نختار أن نتبع اصطلاحات كل لغة.

### الخصائص الثابتة والمتغيرة {#static-vs-dynamic-props}

إلى حد الآن، لقد رأيت خاصيات مُمرَّرة كقيم ثابتة، مثل :

```vue-html
<BlogPost title="My journey with Vue" />
```

كما رأيت أيضا خاصيات مُعيَّنة بشكل ديناميكي باستخدام `v-bind` أو اختصارها `:`، مثل :

```vue-html
<!-- تعيين القيمة ديناميكيا من متغير -->
<BlogPost :title="post.title" />

<!-- تعيين القيمة ديناميكيا من تعبير معقد -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### تمرير أنواع مختلفة من القيم {#passing-different-value-types}

في المثالين أعلاه، مررنا قيم نصية، ولكن يمكن تمرير _أي_ نوع من القيم إلى الخاصية.

#### الأرقام {#number}

```vue-html
<!-- على الرغم من أن `42` ثابت، فإننا نحتاج إلى  v-bind  لإخبار  Vue
  بأن  هذا تعبير  JavaScript  بدلاً من سلسلة نصية. -->
<BlogPost :likes="42" />

<!-- تعيين القيمة ديناميكيا من متغير -->
<BlogPost :likes="post.likes" />
```

#### القيم المنطقية {#boolean}

```vue-html
<!--  تضمين الخاصية بدون قيمة سيعني أن أنها
`true`. -->
<BlogPost is-published />
<!-- على الرغم من أن `42` ثابت، فإننا نحتاج إلى  v-bind  لإخبار  Vue
  بأن  هذا تعبير  JavaScript  بدلاً من سلسلة نصية. -->
<BlogPost :is-published="false" />

<!-- تعيين القيمة ديناميكيا من متغير -->
<BlogPost :is-published="post.isPublished" />
```

#### المصفوفات {#array}

```vue-html
<!-- على الرغم من أن `42` ثابت، فإننا نحتاج إلى  v-bind  لإخبار  Vue
  بأن  هذا تعبير  JavaScript  بدلاً من سلسلة نصية. -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- تعيين القيمة ديناميكيا من متغير -->
<BlogPost :comment-ids="post.commentIds" />
```

#### الكائنات {#object}

```vue-html
<!-- على الرغم من أن `42` ثابت، فإننا نحتاج إلى  v-bind  لإخبار  Vue
  بأن  هذا تعبير  JavaScript  بدلاً من سلسلة نصية. -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- تعيين القيمة ديناميكيا من متغير -->
<BlogPost :author="post.author" />
```

### ربط عدة خصائص باستخدام كائن {#binding-multiple-properties-using-an-object}

إذا كنت تريد تمرير جميع حقول الكائن كخاصيات مكون، يمكنك استخدام [`v-bind` بدون وسيط](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) (`v-bind` بدلاً من `prop-name:`). على سبيل المثال، لنعتبر الكائن `post` كما يلي:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'رحلتي مع Vue'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'رحلتي مع Vue'
}
```

</div>
 
 القالب الموالي:

```vue-html
<BlogPost v-bind="post" />
```

سيتم تمرير كل الخصائص الموجودة في الكائن `post` كخصائص للمكون `BlogPost`. لذا، سيكون الناتج مثل الشيفرة التالية:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## تدفق البيانات في اتجاه واحد {#one-way-data-flow}

كل الخاصيات تشكل **ربطاً من الأعلى للأسفل** بين الخاصية البنت والأم: عند تحديث الخاصية الأم، ستتدفق إلى الخاصية البنت، ولكن ليس بالعكس. هذا يمنع المكونات الابن من تغيير الحالة الأم بصورة عَرَضية، و الذي يمكن أن يجعل تدفق بيانات تطبيقك صعب الفهم.

بالإضافة إلى ذلك، سيتم تحديث كل الخاصيات في المكون الابن مع أحدث قيمة، وهذا يعني أنه **لا ينبغي** محاولة تغيير الخاصية داخل المكون الابن. إذا قمت بذلك، ستحذرك Vue في وحدة التحكم:

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ تحذير، الخاصيات قابلة للقراءة فقط!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ تحذير، الخاصيات قابلة للقراءة فقط!
    this.foo = 'bar'
  }
}
```

</div>

يوجد عادة حالتان بحيث تشجعان على تغيير الخاصية:

1. **الخاصية تستخدم لتمرير قيمة أولية؛ والمكون الابن يريد استخدامها كخاصية بيانات محلية بعد ذلك.** في هذه الحالة، فإنه من الأفضل تعريف خاصية بيانات محلية تستخدم الخاصية كقيمتها الأولية:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // counter يستخدم props.initialCounter
   // كقيمة أولية فقط؛ وهو مفصول عن تحديثات الخاصية المستقبلية.
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
           // counter يستخدم props.initialCounter
          // كقيمة أولية فقط؛ وهو مفصول عن تحديثات الخاصية المستقبلية.
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **الخاصية تمرر كقيمة خام تحتاج إلى تحويل.** في هذه الحالة، فإنه من الأفضل تعريف خاصية محسوبة باستخدام قيمة الخاصية:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // خاصية محسوبة تُحدث تلقائيًا عند تغيير الخاصية
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // خاصية محسوبة تُحدث تلقائيًا عند تغيير الخاصية
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### تغيير خاصيات الكائن / المصفوفة {#mutating-object-array-props}

عندما تُمرر الكائنات والمصفوفات كخاصيات، فإن المكون الابن لن يتمكن من تغيير ربط الخاصية، ولكن **سيتمكن** من تغيير خصائص الكائن أو المصفوفة المتداخلة. هذا لأنه في JavaScript يتم تمرير الكائنات والمصفوفات بالمرجع و ليس بالقيمة، و هو أمر مكلف تقنيا على Vue لمنع مثل هذه التغييرات.

العيب الرئيسي لهذه التغييرات هو أنه يسمح للمكون الابن بتأثير على الحالة الأم بطريقة لا تكون واضحة للمكون الأب، وهذا قد يجعل من الصعب تحديد تدفق البيانات في المستقبل. كأفضل ممارسة، يجب عليك تجنب هذه التغييرات إلا إذا كان الأب والابن مرتبطين بشكل جيد من البداية. في معظم الحالات، يجب أن يقوم الابن بإرسال [حدث](/guide/components/events) للسماح للمكون الأب بإجراء التغيير.

## التحقق من صحة الخاصية {#prop-validation}

المكونات يمكنها تحديد متطلبات لخاصياتها، مثل الأنواع التي تناولنا موضوعها من قبل. إذا لم يُلبى المتطلب، فستقوم Vue بتحذيرك في وحدة التحكم للمتصفح. هذا الأمر مفيد بشكل خاص عند تطوير مكون يتم تخصيصه للاستخدام من قبل الآخرين.

لتحديد متطلبات التحقق من صحة الخاصية، يمكنك إضافة كائن مع متطلبات التحقق إلى <span class="composition-api">التعليمة العامة `()defineProps` </span><span class="options-api">خيار `props`</span>، بدلاً من مصفوفة السلاسل النصية. على سبيل المثال:

<div class="composition-api">

```js
defineProps({
  // التحقق من النوع الأساسي  (ستسمح القيم
  // `null` و `undefined` بأي نوع)
  propA: Number,
  // أنواع متعددة ممكنة
  propB: [String, Number],
  // سلسلة نصية مطلوبة
  propC: {
    type: String,
    required: true
  },
  // Required but nullable string
  propD: {
    type: [String, null],
    required: true
  },
  // Number with a default value
  propE: {
    type: Number,
    default: 100
  },
  // Object with a default value
  propF: {
    type: Object,
    // يجب أن تُعيد القيم الافتراضية للكائن أو المصفوفة من دالة مصنعة.
    // تتلقى الدالة الخاصة بالخاصية الخام 
    // التي تم استلامها من قبل المكون كوسيط.
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  // full props passed as 2nd argument in 3.4+
  propG: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  propH: {
    type: Function,
    // Unlike object or array default, this is not a factory
    // function - this is a function to serve as a default value
    default() {
      return 'الدالة الافتراضية'
    }
  }
})
```

:::tip ملاحظة
لا يمكن للشيفرة داخل وسيط `()defineProps` **الوصول إلى المتغيرات الأخرى المعرفة في `<script setup>`**، لأن العبارة كاملة تُنقل إلى نطاق دالة خارجية عند التصريف.
:::

</div>
<div class="options-api">

```js
export default {
  props: {
  // التحقق من النوع الأساسي  (ستسمح القيم
  // `null` و `undefined` بأي نوع)
    propA: Number,
    // أنواع متعددة ممكنة
    propB: [String, Number],
    // سلسلة نصية مطلوبة
    propC: {
      type: String,
      required: true
    },
    // Required but nullable string
    propD: {
      type: [String, null],
      required: true
    },
    // Number with a default value
    propE: {
      type: Number,
      default: 100
    },
    // Object with a default value
    propF: {
      type: Object,
      // يجب أن تُعيد القيم الافتراضية للكائن أو المصفوفة من دالة مصنعة.
      // تتلقى الدالة الخاصة بالخاصية الخام 
      // التي تم استلامها من قبل المكون كوسيط.
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // Custom validator function
    // full props passed as 2nd argument in 3.4+
    propG: {
      validator(value, props) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // Function with a default value
    propH: {
      type: Function,
      // Unlike object or array default, this is not a factory
      // function - this is a function to serve as a default value
      default() {
        return 'الدالة الافتراضية'
      }
    }
  }
}
```

</div>

تفاصيل إضافية:

- كل الخاصيات اختيارية افتراضيًا، ما لم يتم تحديد `required: true`.

- الخاصية الاختيارية الغائبة إن لم تكن ذات قيمة منطقية `Boolean` ستكون بقيمة `undefined`.

- ستُحوّل الخاصيات المنطقية  `Boolean`  الغائبة إلى `false` . يمكنك تغيير ذلك عن طريق تعيين قيمة افتراضية لها (`default`)  - أي: `default: undefined` للتصرف كخاصية غير منطقية .

- إذا حُددت القيمة الافتراضية `default`، ستُستخدم إذا كانت القيمة المعطاة للخاصية هي`undefined` - وهذا يتضمن الحالتين عندما تكون الخاصية غير موجودة أو تم تمرير قيمة `undefined` بشكل صريح.

  عند فشل التحقق من صحة الخاصية، ستُنتج Vue تحذيرًا في وحدة التحكم (إذا كنت تستخدم الإصدار التطويري).

<div class="composition-api">

إذا كنت تستخدم [الخاصيات المصرحة استنادا على النوع](/api/sfc-script-setup#typescript-only-features) <sup class="vt-badge ts" />, ستحاول Vue أن تصرف توصيفات النوع إلى تصريحات بالخاصيات وقت التشغيل. على سبيل المثال، ستُصرف `<defineProps<{ msg: string }` إلى `{ msg: { type: String, required: true }}`.

</div>
<div class="options-api">

::: tip Note
Note that props are validated **before** a component instance is created, so instance properties (e.g. `data`, `computed`, etc.) will not be available inside `default` or `validator` functions.
:::

</div>

### التحقق من النوع في وقت التشغيل {#runtime-type-checks}

يمكن أن يكون النوع (`type`) واحدًا من الدوال البانية الأصلية التالية:

- `String` (`سلسلة نصية`)
- `Number` (`رقم`)
- `Boolean` (`منطقي`)
- `Array` (`مصفوفة`)
- `Object` (`كائن`)
- `Date` (`تاريخ`)
- `Function` (`دالة`)
- `Symbol` (`رمز`)
- `Error` (`خطأ`)

بالإضافة إلى ذلك ، يمكن أن يكون `type` أيضًا صنفًا مخصصًا أو دالة بانية وسيُجرى التحقق من النوع باستخدام `instanceof` . على سبيل المثال ،ليكن الصنف التالي:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

الذي يمكنك استخدامه كنوع للخاصية:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

ستستخدم Vue الشيفرة  `instanceof Person` للتحقق من صحة القيمة الموجودة في خاصية `author` هل هي نسخة من الصنف `Person` أم لا.

### Nullable Type {#nullable-type}

If the type is required but nullable, you can use the array syntax that includes `null`:

<div class="composition-api">

```js
defineProps({
  id: {
    type: [String, null],
    required: true
  }
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    id: {
      type: [String, null],
      required: true
    }
  }
}
```

</div>

Note that if `type` is just `null` without using the array syntax, it will allow any type.

## تحويل القيم المنطقية {#boolean-casting}

الخاصيات من نوع `Boolean` لها قواعد تحويل خاصة لتتماشى مع سلوك السمات المنطقية الأصلية. ليكن المكون `<MyComponent>` بالتصريح التالي:

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

يمكن استخدام المكون بالشكل التالي:

```vue-html
<!-- ما يعادل :disabled="true" -->
<MyComponent disabled />

<!-- ما يعادل :disabled="false" -->
<MyComponent />
```

عندما يصرح بخاصية ما للسماح بتمرير أنواع متعددة، على سبيل المثال

<div class="composition-api">

```js
// disabled ستحول إلى true
defineProps({
  disabled: [Boolean, Number]
})
  
// disabled ستحول إلى true
defineProps({
  disabled: [Boolean, String]
})
  
// disabled ستحول إلى true
defineProps({
  disabled: [Number, Boolean]
})
  
// disabled ستحول إلى سلسلة نصية فارغة (disabled="")
defineProps({
  disabled: [String, Boolean]
})
```

</div>
<div class="options-api">

```js
// disabled ستحول إلى true
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
  
// disabled ستحول إلى true
export default {
  props: {
    disabled: [Boolean, String]
  }
}
  
// disabled ستحول إلى true
export default {
  props: {
    disabled: [Number, Boolean]
  }
}
  
// disabled ستحول إلى سلسلة نصية فارغة (disabled="")
export default {
  props: {
    disabled: [String, Boolean]
  }
}
```

</div>

ستُطبق قواعد التحويل للخاصيات ذات  النوع المنطقي `Boolean` بغض النظر عن ترتيب ظهور النوع.
