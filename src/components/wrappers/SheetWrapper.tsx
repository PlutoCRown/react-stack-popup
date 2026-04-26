import { CSSProperties, useEffect, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./SheetWrapper.module.css";
import { useWrapperAnimation } from "./useWrapperAnimation";

export interface SheetWrapperProps extends WrapperBaseProps {
  fitContent?: boolean;
  swipable?: boolean;
  maskClosable?: boolean;
  transparentBackground?: boolean;
}

// const isAndroid = navigator?.userAgent?.includes("Android");

export const SheetWrapper = ({
  children,
  fitContent = true,
  swipable = true,
  maskClosable = true,
  transparentBackground = false,
  onClose,
  duration = 300,
}: SheetWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useWrapperAnimation({
    rootRef: containerRef,
    endTargetRef: panelRef,
    endEvent: "animationend",
    duration,
    coverPrevious: false,
  });

  const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (!swipable) return;
    const el = trackRef.current;
    if (!el) return;
    let active = false;
    let startY = 0;
    let lastY = 0;

    const setTransform = (y: number) => {
      el.style.transform = `translateY(${y}px)`;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const panel = panelRef.current;
      if (panel && panel.scrollTop > 0) return;
      active = true;
      startY = e.touches[0].clientY;
      lastY = 0;
      el.style.transition = "none";
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!active || e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      const dy = Math.max(0, currentY - startY);
      lastY = dy;
      setTransform(dy);
    };

    const onTouchEnd = () => {
      if (!active) return;
      active = false;
      el.style.transition = "";
      const panelHeight = panelRef.current?.getBoundingClientRect().height ?? 0;
      const threshold = Math.min(panelHeight * 0.5, window.innerHeight * 0.2);
      if (lastY > threshold) {
        onClose?.();
        return;
      }
      setTransform(0);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [swipable, onClose]);

  const wrapperStyle = {
    "--rsp-duration": `${duration}ms`,
    ...(transparentBackground
      ? { "--rsp-background": "transparent" }
      : undefined),
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={clsx(
        "rsp-stack",
        "rsp-sheet",
        { "rsp-sheet-full": !fitContent },
        styles.sheetWrapper,
      )}
      style={wrapperStyle}
    >
      <div className={styles.mask} onClick={handleMaskClick} />
      <div
        ref={trackRef}
        className={clsx(styles.track, "rsp-sheet-track")}
        style={{
          height: fitContent ? undefined : "calc(100% - 48px)",
        }}
      >
        <div
          className={styles.panel}
          ref={panelRef}
          style={{
            touchAction: swipable ? "pan-y" : "auto",
          }}
        >
          <div className={styles["panel-bg"]} />
          {children}
        </div>
      </div>
    </div>
  );
};
