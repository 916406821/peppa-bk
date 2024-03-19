import Link from 'next/link'
import IconPark from './IconPark'

export default function Header() {
  return (
    <div className="relative mx-auto w-full py-2 text-lg font-semibold">
      <div className="mx-auto w-fit tracking-widest">佩奇记账</div>
      <Link href="/user">
        <button className="absolute right-4 top-3">
          <IconPark href="#user" />
        </button>
      </Link>
    </div>
  )
}
