import { FC, useEffect, useRef } from "react";
import { useInStackState } from "../../../src";
import { stackRouter } from "../../stackRouter";
import { SharedImageRect } from "../ImageViewer";
import styles from "./Popup.module.css";

export type CustomPopupProps = {
  pos?: SharedImageRect;
  hiddenControl?: HTMLElement | null;
};

function parseDurationMs(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed);
  if (trimmed.endsWith("s")) return Number.parseFloat(trimmed) * 1000;
  const parsed = Number.parseFloat(trimmed);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export const CustomPopup: FC<CustomPopupProps> = ({ pos }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const { channel } = useInStackState<string, CustomPopupProps>();

  useEffect(() => {
    if (!pos) return;
    const header = headerRef.current;
    const body = bodyRef.current;
    if (!header || !body) return;

    const headerHeight = header.getBoundingClientRect().height;
    const transitionMs = parseDurationMs(
      getComputedStyle(header).getPropertyValue("--rsp-duration"),
    );
    header.style.height = "0px";
    header.style.overflow = "hidden";
    header.style.transition = "none";

    const rafId = requestAnimationFrame(() => {
      header.style.transition = `height ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      header.style.height = `${headerHeight}px`;
    });

    const offWillClose = channel.on("willClose", () => {
      header.style.transition = `height ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      header.style.height = "0px";
      body.scrollTo({ top: 0, behavior: 'instant' })
    });

    return () => {
      cancelAnimationFrame(rafId);
      offWillClose();
      header.style.transition = "";
      header.style.height = "";
      header.style.overflow = "";
    };
  }, [channel, pos]);

  return (
    <div className={styles.root}>
      <div ref={headerRef} className={styles.header}>
        <div
          onClick={() => stackRouter.close()}
          className={styles.backButton}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
      </div>
      <div ref={bodyRef} className={styles.body}>
        <div className={styles.imageWrap}>
          <img
            src="https://placehold.co/300x400?text=Click+Me!"
            alt="Click Me"
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            sollicitudin, urna non luctus congue, dolor neque gravida nisl, eget
            consequat sem erat at ipsum. Curabitur non erat a augue dignissim
            suscipit. Proin volutpat sem sit amet mi tempor, in posuere nisi
            consectetur. Sed id purus viverra, malesuada urna in, fermentum
            orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            aliquet ligula eu diam elementum, ac tristique mi tempus. Mauris
            vulputate, ligula at pellentesque ultricies, ex tellus luctus ipsum,
            non faucibus turpis mi at sapien. Donec et nibh non risus luctus
            mollis. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            consectetur, nulla a gravida ultrices, magna orci volutpat arcu, nec
            ultrices eros augue ac metus. Donec euismod, mi sed luctus dapibus,
            felis sem pharetra dolor, vitae facilisis urna erat vitae urna.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            hendrerit, justo vitae venenatis ullamcorper, ligula nunc placerat
            justo, sed convallis lacus purus vel eros. Duis consequat, leo non
            luctus ultrices, metus justo mattis erat, a bibendum lacus lorem sed
            enim.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
