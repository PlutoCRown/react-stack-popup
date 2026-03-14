import React from "react";
import { CommonPopup } from "../components/CommonPopup";

interface InfoPopupProps {
  onClose?: () => void;
}

export const InfoPopup: React.FC<InfoPopupProps> = ({ onClose }) => {
  return (
    <CommonPopup title="信息弹窗" subtitle="轻量状态提示" onClose={onClose}>
      <p>适合展示非阻塞的信息更新，但仍需要简单确认。</p>
    </CommonPopup>
  );
};

export default InfoPopup;
