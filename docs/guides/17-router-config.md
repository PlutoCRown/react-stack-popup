---
title: StackRouter 配置指南
description: StackRouterConfig 的全部参数、默认值和使用建议。
---

# StackRouter 配置指南

`StackRouter` 构造函数：

```tsx
const stackRouter = new StackRouter(popups, config);
```

`config` 是可选对象。默认配置：

```ts
{
  urlManage: false,
  prefersReducedMotion: false,
  freeze: true,
  suspense: true,
  errorBoundary: true,
  unloadDistance: Infinity,
  lock: null,
}
```

## 参数表

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `urlManage` | `false` | 是否通过 History API 管理返回键 |
| `prefersReducedMotion` | `false` | 是否把 `--rsp-duration` 设为 `0s` |
| `freeze` | `true` | 是否启用 `react-freeze` 冻结历史层 |
| `suspense` | `true` | 是否包裹 `Suspense`，也可传自定义组件 |
| `errorBoundary` | `true` | 是否包裹错误边界，也可传自定义组件 |
| `unloadDistance` | `Infinity` | 最多渲染最近 N 层 |
| `lock` | `null` | 接入 `FocusLock` |

## 推荐配置

移动端页面流：

```tsx
const stackRouter = new StackRouter(popups, {
  urlManage: true,
  freeze: true,
  unloadDistance: 5,
  prefersReducedMotion: window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches,
});
```

仅用于确认弹窗：

```tsx
const stackRouter = new StackRouter(popups, {
  urlManage: false,
  unloadDistance: 3,
});
```

禁用系统包装：

```tsx
const stackRouter = new StackRouter(popups, {
  suspense: false,
  errorBoundary: false,
});
```

## 自定义 Suspense

```tsx
const stackRouter = new StackRouter(popups, {
  suspense: ({ children, fallback }) => (
    <React.Suspense fallback={fallback ?? <div>Loading</div>}>
      {children}
    </React.Suspense>
  ),
});
```

## 自定义 ErrorBoundary

```tsx
function PopupBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div className="popup-boundary">
      {children}
    </div>
  );
}

const stackRouter = new StackRouter(popups, {
  errorBoundary: PopupBoundary,
});
```

自定义组件必须接收 `children`。如果需要真正捕获错误，应在 `PopupBoundary` 内使用你项目自己的错误边界组件。

## 公开属性和方法

`StackRouter` 实例上可以访问这些公开成员：

| 成员 | 说明 |
| --- | --- |
| `popupConfigs` | 由注册数组转换成的配置表，按弹窗 ID 索引 |
| `config` | 合并默认值后的最终配置 |
| `channel` | router 级事件通道，包含 `open` 和 `close` |
| `ErrorBoundary` | 当前使用的错误边界组件，可能为空 |
| `Suspense` | 当前使用的 Suspense 组件，可能为空 |
| `open(id, args, options?)` | 打开弹窗 |
| `close(id?)` | 关闭弹窗 |
| `getStack()` | 获取当前栈数组 |
| `subscribe(listener)` | 订阅内部 store 变化 |

业务代码最常用的是 `open`、`close` 和 `channel`。`getStack`、`subscribe` 主要用于自定义渲染、调试或高级集成。

```tsx
const stack = stackRouter.getStack();

const unsubscribe = stackRouter.subscribe((state) => {
  console.log(state.stack);
});

unsubscribe();
```
