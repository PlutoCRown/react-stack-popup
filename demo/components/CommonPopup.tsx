import React from "react";

interface CommonPopupProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

export function CommonPopup({ title, subtitle, children, onClose }: CommonPopupProps) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
        padding: 24,
        minWidth: 280,
      }}
    >
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ margin: 0, color: "#666" }}>{subtitle}</p>}
      </div>
      {children}
      {onClose && (
        <button type="button" onClick={onClose} style={{ marginTop: 16 }}>
          Close
        </button>
      )}
    </div>
  );
}
