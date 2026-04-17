import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  PageWrapper,
  useInStackState,
  type WrapperBaseProps,
} from "../../../src";
import type { SharedImageRect } from "../ImageViewer";
import type { CustomPopupProps } from "./Popup";
import styles from "./Wrapper.module.css";


export default function CustomWrapper(props: WrapperBaseProps) {
  const {
    children,
    visible = true,
    duration = 300,
  } = props
  const { config, args } = useInStackState();

  const { pos, hiddenControl } = args as CustomPopupProps
  const shellRef = useRef<HTMLDivElement | null>(null);
  const hiddenRestoredRef = useRef(false);
  const transitionMs = config?.prefersReducedMotion ? 0 : duration;

  const wrapperStyle = useMemo(
    () =>
      ({
        "--rsp-duration": `${transitionMs}ms`,
      }) as CSSProperties,
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

  useEffect(() => {
    if (!pos || !visible) return;
    const shell = shellRef.current;
    if (!shell) return;

    hiddenRestoredRef.current = false;
    if (hiddenControl) {
      hiddenControl.style.opacity = "0";
    }

    shell.style.position = "fixed";
    shell.style.overflow = "hidden";
    shell.style.willChange = "left, top, width, height, border-radius";
    applyRect(pos);

    const rafId = requestAnimationFrame(() => {
      toFullscreen();
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (hiddenControl && !hiddenRestoredRef.current) {
        hiddenControl.style.opacity = "1";
        hiddenRestoredRef.current = true;
      }
    };
  }, [hiddenControl, pos, transitionMs, visible]);

  useEffect(() => {
    if (!pos || visible) return;
    toOrigin();
    const timer = window.setTimeout(() => {
      if (hiddenControl) {
        hiddenControl.style.opacity = "1";
      }
      hiddenRestoredRef.current = true;
    }, transitionMs);
    return () => window.clearTimeout(timer);
  }, [hiddenControl, pos, transitionMs, visible]);
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
