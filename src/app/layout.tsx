import type { Metadata } from 'next'
import './globals.css'
import '@icon-park/react/styles/index.css'
import Head from 'next/head'

export const metadata: Metadata = {
  title: '佩奇记账',
  description:
    '佩奇记账是一款简洁易用的记账应用，旨在帮助用户轻松管理个人和家庭财务。佩奇记账提供快速记录支出和收入、灵活分类管理等功能，让财务管理变得有趣而高效。',
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-bg-100">{children}</body>
    </html>
  )
}
