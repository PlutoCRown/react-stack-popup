import { create } from 'zustand'
import { PopupConfig, StackRouterConfig, StackItem, RouterState } from '../types'

export class StackRouter<ID extends string, T extends any[], W = any> {
  private popupConfigs: Map<ID, PopupConfig<ID, T, W>>
  private config: StackRouterConfig
  private store: ReturnType<typeof createStore<ID, T, W>>

  constructor(popups: readonly PopupConfig<ID, T, W>[], config: StackRouterConfig = {}) {
    this.popupConfigs = new Map(popups.map(p => [p.id, p]))
    this.config = config
    this.store = createStore<ID, T, W>()

    if (config.urlManage) {
      window.addEventListener('popstate', this.handlePopState)
    }
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

  open = (id: ID, args: T[number] extends never ? undefined : T[number], config?: any) => {
    const popupConfig = this.popupConfigs.get(id)
    if (!popupConfig) {
      console.warn(`Popup with id ${id} not found`)
      return
    }

    const stackItem: StackItem<ID, T, W> = {
      id,
      args: args ? [args] : [],
      config,
      popupConfig
    }

    this.store.getState().push(stackItem)

    if (this.config.urlManage) {
      const url = new URL(window.location.href)
      url.searchParams.set('popup', id)
      window.history.pushState({ popupId: id }, '', url)
    }
  }

  close = (id?: ID) => {
    if (id) {
      this.store.getState().popById(id)
    } else {
      this.store.getState().pop()
    }
  }

  getStack = () => {
    return this.store.getState().stack
  }

  getState = () => {
    return this.store.getState()
  }

  getStore = () => {
    return this.store
  }
}

function createStore<ID extends string, T extends any[], W = any>() {
  return create<RouterState<ID, T, W>>((set, _get) => ({
    stack: [],
    push: (item: StackItem<ID, T, W>) => {
      set(state => ({ stack: [...state.stack, item] }))
    },
    pop: () => {
      set(state => ({ stack: state.stack.slice(0, -1) }))
    },
    popById: (id: ID) => {
      set(state => ({ stack: state.stack.filter(item => item.id !== id) }))
    }
  }))
}