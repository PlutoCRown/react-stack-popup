import React, { ReactNode } from 'react'
import { PopupConfig, Wrapper, WrapperBaseProps } from '../types'

export type RegisterPopupOptions<ID extends string, T extends object, W extends WrapperBaseProps> = {
  id: ID
  content: React.FC<T>
  wrapper: Wrapper<W>
  wrapperProps?: W
}
const __register_popup = Symbol.for("__register_popup")

export function RegisterPopup<ID extends string, T extends object, W extends WrapperBaseProps>(
  id: ID,
  content: React.FC<T>,
  wrapper: Wrapper<W>,
  wrapperProps?: W
): PopupConfig<ID, T, W> {
  return Object.assign({ __register_popup }, { id, content, wrapper, wrapperProps })
}
