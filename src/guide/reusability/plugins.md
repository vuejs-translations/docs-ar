# الملحقات {#plugins}

## مقدمة {#introduction}

الملحقات هي عبارة عن شيفرة مستقة تضيف عادةً وظائف على مستوى التطبيق إلى Vue. هذه هي طريقة تثبيت ملحق:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* خيارات اختيارية */
})
```

يُعرَّف الملحق على أنه إما كائن يعرض التابع  `()install` أو مجرد دالة تتصرف بنفسها كدالة تثبيت. تتلقى دالة التثبيت [نسخة التطبيق](/api/application) بالإضافة إلى خيارات إضافية مرسلة إلى `()app.use` ، إذا توفرت:

```js
const myPlugin = {
  install(app, options) {
    // تهيئة التطبيق
  }
}
```

لا يوجد نطاق محدد بالضبط للملحق، ولكن السيناريوهات الشائعة التي تكون الملحقات مفيدة فيها تشمل:

1. تسجيل مكون أو مجموعة مكونات أو موجهات مخصصة باستخدام [`app.component()`](/api/application#app-component) و [`app.directive()`](/api/application#app-directive).

2. جعل مورد ما [قابلاً للحقن](/guide/components/provide-inject) في جميع أنحاء التطبيق من خلال استدعاء [`()app.provide`](/api/application#app-provide).

3. إضافة بعض الخاصيات أو التوابع العامة لنسخة التطبيق من خلال إرفاقها بـ [`app.config.globalProperties`](/api/application#app-config-globalproperties).

4. مكتبة تحتاج إلى تنفيذ بعض التركيبات المذكورة أعلاه (على سبيل المثال [vue-router](https://github.com/vuejs/vue-router-next)).

## كتابة ملحق {#writing-a-plugin}

من أجل فهم أفضل لكيفية إنشاء ملحقات Vue.js الخاصة بك، سنقوم بإنشاء إصدار مبسط جدًا من ملحق يعرض السلاسل النصية لـ`i18n` (الإختصار لـ [تدويل (Internationalization)](https://en.wikipedia.org/wiki/Internationalization_and_localization)).

لنبدأ بإعداد كائن الملحق. يُفضَّل إنشاءه في ملف منفصل وتصديره، كما هو موضح أدناه للحفاظ على تجميع الشيفرة والفصل بينها.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // هنا شيفرة الملحق 
  }
}
```

نريد إنشاء دالة ترجمة. ستتلقى هذه الدالة سلسلة نصية `key` مفصولة بنقطة، والتي سنستخدمها للبحث عن السلسلة المترجمة في خيارات المستخدم. هذا هو الاستخدام المقصود في القوالب:

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

نظرًا لأن هذه الدالة يجب أن تكون متاحة على جميع القوالب، سنجعلها متاحة على مستوى النسخة من خلال إرفاقها بـ `app.config.globalProperties` في ملحقنا:

```js{4-11}
// plugins/i18n.js
export default {
  install: (app, options) => {
    // احقن بشكل عام دالة $translate()
    app.config.globalProperties.$translate = (key) => {
      // استرجاع خاصية متداخلة في `options`
      // باستخدام `key` كمسار
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

الدالة `translate$` ستأخذ سلسلة نصية مثل `greetings.hello`، وستبحث في الإعدادات الموفرة  وستعيد القيمة المترجمة.

يجب إرسال كائن يحتوي على مفاتيح الترجمة إلى الملحق خلال التثبيت عبر وسائط إضافية لـلتابع `()app.use`:

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'مرحبا!'
  }
})
```

الآن، سيستبدل التعبير الأولي `translate('greetings.hello')$` بـ `مرحبا!` عند تشغيل التطبيق.

اطلع أيضا على: [تعزيز الخاصيات العامة](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

:::tip ملاحظة
استخدم الخاصيات العامة في حالة الضرورة فقط، لأنه يمكن أن يصبح الأمر مربكًا بسرعة إذا استخدمت العديد من الخاصيات العامة المدخلة من قبل ملحقات مختلفة مستخدمة عبر التطبيق.
:::

### الحقن/التزويد عبر الملحقات {#provide-inject-with-plugins}

الملحقات تسمح لنا أيضًا باستخدام `inject` لتزويد دالة أو سمة لمستخدمي الملحق. على سبيل المثال، يمكننا السماح للتطبيق بالوصول إلى الوسيط `options` لكي يتمكن من استخدام كائن الترجمات.

```js{10}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.provide('i18n', options)
  }
}
```

سيتمكن مستخدمو الملحق الآن من إدخال خيارات الملحق في مكوناتهم باستخدام مفتاح `i18n`:

<div class="composition-api">

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

</div>
<div class="options-api">

```js
export default {
  inject: ['i18n'],
  created() {
    console.log(this.i18n.greetings.hello)
  }
}
```

</div>
