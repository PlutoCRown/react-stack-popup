import { AllWrapBtnGroup } from "../popups/PagePopup";

export function WrapperPanel() {
  return (
    <section className="card controls">
      <div className="card-header">
        <h2>包装器类型</h2>
        <span className="subtle">
          系统内置了4种包装，但是你可以自定义实现更多！
        </span>
      </div>

      <AllWrapBtnGroup />
    </section>
  );
}
