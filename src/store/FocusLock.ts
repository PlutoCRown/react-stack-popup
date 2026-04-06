import { useEffect } from "react";
import { useStackState } from "../hooks/useStackState";

export enum FocusLockState {
  None = 0,
  IgnoreOpen = 1 << 0,
  IgnoreClose = 1 << 1,
  IgnoreAll = IgnoreOpen | IgnoreClose,
  BlockOpen = 1 << 2,
  BlockClose = 1 << 3,
}

export class FocusLock {
  private ignoreMask: FocusLockState = FocusLockState.None;
  private closeQueue: Promise<void> = Promise.resolve();
  private closeHooks = new Map<string, Set<() => Promise<void>>>();
  private openQueue: Array<() => Promise<void>> = [];
  private openFlushRunning = false;
  private openBlockCount = 0;
  private closeBlockCount = 0;
  private allowOpenCount = 0;

  getState() {
    if (this.closeBlockCount > 0) return FocusLockState.BlockClose;
    if (this.openBlockCount > 0) return FocusLockState.BlockOpen;
    return this.ignoreMask;
  }

  // #region Ignore 部分
  setState(next: FocusLockState) {
    if (next === FocusLockState.BlockOpen) {
      this.openBlockCount = 1;
      this.closeBlockCount = 0;
      return;
    }
    if (next === FocusLockState.BlockClose) {
      this.closeBlockCount = 1;
      this.openBlockCount = 0;
      return;
    }
    this.openBlockCount = 0;
    this.closeBlockCount = 0;
    this.ignoreMask = next & FocusLockState.IgnoreAll;
  }

  shouldIgnoreOpen() {
    return (this.ignoreMask & FocusLockState.IgnoreOpen) !== 0;
  }

  shouldIgnoreClose() {
    return (this.ignoreMask & FocusLockState.IgnoreClose) !== 0;
  }

  shouldBlockOpen() {
    return this.openBlockCount > 0;
  }

  isOpenAllowed() {
    return this.allowOpenCount > 0;
  }
  // #endregion

  // #region Block-Close 部分
  useWhenClose(exec: () => Promise<void>) {
    const context = useStackState()

    useEffect(() => {
      if (!context.inStack) return
      return this.registerCloseHook(context.key, exec)
    }, [context.inStack && context.key, exec])
  }

  private registerCloseHook(key: string, exec: () => Promise<void>) {
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
      for await (const hook of Array.from(hooks)) {
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
    this.closeBlockCount += 1
    return () => {
      this.closeBlockCount = Math.max(0, this.closeBlockCount - 1)
      release()
    }
  }

  // #endregion

  // #region Block-Open 部分
  enqueueOpen(exec: () => Promise<void>) {
    return new Promise<void>((resolve, reject) => {
      this.openQueue.push(async () => {
        try {
          await exec();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async allow<T>(fn: () => T | Promise<T>) {
    this.allowOpenCount += 1;
    try {
      return await fn();
    } finally {
      this.allowOpenCount = Math.max(0, this.allowOpenCount - 1);
    }
  }

  acquireOpenMutex<T extends string>(key: T) {
    this.enterOpenBlock();
    return {
      key,
      allow: <T>(fn: () => T | Promise<T>) => this.allow(fn),
      release: () => this.exitOpenBlock(),
    };
  }

  private enterOpenBlock() {
    this.openBlockCount += 1;
  }

  private exitOpenBlock() {
    if (this.openBlockCount === 0) return;
    this.openBlockCount -= 1;
    if (this.openBlockCount === 0) {
      this.flushOpenQueue();
    }
  }

  private async flushOpenQueue() {
    if (this.openFlushRunning) return;
    this.openFlushRunning = true;
    try {
      while (this.openQueue.length) {
        const job = this.openQueue.shift();
        if (job) await job();
      }
    } finally {
      this.openFlushRunning = false;
    }
  }
  // #endregion
}
