import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

interface StackPanelProps {
  openNestedPopup: (level: number) => void;
}

export function StackPanel({ openNestedPopup }: StackPanelProps) {
  return (
    <section className="card demo">
      <div className="card-header">
        <h2>栈操作</h2>
        <span className="subtle">管理弹窗栈</span>
      </div>
      <div className="button-group">
        <button type="button" onClick={() => stackRouter.close()}>
          关闭顶部弹窗
        </button>
        <button
          type="button"
          onClick={() => stackRouter.close(PopupID.BottomSheet)}
        >
          仅关闭底部抽屉
        </button>
        <button type="button" onClick={() => openNestedPopup(0)}>
          打开嵌套（第 1 层）
        </button>
      </div>
    </section>
  );
}
