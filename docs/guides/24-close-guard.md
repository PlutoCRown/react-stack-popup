---
title: 关闭确认与关闭守卫
description: 使用 FocusLock.useWhenClose 拦截关闭动作。
---

# 关闭确认与关闭守卫

`focusLock.useWhenClose` 可以在弹窗内部注册关闭前判断。返回 `false` 会阻止本次关闭。

```tsx
focusLock.useWhenClose(() => {
  return true;
});
```

它内部使用 React Hook，所以必须在组件渲染期间稳定调用，不要放在条件分支、事件回调或普通工具函数中。

## 表单离开确认

```tsx
import { useRef } from "react";
import { focusLock, stackRouter } from "./stackRouter";

function EditFormPopup() {
  const confirmed = useRef(false);
  const dirty = useRef(true);

  focusLock.useWhenClose(() => {
    if (!dirty.current || confirmed.current) return true;

    stackRouter.open("confirm-leave", {
      onConfirm: () => {
        confirmed.current = true;
        stackRouter.close();
        stackRouter.close();
      },
    });

    return false;
  });

  return <form>{/* fields */}</form>;
}
```

这里连续关闭两次：

1. 关闭确认弹窗。
2. 再关闭原表单弹窗。

## 多个守卫

同一弹窗实例可以注册多个关闭守卫。只要有一个返回 `false`，本次关闭就会被阻止。

```tsx
focusLock.useWhenClose(() => validateDraft());
focusLock.useWhenClose(() => checkUploadFinished());
```

## 与浏览器返回配合

开启 `urlManage` 后，浏览器返回也会调用 `close`。关闭守卫返回 `false` 时，库会尝试恢复浏览器历史，但这会受到浏览器限制。对强确认流程，建议配合业务路由或原生容器能力处理返回拦截。
