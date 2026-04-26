import { type CSSProperties, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./MaskWrapper.module.css";
import { useWrapperAnimation } from "./useWrapperAnimation";

export interface MaskWrapperProps extends WrapperBaseProps {
  opacity?: number;
  maskClosable?: boolean;
}

export const MaskWrapper = ({
  children,
  opacity = 0.5,
  maskClosable = true,
  onClose,
  duration = 300,
  className,
}: MaskWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperStyle = {
    "--rsp-duration": `${duration}ms`,
  } as CSSProperties;

  useWrapperAnimation({
    rootRef: containerRef,
    endTargetRef: panelRef,
    endEvent: "animationend",
    duration,
    coverPrevious: false,
  });

  const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx("rsp-stack", styles.maskWrapper, className)}
      style={wrapperStyle}
    >
      <div
        className={styles.mask}
        style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
        onClick={handleMaskClick}
      />
      <div ref={panelRef} className={styles.panel}>{children}</div>
    </div>
  );
};
