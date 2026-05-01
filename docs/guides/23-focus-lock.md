---
title: FocusLock 总览
description: FocusLock 和 FocusLockState 的行为模型。
---

# FocusLock 总览

`FocusLock` 用于统一控制弹窗打开和关闭。它适合处理表单离开确认、提交期间禁止关闭、动画期间忽略重复操作、打开请求排队等场景。

## 接入

```tsx
import { FocusLock, StackRouter } from "react-stack-popup";

export const focusLock = new FocusLock();

export const stackRouter = new StackRouter(popups, {
  lock: focusLock,
});
```

## FocusLockState

```ts
export enum FocusLockState {
  None = 0,
  IgnoreOpen = 1 << 0,
  IgnoreClose = 1 << 1,
  IgnoreAll = IgnoreOpen | IgnoreClose,
  BlockOpen = 1 << 2,
  BlockClose = 1 << 3,
}
```

状态含义：

| 状态 | 行为 |
| --- | --- |
| `None` | 不拦截打开或关闭 |
| `IgnoreOpen` | 新的 `open` 直接 reject |
| `IgnoreClose` | `close` 直接 reject |
| `IgnoreAll` | 同时忽略打开和关闭 |
| `BlockOpen` | 新的 `open` 进入队列，释放后执行 |
| `BlockClose` | 关闭动作串行化，避免并发竞态 |

## setState

```tsx
focusLock.setState(FocusLockState.IgnoreOpen);
focusLock.setState(FocusLockState.None);
```

`Ignore*` 是直接拒绝。`Block*` 是阻塞或串行。

## getState

```tsx
const state = focusLock.getState();
```

如果当前存在 close block，优先返回 `BlockClose`。如果存在 open block，返回 `BlockOpen`。否则返回 ignore 状态。

## acquireOpenMutex

用于在一段流程中阻塞新的打开请求：

```tsx
const mutex = focusLock.acquireOpenMutex("submit");

try {
  await submit();
  await mutex.allow(() => stackRouter.open("success", {}));
} finally {
  mutex.release();
}
```

`allow` 允许当前逻辑内部执行一次受控打开。

## acquireCloseMutex

`StackRouter.close` 内部会使用 close mutex，让关闭动作串行执行。通常业务不需要直接调用。

## 使用建议

- 防重复点击：用 `IgnoreOpen`。
- 提交中禁止关闭：用 `IgnoreClose` 或关闭守卫。
- 提交中暂存后续弹窗：用 `BlockOpen`。
- 多个返回事件连续触发：依赖内部 close mutex。
