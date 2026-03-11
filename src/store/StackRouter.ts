import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  PopupConfigArray,
  StackRouterArgs,
  StackRouterConfig,
  StackRouterId,
  StackRouterOpenArgsWithOptions,
  StackRouterOpenOptions,
  StackRouterWrapperProps,
  StackItem,
  RouterState,
  WrapperBaseProps,
} from '../types'
import { EventBus } from '../utils/EventBus'
import { HistoryManager } from './HistoryManager'

// Define event types for StackRouter
type StackRouterEvents<ID extends string> = {
  open: { id: ID }
  close: { id: ID | null }
}

type ConfigOf<C extends PopupConfigArray, Id extends StackRouterId<C>> = Extract<C[number], { id: Id }>

export class StackRouter<Config extends PopupConfigArray> {
  popupConfigs: { [P in StackRouterId<Config>]: ConfigOf<Config, P> }
  config: StackRouterConfig

  private store: ReturnType<typeof createStore<
    StackRouterId<Config>,
    StackRouterArgs<Config, StackRouterId<Config>>,
    StackRouterWrapperProps<Config, StackRouterId<Config>>
  >>
  private historyManager?: HistoryManager
  private keyCounter = 0
  public readonly channel: EventBus<StackRouterEvents<StackRouterId<Config>>>

  constructor(popups: Config, config: StackRouterConfig = {}) {
    // @ts-expect-error any
    this.popupConfigs = popups.reduce((obj, value) => (obj[value.id] = value, obj), {})
    this.config = config
    this.store = createStore()
    this.channel = new EventBus<StackRouterEvents<StackRouterId<Config>>>()

    if (config.urlManage) {
      this.historyManager = new HistoryManager({ onPop: this.close })
    }
  }

  private generateKey(): string {
    return `popup-${Date.now()}-${this.keyCounter++}`
  }

  private get instance() {
    return this.store.getState()
  }

  // 对外 API
  open<Ex extends StackRouterId<Config>,>(id: Ex, args: StackRouterArgs<Config, Ex>, extra?: StackRouterOpenOptions) {
    const popupConfig = this.popupConfigs[id]
    const stackItem = {
      id,
      key: this.generateKey(),
      args: args as StackRouterArgs<Config, Ex>,
      popupConfig,
      visible: true,
      freeze: false,
    }
    this.instance.open(stackItem)
    this.channel.emit('open', { id })
    this.historyManager?.push(extra?.url)
  }
  close(id?: StackRouterId<Config>) {
    this.channel.emit('close', { id: id || null })
    this.instance.close(id)
    this.historyManager?.pop()
  }

  // 服务于 Hook
  getStack = () => this.instance.stack
  subscribe = (listener: (state: any) => void) => {
    return this.store.subscribe(listener)
  }

}

function createStore<ID extends string, T extends any, W extends WrapperBaseProps>() {
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
