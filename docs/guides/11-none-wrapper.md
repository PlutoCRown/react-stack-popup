---
title: NoneWrapper
description: NoneWrapper 的行为、参数和使用场景。
---

# NoneWrapper

`NoneWrapper` 是最轻量的内置 Wrapper。它不会添加遮罩、面板布局或关闭按钮，只提供基础容器和生命周期动画接入。

```tsx
import { NoneWrapper, RegisterPopup } from "react-stack-popup";

RegisterPopup("viewer", ImageViewer, NoneWrapper, {
  duration: 200,
});
```

## Props

`NoneWrapperProps` 继承 `WrapperBaseProps`，没有额外参数。

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `duration` | `300` | 动画时长，单位毫秒 |
| `children` | - | 弹窗内容 |

## 适用场景

- 图片预览器
- 自定义全屏覆盖层
- 特殊动效
- 由内容组件自己控制关闭按钮和布局

## 注意事项

`NoneWrapper` 不会自动提供关闭入口。内容组件需要自行调用 `useStackState().onClose` 或外部 `stackRouter.close()`。

```tsx
import { useStackState } from "react-stack-popup";

function ImageViewer() {
  const stack = useStackState();
  if (!stack.inStack) return null;

  return (
    <div className="viewer">
      <button onClick={stack.onClose}>关闭</button>
      <img src="/image.jpg" alt="" />
    </div>
  );
}
```
