---
outline: deep
---

<script setup>
import { ref } from 'vue'
const message = ref('')
const multilineText = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelected = ref([])
</script>

# ربط إدخالات النموذج {#form-input-bindings}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="درس مجاني حول إدخالات المستخدم"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="درس مجاني حول إدخالات المستخدم"/>
</div>

عند التعامل مع النماذج في الواجهة الأمامية،  عادة ما نحتاج إلى مزامنة حالة عناصر إدخال النموذج مع الحالة المطابقة في شيفرة الـJavaScript. قد يكون مزعجًا ربط الاتصال يدويًا بين القيم و متغيرات مستمعي أحداث الإدخال:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

السمة الموجهة `v-model` تساعدنا على تبسيط الشيفرة السابقة إلى:

```vue-html
<input v-model="text">
```

على غرار ذلك، يمكن استخدام `v-model` على عناصر `<input>` من أنواع مختلفة، `<textarea>` ، و `<select>` .  يوسع تلقائيًا إلى مختلف خاصيات وأحداث الـDOM  بناءً على العنصر الذي يُستخدم عليه :

* `<input>` مع أنواع النصوص وعناصر `<textarea>` تستخدم خاصية `value` وحدث `input`؛
* `<input type="checkbox">` و `<input type="radio">` تستخدم خاصية `checked` وحدث `change`؛
* `<select>` تستخدم `value` كخاصية و `change` كحدث.

::: tip ملاحظة
سيتجاهل `v-model` القيم الأولية للخاصيات `value` ، `checked` أو `selected` التي توجد على أي عنصر من عناصر النموذج. سيتعامل دائمًا مع الحالة المرتبطة بـJavaScript الحالية كمصدر للحقيقة. يجب عليك تعريف القيمة الأولية من جانب الـJavaScript، باستخدام <span class="options-api">خيار `data` </span><span class="composition-api"> واجهة الدوال التفاعلية مثل `ref` أو `reactive` </span>.
:::

## الاستخدام الأساسي {#basic-usage}

### النص {#text}

```vue-html
<p>الرسالة: {{ message }}</p>
<input v-model="message" placeholder="حرر رسالة" />
```

<div class="demo">
  <p>الرسالة :  {{ message }}</p>
  <input v-model="message" placeholder="حرر رسالة" />
</div>

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kE1OwzAQha8y8iYgNfE+SitxD29KOmlTxT+accIi8o67IBYsKi4TbsO4rQoCqSt7np++5zezegqhmkZUtWq4pT5EYIxj2BjX2+ApwgyEHSToyFsoxFoYZ1zrHUewyLzdI6yz56EoHo1r9AUjABki2jBsI8oE0ITN8vb1upyWz/P5DjXAPN8oKTU6B4uzd2GMMJXW73BYG3W1GAWCa/Hghx2S6MuH0E7wgxSHFkSjb8lqpS5NSrsN1ZG9k65zTjHXBzaqhrOSNWmYZ6MOMQauteauzRs6cuVpr+VW0ehib7FCtuUz+RdGErBRq18MLeKEVBI6+SrSPeYf6z9uxibjkkrfEBKhBw==)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kE1qwzAQha8yzCYtxNbeuIHeQxs1niQO1g8j2S0Y73qX0kUXoZdxb9NxHKelhYCQ5o0en/Smx8cQ8q4lLLCMW65D2mhHL8Fzgop2pm0S9NoBVCaZu/u5BmBKLbtFAViK0eypgNVqbg3TIZusUl3BIhLZ0JhEogDKsBnfvl7H0/h5Pt+hAOj7BQfDUKowO2sX2gRdZn1FzYPGi0UjCG5LB99UxNIfP4R2gh+kOJQgSnV9GddY2ylhZk3Ij9E7SX+Ooi8XUWOxhNMo45m0xkNKIRZKxd12mtkx5p73SqqcW5dqSzlFmz2xf47EAta4/sVQ0uyIMyYnXyW+xfxj/cddpovDNzgHpN4=)

</div>

<span id="vmodel-ime-tip"></span>
::: tip ملاحظة
بالنسبة لللغات التي تتطلب [محرر أسلوب الإدخال IME](https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D9%84%D8%BA%D8%A9_%D8%A7%D9%84%D9%8A%D8%A7%D8%A8%D8%A7%D9%86%D9%8A%D8%A9_%D9%88%D8%A7%D9%84%D8%AD%D9%88%D8%A7%D8%B3%D9%8A%D8%A8#%D8%A5%D8%AF%D8%AE%D8%A7%D9%84_%D8%A7%D9%84%D9%86%D8%B5) ( مثل الصينية، اليابانية، الكورية إلخ.)، ستلاحظ أن `v-model` لا يحدث أثناء تحرير تركيبات الـIME. إذا كنت ترغب في الرد على هذه تحديثات أيضًا، استخدم مستمع حدث الـ`input`  وربط السمة `value` بالخاصية التفاعلية بدلاً من استخدام `v-model`.
:::

### النص متعدد السطور {#multiline-text}

```vue-html
  <span>رسالة متعددة السطور :</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="message" placeholder="إضافة سطور متعددة"></textarea>
```

<div class="demo">
  <span>رسالة متعددة السطور :</span>
  <p style="white-space: pre-line; ">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="إضافة سطور متعددة"></textarea>
</div>

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kU1qwzAQha8yaOMWYnvvOoHeQxvXmSQO1g/SJGkxXhRa6EVKSTclBFp6E+U2HeWnhBaCNpqnp09vRp24tTZbLlAUovS1ayyBR1rYkdSNssYRdOBwAj1MnFGQsDWRWuraaE+g0PtqijCMnqskuZa6zA8YBnBBqGxbEXIFUHpb6VHYhG142z2FNeyew3v4Dh+81rDXtuFr9xI2UDAmmhlCpQVPDy0OpVjNGsKUT2oswDpM20bjjRSjrvvN0vdlHuPzRcJ7qhxWsEyVGWPLhKNLCuBcNc5MO0bHengNn5zgMQY5hTiPx2+U+YnH9FgcWxMDcRhVqiqbzb3RPMwuNiyPB16KAvZK1HiEsZZiRmR9ked+UscvmPvMuGnOu8wtNDUKM/QqvXNm5dExWIrBGSNncYkudai5BXSXmH+s/7gR20vdi/4H9QvRuA==)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kdFKwzAUhl/lkJsprO19rQPfIzexPds62jQkp9uk9EJQ8EVE5o2MgeKbZG/jybbKUBgtSf6Tky9/zunEnTHxskWRiszltjQ0kRrXprEEBU5VWxF0UgMUitTV9XENYJFaqwcFUKNzaoYpjEbHUB8mHvjPkl8wC8LaVIowKILMGaUnfut3/m3/5Dewf/bv/tt/8LeBQ2znv/Yvfgspc0JyAGcGHD1UeCvFal4SRryT8+3GYlSVGm+kmHTd4Ar6PkvM8SDhmpRFBcuobgqsmHDKkgLYWI7zpirQcty/+k928BiMDCbO7fEdWTLwmB7E6W1iLMo61DCqlYkXrtFc30Ox5GnDSZEO5ZOCGxC0FHMi49IkcdM8dGXh4sbOEl7FttVU1hijq6N726wcWgZLMT5jJBxcoo0san4C2kvMP6n/uEP/RP8DYbzVHw==)

</div>

تجدر الملاحظة أن الاقحام النصي داخل `<textarea>` لن يعمل. استخدم `v-model` بدلاً من ذلك.

```vue-html
<!-- سيء -->
<textarea>{{ text }}</textarea>

<!-- جيد -->
<textarea v-model="text"></textarea>
```

### خانة الاختيار {#checkbox}

خانة اختيار وحيدة يعني ربطها مع قيمة منطقية واحدة :

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY2hlY2tlZCA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

يمكننا أيضًا ربط عدة خانات اختيار مع قيمة مصفوفة أو [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) :

<div class="composition-api">

```js
const checkedNames = ref([])
```

</div>
<div class="options-api">

```js
export default {
    data() {
        return {
            checkedNames: []
        }
    }
}
```

</div>

```vue-html
<div>الأسماء المحددة: {{ checkedNames }}</div>

<input type="checkbox" id="عبد العزيز" value="عبد العزيز" v-model="checkedNames">
<label for="عبد العزيز">عبد العزيز</label>

<input type="checkbox" id="ابراهيم" value="ابراهيم" v-model="checkedNames">
<label for="ابراهيم">ابراهيم</label>

<input type="checkbox" id="واثق" value="واثق" v-model="checkedNames">
<label for="واثق">واثق</label>
```

<div class="demo">
  <div>الأسماء المحددة: {{ checkedNames }}</div>

  <input type="checkbox" id="عبد العزيز" value="عبد العزيز" v-model="checkedNames">
  <label for="عبد العزيز">عبد العزيز</label>

  <input type="checkbox" id="ابراهيم" value="ابراهيم" v-model="checkedNames">
  <label for="ابراهيم">ابراهيم</label>

  <input type="checkbox" id="واثق" value="واثق" v-model="checkedNames">
  <label for="واثق">واثق</label>
</div>

في هذه الحالة ، ستحتوي مصفوفة الـ`checkedNames` دائمًا على قيم خانات الاختيار المحددة.

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNqVU0tu1EAQvUqpVyBl3IGlcUbiAlyAZuGxaxIH90fd7YHI8gYRgXILxGJACEVJVrlJ+zaptmcU56uMvHB93nv92q5q2XtjklWDLGWZK2xlPDj0jZkLVUmjrYcWLC6hg6XVEgQjrGDvhBKq0Mp5KI6w+Izlh1yig4OIffXx02sCZHzUIyVKPEpT5x4pA8jKagVlZQ8Es74WbCiO5XlY99/D73DVn4Z1+AUxpfB/OKfnbwpte/fErst4pMVDBo1KmcaDPzFI6gN0ob8KBlVJebgOf8L5IErhZX8WLqm1yusmop/ozqQusd6qbQ6mBt/arvMF1rDU8T6PaswfqWZ8oL3U+JoELoj/oz/rT6eeHzR2s3uPTp9/WtjNZP+T2P/6bxN709JOxm6J8214a4awm5+e8clgZc6f1DEYhdoIlLk9rFQK+7CfvEVJ7zcoaTq7YUAHPNtj46jPZG6SY6cVLcNAFpsGuaTJG11uNiCl4Mh741LO3bKIK3TsEm0POUWJbZSvJCbo5Gxh9ReHloQF25tocCqu0M4sqhIt2uc070Ef6EZZulHHuhtkZZCs)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNqVU0tO5DAQvUrJqxmJjplZZjItzQXmApiFu1MNgTixbKcBtXqDQCBugVg0CCEErLiJcxvKSQfCV7QSxfV7r16Sqhn7p3U0rZDFLLFjk2k3FAXu69I4SHEiq9zBTBQAqXTyx8/WBjDoKlN0HsB4G8e7mP6XCm0MG5ttfB4OetCd8Gd2chwqnUuH5AEkaTaFNDN/BTMuF6wJtuGhX9RH/sI/1Md+4c8huGTe+Fu6rmKYzV51hvk84QEWmjQcWaErB+5AI7E3paNyXzDIUvL9o7/0tw0pmff1mb+n1FTmVaj+JDtQZYp5x7ZsTAneyc7lCHOYlOF9PuQYfhBNeAP7rvAFEdwR/qQ+q4/7mt8lVpP7Bk6fvx9YTWR9Sujr+rAnrx9aSdgLcNiZL2KodvnTE94brMS6g7yZsJapnVUlzVZWxLAO69FvVHT+QvWHUu2MNhC2xjIVNmCgpI52bFnQdjRwsUyQUBq+VqhgtD7BF2zbOW1jzu1kHHZqx0al2eJkRaYqXKYwQqsGI1PuWTRELNhaj4NTcIpmYLBI0aD5ivNN6TvebvHY/AlmrZO/)

</div>

### زر الانتقاء {#radio}

```vue-html
<div>Picked: {{ picked }}</div>

<input type="radio" id="واحد" value="واحد" v-model="picked" />
<label for="واحد">واحد</label>

<input type="radio" id="اثنان" value="اثنان" v-model="picked" />
<label for="اثنان">اثنان</label>
```

<div class="demo">
  <div>المنتقى: {{ picked }}</div>

  <input type="radio" id="واحد" value="واحد" v-model="picked" />
  <label for="واحد">واحد</label>

  <input type="radio" id="اثنان" value="اثنان" v-model="picked" />
  <label for="اثنان">اثنان</label>
</div>

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNqNkUFOwzAQRa8y8iYgNfG+SitxAi7gTZpMwCWxLdsJQlE2CCo4SSUQ4jrJbRi3FFKQoDv/7z/P45mOXRiTtA2yOUtdbqXx4NA3ZimUrI22HjqwWEIPpdU1RBSNhBIq18p5MDK/wQIWIXIWXSqMzoVK+R5ECBIea1NlHkkBQFrIdjlsx4fxcdwML+P9+DyHrjuA+j7lIREqKSyVaTz4O4MLwWxWSC0YyILE+DRsh7fhnXSbVU24n1pxrQusyNxzyeK799MqW2EFpbZHBcvDMeW7wP/vU/yVPrAdN5MOjs2TepiW0FwO4ruPlH8NkM3YfiVxnZlk7bSipXUBKT4vnGA0zd2gyaNVBS3YtffGzTl3ZR5WvXaJtlecToltlJc1JujqeGX1rUNLYMFmEwYns0UbW1QFWrR/MX9Ef3EDtheqZ/0HOxH3vQ==)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNqNUkFOwzAQ/IrlCyA18T0KlXgBH/DFrbfgkjiW7QRQlAuCCl5SCYT4Tvwb1k1TUpAAKUo849nxZsctvTAmbWqgGc3d0irj51zDnamsJxJWoi48abkmRAovTs+GNSEWfG31iAgxankDMiMnlxpOBrKLH3zhk7ODNQIPpSmEB0Qoy6Vq5v02PIansOlfw0N4yUjb7h1J1+UsKmIlipU2tSf+3sA5p1ZIVXFKlEQQnvtt/95/IG5EUcf9KZWUlYQCycEXKbY7Py/EAgqyquxRwXxc5mwn+Pt8lL/hD2zDZtLBMfmvHqYlOJcRfPWRs8MA6YyqMkaVlMKka1dpjHGXCd9vOE5xmkMgnGLOEXN67b1xGWNutYzhr11a2SuGq9TW2qsSUnBlsrDVrQOLxpzOJh4MyQZsYkFLsGB/8/wm/eE7XhLafQJoYfuU)

</div>

### القائمة المنسدلة {#select}

اختيار واحد:

```vue-html
<div>محدد: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">حدد خيارا</option>
  <option>أ</option>
  <option>ب</option>
  <option>ج</option>
</select>
```

<div class="demo">
  <div>محدد: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">حدد خيارا</option>
    <option>أ</option>
    <option>ب</option>
    <option>ج</option>
  </select>  
</div>

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9kUtOwzAQhq8y8iYgNcm+SiNxD2/SZAqp4ofGTlhEWbLhGizKAqi4jXsbxg2vgtqdx/83nzzjUdxYmw09iqUoXE2t9eDQ97aUulXWkIcRCDcwwYaMgoTRRGqpa6NdRDusPTawitBVklxLXeSzhw1ceFS2qzxyBVA07VAeHsJr2If9EsbxRzBNRR7TIzbfwpAq02C3kuILk+IIMGKsb42GpnXVuuP+oep6ZJKJWQ/h7fAYduE97Ip8pk97y/B0Lng+F7ycBDzp8V0lxKm/JxULMa8uVZXNts5oXu4YG+Rn4KTg6We3FLzSWEtx5711yzx3mzp+ydZlhm5zPmXUa98qzNCpdE3m3iGxWIrFLwc/hgaklFA3SEiXnH/Qf96onaSexPQBcUPHeQ==)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9UcFOwzAM/RUrl4G0tveqVOI/cskWDzq1SeSkBanqkQu/wWEcgIm/yf4Gt2UTAw0pSmK/5yc/uxe3zqVdiyIXhV9T5UIpDT46SwE0blRbB+ilAdAqqKvr+Q9AGFoyxwjAY43rgDqHxWLODePDF58iOylzELBxtQrIEUChq648PMX3uI/7HPr+pATDUGQjOtHmLHRJYzXWN1IcaVJMBKZYFyprQFderWqu71TdIjOZMctD/Dg8x138jLsim9nntWV8uQS8XgLezgB2OvVVwuj65FQsRdWMI00a5dKtt4bHPc1OfgNeCnY/a0vB+xhjKe5DcD7PMr9Zj0va+tTSXca/lFoTqgZT9E2yIvvgkVhYiuUPDW6GOqSE0GgkpP80f1H/6B63KYYvS93LUA==)

</div>

::: tip ملاحظة
إذا لم تتطابق القيمة الابتدائية لتعبير الـ`v-model` مع أي من الخيارات، فسيتم تصيير عنصر `<select>` في حالة "غير محدد". في iOS، سيؤدي هذا إلى عدم قدرة المستخدم على تحديد العنصر الأول لأن iOS لا ينشئ حدثًا في هذه الحالة. من المفضل أن توفر خيارًا معطلًا بقيمة فارغة، كما هو موضح في المثال أعلاه.
:::

اختيارات متعددة (مربوطة بمصفوفة):

```vue-html
  <div>محدد: {{ multiSelected }}</div>
  <select v-model="multiSelected" multiple>
    <option disabled value="">حدد خيارا</option>
    <option>أ</option>
    <option>ب</option>
    <option>ج</option>
  </select> 
```

<div class="demo">
  <div>محدد: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>أ</option>
    <option>ب</option>
    <option>ج</option>
  </select> 
</div>

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9UUtOwzAQvYrlTUFq4rINaSXOwLLuoiRT6ir+yJ6koChLTsKGBajXCbdh4hSpLaK7eZ733sw8t/zBubSpgWc8D4VXDlkArN1CGqWd9cha5mHDOrbxVrMJUSfSSFNYE5DpukL1CBUUCCWbD8yb5epWmlyMZmRDAEG7ao1AiLG8VM3i+63/6g/9IWNte+HSdbkYKJEb4itrEm1LqOaSn3ElH7WuGq1JYB0qaxb9ey6O5UXj47/G51mDDohDCOTiZH+CAV/jvJGw/N1gxdpBuFclbjN2N5u5l3tpuphFVPApHyNN9Nqlu2ANhR418tgIklMg416SU9QDlnyL6EImRNgUw1ftQmr9s6Aq9bVBpSGFoJMnb/cBPBlLPj3xoEN8Az7xYErw4K95XlD/+A62dFHHux9ipM1L)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9UUtOwzAQvcrIK5BIUrYhVOIMLOsuQj2lruKPbCctirLkJGxYgHqdcBsmcYPaIpAse57fm+fxTMserE2bGlnOCr9y0oY517i3xgUQuC7rKkDLNYAoQ3l1HWMAh6F2ekIAinTyEStcBRQ5LJaR6IaDNlpF9mNPIKCyVRmQEEAhZDP/eu0/+0N/yKFtz+2g64pskIxaP95CkygjsLrn7EzLWcy1VbSmBGODNHrevxXZMbwg3v8iPs4I+sD4CIEiO6mfoA8v43tRsJgqWMb+7KQImxxuZzO7v5t6MWawGybV0OpElTbdeqNpDGMOPxKeM2pIrIszmtOAOduEYH2eZX69Goa39alxzxlFqat1kApT9Cp5cmbn0ZExZzcnHvQR16BLHGqBDt1/nhfSX77TgFn3DaMh0SI=)

</div>

خيارات المنسدلة يمكن تصييرها بشكل ديناميكي باستخدام `v-for` :

<div class="composition-api">

```js
const selected = ref('A')

const options = ref([
  { text: "واحد",  value: "أ", },
  { text: "اثنان", value: "ب" },
  { text: "ثلاثة", value: "ج" },
]);
```

</div>
<div class="options-api">

```js
export default {
    data() {
        return {
            selected: 'A',
            options: [
                    { text: "واحد",  value: "أ", },
                    { text: "اثنان", value: "ب" },
                    { text: "ثلاثة", value: "ج" },
                   ]
        }
    }
}
```

</div>

```vue-html
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>محدد: {{ selected }}</div>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNp9UktOwzAQvYrlFUhtsg9ppZ4DsyjJBFIltmU7ASnyDiruwaKggnqd5DaM7TSqStWN5fH7eObZHV1JGbUN0ISmOlOlNESDaeSS8bKWQhnSEQUFsaRQoiaMIpfRO8YZzwTXjl1BZiAnC8e7YXTF6O0JLqQpcTPC94wT0rmFEAOvJkHH4aPf9b/9gdFZANp11YBD+s/xzPr1TIeq/bDtd8P2gvLrqnI/vDl1/31B+XOifHCTpHEIBiPBwkAtq7UBrAhJw/Skndcih2rB6DEORj0BKSEApBRCIWEsS35MhlGS+NsnMPLl5IDtdyM5chMQa0frOJyGVuJwte8Sy7xsl8O7y7U/JM5heihr09ihbrKTaeiMhhef12sZbbTg+Cd8cGwEsFV0CnePH8El9myM1Ekc6yJzP2mjI6GeYtxFquGmrCECXc8flXjRoNB4ytx7YNuqBTVXwHNQoK55nlH/+fpnY9xS+wft5gK3)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eNqVkktOwzAQQK8y8gqkNtmHUKnnwCxCM4VUSWzZTqhUZQcV92BRUEG9TnIbZvKjfIqEN57v88x4NmKutVcWKAIR2oVJtJvJHNdaGQcxLqMidbCROUAcuejsvJMBDLrC5IMGYDHFhcM4ACnmUkwGu9IuUbkN4GqwwGcSH4drx0nNU72r3+vDUS6fMkoLZH/9/MVTHcm/8oi2b7b1rtmeJL78k7hvHphav54kvp0gXvdSdcE321kK/XHgpDjMdBo5JA0g7OYJ5TRTMaaXUgwDlqINoJButBSyVIYCejXJh5lLAUFb2uj0WnUkUJ+bPtjjJqGqerTfWbtS/O7ptkpS46ScNY/8VfUhYMJQGaWHPnu5s6NuxEQkGe/TNIu0t7Iqp11rJyx7B5VKpO5tKWgZWZfizjltA9+3ywVv6Mp6ytz6JHmmyF2SoYc2m94YdW/REHgcfsugsk2JZmowj9Gg+Yv5LfQHt/01+jRRfQDKsAvn)

</div>

## ربط القيم {#value-bindings}

بالنسبة لزر الانتقاء ، وخيارات خانة الاختيار والمنسدلة ، فإن قيم الربط `v-model` عادة ما تكون سلاسل ثابتة (أو قيم منطقية لخانة الاختيار):

```vue-html
<!-- `picked` هو سلسلة نصية "أ" عند الاختيار -->
<input type="radio" v-model="picked" value="أ" />

<!-- `toggle` هو إما صحيح أو خاطئ -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` هو سلسلة نصية "أ ب ج" عند اختيار الخيار الأول -->
<select v-model="selected">
  <option value="أ ب ج">أ ب ج</option>
</select>
```

لكن في بعض الأحيان قد نرغب في ربط القيمة بخاصية ديناميكية من نسخة المكون الحالي. يمكننا استخدام `v-bind` لبلوغه. على غرار ذلك ، يسمح لنا استخدام `v-bind` بربط قيمة الإدخال بقيم غير السلاسل النصية.

### خانة الاختيار {#checkbox-1}

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="نعم"
  false-value="لا" />
```

`true-value` و `false-value` هي سمات مخصصة لـ Vue التي تعمل فقط مع `v-model` . هنا سيتم تعيين قيمة خاصية `toggle` إلى `'نعم'` عند تحديد الخانة ، وتعيينها إلى `'لا'` عند إلغاء التحديد. يمكنك أيضًا ربطهم بقيم ديناميكية باستخدام `v-bind` :

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip نصيحة
لا تؤثر السمات `true-value` و `false-value` على سمة `value` للإدخال ، لأن المتصفحات لا تضم الخانات غير المحددة عند إرسال النماذج. لضمان إرسال أحد القيمتين في النموذج (على سبيل المثال ، "نعم" أو "لا") ، استخدم إدخالات زر الانتقاء بدلاً من ذلك.
:::

### زر الانتقاء {#radio-1}

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

`pick` سيُعيَّن بقيمة `first` عند تحديد إدخال الزر الأول ، وتعيينه إلى قيمة `second` عند تحديد الثاني.

### خيارات القائمة المنسدلة {#select-options}

```vue-html
<select v-model="selected">
  <!--  كائن مضمن سطريا -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model`  تدعم أيضًا ربط بالقيم غير السلاسل النصية! في المثال أعلاه ، عند تحديد الخيار ، سيتم تعيين `selected` إلى قيمة كائنية مجردة  `{ number: 123 }` .

## المُعدِّلات {#modifiers}

### المُعدِّل `.lazy` {#lazy}

افتراضيا، `v-model` تزامن الإدخال مع البيانات بعد كل حدث `input` (باستثناء تركيب IME كما [وصف أعلاه](#vmodel-ime-tip)). يمكنك إضافة المعدل `lazy` للمزامنة بعد الانتهاء من الكتابة و مغادرة إطار الإدخال أي بعد حدث `change`:

```vue-html
<!-- مزامنة بعد "change" بدلاً من "input" -->
<input v-model.lazy="msg" />
```

### المُعدِّل `.number` {#number}

إذا كنت ترغب في تحويل إدخال المستخدم إلى عدد تلقائيًا ، يمكنك إضافة المعدل `number` إلى الإدخالات المُوجهة بـ`v-model` :

```vue-html
<input v-model.number="age" />
```

إذا لم تُحلّل القيمة باستخدام `parseFloat()` ، فستُستخدام القيمة الأصلية بدلاً من ذلك.

المُعدِّل `number` يُطبَّق تلقائيًا إذا كان الإدخال لديه السمة `type="number"` .

### المُعدِّل `.trim` {#trim}

إذا كنت ترغب في التخلص من المسافات الفارغة من إدخال المستخدم تلقائيًا، يمكنك إضافة المُعدِّل `trim` إلى الإدخالات الموجهة بـ`v-model`  :

```vue-html
<input v-model.trim="msg" />
```

## `v-model` مع المكونات {#v-model-with-components}

> إذا لم تكن معتادًا على مكونات Vue ، يمكنك تخطي هذا القسم في الوقت الحالي.

أنواع الإدخالات المدمجة في HTML لن تلبي احتياجاتك. لحسن الحظ، تتيح لك مكونات Vue إنشاء إدخالات قابلة لإعادة الاستخدام مع سلوك مخصص تمامًا. تعمل هذه الإدخالات حتى مع `v-model` ! لمعرفة المزيد ، اطلع على [استخدام `v-model` ](/guide/components/v-model.html) في دليل المكونات.
