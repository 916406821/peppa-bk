import { DatePicker, DatePickerProps } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface Props extends DatePickerProps {
  onClickMask: () => void
}

export default function MaskDatePicker(props: Props) {
  const [openPicker, setOpenPicker] = useState(props.open)

  useEffect(() => {
    setOpenPicker(props.open)
  }, [props.open])

  return (
    <>
      <DatePicker {...props} locale={locale} />
      {openPicker &&
        ReactDOM.createPortal(
          <div
            className="fixed left-0 top-0 z-50 h-full w-full bg-gray-900 opacity-20 duration-200"
            onClick={props.onClickMask}
          ></div>,
          document.body
        )}
    </>
  )
}
