import React from "react";

interface BottomSheetPopupProps {
  title: string;
  message: string;
}

export const BottomSheetPopup: React.FC<BottomSheetPopupProps> = ({
  title,
  message,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <title>{message}</title>
      <p>这个弹窗是需要传入 Props 的</p>
    </div>
  );
};

export default BottomSheetPopup;
