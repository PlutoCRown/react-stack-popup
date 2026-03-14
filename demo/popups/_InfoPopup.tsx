import React from "react";
import { DemoCard } from "../components/DemoCard";

interface InfoPopupProps {
  onClose?: () => void;
}

export const InfoPopup: React.FC<InfoPopupProps> = ({ onClose }) => {
  return (
    <DemoCard title="信息弹窗" subtitle="轻量状态提示" onClose={onClose}>
      <p>适合展示非阻塞的信息更新，但仍需要简单确认。</p>
    </DemoCard>
  );
};

export default InfoPopup;
