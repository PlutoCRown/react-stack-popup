import React, { useState } from "react";
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
  // 测试锁功能
  const [confirm, setConfirm] = useState(false);
  focusLock.useWhenClose(
    () =>
      new Promise((resolve, reject) => {
        if (!blockClose || confirm) return resolve();
        stackRouter.open(PopupID.ConfirmLeave, {
          onConfirm: () => setConfirm(true),
        });
        return reject();
      }),
  );

  return <DemoCard title={title} subtitle={message} closeable />;
};

export default PropsPopup;
