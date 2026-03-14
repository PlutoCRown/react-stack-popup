import React from "react";
import { DemoCard } from "../components/DemoCard";

interface BottomSheetPopupProps {
  title: string;
  message: string;
}

export const PropsPopup: React.FC<BottomSheetPopupProps> = ({
  title,
  message,
}) => {
  return <DemoCard title={title} subtitle={message} />;
};

export default PropsPopup;
