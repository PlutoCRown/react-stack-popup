import { ReactNode, Suspense, createElement } from 'react'
import { PopupConfig, Wrapper } from '../types'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Freeze } from '../components/Freeze'
import { PopupLoading } from '../components/PopupLoading'

export type RegisterPopupOptions<ID extends string, T extends any[], W = any> = {
  id: ID
  content: (...args: T) => ReactNode
  wrapper?: Wrapper<W, T>
  wrapperProps?: W
  freeze?: boolean
  suspense?: boolean
  errorBoundary?: boolean
  suspenseFallback?: ReactNode
  errorFallback?: ReactNode
}

export function RegisterPopup<ID extends string, T extends any[], W = any>(
  options: RegisterPopupOptions<ID, T, W>
): PopupConfig<ID, T, W> {
  const {
    id,
    content: originalContent,
    wrapper,
    wrapperProps,
    freeze = true,
    suspense = true,
    errorBoundary = true,
    suspenseFallback,
    errorFallback,
  } = options

  // Wrap content with freeze, suspense, and error boundary
  const wrappedContent = (...args: T): ReactNode => {
    let result = originalContent(...args)

    // Wrap with Freeze
    if (freeze) {
      result = createElement(Freeze, { freeze, children: result })
    }

    // Wrap with Suspense
    if (suspense) {
      result = createElement(
        Suspense,
        { fallback: suspenseFallback || createElement(PopupLoading), children: result }
      )
    }

    // Wrap with ErrorBoundary
    if (errorBoundary) {
      result = createElement(ErrorBoundary, { fallback: errorFallback, children: result })
    }

    return result
  }

  return {
    id,
    content: wrappedContent,
    wrapper,
    wrapperProps
  }
}
