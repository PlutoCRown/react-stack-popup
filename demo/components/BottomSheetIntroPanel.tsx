import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export function BottomSheetIntroPanel() {
  return (
    <section className="card">
      <div className="card-header">
        <h2>底部抽屉容器</h2>
        <span className="subtle">内容自适应 + 滑动关闭</span>
      </div>
      <p style={{ marginBottom: 16, color: "#6a625b" }}>
        BottomSheet 支持内容高度自适应，并支持滑动手势关闭。适合行动面板、
        选择器与轻量流程。
      </p>
      <div className="button-group">
        <button
          type="button"
          onClick={() =>
            stackRouter.open(PopupID.BottomSheet, {
              title: "底部抽屉",
              message: "已支持内容自适应和滑动关闭。",
            })
          }
        >
          打开底部抽屉
        </button>
      </div>
    </section>
  );
}
