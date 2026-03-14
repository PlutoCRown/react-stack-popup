import React from 'react'

interface MaskPopupProps {
  onClose?: () => void
}

export const MaskPopup: React.FC<MaskPopupProps> = ({ onClose }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', minWidth: '300px' }}>
      <h2>Mask Wrapper</h2>
      <p>This popup has a transparent background with fade animation</p>
      <p>Click outside or press ESC to close with animation</p>
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

export default MaskPopup