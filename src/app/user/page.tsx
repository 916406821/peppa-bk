'use client'

import IconPark from '@/components/IconPark'
import { Transation, UserInfo } from '@/types'
import { Modal, Statistic } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const valueStyle = {
  fontSize: 18,
  fontWeight: 500,
}

export default function User() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [totals, setTotals] = useState({
    days: 0,
    times: 0,
  })

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

  useEffect(() => {
    if (!userInfo) return
    const fetchData = async () => {
      const response = await fetch(`/api/transation`, {
        headers: {
          Authorization: `Bearer ${userInfo?.id}`,
        },
      })
      const data = (await response.json()) as Transation[]

      const days: string[] = []
      data.forEach((item) => {
        const date = item.date
        if (!days.includes(date)) {
          days.push(date)
        }
      })

      setTotals({
        days: new Set(days).size,
        times: data.length,
      })
    }
    fetchData()
  }, [userInfo])

  const logout = () => {
    setVisible(true)
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-[720px] flex-col items-center gap-6 bg-white">
      <header className="relative flex w-full flex-col items-center gap-2 bg-primary-100 p-4 pb-16">
        <button className="self-start">
          <Link href="/">
            <IconPark href="#home" className="!h-6 !w-6" />
          </Link>
        </button>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-5xl">
          <Image src="/peppa.svg" width={50} height={50} alt="avatar" />
        </div>
        <div className="text-lg font-medium">{userInfo?.username}</div>
        <div className="absolute -bottom-10 w-full px-4">
          <div className="grid grid-cols-2 rounded-lg bg-white py-4 text-center shadow-md">
            <Statistic title="记账总天数" valueStyle={valueStyle} value={totals.days} />
            <Statistic title="记账总笔数" valueStyle={valueStyle} value={totals.times} />
          </div>
        </div>
      </header>

      <div className="flex w-full grow items-center justify-center">
        <button
          className="flex w-3/4 justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-300"
          onClick={logout}
        >
          退出登录
        </button>
      </div>
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
    </main>
  )
}
