import { useRef } from "react";
import { DemoCard } from "../components/DemoCard";
import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";

export const RandomHeightPopup = () => {
  const randomSize = useRef(Math.random());

  return (
    <DemoCard title="随机高度弹窗" subtitle="该弹窗高度随机">
      <div style={{ width: "100%", height: `${randomSize.current * 50}vh` }} />
      <button onClick={() => stackRouter.open(PopupID.BottomSheet, {})}>
        打开下一层
      </button>
    </DemoCard>
  );
};

export default RandomHeightPopup;
