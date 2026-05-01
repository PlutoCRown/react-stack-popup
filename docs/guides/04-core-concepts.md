---
title: 核心概念
description: 理解弹窗注册、栈式路由、Wrapper 和渲染入口。
---

# 核心概念

`react-stack-popup` 有四个核心概念：

| 概念 | API | 作用 |
| --- | --- | --- |
| 弹窗注册 | `RegisterPopup` | 绑定弹窗 ID、内容组件、Wrapper 和默认 wrapperProps |
| 栈式路由 | `StackRouter` | 管理打开、关闭、栈状态、URL、锁 |
| 渲染入口 | `PopupRenderer` | 订阅 router，并把栈渲染到 `document.body` |
| 包装层 | `MaskWrapper` 等 | 控制遮罩、动画、布局、关闭交互 |

一次完整调用流程：

1. 使用 `RegisterPopup("id", Content, Wrapper)` 注册弹窗。
2. 用注册数组创建 `new StackRouter(popups, config)`。
3. 在应用根部渲染 `<PopupRenderer stackRouter={stackRouter} />`。
4. 业务代码调用 `stackRouter.open("id", args)`。
5. `PopupRenderer` 根据栈状态创建弹窗节点，并把 `args` 传给内容组件。
6. Wrapper 负责进入动画，动画结束后通知 router。
7. 调用 `stackRouter.close()` 或 Wrapper 内部 `onClose` 触发退出动画。
8. 退出动画结束后节点销毁。

## 弹窗不是页面路由

`StackRouter` 只管理弹窗栈。它可以和 History API 协作，让浏览器返回键关闭弹窗，但它不是完整应用路由系统。

主页面仍应由 React Router、TanStack Router、Next.js App Router 或你的业务路由系统管理。

## 弹窗是栈节点

每次 `open` 都会生成一个新的 `StackItem`，即使 ID 相同，也会有不同 `key`：

```ts
{
  id: "profile",
  key: "popup-...",
  args: { userId: "42" },
  visible: true,
  freeze: null
}
```

因此同一种弹窗可以被多次打开，表现为多层实例。
