import { DemoCard } from "../components/DemoCard";

export const FormPopup = () => {
  return (
    <DemoCard title="表单弹窗" subtitle="收集快速反馈">
      <label style={{ display: "grid", gap: 6, marginTop: 8 }}>
        <span style={{ fontSize: 12, color: "#666" }}>邮箱</span>
        <input
          type="email"
          placeholder="邮箱地址"
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />
      </label>
      <div
        style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        <button type="button">提交</button>
        <button type="button">取消</button>
      </div>
    </DemoCard>
  );
};

export default FormPopup;
