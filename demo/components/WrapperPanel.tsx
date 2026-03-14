import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export function WrapperPanel() {
  return (
    <section className="card controls">
      <div className="card-header">
        <h2>包装器类型</h2>
        <span className="subtle">在页面演示中体验</span>
      </div>
      <p style={{ marginBottom: 16, color: "#6a625b" }}>
        打开页面弹窗可以看到完整的按钮组，并测试嵌套弹窗效果。
      </p>
      <div className="button-group">
        <button
          type="button"
          onClick={() => stackRouter.open(PopupID.FullPage, {})}
        >
          打开页面演示
        </button>
      </div>
    </section>
  );
}
