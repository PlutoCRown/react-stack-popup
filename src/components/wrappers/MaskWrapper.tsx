import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./MaskWrapper.module.css";

export interface MaskWrapperProps extends WrapperBaseProps {
  opacity?: number;
  maskClosable?: boolean;
}

export const MaskWrapper = ({
  children,
  opacity = 0.5,
  maskClosable = true,
  onClose,
  visible = true,
  duration = 300,
  className,
}: MaskWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const enterClass = "rsp-entering";
    const exitClass = "rsp-exiting";
    const activeClass = visible ? enterClass : exitClass;

    el.classList.remove(enterClass, exitClass);
    el.classList.add(activeClass);

    const timer = window.setTimeout(
      () => el.classList.remove(activeClass),
      duration,
    );
    return () => {
      window.clearTimeout(timer);
    };
  }, [visible, duration]);

  const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx("rsp-stack", styles.maskWrapper, className)}
    >
      <div
        className={styles.mask}
        style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
        onClick={handleMaskClick}
      />
      <div className={styles.panel}>{children}</div>
    </div>
  );
};
