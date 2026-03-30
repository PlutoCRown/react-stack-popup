import { useRef } from "react";
import { DemoCard } from "../components/DemoCard";
import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export const RandomHeightPopup = () => {
  const randomSize = useRef(Math.random());

  return (
    <div style={{ margin: 10 }}>
      <DemoCard title="随机高度弹窗" subtitle="该弹窗高度随机" closeable>
        <div
          style={{ width: "100%", height: `${randomSize.current * 50}vh` }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => stackRouter.open(PopupID.Sheet, {})}>
            打开下一层
          </button>
          <button onClick={() => stackRouter.open(PopupID.HighSheet, {})}>
            全高的
          </button>
        </div>
      </DemoCard>
    </div>
  );
};

export default RandomHeightPopup;
