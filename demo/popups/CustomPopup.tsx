import React from 'react'

export const CustomPopup: React.FC = () => {
  return (
    <div
      style={{
        padding: "30px",
        borderRadius: "16px",
        color: "white",
        background: "rgba(0,0,0,0.15)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        backdropFilter: "blur(6px)",
      }}
    >
      <h2>Custom Wrapper</h2>
      <p>This popup uses a custom wrapper with dynamic color</p>
    </div>
  )
}

export default CustomPopup
