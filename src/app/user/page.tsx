'use client'

import IconPark from '@/components/IconPark'
import { UserInfo } from '@/types'
import { Modal } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function User() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>()

  useEffect(() => {
    if (window && window.localStorage) {
      const userInfo = window.localStorage.getItem('userInfo')
      if (userInfo) {
        setUserInfo(userInfo ? JSON.parse(userInfo) : null)
      } else {
        router.replace('/login')
      }
    }
  }, [router])

  const logout = () => {
    setVisible(true)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[720px] flex-col items-center justify-center gap-6 p-6">
      <Link href="/">
        <button className="fixed left-4 top-4">
          <IconPark href="#home" className="!h-6 !w-6" />
        </button>
      </Link>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-5xl font-bold">
        {userInfo?.username.split('')[0]}
      </div>
      <div className="text-lg font-bold">{userInfo?.username}</div>
      <button
        className="flex w-3/4 justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400"
        onClick={logout}
      >
        退出登录
      </button>
      <Modal
        title="确认退出登录吗？"
        okText="确认"
        cancelText="取消"
        centered
        mask
        width={400}
        maskClosable
        open={visible}
        onOk={() => {
          window.localStorage.removeItem('userInfo')
          router.replace('/login')
        }}
        onCancel={() => setVisible(false)}
      ></Modal>
    </div>
  )
}
