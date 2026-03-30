import { createContext } from "react";
import type { StackContext, WrapperBaseProps } from "../types";

type ContextType = StackContext<string, any, WrapperBaseProps> | null;
export const StackStateContext = createContext<ContextType>(null);
