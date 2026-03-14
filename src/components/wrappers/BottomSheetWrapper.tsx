import type { WrapperBaseProps } from "../../types";
import { MaskWrapper } from "./MaskWrapper";
import styles from "./BottomSheetWrapper.module.css";

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
