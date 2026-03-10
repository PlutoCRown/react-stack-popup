import { ReactNode } from 'react'

export interface PopupConfig<ID extends string, T extends any[], W = any> {
  id: ID
  content: (...args: T) => ReactNode
  wrapper?: (preset: ReactNode, wrapperProps?: W, ...args: T) => ReactNode
  wrapperProps?: W
}

export interface WrapperCallback<ID extends string> {
  onClose?: (id?: ID) => void
}

export interface StackRouterConfig {
  urlManage?: boolean
}

export type PopupID = string

export interface StackItem<ID extends string = string, T extends any[] = any[], W = any> {
  id: ID
  args: any[]
  config?: any
  popupConfig?: PopupConfig<ID, T, W>
}

export interface RouterState<ID extends string = string, T extends any[] = any[], W = any> {
  stack: StackItem<ID, T, W>[]
}