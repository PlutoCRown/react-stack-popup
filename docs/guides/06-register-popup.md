---
title: 注册弹窗 RegisterPopup
description: RegisterPopup 的参数、返回值和类型推导规则。
---

# 注册弹窗 RegisterPopup

`RegisterPopup` 用于声明一个弹窗配置。

```ts
RegisterPopup(id, content, wrapper, wrapperProps);
```

参数：

| 参数 | 说明 |
| --- | --- |
| `id` | 弹窗唯一 ID，必须是字符串 |
| `content` | 弹窗内容组件，接收 `open` 时传入的 args |
| `wrapper` | 外层 Wrapper 组件 |
| `wrapperProps` | Wrapper 的默认参数，可选 |

示例：

```tsx
import { MaskWrapper, RegisterPopup } from "react-stack-popup";

type ConfirmProps = {
  title: string;
  onConfirm: () => void;
};

function ConfirmPopup({ title, onConfirm }: ConfirmProps) {
  return (
    <div>
      <h3>{title}</h3>
      <button onClick={onConfirm}>确定</button>
    </div>
  );
}

const popups = [
  RegisterPopup("confirm", ConfirmPopup, MaskWrapper, {
    maskClosable: false,
  }),
] as const;
```

## wrapperProps 的类型检查

`wrapperProps` 会根据第三个参数的 Wrapper 类型推导。

```tsx
RegisterPopup("confirm", ConfirmPopup, MaskWrapper, {
  opacity: 0.4,
  maskClosable: false,
});
```

如果传入 `MaskWrapper` 不支持的参数，TypeScript 会报错。

## 内容组件会被 memo

`RegisterPopup` 内部会使用 `memo(content)` 包装内容组件，减少不必要渲染。内容组件仍然应该保持普通 React 组件写法，不要依赖每次父级 render 都重新执行。

## ID 命名建议

建议用稳定枚举或字面量对象集中管理 ID：

```ts
export const PopupId = {
  Confirm: "confirm",
  Profile: "profile",
  EditForm: "edit-form",
} as const;
```

大型项目中不要散落硬编码字符串，否则重命名时很难排查。
