import React, { CSSProperties, ReactNode } from 'react'
import type { EventBus } from './utils/EventBus'

// 所有弹窗外层 Wrapper 的基础属性。
// 为了兼容各种自定义 Wrapper，这里将 visible/onClose 都设为可选，
// 实际使用时由 PopupRenderer 统一注入。
export type WrapperBaseProps = {
  visible?: boolean
  onClose?: () => void | Promise<void>
  duration?: number
  children?: ReactNode // children 由 JSX 传入，这里不强制在 wrapperProps 中必填
  // 样式相关
  className?: string
  style?: CSSProperties
}

// Wrapper function type
export type Wrapper<W extends WrapperBaseProps> = React.FC<W>

export interface PopupConfig<ID extends string, T extends any, W extends WrapperBaseProps> {
  id: ID
  content: React.FC<T>
  wrapper: Wrapper<W>
  wrapperProps?: W
}

type EmptyObject = Record<string, never>
export type PopupConfigArray = readonly PopupConfig<any, any, any>[]
export type StackRouterId<C extends PopupConfigArray> = C[number]['id']

export type StackRouterArgs<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  Parameters<Extract<C[number], { id: Id }>['content']>[0]

// 做此步封装的原因是 如果内容组件没写React.FC<参数>类型声明。默认是object，这时候只允许传空对象，避免外部误解
export type StackRouterOpenArgs<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  object extends StackRouterArgs<C, Id> ? EmptyObject : StackRouterArgs<C, Id>

export type StackRouterWrapperProps<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  Parameters<Extract<C[number], { id: Id }>['wrapper']>[0]

export type StackRouterItem<C extends PopupConfigArray, Id extends StackRouterId<C> = StackRouterId<C>> =
  StackItem<Id, StackRouterArgs<C, Id>, StackRouterWrapperProps<C, Id>>

export type StackRouterOpenOptions = { url: string }

export type StackRouterOpenArgsWithOptions<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  [id: Id, args: StackRouterArgs<C, Id>, options: StackRouterOpenOptions]

export type StackRouterState<C extends PopupConfigArray> = RouterState<
  StackRouterId<C>,
  StackRouterArgs<C, StackRouterId<C>>,
  StackRouterWrapperProps<C, StackRouterId<C>>
>

export type StackWrapperComponent<P extends object = {}> = React.ComponentType<P & { children: ReactNode }>

export interface StackRouterConfig {
  urlManage?: boolean
  prefersReducedMotion?: boolean
  freeze?: boolean
  suspense?: boolean | StackWrapperComponent<{ fallback?: ReactNode }>
  errorBoundary?: boolean | StackWrapperComponent
  unloadDistance?: number
  lock?: import("./store/FocusLock").FocusLock | null
}


export interface StackItem<ID extends string, T extends any, W extends WrapperBaseProps> {
  id: ID
  key: string
  args: T
  popupConfig?: PopupConfig<ID, T, W>
  visible: boolean,
  freeze: boolean
  channel: EventBus<StackItemChannelEvents>
}

export type StackItemChannelEvents = {
  opend: null
  willClose: null
  closed: null
  entered: null
}
export type InStackContext<ID extends string, T extends any, W extends WrapperBaseProps> = StackItem<ID, T, W> & {
  /* 这个 onClose 只会关闭当前层的弹窗 */
  onClose: () => Promise<void>
  useMount: boolean
  config: Required<StackRouterConfig>
  inStack: true
}

export type StackContext<ID extends string, T extends any, W extends WrapperBaseProps> = InStackContext<ID, T, W> | { inStack: false }

export interface RouterState<ID extends string, T extends any, W extends WrapperBaseProps> {
  stack: StackItem<ID, T, W>[]
  open: (item: StackItem<ID, T, W>) => void
  close: (key: string, duration?: number) => void
}
