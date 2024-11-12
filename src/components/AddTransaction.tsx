import { Category, CreateTransactionParams, Transaction, UserInfo } from '@/types'
import { Modal, Spin, Tabs, TabsProps, message } from 'antd'
import { useEffect, useState } from 'react'
import IconPark from './IconPark'
import Keypad from './Keypad'

interface Props {
  tags: Category[]
  editValue?: Transaction
  onSubmit: () => void
  onDelete: () => void
}

export default function AddTransaction({ tags, onSubmit, editValue, onDelete }: Props) {
  const [activeKey, setActiveKey] = useState('outcome')
  const [activeTag, setActiveTag] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [maxHeight, setMaxHeight] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window && window.localStorage) {
      const userInfo = window.localStorage.getItem('userInfo')
      if (userInfo) {
        setUserInfo(JSON.parse(userInfo))
      }
    }
  }, [])

  useEffect(() => {
    let active = tags.find((tag) => tag.type === 'outcome')
    if (!!editValue) {
      active = tags.find((tag) => tag.id === editValue?.category.id)
      setActiveKey(editValue.amount > 0 ? 'income' : 'outcome')
    }
    setActiveTag(active!)
  }, [tags, editValue])

  const onChange = (key: string) => {
    setActiveKey(key)
    const active = tags.find((tag) => tag.type === key)
    setActiveTag(active ?? null)
  }

  const handleSubmit = async (result: Omit<CreateTransactionParams, 'category' | 'userId'>) => {
    setLoading(true)

    const transation: Omit<CreateTransactionParams, 'userId'> = {
      ...result,
      amount: activeTag?.type === 'income' ? result.amount : -result.amount,
      category: activeTag!,
    }

    const requestOptions: RequestInit = {
      method: editValue ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.id}`,
      },
      body: JSON.stringify(editValue ? { params: transation, pageId: editValue.id } : transation),
    }

    const response = await fetch('/api/transation', requestOptions)

    if (response.ok) {
      message.success(editValue ? '修改成功' : '记账成功')
      onSubmit()
    } else {
      message.error('操作失败，请重试')
    }

    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    const respose = await fetch('/api/transation', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.id}`,
      },
      body: JSON.stringify({ pageId: editValue?.id }),
    })

    if (respose.ok) {
      const data = await respose.json()
      if (data.success) {
        message.success(data.message)
        onDelete()
      } else {
        message.error(data.message)
      }
    }

    setLoading(false)
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
      {!!editValue && (
        <button
          className="absolute left-4 top-6 z-50 rounded border border-red-500 p-1 text-sm text-red-500"
          onClick={() => setVisible(true)}
        >
          删除
        </button>
      )}
      <Tabs
        id="antd-tabs"
        activeKey={activeKey}
        centered
        size="small"
        items={items}
        onChange={onChange}
      />
      <div
        style={{
          height: `${maxHeight}px`,
        }}
        className="no-scrollbar overflow-y-auto rounded-xl bg-bg-200 p-4"
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
      <Keypad editValue={editValue} onSubmit={(result) => handleSubmit(result)} />
      <Spin spinning={loading} fullscreen wrapperClassName="text-primary-100" />
      <Modal
        title="确认删除该条记录吗？"
        okText="确认"
        cancelText="取消"
        styles={{
          body: {
            color: 'red',
          },
        }}
        centered
        mask
        closable={false}
        width={400}
        maskClosable
        open={visible}
        onOk={handleDelete}
        onCancel={() => setVisible(false)}
      >
        删除后不可恢复
      </Modal>
    </div>
  )
}
