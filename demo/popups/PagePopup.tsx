import React from "react";
import { CommonPopup } from "../components/CommonPopup";
import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

interface PagePopupProps {
  onClose?: () => void;
}

type PageAction =
  | { label: string; id: PopupID.BottomSheet }
  | { label: string; id: Exclude<PopupID, PopupID.BottomSheet> };

const pageActions: PageAction[] = [
  { label: "遮罩弹窗", id: PopupID.CenterPopup },
  { label: "底部抽屉", id: PopupID.BottomSheet },
  { label: "全屏页面", id: PopupID.FullPage },
  { label: "无容器弹窗", id: PopupID.TestNoneWrap },
  { label: "自定义弹窗", id: PopupID.TestCustom },
  { label: "信息弹窗", id: PopupID.TestSwipable },
  { label: "确认弹窗", id: PopupID.HighSheet },
  { label: "表单弹窗", id: PopupID.ScrollSheet },
];

const openAction = (action: PageAction) => {
  if (action.id === PopupID.BottomSheet) {
    stackRouter.open(action.id, {
      title: "底部抽屉",
      message: "轻量内容，支持下滑关闭。",
    });
    return;
  }
  stackRouter.open(action.id, {});
};

export const PagePopup: React.FC<PagePopupProps> = ({ onClose }) => {
  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(140deg, #fff7f0, #f6efe7)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <CommonPopup
          title="全屏页面"
          subtitle="全屏覆盖 + 右侧滑入"
          onClose={onClose}
        >
          <p>打开时从右侧滑入，关闭时向右侧滑出。</p>
          <div style={{ marginTop: "24px" }}>
            <h3 style={{ marginBottom: "12px" }}>打开其他弹窗</h3>
            <div className="button-group">
              {pageActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => openAction(action)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </CommonPopup>
      </div>
    </div>
  );
};

export default PagePopup;
