import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./DrawerWrapper.module.css";
import { finalizeAnimation } from "../../utils/animation";

export interface DrawerWrapperProps extends WrapperBaseProps {
  direction?: "left" | "right";
  width?: number | string;
}

export const DrawerWrapper = ({
  children,
  visible = true,
  duration = 300,
  direction = "right",
  width,
  className,
  style,
}: DrawerWrapperProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    const enterClass = "rsp-entering";
    const exitClass = "rsp-exiting";
    const activeClass = visible ? enterClass : exitClass;

    el.classList.remove(enterClass, exitClass);
    el.classList.add(activeClass);

    const fromX = direction === "left" ? "-100%" : "100%";
    const animation = el.animate(
      visible
        ? [{ transform: `translateX(${fromX})` }, { transform: "translateX(0)" }]
        : [{ transform: "translateX(0)" }, { transform: `translateX(${fromX})` }],
      {
        duration,
        easing: "ease",
        fill: "forwards",
      },
    );
    finalizeAnimation(animation);
    const timer = window.setTimeout(() => {
      el.classList.remove(activeClass);
    }, duration);
    return () => {
      window.clearTimeout(timer);
      animation.cancel();
    };
  }, [visible, duration, direction]);

  const normalizedWidth =
    typeof width === "number" ? `${width}px` : width;

  return (
    <div
      ref={drawerRef}
      className={clsx("rsp-stack", "rsp-page", styles.drawerWrapper, className)}
      style={{
        width: normalizedWidth,
        left: direction === "left" ? 0 : undefined,
        right: direction === "right" ? 0 : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
