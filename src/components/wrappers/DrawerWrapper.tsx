import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./DrawerWrapper.module.css";

export interface DrawerWrapperProps extends WrapperBaseProps {
  direction?: "left" | "right";
  width?: number | string;
  maskClosable?: boolean;
}

export const DrawerWrapper = ({
  children,
  visible = true,
  duration = 300,
  direction = "right",
  width,
  maskClosable = true,
  className,
  style,
  onClose,
}: DrawerWrapperProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    const enterClass = "rsp-entering";
    const exitClass = "rsp-exiting";
    const activeClass = visible ? enterClass : exitClass;

    el.classList.remove(enterClass, exitClass);
    el.classList.add(activeClass);

    const timer = window.setTimeout(() => {
      el.classList.remove(activeClass);
    }, duration);
    return () => {
      window.clearTimeout(timer);
    };
  }, [visible, duration, direction]);

  const normalizedWidth = typeof width === "number" ? `${width}px` : width;

  return (
    <div
      ref={drawerRef}
      className={clsx(
        "rsp-stack",
        styles.drawerWrapper,
        styles[direction],
        className,
      )}
      style={style}
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
        className={styles.track}
        style={{
          width: normalizedWidth,
          left: direction === "left" ? 0 : undefined,
          right: direction === "right" ? 0 : undefined,
        }}
      >
        <div className={styles.panel}>{children}</div>
      </div>
    </div>
  );
};
