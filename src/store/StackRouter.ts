import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { PopupConfig, StackRouterConfig, StackItem, RouterState, WrapperBaseProps } from '../types'
import { EventBus } from '../utils/EventBus'

// Define event types for StackRouter
export interface StackRouterEvents<ID extends string> {
  open: { id: ID }
  close: { id: ID | null }
  [key: string]: object | null
}

export class StackRouter<ID extends string, T extends object, W extends WrapperBaseProps> {
  private popupConfigs: Map<ID, PopupConfig<ID, T, W>>
  config: StackRouterConfig

  private store: ReturnType<typeof createStore<ID, T, W>>
  private keyCounter = 0

  // Public EventBus channel
  public readonly channel: EventBus<StackRouterEvents<ID>>

  constructor(popups: readonly PopupConfig<ID, T, W>[], config: StackRouterConfig = {}) {
    this.popupConfigs = new Map(popups.map(p => [p.id, p]))
    this.config = config
    this.store = createStore<ID, T, W>()
    this.channel = new EventBus<StackRouterEvents<ID>>()



    if (config.urlManage) {
      window.addEventListener('popstate', this.handlePopState)
    }
  }

  private generateKey(): string {
    return `popup-${Date.now()}-${this.keyCounter++}`
  }

  private get instance() {
    return this.store.getState()
  }

  subscribe = (listener: (state: any) => void) => {
    return this.store.subscribe(listener)
  }

  private handlePopState = (event: PopStateEvent) => {
    // Handle browser back/forward navigation
    if (event.state && event.state.popupId) {
      this.close(event.state.popupId)
    }
  }

  open = (id: ID, args: object) => {
    const popupConfig = this.popupConfigs.get(id)
    const stackItem: StackItem<ID, T, W> = {
      id,
      key: this.generateKey(),
      args,
      popupConfig,
      visible: true,
      freeze: false,
    }
    this.instance.open(stackItem)
    this.channel.emit('open', { id })
  }

  close = (id?: ID) => {
    this.channel.emit('close', { id: id || null })
    this.instance.close(id)

  }

  getStack = () => this.instance.stack
}

function createStore<ID extends string, T extends object, W extends WrapperBaseProps>() {
  return create<RouterState<ID, T, W>>()(
    immer((set, get) => ({
      stack: [],
      open: (item: StackItem<ID, T, W>) => {
        set((state) => {
          state.stack.push(item as any)
        })
      },
      close: (id) => {
        const { stack } = get()
        const targetKey = id ? stack.find(i => i.id)?.key : stack.findLast(i => i.visible)?.key
        if (!targetKey) return;
        set((state) => {
          const item = state.stack.find(i => i.key == targetKey)
          if (!item) return;
          item.visible = false
        })
        const target = stack.find(i => i.key === targetKey)
        const duration = target?.popupConfig?.wrapperProps?.duration || 300
        setTimeout(() => {
          set({ stack: stack.filter(item => item.key !== targetKey) })
        }, duration + 50)
      }
    }))
  )
}