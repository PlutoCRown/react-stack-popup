import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./PageWrapper.module.css";
import { finalizeAnimation } from "../../utils/animation";

export interface PageWrapperProps extends WrapperBaseProps {}

export const PageWrapper = ({
  children,
  visible = true,
  duration = 300,
}: PageWrapperProps) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const enterClass = "rsp-entering";
    const exitClass = "rsp-exiting";
    const activeClass = visible ? enterClass : exitClass;

    el.classList.remove(enterClass, exitClass);
    el.classList.add(activeClass);

    const animation = el.animate(
      visible
        ? [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }]
        : [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
      {
        duration,
        easing: "ease",
        fill: "forwards",
      },
    );
    finalizeAnimation(animation);
    const timer = setTimeout(() => el.classList.remove(activeClass), duration);
    return () => {
      clearTimeout(timer);
      animation.cancel();
    };
  }, [visible, duration]);

  return (
    <div
      ref={pageRef}
      className={clsx("rsp-stack", "rsp-page", styles.pageWrapper)}
      style={{} as React.CSSProperties}
    >
      {children}
    </div>
  );
};
