# ربط التنسيقات و الأصناف {#class-and-style-bindings}

احتياج شائع لربط البيانات هو التحكم في قائمة الأصناف وتنسيقات العنصر. بما أن `class` و `style` عبارة عن سمتين، يمكننا استخدام `v-bind` لاعطائهما سلسلة نصية كقيمة بشكل ديناميكي، على غرار السمات الأخرى. ومع ذلك، يمكن أن يكون توليد هذه القيم عن طريق ربط سلاسل مزعجًا ومُحتملًا للأخطاء. لهذا السبب، توفر Vue تحسينات خاصة عند استخدام `v-bind` مع `class` و `style`. بالإضافة إلى السلاسل النصية، يمكن أن تُقيّم العبارات أيضًا إلى كائنات أو مصفوفات.

## ربط أصناف الـHTML {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

### الربط بالكائنات {#binding-to-objects}

يمكننا تمرير كائن إلى `:class` (الإختصار لـ `v-bind:class`) لتبديل الأصناف بشكل ديناميكي:

```vue-html
<div :class="{ active: isActive }"></div>
```

الصيغة أعلاه تعني أن وجود الصنف `active` سيتم تحديده بواسطة [صحة](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) الخاصية `isActive` من البيانات.

يمكن أن يكون لديك عدة أصناف تتبدل بواسطة وجود العديد من الخاصيات في الكائن. بالإضافة إلى ذلك، يمكن للسمة المربوطة `:class` أيضًا أن تكون موجودة بجانب السمة `class` العادية. لذا، بالنظر إلى الحالة التالية:

<div class="composition-api">

```js
const isActive = ref(true)
const hasError = ref(false)
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

</div>

و القالب الموالي:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

سيتم تصيير العنصر التالي:

```vue-html
<div class="static active"></div>
```

عند تغيير `isActive` أو `hasError`، سيتم تحديث قائمة الصنف بناءً على ذلك. على سبيل المثال، إذا أصبح `hasError` `true`، فسيصبح قائمة الصنف `"static active text-danger"`.

الكائن المربوط لا يحتاج أن يكون مُضمَّنا:

<div class="composition-api">

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

سيقوم هذا الربط بتصيير نفس النتيجة. يمكننا أيضًا الربط بخاصية [محسوبة](./computed) تعيد كائنًا. و هو نمط شائع وقوي:

<div class="composition-api">

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

### الربط بالمصفوفات {#binding-to-arrays}

يمكننا ربط `:class` بمصفوفة لتطبيق قائمة من الأصناف:

<div class="composition-api">

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

</div>

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

نتيجة التصيير : 

```vue-html
<div class="active text-danger"></div>
```

إذا كنت ترغب أيضًا في تبديل صنف في القائمة بشكل شرطي، يمكنك القيام بذلك باستخدام تعبير ثلاثي:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

هذا الربط سيطبق دائمًا `errorClass`، ولكن `activeClass` سيتم تطبيقه فقط عندما يكون `isActive` صحيحًا.

لكن قد يكون هذا طويلا نوعا ما إذا كان لديك أصناف شرطية متعددة. لهذا السبب، يمكنك أيضًا استخدام صيغة الكائن داخل صيغة المصفوفة :

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### مع المكونات {#with-components}

> هذا القسم يفترض أن لديك معرفة [بالمكونات](/guide/essentials/component-basics). لا تتردد في تخطيه والعودة إليه لاحقًا.

لما تستخدم السمة `class` على مكون يحتوي على عنصر جذري واحد فقط، سيضاف هذا الصنف إلى العنصر الجذري للمكون، وسيدمج مع أي صنف موجود عليه من قبل.

على سبيل المثال، إذا كان لدينا مكون يسمى `MyComponent` مع القالب التالي:

```vue-html
<!--  قالب المكون الابن -->
<p class="foo bar">مرحبا!</p>
```

ثم اضف بعض الأصناف عند استخدامه:

```vue-html
<!-- عند استخدام المكون -->
<MyComponent class="baz boo" />
```

الـHTML المصيّر سيكون بالشكل الموالي :

```vue-html
<p class="foo bar baz boo">مرحبا!</p>
```

نفس الشيء ينطبق على ربط الصنف:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

لما يكون `isActive` صحيحًا، سيكون الـHTML المصيّر بالشكل الموالي :

```vue-html
<p class="foo bar active">مرحبا!</p>
```

إذا كان لديك مكون يحتوي على عناصر جذرية متعددة، ستحتاج إلى تحديد أي عنصر سيتلقى هذا الصنف. يمكنك القيام بذلك باستخدام خاصية المكون `attrs$`:

```vue-html
<!-- قالب MyComponent باستخدام $attrs -->
<p :class="$attrs.class">مرحبا!</p>
<span>هذا هو المكون الابن</span>
```

```vue-html
<MyComponent class="baz" />
```

النتيجة المصيرة ستكون:

```html
<p class="baz">مرحبا!</p>
<span>هذا هو المكون الابن</span>
```

يمكنك معرفة المزيد عن توريث سمات المكون في قسم [السمات المستترة](/guide/components/attrs).

## ربط التنسيقات السطرية {#binding-inline-styles}

### الربط بالكائنات {#binding-to-objects-1}

`:style` يدعم ربط قيم كائنات JavaScript - يُوافق مع [خاصية `style` لعنصر HTML](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

<div class="composition-api">

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

</div>

```vue-html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

رغم أن الأسماء المكتوبة باستخدام نمط سنام الجمل camelCase موصى بها، إلا أن `style:` يدعم أيضًا أسماء الخاصيات CSS مكتوبة باستخدام نمط أسياخ الشواء kebab-case (وهي ما يستخدم في CSS الفعلي) - على سبيل المثال:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

غالبا ما يكون من الأفضل ربط كائن التنسيقات مباشرة حتى يكون محتوى القالب أنقى:

<div class="composition-api">

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

</div>

```vue-html
<div :style="styleObject"></div>
```

مرة أخرى، يتم استخدام ربط كائن التنسيقات عادةً مع خاصيات محسوبة تُعيد كائنات.

### الربط بالمصفوفات {#binding-to-arrays-1}

يمكننا ربط `:style` بمصفوفة من كائنات متعددة من التنسيقات . سيتم دمج هذه الكائنات وتطبيقها على نفس العنصر:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### البادئة التلقائية {#auto-prefixing}

لما تستخدم خاصية CSS والتي تتطلب [بادئة](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) في `:style`، ستُضِيف Vue البادئة المناسبة تلقائيًا. تقوم Vue بذلك من خلال التحقق في وقت التشغيل لمعرفة أي خاصيات النمط المدعومة في المتصفح الحالي. إذا لم يدعم المتصفح خاصية معينة سيختبر بعدها مختلف أنواع البادئات للحصول على أحد البادئات المدعومة.

### قيم متعددة {#multiple-values}

يمكنك امداد مصفوفة من القيم المتعددة (ذات بادئة) إلى خاصية التنسيق، على سبيل المثال:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

هذه الشيفرة ستصير القيمة الأخيرة فقط في المصفوفة التي يدعمها المتصفح. في هذا المثال، ستقوم بتصيير `display: flex` للمتصفحات التي تدعم نسخة بدون بادئة من flexbox.
