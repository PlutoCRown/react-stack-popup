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
  objectPosition?: string;
  hiddenControl?: HTMLElement | null;
  plugin?: React.ReactNode;
  duration?: number;
};

export const ImageViewer: FC<Props> = ({
  src,
  pos,
  onClose,
  objectFit = "cover",
  objectPosition = "center",
  hiddenControl,
  plugin,
  duration = 3000,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);
  const originRectRef = useRef<SharedImageRect | undefined>(undefined);
  const TRANSITION_MS = duration;

  const applyRect = (rect: SharedImageRect) => {
    const img = imgRef.current;
    if (!img) return;
    img.style.left = `${rect.x}px`;
    img.style.top = `${rect.y}px`;
    img.style.width = `${rect.width}px`;
    img.style.height = `${rect.height}px`;
    img.style.borderRadius = rect.radius ? `${rect.radius}px` : "0px";
  };

  const toFullscreen = () => {
    const img = imgRef.current;
    const bg = backgroundRef.current;
    if (!img || !bg) return;
    img.style.transition = `all ${TRANSITION_MS}ms ease`;
    bg.style.transition = `opacity ${TRANSITION_MS}ms ease`;
    img.style.left = "0px";
    img.style.top = "0px";
    img.style.width = "100vw";
    img.style.height = "100vh";
    img.style.borderRadius = "0px";
    bg.style.opacity = "1";
  };

  const toOrigin = () => {
    const img = imgRef.current;
    const bg = backgroundRef.current;
    const rect = originRectRef.current ?? pos;
    if (!img || !bg || !rect) return;
    img.style.transition = `all ${TRANSITION_MS}ms ease`;
    bg.style.transition = `opacity ${TRANSITION_MS}ms ease`;
    applyRect(rect);
    bg.style.opacity = "0";
  };

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    if (hiddenControl) {
      hiddenControl.style.opacity = "1";
    }
    if (pos) {
      toOrigin();
      window.setTimeout(() => onClose?.(), TRANSITION_MS);
      return;
    }
    onClose?.();
  };

  const handleImageLoaded = () => {
    if (isClosingRef.current) return;
    if (hiddenControl) {
      hiddenControl.style.opacity = "0";
    }
    if (pos) {
      if (objectFit === "contain") {
        const img = imgRef.current;
        const naturalWidth = img?.naturalWidth ?? 0;
        const naturalHeight = img?.naturalHeight ?? 0;
        if (naturalWidth > 0 && naturalHeight > 0) {
          const scale = Math.min(
            pos.width / naturalWidth,
            pos.height / naturalHeight,
          );
          const renderWidth = naturalWidth * scale;
          const renderHeight = naturalHeight * scale;
          const offsetX = (pos.width - renderWidth) / 2;
          const offsetY = (pos.height - renderHeight) / 2;
          originRectRef.current = {
            width: renderWidth,
            height: renderHeight,
            x: pos.x + offsetX,
            y: pos.y + offsetY,
            radius: pos.radius,
          };
        } else {
          originRectRef.current = pos;
        }
      } else {
        originRectRef.current = pos;
      }
      if (originRectRef.current) {
        applyRect(originRectRef.current);
      }
    }
    requestAnimationFrame(() => toFullscreen());
  };

  useEffect(() => {
    const img = imgRef.current;
    const bg = backgroundRef.current;
    if (!img || !bg) return;
    bg.style.opacity = "0";
    if (pos) {
      img.style.position = "fixed";
      img.style.objectFit = "contain";
      img.style.objectPosition = objectPosition;
      img.style.willChange = "left, top, width, height, border-radius";
      applyRect(pos);
    } else {
      toFullscreen();
    }
    if (img.complete) {
      handleImageLoaded();
    }
  }, [pos, objectFit, objectPosition]);

  return (
    <div
      id="imageViewPopup"
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
        <img
          src={src}
          ref={imgRef}
          onLoad={handleImageLoaded}
          onContextMenu={(e) => {
            e.stopPropagation();
          }}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "contain",
            background: "red",
            objectPosition,
          }}
        />
      </div>
    </div>
  );
};
