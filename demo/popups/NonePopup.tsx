import React, { useRef } from "react";
import { CommonPopup } from "../components/CommonPopup";

interface NonePopupProps {
  onClose?: () => void;
}

export const NonePopup: React.FC<NonePopupProps> = ({ onClose }) => {
  const randomSize = useRef(Math.random());
  return (
    <CommonPopup
      title="高内容弹窗"
      subtitle="该弹窗高度随机"
      onClose={onClose}
    >
      <div style={{ width: "100%", height: `${randomSize.current * 100}vh` }} />
    </CommonPopup>
  );
};

export default NonePopup;
