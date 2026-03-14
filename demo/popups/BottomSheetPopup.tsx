import React from 'react'

interface BottomSheetPopupProps {
  title: string
  message: string
  onClose?: () => void
}

export const BottomSheetPopup: React.FC<BottomSheetPopupProps> = ({ title, message, onClose }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -12px 30px rgba(0,0,0,0.15)",
        padding: "24px",
      }}
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
        Slides up on open, slides down on close
      </p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{ marginTop: '10px', padding: '8px 16px' }}
        >
          Close
        </button>
      )}
    </div>
  )
}

export default BottomSheetPopup
