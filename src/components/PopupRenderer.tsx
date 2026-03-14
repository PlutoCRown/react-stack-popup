import { Suspense } from "react";
import type { FC } from "react";
import { useStackRouter } from "../hooks/useStackRouter";
import { StackRouter } from "../store/StackRouter";
import {
  PopupConfigArray,
  StackRouterArgs,
  StackRouterContentArgs,
  StackRouterId,
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

  const renderItems = stack.map((item) => {
    const popupConfig = stackRouter.popupConfigs[item.id] as Config[number] | undefined;
    if (!popupConfig) return null;

    const onClose = () => stackRouter.close(item.id);
    const Component = popupConfig.content as FC<
      StackRouterContentArgs<Config, StackRouterId<Config>>
    >;

    // Merge args with onClose
    const contentProps = { onClose, ...item.args } as StackRouterContentArgs<
      Config,
      StackRouterId<Config>
    >;
    let content = <Component {...contentProps} />;

    // Apply freeze, suspense, errorBoundary based on StackRouter config
    const freeze = config.freeze !== false; // default true
    const suspense = config.suspense !== false; // default true
    const errorBoundary = config.errorBoundary !== false; // default true

    if (freeze) {
      content = <Freeze freeze={false}>{content}</Freeze>;
    }

    if (suspense) {
      content = (
        <Suspense fallback={config.suspenseFallback || <PopupLoading />}>
          {content}
        </Suspense>
      );
    }

    if (errorBoundary) {
      content = (
        <ErrorBoundary fallback={config.errorFallback}>{content}</ErrorBoundary>
      );
    }

    const Wrapper = popupConfig.wrapper;
    const wrapperProps = {
      visible: item.visible !== false,
      onClose,
      ...popupConfig.wrapperProps,
    } as StackRouterWrapperProps<Config, StackRouterId<Config>>;

    return (
      <Wrapper {...wrapperProps} key={item.key}>
        {content}
      </Wrapper>
    );
  });

  return <>{renderItems}</>;
}
