import { ReactNode } from 'react'

// 1. NoneWrapper - No background or animation
export const NoneWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

// 2. MaskWrapper - Transparent background with opacity animation
export interface MaskWrapperProps {
  children: ReactNode
  opacity?: number
  maskClosable?: boolean
  onClose?: () => void
}

export const MaskWrapper = ({ children, opacity = 0.5, maskClosable = true, onClose }: MaskWrapperProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (maskClosable && e.key === 'Escape' && onClose) {
      onClose()
    }
  }

  return (
    <button
      type="button"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
        border: 'none',
        padding: 0,
        cursor: maskClosable ? 'pointer' : 'default'
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      {children}
    </button>
  )
}

// 3. BottomSheetWrapper - MaskWrapper with bottom sheet animation
export interface BottomSheetWrapperProps {
  children: ReactNode
  maxHeight?: string
  onClose?: () => void
}

export const BottomSheetWrapper = ({ children, maxHeight = '80vh', onClose }: BottomSheetWrapperProps) => {
  return (
    <MaskWrapper onClose={onClose}>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight,
          backgroundColor: 'white',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          padding: '20px',
          animation: 'slideUp 0.3s ease'
        }}
      >
        <style>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>
        {children}
      </div>
    </MaskWrapper>
  )
}