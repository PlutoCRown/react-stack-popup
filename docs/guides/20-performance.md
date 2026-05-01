---
title: 性能相关介绍
description: freeze、unloadDistance、Suspense 和动画性能建议。
---

# 性能相关介绍

弹窗栈常见性能问题来自多层 DOM、历史层重复渲染、长列表和动画。`react-stack-popup` 提供了几项默认策略。

## freeze

默认开启：

```tsx
const stackRouter = new StackRouter(popups, {
  freeze: true,
});
```

当某层被覆盖时，`PopupRenderer` 会用 `react-freeze` 冻结它。冻结的层保留 DOM 和 React state，但不会继续进行无意义渲染。

适合：

- 页面级多步骤流程
- 历史层状态需要保留
- 上层弹窗覆盖下层后，下层不需要实时更新

如果下层必须持续更新，例如视频、倒计时、实时地图，可以关闭：

```tsx
const stackRouter = new StackRouter(popups, {
  freeze: false,
});
```

## unloadDistance

`unloadDistance` 控制最多渲染最近多少层：

```tsx
const stackRouter = new StackRouter(popups, {
  unloadDistance: 5,
});
```

值越小，内存占用越低，但旧层会被硬卸载，内部 state 会丢失。

建议：

- 普通确认弹窗：`3` 到 `5`
- 页面级流程：`5` 到 `10`
- 需要完整回退状态：保持 `Infinity`

## prefersReducedMotion

可以根据系统偏好减少动画：

```tsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const stackRouter = new StackRouter(popups, {
  prefersReducedMotion,
});
```

开启后，`PopupRenderer` 会注入：

```css
:root { --rsp-duration: 0s; }
```

## 内容组件优化

`RegisterPopup` 会 memo 内容组件，但 props 变化、Context 变化和内部 state 仍会触发渲染。复杂内容建议：

- 长列表使用虚拟列表。
- 重计算使用 `useMemo`。
- 事件回调使用 `useCallback`。
- 大型弹窗按需注册懒加载组件，并配合 `suspense`。
