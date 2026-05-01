---
title: 已知问题
description: URL 管理、浏览器限制、SSR 和状态保留相关风险。
---

# 已知问题

## 关闭被拒绝后的历史恢复不完全可靠

当用户点击浏览器返回，但关闭被 `FocusLock` 或关闭守卫拒绝时，库会尝试调用 `history.forward()` 恢复路径。

部分浏览器会限制无用户交互的历史跳转。移动端和新版 Chrome 策略下尤其需要谨慎。

建议：

- 强拦截场景不要完全依赖前端 History API。
- 有原生容器时，在原生返回层处理确认。
- 关键业务状态独立保存，避免只依赖历史栈。

## 移动 Safari 行为差异

移动 Safari 的手势返回、页面缓存、History API 时序可能和桌面浏览器不同。

复杂流程可选择：

```tsx
urlManage: false
```

或者只对非移动 Safari 开启。

## SSR 不能直接访问 window/document

`PopupRenderer` 使用 `document.body`，`StackRouter` 的 URL 管理会访问 `window`。SSR 项目中需要客户端创建或客户端渲染。

```tsx
if (typeof window !== "undefined") {
  // create router with urlManage
}
```

## unloadDistance 会丢失内部 state

设置 `unloadDistance` 后，距离当前层太远的旧层不会渲染。再次回到这些层时内部 state 不会保留。

重要状态应上提到业务 store 或服务端。

## close(id) 关闭第一个匹配项

如果同一个 ID 打开了多次，`close(id)` 会查找栈中匹配该 ID 的项。更精确地关闭当前层时，内容组件内应使用 `useStackState().onClose`。

## 样式必须引入

使用内置 Wrapper 但没有引入：

```tsx
import "react-stack-popup/style.css";
```

会导致布局和动画异常。
