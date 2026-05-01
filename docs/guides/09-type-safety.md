---
title: 类型安全优势
description: 弹窗 ID、props 和 wrapperProps 的端到端类型推导。
---

# 类型安全优势

`react-stack-popup` 的类型安全来自注册数组。

```tsx
const popups = [
  RegisterPopup("profile", ProfilePopup, MaskWrapper),
  RegisterPopup("confirm", ConfirmPopup, MaskWrapper),
] as const;

const router = new StackRouter(popups);
```

`StackRouter` 会从 `popups` 推导：

- 可打开的弹窗 ID 联合类型
- 每个 ID 对应的内容组件 props
- 每个 ID 对应的 Wrapper props
- 栈节点类型

## ID 类型检查

```tsx
router.open("profile", { userId: "42" });

// TypeScript 报错：没有注册这个 ID
router.open("missing", {});
```

## props 类型检查

```tsx
type ProfilePopupProps = {
  userId: string;
};

function ProfilePopup({ userId }: ProfilePopupProps) {
  return <div>{userId}</div>;
}

router.open("profile", { userId: "42" });

// TypeScript 报错：userId 必填
router.open("profile", {});

// TypeScript 报错：userId 类型不对
router.open("profile", { userId: 42 });
```

## 空参数弹窗

没有 props 的弹窗可以这样写：

```tsx
function AboutPopup() {
  return <div>About</div>;
}

const popups = [
  RegisterPopup("about", AboutPopup, MaskWrapper),
] as const;

router.open("about", {});
```

当前 `open` 需要第二个参数。无参数弹窗传 `{}`。

## 常见类型丢失原因

1. 忘记 `as const`

```tsx
const popups = [
  RegisterPopup("profile", ProfilePopup, MaskWrapper),
]; // 类型会变宽
```

2. 内容组件 props 没有显式声明

```tsx
const ProfilePopup = (props) => {
  return <div>{props.userId}</div>;
}; // props 可能退化为 any 或 object
```

3. 把注册数组声明成过宽类型

```tsx
const popups: PopupConfigArray = [
  RegisterPopup("profile", ProfilePopup, MaskWrapper),
]; // 会丢失每一项的具体 ID 和 props
```

推荐让 TypeScript 从字面量数组自然推导。
