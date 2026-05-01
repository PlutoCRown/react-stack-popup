---
title: DrawerWrapper
description: 抽屉 Wrapper 的方向、宽度和关闭配置。
---

# DrawerWrapper

`DrawerWrapper` 用于左右侧抽屉，适合筛选器、详情侧栏、工具面板。

```tsx
import { DrawerWrapper, RegisterPopup } from "react-stack-popup";

RegisterPopup("filter", FilterPopup, DrawerWrapper, {
  direction: "right",
  width: 320,
});
```

## Props

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `direction` | `"right"` | 抽屉方向，可选 `"left"` 或 `"right"` |
| `width` | - | 抽屉宽度，支持数字或 CSS 字符串 |
| `maskClosable` | `true` | 点击遮罩是否关闭 |
| `duration` | `300` | 动画时长 |
| `className` | - | 根节点附加 class |
| `style` | - | 根节点附加 style |

## 宽度配置

数字会转成 px：

```tsx
RegisterPopup("filter", FilterPopup, DrawerWrapper, {
  width: 320,
});
```

字符串会原样作为 CSS 值：

```tsx
RegisterPopup("filter", FilterPopup, DrawerWrapper, {
  width: "min(86vw, 420px)",
});
```

## 左侧抽屉

```tsx
RegisterPopup("menu", MenuPopup, DrawerWrapper, {
  direction: "left",
  width: "80vw",
});
```

## 避免误关闭

筛选条件较多、表单未保存时建议设置：

```tsx
RegisterPopup("filter", FilterPopup, DrawerWrapper, {
  maskClosable: false,
});
```
