---
title: MaskWrapper
description: 遮罩弹窗 Wrapper 的参数和使用建议。
---

# MaskWrapper

`MaskWrapper` 用于遮罩 + 面板类弹窗，适合确认框、提示框、居中内容和轻量交互。

```tsx
import { MaskWrapper, RegisterPopup } from "react-stack-popup";

RegisterPopup("confirm", ConfirmPopup, MaskWrapper, {
  opacity: 0.5,
  maskClosable: true,
  duration: 300,
});
```

## Props

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `opacity` | `0.5` | 遮罩透明度 |
| `maskClosable` | `true` | 点击遮罩是否关闭 |
| `duration` | `300` | 进入和退出动画时长 |
| `className` | - | 附加到根节点的 class |

## 遮罩关闭

`maskClosable` 只在点击遮罩本身时触发关闭，点击面板内容不会关闭。

```tsx
RegisterPopup("danger-confirm", ConfirmPopup, MaskWrapper, {
  maskClosable: false,
});
```

危险操作、表单提交、支付确认等场景建议关闭遮罩点击关闭，并在内容中提供明确按钮。

## 与 PageWrapper 的差异

`MaskWrapper` 的 `coverPrevious` 为 `false`，进入完成后不会冻结前一层。适合需要让用户仍然感知背景上下文的弹窗。
