# المنافذ {#slots}

> لقراءة هذه الصفحة يجب عليك أولا الاطلاع على [أساسيات المُكونات](/guide/essentials/component-basics).ثم العودة إلى هنا.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-component-slots" title="فيديو تعليمي علي درس المنافذ"/>

## محتوي المنفذ{#slot-content-and-outlet}

تعلمنا سابقاً ان المُكونات تستقبل خاصيات (Props) , التي يمكن ان تكون أي نوعً من الأنواع الموجودة في لغة الچافاسكريبت . ولكن كيف يكون الأمر عندما نريد تمرير جزء من محتوي القالب (Template Content) ؟ إلي المُكون الإبن وجعل المُكون الإبن هو المسؤول عن عرض ذلك الجزء ضمن القالب (Template) الخاص به

علي سبيل المثال , لدينا مُكون `<FancyButton>` يعمل بهذا الشكل :

```vue-html{2}
<FancyButton>
   <!-- هذا هو المحتوي الذي نريد تمريره --> ! أنقر الزر 
</FancyButton>
```

يكون القالب الخاص بالمُكون `<FancyButton>` بهذا الشكل :

```vue-html{2}
<button class="fancy-btn">
    <slot></slot>  <!-- المنفذ من هذا القالب  FancyButton الذي يشير إلي المُحتوي القادم من المُكون -->
</button>
```

يُمثل العنصر `<slot>` **المنفذ** الذي يشير إلي **المُحتوي** القادم من المُكون الأب

![slot diagram](./images/slots.png)

<!-- https://www.figma.com/file/LjKTYVL97Ck6TEmBbstavX/slot -->

الشكل النهائي المعروض في DOM :

```html
<button class="fancy-btn"> ! أنقر الزر </button>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBGYW5jeUJ1dHRvbiBmcm9tICcuL0ZhbmN5QnV0dG9uLnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxGYW5jeUJ1dHRvbj5cbiAgICBDbGljayBtZSA8IS0tIHNsb3QgY29udGVudCAtLT5cbiBcdDwvRmFuY3lCdXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJGYW5jeUJ1dHRvbi52dWUiOiI8dGVtcGxhdGU+XG4gIDxidXR0b24gY2xhc3M9XCJmYW5jeS1idG5cIj5cbiAgXHQ8c2xvdC8+IDwhLS0gc2xvdCBvdXRsZXQgLS0+XG5cdDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhbmN5LWJ0biB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMzE1ZGVnLCAjNDJkMzkyIDI1JSwgIzY0N2VmZik7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIG1hcmdpbjogNXB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjwvc3R5bGU+In0=)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBGYW5jeUJ1dHRvbiBmcm9tICcuL0ZhbmN5QnV0dG9uLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgRmFuY3lCdXR0b24gfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEZhbmN5QnV0dG9uPlxuICAgIENsaWNrIG1lIDwhLS0gc2xvdCBjb250ZW50IC0tPlxuIFx0PC9GYW5jeUJ1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkZhbmN5QnV0dG9uLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBjbGFzcz1cImZhbmN5LWJ0blwiPlxuICBcdDxzbG90Lz4gPCEtLSBzbG90IG91dGxldCAtLT5cblx0PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZmFuY3ktYnRuIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICM0MmQzOTIgMjUlLCAjNjQ3ZWZmKTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgbWFyZ2luOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuPC9zdHlsZT4ifQ==)

</div>

بإستخدام المنافذ , يكون المُكون `<FancyButton>` هو المسؤول عن عرض الوسم `<button>` و التنسيق الخاص به , بينما مُحتوي الزر يُعرض من خلال المُكون الأب `<FancyButton>`

هناك طريقة أخري لفهم مصطلح المنافذ و هو مقارنتها بالدوال (Functions) في لغة الجافاسكريبت

```js
// مُكون يقوم بتمرير محتوي المنفذ 
FancyButton('! انقر الزر')

// دالة تعرض محتوي تلك المنفذ في قالب خاص بها
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```

محتوي المنافذ يُمكن ان يكون اي نوع , هو ليس مقتصراً علي الهيئة النصية . ممكن ان يكون أكثر من عنصر أو يكون بداخله مُكون اخر

```vue-html
<FancyButton>
  <span style="color:red">! انقر الزر </span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBGYW5jeUJ1dHRvbiBmcm9tICcuL0ZhbmN5QnV0dG9uLnZ1ZSdcbmltcG9ydCBBd2Vzb21lSWNvbiBmcm9tICcuL0F3ZXNvbWVJY29uLnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxGYW5jeUJ1dHRvbj5cbiAgICBDbGljayBtZVxuIFx0PC9GYW5jeUJ1dHRvbj5cbiAgPEZhbmN5QnV0dG9uPlxuICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6Y3lhblwiPkNsaWNrIG1lISA8L3NwYW4+XG4gICAgPEF3ZXNvbWVJY29uIC8+XG4gIDwvRmFuY3lCdXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJGYW5jeUJ1dHRvbi52dWUiOiI8dGVtcGxhdGU+XG4gIDxidXR0b24gY2xhc3M9XCJmYW5jeS1idG5cIj5cbiAgXHQ8c2xvdC8+XG5cdDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhbmN5LWJ0biB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMzE1ZGVnLCAjNDJkMzkyIDI1JSwgIzY0N2VmZik7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIG1hcmdpbjogNXB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjwvc3R5bGU+IiwiQXdlc29tZUljb24udnVlIjoiPCEtLSB1c2luZyBhbiBlbW9qaSBqdXN0IGZvciBkZW1vIHB1cnBvc2VzIC0tPlxuPHRlbXBsYXRlPuKdpO+4jzwvdGVtcGxhdGU+In0=)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBGYW5jeUJ1dHRvbiBmcm9tICcuL0ZhbmN5QnV0dG9uLnZ1ZSdcbmltcG9ydCBBd2Vzb21lSWNvbiBmcm9tICcuL0F3ZXNvbWVJY29uLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgRmFuY3lCdXR0b24sIEF3ZXNvbWVJY29uIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxGYW5jeUJ1dHRvbj5cbiAgICBDbGljayBtZVxuIFx0PC9GYW5jeUJ1dHRvbj5cblxuICA8RmFuY3lCdXR0b24+XG4gICAgPHNwYW4gc3R5bGU9XCJjb2xvcjpjeWFuXCI+Q2xpY2sgbWUhIDwvc3Bhbj5cbiAgICA8QXdlc29tZUljb24gLz5cbiAgPC9GYW5jeUJ1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkZhbmN5QnV0dG9uLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBjbGFzcz1cImZhbmN5LWJ0blwiPlxuICBcdDxzbG90Lz5cblx0PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZmFuY3ktYnRuIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICM0MmQzOTIgMjUlLCAjNjQ3ZWZmKTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgbWFyZ2luOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuPC9zdHlsZT4iLCJBd2Vzb21lSWNvbi52dWUiOiI8IS0tIHVzaW5nIGFuIGVtb2ppIGp1c3QgZm9yIGRlbW8gcHVycG9zZXMgLS0+XG48dGVtcGxhdGU+4p2k77iPPC90ZW1wbGF0ZT4ifQ==)

</div>

إستخدام المنافذ سوف يجعل المُكون  `<FancyButton>` أكثر مرونة و قابل لإعادة الإستخدام . يمكن الان إستخدامه  في اماكن اخري مع تغير  مُحتوي المنفذ و الأحتفاظ بنفس التنسيق و الخصائص 

آلية عمل المنافذ الموجودة في المُكونات مستوحاة من فكرة  [ `<slot>` المنافذ الموجودة في  مُكون الويب الأصلي ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), ولكن تم إضافة إليه العديد من المُميزات التي سنتعرف عليها أسفل

## نطاق العرض {#render-scope}

يمكن تمرير إلي محتوي المنفذ جميع البيانات الموجودة بداخل النطاق الأب له لإنه مُعرف بداخل هذا النطاق مثال:

```vue-html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

سيتم عرض نفس النتيجة للمتغير <span v-pre>`{{ message }}`</span> في كلتا الحالتين.

علي عكس السابق , محتوي المنفذ غير قادر علي الوصل إلي البيانات الموجودة داخل المُكون الإبن . طبقاً لقواعد النطاقات في لغة الجافاسكريبت (JavaScript's lexical scoping) يمكن الوصول إلي البيانات الموجودة في النطاق الذي تم تعريفها بداخله فقط , نفس القاعدة تُطبق علي التعبيرات البرمجية في قوالب فيو (Expressions in Vue Templates) . بعبارةً أخري :

> التعبيرات البرمجية الموجودة في قالب الأب لديها حق الوصول فقط لنطاق الأب ; و التعبيرات البرمجية الموجودة في قالب الإبن لديها حق الوصول فقط  لنطاق الإبن

## المحتوى الإحتياطي {#fallback-content}

هناك بعض الحالات تريد عرض محتوي إحتياطي (default) للمنفذ في حالة عدم تقديم محتوي له . علي سبيل المثال , في المُكون `<SubmitButton>`:

```vue-html
<button type="submit">
  <slot></slot>
</button>
```

في حالة عدم تقديم محتوي لهذا المنفذ من خلال المُكون الأب , نريد عرض كلمة "تسليم" داخل الوسم  `<button>` . لكي نجعل الكلمة "تسليم" هي المحتوي البديل لهذا المنفذ . يجب ان تُوضع هذه الكلمة بين وسم `<slot>`:

```vue-html{3}
<button type="submit">
  <slot>     
    تسليم <!-- المُحتوي البديل -->
  </slot>
</button>
```

في حالة إستخدامنا للمُكون `<SubmitButton>` وعدم تقديم أي محتوي للمنفذ الخاص به

```vue-html
<SubmitButton />
```

سوف يتم عرض المحتوي الإحتياطي "تسليم"

```html
<button type="submit">تسليم</button>
```

ولكن في حالة تقديم محتوي لهذا المنفذ

```vue-html
<SubmitButton>حفظ</SubmitButton>
```

سيتم عرض محتوي هذا المنفذ في الشكل النهائي:

```html
<button type="submit">حفط</button>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBTdWJtaXRCdXR0b24gZnJvbSAnLi9TdWJtaXRCdXR0b24udnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPCEtLSB1c2UgZmFsbGJhY2sgdGV4dCAtLT5cbiAgPFN1Ym1pdEJ1dHRvbiAvPlxuICBcbiAgPCEtLSBwcm92aWRlIGN1c3RvbSB0ZXh0IC0tPlxuICA8U3VibWl0QnV0dG9uPlNhdmU8L1N1Ym1pdEJ1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIlN1Ym1pdEJ1dHRvbi52dWUiOiI8dGVtcGxhdGU+XG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuXHQgIDxzbG90PlxuICAgIFx0U3VibWl0IDwhLS0gZmFsbGJhY2sgY29udGVudCAtLT5cbiAgXHQ8L3Nsb3Q+XG5cdDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBTdWJtaXRCdXR0b24gZnJvbSAnLi9TdWJtaXRCdXR0b24udnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIFN1Ym1pdEJ1dHRvblxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8IS0tIHVzZSBmYWxsYmFjayB0ZXh0IC0tPlxuICA8U3VibWl0QnV0dG9uIC8+XG4gIFxuICA8IS0tIHByb3ZpZGUgY3VzdG9tIHRleHQgLS0+XG4gIDxTdWJtaXRCdXR0b24+U2F2ZTwvU3VibWl0QnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiU3VibWl0QnV0dG9uLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG5cdCAgPHNsb3Q+XG4gICAgXHRTdWJtaXQgPCEtLSBmYWxsYmFjayBjb250ZW50IC0tPlxuICBcdDwvc2xvdD5cblx0PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>

## المنافذ المسماة {#named-slots}

هناك حالات عديدة نريد إستخدام أكثر من منفذ في مُكون واحد . مثل هذا القالب الخاص بالمُكون `<BaseLayout>` علي سبيل المثال:

```vue-html
<div class="container">
  <header>
    <!-- نريد تمرير محتوي الجزء الأعلي للمُكون هنا -->
  </header>
  <main>
    <!-- نريد تمرير المحتوي الأساسي للمُكون هنا -->
  </main>
  <footer>
    <!-- نريد تمرير محتوي الجزء السفلي للمُكون هنا -->
  </footer>
</div>
```

لكي نقوم بتنفيذ الشكل السابق نحتاج إلي تمرير أكثر من منفذ لهذا المُكون , و هنا يحتوي العنصر `<slot>` علي رمزاً يسمي `name` والذي دائماً ما يكون اسماً مميزاً لكل منفذ لتحديد أين سوف يتم عرضه  في المُكون

```vue-html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

في حالة عدم تحديد الإسم `name` للعنصر `<slot>` فإنه يأخذ الإسم "default" إفتراضياً

في المُكون الأب `<BaseLayout>` , نحتاج إلي تمرير أكثر من محتوي ,كل محتوي خاص بمنفذ محدد , و من هنا يأتي دول **المنافذ المسماة**

لكي نقوم بتمرير المنافذ المسماة , سوف نقوم بإستخدام العنصر `<template>` مع السمة المُوجهة (Directive) `v-slot` ومن ثم تمرير الإسم لهذه السمة كأنه وسيطاً (Argument):

```vue-html
<BaseLayout>
  <template v-slot:header>
    <!-- محتوي منفذ الجزء الأعلي  -->
  </template>
</BaseLayout>
```

يمكن كتابة `<template v-slot:header>` بطريقة مختصرة عن طريق دمج السمة `v-slot` مع الرمز `#`, لكي تُصبح `<template #header>` . يمكننا ان نتخيل الأمر علي أنه "عرض قالب في منفذ الجزء الأعلي للمُكون الإبن" .

![named slots diagram](./images/named-slots.png)

<!-- https://www.figma.com/file/2BhP8gVZevttBu9oUmUUyz/named-slot -->

هذا هو الكود النهائي بعد ان قمنا بتمرير مُحتوي الثلاثة منافذ للمُكون `<BaseLayout>` بإستخدام الطريقة المُختصرة:

```vue-html
<BaseLayout>
  <template #header>
    <h1>هنا سوف يكون عنوان الصفحة</h1>
  </template>

  <template #default>
    <p>النص التوضيحي للمحتوي الأساسي للصفحة</p>
    <p>نص أخر.</p>
  </template>

  <template #footer>
    <p>هنا معلومات التواصل</p>
  </template>
</BaseLayout>
```

عندما يوجد في المُكون منافذ مسماة و أيضاً منفذ إفتراضي , يتم أعتبار جميع الوسوم ذات المستوي الأعلي التي لا تنتمي إلي ال `<template>` كمحتوي للمنفذ الإفتراضي . لذلك يُمكن الكتابة بهذا الشكل أيضاً. 

```vue-html
<BaseLayout>
  <template #header>
    <h1>هنا سوف يكون عنوان الصفحة</h1>
  </template>

  <!-- implicit default slot -->
  <p>النص التوضيحي للمحتوي الأساسي للصفحة.</p>
  <p>نص أخر.</p>

  <template #footer>
    <p>هنا معلومات التواصل</p>
  </template>
</BaseLayout>
```

كل العناصر التي بداخل وسوم `<template>` تم تمريرها عن طريق المنافذ .الأن يكون شكل ال HTML النهائي:

```html
<div class="container">
  <header>
    <h1>هنا سوف يكون عنوان الصفحة</h1>
  </header>
  <main>
    <p>النص التوضيحي للمحتوي الأساسي للصفحة</p>
    <p>نص أخر</p>
  </main>
  <footer>
    <p>هنا معلومات التواصل</p>
  </footer>
</div>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBCYXNlTGF5b3V0IGZyb20gJy4vQmFzZUxheW91dC52dWUnXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QmFzZUxheW91dD5cbiAgICA8dGVtcGxhdGUgI2hlYWRlcj5cbiAgICAgIDxoMT5IZXJlIG1pZ2h0IGJlIGEgcGFnZSB0aXRsZTwvaDE+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDx0ZW1wbGF0ZSAjZGVmYXVsdD5cbiAgICAgIDxwPkEgcGFyYWdyYXBoIGZvciB0aGUgbWFpbiBjb250ZW50LjwvcD5cbiAgICAgIDxwPkFuZCBhbm90aGVyIG9uZS48L3A+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDx0ZW1wbGF0ZSAjZm9vdGVyPlxuICAgICAgPHA+SGVyZSdzIHNvbWUgY29udGFjdCBpbmZvPC9wPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvQmFzZUxheW91dD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJhc2VMYXlvdXQudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGhlYWRlcj5cbiAgICAgIDxzbG90IG5hbWU9XCJoZWFkZXJcIj48L3Nsb3Q+XG4gICAgPC9oZWFkZXI+XG4gICAgPG1haW4+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9tYWluPlxuICAgIDxmb290ZXI+XG4gICAgICA8c2xvdCBuYW1lPVwiZm9vdGVyXCI+PC9zbG90PlxuICAgIDwvZm9vdGVyPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbiAgZm9vdGVyIHtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcbiAgICBjb2xvcjogIzY2NjtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICB9XG48L3N0eWxlPiJ9)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCYXNlTGF5b3V0IGZyb20gJy4vQmFzZUxheW91dC52dWUnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7XG4gICAgQmFzZUxheW91dFxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QmFzZUxheW91dD5cbiAgICA8dGVtcGxhdGUgI2hlYWRlcj5cbiAgICAgIDxoMT5IZXJlIG1pZ2h0IGJlIGEgcGFnZSB0aXRsZTwvaDE+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDx0ZW1wbGF0ZSAjZGVmYXVsdD5cbiAgICAgIDxwPkEgcGFyYWdyYXBoIGZvciB0aGUgbWFpbiBjb250ZW50LjwvcD5cbiAgICAgIDxwPkFuZCBhbm90aGVyIG9uZS48L3A+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDx0ZW1wbGF0ZSAjZm9vdGVyPlxuICAgICAgPHA+SGVyZSdzIHNvbWUgY29udGFjdCBpbmZvPC9wPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvQmFzZUxheW91dD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJhc2VMYXlvdXQudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGhlYWRlcj5cbiAgICAgIDxzbG90IG5hbWU9XCJoZWFkZXJcIj48L3Nsb3Q+XG4gICAgPC9oZWFkZXI+XG4gICAgPG1haW4+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9tYWluPlxuICAgIDxmb290ZXI+XG4gICAgICA8c2xvdCBuYW1lPVwiZm9vdGVyXCI+PC9zbG90PlxuICAgIDwvZm9vdGVyPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbiAgZm9vdGVyIHtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcbiAgICBjb2xvcjogIzY2NjtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICB9XG48L3N0eWxlPiJ9)

</div>

للتأكيد , يمكننا فهم المنافذ المسماة بشكل أعمق عن طريق تشبيهها بالدوال في لغة الجافاسكريبت:

```js
// تمرير أكثر من منفذ بأسماء مختلفة
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout> يعرض مُحتوي المنافذ في وسوم مختلفة
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

## الأسماء الديناميكية للمنافذ {#dynamic-slot-names}

يمكن لأسماء المنافذ ان تكون بشكل ديناميكي عن طريق إستخدام [صيغة القالب](/guide/essentials/template-syntax.md#dynamic-arguments) مع `v-slot`:

```vue-html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- بإستخدام الطريقة المُختصرة -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

لاحظ ان التعبير البرمجي هو موضوع في [قيود بناء الجمل البرمجية](/guide/essentials/template-syntax#directives) في الوسائط الديناميكية.

## المنافذ محددة النطاق {#scoped-slots}

كما ذكرنا في [نطاق العرض](#render-scope), ان محتوي المنافذ لا يستطيع الوصول إلي البيانات الموجودة في المُكون الإبن.

لكن, هناك بعض الحالات التي نريد ان محتوي المنفذ يكون قادراً علي الوصول إلي البيانات من كلتا الإتجاهين من نطاق الأب و نطاق الإبن . لكي نحقق ذلك . نريد طريقة تُمكن المُكون الإبن من تمرير بياناته إلي المنفذ عند عرضها.

في الحقيقة , يمكننا ان نفعل ذلك - يمكننا ان نمرر الخواص من المُكون الإبن إلي المنفذ مثل تمرير الخاصيات (Props) إلي المُكون:

```vue-html
<!-- <MyComponent> قالب -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

يُعد إستقبال الخاصيات من المنفذ (Slot Props) في حالة المنفذ الإفتراضي هو مختلف نوعاً ما عن في حالة المنافذ المسماة . سوف نعرض أولاً كيفية إستقبال الخاصيات في المنفذ الإفتراضي , بإستخدام `v-slot` مباشراً في المُكون الإبن :

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

![مُخطط المنافذ مُحددة النطاق](./images/scoped-slots.svg)

<!-- https://www.figma.com/file/QRneoj8eIdL1kw3WQaaEyc/scoped-slot -->

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxNeUNvbXBvbmVudCB2LXNsb3Q9XCJzbG90UHJvcHNcIj5cbiAgXHR7eyBzbG90UHJvcHMudGV4dCB9fSB7eyBzbG90UHJvcHMuY291bnQgfX1cbiAgPC9NeUNvbXBvbmVudD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIk15Q29tcG9uZW50LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5jb25zdCBncmVldGluZ01lc3NhZ2UgPSAnaGVsbG8nXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICBcdDxzbG90IDp0ZXh0PVwiZ3JlZXRpbmdNZXNzYWdlXCIgOmNvdW50PVwiMVwiPjwvc2xvdD5cblx0PC9kaXY+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBNeUNvbXBvbmVudFxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8TXlDb21wb25lbnQgdi1zbG90PVwic2xvdFByb3BzXCI+XG4gIFx0e3sgc2xvdFByb3BzLnRleHQgfX0ge3sgc2xvdFByb3BzLmNvdW50IH19XG4gIDwvTXlDb21wb25lbnQ+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNeUNvbXBvbmVudC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBncmVldGluZ01lc3NhZ2U6ICdoZWxsbydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gIFx0PHNsb3QgOnRleHQ9XCJncmVldGluZ01lc3NhZ2VcIiA6Y291bnQ9XCIxXCI+PC9zbG90PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>

الخاصيات التي تم تمريرها إلي المنفذ من المُكون الإبن تكون موجودة كقيمة بداخل السمة `v-slot` , يمكن الوصول إليها كما في المُخطط السابق

يمكنك تصور ان المنافذ محددة النطاق عبارة عن دالة يتم تمريرها إلي المُكون الإبن . ثم يقوم المُكون الإبن باستدعائها ثم  بتمرير الخاصيات كوسائط:

```js
MyComponent({
  // تمرير المنفذ الإفتراضي كدالة
  default: (slotProps) => {
    return `${slotProps.text} ${slotProps.count}`
  }
})

function MyComponent(slots) {
  const greetingMessage = 'مرحباً'
  return `<div>${
    // إستدعاء دالة المنفذ و إعطاء قيمة الخاصيات لها
    slots.default({ text: greetingMessage, count: 1 })
  }</div>`
}
```

في الحقيقة . هذه الطريقة هي قريبة جداً من طريقة إنتاج المنافذ مُحددة النطاق . وكيف ستستخدم المنافذ المحددة النطاق في  [وظائف العرض](/guide/extras/render-function).

لاحظ كيف التشابه بين إستخدام الدوال كالمثال السابق و `v-slot="slotProps"` . كما في وسائط الدالة  (function arguments) , يمكننا تفككيك الكائن `v-slot` .

```vue-html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### المنفذ محددة النطاق المسماة {#named-scoped-slots}

تعمل المنافذ محددة النطاق بشكل مشابه - حيث يمكن الوصول إلي خاصيات المنافذ من السمة `v-slot` . بشكل `v-slot:name="slotProps"` . عند إستخدام الطريقة المُخصرة تكون بالشكل التالي :

```vue-html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

تمرير الخاصيات إلي المنافذ المسماة:

```vue-html
<slot name="header" message="hello"></slot>
```

لاحظ أن الخاصية `name` لن تكون موجودة ضمن خاصيات المنفذ لأنها كلمة محجوزة - لذلك ستكون نتيجة `headerProps` هي `{ message: 'hello' }`.

إذا كنت تريد الدمج بين المنافذ المسماة و منفذ النطاق الإفتراضي يجب إستخدام الوسم `<template>` للمنفذ الإفتراضي . إذا تم إستخدام  `v-slot` مباشرةً مع وسم المُكون يُعطي خطأ . شاهد هذا المثال التوضيحي علي هذه الفقرة 

```vue-html
<!-- هذا القالب لن يعمل -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message: الخاص بالمنفذ الإفتراضي الغير متاح في هذه الحالة-->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

إستخدام الوسم `<template>` مع المنفذ الإفتراضي يجعل الأمر واضحاً أكثر لان الخاصية `message` لا يمكن إستخدامها داخل المنافذ الأخري :

```vue-html
<template>
  <MyComponent>
    <!-- يستخدم مع المنفذ الإفتراضي -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>معلومات التواصل</p>
    </template>
  </MyComponent>
</template>
```

### مثال Fancy List  {#fancy-list-example}

قد تتساءل الان عن الإستخدامات الواقعية للمنافذ مُحددة النطاق . تخيل اننا لدينا مُكون `<FancyList>` يقوم بعرض قائمة من العناصر - يقوم بتجميع البيانات بشكل غير متزامن , استخدام تلك البيانات لعرض قائمة العناصر , او تطبيق أشياء مُتقدمة مثل ترقيم الصفحات (pagination) او التمرير اللانهائي (infinite scrolling). و نريد هذا المُكون مرن مع عرض كل العناصر و ندع المُكون الأب هو المسوؤل عن وضع الشكل الخاص بكل عنصر . لذلك يكون الإستخدام بهذا الشكل :

```vue-html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

داخل المُكون `<FancyList>` , سوف نعرض لكل عنصر من قائمة العناصر  المنفذ الخاص به .(لاحظ اننا نستخدم `v-bind` لتمرير الكائن كخاصية للمنفذ)

```vue-html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBGYW5jeUxpc3QgZnJvbSAnLi9GYW5jeUxpc3QudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEZhbmN5TGlzdCA6YXBpLXVybD1cInVybFwiIDpwZXItcGFnZT1cIjEwXCI+XG4gICAgPHRlbXBsYXRlICNpdGVtPVwieyBib2R5LCB1c2VybmFtZSwgbGlrZXMgfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgICAgPHA+e3sgYm9keSB9fTwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJtZXRhXCI+Ynkge3sgdXNlcm5hbWUgfX0gfCB7eyBsaWtlcyB9fSBsaWtlczwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvRmFuY3lMaXN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbi5tZXRhIHtcbiAgZm9udC1zaXplOiAwLjhlbTtcbiAgY29sb3I6ICM0MmI4ODM7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJGYW5jeUxpc3QudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbJ2FwaS11cmwnLCAncGVyLXBhZ2UnXSlcblxuY29uc3QgaXRlbXMgPSByZWYoW10pXG5cbi8vIG1vY2sgcmVtb3RlIGRhdGEgZmV0Y2hpbmdcbnNldFRpbWVvdXQoKCkgPT4ge1xuICBpdGVtcy52YWx1ZSA9IFtcbiAgICB7IGJvZHk6ICdTY29wZWQgU2xvdHMgR3VpZGUnLCB1c2VybmFtZTogJ0V2YW4gWW91JywgbGlrZXM6IDIwIH0sXG5cdCAgeyBib2R5OiAnVnVlIFR1dG9yaWFsJywgdXNlcm5hbWU6ICdOYXRhbGlhIFRlcGx1aGluYScsIGxpa2VzOiAxMCB9XG4gIF1cbn0sIDEwMDApXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8dWw+XG4gICAgPGxpIHYtaWY9XCIhaXRlbXMubGVuZ3RoXCI+XG4gICAgICBMb2FkaW5nLi4uXG4gICAgPC9saT5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGl0ZW1zXCI+XG4gICAgICA8c2xvdCBuYW1lPVwiaXRlbVwiIHYtYmluZD1cIml0ZW1cIi8+XG4gICAgPC9saT5cbiAgPC91bD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG4gIHVsIHtcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICM0MmQzOTIgMjUlLCAjNjQ3ZWZmKTtcbiAgfVxuICBsaSB7XG4gICAgcGFkZGluZzogNXB4IDIwcHg7XG4gICAgbWFyZ2luOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gIH1cbjwvc3R5bGU+In0=)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBGYW5jeUxpc3QgZnJvbSAnLi9GYW5jeUxpc3QudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEZhbmN5TGlzdFxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8RmFuY3lMaXN0IGFwaS11cmw9XCJ1cmxcIiA6cGVyLXBhZ2U9XCIxMFwiPlxuICAgIDx0ZW1wbGF0ZSAjaXRlbT1cInsgYm9keSwgdXNlcm5hbWUsIGxpa2VzIH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+XG4gICAgICAgIDxwPnt7IGJvZHkgfX08L3A+XG4gICAgICAgIDxwIGNsYXNzPVwibWV0YVwiPmJ5IHt7IHVzZXJuYW1lIH19IHwge3sgbGlrZXMgfX0gbGlrZXM8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L0ZhbmN5TGlzdD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubWV0YSB7XG4gIGZvbnQtc2l6ZTogMC44ZW07XG4gIGNvbG9yOiAjNDJiODgzO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiRmFuY3lMaXN0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ2FwaS11cmwnLCAncGVyLXBhZ2UnXSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IFtdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIC8vIG1vY2sgcmVtb3RlIGRhdGEgZmV0Y2hpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgIHsgYm9keTogJ1Njb3BlZCBTbG90cyBHdWlkZScsIHVzZXJuYW1lOiAnRXZhbiBZb3UnLCBsaWtlczogMjAgfSxcbiAgICAgICAgeyBib2R5OiAnVnVlIFR1dG9yaWFsJywgdXNlcm5hbWU6ICdOYXRhbGlhIFRlcGx1aGluYScsIGxpa2VzOiAxMCB9XG4gICAgICBdXG4gICAgfSwgMTAwMClcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHVsPlxuICAgIDxsaSB2LWlmPVwiIWl0ZW1zLmxlbmd0aFwiPlxuICAgICAgTG9hZGluZy4uLlxuICAgIDwvbGk+XG4gICAgPGxpIHYtZm9yPVwiaXRlbSBpbiBpdGVtc1wiPlxuICAgICAgPHNsb3QgbmFtZT1cIml0ZW1cIiB2LWJpbmQ9XCJpdGVtXCIvPlxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuICB1bCB7XG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMzE1ZGVnLCAjNDJkMzkyIDI1JSwgIzY0N2VmZik7XG4gIH1cbiAgbGkge1xuICAgIHBhZGRpbmc6IDVweCAyMHB4O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICB9XG48L3N0eWxlPiJ9)

</div>

### المُكونات عديمة المُحتوي {#renderless-components}

كما ذكرنا من قبل أن المُكون `<FancyList>` يقوم بتجميع المميزات الخاصة به (جلب البيانات , ترقيم الصفحات الخ) و عرض قائمة العناصر عن طريق المنفذ محدد النطاق .

إذا قمنا بتعديل شئ بسيط علي هذا المفهوم , ان المُكون مازال يقوم بتجميع المميزات الخاصة به من جلب بيانات و ترقيم الصفحات الخ ولكن لا يقوم بعرض اي شئ  - و ان المحتوي الخاص به يكون من المُكون الأب عبر المنفذ فقط . يسمي هذا المفهوم **المُكونات عديمة المُحتوي**

مثال علي المُكونات عديمة المُحتوي لاحظ انها تقوم بتجميع المميزات و المنطق الخاص بها (تتبع إحداثيات الفأرة):

```vue-html
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```

<div class="composition-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBNb3VzZVRyYWNrZXIgZnJvbSAnLi9Nb3VzZVRyYWNrZXIudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PE1vdXNlVHJhY2tlciB2LXNsb3Q9XCJ7IHgsIHkgfVwiPlxuICBcdE1vdXNlIGlzIGF0OiB7eyB4IH19LCB7eyB5IH19XG5cdDwvTW91c2VUcmFja2VyPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiTW91c2VUcmFja2VyLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnXG4gIFxuY29uc3QgeCA9IHJlZigwKVxuY29uc3QgeSA9IHJlZigwKVxuXG5jb25zdCB1cGRhdGUgPSBlID0+IHtcbiAgeC52YWx1ZSA9IGUucGFnZVhcbiAgeS52YWx1ZSA9IGUucGFnZVlcbn1cblxub25Nb3VudGVkKCgpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGUpKVxub25Vbm1vdW50ZWQoKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZSkpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c2xvdCA6eD1cInhcIiA6eT1cInlcIi8+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="options-api">

[اختبرها في حقل التجارب](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNb3VzZVRyYWNrZXIgZnJvbSAnLi9Nb3VzZVRyYWNrZXIudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIE1vdXNlVHJhY2tlclxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8TW91c2VUcmFja2VyIHYtc2xvdD1cInsgeCwgeSB9XCI+XG4gIFx0TW91c2UgaXMgYXQ6IHt7IHggfX0sIHt7IHkgfX1cblx0PC9Nb3VzZVRyYWNrZXI+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNb3VzZVRyYWNrZXIudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB1cGRhdGUoZSkge1xuICAgICAgdGhpcy54ID0gZS5wYWdlWFxuICAgICAgdGhpcy55ID0gZS5wYWdlWVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy51cGRhdGUpXG4gIH0sXG4gIHVubW91bnRlZCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy51cGRhdGUpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxzbG90IDp4PVwieFwiIDp5PVwieVwiLz5cbjwvdGVtcGxhdGU+In0=)

</div>

في حين انه نمط مثير للإهتمام , يمكن تحقيق الكثير بإستخدام المُكونات عديمة المُحتوي بطريقة منظمة و مُرتبة خاصة مع إستخدام طريقة الواجهة التركيبية (Composition Api) , بدون الحاجة إلي إستخدام مُكونات متداخلة . سوف نعرف لاحقاً كيفية تطبيق اَلية عمل تتبع الفأرة نفسه ك[مُركب](/guide/reusability/composables).

كما ذكرنا تظل المنافذ محددة النطاق مفيدة في الكثير من الحالات نحتاج إلي تجميع المميزات و المنطق **و أيضاً** عرض محتوي مرئي , مثل المثال `<FancyList>`
