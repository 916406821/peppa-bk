import Link from 'next/link'
import { UrlObject } from 'url'
import IconPark from './IconPark'

interface Props {
  href?: string | UrlObject
}

export default function BackButton({ href = '/' }: Props) {
  return (
    <Link href={href}>
      <button className='flex items-center text-sm'>
        <IconPark href="#left" className='!w-6 !h-6' />
        <span>返回</span>
      </button>
    </Link>
  )
}
