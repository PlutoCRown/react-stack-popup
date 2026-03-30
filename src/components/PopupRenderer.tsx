import { Fragment, Suspense, createElement, memo, useCallback } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import { useStackRouter } from "../hooks/useStackRouter";
import { StackRouter } from "../store/StackRouter";
import { StackStateContext } from "../context/StackStateContext";
import {
  PopupConfigArray,
  StackRouterArgs,
  StackRouterConfig,
  StackRouterId,
  StackRouterItem,
  StackRouterWrapperProps,
} from "../types";
import { ErrorBoundary } from "./ErrorBoundary";
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
  if (!popupConfig) return null;

  const onClose = stackRouter.close;
  const Component = popupConfig.content;
  let content = <Component onClose={onClose} {...item.args} />;

  const freeze = config.freeze !== false;
  const suspense = config.suspense !== false;
  const errorBoundary = config.errorBoundary !== false;

  if (freeze) {
    content = <Freeze freeze={false}>{content}</Freeze>;
  }

  if (suspense) {
    content = <Suspense fallback={<PopupLoading />}>{content}</Suspense>;
  }

  if (errorBoundary) {
    content = <ErrorBoundary>{content}</ErrorBoundary>;
  }

  const Wrapper = popupConfig.wrapper;
  const wrapperProps = {
    visible: item.visible !== false,
    onClose,
    ...popupConfig.wrapperProps,
  } as StackRouterWrapperProps<Config, StackRouterId<Config>>;

  return (
    <Wrapper {...wrapperProps}>
      <StackStateContext.Provider value={item}>
        {content}
      </StackStateContext.Provider>
    </Wrapper>
  );
});
