import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  PopupConfigArray,
  StackRouterArgs,
  StackRouterConfig,
  StackRouterId,
  StackRouterOpenOptions,
  StackRouterWrapperProps,
  StackItem,
  RouterState,
  WrapperBaseProps,
  StackRouterOpenArgs,
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
  config: Required<StackRouterConfig>

  private store: ReturnType<typeof createStore<
    StackRouterId<Config>,
    StackRouterArgs<Config, StackRouterId<Config>>,
    StackRouterWrapperProps<Config, StackRouterId<Config>>
  >>
  private historyManager?: HistoryManager
  private keyCounter = 0
  public readonly channel: EventBus<StackRouterEvents<StackRouterId<Config>>>

  constructor(popups: Config, config: Partial<StackRouterConfig> = {}) {
    const defaultConfig: Required<StackRouterConfig> = {
      urlManage: false,
      freeze: true,
      suspense: true,
      errorBoundary: true,
      unloadDistance: Infinity,
      lock: null,
    }
    this.config = Object.assign(defaultConfig, config)
    // @ts-expect-error any
    this.popupConfigs = popups.reduce((obj, value) => (obj[value.id] = value, obj), {})
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
  // 对外 API， 都用箭头函数避免this指去奇奇怪怪的地方
  open = <Ex extends StackRouterId<Config>,>(id: Ex, args: StackRouterOpenArgs<Config, Ex>, extra?: StackRouterOpenOptions) => {
    if (this.config.lock?.shouldIgnoreOpen()) return Promise.reject()
    const stackItem = {
      id,
      key: this.generateKey(),
      args: args as StackRouterArgs<Config, Ex>,
      visible: true,
      freeze: false,
    }
    this.instance.open(stackItem)
    this.channel.emit('open', { id })
    this.historyManager?.push(extra?.url)
    return Promise.resolve()
  }
  close = async (id?: StackRouterId<Config>) => {
    if (this.config.lock?.shouldIgnoreClose()) return Promise.reject()
    const stack = this.instance.stack
    const target = id ? stack.find(i => i.id === id) : stack.findLast(i => i.visible)
    console.log('想要关闭', target)
    const duration = target ? (this.popupConfigs[target.id]?.wrapperProps?.duration ?? 300) : 0
    if (!target) return Promise.resolve()
    const okToClose = await (this.config.lock?.runCloseHooks(target.key) ?? Promise.resolve(true))
    if (!okToClose) return Promise.resolve()
    this.channel.emit('close', { id: id || null })
    this.instance.close(target.key, duration)
    this.historyManager?.pop()
    return Promise.resolve()
  }

  // 服务于 Hook
  getStack = () => this.instance.stack
  subscribe = (listener: (...args: any) => any) => this.store.subscribe(listener)

}

function createStore<ID extends string, T extends any, W extends WrapperBaseProps>() {
  return create<RouterState<ID, T, W>>()(
    immer((set) => ({
      stack: [],
      open: (item: StackItem<ID, T, W>) => {
        set((state) => {
          state.stack.push(item as any)
        })
      },
      close: (key, duration = 300) => {
        set((draft) => {
          const item = draft.stack.find(i => i.key == key)
          if (!item) return;
          item.visible = false
        })
        setTimeout(() => {
          set(draft => {
            draft.stack = draft.stack.filter(item => item.key !== key)
          })
        }, duration)
      }
    }))
  )
}
