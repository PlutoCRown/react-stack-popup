---
title: 调试与排查
description: 常见问题的定位方式和修复建议。
---

# 调试与排查

## 弹窗没有显示

检查：

- 是否渲染了 `<PopupRenderer stackRouter={stackRouter} />`。
- `stackRouter` 是否和调用 `open` 的实例是同一个。
- `open` 是否被 `FocusLock` reject。
- 弹窗 ID 是否注册。
- 是否在 SSR 阶段访问了 `document`。

可以临时监听事件：

```tsx
stackRouter.channel.on("open", ({ id }) => {
  console.log("open", id);
});
```

## 样式异常

确认入口引入：

```tsx
import "react-stack-popup/style.css";
```

如果使用 CSS Modules、Shadow DOM 或隔离样式方案，要确认默认 CSS 能作用到 portal 渲染的 `document.body` 下节点。

## 类型没有推导出来

检查：

- 注册数组末尾是否有 `as const`。
- 内容组件 props 是否显式声明。
- 是否把数组手动标成 `PopupConfigArray`。
- `StackRouter` 是否直接接收了具体注册数组。

## 点击遮罩不能关闭

检查：

- `maskClosable` 是否为 `false`。
- 当前 `FocusLock` 是否设置了 `IgnoreClose`。
- 是否有 `useWhenClose` 返回 `false`。
- 是否点击到了面板内容而不是遮罩本身。

## 返回键行为不符合预期

检查：

- `urlManage` 是否开启。
- 打开弹窗时是否传了正确 URL。
- 主路由是否也拦截了同一次历史变化。
- 移动 Safari 是否有手势返回差异。
- 关闭守卫是否拒绝了关闭。

## 状态丢失

检查：

- router 是否被重新创建。
- `unloadDistance` 是否太小。
- 弹窗内容是否因为 key 变化重新挂载。
- 关键状态是否只放在弹窗内部。

## 动画结束后节点不销毁

自定义 Wrapper 需要确认 `useWrapperAnimation` 的 `endEvent` 和真实 CSS 动画匹配：

- animation 用 `animationend`
- transition 用 `transitionend`
- 没有事件用 `none`

也要确认 `endTargetRef` 指向的元素就是触发结束事件的元素。
