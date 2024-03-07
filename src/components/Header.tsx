import { message } from 'antd'
import IconPark from './IconPark'

export default function Header() {
  const handleUser = () => {
    message.warning('开发中...')
  }
  return (
    <div className="relative mx-auto w-full py-2 text-lg font-bold">
      <div className="mx-auto w-fit">佩奇记账</div>
      <button className="absolute right-4 top-3" onClick={handleUser}>
        <IconPark href="#user" />
      </button>
    </div>
  )
}
