import { Log } from "../utils/log"

type HistoryManagerOptions = {
  onPop: () => void | Promise<void>
}
const sleep = (time: number) => new Promise(r => setTimeout(r, time))
const log = Log("HistoryManager", false)

export class HistoryManager {
  private onPop: () => void | Promise<void>
  private popThisFrame = false
  private scheduled = false
  // private pendingPushes: Array<string> = []
  private pendingAction: Array<() => void> = []
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
      this.pendingAction.push(() => window.history.pushState({}, '', url))
      this.scheduleNextFrame()
      return
    }
    log('正常放入')
    window.history.pushState({}, '', url)
  }

  pop() {
    if (this.pendingAction.length > 0) {
      this.pendingAction.pop()
      log('防循环')
      return
    }
    this.markPopThisFrame()
    if (this.handlingPopState) {
      return
    }
    log('返回')
    this.suppressPop++
    window.history.back()
  }

  private handlePopState = async (_event: PopStateEvent) => {
    log("浏览器返回")
    this.markPopThisFrame()
    if (this.suppressPop > 0) {
      this.suppressPop--
      return
    }
    this.handlingPopState = true
    try {
      log('浏览器返回传播')
      await this.onPop()
    } catch {
      // 浏览器返回已发生，但 close 被拒绝，主动前进恢复到返回前状态。
      log("恢复路径")
      this.pendingAction.unshift(() => {
        this.suppressPop++
        window.history.forward()
        console.warn('FIXME: 这里必须人工点一下屏幕浏览器才认，而且很快Chrome再也不认这样的行为，会被认定为拦截。有原生层的建议此时对返回事件断开链接直到下一次交互。或则程序化替代交互（不能在JS层做）')
      })
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
    requestAnimationFrame(async () => {
      this.scheduled = false
      this.popThisFrame = false
      if (this.pendingAction.length === 0) return
      const pushes = this.pendingAction
      this.pendingAction = []
      for await (const action of pushes) {
        log('异步放入', action)
        /** 为什么是这个魔法数字？小于3都不行 */
        await sleep(3)
        action()
      }
    })
  }
}
