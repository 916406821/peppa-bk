import { Tabs, TabsProps } from 'antd'
import { useEffect, useState } from 'react'
import { Category } from './List'
import { tagIcons } from '@/app/page'
import Keypad from './Keypad'

interface Props {
  onSubmit: () => void
}

export default function AddTransation({ onSubmit }: Props) {
  const [activeKey, setActiveKey] = useState('outcome')
  const [tags, setTags] = useState<Category[]>([])
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTags() {
      const response = await fetch('/api/category')
      const data = (await response.json()) as Category[]
      setTags(data)
      const active = data.find((tag) => tag.categoryType.name === 'outcome')
      setActiveTag(active?.categoryName ?? null)
    }
    fetchTags()
  }, [])

  const onChange = (key: string) => {
    setActiveKey(key)
    const active = tags.find((tag) => tag.categoryType.name === key)
    setActiveTag(active?.categoryName ?? null)
  }

  const handleSubmit = (amount: number) => {
    onSubmit()
  }

  const items: TabsProps['items'] = [
    {
      key: 'outcome',
      label: <span className="text-primary-100 text-base">支出</span>,
    },
    {
      key: 'income',
      label: <span className="text-primary-100 text-base">收入</span>,
    },
  ]

  return (
    <div className="w-full h-full flex flex-col">
      <Tabs defaultActiveKey={activeKey} centered size="small" items={items} onChange={onChange} />
      <div className="grow bg-bg-200 rounded-xl p-4">
        <div className="grid grid-cols-4 gap-4">
          {tags
            .filter((tag) => tag.categoryType.name === activeKey)
            .map((tag, index) => (
              <div
                className="flex flex-col items-center"
                key={index}
                onClick={() => setActiveTag(tag.categoryName)}
              >
                <div
                  className={`rounded-full flex items-center justify-center w-10 h-10
                  ${activeTag === tag.categoryName ? 'bg-primary-100' : 'bg-bg-100'}`}
                >
                  {activeTag === tag.categoryName
                    ? tagIcons()[tag.categoryName]
                    : tagIcons('#333')[tag.categoryName]}
                </div>
                {tag.categoryName}
              </div>
            ))}
        </div>
      </div>
      <Keypad onSubmit={(amount) => handleSubmit(amount)} />
    </div>
  )
}
