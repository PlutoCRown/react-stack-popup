import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

interface StackPanelProps {
  openNestedPopup: (level: number) => void;
}

export function StackPanel({ openNestedPopup }: StackPanelProps) {
  return (
    <section className="card demo">
      <div className="card-header">
        <h2>Stack Operations</h2>
        <span className="subtle">Manage the popup stack</span>
      </div>
      <div className="button-group">
        <button type="button" onClick={() => stackRouter.close()}>
          Close Last Popup
        </button>
        <button
          type="button"
          onClick={() => stackRouter.close(PopupID.BOTTOM_SHEET)}
        >
          Close Bottom Sheet Only
        </button>
        <button type="button" onClick={() => openNestedPopup(0)}>
          Open Nested (Level 1)
        </button>
      </div>
    </section>
  );
}
