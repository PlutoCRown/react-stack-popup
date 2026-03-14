import { useEffect, useRef } from "react";
import type { WrapperBaseProps } from "../../types";
import styles from "./PageWrapper.module.css";

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
    return () => animation.cancel();
  }, [visible, duration]);

  return (
    <div
      ref={pageRef}
      className={styles.pageWrapper}
      style={
        {
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
