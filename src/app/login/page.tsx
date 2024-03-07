'use client'

import { Spin, message } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    })
    const data = await response.json()
    setLoading(false)
    if (data.success) {
      localStorage.setItem('userInfo', JSON.stringify(data.data))
      message.success(data.message)
      router.replace('/')
    } else {
      message.error(data.message)
    }
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/peppa.svg" alt="logo" width={100} height={100} className="mx-auto" priority />
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          佩奇记账
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-2">
              <input
                name="username"
                type="text"
                maxLength={16}
                autoComplete="username"
                placeholder="用户名称"
                value={loginInfo.username}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                maxLength={16}
                autoComplete="current-password"
                required
                placeholder="登录密码"
                value={loginInfo.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100"
            >
              登录
            </button>
          </div>
        </form>
      </div>
      <Spin spinning={loading} fullscreen wrapperClassName="text-primary-100" />
    </div>
  )
}
