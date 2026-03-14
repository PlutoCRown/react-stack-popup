import { useEffect, useRef } from "react";
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
}: MaskWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const animation = el.animate(
      visible ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }],
      {
        duration,
        easing: "ease",
        fill: "forwards",
      },
    );
    return () => animation.cancel();
  }, [visible, duration]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (maskClosable && e.key === "Escape" && onClose) {
      onClose();
    }
  };

  return (
    <div
      rsp-stack
      ref={containerRef}
      className={styles.maskWrapper}
      style={
        {
          backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        } as React.CSSProperties
      }
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};
