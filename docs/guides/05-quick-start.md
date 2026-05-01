---
title: 最小可用示例
description: 用最少代码完成弹窗注册、打开和渲染。
---

# 最小可用示例

下面是一个完整的最小示例。

```tsx
import {
  MaskWrapper,
  PopupRenderer,
  RegisterPopup,
  StackRouter,
} from "react-stack-popup";
import "react-stack-popup/style.css";

type ProfilePopupProps = {
  userId: string;
};

function ProfilePopup({ userId }: ProfilePopupProps) {
  return (
    <div style={{ padding: 20, background: "#fff" }}>
      <h3>用户信息</h3>
      <p>User: {userId}</p>
    </div>
  );
}

const popups = [
  RegisterPopup("profile", ProfilePopup, MaskWrapper),
] as const;

export const stackRouter = new StackRouter(popups, {
  urlManage: false,
});

export function App() {
  return (
    <>
      <button onClick={() => stackRouter.open("profile", { userId: "42" })}>
        打开用户弹窗
      </button>
      <PopupRenderer stackRouter={stackRouter} />
    </>
  );
}
```

关键点：

- `popups` 后面要加 `as const`，否则弹窗 ID 和 props 类型会变宽。
- `ProfilePopup` 的 props 要显式声明，类型推导才准确。
- `PopupRenderer` 应该只挂一次，通常放在应用根组件。
- `stackRouter.open` 的第二个参数会传给对应弹窗内容组件。

## 关闭弹窗

内置 `MaskWrapper`、`SheetWrapper`、`DrawerWrapper` 会把 `onClose` 接到遮罩点击等交互上。内容组件也可以通过 `useStackState` 获取只关闭当前层的函数：

```tsx
import { useStackState } from "react-stack-popup";

function ProfilePopup({ userId }: ProfilePopupProps) {
  const stack = useStackState();

  if (!stack.inStack) return null;

  return (
    <div>
      <p>User: {userId}</p>
      <button onClick={stack.onClose}>关闭</button>
    </div>
  );
}
```
