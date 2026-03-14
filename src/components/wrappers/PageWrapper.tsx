import type { WrapperBaseProps } from "../../types";
import styles from "./PageWrapper.module.css";

export interface PageWrapperProps extends WrapperBaseProps {}

export const PageWrapper = ({
  children,
  visible = true,
  duration = 300,
}: PageWrapperProps) => {
  const animationState = visible ? "entering" : "exiting";

  return (
    <div
      className={`${styles.pageWrapper} ${styles[animationState]}`}
      style={
        {
          "--animation-duration": `${duration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
