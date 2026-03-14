import React from 'react'

interface PagePopupProps {
  onClose?: () => void
}

export const PagePopup: React.FC<PagePopupProps> = ({ onClose }) => {
  return (
    <div style={{ padding: '40px' }}>
      <h2>Page Wrapper</h2>
      <p>This is a full-page popup that slides in from the right</p>
      <p>It has a white background and covers the entire viewport</p>
      <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
        Slides in from right on open, slides out to right on close
      </p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Close Page
        </button>
      )}
    </div>
  )
}

export default PagePopup
