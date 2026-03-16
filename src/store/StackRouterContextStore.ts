import type { StoreApi } from "zustand/vanilla";
import { createStore } from "zustand/vanilla";

export type StackRouterContextState = {
  inStack: true;
};

export type StackRouterContextStore = StoreApi<StackRouterContextState>;

export type NotInStack = { inStack: false }

export const createStackRouterContextStore = () =>
  createStore<StackRouterContextState>(() => ({ inStack: true }));
