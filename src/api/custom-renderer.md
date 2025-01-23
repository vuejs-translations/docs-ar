# الواجهة البرمجية للمصير المخصص  {#custom-renderer-api}

## ()createRenderer {#createrenderer}

تنشئ المصير المخصص. من خلال توفير منصة لإنشاء العقد والتلاعب بالـواجهة البرمجية، يمكنك الاستفادة من وحدة التشغيل الأساسية لـ Vue لاستهداف بيئات غير DOM.

- **النوع**

  ```ts
  function createRenderer<HostNode, HostElement>(
    options: RendererOptions<HostNode, HostElement>
  ): Renderer<HostElement>

  interface Renderer<HostElement> {
    render: RootRenderFunction<HostElement>
    createApp: CreateAppFunction<HostElement>
  }

  interface RendererOptions<HostNode, HostElement> {
    patchProp(
      el: HostElement,
      key: string,
      prevValue: any,
      nextValue: any,
      namespace?: ElementNamespace,
      parentComponent?: ComponentInternalInstance | null,
    ): void
    insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void
    remove(el: HostNode): void
    createElement(
      type: string,
      namespace?: ElementNamespace,
      isCustomizedBuiltIn?: string,
      vnodeProps?: (VNodeProps & { [key: string]: any }) | null,
    ): HostElement
    createText(text: string): HostNode
    createComment(text: string): HostNode
    setText(node: HostNode, text: string): void
    setElementText(node: HostElement, text: string): void
    parentNode(node: HostNode): HostElement | null
    nextSibling(node: HostNode): HostNode | null
    querySelector?(selector: string): HostElement | null
    setScopeId?(el: HostElement, id: string): void
    cloneNode?(node: HostNode): HostNode
    insertStaticContent?(
      content: string,
      parent: HostElement,
      anchor: HostNode | null,
      namespace: ElementNamespace,
      start?: HostNode | null,
      end?: HostNode | null,
    ): [HostNode, HostNode]
  }
  ```

- **مثال**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` هي واجهة برمجية منخفضة المستوى
  // `createApp` تعيد نسخة تطبيق  
  export { render, createApp }

  // إعادة تصدير الواجهة البرمجية للنواة الخاصة بـ Vue
  export * from '@vue/runtime-core'
  ```

  `vue/runtime-dom@` الخاص بـ Vue [مُنفذ باستخدام نفس الواجهة البرمجية](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). للحصول على شيفرة تنفيذية أبسط، تحقق من [`vue/runtime-test@`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts) وهو حزمة خاصة لاختبار وحدات Vue.
