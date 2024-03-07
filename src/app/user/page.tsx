'use client'

import { UserInfo } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function User() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo>()

  useEffect(() => {
    if (window && window.localStorage) {
      const userInfo = window.localStorage.getItem('userInfo')
      setUserInfo(userInfo ? JSON.parse(userInfo) : null)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('userInfo')
    setUserInfo(undefined)
    router.replace('/login')
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[720px] flex-col items-center justify-center gap-6 p-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-5xl font-bold">
        {userInfo?.username.split('')[0]}
      </div>
      <div className="text-lg font-bold">{userInfo?.username}</div>
      <button
        className="flex w-3/4 justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400"
        onClick={logout}
      >
        退出登录
      </button>
    </div>
  )
}
