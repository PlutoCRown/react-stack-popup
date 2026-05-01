---
title: 锁的应用场景
description: FocusLock 在实际业务中的常见组合。
---

# 锁的应用场景

## 防止重复打开

用户快速点击按钮时，可以临时忽略打开。

```tsx
focusLock.setState(FocusLockState.IgnoreOpen);

try {
  await stackRouter.open("loading", {});
} finally {
  focusLock.setState(FocusLockState.None);
}
```

更常见的做法是按钮自身禁用。锁适合跨组件统一拦截。

## 提交中禁止关闭

```tsx
async function handleSubmit() {
  focusLock.setState(FocusLockState.IgnoreClose);
  try {
    await submit();
    await stackRouter.close();
  } finally {
    focusLock.setState(FocusLockState.None);
  }
}
```

## 提交完成后打开成功弹窗

```tsx
const mutex = focusLock.acquireOpenMutex("submit");

try {
  await submit();
  await mutex.allow(() => stackRouter.open("success", {}));
} finally {
  mutex.release();
}
```

在 mutex 释放前，其他 `open` 会进入队列。

## 离开页面确认

```tsx
focusLock.useWhenClose(() => {
  if (!hasUnsavedChange()) return true;

  stackRouter.open("confirm-leave", {
    onConfirm: async () => {
      markSavedOrConfirmed();
      await stackRouter.close();
      await stackRouter.close();
    },
  });

  return false;
});
```

## 动画期间避免竞态

如果业务层有复杂转场，可以在转场期间设置：

```tsx
focusLock.setState(FocusLockState.IgnoreAll);

await runTransition();

focusLock.setState(FocusLockState.None);
```

注意：如果忽略关闭，用户返回键或遮罩点击都会 reject。要确保 UI 上有明确反馈或禁用交互。
