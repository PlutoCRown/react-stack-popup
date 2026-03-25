import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export function SheetIntroPanel() {
  return (
    <section className="card">
      <div className="card-header">
        <h2>底部抽屉容器</h2>
        <span className="subtle">内容自适应 + 滑动关闭</span>
      </div>

      <div className="button-group">
        <button
          onClick={() =>
            stackRouter.open(PopupID.TestSwipable, {
              title: "底部抽屉",
              message: "已支持内容自适应和滑动关闭。",
            })
          }
        >
          可以滑动关闭
        </button>
        <button onClick={() => stackRouter.open(PopupID.HighSheet, {})}>
          全高的
        </button>

        <button onClick={() => stackRouter.open(PopupID.ScrollSheet, {})}>
          即使包含滚动内容
        </button>
      </div>
    </section>
  );
}
