import { SEO } from '@/lib/SEO'
import type { Metadata } from 'next'

export const metadata: Metadata = SEO('登录')

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className='bg-bg-100'>{children}</div>
}
