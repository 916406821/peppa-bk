'use client'

import AddTransation from '@/components/AddTransation'
import Header from '@/components/Header'
import IconPark from '@/components/IconPark'
import List from '@/components/List'
import Modal from '@/components/Modal'
import Total from '@/components/Total'
import { Category, GroupTransation, Transation, UserInfo } from '@/types'
import { message } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { redirect } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
dayjs.locale('zh-cn')

function getGroupList(list: Transation[]) {
  const groupMap = new Map<string, GroupTransation>()
  let monthIncomeTotal = 0
  let monthOutcomeTotal = 0

  list.forEach((item) => {
    const { date, amount } = item
    const key = date

    if (groupMap.has(key)) {
      const group = groupMap.get(key)!
      group.list.push(item)
      if (amount > 0) {
        group.incomeTotal += amount
      } else {
        group.outcomeTotal -= amount
      }
      group.incomeTotal = Number(group.incomeTotal.toFixed(2))
      group.outcomeTotal = Number(group.outcomeTotal.toFixed(2))
    } else {
      groupMap.set(key, {
        date: key,
        list: [item],
        incomeTotal: Math.abs(Math.max(amount, 0)),
        outcomeTotal: Math.abs(Math.min(amount, 0)),
      })
    }

    if (amount > 0) {
      monthIncomeTotal += amount
    } else {
      monthOutcomeTotal -= amount
    }
  })

  return {
    groupList: Array.from(groupMap.values()),
    monthIncomeTotal,
    monthOutcomeTotal,
  }
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'))
  const [groupList, setGroupList] = useState<GroupTransation[]>([])
  const [monthTotal, setMonthTotal] = useState({
    monthIncomeTotal: 0,
    monthOutcomeTotal: 0,
  })
  const [tags, setTags] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')!)

      if (!userInfo) {
        message.warning('未登录')
        redirect('/login')
      } else {
        setUserInfo(userInfo)
      }
    }
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await fetch(`/api/transation?month=${month}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.id}`,
      },
    })
    const data = (await response.json()) as Transation[]
    const { groupList, ...monthTotal } = getGroupList(data)
    setGroupList(groupList)
    setMonthTotal(monthTotal)
    setLoading(false)
  }, [month, userInfo])

  useEffect(() => {
    async function fetchTags() {
      const response = await fetch('/api/category')
      const data = (await response.json()) as Category[]
      setTags(data)
    }
    fetchTags()
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleMonthChange = (month: string) => {
    setMonth(month)
  }

  const handleMenu = () => {
    message.warning('开发中...')
  }

  const handleAdd = () => {
    setOpen(true)
  }

  return (
    <main className="mx-auto flex h-screen w-screen max-w-[720px] flex-col items-center">
      <Header />
      <Total month={month} monthTotal={monthTotal} onMonthChange={handleMonthChange} />
      <List loading={loading} list={groupList} tags={tags} />
      <button
        className="fixed bottom-6 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100"
        onClick={handleMenu}
      >
        <IconPark href="#all-application" className="text-white" />
      </button>
      <button
        className="fixed bottom-6 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100"
        onClick={handleAdd}
      >
        <IconPark href="#plus" className="text-white" />
      </button>
      <Modal open={open} destroyOnClose onCancel={() => setOpen(false)}>
        <AddTransation
          tags={tags}
          onSubmit={() => {
            setOpen(false)
            fetchData()
          }}
        />
      </Modal>
    </main>
  )
}
