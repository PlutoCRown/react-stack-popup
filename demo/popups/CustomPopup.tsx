import React from "react";
import { CommonPopup } from "../components/CommonPopup";

export const CustomPopup: React.FC = () => {
  return (
    <CommonPopup
      title="Custom Wrapper"
      subtitle="Dynamic wrapper color with a pulsing container"
    >
      <p>This popup uses a custom wrapper with dynamic color.</p>
    </CommonPopup>
  );
};

export default CustomPopup;
