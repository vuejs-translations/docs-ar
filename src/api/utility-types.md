# الأنواع المساعدة (Typescript) {#utility-types}

:::info 
هذه الصفحة تعرض فقط بعض الأنواع المساعدة المستخدمة بشكل شائع والتي قد تحتاج إلى شرح لاستخدامها. للحصول على قائمة كاملة بالأنواع المصدرة، استشر [الشيفرة المصدرية](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131).
:::

## <PropType\<T {#proptype-t}

يستخدم لتوصيف الخاصية بأنواع أكثر تقدما عند استخدام تصريحات الخاصيات في وقت التشغيل.

- **مثال**

  ```ts
  import type { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // توفير نوع أكثر تحديدا لـ `Object`
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **اطلع أيضا على** [دليل - إضافة الأنواع لخاصيات المكون](/guide/typescript/options-api#typing-component-props)

## <MaybeRef\<T {#mayberef}

اسم بديل لـ `T | Ref<T>`. مفيد لتوصيف الوسائط لـ [الدوال التركيبية](/guide/reusability/composables.html).

- مدعوم فقط في 3.3+

## <MaybeRefOrGetter\<T {#maybereforgetter}

اسم بديل لـ `T | Ref<T> | (() => T)`. مفيد لتوصيف الوسائط لـ [الدوال التركيبية](/guide/reusability/composables.html).

- مدعوم فقط في 3.3+

## <ExtractPropTypes\<T {#extractproptypes}

تستخرج أنواع الخاصيات من كائن خيارات الخاصيات في وقت التشغيل. الأنواع المستخرجة هي الأنواع الداخلية - أي الخاصيات المستبيَنة التي يتلقاها المكون. هذا يعني أن الخاصيات المنطقية والخاصيات التي تحتوي على قيم افتراضية دائمًا ما تكون محددة، حتى لو لم تكن مطلوبة.

من أجل استخراج الخاصيات العامة، أي الخاصيات التي يسمح للأب بتمريرها، استخدم [`ExtractPublicPropTypes`](#extractpublicproptypes).

- **مثال**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## <ExtractPublicPropTypes\<T {#extractpublicproptypes}

تستخرج أنواع الخاصيات من كائن خيارات الخاصيات في وقت التشغيل. الأنواع المستخرجة هي الأنواع العامة - أي الخاصيات التي يسمح للأب بتمريرها.

- **مثال**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## ComponentCustomProperties {#componentcustomproperties}

يستخدم لتوسيع نوع نسخة المكون لدعم الخاصيات العامة المخصصة.

- **مثال**

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip ملاحظة
  يجب وضع التوسيعات في ملف `.ts` أو `.d.ts` مستقل. اطلع على [مكان التوسيعات](/guide/typescript/options-api#augmenting-global-properties) للمزيد من التفاصيل.
  :::

- **اطلع أيضا على** [دليل - توسيع الخاصيات العامة](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

يستخدم لتوسيع نوع خيارات المكون لدعم الخيارات المخصصة.

- **مثال**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip ملاحظة
  يجب وضع التوسيعات في ملف `.ts` أو `.d.ts` مستقل. اطلع على [مكان التوسيعات](/guide/typescript/options-api#augmenting-global-properties) للمزيد من التفاصيل.
  :::

- **اطلع أيضا على** [دليل - توسيع الخيارات المخصصة](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

يستخدم لتوسيع الخاصيات المسموح بها في TSX من أجل استخدام الخاصيات غير المصرح بها على عناصر TSX.

- **مثال**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // يعمل الآن حتى لو لم يُصرح بـ hello كخاصية
  <MyComponent hello="world" />
  ```

  :::tip ملاحظة 
  يجب وضع التوسيعات في ملف `.ts` أو `.d.ts` مستقل. اطلع على [مكان التوسيعات](/guide/typescript/options-api#augmenting-global-properties) للمزيد من التفاصيل.
  :::

## CSSProperties {#cssproperties}

يستخدم لتوسيع القيم المسموح بها في ربط خاصية التنسيقات.

- **مثال**

  السماح بأي خاصية CSS مخصصة

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```

  ```html
  <div :style="{ '--bg-color': 'blue' }"></div>
  ```

:::tip ملاحظة
يجب وضع التوسيعات في ملف `.ts` أو `.d.ts` مستقل. اطلع على [مكان التوسيعات](/guide/typescript/options-api#augmenting-global-properties) للمزيد من التفاصيل.
:::

:::info اطلع أيضا على
  تدعم علامات `<style>` في المكونات أحادية الملف ربط قيم CSS بحالة المكون الديناميكية باستخدام دالة `v-bind` الخاصة بـ CSS. هذا يسمح بالخاصيات المخصصة دون توسيع الأنواع.

  - [()v-bind في CSS](/api/sfc-css-features#v-bind-in-css)
  :::
