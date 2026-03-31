import { useEffect } from "react";
import { useStackState } from "../hooks/useStackState";

export enum FocusLockState {
  None = "none",
  IgnoreOpen = "ignore-open",
  IgnoreClose = "ignore-close",
}

export class FocusLock {
  private state = FocusLockState.None;
  private closeHooks = new Map<string, Set<() => Promise<void>>>();

  getState() {
    return this.state;
  }

  setState(next: FocusLockState) {
    this.state = next;
  }

  shouldIgnoreOpen() {
    return this.state === FocusLockState.IgnoreOpen;
  }

  shouldIgnoreClose() {
    return this.state === FocusLockState.IgnoreClose;
  }

  useWhenClose(exec: () => Promise<void>) {
    const context = useStackState()

    useEffect(() => {
      if (!context.inStack) return
      return this.registerCloseHook(context.key, exec)
    }, [context.inStack && context.key, exec])
  }

  registerCloseHook(key: string, exec: () => Promise<void>) {
    let hooks = this.closeHooks.get(key)
    if (!hooks) {
      hooks = new Set()
      this.closeHooks.set(key, hooks)
    }
    hooks.add(exec)
    return () => {
      const current = this.closeHooks.get(key)
      if (!current) return
      current.delete(exec)
      if (current.size === 0) this.closeHooks.delete(key)
    }
  }

  async runCloseHooks(key: string): Promise<boolean> {
    const hooks = this.closeHooks.get(key)
    if (!hooks || hooks.size === 0) return true
    for (const hook of Array.from(hooks)) {
      try {
        await hook()
      } catch {
        return false
      }
    }
    return true
  }
}
