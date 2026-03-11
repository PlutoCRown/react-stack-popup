type HistoryManagerOptions = {
  onPop: () => void
}

export class HistoryManager {
  private onPop: () => void
  private popThisFrame = false
  private scheduled = false
  private pendingPushes: Array<string> = []
  private suppressPop = false

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
    if (this.suppressPop) return
    if (this.pendingPushes.length > 0) {
      this.pendingPushes.pop()
      return
    }
    this.markPopThisFrame()
    window.history.back()
  }

  private handlePopState = (_event: PopStateEvent) => {
    this.markPopThisFrame()
    this.suppressPop = true
    try {
      this.onPop()
    } finally {
      this.suppressPop = false
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
