import React, { ReactNode } from 'react'

export type WrapperBaseProps = {
  visible: boolean
  onClose: () => void | Promise<void>
  duration?: number
  children: ReactNode
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
  args: object
  popupConfig?: PopupConfig<ID, T, W>
  visible: boolean,
  freeze: boolean
}

export interface RouterState<ID extends string, T extends object, W extends WrapperBaseProps> {
  stack: StackItem<ID, T, W>[]
  open: (item: StackItem<ID, T, W>) => void
  close: (id?: ID) => void
}