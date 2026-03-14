import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export function BottomSheetIntroPanel() {
  return (
    <section className="card">
      <div className="card-header">
        <h2>BottomSheet Wrapper</h2>
        <span className="subtle">Fit content + swipe to close</span>
      </div>
      <p style={{ marginBottom: 16, color: "#6a625b" }}>
        The BottomSheet wrapper supports content-sized height and a swipe gesture
        to dismiss. Use it for action sheets, pickers, and lightweight flows.
      </p>
      <div className="button-group">
        <button
          type="button"
          onClick={() =>
            stackRouter.open(PopupID.BOTTOM_SHEET, {
              title: "Bottom Sheet",
              message: "Now supports fitContent and swipe-to-close.",
            })
          }
        >
          Open Bottom Sheet
        </button>
      </div>
    </section>
  );
}
