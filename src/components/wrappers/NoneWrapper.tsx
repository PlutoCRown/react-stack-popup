import type { WrapperBaseProps } from "../../types";
import "./NoneWrapper.module.css";

export interface NoneWrapperProps extends WrapperBaseProps {}

export const NoneWrapper = ({ children, visible = true }: NoneWrapperProps) => {
  if (!visible) return null;
  return <>{children}</>;
};
