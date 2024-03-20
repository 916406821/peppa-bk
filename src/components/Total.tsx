import { formatAmount } from '@/lib/utils'
import { Budget } from '@/types'
import { Progress } from 'antd'
import BigNumber from 'bignumber.js'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import IconPark from './IconPark'
import MaskDatePicker from './MaskDatePicker'

interface Props {
  month: string
  budget?: Budget
  monthTotal: {
    monthIncomeTotal: string
    monthOutcomeTotal: string
  }
  onMonthChange: (month: string) => void
}

export default function Total({ budget, month, monthTotal, onMonthChange }: Props) {
  const [openPicker, setOpenPicker] = useState(false)

  const handlePicker = () => {
    setOpenPicker(true)
  }

  const handleMonthChange = (_: Dayjs, dateString: string | string[]) => {
    onMonthChange(dateString as string)
    setOpenPicker(false)
  }

  const remainBudget = new BigNumber(budget?.month_budget ?? '0')
    .minus(monthTotal.monthOutcomeTotal)
    .toString()

  const percent = Number(
    new BigNumber(remainBudget)
      .dividedBy(budget?.month_budget ?? '0')
      .times(100)
      .toNumber()
      .toFixed(1)
  )

  return (
    <div className="w-full px-4">
      <div className="mx-auto grid w-full grid-cols-3 gap-5 rounded-lg bg-primary-100 p-2 text-black">
        <div className="flex flex-col gap-1">
          <div className="text-sm">{dayjs(month).format('YYYY')}年</div>
          <button className="flex items-center gap-5 text-lg" onClick={handlePicker}>
            <div className="flex items-center gap-2 text-3xl">
              <div>
                <span>{dayjs(month).format('M')}</span>
                <span className="text-base">月</span>
              </div>
              <IconPark href="#down-one" />
            </div>
            <div className="h-8 w-px bg-black"></div>
          </button>
          <div className="invisible relative -top-10 left-0 h-0 w-0">
            <MaskDatePicker
              defaultValue={dayjs()}
              placement="topLeft"
              open={openPicker}
              picker="month"
              maxDate={dayjs()}
              onChange={handleMonthChange}
              onClickMask={() => setOpenPicker(false)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm">收入</div>
          <button className="text-left text-lg">{formatAmount(monthTotal.monthIncomeTotal)}</button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm">支出</div>
          <button className="text-left text-lg">
            {formatAmount(monthTotal.monthOutcomeTotal)}
          </button>
        </div>
      </div>
      <button className="relative top-3 flex w-full items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-md">
        <Progress
          className="shrink-0"
          size={90}
          format={(percent) => (
            <div>
              <div className="text-xs text-gray-500">剩余</div>
              <div className="text-sm text-gray-700">{percent}%</div>
            </div>
          )}
          strokeColor="#26A69A"
          type="circle"
          percent={percent}
          strokeWidth={15}
        />
        <div className="grid w-full grid-rows-2 gap-2">
          <div className="flex items-center justify-between gap-2 text-base text-gray-700">
            <div className="tracking-wider">剩余预算：</div>
            <div>{formatAmount(remainBudget)}</div>
          </div>
          <div className="flex items-center justify-between gap-2 text-sm text-gray-500">
            <div className="tracking-wider">本月预算：</div>
            <div>{formatAmount(budget?.month_budget ?? 0)}</div>
          </div>
        </div>
        <IconPark href="#right-one" className="text-gray-300" />
      </button>
    </div>
  )
}
