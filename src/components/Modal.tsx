import { Close } from '@icon-park/react'
import { ReactNode } from 'react'

export interface Props {
  open: boolean
  onCancel: () => void
  destroyOnClose?: boolean
  children: ReactNode
}

export default function Modal({ open, onCancel, destroyOnClose, children }: Props) {
  return (
    <div
      className={`fixed bottom-0 right-0 bg-bg-100 transition-all duration-200 ${
        open ? 'w-full h-full' : 'w-0 h-0'
      }`}
    >
      <div className="w-full p-4 h-full overflow-hidden relative">
        <Close
          className="absolute top-4 right-4 z-50"
          theme="outline"
          size="24"
          fill="#333"
          onClick={onCancel}
        />
        {destroyOnClose ? open && children : children}
      </div>
    </div>
  )
}
