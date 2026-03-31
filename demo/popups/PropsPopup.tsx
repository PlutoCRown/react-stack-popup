import React, { useRef } from "react";
import { DemoCard } from "../components/DemoCard";
import { focusLock, stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

interface SheetPopupProps {
  title: string;
  message: string;
  blockClose?: boolean;
}

export const PropsPopup: React.FC<SheetPopupProps> = ({
  title,
  message,
  blockClose,
}) => {
  const comfirmed = useRef(false);
  // 测试锁功能
  focusLock.useWhenClose(
    () =>
      new Promise((resolve, reject) => {
        if (!blockClose || comfirmed.current) return resolve();
        stackRouter.open(PopupID.ConfirmLeave, {
          onConfirm: () => {
            comfirmed.current = true;
            stackRouter.close();
            stackRouter.close();
          },
        });
        return reject();
      }),
  );

  return <DemoCard title={title} subtitle={message} closeable />;
};

export default PropsPopup;
