import React from "react";
import { CommonPopup } from "../components/CommonPopup";

interface BottomSheetPopupProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export const BottomSheetPopup: React.FC<BottomSheetPopupProps> = ({ title, message, onClose }) => {
  return (
    <CommonPopup title={title} subtitle={message} onClose={onClose}>
      <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
        打开时上滑进入，关闭时下滑退出
      </p>
    </CommonPopup>
  );
};

export default BottomSheetPopup;
