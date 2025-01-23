# TypeScript مع واجهات الخيارات {#typescript-with-options-api}

> لقراءة هذه الصفحة يجب عليك أولا الاطلاع على  [استخدام Vue مع TypeScript](./overview).

:::tip ملاحظة
على الرغم من أن Vue تدعم استخدام TypeScript مع واجهات الخيارات ، إلا أنه يفضل استخدام Vue مع TypeScript عبر الواجهة التركيبية لأنه تقدم استنباط أكثر بساطة وفعالية وأكثر صلابة للأنواع.
:::

## تحديد النوع للخاصيات {#typing-component-props}

استنباط النوع للخاصيات في واجهة الخيارات يتطلب تغليف المكون بالدالة `()defineComponent`. بالاعتماد على ذلك، يمكن لـ Vue استنباط أنواع الخاصيات بناءً على خيار `props` ، وذلك بالاعتماد على خيارات إضافية مثل `required: true` و `default`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  //  تمكين استنباط النوع
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // type: string | undefined
    this.id // type: number | string | undefined
    this.msg // type: string
    this.metadata // type: any
  }
})
```

ومع ذلك ، لا تدعم خيارات `props` الوقت التشغيلي استخدام دوال المنشئات كنوع خاصية - لا توجد طريقة لتحديد أنواع معقدة مثل الكائنات مع الخاصيات المتداخلة أو توقيعات استدعاء الدوال.

لتوصيف أنواع خاصيات معقدة ، يمكننا استخدام نوع `PropType`:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // توفير نوع أكثر تحديدًا لـ `Object`
      type: Object as PropType<Book>,
      required: true
    },
    // يمكنك أيضًا توصيف الدوال
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    //  خطأ TS: لا يمكن تعيين نوع الوسيط 
    // 'string' إلى نوع الوسيط 'number'
    this.callback?.('123')
  }
})
```

### تنبيهات {#caveats}

إذا كان إصدار TypeScript الخاص بك أقل من `4.7` ، فيجب عليك الانتباه عند استخدام قيم الدوال لخيارات خاصية `validator` و `default` - تأكد من استخدام الدوال السهمية:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // تأكد من استخدام الدوال السهمية إذا كان إصدار TypeScript الخاص بك أقل من 4.7
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

هذا يمنع TypeScript من تحديد نوع `this` داخل هذه الدوال ، وللأسف ، يمكن أن يؤدي ذلك إلى فشل استنباط النوع. كانت [قيود التصميم](https://github.com/microsoft/TypeScript/issues/38845) سابقة, والآن قد حسنت في الإصدار [TypeScript 4.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#improved-function-inference-in-objects-and-methods).

## تحديد النوع للإرسالات {#typing-component-emits}

يمكننا تعريف نوع بيانات الحمولة المتوقع للحدث المرسل باستخدام صيغة الكائن لخيار `emits`. كما يمكن أن ترسل جميع الأحداث غير المعرفة بالإعلان عن خطأ في النوع عند الاستدعاء:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // تنفيذ التحقق من الصحة في الوقت التشغيلي
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // خطأ في النوع
      })

      this.$emit('non-declared-event')// خطأ في النوع
    }
  }
})
```

## تحديد النوع للخاصيات المحسوبة {#typing-computed-properties}

تحدد الخاصية المحسوبة نوعها بناءً على قيمة الإرجاع:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // type: string
  }
})
```

في بعض الحالات ، قد ترغب في توصيف نوع خاصية محسوبة بشكل صريح لضمان صحة تنفيذها:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // توصيف نوع الإرجاع بشكل صريح
    greeting(): string {
      return this.message + '!'
    },

    // توصيف خاصية محسوبة قابلة للكتابة
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

قد تكون التوصيفات الصريحة مطلوبة أيضًا في بعض الحالات الحدودية التي يفشل TypeScript في تحديد نوع خاصية محسوبة بسبب حلقات استنباط دائرية.

## تحديد النوع لمعالجات الأحداث {#typing-event-handlers}

عند التعامل مع أحداث DOM الأصلية ، قد يكون من المفيد تحديد النوع الصحيح للوسيط الذي نمرره إليه. دعونا نلقي نظرة على هذا المثال:

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // الوسيط `event` يحتوي على نوع `any` بشكل ضمني
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

بدون توصيف النوع ، سيكون الوسيط `event` ضمنيًا بنوع `any`. سيؤدي هذا أيضًا إلى خطأ TS إذا كان `"strict": true` أو `"noImplicitAny": true` يتم استخدامهما في `tsconfig.json`. لذلك ، يُوصى بتوصيف الوسيط الوارد من معالجات الأحداث بشكل صريح. بالإضافة إلى ذلك ، قد تحتاج إلى تحويل صريح للخاصيات على `event`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```

## توسيع الخاصيات العامة {#augmenting-global-properties}

بعض الملحقات تثبت خاصيات متاحة على المستوى العام لجميع نسخ المكونات عبر [`app.config.globalProperties`](/api/application#app-config-globalproperties). على سبيل المثال ، قد نثبت `this.$http` لجلب البيانات أو `this.$translate` للترجمة التوطينية. لجعل هذا يعمل بشكل جيد مع TypeScript ، يوفر Vue واجهة `ComponentCustomProperties` المصممة للتوسيع عبر [توسيع وحدة TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation):

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

اطلع أيضا على

- [ اختبار  الوحدات لـTypeScript لامتدادات أنواع المكونات](https://github.com/vuejs/core/blob/main/packages-private/dts-test/componentTypeExtensions.test-d.tsx)

### موضع توسيع النوع {#type-augmentation-placement}

يمكننا وضع توسيع النوع في ملف `ts.` ، أو في ملف `d.ts.*` على مستوى المشروع. بأي طريقة من الطرق ، تأكد من تضمينه في `tsconfig.json`. لمؤلفي  الملحقات / المكتبات ، يجب تحديد هذا الملف في خاصية `types` في `package.json`.

للاستفادة من توسيع الوحدة ، ستحتاج إلى التأكد من وضع التوسيع في [وحدة TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html). أي أن الملف يحتاج إلى أن يحتوي على `import` أو `export` على المستوى الأعلى واحد على الأقل ، حتى لو كان مجرد `export {}`. إذا وُضع التوسيع خارج الوحدة، فسيقوم بالكتابة فوق أصل الأنواع بدلاً من توسيعها!

```ts
// لا يعمل ، يكتب فوق أصل الأنواع.
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

```ts
// يعمل بشكل صحيح
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

## توسيع الخيارات المخصصة {#augmenting-custom-options}

بعض الملحقات ، على سبيل المثال `vue-router` ، توفر دعم خيارات المكونات المخصصة مثل `beforeRouteEnter`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // ...
  }
})
```

بدون توسيع نوع صحيح ، ستكون وسائط هذا الخطاف ذات نوع `any` بشكل ضمني. يمكننا توسيع واجهة `ComponentCustomOptions` لدعم هذه الخيارات المخصصة:

```ts
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: Route, from: Route, next: () => void): void
  }
}
```

الآن سيكون خيار `beforeRouteEnter` محدد النوع بشكل صحيح. لاحظ أن هذا مجرد مثال - يجب أن تقوم المكتبات محددة الأنواع بشكل جيد مثل `vue-router` بتنفيذ هذه التوسيعات بشكل تلقائي في تعريفات أنواعها الخاصة.

موضع هذا التوسيع يعتمد على [نفس القيود](#type-augmentation-placement) مثل توسيع الخاصيات العامة.

اطلع أيضا على

- [ اختبار  الوحدات لـTypeScript لامتدادات أنواع المكونات](https://github.com/vuejs/core/blob/main/packages-private/dts-test/componentTypeExtensions.test-d.tsx)
