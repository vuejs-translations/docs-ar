# الواجهة التركيبية: <br>حقن الإعتمادية {#composition-api-dependency-injection}

## ()provide {#provide}

توفر قيمة يمكن حقنها من طرف المكونات الأبناء.

- **النوع**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **التفاصيل**

  `provide()` تأخذ وسيطتين: المفتاح، الذي يمكن أن يكون سلسلة أو رمز، والقيمة التي ستحقن.

  عند استخدام TypeScript، يمكن أن يكون المفتاح رمز موفر كـ `InjectionKey` - نوع مساعد مقدم من طرف Vue يمتد من `Symbol`، والذي يمكن استخدامه لمزامنة نوع القيمة بين `()provide` و `()inject`.

  مشابه لواجهات برمجة خطافات دورة الحياة، يجب استدعاء `()provide` بشكل متزامن خلال مرحلة `()setup` للمكون.

- **مثال**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // يوفر قيمة ساكنة
  provide('foo', 'bar')

  // يوفر قيمة تفاعلية
  const count = ref(0)
  provide('count', count)

  // يوفر مفاتيح رمزية
  provide(fooSymbol, count)
  </script>
  ```

- **اطلع أيضا**
  - [دليل - توفير / حقن](/guide/components/provide-inject)
  - [دليل - إضافة الأنواع في توفير / حقن](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## ()inject {#inject}

تحقن قيمة موفرة من طرف مكون أب أو التطبيق (عبر `app.provide()`).

- **النوع**

  ```ts
  // بدون قيمة افتراضية
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // مع قيمة افتراضية 
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // مع دالة منتجة
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **التفاصيل**

   الوسيط الأول هو مفتاح الحقن. سيقوم Vue بالتجوال في سلسلة المكونات الأباء لتحديد قيمة موفرة مع مفتاح مطابق. إذا كانت هناك عدة مكونات في سلسلة الأباء توفر نفس المفتاح، فسيتم "تظليل" أقرب مكون إلى المكون المحقق. إذا لم يُعثر على قيمة مع مفتاح مطابق، فإن `()inject` ترجع `undefined` ما لم تُوفر قيمة افتراضية.

  الوسيط الثاني اختياري وهو القيمة الافتراضية التي ستستخدم عندما لا يُعثر على قيمة مطابقة.

  يمكن أن يكون الوسيط الثاني أيضا دالة منتجة ترجع قيم مكلفة لإنشائها. في هذه الحالة، يجب تمرير `true` كوسيط ثالث للإشارة إلى أن الدالة يجب أن تستخدم كمنتجة بدلا من القيمة نفسها.

  مشابه لواجهات برمجة خطافات دورة الحياة، يجب استدعاء `()inject` بشكل متزامن خلال مرحلة `()setup` للمكون.

  عند استخدام TypeScript، يمكن أن يكون المفتاح من نوع `InjectionKey` - نوع مساعد مقدم من طرف Vue يمتد من `Symbol`، والذي يمكن استخدامه لمزامنة نوع القيمة بين `()provide` و `()inject`.

- **مثال**

  بفرض أن مكون أب قد قدم قيم كما هو موضح في مثال `()provide` السابق:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // حقن قيمة ساكنة بدون قيمة افتراضية
  const foo = inject('foo')

  // حقن قيمة تفاعلية 
  const count = inject('count')

  // حقن بمفاتيح رمزية  
  const foo2 = inject(fooSymbol)

  // حقن بقيمة افتراضية
  const bar = inject('foo', 'default value')

  // حقن بقيمة افتراضية من دالة
  const fn = inject('function', () => {})

  // حقن بدالة منتجة لقيمة افتراضية
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```

- **اطلع أيضا**
  - [دليل - توفير / حقن](/guide/components/provide-inject)
  - [دليل - إضافة الأنواع في توفير / حقن](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />
