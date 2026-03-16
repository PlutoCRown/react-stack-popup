import { PopupID } from "../constants/popupIds";
import { stackRouter } from "../stackRouter";

const feedLeftHeights = [128, 179, 147, 208, 140, 192, 153, 195];
const feedRightHeights = [176, 137, 217, 150, 198, 131, 188, 166];

const LongContent = () => {
  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <button
        className="close-button"
        style={{ position: "sticky", top: 16 }}
        onClick={() => stackRouter.close()}
      >
        返回
      </button>

      <div
        style={{
          minHeight: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {feedLeftHeights.map((height, index) => (
            <div
              key={index}
              style={{ height, background: `hsl(${190 + index * 16} 86% 84%)` }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {feedRightHeights.map((height, index) => (
            <div
              key={index}
              style={{ height, background: `hsl(${340 - index * 14} 90% 86%)` }}
            />
          ))}
        </div>
      </div>

      <div className="button-group">
        <button
          onClick={() => stackRouter.open(PopupID.ScrollPage, {})}
          style={{ flex: 1 }}
        >
          Page内滚动
        </button>
        <button
          onClick={() => stackRouter.open(PopupID.ScrollSheet, {})}
          style={{ flex: 1 }}
        >
          Sheet内滚动
        </button>
      </div>
    </div>
  );
};

export default LongContent;
