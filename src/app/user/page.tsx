'use client'

import IconPark from '@/components/IconPark'
import { MAX_AMOUNT } from '@/components/Keypad'
import { Transaction, UserInfo } from '@/types'
import { InputNumber, Modal, Statistic, message } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Button from "@/components/Button";

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
  const [modalOpen, setModalOpen] = useState(false)
  const [budget, setBudget] = useState<number>(0)

  useEffect(() => {
    if (window && window.localStorage) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
      if (userInfo) {
        setUserInfo(userInfo)
        setBudget(userInfo.month_budget)
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
      const data = (await response.json()) as Transaction[]

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

  const saveBudget = async () => {
    const response = await fetch('/api/budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.id}`,
      },
      body: JSON.stringify({
        month_budget: budget,
      }),
    })
    const data = await response.json()

    if (data.success) {
      localStorage.setItem('userInfo', JSON.stringify(data.data))
      setUserInfo(data.data)
      message.success(data.message)
      setModalOpen(false)
    }
  }

  return (
    <main className="mx-auto flex h-svh max-w-lg flex-col items-center gap-6 bg-white">
      <header className="relative flex w-full flex-col items-center gap-2 bg-primary-100 p-4 pb-16">
        <div className="flex w-full justify-between">
          <Button>
            <Link href="/">
              <IconPark href="#home" className="!h-6 !w-6" />
            </Link>
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <IconPark href="#config" className="!h-6 !w-6" />
          </Button>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-5xl">
          <Image src="/peppa.svg" width={50} height={50} alt="avatar" />
        </div>
        <div className="text-lg font-medium">{userInfo?.nickname}</div>
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
        closable={false}
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
      <Modal
        centered
        title="默认月预算"
        okText="确认"
        cancelText="取消"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={saveBudget}
        closeIcon
      >
        <InputNumber
          style={{ width: '100%' }}
          value={budget}
          min={0}
          max={MAX_AMOUNT}
          onChange={(value) => setBudget(value ?? 0)}
        />
      </Modal>
    </main>
  )
}
