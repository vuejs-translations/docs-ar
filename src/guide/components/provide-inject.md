# تزويد / حقن {#provide-inject}

> لقراءة هذه الصفحة يجب عليك أولا الاطلاع على [أساسيات المُكونات](/guide/essentials/component-basics) . ثم العودة إلى هنا.

## التمرير العميق للخاصيات{#prop-drilling}

عادةً , عندما نحتاج إلي تمرير بيانات من المُكون الأب إلي المُكون الإبن . نستخدم [الخاصيات (Props)](/guide/components/props). لكن تخيل اننا لدينا شجرة كبيرة من المُكونات , و المُكون الحفيد يحتاج إلي بيانات من المُكون الجد الأعلي منه . بإستخدام الخاصيات (Props) فقط , سوف نتمكن من تمرير نفس الخاصية إلي سلسلة الآباء كاملةً لكي ننقلها من المُكون الجد إلي المُكون الحفيد

![مُخطط التمرير العميق للخاصيات](./images/prop-drilling.png)

<!-- https://www.figma.com/file/yNDTtReM2xVgjcGVRzChss/prop-drilling -->

لاحظ ان علي الرغم من ان المُكون `<Footer>` لا يحتاج هذه الخاصيات علي الإطلاق , ولكن لا يزال بحاجة إلي تعريفها و تمريرها حتي يتمكن المُكون `<DeepChild>` من الوصول إليها . إذا كان هناك سلسلة من الآباء أطول مُكونات اكثر سيتم تمرير الخاصيات إليها و هي ليس بحاجة لها . و هذا يسمي "التمرير العميق للخاصيات" وبالتأكيد ليس من الجيد فعله

يمكننا حل مشكلة التمرير العميق للخاصيات (Props Drilling) عن طريق إستخدام التزويد و الحقن `provide` و `inject` . ان يكون المُكون الأب هو **مُزود التبعية (dependency provider)** لكل المُكونات الأحفاد له . يمكن ان يتم حقن **inject** أي مُكون في شجرة الأحفاد و الأبناء بغض النظر عن مدي عمق هذا المُكون بالتباعيات المقدمة من المُكونات الأعلي (الآباء او الجدود) في هذه السلسلة

![مُخطط التزويد / الحقن](./images/provide-inject.png)

<!-- https://www.figma.com/file/PbTJ9oXis5KUawEOWdy2cE/provide-inject -->

## التزويد {#provide}

<div class="composition-api">

لكي نقوم بتوفير البيانات إلي المُكونات الأحفاد , نستخدم دالة [`()provide`](/api/composition-api-dependency-injection.html#provide)

```vue
<script setup>
import { provide } from 'vue'

provide(/* المفتاح */ 'message', /* القيمة */ 'hello!')
</script>
```

في حالة عدم إستخدام `<script setup>` , تأكد من إستدعاء دالة `()provide` بشكل متزامن (Synchronously) بداخل دالة `()setup`

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* المفتاح */ 'message', /* القيمة */ 'hello!')
  }
}
```

تقبل هذه الدالة `()provide` وسيطين . يمسي الوسيط الأول بمفتاح الحقن **injection key** , و الذي يمكن ان يكون في هيئة نصاً String أو رمزً `Symbol` . يتم إستخدام مفتاح الحقن بواسطة المُكونات الأحفاد للبحث عن القيمة المرغوب الوصول لها . كما يستطيع المُكون الأحادي ان يستدعي الدالة `()provide` عدة مرات لمفاتيح حقن مختلفة لتوفير قيم عديدة يمكن حقنها من قبل المُكونات الأحفاد

الوسيط الثاني هو القيمة المُقدمة . يمكن لهذه القيمة ان تكون من اي نوع , تشمل الحالة التفاعلية مثل refs

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

يسمح توفير القيم التفاعلية (Reactive Values) للمُكونات الأحفاد بإنشاء اتصال تفاعلي إلي المكون المُقدم للبيانات

</div>

<div class="options-api">

لكي تقوم بتزويد المُكونات الأحفاد بالبيانات , أستخدم خاصية [`provide`](/api/options-composition.html#provide)

```js
export default {
  provide: {
    message: 'hello!'
  }
}
```

كل خاصية في الكائن `provide` , يتم إستخدام المفتاح الخاص بها بواسطة المُكونات الأبناء أو الأحفاد وذالك لتحديد القيمة الصحيحة للحقن 

إذا كنا نريد تقديم بيانات علي مستوي النسخة (Instance) , علي سبيل المثال البيانات الموجودة في دالة `()data` , فيجب إستخدام `provide` علي هيئة دالة :

```js{7-12}
export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    // `this` عند استخدام صيغة الدالة يمكننا استخدام 
    return {
      message: this.message
    }
  }
}
```

ولكن , لاحظ ان هذا الشكل لا يجعل الحقن تفاعلياً . يتم مناقشة هذا أسفل [جعل الحقن تفاعلياً](#working-with-reactivity)

</div>

## التزويد علي مستوى التطبيق {#app-level-provide}

بالإضافة إلي تزويد البيانات إلي المُكونات , يمكن ايضاً تزويدها علي مستوي التطبيق:

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* المفتاح */ 'message', /* القيمة */ 'hello!')
```

التزويد علي مستوي التطبيق يكون متاح لجميع المُكونات التي تم عرضها (Rendered components) في التطبيق . هذا الشكل مفيد خاصةً في حالة إنشاء  [إضافات](/guide/reusability/plugins.html), لأن الإضافات عادةً لن تكون قادرة علي تزويد القيم بإستخدام المُكونات

## الحقن {#inject}

<div class="composition-api">

لكي نحقن البيانات التي يوفرها أحد مُكونات الأحفاد, نستخدم دالة  [`()inject`](/api/composition-api-dependency-injection.html#inject)

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

في حالة ان القيمة التي تم تزويدها هي قيمة تفاعلية (Ref) , سوف يتم حقنها كما هي و **لم** يتم تفكيكها تلقائياً . هذا يسمح للمكون الحاقن بالإحتفاظ بالإتصال التفاعلي بين المُكون Provider المزود 

[مثال كامل للتزويد + الحقن مع الحالة التفاعلية](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuLy8gYnkgcHJvdmlkaW5nIGEgcmVmLCB0aGUgR3JhbmRDaGlsZFxuLy8gY2FuIHJlYWN0IHRvIGNoYW5nZXMgaGFwcGVuaW5nIGhlcmUuXG5jb25zdCBtZXNzYWdlID0gcmVmKCdoZWxsbycpXG5wcm92aWRlKCdtZXNzYWdlJywgbWVzc2FnZSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiPlxuICA8Q2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNoaWxkLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgR3JhbmRDaGlsZCBmcm9tICcuL0dyYW5kQ2hpbGQudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5jb25zdCBtZXNzYWdlID0gaW5qZWN0KCdtZXNzYWdlJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPlxuICAgIE1lc3NhZ2UgdG8gZ3JhbmQgY2hpbGQ6IHt7IG1lc3NhZ2UgfX1cbiAgPC9wPlxuPC90ZW1wbGF0ZT4ifQ==)

مرة أخري , في حالة عدم استخدام `<script setup>` , يجب إستدعاء دالة `()inject` بشكل متزامن بداخل دالة `()setup`

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

</div>

<div class="options-api">

لكي نحقن البيانات المتوفرة بواسطة المُكونات الأحفاد, نستخدم خاصية [`inject`](/api/options-composition.html#inject)

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // القيمة التي تم حقنها
  }
}
```

ينفذ الحقن **قبل** الحالة الخاصة بالمُكون . لذالك يُمكن الوصول إلي الخواص التي تم حقنها دالخل دالة `()data`

```js
export default {
  inject: ['message'],
  data() {
    return {
      // القيمة الإبتدائية إعتماداُ علي القيمة التي تم حقنها
      fullMessage: this.message
    }
  }
}
```

[مثال كامل على التزويد + الحقن](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IENoaWxkIH0sXG4gIHByb3ZpZGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6ICdoZWxsbydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxDaGlsZCAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ2hpbGQudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBHcmFuZENoaWxkIGZyb20gJy4vR3JhbmRDaGlsZC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEdyYW5kQ2hpbGRcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmplY3Q6IFsnbWVzc2FnZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBNZXNzYWdlIHRvIGdyYW5kIGNoaWxkOiB7eyBtZXNzYWdlIH19XG4gIDwvcD5cbjwvdGVtcGxhdGU+In0=)

### الاسماء المميزة للحقن \* {#injection-aliasing}

في حالة استخدام هيئة المصفوفة لكلمة `inject` , تكون الخاصيات المُحقنة مُعرضة لإستخدام نفس المفتاح الموجودة في نسخة المُكون (Component Instance) . في المثال السابق , تم تقديم الخاصية بمفتاح يسمي `"message"` , و تم حقنها ك `this.message` . المفتاح المحلي هو نفسه مفتاح الحقن .

إذا كنا نريد ان نحقن هذه الخاصية بإستخدام اسم مفتاح مختلف , نحتاج في هذه الحالة إلي إستخدام هيئة الكائن للخاصية `inject`:

```js
export default {
  inject: {
    /* المفتاح المحلي */ localMessage: {
      from: /* مفتاح الحقن */ 'message'
    }
  }
}
```

هنا, سوف يتعرف المُكون علي خاصية مُقدمة بمفتاح يُسمي  `"message"` , ثم استدعاؤه بإسم `this.localMessage`.

</div>

### القيم الإفتراضية للحقن {#injection-default-values}

بشكل أفتراضي , يفترض `inject` ان المفتاح المحقون تم تزويده في مكانً ما في سلسلة الاَباء . لذالك في حالة عدم تزويده سيتم إظهار رسالة تحذير وقت التشغيل

في حالة اننا نريد ان نجعل خاصية الحقن تعمل بشكل اختياري في حالة تم تزويدها أو لا . يجب تعريف قيمة إبتدائية مثل التي في الخاصيات (Props):

<div class="composition-api">

```js
// 'default value' سوف تكون قيمتها `value`
// "message" في حالة عدم تزويد خاصية بإسم 
const value = inject('message', 'default value')
```

في بعض الحالات , نريد إنشاء القيمة الإبتدائية من خلال إستدعاء دالة أو إستنساخ من كلاس جديد . لتجنب الحسابات الغير ضرورية أو الأثار الجانبية في حالة عدم استخدام القيمة الإختيارية . يمكن ان نستخدم دالة المصنع (Factory Function) لإنشاء القيمة الإبتدائية: 

```js
const value = inject('key', () => new ExpensiveClass())
```

</div>

<div class="options-api">

```js
export default {
  // (inject object) هيئة الكائن مطلوبة
  // عند تعريف قيم إفتراضية للحقن
  inject: {
    message: {
      from: 'message', //  اختياري في حالة استخدام نفس اسم مفتاح الحقن
      default: 'default value'
    },
    user: {
      // (non-primitive values) استخدم دالة المصنع للقيم الغير بدائية 
      // لإنشاء , أو التي يجب ان تكون غير متكررة لكل نسخة مُكون
      default: () => ({ name: 'John' })
    }
  }
}
```

</div>

##  استخدام الصيغ التفاعلية {#working-with-reactivity}

<div class="composition-api">

عند إستخدام قيم تزويد / حقن تفاعلية, **من الأفضل الإحتفاظ بأي طفرات (Mutations) في الحالات التفاعلية داخل مُزود _provider_ كلما كان ممكناً**

هناك العديد من الاوقات نريد تعديل البيانات من المُكون الحاقن (injector component) . في بعض الأحيان , من الأفضل إضافة دالة مسؤولة عن تغيير الحالة

```vue{7-9,13}
<!-- داخل مُكون التزويد-->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue{5}
<!-- داخل مُكون الحقن -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

أخيراً , يمكن ان نُغلف القيم المُزودة بدالة [`()readonly`](/api/reactivity-core.html#readonly) إذا كنا نريد ضمان عدم تغيير البيانات المارة عبر `provide` لا يمكن تعديلها بواسطة مُكون الحقن

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

</div>

<div class="options-api">

من أجل جعل الحقن مرتبط مع المُكون المُزود بشكل تفاعلي , نحتاج إلي تزويد خاصية محسوبة (computed) بإستخدام دالة [()computed](/api/reactivity-core.html#computed)

```js{10}
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // بشكل مباشر (computed property) تزويد خاصية محسوبة  
      message: computed(() => this.message)
    }
  }
}
```

[مثال كامل عن تزويد / حقن مع الحالة التفاعلية](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQ2hpbGQgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJ2hlbGxvJ1xuICAgIH1cbiAgfSxcbiAgcHJvdmlkZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogY29tcHV0ZWQoKCkgPT4gdGhpcy5tZXNzYWdlKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGlucHV0IHYtbW9kZWw9XCJtZXNzYWdlXCI+XG4gIDxDaGlsZCAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ2hpbGQudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBHcmFuZENoaWxkIGZyb20gJy4vR3JhbmRDaGlsZC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEdyYW5kQ2hpbGRcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmplY3Q6IFsnbWVzc2FnZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBNZXNzYWdlIHRvIGdyYW5kIGNoaWxkOiB7eyBtZXNzYWdlIH19XG4gIDwvcD5cbjwvdGVtcGxhdGU+In0=)

تستحدم دالة `()computed` عادةً في مُكونات الواجهة التركيبية (Composition Api Components) , ولكن ممكن ايضا لإستكمال حالات إستخدام معينة في واجهات الخيارات (Options Api) . يمكنك معرفة المزيد حول استخدامه من خلال قراءة [أساسيات التفاعلية](/guide/essentials/reactivity-fundamentals.html) و [الخواص المحسوبة](/guide/essentials/computed.html) مع أفضلية للواجهة التركيبية 

:::warning الإعدادات المؤقتة مطلوبة
يتطلب المثال السابق ضبط إعداد `app.config.unwrapInjectedRef = true` لجعل عملية الحقن تقوم بفض الحسبة التفاعلية (unwrap computed refs) بشكل تلقائي. هذا سوف يكون الشكل الإفتراضي في Vue 3.3 و هذا الحل تم تقديمه بشكل مؤقت لتجنب أي خلل . سوف يكون غير مطلوب في النسخ الي ستقدم بعد 3.3
:::

</div>

##  استخدام المفاتيح الرموز Symbols Keys {#working-with-symbol-keys}

حتي الأن , لقد قمنا بإستخدام مفاتيح الحقن النصية في الأمثلة السابقة . إذا كنت تعمل علي تطبيق كبير مع العديد من مُزودي التباعية (dependency providers) , أو انت مسؤول عن مُكونات سيتم إستخدامها من قبل مُطورين أخرين , من الأفضل إستخدام مفاتيح الحقن الرموز (Symbol injection keys) لتجنب الصدامات المحتملة

من الأفضل إستخراج الرموز من ملف مخصوص لها:

```js
// keys.js
export const myInjectionKey = Symbol()
```

<div class="composition-api">

```js
// في مُكون التزويد
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* البيانات المُراد تزويدها */
})
```

```js
// في مُكون الحقن
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

شاهد أيضاً: [الأنواع للتزويد / الحقن](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />

</div>

<div class="options-api">

```js
// في مُكون التزويد
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
         /* البيانات المُراد تزويدها */
      }
    }
  }
}
```

```js
// في مُكون الحقن
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

</div>
