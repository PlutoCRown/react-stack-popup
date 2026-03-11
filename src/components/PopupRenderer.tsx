import { Suspense } from "react";
import { useStackRouter } from "../hooks/useStackRouter";
import { StackRouter } from "../store/StackRouter";
import { PopupConfig, WrapperBaseProps } from "../types";
import { ErrorBoundary } from "./ErrorBoundary";
import { Freeze } from "./Freeze";
import { PopupLoading } from "./PopupLoading";

interface PopupRendererProps<
  ID extends string,
  T extends object,
  W extends WrapperBaseProps,
> {
  stackRouter: StackRouter<ID, T, W>;
}

export function PopupRenderer<
  ID extends string,
  T extends object,
  W extends WrapperBaseProps,
>({ stackRouter }: PopupRendererProps<ID, T, W>) {
  const stack = useStackRouter(stackRouter);
  const config = stackRouter.config;

  const renderItems = stack.map((item) => {
    const popupConfig = item.popupConfig as PopupConfig<ID, T, W> | undefined;
    if (!popupConfig) return null;

    const onClose = () => stackRouter.close(item.id);
    const Component = popupConfig.content;

    // Merge args with onClose
    const contentProps = { onClose, ...item.args } as T & {
      onClose: () => void;
    };
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
    } as W;

    return (
      <div key={item.key} data-stack>
        <Wrapper {...wrapperProps}>{content}</Wrapper>
      </div>
    );
  });

  return <>{renderItems}</>;
}
