import React from "react";
import { CommonPopup } from "../components/CommonPopup";

interface InfoPopupProps {
  onClose?: () => void;
}

export const InfoPopup: React.FC<InfoPopupProps> = ({ onClose }) => {
  return (
    <CommonPopup title="Info Popup" subtitle="Lightweight status notification" onClose={onClose}>
      <p>Use this for non-blocking updates that still require a quick acknowledgement.</p>
    </CommonPopup>
  );
};

export default InfoPopup;
