---
pageClass: api
---

# مكونات مدمجة {#built-in-components}

:::info التسجيل والاستخدام
المكونات المدمجة يمكن استخدامها مباشرة في القوالب دون الحاجة إلى تسجيلها. كما أنها قابلة للتجزئة : فهي مدرجة في الحزمة المبنية فقط في حالة استخدامها.

عند استخدامها في [دوال التصيير](/guide/extras/render-function) ، يجب استيرادها بشكل صريح. على سبيل المثال:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* الخاصيات */
})
```

:::

## مكون `<Transition>` {#transition}

توفر تأثيرات انتقال متحركة لعنصر أو مكون **واحد**.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * يستخدم لتوليد أسماء فئات CSS للانتقال تلقائيا.
      * على سبيل المثال `name: 'fade'` سيوسع تلقائيًا إلى `.fade-enter` ،
      * `.fade-enter-active` ، الخ.
     */
    name?: string
    /**
     * تحدد ما إذا كانت ستطبق فئات الانتقال CSS.
     * Default: true
     */
    css?: boolean
    /** 
     * تحدد نوع الأحداث التي تنتظرها
     * لتحديد توقيت نهاية الانتقال.
     * السلوك الافتراضي هو الكشف التلقائي عن النوع الذي لديه
     * مدة أطول.
     */
    type?: 'transition' | 'animation'
    /**
     * تحدد مدة الانتقالات بشكل صريح.
      * السلوك الافتراضي هو الانتظار لأول `transitionend`
      * أو `animationend` حدث على عنصر الانتقال الجذر.
      */
    duration?: number | { enter: number; leave: number }
    /**
     * تحكم في تسلسل التوقيت للانتقالات الخروج / الدخول.
     * السلوك الافتراضي هو متزامن.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * تحدد ما إذا كان سيطبق الانتقال على التصيير الأولي.
     * Default: false
     */
    appear?: boolean

    /**
     * خصائص لتخصيص فئات الانتقال.
      * استخدم صيغة أسياخ الشواء في القوالب ، على سبيل المثال enter-from-class="xxx"    
       */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **الأحداث**

  - `before-enter@`
  - `before-leave@`
  - `enter`
  - `leave@`
  - `appear@`
  - `after-enter@`
  - `after-leave@`
  - `after-appear@`
  - `enter-cancelled@`
  - `leave-cancelled@` (`v-show` only)
  - `appear-cancelled@`

- **مثال**

  عنصر بسيط:

  ```vue-html
  <Transition>
    <div v-if="ok">محتوى مبدل</div>
  </Transition>
  ```

  إجبار الانتقال عن طريق تغيير سمة `key`:

  ```vue-html
  <Transition>
    <div :key="text">{{ text }}</div>
  </Transition>
  ```

  مكون ديناميكي ، مع وضع انتقال + تحريك عند الظهور:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  الاستماع إلى أحداث الانتقال:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">toggled content</div>
  </Transition>
  ```

- **اطلع أيضاً على** [دليل مكون - Transition](/guide/built-ins/transition)

## مكون `<TransitionGroup>` {#transitiongroup}

يوفر تأثيرات انتقال لعناصر أو مكونات **متعددة** في قائمة.

- **الخاصيات**

  يقبل `<TransitionGroup>` نفس الخصائص مثل `<Transition>` باستثناء `mode` ، بالإضافة إلى خاصيتين إضافيتين:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * إذا لم يُعرف ، فسيُصير كمقطع.
     */
    tag?: string
    /**
     * لتخصيص فئة CSS التي تُطبَّق أثناء الانتقالات المتحركة.
      * استخدم صيغة أسياخ الشواء في القوالب ، على سبيل المثال move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **الأحداث**

  يصدر `<TransitionGroup>` نفس الأحداث مثل `<Transition>`.

- **التفاصيل**

  بشكل افتراضي ، `<TransitionGroup>` لا يقوم بتصيير عنصر DOM للتغليف ، ولكن يمكن تعريفه باستخدام خاصية `tag`.

  لاحظ أنه يجب أن يكون كل عنصر في `<transition-group>` [**مفتاحًا وحيدًا**](/guide/essentials/list#maintaining-state-with-key) لتعمل الرسوم المتحركة بشكل صحيح.

   يدعم `<TransitionGroup>` الانتقالات المتحركة عبر تحويلات CSS. عندما يتغير موضع عنصر إبن على الشاشة بعد التحديث ، فستطبق فئة CSS متحركة (مولدة تلقائيًا من سمة `name` أو تكوينها باستخدام خاصية `move-class`). إذا كانت خاصية CSS `transform` قابلة للتحويل عند تطبيق الفئة المتحركة ، فسيُحرك العنصر بسلاسة إلى وجهته باستخدام [تقنية FLIP](https://aerotwist.com/blog/flip-your-animations/).

- **مثال**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **اطلع أيضاً على** [دليل مكون`<TransitionGroup>`](/api/built-in-components.html#transitiongroup)

## مكون `<KeepAlive>` {#keepalive}

يخزن في ذاكرة التخزين المؤقت المكونات المفعلة ديناميكياً التي تغليفها بداخله.

- **الخاصيات**

  ```ts
  interface KeepAliveProps {
    /**
     * إذا تم تحديده ، فستخزن المكونات  المطابقة لما في 
      * `include`.
     */
    include?: MatchPattern
    /**
     * أي مكون يحمل اسم مطابق لما في 
     * `exclude` لن يُخزن.
     */
    exclude?: MatchPattern
    /**
     * الحد الأقصى لعدد نسخ المكونات التي يمكن تخزينها.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **التفاصيل**

  عند تغليف مكون ديناميكي ، `<KeepAlive>` يخزن نسخ المكونات الغير فعالة دون اتلافها.

  يمكن أن يكون هناك نسخة واحدة فقط من المكون الفعال كابن مباشر لـ `<KeepAlive>` في أي وقت.

  عند تبديل مكون داخل `<KeepAlive>` ، ستستدعى خطافات دورة حياة `activated` و `deactivated` وفقًا لذلك ، مما يوفر بديلاً لـ `mounted` و `unmounted` ، التي لا تستدعى. ينطبق هذا على الابن المباشر لـ `<KeepAlive>` وكذلك على جميع أبنائه.

- **مثال**

  استخدام أساسي:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  عند استخدامه مع فروع `v-if` / `v-else` ، يجب أن يكون هناك مكون واحد فقط مصيّر في زمن واحد:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  يستخدم بجانب `<Transition>`:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  استخدام `include` / `exclude`:

  ```vue-html
  <!-- سلسلة نصية مفصولة بفواصل -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- تعبير منتظم (استخدم `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- مصفوفة (استخدم `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  استخدام مع `max`:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **اطلع أيضاً على** [دليل مكون`<KeepAlive>`](/api/built-in-components.html#keepalive)

## مكون `<Teleport>` {#teleport}

يصيّر محتوى منفذ إلى جزء آخر من الـ DOM.

- **الخاصيات**

  ```ts
  interface TeleportProps {
    /**
     * إجباري. حدد حاوية الهدف.
      * يمكن أن يكون إما محدد أو عنصر فعلي.
     */
    to: string | HTMLElement
    /**
     * عندما يكون `true` ، سيظل المحتوى في موقعه الأصلي
      * بدلاً من نقله إلى حاوية الهدف.
      * يمكن تغييرها بشكل ديناميكي.
     */
    disabled?: boolean
  }
  ```

- **مثال**

  تحديد العنصر المحتوي الهدف:

  ```vue-html
  <Teleport to="#some-id" />
  <Teleport to=".some-class" />
  <Teleport to="[data-teleport]" />
  ```

  تعطيل بشكل شرطي:

  ```vue-html
  <Teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </Teleport>
  ```

- **اطلع أيضاً على** [دليل مكون`<Teleport>`](/api/built-in-components.html#teleport)

## مكون `<Suspense>` <sup class="vt-badge experimental" /> {#suspense}

يستخدم لتنسيق الاعتماديات المتداخلة الغير متزامنة في شجرة المكونات.

- **الخاصيات**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
  }
  ```

- **الأحداث**

  - `resolve@`
  - `pending@`
  - `fallback@`

- **التفاصيل**

  يقبل `<Suspense>` منفذين: منفذ `default#` ومنفذ `fallback#`. سيعرض محتوى المنفذ الاحتياطي أثناء تصيير المنفذ الافتراضي في الذاكرة.

  إذا صادفت اعتماديات غير متزامنة ([مكونات غير متزامنة](/guide/components/async) ومكونات مع [`async setup()`](/guide/built-ins/suspense#async-setup)) أثناء تصيير المنفذ الافتراضي ، فسوف تنتظر حتى  تُحل جميعًا قبل عرض المنفذ الافتراضي.

- **اطلع أيضاً على** [دليل مكون`<Suspense>`](/api/built-in-components.html#suspense)
