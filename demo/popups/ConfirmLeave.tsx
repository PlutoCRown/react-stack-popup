import { FC } from "react";
import { DemoCard } from "../components/DemoCard";
type Props = {
  onConfirm: () => void;
};
const ConfirmLeave: FC<Props> = ({ onConfirm }) => {
  return (
    <DemoCard title="确定要离开吗">
      <button onClick={onConfirm}>确定</button>
    </DemoCard>
  );
};

export default ConfirmLeave;
