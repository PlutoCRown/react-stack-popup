import { useEffect, useRef } from "react";
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
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    const animation = el.animate(
      visible
        ? [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }]
        : [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }],
      {
        duration,
        easing: "ease",
        fill: "forwards",
      },
    );
    return () => animation.cancel();
  }, [visible, duration]);

  return (
    <MaskWrapper onClose={onClose} visible={visible} duration={duration}>
      <div
        ref={sheetRef}
        className={styles.bottomSheet}
        style={
          {
            maxHeight,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </MaskWrapper>
  );
};
