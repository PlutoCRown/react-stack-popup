import { PopupID, stackRouter } from "../stackRouter";

export function WrapperPanel() {
  return (
    <section className="card controls">
      <div className="card-header">
        <h2>Wrapper Types</h2>
        <span className="subtle">Pick a wrapper to open</span>
      </div>
      <div className="button-group">
        <button type="button" onClick={() => stackRouter.open(PopupID.NONE, {})}>
          None Wrapper
        </button>
        <button type="button" onClick={() => stackRouter.open(PopupID.MASK, {})}>
          Mask Wrapper
        </button>
        <button
          type="button"
          onClick={() =>
            stackRouter.open(PopupID.BOTTOM_SHEET, {
              title: "Bottom Sheet",
              message: "Slides from the bottom with a clean sheet layout.",
            })
          }
        >
          Bottom Sheet
        </button>
        <button type="button" onClick={() => stackRouter.open(PopupID.PAGE, {})}>
          Page Wrapper
        </button>
        <button type="button" onClick={() => stackRouter.open(PopupID.CUSTOM, {})}>
          Custom Wrapper
        </button>
      </div>
    </section>
  );
}
