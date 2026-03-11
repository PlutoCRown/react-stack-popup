import React, { ReactNode } from 'react'
import { PopupConfig, Wrapper, WrapperBaseProps } from '../types'

export type RegisterPopupOptions<ID extends string, T extends object, W extends WrapperBaseProps> = {
  id: ID
  content: React.FC<T>
  wrapper: Wrapper<W>
  wrapperProps?: W
}

export function RegisterPopup<ID extends string, T extends object, W extends WrapperBaseProps>(
  options: RegisterPopupOptions<ID, T, W>
): PopupConfig<ID, T, W> {
  return options
}
