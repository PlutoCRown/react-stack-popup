import { createContext } from "react";
import type { StackItem, WrapperBaseProps } from "../types";

export const StackStateContext = createContext<
  StackItem<string, any, WrapperBaseProps> | null
>(null);
