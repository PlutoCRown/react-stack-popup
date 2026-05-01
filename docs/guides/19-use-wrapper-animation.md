---
title: useWrapperAnimation
description: 自定义 Wrapper 的生命周期动画 Hook。
---

# useWrapperAnimation

`useWrapperAnimation` 用于自定义 Wrapper。它监听当前弹窗实例的生命周期事件，并在动画结束后通知 router。

```tsx
useWrapperAnimation({
  rootRef,
  endTargetRef,
  endEvent: "animationend",
  duration: 300,
  coverPrevious: false,
});
```

## 参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `rootRef` | `RefObject<HTMLElement>` | 根节点 |
| `duration` | `number` | 动画时长 |
| `coverPrevious` | `boolean` | 进入完成后是否冻结前层 |
| `endEvent` | `"animationend" \| "transitionend" \| "none"` | 等待的结束事件 |
| `endTargetRef` | `RefObject<HTMLElement>` | 监听结束事件的节点，可选 |
| `onWillEnter` | `() => void \| (() => void)` | 进入前回调 |
| `onWillClose` | `() => void \| (() => void)` | 关闭前回调 |
| `onEntered` | `() => void` | 进入完成回调 |
| `onDestroyed` | `() => void` | 销毁前回调 |

## class 行为

Hook 会在根节点上添加和移除 class：

- 进入时添加 `rsp-entering`
- 退出时添加 `rsp-exiting`

你可以用 CSS 绑定动画：

```css
.custom-root.rsp-entering .custom-panel {
  animation: popup-in var(--rsp-duration, 300ms) ease both;
}

.custom-root.rsp-exiting .custom-panel {
  animation: popup-out var(--rsp-duration, 300ms) ease both;
}
```

## endEvent 选择

- CSS animation：使用 `"animationend"`
- CSS transition：使用 `"transitionend"`
- 没有真实事件：使用 `"none"`，内部会用 `duration` 定时完成

如果 `duration <= 0`，Hook 会立即完成。

## coverPrevious

`coverPrevious` 会影响栈中前一层是否被冻结：

```tsx
useWrapperAnimation({
  rootRef,
  duration,
  endEvent: "animationend",
  coverPrevious: true,
});
```

页面级 Wrapper 通常设为 `true`。遮罩、Sheet、Drawer 通常设为 `false`。
