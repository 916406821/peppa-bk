'use client'

import { CreateTransationParams } from '@/types'
import { Calendar, DeleteKey } from '@icon-park/react'
import { message } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useRef, useState } from 'react'
import MaskDatePicker from './MaskDatePicker'

const MAX_AMOUNT = 999999

interface Props {
  onSubmit: (result: Omit<CreateTransationParams, 'category' | 'userId'>) => void
}

export default function Keypad({ onSubmit }: Props) {
  const datePickerRef = useRef(null)

  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('0')
  const [bg, setBg] = useState('')
  const [note, setNote] = useState('')
  const [openPicker, setOpenPicker] = useState(false)
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))

  const handleFlash = (input: string, bg: string = 'bg-gray-300') => {
    setInput(input)
    setBg(bg)
    setTimeout(() => setBg(''), 100)
  }

  const handleClick = (input: string) => {
    handleFlash(input)

    if (amount.includes('.')) {
      if (input === '.') return
      if (amount.split('.')[1]?.length >= 2) return
    }
    if (Number(amount) >= MAX_AMOUNT) return
    if (amount === '0' && input !== '.') {
      setAmount(input)
    } else {
      setAmount((amount) => (amount += input))
    }
  }

  const handleDatePicker = () => {
    handleFlash('date')
    setOpenPicker(!openPicker)
  }

  const handleDateChange = (_: Dayjs, dateString: string | string[]) => {
    console.log(dateString)
    setDate(dateString as string)
    setOpenPicker(false)
  }

  const handleDelete = () => {
    handleFlash('delete', 'bg-gray-50')
    setAmount((amount) => amount.slice(0, -1) || '0')
  }

  const handleSubmit = () => {
    handleFlash('submit', 'bg-primary-200')
    const value = Number(amount)
    if (value === 0) {
      return message.error('请输入金额')
    }
    onSubmit({ amount: value, note, date })
  }

  const renderKey = (value: string) => (
    <button
      className={`flex h-full w-full items-center justify-center px-4 py-2 ${
        input === value ? bg : ''
      }`}
      onClick={() => handleClick(value)}
    >
      {value}
    </button>
  )

  const isToday = dayjs().format('YYYY-MM-DD') === date

  return (
    <div id='keypad' className="absolute bottom-0 left-0 w-full">
      <div className="bg-white p-2">
        <div className=" flex flex-row-reverse px-2 text-xl">{amount}</div>
        <div className="flex items-center rounded bg-gray-100 px-2">
          备注：
          <input
            value={note}
            maxLength={10}
            onChange={(event) => setNote(event.target.value)}
            className="grow bg-transparent no-border"
            placeholder="点击填写备注（最多10个汉字）"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 place-items-center divide-x divide-y divide-slate-300 bg-bg-100 text-lg">
        {renderKey('7')}
        {renderKey('8')}
        {renderKey('9')}
        <div
          ref={datePickerRef}
          className={`flex h-full w-full items-center justify-center text-sm ${input === 'date' ? bg : ''}`}
        >
          <div
            className="flex h-full w-full items-center justify-center gap-2"
            onClick={handleDatePicker}
          >
            {isToday ? (
              <>
                <Calendar theme="outline" size="20" fill="#333" />
                今天
              </>
            ) : (
              date
            )}
          </div>
          <div className="invisible relative -left-16 h-0 w-0">
            <MaskDatePicker
              defaultValue={dayjs()}
              open={openPicker}
              locale={locale}
              maxDate={dayjs()}
              placement="topLeft"
              onChange={handleDateChange}
              onClickMask={() => setOpenPicker(false)}
            />
          </div>
        </div>
        {renderKey('4')}
        {renderKey('5')}
        {renderKey('6')}
        <button
          className={`row-span-3 flex h-full w-full items-center justify-center bg-primary-100 px-4 py-2 text-lg
          ${input === 'submit' ? bg : ''}`}
          onClick={handleSubmit}
        >
          完成
        </button>
        {renderKey('1')}
        {renderKey('2')}
        {renderKey('3')}
        {renderKey('.')}
        {renderKey('0')}
        <button
          className={`flex h-full w-full items-center justify-center bg-gray-300 px-4 py-2
          ${input === 'delete' ? bg : ''}`}
          onClick={handleDelete}
        >
          <DeleteKey theme="outline" size="24" fill="#333" />
        </button>
      </div>
    </div>
  )
}
