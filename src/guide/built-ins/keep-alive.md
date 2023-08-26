<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# مكون KeepAlive {#keepalive}

`<KeepAlive>` هو مكون مدمج يسمح لنا بتخزين مؤقت لنسخ المكونات عند التبديل بين مكونات متعددة بشكل ديناميكي.

## استعمال أساسي {#basic-usage}

في فصل أساسيات المكونات ، أدرجنا صيغة [المكونات الديناميكية](/guide/essentials/component-basics#dynamic-components) باستخدام عنصر `<component>` الخاص:

```vue-html
<component :is="activeComponent" />
```

افتراضيا، ستُفصل نسخة المكون النشط عند التبديل عنه. سيؤدي ذلك إلى فقدان أي حالة غُيِّرت عند عرض هذا المكون مرة أخرى، ستنشأ نسخة جديدة من المكون مع حالته الأولية فقط.

في المثال أدناه، لدينا مكونين ذوي حالة - يحتوي المكون A على عداد، بينما يحتوي B على رسالة متزامنة مع إدخال عبر `v-model`. حاول تحديث حالة أحدهما، والتبديل عنه، ثم الرجوع مرة أخرى إليه:

<SwitchComponent />

ستلاحظ أنه عند الرجوع إليه، سيُعاد تعيين الحالة السابقة التي غُيِّرت.

إن إنشاء نسخة جديدة من المكون عند التبديل هو سلوك مفيد عادة، لكن في هذه الحالة، نود حقا أن يحتفظ بنسختين من المكون حتى عندما تكونا غير نشطتين. لحل هذه المشكلة، يمكننا تغليف المكون الديناميكي بمكون `<KeepAlive>` المدمج:

```vue-html
<!-- المكونات غير النشطة ستُخزن مؤقتا! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

الآن، سيحتفظ بالحالة عبر التبديل بين المكونات:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNqtU81u1DAQfhXLly3ablxxjNKIXY7cOPuSTby7Lv6T7aRUq5z4EeJFKg6oQpx4k+RtGDshbFpUVMEpmZlvvhl/M3PEa2OSpmY4xZkrLTceOeZrk1PFpdHWoyNyh0IIff2a7VCLdlZLtICMxYR4qaVZj4GERCtQzgGbGWAzAqgqtXIelbW1THl0eVLsLDI9oyojQ2fQExieSSMKz8BCKKt4g0pROHdJccWkpjj6ISKKLRN5xpWpPfI3hgHCFhUHCGpWUldMgGcsDL60KUQdQLEsOEiO1hkZaP4H52bg3NzjfMWYWQveDA+KrhLQWgU9Uh4eNhHmGZliv/LJnCAjIAn8ZeREKHyOh1GsZGGSK6cVzPsY4HQMOIpTFD3BB8MJNsUH741LCXG7MkzsyiXa7gn8JbZWnkuWMCdXW6uvHbNATPH5CQcBZ8PsCpqvmGX2Mc570Ae8gbalqoWnTBv22NLaB9s67ZqG1mHTAHF28Zf1Mnl327/vP/Tv+k/9RxSM7mt0fU7DdoSSAHOmUMj5GxFmLQu752pl+f7gU/T8wryFwcXMH91dd9vdgdDHsYu2heqQPNBsa++1Qi9Kwcs3Ye4Bs1xC+jIjQ/APk53u6WlyDGJItx+lWCz+RQvY6qdp8a37Hr9fohqhjbkWw439PipAxNuev779CQyxulo=)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNqtVEtu2zAQvcqAG7ewLQZdCqpRu8teQRtaoh2m4gck5SYwvOoHRS8SdFEERVe9iXybDklbrdwggZEAhqUZvnkk37zRlsyNyTYtJzkpXGWF8bNSCWm09fBWSzOHldUSRhmNUYCOBoDFALA4AABKxa8jqOYr1jYetiFbIUYrrrzLYZs2mBxodpMAqJlnL14mMIDlvrXqGGF5ay0W5zCKpXEjgF144B/+CtpfAgPPpWmY5xgBFLXYQNUw516XpOZSlyTmcaVhS97MCqFM68HfGI4Iy2qBENhMpa55g5nD5iHHmjZg4iEwpjOYFzSxPAPlIlEuTijfcW7mjdik68RULyfkIlyr55sVtF871tMhQUFREHwr6D8ykQlJvZ1KZrIrpxUaI8pfHhZcSbB1ibIk2O0Ql+TSe+NySt2qCha4cpm2a4pvmW2VF5Jn3Mnp0uoPjlskLkls94GDYnLD7RQPX3PL7UOcJ9D/eI9mwKv0lh24+z5fPmI7jXfI4eIsu5lZd7v/tP+8/7j/uv8CIeh+xNS3PNjFJJgzTIHzN03ovmR2LdTUivUl7vfqwlxjK2Pl7+6uu+3uUPptOg7sdrg7FieaZeu9VvCmakT1PjghYMZjLB8XNC3e0+t+ZJ8okHRrnMlHxvE8hdD95yn0s/sVn9+jRniiE4XSKP6dPUTEL8BQk90fzkvNng==)

</div>

:::tip ملاحظة
عند استخدامها في [قوالب الـDOM](/guide/essentials/component-basics#dom-template-parsing-caveats)، يجب إشارة إليها باستخدام `<keep-alive>`.
:::

## التضمين / استبعاد {#include-exclude}

افتراضيا، ستخزن أي نسخة للمكون داخل `<KeepAlive>`، ويمكننا تخصيص هذا السلوك عبر التوابع `include` و `exclude`. يمكن أن تكون كلتا الخاصيتين عبارة عن سلسلة نصية مفصولة بفواصل، تعبير نمطي `RegExp`، أو مصفوفة تحتوي كلا النوعين:

```vue-html
<!-- سلسلة نصية مفصولة بفواصل -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- تعبير نمطي (استخدم `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- مصفوفة (استخدم `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

يُتحقق من التطابق عبر خيار [`name`](/api/options-misc#name) للمكون، لذا يجب على المكونات التي تحتاج إلى التخزين الشرطي عبر `KeepAlive` التعريف بخيار `name` بشكل صريح.

:::tip ملاحظة
من الإصدار 3.2.34، سيتم تلقائيا تحديد خيار `name` للمكون المستخدم في `<script setup>` بناءً على اسم الملف، مما يزيل الحاجة إلى تعريف الاسم يدويا.
:::

## الحد الأقصى للنسخ المخزنة {#max-cached-instances}

يمكننا تحديد الحد الأقصى لعدد النسخ المخزنة عبر خاصية `max`. عند تحديد `max`، ستتصرف `<KeepAlive>` كـ[ذاكرة تخزين مؤقت](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>): إذا كان عدد النسخ المخزنة قريبًا من الوصول إلى الحد الأقصى المحدد، ستُفصل النسخة الأقدم المخزنة لإنشاء مساحة للنسخة الجديدة.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## دورة حياة النسخة المخزنة {#lifecycle-of-cached-instance}

عندما  تُزال نسخة للمكون من الـDOM ولكنها عبارة عن جزء من شجرة مكونات مخزنة بواسطة `<KeepAlive>`، ستتحول إلى حالة **خاملة** بدلاً من إزالتها من الـDOM. عندما تُضاف نسخة للمكون إلى الـDOM كجزء من شجرة مكونات مخزنة، ستتحول إلى حالة **مفعلة**.

<div class="composition-api">

مكون مخزن يمكنه تسجيل دوال دورة حياة لهذين الحالتين باستخدام [`()onActivated`](/api/composition-api-lifecycle#onactivated) و[`()onDeactivated`](/api/composition-api-lifecycle#ondeactivated):

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // يستدعى عند الوصل 
  // وكل مرة يتم إدراجه من الذاكرة المؤقتة
})

onDeactivated(() => {
  // يستدعى عند إزالته من الـDOM إلى الذاكرة المؤقتة
  // وكذلك عند إزالته
})
</script>
```

</div>
<div class="options-api">

مكون مخزن يمكنه تسجيل دوال دورة حياة لهذين الحالتين باستخدام دوال [`activated`](/api/options-lifecycle#activated) و[`deactivated`](/api/options-lifecycle#deactivated):

```js
export default {
  activated() {
    // يستدعى عند الوصل 
    // وكل مرة يتم إدراجه من الذاكرة المؤقتة
  },
  deactivated() {
    // يستدعى عند إزالته من الـDOM إلى الذاكرة المؤقتة
    // وكذلك عند إزالته
  }
}
```

</div>

تجدر الإشارة إلى:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span> يستدعى أيضًا عند الوصل، و<span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span> عند الفصل.

- تعمل كل من الدوال على جذر المكون المخزن بواسطة `<KeepAlive>`، ولكنها تعمل أيضًا على المكونات الفرعية في شجرة المكونات المخزنة.

---

**ذات علاقة**

- [ مرجع الواجهة البرمجية لـ`<KeepAlive>`](/api/built-in-components#keepalive)
