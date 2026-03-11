import { useState, useEffect } from 'react'
import { StackRouter } from '../store/StackRouter'
import { PopupConfigArray, StackRouterItem } from '../types'

export function useStackRouter<Config extends PopupConfigArray>(stackRouter: StackRouter<Config>): StackRouterItem<Config>[] {
  const [stack, setStack] = useState<StackRouterItem<Config>[]>(stackRouter.getStack())

  useEffect(() => stackRouter.subscribe((state) => {
    setStack(state.stack)
  }), [stackRouter])

  return stack
}
