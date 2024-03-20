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
      className={`fixed top-0 mx-auto h-full w-full max-w-lg bg-bg-100 ${open ? 'block' : 'hidden'}`}
    >
      <div className="relative h-full w-full overflow-hidden p-4">
        <button className="absolute right-4 top-7 z-50 text-sm" onClick={onCancel}>
          取消
        </button>
        {destroyOnClose ? open && children : children}
      </div>
    </div>
  )
}
