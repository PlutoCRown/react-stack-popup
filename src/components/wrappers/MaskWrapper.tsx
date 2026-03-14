import { useEffect, useRef } from "react";
import type { WrapperBaseProps } from "../../types";
import "../../shared.css";
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

    const animation = el.animate(
      visible
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [{ opacity: 1 }, { opacity: 0 }],
      {
        duration,
        easing: "ease",
        fill: "forwards",
      },
    );
    const timer = window.setTimeout(
      () => el.classList.remove(activeClass),
      duration,
    );
    return () => {
      window.clearTimeout(timer);
      animation.cancel();
    };
  }, [visible, duration]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`rsp-stack ${styles.maskWrapper}`}
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
