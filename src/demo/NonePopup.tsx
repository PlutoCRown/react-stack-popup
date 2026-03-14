import React from "react";

export const NonePopup: React.FC = () => {
  return (
    <div
      style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px" }}
    >
      <h2>None Wrapper</h2>
      <p>This popup has no background or animation</p>
    </div>
  );
};

export default NonePopup;
