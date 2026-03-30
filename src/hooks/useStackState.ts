import { useContext } from "react";
import type { StackItem, WrapperBaseProps } from "../types";
import { StackStateContext } from "../context/StackStateContext";

export function useStackState<
  ID extends string = string,
  T = any,
  W extends WrapperBaseProps = WrapperBaseProps,
>() {
  return useContext(StackStateContext) as StackItem<ID, T, W> | null;
}
