import React from 'react'

interface BottomSheetPopupProps {
  title: string
  message: string
}

export const BottomSheetPopup: React.FC<BottomSheetPopupProps> = ({ title, message }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}

export default BottomSheetPopup