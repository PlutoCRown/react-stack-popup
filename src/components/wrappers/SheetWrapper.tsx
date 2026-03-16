import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./SheetWrapper.module.css";

export interface SheetWrapperProps extends WrapperBaseProps {
  fitContent?: boolean;
  swipable?: boolean;
  maskClosable?: boolean;
}

export const SheetWrapper = ({
  children,
  fitContent = true,
  swipable = true,
  maskClosable = true,
  onClose,
  visible,
  duration = 300,
}: SheetWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      className={clsx("rsp-stack", "rsp-sheet", styles.sheetWrapper)}
    >
      <div
        className={styles.mask}
        onClick={
          maskClosable
            ? (e) => {
                if (e.target === e.currentTarget) onClose?.();
              }
            : undefined
        }
      />
      <div
        className={clsx(styles.track, "rsp-sheet-track")}
        style={{
          WebkitOverflowScrolling: "touch",
          height: fitContent ? undefined : "calc(100% - 48px)",
        }}
      >
        <div
          className={styles.panel}
          style={{
            touchAction: swipable ? "pan-y" : "auto",
          }}
        >
          <div className={styles["panel-bg"]} />
          {children}
        </div>
      </div>
    </div>
  );
};
