import { Category, CreateTransationParams, UserInfo } from '@/types'
import { Spin, Tabs, TabsProps, message } from 'antd'
import { useEffect, useState } from 'react'
import IconPark from './IconPark'
import Keypad from './Keypad'

interface Props {
  tags: Category[]
  onSubmit: () => void
}

export default function AddTransation({ tags, onSubmit }: Props) {
  const [activeKey, setActiveKey] = useState('outcome')
  const [activeTag, setActiveTag] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    if (window && window.localStorage) {
      const userInfo = window.localStorage.getItem('userInfo')
      if (userInfo) {
        setUserInfo(JSON.parse(userInfo))
      }
    }
  }, [])

  useEffect(() => {
    const active = tags.find((tag) => tag.type === 'outcome')
    setActiveTag(active!)
  }, [tags])

  const onChange = (key: string) => {
    setActiveKey(key)
    const active = tags.find((tag) => tag.type === key)
    setActiveTag(active ?? null)
  }

  const handleSubmit = async (result: Omit<CreateTransationParams, 'category' | 'userId'>) => {
    setLoading(true)
    const transation: Omit<CreateTransationParams, 'userId'> = {
      ...result,
      amount: activeTag?.type === 'income' ? result.amount : -result.amount,
      category: activeTag!,
    }

    await fetch('/api/transation/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.id}`,
      },
      body: JSON.stringify(transation),
    })

    setLoading(false)
    message.success('记账成功')
    onSubmit()
  }

  const items: TabsProps['items'] = [
    {
      key: 'outcome',
      label: <span className="text-base text-primary-100">支出</span>,
    },
    {
      key: 'income',
      label: <span className="text-base text-primary-100">收入</span>,
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      const antdTabs = document.getElementById('antd-tabs')
      const antdTabsHeight = antdTabs?.offsetHeight || 0
      const keypad = document.getElementById('keypad')
      const keypadHeight = keypad?.offsetHeight || 0
      setMaxHeight(window.innerHeight - antdTabsHeight - keypadHeight)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-full w-full flex-col">
      <Tabs
        id="antd-tabs"
        defaultActiveKey={activeKey}
        centered
        size="small"
        items={items}
        onChange={onChange}
      />
      <div
        style={{
          height: `${maxHeight}px`,
        }}
        className="overflow-y-auto rounded-xl bg-bg-200 p-4"
      >
        <div className="grid grid-cols-4 gap-4 text-sm">
          {tags
            .filter((tag) => tag.type === activeKey)
            .map((tag, index) => {
              const active = activeTag?.name === tag.name
              return (
                <div
                  className="flex flex-col items-center gap-2"
                  key={index}
                  onClick={() => setActiveTag(tag)}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full
                    ${active ? 'bg-primary-100' : 'bg-bg-100'}`}
                  >
                    <IconPark href={tag.icon} className="text-text-100" />
                  </div>
                  {tag.name}
                </div>
              )
            })}
        </div>
      </div>
      <Keypad onSubmit={(result) => handleSubmit(result)} />
      <Spin spinning={loading} fullscreen wrapperClassName="text-primary-100" />
    </div>
  )
}
