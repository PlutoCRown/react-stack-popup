import { ReactNode } from 'react'
import { Freeze as ReactFreeze } from 'react-freeze'

interface FreezeProps {
  children: ReactNode
  freeze?: boolean
}

export const Freeze = ({ children, freeze = true }: FreezeProps) => {
  return <ReactFreeze freeze={freeze}>{children}</ReactFreeze>
}
