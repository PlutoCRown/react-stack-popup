import { useEffect, useRef } from "react";
import type { WrapperBaseProps } from "../../types";
import { MaskWrapper } from "./MaskWrapper";
import styles from "./BottomSheetWrapper.module.css";

export interface BottomSheetWrapperProps extends WrapperBaseProps {
  maxHeight?: string;
  fitContent?: boolean;
  swipable?: boolean;
}

export const BottomSheetWrapper = ({
  children,
  maxHeight = "80vh",
  fitContent = true,
  swipable = true,
  onClose,
  visible = true,
  duration = 300,
}: BottomSheetWrapperProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    const enterClass = "rsp-entering";
    const exitClass = "rsp-exiting";
    const activeClass = visible ? enterClass : exitClass;

    el.classList.remove(enterClass, exitClass);
    el.classList.add(activeClass);

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
    const timer = window.setTimeout(() => {
      el.classList.remove(activeClass);
    }, duration);
    return () => {
      window.clearTimeout(timer);
      animation.cancel();
    };
  }, [visible, duration]);

  const setTranslateY = (value: number) => {
    const el = sheetRef.current;
    if (!el) return;
    el.style.transform = `translateY(${Math.max(0, value)}px)`;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!swipable) return;
    dragStartY.current = e.clientY;
    dragDelta.current = 0;
    isDragging.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!swipable || !isDragging.current || dragStartY.current === null) return;
    dragDelta.current = e.clientY - dragStartY.current;
    if (dragDelta.current > 0) {
      setTranslateY(dragDelta.current);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!swipable || !isDragging.current) return;
    isDragging.current = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    const shouldClose = dragDelta.current > 80;
    if (shouldClose) {
      onClose?.();
      return;
    }
    const el = sheetRef.current;
    if (!el) return;
    const animation = el.animate(
      [
        { transform: `translateY(${Math.max(0, dragDelta.current)}px)` },
        { transform: "translateY(0)" },
      ],
      { duration: 200, easing: "ease-out", fill: "forwards" },
    );
    animation.onfinish = () => {
      el.style.transform = "";
    };
  };

  return (
    <MaskWrapper onClose={onClose} visible={visible} duration={duration}>
      <div
        ref={sheetRef}
        className={`rsp-stack ${styles.bottomSheet}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={
          {
            maxHeight: fitContent ? "none" : maxHeight,
            touchAction: swipable ? "pan-y" : "auto",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </MaskWrapper>
  );
};
