import type { StoreApi } from "zustand/vanilla";
import { createStore } from "zustand/vanilla";

export type StackRouterContextState = {
  inStack: true;
  layer: number;
};

export type StackRouterContextStore = StoreApi<StackRouterContextState>;

export type NotInStack = { inStack: false }

export const createStackRouterContextStore = (init: Partial<StackRouterContextState>) =>
  createStore<StackRouterContextState>(() => Object.assign(init));
