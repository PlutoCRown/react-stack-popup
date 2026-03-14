import React from "react";

interface MaskPopupProps {
  onClose?: () => void;
}

export const CommonPopup: React.FC<MaskPopupProps> = ({ onClose }) => {
  return (
    <div
      style={{
        padding: 20,
        background: "white",
        borderRadius: 12,
        margin: 20,
        boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
      }}
    >
      <h2>Common Popup</h2>
      <p></p>
      <p>Click outside or press ESC to close with animation</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{ marginTop: "10px", padding: "8px 16px" }}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default CommonPopup;
