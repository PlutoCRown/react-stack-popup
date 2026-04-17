import { type CSSProperties, useEffect, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./NoneWrapper.module.css";

export interface NoneWrapperProps extends WrapperBaseProps {}

export const NoneWrapper = ({
  children,
  visible,
  duration = 300,
}: NoneWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperStyle = {
    "--rsp-duration": `${duration}ms`,
  } as CSSProperties;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const enterClass = "rsp-entering";
    const exitClass = "rsp-exiting";
    const activeClass = visible ? enterClass : exitClass;

    el.classList.remove(enterClass, exitClass);
    el.classList.add(activeClass);

    const timer = window.setTimeout(() => {
      el.classList.remove(activeClass);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [visible, duration]);

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
