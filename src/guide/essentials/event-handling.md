# معالجة الأحداث {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="درس Vue.js مجاني حول معالجة الأحداث "/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="درس Vue.js مجاني حول معالجة الأحداث "/>
</div>

## الاستماع للأحداث {#listening-to-events}

يمكننا استخدام السمة المُوجهة `v-on` ،والتي نختصرها عادة بالرمز `@` ،للإستماع إلى أحداث DOM وتنفيذ بعض شيفرات الـJavaScript عندما تشغل تلك الأحداث. يكون استخدامها على شكل `v-on:click="handler"` أو باختصار،`@click="handler"` .

قيمة المعالج يمكن أن تكون أحد الأشكال التالية:

1. **مُعالِجات سطرية:** شيفرة JavaScript ليتم تنفيذها عند تشغيل الحدث (مماثلة لسمة `onclick` الأصلية).

2. **مُعالِجات  عبر دوال:** اسم خاصية أو مسار يشير إلى دالة معرفة في المكون.

## مُعالِجات سطرية {#inline-handlers}

المعالجات السطرية عادة ما تُستخدم في الحالات البسيطة، على سبيل المثال:

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
    return {
        count: 0
    }
}
```

</div>

```vue-html
<button @click="count++">اضف 1</button>
<p>العداد: {{ count }}</p>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kE1OAzEMha9iZVNQ2wlsR9MK7uFNGzwwpfmRkymLURZI3IVld0jcZHobHKZCCKTu8p6fP9sZ1H0I1aEnVasmGu5CgkipD2t0nQ2eEwzA1EKGlr2FmURn6NAZ72IC43uXYFUSVzfX6Bo9MaRbRCIb9ptEopptn5J3cGf2nXleofrunM9Rrcf38eP0CreNnjIlHcQ9vY2f41GqxxqG4Twq50aX3Rr9A1cLNW26tJtQ7aJ3csuADgDPhYhKEMUpnlxQNKqnlEKstY6tKT+wi5XnRy2vimVUZ6miaJdb9i+RWMCoFr8YWswD8ZLJPRATX2L+if7jFmxGl1X+Av7TkqA=)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kEFOwzAQRa8y8grUNoZtFCq4hzdpOoWUxLHGk4IUZQGiIM7BooJdWSBxE+c22E0UIZAqWdb87/Gz5zfiyphoU6OIRWIzyg3PlcZ7UxHDEldpXTA0SgMsU05PTkOtGICQa9L9CYDirKo1I8VwFhzFbWjzm1+JHLleMJamSBmD4mRRM1caLrMiz24vlBgwk4kSc7dzX90DnCey7+pvmLn76Lbgdt1T99w9uj24b1++Hhz3GfRbcLx8gaYZgG0L3dbt3XuUSONBiRz/IaYiL8O4szI10dpW2kdxmEsNB1aJeJxU+KyCVuKG2dhYSrvKQoBrG1V0LX0VkX8zLzFCW84WVN1ZJA9WYvqLIb25QZoR6iUS0jHmn9Z/3IANWYv2B2TQtCQ=)

</div>

## المعالجات بالدوال {#method-handlers}

الشيفرة في العديد من معالجات الأحداث ستكون أكثر تعقيدًا، ومن المحتمل أن لا تكون ممكنة مع المعالجات السطرية. هذا هو السبب في أن `v-on`  يستطيع أيضًا قبول اسم أو مسار لدالة مكون حيث يمكنك استدعائها عند اطلاق الحدث.

مثال:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`مرحبا ${name.value}!`)
  //`event` هو الحدث الأصلي من  DOM
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
        return {
            name: 'Vue.js'
        }
    },
    methods: {
        greet(event) {
            //`this` داخل الدوال تشير إلى النسخة النشطة الحالية
            alert(`مرحبا ${this.name}!`)
            //`event` هو الحدث الأصلي من  DOM
            if (event) {
                alert(event.target.tagName)
            }
        }
    }
```

</div>

```vue-html
<!--  `greet` هو اسم الدالة المعرفة أعلاه -->
<button @click="greet">Greet</button>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9Uc1Kw0AQfpVxEVqhzd5LWhS8qjdPe2gaJzW12YTdST2E3FoVD6LP4KGCiIj4Ltm3cZK04g8ICzuz8833zXxbiIMs8xY5ioHwbWjijMAi5dlI6TjJUkNQgMEISohMmkCHoR2llQ5TbQl0kCAMa0C3c5qjN7Odvboa5TqkONUwNYjUxQVq2oNCaYBgjoa6Y7eq3qqX6qlaw25R03iLYJ5juTNmAgApx03TuE3AXbsbqNZuyT2v1XMbPlYfbuluwa3cFWyAcHhyVIdxBD9kt8LNm0eBmWJ9TY9ZulEslebjy9YEXp8TwiSbB4R1Rv4kJ+KV9sN5HF4MlWh2U2JUvbs7nuPB3buVL1sUd/jyq130RGtmPwkyNinVbHczltoUrBKD7aBKsMl1rsQ5UWYHUtoorD9pZr3UTCVHnsk1xewa2qQ/MemlRcPESvS+cUh+XKDpG9RnaND8x/kL+od3a5EoPwHZEdT+)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9UsFu00AQ/ZVhhdRUarz3yFQgcQVunPZgN5kkLvHa2h0HpCi3pJQeEHwDQqEgGlUt4ldm/6a7dmypTVXL8sy8nXn7PDML8aoso3mFYiBiOzRZScdK46eyMAQjHKfVjGChNMAopbR32PgABqkyuo0AdJrjAA7eVxid2oMGXQazPArfHGlajOygLZgYROrhHDV1lLtHyoSmmU3ugR4F3vKGr9wKeONWvHXnwQL/5lt3wdfAP93KfakP3Rnf8BVftsEt/98F/LeGLvjyPn06Q0O9xK352qf84g08XwQVUfiv5bPk8KGapNa+L9J9duftTVv+07g/+F+4FNzancFeCbx+96YFszE80pVGXY1HlJoJBjN566V1uupety1X2r+x7MbpA8K8nKWEIaL4pCIqNLwczrLhhxdK1ONQ4phv3Fev9Lv75taxbLJ8RSy7cnEksjwsRz9PSz/qQvvFqaWq3YFVohuzEn6zQqzElKi0AynteBjW7dRGhZlI70Wm0pTlGKHN+yem+GjReGIl6sXZcUgPztH0DeoRGjRPcT5I3eNtWySWd48cH0E=)

</div>

الدالة المعالجة تتلقى تلقائيًا كائن حدث الـDOM الأصلي الذي يُشغل - في المثال أعلاه ، نستطيع الوصول إلى العنصر الذي يقوم باطلاق الحدث عبر `event.target.tagName`.

<div class="composition-api">

اطلع على : [إضافة الأنواع لمعالجات الأحداث](/guide/typescript/composition-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

اطلع على : [إضافة الأنواع لمعالجات الأحداث](/guide/typescript/options-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### الكشف عن نوع المعالج، الدالة مقابل السطري {#method-vs-inline-detection}

مصرف القالب يكشف عن معالجات الأحداث من خلال التحقق ما إذا كانت  قيمة `v-on` سلسلة نصية عبارة عن مُعرَّف JavaScript صالح أو مسار وصول إلى الخاصية. على سبيل المثال ،`foo` ،`foo.bar` و `foo['bar']` تعامَل كدوال معالجة الأحداث، بينما `()foo` و `++count` تعامل كمعالجات سطرية.

## استدعاء الدوال في المعالجات السطرية {#calling-methods-in-inline-handlers}

بدلا من الربط مباشرة باسم تابع/دالة، يمكننا أيضا استدعاء دوال في المعالجات السطرية، هذا يسمح لنا بتمرير بعض الوسائط المخصصة للدالة بدلا من كائن الحدث الأصلي

<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
    say(message) {
        alert(message)
    }
}
```

</div>

```vue-html
<button @click="say('مرحبا')">قل مرحبا</button>
<button @click="say('إلى اللقاء')">قل إلى اللقاء</button>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kUFOwzAQRa9ieVMqNfE+ChXcw5s0TEtK7FieSRGqsqnCgmOwQGHDgtvYt2FCUFsB6sqeP/5Pnj97eetcumtBZjLH0leOBAK1bqnturUlVY0VWDxdGUAsNjAXe22FKGrwdNS07bTN1WRnIxcExtUFAVdC5KuWiDk3ZV2VD9dajsBZfA6f4SO8h2E213IZD7EXJy1Xk+kCILzFPr6IMPDRx0MYwuuJ9E/zDJmr4wflQlbGNZ4SU7h0i43lKL6H1D8N1DKbxh41zmqstbwncpgphetyDHCLaeM3im+pby1VBlJAk6x884jgGazl4oyhWNyBTzzYO/DgLzF/Pf3DHbG8gU52X9B0t6M=)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kU1OwzAQha9ieVMqtfE+ChXcwxs3mbYp8Y/sSQFV3VRhwTFYoLBhwW3s22CnKK2gQrJsz/PMN/bznt4bk+1aoDktXGlrgwuu4Mloi6SClWgbJHuuCJGAG125PEUcCXHi+UaCc2IN01MGIRxFAxZHPakcD6kgTnEUbOwRAwRpGoGQIiyWLaJW5K5s6vLhltPUYBJe/Jf/9B++n0w5XYRj6MhZK9ipKALI9Xr/HrrwSnwfly4cfe/fzqArhxfEgo33ozNay2TJXAqTbZ1W0a7hzfznwHE6ODO4QKOfKeZ0g2hczphblcnkrcu0XbO4y2yrsJaQgZPzpdWPDmwEczq7YLAo7sDOLagKLNj/mL9S/3ATNv0BPXwD+BTEqQ==)

</div>

##   الوصول إلى وسيط الحدث الأصلي في المعالجات السطرية{#accessing-event-argument-in-inline-handlers}

في بعض الأحيان نحتاج أيضا إلى الوصول إلى وسيط الحدث الأصلي في معالج سطري. يمكنك تمريره إلى دالة باستخدام المتغير الخاص `event$` ، أو استخدام دالة سهم سطرية:

```vue-html
<!--  باستخدام المتغير الخاص $event -->
<button @click="warn('لا يمكن إرسال النموذج.', $event)">
  إرسال
</button>

<!--  باستخدام دالة سهم سطرية -->
<button @click="(event) => warn('لا يمكن إرسال النموذج.', event)">
  إرسال
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
    // الآن لدينا وصول إلى الحدث الأصلي
    if (event) {
        event.preventDefault()
    }
    alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
    warn(message, event) {
       // الآن لدينا وصول إلى الحدث الأصلي
        if (event) {
            event.preventDefault()
        }
        alert(message)
    }
}
```

</div>

## مُعدِّلات الأحداث {#event-modifiers}

حاجة شائعة جدا هي استدعاء `event.preventDefault()` أو `event.stopPropagation()` داخل معالجات الأحداث. على الرغم من أننا يمكننا القيام بذلك بسهولة داخل التوابع/الدوال ، سيكون من الأفضل إذا كانت التوابع تتعامل فقط مع شيفرة البيانات بدلاً من تفاصيل حدث الـDOM.

لمعالجة هذه المشكلة، توفر Vue **مُعدِّلات الأحداث** لـ `v-on` . تذكر أن المُعدِّلات هي بادئات المُوجهات التي يشار إليها بنقطة.

* `stop.`
* `prevent.`
* `self.`
* `capture.`
* `once.`
* `passive.`

```vue-html
<!-- حدث النقر سيوقف انتشاره -->
<a @click.stop="doThis"></a>

<!-- حدث الإرسال لن يعيد تحميل الصفحة -->
<form @submit.prevent="onSubmit"></form>

<!-- المُعدِّلات يمكن أن تكون متسلسلة -->
<a @click.stop.prevent="doThat"></a>

<!-- المُعدِّل فقط -->
<form @submit.prevent></form>

<!-- شغل المعالج فقط إذا كان event.target هو العنصر نفسه -->
<!-- أي ليس من عنصر ابن -->
<div @click.self="doThat">...</div>
```

::: tip ملاحظة
ترتيب المُعدِّلات مهم لأن الشيفرة المتعلقة بها تُنشأ بنفس الترتيب. لذا، إذا استخدمنا `click.prevent.self@`،فسيتم منع **إجراء النقر الافتراضي على العنصر نفسه وأبنائه**، بينما إذا استخدمنا `click.self.prevent@`، فسيتم منع إجراء النقر الافتراضي على العنصر نفسه فقط.
:::

المُعدِّلات `.capture`، `.once`، و `.passive` توافق [خيارات الدالة الأصلية `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) :

```vue-html
<!--  استخدم وضع الالتقاط عند إضافة مستمع الحدث -->
<!-- مثال: يعالج الحدث الهدف لعنصر داخلي هنا قبل أن يعالج من قبل العنصر ذاته -->
<div @click.capture="doThis">...</div>

<!-- حدث النقر على الأكثر مرة واحدة -->
<a @click.once="doThis"></a>

<!--   سيحدث السلوك الافتراضي لحدث  التمرير فورا-->
<!-- بدل من الانتظار لإكمال `onScroll` -->
<!-- في حالة احتوائه على `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

المُعدِّل `.passive` عادة ما يُستخدم مع مستمعي الأحداث اللمسية ل[تحسين أداء الأجهزة المحمولة](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

::: tip ملاحظة
لا تستخدم المُعدِّلات `.passive` و `.prevent` معاً، لأن المُعدِّل `.passive` يخبر المتصفح بأنك لا تُريد منع السلوك الافتراضي للحدث،  ومن المحتمل أن ترى تحذيراً من المتصفح إذا قمت بذلك.
:::

## مُعدِّلات المفتاح {#key-modifiers}

عند الاستماع لأحداث لوحة المفاتيح، نحتاج في كثير من الأحيان إلى التحقق من مفاتيح معينة. تسمح لنا Vue بإضافة مُعدِّلات المفاتيح لـ `v-on` أو `@` عند الاستماع لأحداث المفاتيح:

```vue-html
<!-- استدع الدالة `submit` فقط عندما ينقر على المفتاح `Enter` -->
<input @keyup.enter="submit" />
```

يمكنك استخدام أي أسماء مفاتيح صالحة معروضة عبر [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) كمُعدِّلات مباشرة بتحويلها إلى صيغة اسياخ الشواء kebab-case.

```vue-html
<input @keyup.page-down="onPageDown" />
```

في المثال أعلاه، سيتم استدعاء المُعدِّل فقط إذا كان `event.key$` يساوي `'PageDown'` .

### الأسماء البديلة للمفاتيح {#key-aliases}

Vue توفر أسماء بديلة للمفاتيح الأكثر استخداماً:

* `enter.`
* `tab.`
* `delete.` (يلتقط كلاً من مفتاحي "Delete" و "Backspace")
* `esc.`
* `space.`
* `up.`
* `down.`
* `left.`
* `right.`

### مُعدِّلات مفاتيح النظام {#system-modifier-keys}

يمكنك استخدام المُعدِّلات التالية لتشغيل مستمعي أحداث الفأرة أو لوحة المفاتيح فقط عند الضغط على مفتاح المُعدِّل المطابق:

* `ctrl.`
* `alt.`
* `shift.`
* `meta.`

::: tip ملاحظة
على  لوحة المفاتيح في نظام Macintosh، يكون الميتا مفتاح الأمر (⌘). على  لوحة المفاتيح لنظام Windows، يكون الميتا مفتاح الويندوز (⊞). على  لوحة المفاتيح لنظام Sun Microsystems، يكون الميتا معلَّماً بمعين مملوء (◆). على بعض لوحات المفاتيح، وخاصة لوحات  المفاتيح MIT و Lisp machine والمتبعين لها، مثل لوحة  Knight keyboard ولوحة space-cadet keyboard، يكون الميتا مسمّى "META". على لوحات المفاتيح لنظام Symbolics،يكون الميتا مسمّى "META" أو "Meta".
:::

على سبيل :

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">قم بعمل ما</div>
```

::: tip ملاحظة
تجدر الملاحظة أن مفاتيح المُعدِّلات مختلفة عن المفاتيح العادية وعند استخدامها مع أحداث `keyup`، يجب الضغط عليها عند إصدار الحدث. بعبارة أخرى، سيُشغل `keyup.ctrl` فقط إذا قمت بتحرير مفتاح معين مع استمرار الضغط على `ctrl`. لن يشغل إذا قمت بتحرير مفتاح `ctrl` بمفرده.
:::

### المُعدِّل `exact.`  {#exact-modifier}

المُعدِّل `exact.` يسمح بالتحكم في التركيبة الدقيقة لمُعدّلات النظام اللازمة لتشغيل حدث ما.

```vue-html
<!-- هذا سيشغل حتى إذا كان Alt أو Shift مضغوطاً أيضاً -->
<button @click.ctrl="onClick">أ</button>

<!-- هذا سيشغل فقط إذا كان Ctrl ولا مفتاح آخر مضغوطاً -->
<button @click.ctrl.exact="onCtrlClick">أ</button>

<!-- هذا سيشغل فقط إذا لم يضغط على أي مُعدِّلات نظام -->
<button @click.exact="onClick">أ</button>
```

## مُعدِّلات أزرار الفأرة {#mouse-button-modifiers}

* `.left`
* `.right`
* `.middle`

هذه المُعدِّلات تقيد المُعالِج بالأحداث التي شُغلت بواسطة زر فأرة معين.
