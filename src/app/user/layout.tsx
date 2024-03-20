import { generateMetadata, generateViewport } from '@/lib/SEO'

export const metadata = generateMetadata({ title: '用户' })

export const viewport = generateViewport()

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
