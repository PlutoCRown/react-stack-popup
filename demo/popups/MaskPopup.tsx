import React from "react";
import { CommonPopup } from "../components/CommonPopup";

interface MaskPopupProps {
  onClose?: () => void;
}

export const MaskPopup: React.FC<MaskPopupProps> = ({ onClose }) => {
  return (
    <CommonPopup
      title="Mask Wrapper"
      subtitle="半透明背景 + 淡入淡出"
      onClose={onClose}
    >
      <p>可以点击 Mask 关闭</p>
      <p>
        注册时可以：<code>maskClosable: false</code>来关闭此功能
      </p>
    </CommonPopup>
  );
};

export default MaskPopup;
