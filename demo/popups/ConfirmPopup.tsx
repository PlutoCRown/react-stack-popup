import React from "react";
import { CommonPopup } from "../components/CommonPopup";

interface ConfirmPopupProps {
  onClose?: () => void;
}

export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ onClose }) => {
  return (
    <CommonPopup title="Confirm Popup" subtitle="A decision point" onClose={onClose}>
      <p>Ask the user to confirm or cancel a critical action.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <button type="button">Confirm</button>
        <button type="button">Cancel</button>
      </div>
    </CommonPopup>
  );
};

export default ConfirmPopup;
