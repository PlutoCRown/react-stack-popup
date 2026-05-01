---
title: 打开与关闭弹窗
description: StackRouter.open、StackRouter.close 和事件行为。
---

# 打开与关闭弹窗

`StackRouter` 暴露两个最常用的方法：

```ts
stackRouter.open(id, args, options?)
stackRouter.close(id?)
```

它们都返回 `Promise<void>`。

## open

`open` 根据弹窗 ID 找到注册配置，并把 args 传给内容组件。

```tsx
await stackRouter.open("profile", {
  userId: "42",
});
```

开启 URL 管理时，可以传入第三个参数：

```tsx
await stackRouter.open(
  "profile",
  { userId: "42" },
  { url: "/profile/42" },
);
```

`open` 可能 reject：

- 当前 `FocusLock` 设置了 `IgnoreOpen`
- 锁逻辑执行时拒绝打开
- 业务侧封装时主动抛错

建议在必须感知结果的场景中处理失败：

```tsx
try {
  await stackRouter.open("profile", { userId: "42" });
} catch {
  // 打开被锁或业务规则拒绝
}
```

## close

不传 ID 时，关闭当前最上层可见弹窗：

```tsx
await stackRouter.close();
```

传 ID 时，关闭栈中第一个匹配 ID 的弹窗：

```tsx
await stackRouter.close("profile");
```

`close` 可能 reject：

- 当前没有可关闭的目标弹窗
- `FocusLock` 设置了 `IgnoreClose`
- 关闭守卫返回 `false`

## 在内容组件中关闭当前层

推荐内容组件使用 `useStackState` 拿到 `onClose`。这个函数只关闭当前弹窗实例。

```tsx
import { useStackState } from "react-stack-popup";

function ProfilePopup() {
  const stack = useStackState();

  if (!stack.inStack) return null;

  return <button onClick={stack.onClose}>关闭当前层</button>;
}
```

## 事件通道

`StackRouter` 有只读事件通道 `channel`，目前包含：

- `open`：弹窗打开后触发，携带 `{ id }`
- `close`：弹窗开始关闭时触发，携带 `{ id }`

```tsx
const off = stackRouter.channel.on("open", ({ id }) => {
  console.log("open", id);
});

off();
```

事件通道主要适合调试、埋点或业务监控，不建议把核心 UI 状态建立在这些事件上。
