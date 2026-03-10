import { useState, useEffect } from 'react'
import { StackRouter } from '../store/StackRouter'
import { StackItem } from '../types'

export function useStackRouter<ID extends string, T extends any[], W = any>(stackRouter: StackRouter<ID, T, W>): StackItem<ID, T, W>[] {
  const [stack, setStack] = useState<StackItem<ID, T, W>[]>(stackRouter.getStack())

  useEffect(() => stackRouter.subscribe((state) => {
    setStack(state.stack)
  }), [stackRouter])

  return stack
}