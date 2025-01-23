# الواجهة البرمجية لدالة التخريج {#render-function-apis}

## ()h {#h}

تنشئ عقد DOM افتراضية (vnodes).

- **النوع**

  ```ts
  // البصمة الكاملة
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // حذف الخاصيات
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > الأنواع مبسطة لتسهيل القراءة.

- **التفاصيل**

  الوسيط الأول يمكن أن يكون سلسلة نصية  (للعناصر الأصلية) أو تعريف مكون Vue. الوسيط الثاني هو الخاصيات التي ستُمرر ، والوسيط الثالث هو المكونات الأبناء.

  عند إنشاء عقد المكون ، يجب تمرير الأبناء كدوال منفذ. يمكن تمرير دالة منفذ واحدة إذا كان المكون يتوقع فقط منفذ افتراضي. وإلا ، يجب تمرير المنافذ ككائن من دوال المنافذ.

  للتسهيل ، يمكن حذف وسيط الخاصيات عندما لا تكون المكونات الأبناء عبارة عن كائن منافذ.  

- **مثال**

  إنشاء عناصر أصلية:

  ```js
  import { h } from 'vue'

  // جميع الوسائط ما عدا النوع اختيارية
  h('div')
  h('div', { id: 'foo' })

  // يمكن استخدام السمات والخاصيات في كائن الخاصيات
  // يختار Vue تلقائيًا الطريقة الصحيحة لتعيينها
  h('div', { class: 'bar', innerHTML: 'hello' })

  // الفئة والنمط لديهما نفس قيمة  دعم 
  // الكائن / مصفوفة مثل القوالب
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // يجب تمرير مستمعي الأحداث كـ onXxx
  h('div', { onClick: () => {} })

  // يمكن أن تكون المكونات الأبناء سلسلة نصية
  h('div', { id: 'foo' }, 'hello')

  // يمكن حذف كائن الخاصيات عندما لا تكون هناك خاصيات
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // مصفوفة الأبناء يمكن أن تحتوي على عقد افتراضية وسلاسل مختلطة
  h('div', ['hello', h('span', 'hello')])
  ```

  إنشاء المكونات:

  ```js
  import Foo from './Foo.vue'

  // تمرير الخاصيات
  h(Foo, {
    // ما يعادل some-prop="مرحبا"
    someProp: 'مرحبا',
    // ما يعادل @update="() => {}"
    onUpdate: () => {}
  })

  // تمرير منفذ افتراضي واحد  
  h(Foo, () => 'default slot')

  // تمرير منافذ مسماة
  // لاحظ أنه يتطلب `null` لتجنب
  // يتم التعامل مع كائن المنافذ كخاصيات
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **اطلع أيضاً** [دليل دوال التخريج - إنشاء عقد VNodes](/guide/extras/render-function#creating-vnodes)

## ()mergeProps {#mergeprops}

دمج عدة كائنات خاصيات مع معالجة خاصة لبعض الخاصيات.

- **النوع**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **التفاصيل**

  `mergeProps()` يدعم دمج عدة كائنات خاصيات مع معالجة خاصة للخاصيات التالية:

  - `class`
  - `style`
  - `onXxx` مستمعي الأحداث - ستُدمج المستمعات المتعددة بنفس الاسم في مصفوفة.

  إذا لم تكن بحاجة إلى سلوك الدمج وتريد استبدالات بسيطة ، فيمكن استخدام طريقة نشر الكائن الأصلية بدلاً من ذلك.

- **Example**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## ()cloneVNode {#clonevnode}

تستنسخ عقدة افتراضية.

- **النوع**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **التفاصيل**

  يعيد عقدة افتراضية مستنسخة ، اختياريًا مع خاصيات إضافية لدمجها مع الأصل.

  يجب اعتبار العقد الافتراضية غير قابلة للتغيير بمجرد إنشائها ، ولا يجب تغيير خاصيات عقدة افتراضية موجودة. بدلاً من ذلك ، استنسخها مع خاصيات مختلفة / إضافية.

  العقد الافتراضية لها خاصيات داخلية خاصة ، لذلك لا يكون استنساخها بسيطًا مثل نشر الكائن. `()cloneVNode` يتعامل مع معظم المنطق الداخلي.

- **مثال**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## ()isVNode {#isvnode}

تحقق مما إذا كانت القيمة عبارة عن عقدة افتراضية.

- **النوع**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## ()resolveComponent {#resolvecomponent}

لاستبيان المكون المسجل يدويًا بالاسم.

- **النوع**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **التفاصيل**

  **ملاحظة: لا تحتاج إلى ذلك إذا كنت تستطيع استيراد المكون مباشرة.**

  يجب استدعاء `()resolveComponent` إما<span class="composition-api"> داخل `()setup` أو</span> دالة التخريج من أجل استبيان سياق المكون الصحيح.

  إذا لم يعثر على المكون ، فسيصدَر تحذير في وقت التشغيل ، ويرجع السلسلة النصية للاسم.

- **مثال**

  <div class="composition-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **اطلع أيضاً** [دليل دوال التخريج - المكونات](/guide/extras/render-function#components)

## ()resolveDirective {#resolvedirective}

لاستبيان السمة الموجهة المسجلة يدويًا بالاسم.

- **النوع**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **النوع**

  **ملاحظة: لا تحتاج إلى ذلك إذا كنت تستطيع استيراد السمة الموجهة مباشرة.**

  يجب استدعاء `()resolveDirective` إما<span class="composition-api"> داخل `()setup` أو</span> دالة التخريج من أجل استبيان سياق المكون الصحيح.

  إذا لم يعثر على السمة الموجهة ، فسيصدَر تحذير في وقت التشغيل ، وتعيد الدالة القيمة  `undefined`.

- **اطلع أيضاً** [دليل دوال التخريج - السمات الموجهة المخصصة](/guide/extras/render-function#custom-directives)

## ()withDirectives {#withdirectives}

لاضافة السمات الموجهة المخصصة إلى العقد الافتراضية.

- **النوع**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **التفاصيل**

  تلف العقدة الافتراضية الموجودة بالسمات الموجهة المخصصة. الوسيط الثاني هو مصفوفة من السمات الموجهة المخصصة. تُمثَّل كل سمة موجهة مخصصة أيضًا كمصفوفة على شكل `[Directive, value, argument, modifiers]`. يمكن حذف العناصر التذييلية من المصفوفة إذا لم يكن هناك حاجة إليها.

- **مثال**

  ```js
  import { h, withDirectives } from 'vue'

  // سمة موجهة مخصصة  
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **اطلع أيضاً** [دليل دوال التخريج - السمات الموجهة المخصصة](/guide/extras/render-function#custom-directives)

## ()withModifiers {#withmodifiers}

لاضافة المعدلات المدمجة [`v-on`](/guide/essentials/event-handling#event-modifiers) إلى دالة معالج الحدث.

- **النوع**

  ```ts
  function withModifiers(fn: Function, modifiers: ModifierGuardsKeys[]): Function
  ```

- **مثال**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // ما يعادل v-on:click.stop.prevent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **اطلع أيضاً** [دليل دوال التخريج - معدلات الأحداث](/guide/extras/render-function#event-modifiers)
