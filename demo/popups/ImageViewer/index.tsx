import { FC, PointerEvent, useCallback, useEffect, useRef } from "react";
import styles from "./index.module.css";
import { useStackState } from "../../../src";

export type SharedImageRect = {
  width: number;
  height: number;
  x: number;
  y: number;
  radius?: number;
};
type Props = {
  src: string;
  hiResSrc?: string;
  pos?: SharedImageRect;
  onLongPress?: () => void;
  objectFit?: "contain" | "cover";
  hiddenControl?: HTMLElement | null;
  plugin?: React.ReactNode;
  duration?: number;
};

export const ImageViewer: FC<Props> = ({
  src,
  pos,
  objectFit = "cover",
  hiddenControl,
  plugin,
  duration = 300,
}) => {
  const context = useStackState();
  const onClose = context.inStack
    ? context.onClose
    : () => console.warn("不在弹窗内");

  const imgRef = useRef<HTMLImageElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const wasDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, pointerId: -1 });
  const originRectRef = useRef<SharedImageRect | undefined>(undefined);
  const imageRectRef = useRef<{ width: number; height: number } | null>(null);
  const TRANSITION_MS = duration;
  const initialRect: SharedImageRect = pos ?? {
    x: 0,
    y: 0,
    width: typeof window === "undefined" ? 0 : window.innerWidth,
    height: typeof window === "undefined" ? 0 : window.innerHeight,
    radius: 0,
  };

  const applyRect = (rect: SharedImageRect) => {
    const wrap = imageWrapRef.current;
    if (!wrap) return;
    wrap.style.left = `${rect.x}px`;
    wrap.style.top = `${rect.y}px`;
    wrap.style.width = `${rect.width}px`;
    wrap.style.height = `${rect.height}px`;
    wrap.style.borderRadius = rect.radius ? `${rect.radius}px` : "0px";
  };

  const toFullscreen = () => {
    const wrap = imageWrapRef.current;
    const bg = backgroundRef.current;
    const img = imgRef.current;
    if (!wrap || !bg || !img) return;
    wrap.style.transition = `all ${TRANSITION_MS}ms ease`;
    bg.style.transition = `opacity ${TRANSITION_MS}ms ease`;
    wrap.style.left = "0px";
    wrap.style.top = "0px";
    wrap.style.width = "100vw";
    wrap.style.height = "100vh";
    wrap.style.borderRadius = "0px";
    wrap.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
    img.style.transition = `all ${TRANSITION_MS}ms ease`;
    img.style.width = "100%";
    img.style.height = "100%";
    bg.style.opacity = "1";
  };

  const toOrigin = () => {
    const wrap = imageWrapRef.current;
    const bg = backgroundRef.current;
    const img = imgRef.current;
    const rect = originRectRef.current ?? pos;
    if (!wrap || !bg || !img || !rect) return;
    wrap.style.transition = `all ${TRANSITION_MS}ms ease`;
    bg.style.transition = `opacity ${TRANSITION_MS}ms ease`;
    applyRect(rect);
    wrap.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
    const r = imageRectRef.current;
    img.style.transition = `all ${TRANSITION_MS}ms ease`;
    if (r) {
      img.style.width = `${r.width}%`;
      img.style.height = `${r.height}%`;
    } else {
      img.style.width = "100%";
      img.style.height = "100%";
    }
    bg.style.opacity = "0";
  };

  const handleClosed = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    isDraggingRef.current = false;
    if (pos) {
      toOrigin();
      window.setTimeout(() => {
        if (hiddenControl) {
          hiddenControl.style.opacity = "1";
        }
      }, TRANSITION_MS);
      return;
    }
    if (hiddenControl) {
      hiddenControl.style.opacity = "1";
    }
  }, [hiddenControl, pos, TRANSITION_MS]);

  const requestClose = () => {
    if (isClosingRef.current) return;
    onClose?.();
  };

  const handleImageLoaded = () => {
    if (isClosingRef.current) return;
    if (hiddenControl) {
      hiddenControl.style.opacity = "0";
    }
    if (pos) {
      originRectRef.current = pos;
      const img = imgRef.current;
      if (!img) return console.warn("找不到图片");
      if (objectFit === "cover") {
        const naturalWidth = img?.naturalWidth ?? 0;
        const naturalHeight = img?.naturalHeight ?? 0;
        if (naturalWidth > 0 && naturalHeight > 0) {
          let renderWidth = 100,
            renderHeight = 100;
          if (naturalHeight < naturalWidth) {
            renderHeight = 100;
            renderWidth =
              (((pos.height / naturalHeight) * naturalWidth) / pos.width) * 100;
          } else {
            renderWidth = 100;
            renderHeight =
              (((pos.width / naturalWidth) * naturalHeight) / pos.height) * 100;
          }
          imageRectRef.current = {
            width: renderWidth,
            height: renderHeight,
          };
          img.style.transition = "none";
          img.style.width = `${renderWidth}%`;
          img.style.height = `${renderHeight}%`;
          img.style.objectFit = "contain";
        } else {
          imageRectRef.current = null;
        }
      }
    }
    requestAnimationFrame(() => toFullscreen());
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isClosingRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const wrap = imageWrapRef.current;
    const bg = backgroundRef.current;
    if (!wrap || !bg) return;
    e.stopPropagation();
    wasDraggingRef.current = false;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      pointerId: e.pointerId,
    };
    wrap.style.transition = "none";
    bg.style.transition = "none";
    if (wrap.setPointerCapture) {
      wrap.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const wrap = imageWrapRef.current;
    const bg = backgroundRef.current;
    if (!wrap || !bg) return;
    const start = dragStartRef.current;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const distance = Math.abs(dx) + Math.abs(dy);
    if (distance > 2) {
      wasDraggingRef.current = true;
    }
    const scale = clamp(1 - distance / 600, 0.6, 1);
    wrap.style.transform = `translate3d(${dx}px, ${dy}px, 0px) scale(${scale})`;
    bg.style.opacity = `${clamp(1 - distance / 300, 0, 1)}`;
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const wrap = imageWrapRef.current;
    const bg = backgroundRef.current;
    if (!wrap || !bg) return;
    const start = dragStartRef.current;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const distance = Math.abs(dx) + Math.abs(dy);
    isDraggingRef.current = false;
    if (wrap.releasePointerCapture) {
      wrap.releasePointerCapture(start.pointerId);
    }
    if (distance > 200) {
      requestClose();
      return;
    }
    wrap.style.transition = `all ${TRANSITION_MS}ms ease`;
    bg.style.transition = `opacity ${TRANSITION_MS}ms ease`;
    wrap.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
    bg.style.opacity = "1";
  };

  const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    handlePointerUp(e);
  };

  useEffect(() => {
    const img = imgRef.current;
    const bg = backgroundRef.current;
    const wrap = imageWrapRef.current;
    if (!img || !bg || !wrap) return;
    bg.style.opacity = "0";
    wrap.style.position = "fixed";
    wrap.style.overflow = "hidden";
    wrap.style.willChange =
      "left, top, width, height, border-radius, transform";
    if (pos) {
      applyRect(pos);
    } else {
      toFullscreen();
    }
    if (img.complete) {
      handleImageLoaded();
    }
  }, [pos, objectFit]);

  useEffect(() => {
    if (!context.inStack) return;
    const off = context.channel.on("closed", () => handleClosed());
    return off;
  }, [context, handleClosed]);

  return (
    <div className={styles.root}>
      <div
        ref={backgroundRef}
        onClick={requestClose}
        className={styles.background}
      />
      <div className={styles.overlay}>{plugin}</div>
      <div className={styles.content} onClick={requestClose}>
        <div
          ref={imageWrapRef}
          className={styles.imageWrap}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onClick={requestClose}
          style={{
            left: `${initialRect.x}px`,
            top: `${initialRect.y}px`,
            width: `${initialRect.width}px`,
            height: `${initialRect.height}px`,
            borderRadius: `${initialRect.radius || 0}px`,
          }}
        >
          <img
            src={src}
            ref={imgRef}
            onLoad={handleImageLoaded}
            onContextMenu={(e) => {
              e.stopPropagation();
            }}
            className={styles.image}
            style={{
              objectFit,
            }}
          />
        </div>
      </div>
    </div>
  );
};
