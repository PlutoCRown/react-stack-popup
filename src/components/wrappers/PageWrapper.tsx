import { type CSSProperties, useRef } from "react";
import clsx from "clsx";
import type { WrapperBaseProps } from "../../types";
import styles from "./PageWrapper.module.css";
import { useWrapperAnimation } from "./useWrapperAnimation";

export interface PageWrapperProps extends WrapperBaseProps {}

export const PageWrapper = ({
  children,
  duration = 300,
}: PageWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperStyle = {
    "--rsp-duration": `${duration}ms`,
  } as CSSProperties;

  useWrapperAnimation({
    rootRef: containerRef,
    endTargetRef: trackRef,
    endEvent: "animationend",
    duration,
    coverPrevious: true,
  });

  return (
    <div
      ref={containerRef}
      className={clsx("rsp-stack", "rsp-page", styles.pageWrapper)}
      style={wrapperStyle}
    >
      <div className={styles.mask} />
      {/* 
        Q: 为什么需要分离 track 和 panel ？ 
        A: 因为如果直接额让 track可以滚动+背景色，那么在浏览器的弹性效果中这个底色会被拉着跑，漏出后面的内容
        - 所以底色要在track上，滚动容器要在panel上
        - 如果要少一层元素，这个 overflow 的的复杂度要交给用户
      */}
      <div ref={trackRef} className={styles.track}>
        <div className={styles.panel}>{children}</div>
      </div>
    </div>
  );
};
