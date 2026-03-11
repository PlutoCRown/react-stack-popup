import { WrapperBaseProps } from "../types";
import styles from "./wrappers.module.css";

// 1. NoneWrapper - No background or animation
export interface NoneWrapperProps extends WrapperBaseProps {}

export const NoneWrapper = ({ children, visible = true }: NoneWrapperProps) => {
  if (!visible) return null;
  return <>{children}</>;
};

// 2. MaskWrapper - Transparent background with opacity animation
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

// 3. BottomSheetWrapper - MaskWrapper with bottom sheet animation
export interface BottomSheetWrapperProps extends WrapperBaseProps {
  maxHeight?: string;
}

export const BottomSheetWrapper = ({
  children,
  maxHeight = "80vh",
  onClose,
  visible = true,
  duration = 300,
}: BottomSheetWrapperProps) => {
  const animationState = visible ? "entering" : "exiting";

  return (
    <MaskWrapper onClose={onClose} visible={visible} duration={duration}>
      <div
        className={`${styles.bottomSheet} ${styles[animationState]}`}
        style={
          {
            maxHeight,
            "--animation-duration": `${duration}ms`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </MaskWrapper>
  );
};

// 4. PageWrapper - Full page with slide in from right animation
export interface PageWrapperProps extends WrapperBaseProps {}

export const PageWrapper = ({
  children,
  visible = true,
  duration = 300,
}: PageWrapperProps) => {
  const animationState = visible ? "entering" : "exiting";

  return (
    <div
      className={`${styles.pageWrapper} ${styles[animationState]}`}
      style={
        {
          "--animation-duration": `${duration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
