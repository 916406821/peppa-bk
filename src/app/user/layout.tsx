import { SEO } from '@/lib/SEO'
import type { Metadata } from 'next'

export const metadata: Metadata = SEO('用户')

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
