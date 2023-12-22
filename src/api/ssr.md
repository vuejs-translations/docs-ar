# واجهة التخريج من جانب الخادم {#server-side-rendering-api}

## ()renderToString {#rendertostring}

- **مُصدر من `vue/server-renderer`**

- **النوع**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **مثال**

  ```js
  import { createSSRApp } from 'vue'
  import { renderToString } from 'vue/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### نطاق التخريج من جانب الخادم {#ssr-context}

  يمكنك تمرير كائن سياق اختياري ، والذي يمكن استخدامه لتسجيل بيانات إضافية أثناء التخريج ، على سبيل المثال [الوصول إلى محتوى مكونات Teleport](/guide/scaling-up/ssr#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'teleported content' }
  ```

  معظم الواجهات البرمجة  الأخرى لـ SSR في هذه الصفحة تقبل أيضًا كائن سياق اختياريًا. يمكن الوصول إلى كائن السياق في شيفرة المكون عبر الدالة التركيبية المساعدة [useSSRContext](#usessrcontext).

- **اطلع أيضاً** [دليل - التخريج من جانب الخادوم](/guide/scaling-up/ssr)

## ()renderToNodeStream {#rendertonodestream}

يعرض المدخلات كـ [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable).

- **مُصدر من `vue/server-renderer`**

- **النوع**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **مثال**

  ```js
  // داخل معالج Node.js http
  renderToNodeStream(app).pipe(res)
  ```

  :::tip ملاحظة
  هذه الطريقة غير مدعومة في بناء ESM من `vue/server-renderer` ، والذي يُفصل عن بيئات Node.js. استخدم [`pipeToNodeWritable`](#pipetonodewritable) بدلاً من ذلك.
  :::

## ()pipeToNodeWritable {#pipetonodewritable}

يعرض ويوجه إلى نسخة [Node.js Writable stream](https://nodejs.org/api/stream.html#stream_writable_streams) ةموجود.

- **مُصدر من `vue/server-renderer`**

- **النوع**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **مثال**

  ```js
  // داخل معالج Node.js http
  pipeToNodeWritable(app, {}, res)
  ```

## ()renderToWebStream {#rendertowebstream}

يعرض المدخلات كـ [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

- **مُصدر من `vue/server-renderer`**

- **النوع**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **مثال**

  ```js
  // داخل بيئة مع دعم ReadableStream
  return new Response(renderToWebStream(app))
  ```

  :::tip ملاحظة
  في البيئات التي لا تكشف عن بناء `ReadableStream` في النطاق العام ، يجب استخدام [`pipeToWebWritable()`](#pipetowebwritable) بدلاً من ذلك.
  :::

## ()pipeToWebWritable {#pipetowebwritable}

يعرض ويوجه إلى نسخة [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) موجودة.

- **مُصدر من `vue/server-renderer`**

- **النوع**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **مثال**

  عادةً ما يستخدم هذا بجانب [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream):

  ```js
  // TransformStream متوفر في بيئات مثل CloudFlare workers.
  // في Node.js ، يجب استيراد TransformStream بشكل صريح من 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## ()renderToSimpleStream {#rendertosimplestream}

يعرض المدخلات في وضع التدفق باستخدام واجهة قراءة بسيطة.

- **مُصدر من `vue/server-renderer`**

- **النوع**

  ```ts
  function renderToSimpleStream(
    input: App | VNode,
    context: SSRContext,
    options: SimpleReadable
  ): SimpleReadable

  interface SimpleReadable {
    push(content: string | null): void
    destroy(err: any): void
  }
  ```

- **مثال**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // تم
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // واجه خطأ
      }
    }
  )
  ```

## ()useSSRContext {#usessrcontext}

واجهة برمجية في وقت التشغيل التي تستخدم لاسترداد كائن السياق الذي يُمرر إلى `renderToString()` أو الواجهات البرمجية الأخرى للتخريج من جانب الخادوم.

- **النوع**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **مثال**

  يمكن استخدام السياق المسترجع لإرفاق المعلومات المطلوبة لتخريج HTMLالـ النهائي (على سبيل المثال ، بيانات ترويسة الصفحة).

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'

  // تأكد من الاتصال به فقط أثناء التخريج من جانب الخادوم
  // https://vitejs.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...قم بإرفاق الخاصيات بالسياق
  }
  </script>
  ```
