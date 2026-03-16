import { useEffect, useRef } from "react";
import type { WrapperBaseProps } from "../../types";
import { MaskWrapper } from "./MaskWrapper";
import styles from "./SheetWrapper.module.css";
import { finalizeAnimation } from "../../utils/animation";
import clsx from "clsx";

export interface SheetWrapperProps extends WrapperBaseProps {
  fitContent?: boolean;
  swipable?: boolean;
}

export const SheetWrapper = ({
  children,
  fitContent = true,
  swipable = true,
  onClose,
  visible,
  duration = 300,
}: SheetWrapperProps) => {
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
    finalizeAnimation(animation);

    return () => {
      animation.cancel();
    };
  }, [visible, duration]);

  return (
    <MaskWrapper
      onClose={onClose}
      visible={visible}
      duration={duration}
      className="rsp-sheet"
    >
      <div
        ref={sheetRef}
        className={clsx(styles.Sheet, "rsp-sheet-panel")}
        style={{
          height: fitContent ? undefined : "calc(100% - 48px)",
          touchAction: swipable ? "pan-y" : "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </MaskWrapper>
  );
};
