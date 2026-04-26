import { RefObject, useEffect, useRef } from "react";
import { useInStackState } from "../../hooks/useStackState";

type Cleanup = void | (() => void);
type EndEvent = "animationend" | "transitionend" | "none";

type UseWrapperAnimationArgs = {
  rootRef: RefObject<HTMLElement | null>;
  duration: number;
  coverPrevious: boolean;
  endEvent: EndEvent;
  endTargetRef?: RefObject<HTMLElement | null>;
  onWillEnter?: () => Cleanup;
  onWillClose?: () => Cleanup;
  onEntered?: () => void;
  onDestroyed?: () => void;
};

export function useWrapperAnimation({
  rootRef,
  duration,
  coverPrevious,
  endEvent,
  endTargetRef,
  onWillEnter,
  onWillClose,
  onEntered,
  onDestroyed,
}: UseWrapperAnimationArgs) {
  const { channel } = useInStackState();
  const enterRef = useRef(onWillEnter);
  const closeRef = useRef(onWillClose);
  const enteredRef = useRef(onEntered);
  const destroyedRef = useRef(onDestroyed);

  enterRef.current = onWillEnter;
  closeRef.current = onWillClose;
  enteredRef.current = onEntered;
  destroyedRef.current = onDestroyed;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const enterClass = "rsp-entering";
    const exitClass = "rsp-exiting";
    let removeEndListener: (() => void) | null = null;
    let removeEnterSetup: Cleanup;
    let removeCloseSetup: Cleanup;
    let timerId = 0;

    const clearEndListener = () => {
      removeEndListener?.();
      removeEndListener = null;
      window.clearTimeout(timerId);
      timerId = 0;
    };

    const waitEnd = (callback: () => void) => {
      clearEndListener();
      if (duration <= 0) {
        callback();
        return;
      }
      if (endEvent === "none") {
        timerId = window.setTimeout(callback, duration);
        return;
      }

      const target = endTargetRef?.current ?? root;
      if (!target) {
        callback();
        return;
      }

      const handler = (event: Event) => {
        if (event.target !== target) return;
        clearEndListener();
        callback();
      };

      target.addEventListener(endEvent, handler);
      removeEndListener = () => {
        target.removeEventListener(endEvent, handler);
      };
    };

    const offWillEnter = channel.on("willEnter", () => {
      clearEndListener();
      removeEnterSetup?.();
      root.classList.remove(exitClass);
      removeEnterSetup = enterRef.current?.();
      root.classList.add(enterClass);
      waitEnd(() => {
        root.classList.remove(enterClass);
        enteredRef.current?.();
        channel.emit("entered", coverPrevious);
      });
    });

    const offWillClose = channel.on("willClose", () => {
      clearEndListener();
      removeCloseSetup?.();
      root.classList.remove(enterClass);
      removeCloseSetup = closeRef.current?.();
      root.classList.add(exitClass);
      waitEnd(() => {
        destroyedRef.current?.();
        channel.emit("destroy", null);
      });
    });

    return () => {
      clearEndListener();
      removeEnterSetup?.();
      removeCloseSetup?.();
      root.classList.remove(enterClass, exitClass);
      offWillEnter();
      offWillClose();
    };
  }, [channel, coverPrevious, duration, endEvent, endTargetRef, rootRef]);
}
