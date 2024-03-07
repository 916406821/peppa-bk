import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import IconPark from './IconPark'
import MaskDatePicker from './MaskDatePicker'

interface Props {
  month: string
  monthTotal: {
    monthIncomeTotal: number
    monthOutcomeTotal: number
  }
  onMonthChange: (month: string) => void
}

export default function Total({ month, monthTotal, onMonthChange }: Props) {
  const [openPicker, setOpenPicker] = useState(false)

  const handlePicker = () => {
    setOpenPicker(true)
  }

  const handleMonthChange = (_: Dayjs, dateString: string | string[]) => {
    onMonthChange(dateString as string)
    setOpenPicker(false)
  }

  return (
    <div className="mx-auto mt-4 flex w-5/6 items-center justify-around rounded-lg bg-primary-100 p-4 text-primary-300">
      <div className="flex flex-col gap-1">
        <div>{dayjs(month).format('YYYY')}年</div>
        <div className="flex items-center gap-1" onClick={handlePicker}>
          <div className="text-2xl">
            <span>{dayjs(month).format('M')}</span>
            <span className="text-base">月</span>
          </div>
          <IconPark href="#down-one" />
        </div>
        <div className="invisible relative -left-10 -top-10 h-0 w-0">
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
      <div className="h-8 w-px bg-bg-100"></div>
      <div className="flex flex-col gap-3">
        <div>收入</div>
        <div>{monthTotal.monthIncomeTotal}</div>
      </div>
      <div className="flex flex-col gap-3">
        <div>支出</div>
        <div>{monthTotal.monthOutcomeTotal}</div>
      </div>
    </div>
  )
}
