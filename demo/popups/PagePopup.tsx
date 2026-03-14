import React from "react";
import { CommonPopup } from "../components/CommonPopup";
import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

interface PagePopupProps {
  onClose?: () => void;
}

type PageAction =
  | { label: string; id: PopupID.BOTTOM_SHEET }
  | { label: string; id: Exclude<PopupID, PopupID.BOTTOM_SHEET> };

const pageActions: PageAction[] = [
  { label: "Mask Wrapper", id: PopupID.MASK },
  { label: "Bottom Sheet", id: PopupID.BOTTOM_SHEET },
  { label: "Page Wrapper", id: PopupID.PAGE },
  { label: "None Wrapper", id: PopupID.NONE },
  { label: "Custom Wrapper", id: PopupID.CUSTOM },
  { label: "Info Popup", id: PopupID.INFO },
  { label: "Confirm Popup", id: PopupID.CONFIRM },
  { label: "Form Popup", id: PopupID.FORM },
];

const openAction = (action: PageAction) => {
  if (action.id === PopupID.BOTTOM_SHEET) {
    stackRouter.open(action.id, {
      title: "Bottom Sheet",
      message: "A compact sheet with swipe-to-close.",
    });
    return;
  }
  stackRouter.open(action.id, {});
};

export const PagePopup: React.FC<PagePopupProps> = ({ onClose }) => {
  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(140deg, #fff7f0, #f6efe7)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <CommonPopup
          title="Page Wrapper"
          subtitle="Full-page overlay with slide-in transition"
          onClose={onClose}
        >
          <p>Slides in from right on open, slides out to right on close.</p>
          <div style={{ marginTop: "24px" }}>
            <h3 style={{ marginBottom: "12px" }}>Open Another Popup</h3>
            <div className="button-group">
              {pageActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => openAction(action)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </CommonPopup>
      </div>
    </div>
  );
};

export default PagePopup;
