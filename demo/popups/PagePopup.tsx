import React from "react";
import { PopupID, stackRouter } from "../stackRouter";

interface PagePopupProps {
  onClose?: () => void
}

const pageActions = [
  { label: "Mask Wrapper", id: PopupID.MASK as const },
  { label: "Bottom Sheet", id: PopupID.BOTTOM_SHEET as const },
  { label: "Page Wrapper", id: PopupID.PAGE as const },
  { label: "None Wrapper", id: PopupID.NONE as const },
  { label: "Custom Wrapper", id: PopupID.CUSTOM as const },
];

export const PagePopup: React.FC<PagePopupProps> = ({ onClose }) => {
  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(140deg, #fff7f0, #f6efe7)",
      }}
    >
      <h2>Page Wrapper</h2>
      <p>This is a full-page popup that slides in from the right</p>
      <p>It has a white background and covers the entire viewport</p>
      <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
        Slides in from right on open, slides out to right on close
      </p>
      <div style={{ marginTop: "24px" }}>
        <h3 style={{ marginBottom: "12px" }}>Open Another Popup</h3>
        <div className="button-group">
          {pageActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => stackRouter.open(action.id, {})}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{ marginTop: "24px", padding: "10px 20px" }}
        >
          Close Page
        </button>
      )}
    </div>
  )
}

export default PagePopup
