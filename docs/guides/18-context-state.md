---
title: Context 与状态读取
description: useStackState、useInStackState 和当前弹窗上下文。
---

# Context 与状态读取

弹窗内容可以读取当前层上下文：

```tsx
import { useStackState } from "react-stack-popup";

function DetailPopup() {
  const stack = useStackState<"detail", { id: string }>();

  if (!stack.inStack) return null;

  return (
    <div>
      <div>ID: {stack.args.id}</div>
      <button onClick={stack.onClose}>关闭</button>
    </div>
  );
}
```

## useStackState

`useStackState` 返回联合类型：

```ts
StackContext<ID, T, W>
```

如果在弹窗内：

```ts
{
  inStack: true,
  id,
  key,
  args,
  visible,
  freeze,
  channel,
  onClose,
  useMount,
  config
}
```

如果不在弹窗内：

```ts
{ inStack: false }
```

因此使用前需要判断：

```tsx
const stack = useStackState();
if (!stack.inStack) return null;
```

## useInStackState

当你确定组件一定在弹窗内，可以使用：

```tsx
import { useInStackState } from "react-stack-popup";

function CloseButton() {
  const stack = useInStackState();
  return <button onClick={stack.onClose}>关闭</button>;
}
```

它和 `useStackState` 读取同一个 Context，只是类型上直接返回弹窗内状态。

## 常用字段

| 字段 | 说明 |
| --- | --- |
| `id` | 当前弹窗 ID |
| `key` | 当前弹窗实例 key |
| `args` | `open` 时传入的内容组件参数 |
| `visible` | 是否可见 |
| `freeze` | 是否被某一层覆盖冻结 |
| `channel` | 当前弹窗实例生命周期事件通道 |
| `onClose` | 关闭当前层 |
| `useMount` | 进入完成后为 `true`，关闭开始后为 `false` |
| `config` | router 的最终配置 |

## useMount 用法

`useMount` 适合在进入动画完成后再触发内部逻辑：

```tsx
function SearchPopup() {
  const stack = useInStackState();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (stack.useMount) inputRef.current?.focus();
  }, [stack.useMount]);

  return <input ref={inputRef} />;
}
```
