# إنشاء تطبيق باستخدام Vue

---
أي مشروع Vue بيبدأ بـ **Application Instance**، وده بنعمله عن طريق `createApp()` من مكتبة Vue.

```js
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

هنا إحنا أنشأنا الـ app نفسه، لكن لسه مش بيعرض حاجة على الشاشة.

---

## **2. Root Component**

الـ object اللي بتحطه جوه `createApp()` ده في الحقيقة **Component**، وده بيكون **Root Component** (المكون الأساسي).

* أي Vue App لازم يكون له Root Component.
* الـ Root Component ممكن يحتوي Components تانية (nested components).

لو شغال بـ **Single-File Components** (الملفات `.vue`) هتعمل import للـ root component:

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

مثال على شجرة مكونات (Component Tree) لتطبيق Todo:

```
App (root)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

دي طريقة Vue في تقسيم الكود لمكونات صغيرة وقابلة لإعادة الاستخدام.

---

## **3. Mounting the App**

الـ Application مش هيعرض أي حاجة غير لما تعمل `.mount()` وتحدد العنصر اللي هيركب فيه:

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

* المحتوى اللي جوه Root Component هيتحط جوا الـ container ده.
* الـ container نفسه مش جزء من الـ Vue App.
* `.mount()` لازم تتنفذ **بعد** أي إعدادات أو تسجيلات assets.

---

## **4. In-DOM Root Component Template**

ممكن تكتب الـ template مباشرة جوا الـ HTML بدل ما يكون جوه ملف `.vue`:

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return { count: 0 }
  }
})

app.mount('#app')
```

Vue هتستخدم الـ innerHTML كـ template لو الـ Root Component مفيهوش template.
ده مفيد لما:

* تستخدم Vue بدون build step (زي CDN).
* أو مع server-side frameworks.

---

## **5. App Configurations**

الـ Application Instance عنده `.config` عشان تضبط إعدادات على مستوى التطبيق كله، زي:

```js
app.config.errorHandler = (err) => {
  /* handle error */
}
```

كمان تقدر تسجل Components أو أصول (assets) على مستوى التطبيق:

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

أي مكون تسجله هنا هيكون متاح في أي مكان في الـ app.

---

## **6. Multiple Application Instances**

مش لازم يكون عندك Vue app واحد في الصفحة. ممكن تعمل أكتر من app:

```js
const app1 = createApp({ /* ... */ })
app1.mount('#container-1')

const app2 = createApp({ /* ... */ })
app2.mount('#container-2')
```

مفيد لما:

* تضيف Vue على أجزاء محددة من صفحة كبيرة.
* بدل ما تتحكم في الصفحة كلها، تتحكم في عناصر معينة.

---

💡 **الخلاصة**:

* `createApp()` → بيعمل instance للتطبيق.
* Root Component → الأساس اللي كل حاجة هتبني عليه.
* `.mount()` → بيقول لـ Vue فين تحط الـ app في الـ DOM.
* `.config` و `.component()` → إعدادات وأصول على مستوى التطبيق.
* ممكن تعمل أكتر من app في نفس الصفحة.
