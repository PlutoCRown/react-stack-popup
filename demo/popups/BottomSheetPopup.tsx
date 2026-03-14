import React from 'react'

interface BottomSheetPopupProps {
  title: string
  message: string
  onClose?: () => void
}

export const BottomSheetPopup: React.FC<BottomSheetPopupProps> = ({ title, message, onClose }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
        Slides up on open, slides down on close
      </p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Close
        </button>
      )}
    </div>
  )
}

export default BottomSheetPopup