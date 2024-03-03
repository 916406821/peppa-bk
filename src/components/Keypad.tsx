import { Calendar, DeleteKey } from '@icon-park/react'
import { message } from 'antd'
import { useState } from 'react'

interface Props {
  onSubmit: (value: number) => void
}

export default function Keypad({ onSubmit }: Props) {
  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('0')
  const [bg, setBg] = useState('')
  const [note, setNote] = useState('')

  const handleClick = (input: string) => {
    setInput(input)
    setBg('bg-gray-300')
    setTimeout(() => setBg(''), 100)

    if (amount.includes('.') && input === '.') return

    if (amount === '0' && input !== '.') {
      setAmount(input)
    } else {
      setAmount((amount) => (amount += input))
    }
  }

  const handleDelete = () => {
    setAmount((amount) => amount.slice(0, -1) || '0')
  }

  const handleSubmit = () => {
    const value = Number(amount)
    if (value === 0) {
      return message.error('请输入金额')
    }
    onSubmit(value)
  }

  const renderKey = (value: string) => (
    <div
      className={`w-full h-full px-4 py-2 flex items-center justify-center ${
        input === value ? bg : ''
      }`}
      onClick={() => handleClick(value)}
    >
      {value}
    </div>
  )

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="bg-white p-2">
        <div className=" flex flex-row-reverse text-xl pb-2 px-2">{amount}</div>
        <div className="bg-gray-100 flex mx-2 p-2 rounded">
          备注：
          <input
            value={note}
            maxLength={10}
            onChange={(event) => setNote(event.target.value)}
            className="border-none outline-none grow bg-transparent"
            placeholder="点击填写备注（最多10个汉字）"
          />
        </div>
      </div>
      <div className=" divide-y divide-slate-300 divide-x grid place-items-center text-lg grid-cols-4 bg-bg-100 grid-rows-4">
        {renderKey('7')}
        {renderKey('8')}
        {renderKey('9')}
        <div className="w-full h-full p-4 flex items-center justify-around text-sm">
          <Calendar theme="outline" size="20" fill="#333" />
          今天
        </div>
        {renderKey('4')}
        {renderKey('5')}
        {renderKey('6')}
        <div
          className="w-full h-full p-4 flex items-center justify-center row-span-3 text-lg bg-primary-200"
          onClick={handleSubmit}
        >
          完成
        </div>
        {renderKey('1')}
        {renderKey('2')}
        {renderKey('3')}
        {renderKey('.')}
        {renderKey('0')}
        <div
          className="w-full h-full p-4 flex items-center justify-center bg-gray-300"
          onClick={handleDelete}
        >
          <DeleteKey theme="outline" size="24" fill="#333" />
        </div>
      </div>
    </div>
  )
}
