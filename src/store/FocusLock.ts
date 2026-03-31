import { useEffect } from "react";
import { useStackState } from "../hooks/useStackState";

export enum FocusLockState {
  None = "none",
  BlockClose = "block-close",
  IgnoreOpen = "ignore-open",
  IgnoreClose = "ignore-close",
}

export class FocusLock {
  private state = FocusLockState.None;
  private closeQueue: Promise<void> = Promise.resolve();
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

  shouldBlockClose() {
    return this.state === FocusLockState.BlockClose;
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

  /** 运行当前层的关闭hooks */
  async runCloseHooks(key: string): Promise<boolean> {
    const hooks = this.closeHooks.get(key)
    if (!hooks || hooks.size === 0) return true
    try {
      for (const hook of Array.from(hooks)) {
        await hook()
      }
      return true
    } catch {
      return false
    }
  }

  async acquireCloseMutex() {
    const prev = this.closeQueue
    let release!: () => void
    this.closeQueue = new Promise<void>((resolve) => {
      release = resolve
    })
    await prev
    const prevState = this.state
    this.state = FocusLockState.BlockClose
    return () => {
      this.state = prevState
      release()
    }
  }
}
