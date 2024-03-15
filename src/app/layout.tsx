import AntdStyleProvider from '@/components/AntdStyleProvider'
import { SEO } from '@/lib/SEO'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = SEO()

export const viewport: Viewport = {
  themeColor: '#E0F2F1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh_CN">
      <body className="bg-bg-100 font-sans">
        <AntdStyleProvider>{children}</AntdStyleProvider>
      </body>
      <Script src="https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_31600_23.d2c449976f76408e7e6cce55e96ba42c.js" />
    </html>
  )
}
