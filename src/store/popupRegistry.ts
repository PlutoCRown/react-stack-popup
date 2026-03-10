import { ReactNode } from 'react'
import { PopupConfig } from '../types'

export type RegisterPopupOptions<ID extends string, T extends any[], W = any> = {
  id: ID
  content: (...args: T) => ReactNode
  wrapper?: (preset: ReactNode, wrapperProps?: W, ...args: T) => ReactNode
  wrapperProps?: W
}

export function RegisterPopup<ID extends string, T extends any[], W = any>(
  options: RegisterPopupOptions<ID, T, W>
): PopupConfig<ID, T, W> {
  return {
    id: options.id,
    content: options.content,
    wrapper: options.wrapper,
    wrapperProps: options.wrapperProps
  }
}