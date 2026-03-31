import { useStackState } from "../hooks/useStackState";

export enum FocusLockState {
  None = "none",
  BlockOpen = "block-open",
  BlockClose = "block-close",
  IgnoreOpen = "ignore-open",
  IgnoreClose = "ignore-close",
}

export class FocusLock {
  private state = FocusLockState.None;

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

  shouldBlockOpen() {
    return this.state === FocusLockState.BlockOpen;
  }

  shouldBlockClose() {
    return this.state === FocusLockState.BlockClose;
  }


  useWhenClose(exec: () => Promise<void>) {
    const context = useStackState()
    if (!context.inStack) return
    // return exec()
  }
}
