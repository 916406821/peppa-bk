import { generateMetadata, generateViewport } from '@/lib/SEO'
import type { Metadata } from 'next'

export const metadata: Metadata = generateMetadata({ title: '登录' })

export const viewport = generateViewport()

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-bg-100">{children}</div>
}
