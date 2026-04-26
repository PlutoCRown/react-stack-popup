import { type CSSProperties, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./NoneWrapper.module.css";
import { useWrapperAnimation } from "./useWrapperAnimation";

export interface NoneWrapperProps extends WrapperBaseProps {}

export const NoneWrapper = ({
  children,
  duration = 300,
}: NoneWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperStyle = {
    "--rsp-duration": `${duration}ms`,
  } as CSSProperties;

  useWrapperAnimation({
    rootRef: containerRef,
    endEvent: "none",
    duration,
    coverPrevious: false,
  });

  return (
    <div
      ref={containerRef}
      className={clsx("rsp-stack", styles.noneWrapper)}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
};
