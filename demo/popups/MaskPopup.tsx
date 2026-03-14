import React from "react";
import { CommonPopup } from "../components/CommonPopup";

interface MaskPopupProps {
  onClose?: () => void;
}

export const MaskPopup: React.FC<MaskPopupProps> = ({ onClose }) => {
  return (
    <CommonPopup
      title="Mask Wrapper"
      subtitle="Transparent background with fade animation"
      onClose={onClose}
    >
      <p>Click outside or press ESC to close with animation.</p>
    </CommonPopup>
  );
};

export default MaskPopup;
