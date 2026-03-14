import React, { useRef } from "react";
import { CommonPopup } from "../components/CommonPopup";

interface NonePopupProps {
  onClose?: () => void;
}

export const NonePopup: React.FC<NonePopupProps> = ({ onClose }) => {
  const randomSize = useRef(Math.random());
  return (
    <CommonPopup
      title="High Popup"
      subtitle="This popup has random height"
      onClose={onClose}
    >
      <div style={{ width: "100%", height: `${randomSize.current * 100}vh` }} />
    </CommonPopup>
  );
};

export default NonePopup;
