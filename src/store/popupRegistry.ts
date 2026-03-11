import { ReactNode } from 'react'
import { PopupConfig, Wrapper } from '../types'

export type RegisterPopupOptions<ID extends string, T extends object, W = any> = {
  id: ID
  content: (...args: T) => ReactNode
  wrapper: Wrapper<W, T>
  wrapperProps?: W
}

export function RegisterPopup<ID extends string, T extends object, W = any>(
  options: RegisterPopupOptions<ID, T, W>
): PopupConfig<ID, T, W> {
  return {
    id: options.id,
    content: options.content,
    wrapper: options.wrapper,
    wrapperProps: options.wrapperProps
  }
}
