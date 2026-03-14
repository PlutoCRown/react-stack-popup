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

  const animationState = visible ? "entering" : "exiting";

  return (
    <div
      rsp-stack
      className={`${styles.maskWrapper} ${styles[animationState]} ${maskClosable ? styles.closable : styles.notClosable}`}
      style={
        {
          backgroundColor: `rgba(0, 0, 0, ${opacity})`,
          "--animation-duration": `${duration}ms`,
        } as React.CSSProperties
      }
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};
