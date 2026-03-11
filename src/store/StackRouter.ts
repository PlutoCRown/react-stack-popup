import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  PopupConfigArray,
  StackRouterArgs,
  StackRouterConfig,
  StackRouterId,
  StackRouterWrapperProps,
  StackItem,
  RouterState,
  WrapperBaseProps,
} from '../types'
import { EventBus } from '../utils/EventBus'

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

  open<Ex extends StackRouterId<Config>>(id: Ex, args: StackRouterArgs<Config, Ex>) {
    const popupConfig = this.popupConfigs[id]
    const stackItem: StackItem<
      StackRouterId<Config>,
      StackRouterArgs<Config, Ex>,
      StackRouterWrapperProps<Config, Ex>
    > = {
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

  close = (id?: StackRouterId<Config>) => {
    this.channel.emit('close', { id: id || null })
    this.instance.close(id)

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
