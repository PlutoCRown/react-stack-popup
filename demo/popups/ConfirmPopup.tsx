import React from "react";
import { CommonPopup } from "../components/CommonPopup";

interface ConfirmPopupProps {
  onClose?: () => void;
}

export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ onClose }) => {
  return (
    <CommonPopup title="确认弹窗" subtitle="关键决策点" onClose={onClose}>
      <p>用于确认或取消关键操作。</p>
      <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <button type="button">确认</button>
        <button type="button">取消</button>
      </div>
    </CommonPopup>
  );
};

export default ConfirmPopup;
