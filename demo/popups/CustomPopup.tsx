import React from "react";
import { CommonPopup } from "../components/CommonPopup";

export const CustomPopup: React.FC = () => {
  return (
    <CommonPopup
      title="自定义弹窗"
      subtitle="动态包装器色彩 + 呼吸动效"
    >
      <p>该弹窗使用自定义 wrapper 并支持动态颜色。</p>
    </CommonPopup>
  );
};

export default CustomPopup;
