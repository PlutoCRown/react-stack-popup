import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { PopupConfig, StackRouterConfig, StackItem, RouterState, WrapperBaseProps } from '../types'
import { EventBus } from '../utils/EventBus'

// Define event types for StackRouter
type StackRouterEvents<ID extends string> = {
  open: { id: ID }
  close: { id: ID | null }
}

type PopupArray = readonly PopupConfig<any, any, any>[]
type IdOf<C extends PopupArray> = C[number]['id']
type ConfigOf<C extends PopupArray, Id extends IdOf<C>> = Extract<C[number], { id: Id }>
type ArgsOf<C extends PopupArray, Id extends IdOf<C>> = Parameters<ConfigOf<C, Id>['content']>[0]
type WrapperPropsOf<C extends PopupArray, Id extends IdOf<C>> = Parameters<ConfigOf<C, Id>['wrapper']>[0]

export class StackRouter<Config extends PopupArray> {
  popupConfigs: { [P in IdOf<Config>]: ConfigOf<Config, P> }


  config: StackRouterConfig

  private store: ReturnType<typeof createStore<
    IdOf<Config>,
    ArgsOf<Config, IdOf<Config>>,
    WrapperPropsOf<Config, IdOf<Config>>
  >>
  private keyCounter = 0

  // Public EventBus channel
  public readonly channel: EventBus<StackRouterEvents<IdOf<Config>>>

  constructor(popups: Config, config: StackRouterConfig = {}) {
    // @ts-expect-error any
    this.popupConfigs = popups.reduce((obj, value) => {
      obj[value.id] = value;
      return obj
    }, {})

    this.config = config
    this.store = createStore()
    this.channel = new EventBus<StackRouterEvents<IdOf<Config>>>()



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

  open<Ex extends IdOf<Config>>(id: Ex, args: ArgsOf<Config, Ex>) {
    const popupConfig = this.popupConfigs[id]
    const stackItem: StackItem<
      IdOf<Config>,
      ArgsOf<Config, Ex>,
      WrapperPropsOf<Config, Ex>
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

  close = (id?: IdOf<Config>) => {
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
