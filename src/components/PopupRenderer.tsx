import {
  createElement,
  memo,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useStackRouter } from "../hooks/useStackRouter";
import { StackRouter } from "../store/StackRouter";
import { StackStateContext } from "../context/StackStateContext";
import {
  PopupConfigArray,
  StackRouterId,
  StackRouterItem,
  StackRouterWrapperProps,
} from "../types";
import { Freeze } from "./Freeze";
import { PopupLoading } from "./PopupLoading";

interface PopupRendererProps<Config extends PopupConfigArray> {
  stackRouter: StackRouter<Config>;
}

export function PopupRenderer<Config extends PopupConfigArray>({
  stackRouter,
}: PopupRendererProps<Config>) {
  const stack = useStackRouter(stackRouter);
  const config = stackRouter.config;

  const renderItems = stack
    .slice(-config.unloadDistance)
    .map((item) =>
      createElement(PopupItem, { key: item.key, item, stackRouter }),
    );

  const portalTarget = document.body;
  return createPortal(renderItems, portalTarget);
}

type PopupItemProps<Config extends PopupConfigArray> = {
  item: StackRouterItem<Config>;
  stackRouter: StackRouter<Config>;
};

const PopupItem = memo(function PopupItem<Config extends PopupConfigArray>({
  item,
  stackRouter,
}: PopupItemProps<Config>) {
  const config = stackRouter.config;
  const popupConfig = stackRouter.popupConfigs[item.id];
  const { Suspense, ErrorBoundary } = stackRouter
  if (!popupConfig) return null;

  const onClose = stackRouter.close;
  const Component = popupConfig.content;
  let content = <Component {...item.args} />;

  const freeze = config.freeze !== false;

  if (freeze) {
    content = <Freeze freeze={false}>{content}</Freeze>;
  }
  if (Suspense) {
    content = <Suspense fallback={<PopupLoading />}>{content}</Suspense>;
  }

  if (ErrorBoundary) {
    content = <ErrorBoundary>{content}</ErrorBoundary>;
  }

  const Wrapper = popupConfig.wrapper;
  const wrapperProps = {
    visible: item.visible !== false,
    onClose,
    ...popupConfig.wrapperProps,
  } as StackRouterWrapperProps<Config, StackRouterId<Config>>;

  const [useMount, setUseMount] = useState(false);
  useEffect(() => {
    const offOpend = item.channel.on("opend", () => setUseMount(true));
    const offWillClose = item.channel.on("willClose", () => setUseMount(false));
    return () => {
      offOpend();
      offWillClose();
    };
  }, [item.channel]);

  const contextValue = useMemo(
    () => ({
      ...item,
      onClose: () => stackRouter.close(item.id),
      useMount,
      config: stackRouter.config,
      inStack: true,
    }),
    [item, stackRouter, useMount],
  );

  return (
    <Wrapper {...wrapperProps}>
      <StackStateContext.Provider value={contextValue}>
        {content}
      </StackStateContext.Provider>
    </Wrapper>
  );
});
