import { DemoCard } from "../components/DemoCard";
import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export const PagePopup = () => {
  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        background: "linear-gradient(140deg, #fff7f0, #f6efe7)",
      }}
    >
      <DemoCard
        title="全屏页面"
        subtitle="打开时从右侧滑入，关闭时向右侧滑出。"
      >
        <AllWrapBtnGroup />
      </DemoCard>

      <DemoCard
        title="URL管理测试"
        subtitle="如果 new StackRouter(...,{ urlManage: true })，那么可以"
      >
        <div className="button-group">
          <button
            onClick={() =>
              stackRouter.open(
                PopupID.FullPage,
                {},
                {
                  url: `/react-stack-popup/${Math.random().toPrecision(5).slice(2)}`,
                },
              )
            }
          >
            打开并更新URL
          </button>
          <button
            onClick={() => {
              stackRouter.close();
              stackRouter.close();
            }}
          >
            关闭x2
          </button>
        </div>
      </DemoCard>
    </div>
  );
};

export default PagePopup;

export const AllWrapBtnGroup = () => {
  return (
    <div className="button-group">
      <button onClick={() => stackRouter.open(PopupID.FullPage, {})}>
        Page
      </button>
      <button onClick={() => stackRouter.open(PopupID.Sheet, {})}>Sheet</button>
      <button onClick={() => stackRouter.open(PopupID.CenterPopup, {})}>
        Mask
      </button>
      <button onClick={() => stackRouter.open(PopupID.Drawer, {})}>
        Drawer
      </button>
      <button
        onClick={() =>
          stackRouter.open(PopupID.TestNoneWrap, {
            title: "什么包装都没有",
            message: "关闭也需要自己在内部实现",
          })
        }
      >
        None
      </button>
    </div>
  );
};
