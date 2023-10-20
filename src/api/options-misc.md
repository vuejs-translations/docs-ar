# الخيارات: متفرقة {#options-misc}

## name {#name}

تصرح بشكل صريح عن اسم العرض للمكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **التفاصيل**

  إسم المكون يستخدم في الأمور التالية:

  - الإشارة الذاتية المتكررة في قالب المكون الخاص به
  - العرض في شجرة تفتيش المكون في أدوات تطوير Vue
  - العرض في تتبعات التحذير للمكون

  لما تستخدم المكونات أحادية الملف، المكون يستنتج اسمه الخاص من اسم الملف. على سبيل المثال، ملف يسمى `MyComponent.vue` سيكون له اسم العرض المستنتج "MyComponent".

  حالة أخرى هي عندما يُسجل المكون على نطاق عام باستخدام [`app.component`](/api/application#app-component)، ستعين الهوية العامة تلقائيًا كاسم له.

  خيار `name` يسمح لك بتجاوز الاسم المستنتج، أو توفير اسم بشكل صريح عندما لا يمكن استنتاج اسم (على سبيل المثال، عندما لا تستخدم أدوات البناء، أو مكون غير موجود في ملف واحد).

  هناك حالة واحدة يكون فيها `name` ضروريًا بشكل صريح: عند مطابقة المكونات القابلة للتخزين في ذاكرة التخزين المؤقت [`<KeepAlive>`](/guide/built-ins/keep-alive) عبر خاصيتي `include / exclude`.

  :::tip ملاحظة
  منذ الإصدار 3.2.34، المكون أحادي الملف الذي يستخدم صيغة `<script setup>` سيستنتج خيار `name` بشكل تلقائي استنادًا إلى اسم الملف، مما يزيل الحاجة إلى تعريف الاسم يدويًا حتى عند استخدام `<KeepAlive>`.
  :::

## inheritAttrs {#inheritattrs}

يتحكم في ما إذا كان يجب تمكين سلوك السمة المستترة الافتراضية للمكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // default: true
  }
  ```

- **التفاصيل**

  بشكل افتراضي، ربطات السمات في نطاق الأب التي لا يُتعرف عليها كخاصيات كـ"سمات مستترة". هذا يعني أنه عندما يكون لدينا مكون جذر واحد، سيطبق هذه الربطات على عنصر الجذر للمكون الابن كسمات HTML عادية. عند كتابة مكون يلف عنصر هدف أو مكون آخر، قد لا يكون هذا هو السلوك المرغوب دائمًا. بتعيين `inheritAttrs` إلى `false`، يمكن تعطيل هذا السلوك الافتراضي. السمات متوفرة عبر خاصية النسخة `attrs$` ويمكن ربطها بشكل صريح بعنصر غير جذري باستخدام `v-bind`.

- **مثال**

  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="composition-api">

  عند التصريح بهذا الخيار في مكون يستخدم `<script setup>`، يمكنك استخدام التعليمة العامة [`defineOptions`](/api/sfc-script-setup#defineoptions):

  ```vue
  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  defineOptions({
    inheritAttrs: false
  })
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  منذ 3.3 يمكنك أيضًا استخدام `defineOptions` مباشرة في `<script setup>`:

  ```vue
  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  defineOptions({ inheritAttrs: false })
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **اطلع أيضًا على** [السمات المستترة](/guide/components/attrs)

## components {#components}

يقوم بتسجيل مكونات لتصبح متوفرة لنسخة المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **مثال**

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // اختصار
      Foo,
      // تسجيل باسم مختلف
      RenamedBar: Bar
    }
  }
  ```

- **اطلع أيضًا على** [تسجيل المكونات](/guide/components/registration)

## directives {#directives}

يقوم بتسجيل السمات الموجهة لتصبح متوفرة لنسخة المكون.

- **النوع**

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **مثال**

  ```js
  export default {
    directives: {
      // تمكين v-focus في القالب
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

  مجموعة من السمات الموجهة لتصبح متوفرة لنسخة المكون.

- **اطلع أيضًا على** [السمات الموجهة المخصصة](/guide/reusability/custom-directives)
