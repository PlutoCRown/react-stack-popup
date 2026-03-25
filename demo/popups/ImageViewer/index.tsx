import { FC, useEffect, useRef } from "react";

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
  onClose?: () => void;
  onLongPress?: () => void;
  objectFit?: "contain" | "cover";
  hiddenControl?: HTMLElement | null;
  plugin?: React.ReactNode;
  duration?: number;
};

export const ImageViewer: FC<Props> = ({
  src,
  pos,
  onClose,
  objectFit = "cover",
  hiddenControl,
  plugin,
  duration = 300,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);
  const originRectRef = useRef<SharedImageRect | undefined>(undefined);
  const imageRectRef = useRef<{
    width: number;
    height: number;
  } | null>(null);
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

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    if (pos) {
      toOrigin();
      window.setTimeout(() => {
        if (hiddenControl) {
          hiddenControl.style.opacity = "1";
        }
        onClose?.();
      }, TRANSITION_MS);
      return;
    }
    if (hiddenControl) {
      hiddenControl.style.opacity = "1";
    }
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
          console.log(pos, imageRectRef.current);
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

  useEffect(() => {
    const img = imgRef.current;
    const bg = backgroundRef.current;
    const wrap = imageWrapRef.current;
    if (!img || !bg || !wrap) return;
    bg.style.opacity = "0";
    wrap.style.position = "fixed";
    wrap.style.overflow = "hidden";
    wrap.style.willChange = "left, top, width, height, border-radius";
    if (pos) {
      applyRect(pos);
    } else {
      toFullscreen();
    }
    if (img.complete) {
      handleImageLoaded();
    }
  }, [pos, objectFit]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
      }}
    >
      <div
        ref={backgroundRef}
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.8)",
          opacity: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {plugin}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
        onClick={handleClose}
      >
        <div
          ref={imageWrapRef}
          style={{
            position: "fixed",
            left: `${initialRect.x}px`,
            top: `${initialRect.y}px`,
            width: `${initialRect.width}px`,
            height: `${initialRect.height}px`,
            borderRadius: initialRect.radius
              ? `${initialRect.radius}px`
              : "0px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={src}
            ref={imgRef}
            onLoad={handleImageLoaded}
            onContextMenu={(e) => {
              e.stopPropagation();
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit,
            }}
          />
        </div>
      </div>
    </div>
  );
};
