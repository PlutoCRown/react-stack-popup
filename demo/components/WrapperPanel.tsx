import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export function WrapperPanel() {
  return (
    <section className="card controls">
      <div className="card-header">
        <h2>Wrapper Types</h2>
        <span className="subtle">Explore in the Page demo</span>
      </div>
      <p style={{ marginBottom: 16, color: "#6a625b" }}>
        Open the Page wrapper to access the full wrapper button group and
        experiment with nested popups.
      </p>
      <div className="button-group">
        <button type="button" onClick={() => stackRouter.open(PopupID.PAGE, {})}>
          Open Page Demo
        </button>
      </div>
    </section>
  );
}
