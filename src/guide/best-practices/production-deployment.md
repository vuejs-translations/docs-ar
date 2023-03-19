# نشر الإنتاج {#production-deployment}

## التطوير مقابل الإنتاج {#development-vs-production}

أثناء التطوير ، يوفر Vue عددًا من الميزات لتحسين تجربة التطوير:

- تحذير من الأخطاء العثرات الشائعة
- الخاصيات / التحقق من صحة الأحداث
- [خطافات تصحيح الأخطاء التفاعلية](/guide/extras/reactivity-in-depth.html#reactivity-debugging)
- مدمج Devtools

ومع ذلك ، تصبح هذه الميزات عديمة الفائدة في الإنتاج. يمكن أن تتحمل بعض فحوصات التحذير أيضًا قدرًا صغيرًا من نفقات الأداء. عند النشر في الإنتاج ، يجب أن نتخلى عن جميع فروع التعليمات البرمجية غير المستخدمة، والمصممة للتطوير فقط للحصول على حجم حمولة أصغر وأداء أفضل.

## بدون أدوات البناء {#without-build-tools}

إذا كنت تستخدم Vue بدون أداة إنشاء عن طريق تحميلها من CDN أو برنامج نصي مستضاف ذاتيًا ، فتأكد من استخدام بنية الإنتاج (ملفات dist التي تنتهي بـ `.prod.js`) عند النشر في الإنتاج. يتم تصغير إصدارات الإنتاج مسبقًا مع إزالة جميع فروع التعليمات البرمجية للتطوير فقط.

- في حالة استخدام global build (بواسطة `Vue` global): استخدم`vue.global.prod.js`.
- في حالة استخدام إصدار ESM (بواسطة عمليات استيراد ESM الأصلية): استخدم `vue.esm-browser.prod.js`.

راجع [دليل ملف dist](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) لمزيد من التفاصيل.

## مع أدوات البناء {#with-build-tools}

يتم تكوين المشاريع التي يتم سقلها عبر `create-vue` (استنادًا إلى Vite) أو Vue CLI (استنادًا إلى webpack) مسبقًا لإصدارات الإنتاج.

إذا كنت تستخدم إعدادًا مخصصًا ، فتأكد من:

1. ينتقل `vue` إلى `vue.runtime.esm-bundler.js`.
2. تهيئ [علامات ميزة وقت التجميع](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags) بشكل صحيح.
3. <code>process.env<wbr>.NODE_ENV</code> يتم استبداله بـ `"production"` أثناء الإنشاء.

مراجع إضافية:

- [دليل إنتاج بناء Vite](https://vitejs.dev/guide/build.html)
- [دليل نشر Vite](https://vitejs.dev/guide/static-deploy.html)
- [دليل نشر Vue CLI](https://cli.vuejs.org/guide/deployment.html)

## تتبع أخطاء وقت التشغيل {#tracking-runtime-errors}

يمكن استخدام [معالج الأخطاء على مستوى التطبيق](/api/application.html#app-config-errorhandler) للإبلاغ عن الأخطاء لخدمات التتبع:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // الإبلاغ عن خطأ لخدمات التتبع
}
```

توفر خدمات مثل [Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) و [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) أيضًا اندماجات رسمية لـ Vue.
