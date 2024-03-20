import { Metadata, Viewport } from 'next'

export function generateMetadata({ title }: { title?: string }): Metadata {
  return {
    title: !!title ? `${title}-佩奇记账` : '佩奇记账',
    description: '佩奇记账是一款简洁易用的记账应用，旨在帮助用户轻松管理个人和家庭财务。',
    appleWebApp: {
      title: '佩奇记账',
      capable: true,
      statusBarStyle: 'black-translucent',
    },
    applicationName: '佩奇记账',
    manifest: '/manifest.webmanifest',
  }
}

export function generateViewport(): Viewport {
  return {
    themeColor: '#26A69A',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
}
