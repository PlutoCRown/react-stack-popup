import { DemoCard } from "../components/DemoCard";

export const DrawerPopup = () => {
  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        background: "linear-gradient(160deg, #f3f7ff, #eef2f9)",
      }}
    >
      <DemoCard
        title="侧边抽屉"
        subtitle="从左右侧滑入，关闭时向同侧滑出。"
        closeable
      />
    </div>
  );
};

export default DrawerPopup;
