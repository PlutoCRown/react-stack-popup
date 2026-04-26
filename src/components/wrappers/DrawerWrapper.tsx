import { type CSSProperties, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./DrawerWrapper.module.css";
import { useWrapperAnimation } from "./useWrapperAnimation";

export interface DrawerWrapperProps extends WrapperBaseProps {
  direction?: "left" | "right";
  width?: number | string;
  maskClosable?: boolean;
}

export const DrawerWrapper = ({
  children,
  duration = 300,
  direction = "right",
  width,
  maskClosable = true,
  className,
  style,
  onClose,
}: DrawerWrapperProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperStyle = {
    "--rsp-duration": `${duration}ms`,
    ...style,
  } as CSSProperties;

  useWrapperAnimation({
    rootRef: drawerRef,
    endTargetRef: trackRef,
    endEvent: "animationend",
    duration,
    coverPrevious: false,
  });

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
      style={wrapperStyle}
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
        ref={trackRef}
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
