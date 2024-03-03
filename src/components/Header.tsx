import { User } from '@icon-park/react'

export default function Header() {
  return (
    <div className="py-2 relative text-lg mx-auto font-bold w-full">
      <div className="mx-auto w-fit">佩奇记账</div>
      <button className="absolute right-4 top-2">
        <User theme="outline" size="24" fill="#333" />
      </button>
    </div>
  )
}
