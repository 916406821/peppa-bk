'use client'

import AddTransation from '@/components/AddTransation'
import Header from '@/components/Header'
import List from '@/components/List'
import Modal from '@/components/Modal'
import Total from '@/components/Total'
import {
  BowlOne,
  BusOne,
  Worker,
  Buy,
  City,
  IncomeOne,
  AllApplication,
  Plus,
} from '@icon-park/react'
import { useEffect, useState } from 'react'

export const tagIcons: any = (fill: string = '#efefef') => ({
  工资: <Worker theme="outline" size="24" fill={fill} />,
  理财: <IncomeOne theme="outline" size="24" fill={fill} />,
  交通: <BusOne theme="outline" size="24" fill={fill} />,
  餐饮: <BowlOne theme="outline" size="24" fill={fill} />,
  购物: <Buy theme="outline" size="24" fill={fill} />,
  房租: <City theme="outline" size="24" fill={fill} />,
})

export type Transaction = {
  id: string
  amount: number
  category: {
    id: string
    name: string
    color: string
  }
  date: string
  note: string
  userId: string
}

export type GroupTransaction = {
  date: string
  list: Transaction[]
  incomeTotal: number
  outcomeTotal: number
}

export default function Home() {
  const [list, setList] = useState<GroupTransaction[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const response = await fetch('/api/transation')
      const data = (await response.json()) as GroupTransaction[]
      setList(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleAdd = () => {
    setOpen(true)
  }

  return (
    <main className="w-screen min-h-screen flex mx-auto flex-col max-w-[720px] items-center">
      <Header />
      <Total />
      <List loading={loading} list={list} />
      <button className="fixed bottom-6 w-10 h-10 flex items-center justify-center left-4 bg-primary-100 rounded-full">
        <AllApplication theme="outline" size="24" fill="#efefef" />
      </button>
      <button
        className="fixed bottom-6 w-10 h-10 flex items-center justify-center right-4 bg-primary-100 rounded-full"
        onClick={handleAdd}
      >
        <Plus theme="outline" size="24" fill="#efefef" />
      </button>
      <Modal open={open} destroyOnClose onCancel={() => setOpen(false)}>
        <AddTransation onSubmit={() => setOpen(false)} />
      </Modal>
    </main>
  )
}
