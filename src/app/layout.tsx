import AntdStyleProvider from '@/components/AntdStyleProvider'
import { SEO } from '@/lib/SEO'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = SEO()

export const viewport: Viewport = {
  themeColor: '#26A69A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh_CN">
      <body className="bg-primary-100 font-sans">
        <AntdStyleProvider>{children}</AntdStyleProvider>
      </body>
      <Script src="https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_31600_26.1fc6afe8eb22664bcc4236aa99ab8d35.js" />
    </html>
  )
}
