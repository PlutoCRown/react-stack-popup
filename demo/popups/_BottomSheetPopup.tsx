import React from "react";
import { DemoCard } from "../components/DemoCard";

export const BottomSheetPopup: React.FC = () => {
  return (
    <DemoCard title="底部抽屉" subtitle="轻量内容，支持下滑关闭。">
      <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
        打开时上滑进入，关闭时下滑退出
      </p>
    </DemoCard>
  );
};

export default BottomSheetPopup;
