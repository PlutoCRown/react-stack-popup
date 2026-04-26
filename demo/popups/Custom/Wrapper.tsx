import {
  type CSSProperties,
  useMemo,
  useRef,
} from "react";
import {
  PageWrapper,
  useInStackState,
  useWrapperAnimation,
  type WrapperBaseProps,
} from "../../../src";
import type { SharedImageRect } from "../ImageViewer";
import type { CustomPopupProps } from "./Popup";
import styles from "./Wrapper.module.css";


export default function CustomWrapper(props: WrapperBaseProps) {
  const {
    children,
    duration = 300,
  } = props
  const { config, args } = useInStackState();

  const { pos, hiddenControl } = args as CustomPopupProps
  const shellRef = useRef<HTMLDivElement | null>(null);
  const transitionMs = config?.prefersReducedMotion ? 0 : duration;

  const wrapperStyle = useMemo(
    () =>
      ({ "--rsp-duration": `${transitionMs}ms` }) as CSSProperties,
    [transitionMs],
  );

  const applyRect = (rect: SharedImageRect) => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.left = `${rect.x}px`;
    shell.style.top = `${rect.y}px`;
    shell.style.width = `${rect.width}px`;
    shell.style.height = `${rect.height}px`;
    shell.style.borderRadius = `${rect.radius ?? 0}px`;
  };

  const toFullscreen = () => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.transition = `all ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    shell.style.left = "0px";
    shell.style.top = "0px";
    shell.style.width = "100vw";
    shell.style.height = "100vh";
    shell.style.borderRadius = "0px";
  };

  const toOrigin = () => {
    const shell = shellRef.current;
    if (!shell || !pos) return;
    shell.style.transition = `all ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    applyRect(pos);
  };
  const enterRafRef = useRef(0);

  useWrapperAnimation({
    rootRef: shellRef,
    endTargetRef: shellRef,
    endEvent: "transitionend",
    duration: transitionMs,
    coverPrevious: true,
    onWillEnter: () => {
      if (!pos) return;
      const shell = shellRef.current;
      if (!shell) return;
      hiddenControl?.style.setProperty("opacity", "0");
      shell.style.position = "fixed";
      shell.style.overflow = "hidden";
      shell.style.willChange = "left, top, width, height, border-radius";
      applyRect(pos);
      enterRafRef.current = requestAnimationFrame(toFullscreen);

      return () => {
        cancelAnimationFrame(enterRafRef.current);
        hiddenControl?.style.setProperty("opacity", "1");
      };
    },
    onWillClose: () => {
      if (!pos) return;
      cancelAnimationFrame(enterRafRef.current);
      toOrigin();
    },
    onDestroyed: () => hiddenControl?.style.setProperty("opacity", "1")
  });

  if (!pos) {
    return <PageWrapper {...props} />
  }

  return (
    <div
      className={`rsp-stack ${styles.root}`}
      style={{
        ...wrapperStyle,
      }}
    >
      <div ref={shellRef} className={styles.shell}>
        {children}
      </div>
    </div>
  );
}
