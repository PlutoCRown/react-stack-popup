---
title: PageWrapper
description: 页面级弹窗 Wrapper 的行为和多层流程用法。
---

# PageWrapper

`PageWrapper` 用于类页面弹窗。它从右侧滑入，适合移动端多步骤流程、全屏编辑、详情页、设置页。

```tsx
import { PageWrapper, RegisterPopup } from "react-stack-popup";

RegisterPopup("edit-profile", EditProfilePopup, PageWrapper);
```

## Props

`PageWrapperProps` 继承 `WrapperBaseProps`，没有额外参数。

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `duration` | `300` | 页面进入和退出动画时长 |
| `children` | - | 页面内容 |

## 覆盖前一层

`PageWrapper` 的动画 Hook 配置了 `coverPrevious: true`。进入动画完成后，前面的层会被标记为冻结。

这意味着：

- 前一层仍保留在 DOM 中。
- 前一层 React state 默认保留。
- 前一层不会继续进行不必要渲染。

这种行为适合多页面流程：

```tsx
await stackRouter.open("step-1", {});
await stackRouter.open("step-2", {});
await stackRouter.open("step-3", {});
```

## 页面内容建议

`PageWrapper` 更像页面，而不是卡片。内容组件应该自己处理页面 header、返回按钮、滚动区域和底部操作栏。

```tsx
function EditPopup() {
  const stack = useStackState();
  if (!stack.inStack) return null;

  return (
    <main>
      <header>
        <button onClick={stack.onClose}>返回</button>
        <h1>编辑资料</h1>
      </header>
      <section>{/* form */}</section>
    </main>
  );
}
```
