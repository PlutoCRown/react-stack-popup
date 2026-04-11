import { useContext } from "react";
import type { InStackContext, StackContext, WrapperBaseProps } from "../types";
import { StackStateContext } from "../context/StackStateContext";

export function useStackState<ID extends string = string, T = any, W extends WrapperBaseProps = WrapperBaseProps>() {
  return useContext(StackStateContext) as StackContext<ID, T, W>;
}

/** 当你确定组件一定在弹窗内渲染的时候可以使用这个来简化类型，实际上和useStackState是一样的 */
export function useInStackState<ID extends string = string, T = any, W extends WrapperBaseProps = WrapperBaseProps>() {
  return useContext(StackStateContext) as InStackContext<ID, T, W>;
}
