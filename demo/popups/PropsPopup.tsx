import React from "react";
import { DemoCard } from "../components/DemoCard";

interface SheetPopupProps {
  title: string;
  message: string;
}

export const PropsPopup: React.FC<SheetPopupProps> = ({ title, message }) => {
  return <DemoCard title={title} subtitle={message} />;
};

export default PropsPopup;
