import React, { useRef } from "react";

interface NonePopupProps {
  onClose?: () => void;
}

export const NonePopup: React.FC<NonePopupProps> = ({ onClose }) => {
  const randomSize = useRef(Math.random());
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
        marginBottom: "16px",
        overflowX: "scroll",
      }}
    >
      <h2>High Popup</h2>
      <p>This popup has random height</p>
      <div
        style={{ width: "100%", height: `${randomSize.current * 100}vh` }}
      ></div>
      {onClose && (
        <button type="button" onClick={onClose} style={{ marginTop: "12px" }}>
          Close
        </button>
      )}
    </div>
  );
};

export default NonePopup;
