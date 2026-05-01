---
title: 渲染入口 PopupRenderer
description: PopupRenderer 的职责、放置位置和渲染行为。
---

# 渲染入口 PopupRenderer

`PopupRenderer` 负责订阅 `StackRouter` 状态，并把弹窗栈渲染到 `document.body`。

```tsx
import { PopupRenderer } from "react-stack-popup";
import { stackRouter } from "./stackRouter";

export function App() {
  return (
    <>
      <MainApp />
      <PopupRenderer stackRouter={stackRouter} />
    </>
  );
}
```

## Props

| prop | 类型 | 说明 |
| --- | --- | --- |
| `stackRouter` | `StackRouter<Config>` | 由注册数组创建的 router 实例 |

## 渲染行为

`PopupRenderer` 会：

- 通过内部订阅拿到当前 stack。
- 根据 `unloadDistance` 截取需要渲染的最近 N 层。
- 为每层弹窗创建内容组件和 Wrapper。
- 注入 `StackStateContext`。
- 根据 router 配置包裹 `Suspense` 和错误边界。
- 通过 portal 渲染到 `document.body`。

## 放置位置

推荐只在应用根部放一个 `PopupRenderer`。如果多个业务域需要独立弹窗栈，可以创建多个 router 和多个 renderer，但要确认它们的层级、URL 管理和锁机制不会互相干扰。

## SSR 注意事项

`PopupRenderer` 使用 `document.body` 作为 portal 目标，所以只能在浏览器环境渲染。SSR 项目中应确保它只在客户端挂载，例如放在 client component 或 mounted 后渲染。

```tsx
function ClientOnlyPopupRenderer() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <PopupRenderer stackRouter={stackRouter} />;
}
```
