import React from "react";
import { CommonPopup } from "../components/CommonPopup";

interface FormPopupProps {
  onClose?: () => void;
}

export const FormPopup: React.FC<FormPopupProps> = ({ onClose }) => {
  return (
    <CommonPopup title="Form Popup" subtitle="Collect a quick response" onClose={onClose}>
      <label style={{ display: "grid", gap: 6, marginTop: 8 }}>
        <span style={{ fontSize: 12, color: "#666" }}>Email</span>
        <input
          type="email"
          placeholder="you@example.com"
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        />
      </label>
      <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button type="button">Submit</button>
        <button type="button">Cancel</button>
      </div>
    </CommonPopup>
  );
};

export default FormPopup;
