import { useState, useEffect, useRef } from "react";
import { useStackRouter } from "../hooks/useStackRouter";
import { StackRouter } from "../store/StackRouter";
import { PopupConfig } from "../types";

interface PopupRendererProps<ID extends string, T extends any[], W = any> {
  stackRouter: StackRouter<ID, T, W>;
}

interface PopupItem {
  key: string;
  visible: boolean;
}

export function PopupRenderer<ID extends string, T extends any[], W = any>({
  stackRouter,
}: PopupRendererProps<ID, T, W>) {
  const stack = useStackRouter(stackRouter);
  const [popupItems, setPopupItems] = useState<Map<string, PopupItem>>(
    new Map(),
  );
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  useEffect(() => {
    const newItems = new Map<string, PopupItem>();
    const currentKeys = new Set<string>();

    // Add or update items from current stack
    stack.forEach((item, index) => {
      const key = `${item.id}-${index}`;
      currentKeys.add(key);

      if (!popupItems.has(key)) {
        newItems.set(key, { key, visible: true });
      } else {
        newItems.set(key, popupItems.get(key)!);
      }
    });

    // Mark removed items as invisible and schedule cleanup
    popupItems.forEach((item, key) => {
      if (!currentKeys.has(key) && item.visible) {
        newItems.set(key, { key, visible: false });

        // Clear existing timer if any
        const existingTimer = timersRef.current.get(key);
        if (existingTimer) {
          clearTimeout(existingTimer);
        }

        // Schedule removal after animation (duration + 50ms)
        const timer = setTimeout(() => {
          setPopupItems((prev) => {
            const updated = new Map(prev);
            updated.delete(key);
            return updated;
          });
          timersRef.current.delete(key);
        }, 350); // 300ms default duration + 50ms buffer

        timersRef.current.set(key, timer);
      }
    });

    setPopupItems(newItems);
  }, [stack]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const renderItems = Array.from(popupItems.values()).map((popupItem) => {
    const [id, indexStr] = popupItem.key.split("-");
    const index = parseInt(indexStr);
    const item = stack.find((s, i) => s.id === id && i === index);

    if (!item && !popupItem.visible) {
      return null;
    }

    const stackItem = item || stack[index];
    if (!stackItem) return null;

    const popupConfig = stackItem.popupConfig as
      | PopupConfig<ID, T, W>
      | undefined;
    if (!popupConfig) return null;

    const onClose = () => stackRouter.close(stackItem.id);
    const content = popupConfig.content(
      ...([...stackItem.args, onClose] as any),
    );
    const wrapper = popupConfig.wrapper;
    const wrapperProps = popupConfig.wrapperProps;

    const finalWrapperProps = stackItem.config?.wrapperProps || wrapperProps;
    const mergedProps = {
      ...finalWrapperProps,
      visible: popupItem.visible,
      onClose,
    };

    // Check if wrapper is a component (has a render method or is a function component)
    const isComponent =
      typeof wrapper === "function" &&
      (wrapper.prototype?.isReactComponent ||
        wrapper.length <= 1 || // Function components typically take 0-1 args (props)
        !wrapper.toString().includes("preset")); // Heuristic: wrapper functions reference 'preset'

    let wrappedContent: React.ReactNode;

    if (isComponent) {
      // It's a component, use it as JSX
      const WrapperComponent = wrapper as React.ComponentType<any>;
      wrappedContent = (
        <WrapperComponent {...mergedProps}>{content}</WrapperComponent>
      );
    } else {
      // It's a function, call it
      const wrapperFn = wrapper as (
        preset: React.ReactNode,
        wrapperProps?: any,
        ...args: any[]
      ) => React.ReactNode;
      wrappedContent = wrapperFn(
        content,
        mergedProps,
        ...(stackItem.args as any),
      );
    }

    return <div key={popupItem.key}>{wrappedContent}</div>;
  });

  return <>{renderItems}</>;
}
