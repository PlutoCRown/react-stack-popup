import { createContext } from "react";
import type { StackContext, WrapperBaseProps } from "../types";

type ContextType = StackContext<string, any, WrapperBaseProps>;
export const StackStateContext = createContext<ContextType>({ inStack: false });
