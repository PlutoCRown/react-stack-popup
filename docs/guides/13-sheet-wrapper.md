---
title: SheetWrapper
description: 底部弹窗 Wrapper 的参数、滑动关闭和高度策略。
---

# SheetWrapper

`SheetWrapper` 用于移动端常见的底部弹窗。它支持底部滑入、自适应高度、遮罩点击关闭和下滑关闭。

```tsx
import { SheetWrapper, RegisterPopup } from "react-stack-popup";

RegisterPopup("actions", ActionsPopup, SheetWrapper, {
  fitContent: true,
  swipable: true,
  maskClosable: true,
});
```

## Props

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `fitContent` | `true` | 是否按内容自适应高度 |
| `swipable` | `true` | 是否允许下滑关闭 |
| `maskClosable` | `true` | 点击遮罩是否关闭 |
| `transparentBackground` | `false` | 面板背景是否透明 |
| `duration` | `300` | 动画时长 |

## 高度策略

内容高度不确定、选项较少时使用默认值：

```tsx
RegisterPopup("picker", PickerPopup, SheetWrapper, {
  fitContent: true,
});
```

需要接近全屏的面板：

```tsx
RegisterPopup("large-sheet", LongFormPopup, SheetWrapper, {
  fitContent: false,
});
```

`fitContent: false` 时，内部轨道高度接近视口高度，适合长表单、长列表、复杂选择器。

## 滑动关闭

`swipable` 开启后，用户在面板顶部向下滑动超过阈值会触发关闭。如果面板内部已经滚动到非顶部，滑动关闭不会立即抢占滚动。

表单、地图、复杂手势区域建议关闭：

```tsx
RegisterPopup("form-sheet", FormPopup, SheetWrapper, {
  swipable: false,
});
```

## 透明背景

`transparentBackground` 适合内容本身已经有完整视觉背景的场景：

```tsx
RegisterPopup("transparent", Popup, SheetWrapper, {
  transparentBackground: true,
});
```
