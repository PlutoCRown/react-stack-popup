---
title: 自定义 Wrapper
description: 编写自己的 Wrapper 并接入动画生命周期。
---

# 自定义 Wrapper

自定义 Wrapper 用于替代内置遮罩、面板和动画结构。

```tsx
import type { WrapperBaseProps } from "react-stack-popup";

type ToastWrapperProps = WrapperBaseProps & {
  position?: "top" | "bottom";
};

function ToastWrapper({
  children,
  position = "top",
}: ToastWrapperProps) {
  return <div className={`toast toast-${position}`}>{children}</div>;
}
```

注册：

```tsx
RegisterPopup("toast", ToastPopup, ToastWrapper, {
  position: "top",
  duration: 200,
});
```

## 必须处理的能力

最小自定义 Wrapper 只需要渲染 `children`。但完整 Wrapper 通常要处理：

- 根节点定位和 z-index。
- 关闭入口，例如遮罩点击或按钮。
- 进入动画和退出动画。
- 动画结束后通知 router。

## 接入 useWrapperAnimation

`useWrapperAnimation` 是内置 Wrapper 也使用的生命周期 Hook。

```tsx
import { useRef } from "react";
import {
  useWrapperAnimation,
  type WrapperBaseProps,
} from "react-stack-popup";

function CustomWrapper({
  children,
  onClose,
  duration = 300,
}: WrapperBaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useWrapperAnimation({
    rootRef,
    endTargetRef: panelRef,
    endEvent: "animationend",
    duration,
    coverPrevious: false,
  });

  return (
    <div ref={rootRef} className="custom-root">
      <div className="custom-mask" onClick={onClose} />
      <div ref={panelRef} className="custom-panel">
        {children}
      </div>
    </div>
  );
}
```

`coverPrevious` 决定进入完成后是否冻结前面的层：

- `false`：适合遮罩、底部弹窗、抽屉。
- `true`：适合全屏页面。

## 类型建议

自定义 Wrapper props 应该继承 `WrapperBaseProps`，这样 `RegisterPopup` 可以正确检查 `wrapperProps`：

```tsx
type MyWrapperProps = WrapperBaseProps & {
  variant?: "plain" | "danger";
};
```
