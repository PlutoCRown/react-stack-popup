type HistoryManagerOptions<ID extends string> = {
  onPop: (id: ID | null) => void
}

export class HistoryManager<ID extends string> {
  private onPop: (id: ID | null) => void
  private popThisFrame = false
  private scheduled = false
  private pendingPushes: Array<{ state: { popupId: ID }; url?: string }> = []

  constructor(options: HistoryManagerOptions<ID>) {
    this.onPop = options.onPop
    window.addEventListener('popstate', this.handlePopState)
  }

  dispose() {
    window.removeEventListener('popstate', this.handlePopState)
  }

  push(id: ID, url?: string) {
    const state = { popupId: id }
    const targetUrl = url ?? window.location.href
    if (this.popThisFrame) {
      this.pendingPushes.push({ state, url: targetUrl })
      this.scheduleNextFrame()
      return
    }
    window.history.pushState(state, '', targetUrl)
  }

  pop() {
    this.markPopThisFrame()
    window.history.back()
  }

  private handlePopState = (event: PopStateEvent) => {
    this.markPopThisFrame()
    const popupId = (event.state && event.state.popupId) as ID | undefined
    this.onPop(popupId ?? null)
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
      for (const task of pushes) {
        window.history.pushState(task.state, '', task.url)
      }
    })
  }
}
