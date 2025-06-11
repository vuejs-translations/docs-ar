<script setup>
import ElasticHeader from './demos/ElasticHeader.vue'
import DisabledButton from './demos/DisabledButton.vue'
import Colors from './demos/Colors.vue'
import AnimateWatcher from './demos/AnimateWatcher.vue'
</script>

# تقنيات التحريك {#animation-techniques}

توفر Vue مكونات [`<Transition>`](/guide/built-ins/transition) و [`<TransitionGroup>`](/guide/built-ins/transition-group) للتعامل مع انتقالات الدخول / الخروج وانتقالات القوائم. ومع ذلك ، هناك العديد من الطرق الأخرى لاستخدام التحريكات على الويب ، حتى في تطبيق Vue. هنا سنناقش بعض التقنيات الإضافية.

## التحريكات المعتمدة على الأصناف{#class-based-animations}

بالنسبة للعناصر التي لا تدخل / تخرج من الـDOM، يمكننا تشغيل التحريكات عن طريق إضافة صنف CSS بشكل ديناميكي:

<div class="composition-api">

```js
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    warnDisabled() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    }
  }
}
```

</div>

```vue-html
<div :class="{ shake: disabled }">
  <button @click="warnDisabled">اضغط على الزر</button>
  <span v-if="disabled">هذه الميزة معطلة!</span>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

<DisabledButton />

## التحريكات المعتمدة على الحالة {#state-driven-animations}

يمكن تطبيق بعض تأثيرات الانتقال عن طريق اقحام القيم ، على سبيل المثال عن طريق ربط النمط بعنصر أثناء حدوث تفاعل. خذ هذه الشيفرة على سبيل المثال:

<div class="composition-api">

```js
const x = ref(0)

function onMousemove(e) {
  x.value = e.clientX
}
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      x: 0
    }
  },
  methods: {
    onMousemove(e) {
      this.x = e.clientX
    }
  }
}
```

</div>

```vue-html
<div
  @mousemove="onMousemove"
  :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  class="movearea"
>
  <p>حرك مؤشر الفأرة عبر هذا العنصر...</p>
  <p>x: {{ x }}</p>
</div>
```

```css
.movearea {
  transition: 0.3s background-color ease;
}
```

<Colors />

بالإضافة إلى اللون ، يمكنك أيضًا استخدام ربط النمط لتحريك التحويل ، العرض أو الارتفاع. يمكنك حتى تحريك مسارات SVG باستخدام الفيزياء النابضية - بعد كل شيء ، فهي جميعًا ربط بيانات يالسمات:

<ElasticHeader />

## التحريك بالدوال المراقبة {#animating-with-watchers}

ببعض الإبداع ، يمكننا استخدام الدوال المراقبة لتحريك أي شيء بناءً على بعض الحالة العددية. على سبيل المثال ، يمكننا تحريك الرقم نفسه:

<div class="composition-api">

```js
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'

const number = ref(0)
const tweened = reactive({
  number: 0
})

// Note: For inputs greater than Number.MAX_SAFE_INTEGER (9007199254740991),
// the result may be inaccurate due to limitations in JavaScript number precision.
watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
})
```

```vue-html
اكتب رقما: <input v-model.number="number" />
<p>{{ tweened.number.toFixed(0) }}</p>
```

</div>
<div class="options-api">

```js
import gsap from 'gsap'

export default {
  data() {
    return {
      number: 0,
      tweened: 0
    }
  },
  // Note: For inputs greater than Number.MAX_SAFE_INTEGER (9007199254740991),
  // the result may be inaccurate due to limitations in JavaScript number precision.
  watch: {
    number(n) {
      gsap.to(this, { duration: 0.5, tweened: Number(n) || 0 })
    }
  }
}
```

```vue-html
اكتب رقما: <input v-model.number="number" />
<p>{{ tweened.toFixed(0) }}</p>
```

</div>

<AnimateWatcher />

<div class="composition-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9U82O0zAQfpWRL9uV2mTFiktIiwAtEhwWBBx9SZNp6t3EtmynLXRzAfEsi7jxNu3bMHZ+uqDVXprxzHzffP7G3bNXWkebBlnCUpsboR1YdI1ecClqrYyDPRhcTekny53Y4BS2mcvX0MLKqBrOCHs29pY2033eh1TgMlfSOpBNvUQDc082uTgf0m6LKLEI+Y5/sucS+vYELrhsqZnLMHRyKk19OJHnMF9AQEAYHjk16TmnpLxoTOaEkkQUPZ+OrNfh69F3d3ABfgJAyyV907hzge5PB4e1rjKHdAJIC7GBvMqsnXNWYK04g0IYOhhXcRZ6AA73xx+H34dfcPhz/H78ebhPIBVSNw42s1oVWEWdCoJ1AbHEPTbVI/9SlLOhvtjvB6N6MF3zrdhhQU5C26axXxfBY1JIURo/0E1H675WPoxOpJ1nKyXdbIuiXLsElqoqXoxZK75hAs+wphQ5Q7b0JGzKumXParL7xipJTyew8b5gOUuGnXDmt+ITnK2d0zaJ40bq2zLKVR372ksypamQs34HLQ1wll7HSpT/0RNEiwrNB+13+u+YrKrU9n3IOdNgeB4Bs8b89pH8jd11qj4atGg2JGCsucyU6Lry1edr3FE8Fge5TxQ/oVVV4zV2ba8bWZDsB31B7bvglpDlF3u1cyjtcCkvNLgR+jmjv9ibJ65+knsZXY4utn8B1lpQPQ==)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://play.vuejs.org/#eNp9U8GO0zAQ/ZWRL9tKbVKx4hLCIkCLBIcFAUdf0mSaetexLXvSFrq5gPiWRdz4m/RvcOImLQitVKkz73me38w4e/bSmGhTI0tY6nIrDF1xJSqjLUHpMgMrqyu46MILrrjCXU8VuMpqSbDnCqDIKJtMQwxgkWqrhgxA1dUSbQKL2YDQFlFh4aGANN1f09PbjPJ1MhSH0okataH3FJGe0Fq4GeyhqG1GQisvFj2dnaRvxtL7e1hAMz2/iiv/S+OxX58QVkZmhD4DSAuxgVxmzj3nrMBKcwaFsD6xJDnrzwC0D4fv7a/2J7S/D98OP9qHBFKhTE2wmVe6QBkF/74sBF4lPtamZtRfinI+8Ff7/dCCb/KN2GExWUyhadLYBGext+ajND4z7FNHX2QXRie1MLOVVjTfoijXlMBSy+LZiDrxFRN4gpWHwjx6ETZjYf/zyo/61mnl30avxY+E42xcEWfdRjqAszWRcUkc18rclVGuq7jjXvhZ1BI5G0bvLyCXa7US5T/yvsQIifa96Vb69zWZlHr7rsfI1nh8TL5mjfndf/BbtwuuPlh0aDfewMhRZkukQF9/usGdj0dysPsI+RGdlnXnMRx7VavC2z4717t9209LqPKzu94RKjc01Rk9vXnO/Pf3+pHWT3Yvo8txis0fyDw/iw==)

</div>
