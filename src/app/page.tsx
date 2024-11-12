'use client'

import AddTransaction from '@/components/AddTransaction'
import Header from '@/components/Header'
import IconPark from '@/components/IconPark'
import List from '@/components/List'
import Modal from '@/components/Modal'
import Total from '@/components/Total'
import { getGroupList } from '@/lib/utils'
import { Budget, Category, GroupTransaction, Transaction, UserInfo } from '@/types'
import { message } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
dayjs.locale('zh-cn')

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'))
  const [groupList, setGroupList] = useState<GroupTransaction[]>([])
  const [monthTotal, setMonthTotal] = useState({
    monthIncomeTotal: '0',
    monthOutcomeTotal: '0',
  })
  const [tags, setTags] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editValue, setEditValue] = useState<Transaction>()
  const [budget, setBudget] = useState<Budget>()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')!) as UserInfo

      if (!userInfo) {
        message.warning('未登录')
        redirect('/login')
      } else {
        setUserInfo(userInfo)
        setBudget({
          month_budget: userInfo.month_budget,
          year_budget: userInfo.year_budget,
        })
      }
    }
  }, [])

  useEffect(() => {
    async function fetchTags() {
      const response = await fetch('/api/category')
      const data = (await response.json()) as Category[]
      setTags(data)
    }
    fetchTags()
  }, [])

  const fetchData = async () => {
    if (!userInfo) return
    setLoading(true)
    const response = await fetch(`/api/transation?month=${month}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.id}`,
      },
    })
    const data = (await response.json()) as Transaction[]
    const { groupList, ...monthTotal } = getGroupList(data)
    setGroupList(groupList)
    setMonthTotal(monthTotal)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [userInfo, month])

  const handleMonthChange = (month: string) => {
    setMonth(month)
  }

  const handleMenu = () => {
    message.warning('功能开发中...')
  }

  const handleClickItem = (value: Transaction) => {
    setEditValue(value)
    setOpen(true)
  }

  const handleAdd = () => {
    setEditValue(undefined)
    setOpen(true)
  }

  return (
    <main className="mx-auto flex h-svh max-w-lg flex-col items-center">
      <Header />
      <Total
        budget={budget}
        month={month}
        monthTotal={monthTotal}
        onMonthChange={handleMonthChange}
      />
      <List
        loading={loading}
        list={groupList}
        tags={tags}
        onClick={(value) => handleClickItem(value)}
      />
      <button
        className="fixed bottom-6 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-200 shadow-md"
        onClick={handleMenu}
      >
        <IconPark href="#all-application" className="text-white" />
      </button>
      <button
        className="fixed bottom-6 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-200 shadow-md"
        onClick={handleAdd}
      >
        <IconPark href="#plus" className="text-white" />
      </button>
      <Modal open={open} destroyOnClose onCancel={() => setOpen(false)}>
        <AddTransaction
          tags={tags}
          editValue={editValue}
          onSubmit={() => {
            setOpen(false)
            fetchData()
          }}
          onDelete={() => {
            setOpen(false)
            fetchData()
          }}
        />
      </Modal>
    </main>
  )
}
