import { useContext } from "react";
import type { StackContext, WrapperBaseProps } from "../types";
import { StackStateContext } from "../context/StackStateContext";

export function useStackState<
  ID extends string = string,
  T = any,
  W extends WrapperBaseProps = WrapperBaseProps,
>() {
  return useContext(StackStateContext) as StackContext<ID, T, W> | null;
}
