import React from "react";
import { DemoCard } from "../components/DemoCard";

interface BottomSheetPopupProps {
  title: string;
  message: string;
}

export const PropsPopup: React.FC<BottomSheetPopupProps> = ({
  title,
  message,
}) => {
  return (
    <DemoCard title={title} subtitle={message}>
      <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
        打开时上滑进入，关闭时下滑退出
      </p>
    </DemoCard>
  );
};

export default PropsPopup;
