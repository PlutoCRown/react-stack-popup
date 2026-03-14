import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export function ScrollCompatiblePanel() {
  return (
    <section className="card">
      <div className="card-header">
        <h2>滚动兼容性测试</h2>
        <span className="subtle">页面内容滚动控制</span>
      </div>

      <div className="button-group">
        <button onClick={() => stackRouter.open(PopupID.ScrollPage, {})}>
          Page内滚动
        </button>
        <button onClick={() => stackRouter.open(PopupID.ScrollSheet, {})}>
          Sheet内滚动
        </button>
        <button
          onClick={() =>
            stackRouter.open(PopupID.HighSheet, {
              title: "底部抽屉",
              message: "已支持内容自适应和滑动关闭。",
            })
          }
        >
          Mask内滚动
        </button>
      </div>
    </section>
  );
}
