import { ReactNode, ComponentType } from 'react'

// Wrapper function type
export type WrapperFunction<W = any, T extends any[] = any[]> = (
  preset: ReactNode,
  wrapperProps?: W,
  ...args: T
) => ReactNode

// Wrapper component type (for components like MaskWrapper, PageWrapper)
export type WrapperComponent<W = any> = ComponentType<W & { children: ReactNode }>

// Union type that accepts both function and component
export type Wrapper<W = any, T extends any[] = any[]> =
  | WrapperFunction<W, T>
  | WrapperComponent<W>

export interface PopupConfig<ID extends string, T extends any[], W = any> {
  id: ID
  content: (...args: T) => ReactNode
  wrapper?: Wrapper<W, T>
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