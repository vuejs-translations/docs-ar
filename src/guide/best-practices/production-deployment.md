# نشر الإنتاج {#production-deployment}

## التطوير مقابل الإنتاج {#development-vs-production}

أثناء التطوير ، يوفر Vue عددًا من الميزات لتحسين تجربة التطوير:

- العطف بين الأخطاء و العثرات الشائعة
- الخاصيات / التحقق من صحة الأحداث
- [خطافات تصحيح الأخطاء التفاعلية](/guide/extras/reactivity-in-depth#reactivity-debugging)
- أدوات التطوير المدمجة

ومع ذلك ، تصبح هذه الميزات عديمة الفائدة في الإنتاج. يمكن أن تتحمل بعض فحوصات التحذير أيضًا قدرًا صغيرًا من نفقات الأداء. عند النشر في الإنتاج ، يجب أن نتخلى عن جميع فروع التعليمات البرمجية غير المستخدمة، والمصممة للتطوير فقط للحصول على حجم حمولة أصغر وأداء أفضل.

## بدون أدوات البناء {#without-build-tools}

إذا كنت تستخدم Vue بدون أداة بناء عن طريق تحميلها من CDN أو برنامج نصي مستضاف ذاتيًا ، فتأكد من استخدام بنية الإنتاج (ملفات dist التي تنتهي بـ `.prod.js`) عند النشر في الإنتاج. تُصغر إصدارات الإنتاج مسبقًا مع إزالة جميع فروع التعليمات البرمجية المخصصة للتطوير فقط.

- في حالة استخدام عملية بناء عامة (بواسطة الكائن العام لـ `Vue`): استخدم`vue.global.prod.js`.
- في حالة استخدام إصدار ESM (بواسطة عمليات استيراد ESM الأصلية): استخدم `vue.esm-browser.prod.js`.

راجع [دليل ملف dist](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) لمزيد من التفاصيل.

## مع أدوات البناء {#with-build-tools}

المشاريع المنشأة عبر `create-vue` (المستند على Vite) أو Vue CLI (المستند على webpack) مهيأة مسبقًا لإصدارات الإنتاج.

إذا كنت تستخدم إعدادًا مخصصًا ، فتأكد من:

1. ينتقل `vue` إلى `vue.runtime.esm-bundler.js`.
2. تهيئة [شارات التصريف](/api/compile-time-flags) بشكل صحيح.
3. <code>process.env<wbr>.NODE_ENV</code> يستبدل بـ `"production"` أثناء البناء.

مراجع إضافية:

- [دليل عملية البناء للانتاج في Vite](https://vitejs.dev/guide/build.html)
- [دليل النشر في Vite](https://vitejs.dev/guide/static-deploy.html)
- [دليل النشر في Vue CLI](https://cli.vuejs.org/guide/deployment.html)

## تتبع أخطاء وقت التشغيل {#tracking-runtime-errors}

يمكن استخدام [معالج الأخطاء على مستوى التطبيق](/api/application#app-config-errorhandler) للإبلاغ عن الأخطاء لخدمات التتبع:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // الإبلاغ عن خطأ لخدمات التتبع
}
```

توفر خدمات مثل [Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) و [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) أيضًا اندماجات رسمية لـ Vue.
