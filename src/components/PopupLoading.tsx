import { CSSProperties } from 'react'

interface PopupLoadingProps {
  transparent?: boolean
}

export const PopupLoading = ({ transparent = false }: PopupLoadingProps) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    minHeight: '100px',
    backgroundColor: transparent ? 'transparent' : 'white',
  }

  const spinnerStyle: CSSProperties = {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={spinnerStyle} />
    </div>
  )
}
