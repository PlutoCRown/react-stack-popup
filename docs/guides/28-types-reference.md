---
title: 类型 API 参考
description: src/index.ts 暴露的主要类型说明。
---

# 类型 API 参考

本页列出包入口导出的主要类型。

## WrapperBaseProps

```ts
type WrapperBaseProps = {
  visible?: boolean;
  onClose?: () => void | Promise<void>;
  duration?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};
```

所有 Wrapper 的基础 props。

## Wrapper

```ts
type Wrapper<W extends WrapperBaseProps> = React.FC<W>;
```

Wrapper 组件类型。

## PopupConfig

```ts
interface PopupConfig<ID extends string, T, W extends WrapperBaseProps> {
  id: ID;
  content: React.FC<T>;
  wrapper: Wrapper<W>;
  wrapperProps?: W;
}
```

`RegisterPopup` 的返回结构。

## RegisterPopupOptions

```ts
type RegisterPopupOptions<ID extends string, T extends object, W extends WrapperBaseProps> = {
  id: ID;
  content: React.FC<T>;
  wrapper: Wrapper<W>;
  wrapperProps?: W;
};
```

注册弹窗选项类型。当前 `RegisterPopup` 函数使用位置参数，不直接接收这个对象类型。

## PopupConfigArray

```ts
type PopupConfigArray = readonly PopupConfig<any, any, any>[];
```

`StackRouter` 接收的注册数组类型。业务代码通常不需要手写这个类型。

## StackRouterId

```ts
type StackRouterId<C extends PopupConfigArray> = C[number]["id"];
```

从注册数组中提取弹窗 ID 联合类型。

## StackRouterArgs

```ts
type StackRouterArgs<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  Parameters<Extract<C[number], { id: Id }>["content"]>[0];
```

根据 ID 提取内容组件 props。

## StackRouterOpenArgs

```ts
type StackRouterOpenArgs<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  keyof StackRouterArgs<C, Id> extends never
    ? Record<string, never>
    : StackRouterArgs<C, Id>;
```

`open` 第二个参数的实际约束类型。无 props 弹窗会被约束为空对象。

## StackRouterWrapperProps

```ts
type StackRouterWrapperProps<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  Parameters<Extract<C[number], { id: Id }>["wrapper"]>[0];
```

根据 ID 提取 Wrapper props。

## StackRouterOpenOptions

```ts
type StackRouterOpenOptions = {
  url: string;
};
```

`open` 的第三个参数类型。

## StackRouterOpenArgsWithOptions

```ts
type StackRouterOpenArgsWithOptions<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  [id: Id, args: StackRouterArgs<C, Id>, options: StackRouterOpenOptions];
```

包含 URL options 的打开参数元组类型。

## StackRouterState

```ts
type StackRouterState<C extends PopupConfigArray> = RouterState<
  StackRouterId<C>,
  StackRouterArgs<C, StackRouterId<C>>,
  StackRouterWrapperProps<C, StackRouterId<C>>
>;
```

从注册数组推导出的 router store 状态类型。

## StackWrapperComponent

```ts
type StackWrapperComponent<P extends object = {}> =
  React.ComponentType<P & { children: ReactNode }>;
```

`suspense`、`errorBoundary` 自定义包装组件使用的类型。

## StackRouterConfig

```ts
interface StackRouterConfig {
  urlManage?: boolean;
  prefersReducedMotion?: boolean;
  freeze?: boolean;
  suspense?: boolean | StackWrapperComponent<{ fallback?: ReactNode }>;
  errorBoundary?: boolean | StackWrapperComponent;
  unloadDistance?: number;
  lock?: FocusLock | null;
}
```

`StackRouter` 配置。

## StackItem

```ts
interface StackItem<ID extends string, T, W extends WrapperBaseProps> {
  id: ID;
  key: string;
  args: T;
  popupConfig?: PopupConfig<ID, T, W>;
  visible: boolean;
  freeze: string | null;
  channel: EventBus<StackItemChannelEvents>;
}
```

当前栈中每一层的结构。

## StackItemChannelEvents

```ts
type StackItemChannelEvents = {
  willEnter: null;
  willClose: null;
  destroy: null;
  entered: boolean;
};
```

单个弹窗实例内部生命周期事件。

## StackContext

```ts
type StackContext<ID extends string, T, W extends WrapperBaseProps> =
  | InStackContext<ID, T, W>
  | { inStack: false };
```

`useStackState` 的返回类型。

## InStackContext

```ts
type InStackContext<ID extends string, T, W extends WrapperBaseProps> =
  StackItem<ID, T, W> & {
    onClose: () => Promise<void>;
    useMount: boolean;
    config: Required<StackRouterConfig>;
    inStack: true;
  };
```

弹窗内上下文。

## RouterState

```ts
interface RouterState<ID extends string, T, W extends WrapperBaseProps> {
  stack: StackItem<ID, T, W>[];
  open: (item: StackItem<ID, T, W>) => void;
  markEntered: (key: string, coverPrevious: boolean) => void;
  close: (key: string) => void;
  destroy: (key: string) => void;
}
```

内部 store 的状态类型。一般不需要业务直接使用。

## Wrapper Props 类型

内置 Wrapper 也导出对应 props 类型：

| 类型 | 说明 |
| --- | --- |
| `NoneWrapperProps` | `NoneWrapper` 参数类型 |
| `MaskWrapperProps` | `MaskWrapper` 参数类型，扩展 `opacity`、`maskClosable` |
| `SheetWrapperProps` | `SheetWrapper` 参数类型，扩展 `fitContent`、`swipable` 等 |
| `PageWrapperProps` | `PageWrapper` 参数类型 |
| `DrawerWrapperProps` | `DrawerWrapper` 参数类型，扩展 `direction`、`width` 等 |

这些类型适合在自定义封装、二次导出或组合 Wrapper 时使用。
