# الخيارات: التصيير {#options-rendering}

## template {#template}

قالب المكون على شكل سلسلة نصية.

- **النوع**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **التفاصيل**

  القالب المقدم عبر الخيار `template` سيُصير على الطائر أثناء التشغيل. هذا الخيار مدعوم فقط عند استخدام عملية بناء Vue الذي يتضمن مصرف القوالب. مصرف القوالب **غير** مدرج في بناء Vue الذي يحتوي على كلمة `runtime` في أسمائه، على سبيل المثال `vue.runtime.esm-bundler.js`. راجع [دليل ملفات التوزيع](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use)  لمزيد من التفاصيل حول مختلف عمليات البناء.

  إذا بدأت السلسلة النصية بـ `#` ستُستخدم كـ `querySelector` واستخدام `innerHTML` للعنصر المحدد كسلسلة نصية للقالب. هذا يسمح بكتابة القالب الأصلي باستخدام عناصر `<template>` الأصلية.

  إذا كان الخيار `render` موجود أيضًا في نفس المكون، سيتم تجاهل خيار `template`.

  إذا لم يكن لدى المكون الجذر لتطبيقك خيار `template` أو `render` محدد، سيحاول Vue استخدام `innerHTML` للعنصر المركب كقالب بدلاً من ذلك.

  :::warning ملاحظة أمان
  استخدم فقط مصادر القوالب التي يمكنك الوثوق بها. لا تستخدم محتوى المستخدم المقدم كقالب. راجع [دليل الأمان](/guide/best-practices/security#rule-no-1-never-use-non-trusted-templates) لمزيد من التفاصيل.
  :::
## render {#render}

دالة تعيد برمجيًا الشجرة DOM الافتراضية للمكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **التفاصيل**

  `render` هو بديل لقوالب السلسلة النصية التي تسمح لك بالاستفادة من القوة البرمجية الكاملة لـ JavaScript للتصريح بمخرجات تصيير المكون.

  القوالب المصرفة مسبقًا، على سبيل المثال تلك الموجودة في مكونات الملف الواحد، تصرف إلى خيار `render` أثناء عملية البناء. إذا كان كل من `render` و `template` موجودين في مكون، سيأخذ `render` أولوية أعلى.
 [Render Functions](/guide/extras/render-function)

- **اطلع أيضًا على**
  - [آلية التصيير](/guide/extras/rendering-mechanism)
  - [دوال التصيير](/guide/extras/render-function)

## compilerOptions {#compileroptions}

تقوم بإعداد خيارات مصرف التشغيل لقالب المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // default: 'condense'
      delimiters?: [string, string] // default: ['{{', '}}']
      comments?: boolean // default: false
    }
  }
  ```

- **التفاصيل**

  هذا الخيار لا يؤخذ بعين الاعتبار إلا عند استخدام  عملية بناء كاملة (أي `vue.js` المستقل الذي يمكنه تصريف القوالب في المتصفح). يدعم نفس الخيارات كـ [app.config.compilerOptions](/api/application#app-config-compileroptions) على مستوى جذر التطبيق، وله أولوية أعلى للمكون الحالي

- **اطلع أيضًا على** [app.config.compilerOptions](/api/application#app-config-compileroptions)

## slots<sup class="vt-badge ts"/> {#slots}

- Only supported in 3.3+

خيار للمساعدة في استنتاج النوع عند استخدام المنافذ برمجيًا في دوال التصيير. مدعوم فقط في 3.3+.

- **التفاصيل**

  قيمة هذا الخيار في وقت التشغيل لا تستخدم. يجب أن تُعلن الأنواع الفعلية باستخدام تحويل النوع باستخدام دالة النوع المساعدة `SlotsType`:

  ```ts
  import { SlotsType } from 'vue'

  defineComponent({
    slots: Object as SlotsType<{
      default: { foo: string; bar: number }
      item: { data: number }
    }>,
    setup(props, { slots }) {
      expectType<
        undefined | ((scope: { foo: string; bar: number }) => any)
      >(slots.default)
      expectType<undefined | ((scope: { data: number }) => any)>(
        slots.item
      )
    }
  })
  ```
