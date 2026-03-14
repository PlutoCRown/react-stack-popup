import { DemoCard } from "../components/DemoCard";

export const ConfirmPopup = () => {
  return (
    <DemoCard title="确认弹窗" subtitle="关键决策点">
      <p>用于确认或取消关键操作。</p>
      <div
        style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}
      >
        <button type="button">确认</button>
        <button type="button">取消</button>
      </div>
    </DemoCard>
  );
};

export default ConfirmPopup;
