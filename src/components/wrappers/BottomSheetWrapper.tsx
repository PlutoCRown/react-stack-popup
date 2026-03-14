import { useEffect, useRef } from "react";
import type { WrapperBaseProps } from "../../types";
import { MaskWrapper } from "./MaskWrapper";
import styles from "./BottomSheetWrapper.module.css";

export interface BottomSheetWrapperProps extends WrapperBaseProps {
  fitContent?: boolean;
  swipable?: boolean;
}

export const BottomSheetWrapper = ({
  children,
  fitContent = true,
  swipable = true,
  onClose,
  visible,
  duration = 300,
}: BottomSheetWrapperProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

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

    return () => {
      animation.cancel();
    };
  }, [visible, duration]);

  const setTranslateY = (value: number) => {
    const el = sheetRef.current;
    if (!el) return;
    el.style.transform = `translateY(${Math.max(0, value)}px)`;
  };

  const resetDragState = () => {
    dragStartY.current = null;
    dragDelta.current = 0;
    isDragging.current = false;
  };

  const finishDrag = () => {
    if (!swipable) return;
    const shouldClose = dragDelta.current > 80;
    if (shouldClose) {
      onClose?.();
      resetDragState();
      return;
    }
    const el = sheetRef.current;
    if (!el) {
      resetDragState();
      return;
    }
    const animation = el.animate(
      [
        { transform: `translateY(${Math.max(0, dragDelta.current)}px)` },
        { transform: "translateY(0)" },
      ],
      { duration: 200, easing: "ease-out", fill: "forwards" },
    );
    animation.onfinish = () => {
      el.style.transform = "";
      resetDragState();
    };
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
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    finishDrag();
  };

  const handlePointerCancel = () => {
    if (!swipable) return;
    resetDragState();
    const el = sheetRef.current;
    if (el) el.style.transform = "";
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swipable) return;
    const touch = e.touches[0];
    if (!touch) return;
    dragStartY.current = touch.clientY;
    dragDelta.current = 0;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swipable || !isDragging.current || dragStartY.current === null) return;
    const touch = e.touches[0];
    if (!touch) return;
    dragDelta.current = touch.clientY - dragStartY.current;
    if (dragDelta.current > 0) {
      e.preventDefault();
      setTranslateY(dragDelta.current);
    }
  };

  const handleTouchEnd = () => {
    if (!swipable || !isDragging.current) return;
    finishDrag();
  };

  return (
    <MaskWrapper onClose={onClose} visible={visible} duration={duration}>
      <div
        ref={sheetRef}
        className={`${styles.bottomSheet}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
