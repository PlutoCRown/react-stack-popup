import { DemoCard } from "../components/DemoCard";
import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export const PagePopup = () => {
  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        background: "linear-gradient(140deg, #fff7f0, #f6efe7)",
      }}
    >
      <DemoCard
        title="全屏页面"
        subtitle="打开时从右侧滑入，关闭时向右侧滑出。"
      >
        <h3 style={{ marginBottom: "12px" }}>打开其他弹窗</h3>
        <AllWrapBtnGroup />
      </DemoCard>
    </div>
  );
};

export default PagePopup;

export const AllWrapBtnGroup = () => {
  return (
    <div className="button-group">
      <button onClick={() => stackRouter.open(PopupID.FullPage, {})}>
        PageWrapper
      </button>
      <button onClick={() => stackRouter.open(PopupID.BottomSheet, {})}>
        BottomSheet
      </button>
      <button onClick={() => stackRouter.open(PopupID.CenterPopup, {})}>
        MaskWrapper
      </button>
      <button
        onClick={() =>
          stackRouter.open(PopupID.TestNoneWrap, {
            title: "什么包装都没有",
            message: "关闭也需要自己在内部实现",
          })
        }
      >
        NoneWrapper
      </button>
      <button onClick={() => stackRouter.open(PopupID.CustomWrapper, {})}>
        自定义实现
      </button>
    </div>
  );
};
