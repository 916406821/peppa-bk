import '@icon-park/react/styles/index.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: '佩奇记账',
  description: '佩奇记账是一款简洁易用的记账应用，旨在帮助用户轻松管理个人和家庭财务。',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh_CN">
      <body className="bg-bg-100 font-sans">{children}</body>
      <Script src="https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_31600_12.7d4442de5a1524554cc8af58812785d6.js" />
    </html>
  )
}
