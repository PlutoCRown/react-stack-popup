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
  private historyManager?: HistoryManager<StackRouterId<Config>>
  private keyCounter = 0

  // Public EventBus channel
  public readonly channel: EventBus<StackRouterEvents<StackRouterId<Config>>>

  constructor(popups: Config, config: StackRouterConfig = {}) {
    // @ts-expect-error any
    this.popupConfigs = popups.reduce((obj, value) => {
      // @ts-expect-error any
      obj[value.id] = value;
      return obj
    }, {})

    this.config = config
    this.store = createStore()
    this.channel = new EventBus<StackRouterEvents<StackRouterId<Config>>>()

    if (config.urlManage) {
      this.historyManager = new HistoryManager<StackRouterId<Config>>({
        onPop: (id) => {
          this.closeFromHistory(id ?? undefined)
        },
      })
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

  open<Ex extends StackRouterId<Config>,>(id: Ex, args: StackRouterArgs<Config, Ex>, extra?: StackRouterOpenOptions) {

    // const options = (openArgs.length === 3 ? openArgs[2] : undefined) as StackRouterOpenOptions | undefined
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
    if (this.historyManager) {
      this.historyManager.push(id, extra?.url)
    }
  }

  private closeInternal = (id?: StackRouterId<Config>, fromHistory?: boolean) => {
    this.channel.emit('close', { id: id || null })
    this.instance.close(id)
    if (this.historyManager && !fromHistory) {
      this.historyManager.pop()
    }
  }

  close = (id?: StackRouterId<Config>) => {
    this.closeInternal(id)
  }

  private closeFromHistory = (id?: StackRouterId<Config>) => {
    this.closeInternal(id, true)
  }

  getStack = () => this.instance.stack
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
