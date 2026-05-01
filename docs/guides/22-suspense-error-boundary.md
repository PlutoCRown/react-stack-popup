---
title: Suspense 与 ErrorBoundary
description: 弹窗内容的异步加载和错误隔离。
---

# Suspense 与 ErrorBoundary

`StackRouter` 默认给弹窗内容包裹 `Suspense` 和错误边界：

```tsx
const stackRouter = new StackRouter(popups, {
  suspense: true,
  errorBoundary: true,
});
```

## Suspense

当 `suspense: true` 时，内部使用 React 的 `Suspense`，fallback 是库内置的 `PopupLoading`。

可以传自定义组件：

```tsx
const stackRouter = new StackRouter(popups, {
  suspense: ({ children, fallback }) => (
    <React.Suspense fallback={fallback ?? <div>加载中</div>}>
      {children}
    </React.Suspense>
  ),
});
```

关闭 Suspense：

```tsx
const stackRouter = new StackRouter(popups, {
  suspense: false,
});
```

## ErrorBoundary

当 `errorBoundary: true` 时，弹窗内容抛错不会直接破坏整个应用树。

可以传自定义错误边界：

```tsx
function PopupErrorBoundary({ children }: { children: React.ReactNode }) {
  return <MyErrorBoundary>{children}</MyErrorBoundary>;
}

const stackRouter = new StackRouter(popups, {
  errorBoundary: PopupErrorBoundary,
});
```

关闭错误边界：

```tsx
const stackRouter = new StackRouter(popups, {
  errorBoundary: false,
});
```

## 懒加载弹窗

```tsx
const HeavyPopup = React.lazy(() => import("./HeavyPopup"));

const popups = [
  RegisterPopup("heavy", HeavyPopup, PageWrapper),
] as const;
```

如果关闭 `suspense`，懒加载组件需要在外层自行提供 `Suspense`。
