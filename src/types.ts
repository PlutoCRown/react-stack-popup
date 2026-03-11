import React, { ReactNode } from 'react'

// 所有弹窗外层 Wrapper 的基础属性。
// 为了兼容各种自定义 Wrapper，这里将 visible/onClose 都设为可选，
// 实际使用时由 PopupRenderer 统一注入。
export type WrapperBaseProps = {
  visible?: boolean
  onClose?: () => void | Promise<void>
  duration?: number
  // children 由 JSX 传入，这里不强制在 wrapperProps 中必填
  children?: ReactNode
}

// Wrapper function type
export type Wrapper<W extends WrapperBaseProps> = React.FC<W>

export interface PopupConfig<ID extends string, T extends object, W extends WrapperBaseProps> {
  id: ID
  content: React.FC<T>
  wrapper: Wrapper<W>
  wrapperProps?: W
}

export interface StackRouterConfig {
  urlManage?: boolean
  freeze?: boolean
  suspense?: boolean
  errorBoundary?: boolean
  suspenseFallback?: ReactNode
  errorFallback?: ReactNode
}


export interface StackItem<ID extends string, T extends object, W extends WrapperBaseProps> {
  id: ID
  key: string
  args: T
  popupConfig?: PopupConfig<ID, T, W>
  visible: boolean,
  freeze: boolean
}

export interface RouterState<ID extends string, T extends object, W extends WrapperBaseProps> {
  stack: StackItem<ID, T, W>[]
  open: (item: StackItem<ID, T, W>) => void
  close: (id?: ID) => void
}