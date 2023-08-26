# التوجيه {#routing}

## التوجيه من جانب الخادوم مقابل التوجيه من جانب المستخدم {#client-side-vs-server-side-routing}

التوجيه من جانب الخادوم يعني أن الخادوم يرسل إجابة استنادًا إلى مسار URL الذي يزوره المستخدم. عندما ننقر على رابط في تطبيق ويب معروض من قبل الخادوم التقليدي ، يتلقى المتصفح إجابة HTML من الخادوم ويعيد تحميل الصفحة بأكملها مع HTML الجديد.

لكن في [التطبيق أحادي الصفحة](https://developer.mozilla.org/en-US/docs/Glossary/SPA) (SPA) ، يمكن لـ JavaScript من جانب المستخدم اعتراض التنقل بين الصفحات، جلب البيانات الجديدة بشكل ديناميكي ، وتحديث الصفحة الحالية دون إعادة تحميلها بالكامل. وعادة ما يؤدي هذا إلى تجربة مستخدم أسرع، خصوصًا لحالات الاستخدام التي تشبه  "التطبيقات" الحقيقية، حيث يُتوقع من المستخدم أن يقوم بالعديد من التفاعلات على مدى فترة طويلة من الوقت.

في هذه التطبيقات أحادية الصفحة، يكون "التوجيه" على جانب المستخدم في المتصفح. يتولى موجه من جانب المستخدم إدارة عرض التطبيق المُصيّر باستخدام واجهات برمجة التطبيقات للمتصفح مثل [ واجهة History ](https://developer.mozilla.org/en-US/docs/Web/API/History) أو [الحدث `hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event).

## الموجه الرسمي {#official-router}

<!-- TODO update links -->
<div>
  <VueSchoolLink href="https://vueschool.io/courses/vue-router-4-for-everyone" title="درس مجاني حول الموجه">
    شاهد درس فيديو مجاني على Vue School
  </VueSchoolLink>
</div>

 Vue ملائم بشكل جيد لبناء التطبيقات أحادية الصفحة. و التي يُوصى فيها باستخدام [مكتبة الموجه الرسمية](https://github.com/vuejs/router). لمزيد من التفاصيل ، اطلع على [توثيق](https://router.vuejs.org/) موجه Vue.

## توجيه بسيط من الصفر {#simple-routing-from-scratch}

إذا كنت بحاجة فقط إلى توجيه بسيط جدًا ولا ترغب في تضمين مكتبة موجه متكاملة الوظائف ، يمكنك القيام بذلك باستخدام [المكونات الديناميكية](/guide/essentials/component-basics#dynamic-components) وتحديث حالة المكون الحالي عن طريق استماع إلى [الأحداث من جانب المستخدم](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) أو باستخدام [واجهة History](https://developer.mozilla.org/en-US/docs/Web/API/History).

  هنا مثال بسيط:

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">الرئيسية</a> |
  <a href="#/about">حول</a> |
  <a href="#/non-existent-path">رابط غير موجود</a>
  <component :is="currentView" />
</template>
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9U81q20AQfpVhe5ANtraBnIxtyKGlh1J66qXbw0ZaRwrWrthd2QXbh0IKoQ/SNNBQTCmFPMnqbTIryYp/RA7Cntnv+2b2m9kVucjzcFEIMiJjE+k0t2CELfIpk2mWK21hBVrMBhCpLC+siGEDM60yCJAUtKB3KhNNPqQ+8JrPxxeXqrDteRUdAj4o+1YVMm4xu0QDYzJS0ljQyBQGJrBiEiCgwagqPagj7oUxVRVgcvPMiwqthbQfuU2QjBfqLVMZq2U4VxG3qZJhwk3S94TmgMfxmwVS3qfGCil0L/CIKOHySgQD6PVhMq272NMOF3xeCKzQpY4NVQUOOvqUiiXid+729nQ1zkHL5sqfT6qEZp5GonfWh/XaO/HF/+5sq2uNaT1SHCYGVmT5nFuBEcCYQ4I2TBh5RRmZurvyxm3dz/KH+4vf/ZjyKayPgZW/Hv1Q3pY33Rip5FB8rUyzwxy79fitu3O/3H9wjyi+hfJ7eet+4/fHa1QK3gAlkQOj1KDQnj2MAEXQmLYXIANS780w43l4bZTE9a08Y82BYWRUu+hzuEM+ZiSxNjcjSs0s8ot1bUKlryj+C3UhbYprK0w2vNRqaYRGYUaqzWo0KCYXQg+xsVhooV/SPIKe6HpZ3M8NXmX3XPwTPJxRclYP5l/5zT24ezidEiKOnWlfV7deM7oO4v6T6+Sevz7vIG6eAOSulMs=)

</div>

<div class="options-api">

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <a href="#/">الرئيسية</a> |
  <a href="#/about">حول</a> |
  <a href="#/non-existent-path">رابط غير موجود</a>
  <component :is="currentView" />
</template>
```

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9U81q20AQfpVhe5ANtraBnIRsyKGlh1J66qXbw0ZaRwrWrthd2YHYtxRCH6RpoaWYHgp9EultOrv6ieOIHvQzu9988/PN3JKLsgw3lSARiU2i89IumcyLUmkLb1QhYKVVAUFIneGAwXB9cakqO9x76yngnbKvVSXTAdMfdDAmEyWNBY2ewsACbpkECGgQ+dCz1uKOGI98ACb3zk/c+ACpWPFqbVu/lFs+mbb/AFrYSsveAkgqrYW077nNItjmMlXbcK0SbnMlw4ybrAUiO7585EQVJeaVRj1JR/EhF9vHOEOktoiPNstNeBQsNOs8EZOzKex2rrRP7tv34VnMAk8x5CN9lylP01cbZHybGyuk0JPApZxkXF6JYAaIXyydC7PMApzmgJ0dr9jB91Mf3jc2psMIoGFFUa65FWgBxBwyLVYLRl5QRpb1Q3NXH+qvzZf6Nz7fY8qXsDsFeukc+mdz39yNY6SSc3Hj67LzErN1+EP9UH+r/0D9F8kP0Hxu7usf+PxyHJ7BqaMk+kCUGyQ6EocRoAiK6VAAmZF2JOcFL8NroySOu+8w6y4MI4POjOB4OpuRzNrSRJSaVeJm9tqESl9R/As1CpXjRghTzC+12hqhkZgRL2PHQfFwI/QcE0uFFvp/nCfQZ7y9SFhKv4luZZ9qlJ2NCIOHp80YdnWcolNrxPF4gUd9z1+ejzju/wFCT5Y/)

</div>
