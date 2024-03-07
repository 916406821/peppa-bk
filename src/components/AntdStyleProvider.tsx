'use client'

import { StyleProvider } from '@ant-design/cssinjs'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

export default function AntdStyleProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#26A69A',
        },
        components: {
          Button: {
            colorPrimary: '#26A69A',
          },
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <AntdRegistry>{children}</AntdRegistry>
      </StyleProvider>
    </ConfigProvider>
  )
}
