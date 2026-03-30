import React from "react";
import { DemoCard } from "../components/DemoCard";

export const CustomPopup: React.FC = () => {
  return (
    <DemoCard title="自定义弹窗" subtitle="动态包装器色彩 + 呼吸动效" closeable>
      <p>该弹窗使用自定义 wrapper 并支持动态颜色。</p>
    </DemoCard>
  );
};

export default CustomPopup;
