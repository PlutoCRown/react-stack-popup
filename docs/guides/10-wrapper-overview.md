---
title: Wrapper 总览与选择
description: 内置 Wrapper 的能力差异和选型建议。
---

# Wrapper 总览与选择

Wrapper 是弹窗内容外面的结构层，负责布局、遮罩、动画和关闭交互。

内置 Wrapper：

| Wrapper | 适用场景 | 主要能力 |
| --- | --- | --- |
| `NoneWrapper` | 完全自定义 UI、图片预览、透明覆盖层 | 最少结构，只提供生命周期动画接入 |
| `MaskWrapper` | 居中弹窗、确认框、提示卡片 | 遮罩、居中面板、遮罩点击关闭 |
| `SheetWrapper` | 底部面板、选择器、移动端操作区 | 底部滑入、自适应高度、下滑关闭 |
| `PageWrapper` | 全屏页面、多步骤流程、编辑页 | 页面级滑入、覆盖前一层、冻结历史层 |
| `DrawerWrapper` | 侧边筛选、详情侧栏、工具面板 | 左右抽屉、宽度配置、遮罩点击关闭 |

## 选择建议

确认框、轻量弹窗：

```tsx
RegisterPopup("confirm", ConfirmPopup, MaskWrapper, {
  maskClosable: false,
});
```

移动端底部操作：

```tsx
RegisterPopup("actions", ActionsPopup, SheetWrapper, {
  fitContent: true,
  swipable: true,
});
```

类页面流程：

```tsx
RegisterPopup("edit", EditPopup, PageWrapper);
```

侧边详情：

```tsx
RegisterPopup("filter", FilterPopup, DrawerWrapper, {
  direction: "right",
  width: 320,
});
```

完全自定义层：

```tsx
RegisterPopup("viewer", ImageViewer, NoneWrapper, {
  duration: 200,
});
```

## 公共 Wrapper 参数

所有内置 Wrapper 都继承 `WrapperBaseProps`：

| 参数 | 说明 |
| --- | --- |
| `visible` | 当前层是否可见，由 `PopupRenderer` 注入 |
| `onClose` | 请求关闭函数，由 `PopupRenderer` 注入 |
| `duration` | 动画时长，单位毫秒 |
| `children` | 弹窗内容 |
| `className` | 自定义 class，部分 Wrapper 使用 |
| `style` | 自定义样式，部分 Wrapper 使用 |

业务注册时通常只需要传 `duration` 和该 Wrapper 自己扩展的参数。`visible`、`onClose`、`children` 由系统管理。
