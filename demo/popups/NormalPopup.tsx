import { DemoCard } from "../components/DemoCard";

export const NormalPopup = () => {
  return (
    <div style={{ margin: 10, width: "fit-content" }}>
      <DemoCard title="普通弹窗内容" subtitle="半透明背景 + 淡入淡出" closeable>
        <p>可以点击 Mask 关闭</p>
        <p>
          注册时可以：<code>maskClosable: false</code>来关闭此功能
        </p>
      </DemoCard>
    </div>
  );
};

export default NormalPopup;
