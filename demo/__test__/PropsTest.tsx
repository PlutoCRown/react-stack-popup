import React from "react";

interface SheetPopupProps {
  title: string;
  message: string;
}

export const SheetPopup: React.FC<SheetPopupProps> = ({ title, message }) => {
  return (
    <div>
      <h1>{title}</h1>
      <title>{message}</title>
      <p>这个弹窗是需要传入 Props 的</p>
    </div>
  );
};

export default SheetPopup;
