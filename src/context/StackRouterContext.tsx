import { createContext } from "react";
import type { StackRouterContextStore } from "../store/StackRouterContextStore";

export const StackRouterContext = createContext<StackRouterContextStore | null>(
  null,
);
