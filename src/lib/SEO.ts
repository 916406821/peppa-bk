import { Metadata } from 'next'

export function SEO(title?: string): Metadata {
  return {
    title: !!title ? `${title}-佩奇记账` : '佩奇记账',
    description: '佩奇记账是一款简洁易用的记账应用，旨在帮助用户轻松管理个人和家庭财务。',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
    },
  }
}
