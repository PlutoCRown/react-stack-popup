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
  /** 是否需要管理URL，default: false */
  urlManage?: boolean
  /** 是否减少动画，default: false */
  prefersReducedMotion?: boolean
  /** 是否启用 react-freeze，优化 default: true */
  freeze?: boolean
  /** 是否 suspense，传react组件可以自定义fallback, default: true */
  suspense?: boolean | StackWrapperComponent<{ fallback?: ReactNode }>
  /** 是否 errorBoundary，传react组件可以自定义fallback, default: true */
  errorBoundary?: boolean | StackWrapperComponent
  /** 是否启用硬卸载，可能导致组件内部状态丢失 */
  unloadDistance?: number
  /** 外部控制功能 */
  lock?: import("./store/FocusLock").FocusLock | null
}

export interface StackItem<ID extends string, T extends any, W extends WrapperBaseProps> {
  id: ID
  key: string
  args: T
  /** 弹窗的公共配置 */
  popupConfig?: PopupConfig<ID, T, W>
  visible: boolean
  /** 如果被冻结，这里记录让它冻结的那一层 key */
  freeze: string | null
  /** 每个弹窗内独立的消息通道 */
  channel: EventBus<StackItemChannelEvents>
}

export type StackItemChannelEvents = {
  willEnter: null
  willClose: null
  destroy: null
  entered: boolean
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
  markEntered: (key: string, coverPrevious: boolean) => void
  close: (key: string) => void
  destroy: (key: string) => void
}
