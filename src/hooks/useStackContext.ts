import { useContext } from "react";
import { useStore } from "zustand";
import { StackRouterContext } from "../context/StackRouterContext";
import type {
  NotInStack,
  StackRouterContextState,
} from "../store/StackRouterContextStore";

const notInStack: NotInStack = { inStack: false };

export function useStackContext(): StackRouterContextState | NotInStack;
export function useStackContext<T>(
  selector: (state: StackRouterContextState) => T,
): T | NotInStack;
export function useStackContext<T>(
  selector?: (state: StackRouterContextState) => T,
) {
  const store = useContext(StackRouterContext);
  if (!store) return notInStack;
  const select =
    selector ??
    ((state: StackRouterContextState) => state as unknown as T);
  return useStore(store, select);
}
