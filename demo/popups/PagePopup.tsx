import { useState } from "react";
import { DemoCard } from "../components/DemoCard";
import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";
import { useStackState } from "../../src";
import { LockStatePanel } from "../components/LockStatePanel";

export const PagePopup = () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        background: "linear-gradient(140deg, #fff7f0, #f6efe7)",
      }}
    >
      <DemoCard
        title="全屏页面"
        subtitle="打开时从右侧滑入，关闭时向右侧滑出。"
        closeable
      >
        <AllWrapBtnGroup />
      </DemoCard>

      <DemoCard
        title="URL管理测试"
        subtitle="如果 new StackRouter(...,{ urlManage: true })，那么可以"
      >
        <div style={{ display: "grid", gap: 8 }}>
          <div>{navigator.userAgent}</div>
          <div>{ }</div>
        </div>
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
      <ContextTest />
      <InnerStateTest />
      <LockStatePanel />
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

const ContextTest = () => {
  const item = useStackState();
  if (!item.inStack) return "不在弹窗中";

  return (
    <DemoCard title="Context测试" subtitle="展示当前层的 id 和 key">
      <div style={{ display: "grid", gap: 8 }}>
        <div>id: {item?.id ?? "-"}</div>
        <div>key: {item?.key ?? "-"}</div>
      </div>
    </DemoCard>
  );
};

const InnerStateTest = () => {
  const [count, setCount] = useState(0);

  return (
    <DemoCard title="内部状态测试" subtitle="测试内部状态是否正常">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </DemoCard>
  );
};
