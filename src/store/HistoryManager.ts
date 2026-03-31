type HistoryManagerOptions = {
  onPop: () => void | Promise<void>
}

export class HistoryManager {
  private onPop: () => void | Promise<void>
  private popThisFrame = false
  private scheduled = false
  private pendingPushes: Array<string> = []
  private suppressPop = 0
  private handlingPopState = false

  constructor(options: HistoryManagerOptions) {
    this.onPop = options.onPop
    window.addEventListener('popstate', this.handlePopState)
  }

  dispose() {
    window.removeEventListener('popstate', this.handlePopState)
  }

  push(url: string = window.location.href) {
    if (this.popThisFrame) {
      this.pendingPushes.push(url)
      this.scheduleNextFrame()
      return
    }
    window.history.pushState({}, '', url)
  }

  pop() {
    if (this.pendingPushes.length > 0) {
      this.pendingPushes.pop()
      return
    }
    this.markPopThisFrame()
    if (this.handlingPopState) {
      return
    }
    this.suppressPop++
    window.history.back()
  }

  private handlePopState = async (_event: PopStateEvent) => {
    if (this.suppressPop > 0) {
      this.suppressPop--
      return
    }
    this.handlingPopState = true
    try {
      await this.onPop()
    } finally {
      this.handlingPopState = false
    }
  }

  private markPopThisFrame() {
    if (this.popThisFrame) return
    this.popThisFrame = true
    this.scheduleNextFrame()
  }

  private scheduleNextFrame() {
    if (this.scheduled) return
    this.scheduled = true
    requestAnimationFrame(() => {
      this.scheduled = false
      this.popThisFrame = false
      if (this.pendingPushes.length === 0) return
      const pushes = this.pendingPushes
      this.pendingPushes = []
      for (const url of pushes) {
        window.history.pushState({}, '', url)
      }
    })
  }
}
