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

export interface PopupConfig<ID extends string, T extends any, W extends WrapperBaseProps> {
  id: ID
  content: React.FC<T>
  wrapper: Wrapper<W>
  wrapperProps?: W
}

export type PopupConfigArray = readonly PopupConfig<any, any, any>[]
export type StackRouterId<C extends PopupConfigArray> = C[number]['id']
export type StackRouterConfigOf<C extends PopupConfigArray, Id extends StackRouterId<C>> = Extract<C[number], { id: Id }>
export type StackRouterContentArgs<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  Parameters<StackRouterConfigOf<C, Id>['content']>[0]
export type StackRouterArgs<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  StackRouterContentArgs<C, Id>
export type StackRouterWrapperProps<C extends PopupConfigArray, Id extends StackRouterId<C>> = Parameters<StackRouterConfigOf<C, Id>['wrapper']>[0]
export type StackRouterItem<C extends PopupConfigArray, Id extends StackRouterId<C> = StackRouterId<C>> = StackItem<
  Id,
  StackRouterArgs<C, Id>,
  StackRouterWrapperProps<C, Id>
>
export type StackRouterOpenOptions = { url: string }
// type StackRouterIsEmptyObject<T> = T extends object ? (keyof T extends never ? true : false) : false
// export type StackRouterOpenArgs<C extends PopupConfigArray, Id extends StackRouterId<C>> =
//   StackRouterArgs<C, Id> extends void | undefined
//   ? [id: Id, args?: StackRouterArgs<C, Id>]
//   : StackRouterIsEmptyObject<StackRouterArgs<C, Id>> extends true
//   ? [id: Id] | [id: Id, args: StackRouterArgs<C, Id>]
//   : [id: Id, args: StackRouterArgs<C, Id>]
export type StackRouterOpenArgsWithOptions<C extends PopupConfigArray, Id extends StackRouterId<C>> =
  [id: Id, args: StackRouterArgs<C, Id>, options: StackRouterOpenOptions]
// StackRouterArgs<C, Id> extends void | undefined
// ? [id: Id]
// | [id: Id, args?: StackRouterArgs<C, Id>]
// | [id: Id, args: StackRouterArgs<C, Id>, options: StackRouterOpenOptions]
// : StackRouterIsEmptyObject<StackRouterArgs<C, Id>> extends true
// ? [id: Id]
// | [id: Id, args: StackRouterArgs<C, Id>]
// | [id: Id, args: StackRouterArgs<C, Id>, options: StackRouterOpenOptions]
// : [id: Id, args: StackRouterArgs<C, Id>]
// | [id: Id, args: StackRouterArgs<C, Id>, options: StackRouterOpenOptions]

export type StackRouterState<C extends PopupConfigArray> = RouterState<
  StackRouterId<C>,
  StackRouterArgs<C, StackRouterId<C>>,
  StackRouterWrapperProps<C, StackRouterId<C>>
>

export interface StackRouterConfig {
  urlManage?: boolean
  freeze?: boolean
  suspense?: boolean
  errorBoundary?: boolean
  suspenseFallback?: ReactNode
  errorFallback?: ReactNode
}


export interface StackItem<ID extends string, T extends any, W extends WrapperBaseProps> {
  id: ID
  key: string
  args: T
  popupConfig?: PopupConfig<ID, T, W>
  visible: boolean,
  freeze: boolean
}

export interface RouterState<ID extends string, T extends any, W extends WrapperBaseProps> {
  stack: StackItem<ID, T, W>[]
  open: (item: StackItem<ID, T, W>) => void
  close: (id?: ID) => void
}
