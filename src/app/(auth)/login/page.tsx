"use client"
import Link from 'next/link'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiURL } from '@/config'
import { getCookie, getCookies, setCookie } from 'cookies-next'

/*export const metadata: Metadata = {
  title: '登录',
}*/

export default function Login() {
  let [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
  })
  let router = useRouter()
  return (
    <SlimLayout>
      <div className="flex">
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        登录到您的账户
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        还没有账户？{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          注册
        </Link>{' '}
        以免费试用。
      </p>
      <form 
        action="#" 
        className="mt-10 grid grid-cols-1 gap-y-8"
        onSubmit={async (e) => {
          e.preventDefault()

          const response = await fetch(apiURL + '/api/auth/login', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo), // body data type must match "Content-Type" header
          })
          const jwt_token = (await response.json()).access_token
          setCookie("jwt_token", jwt_token)

          const _response = await fetch(apiURL + '/api/user/me', {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              "Authorization": jwt_token
            },
          })
          const userInfo = await _response.json()
          for (const k in userInfo) {
            setCookie(k, userInfo[k])
          }
          
          router.push('/' + userInfo.role + '/' + userInfo.username)
        }}
      >
        <TextField
          label="用户名"
          name="username"
          level={1}
          type="username"
          value={loginInfo.username}
          onChange={(e) => {
            e.preventDefault()
            setLoginInfo({
              ...loginInfo,
              username: e.target.value
            })
          }}
          required
        />
        <TextField
          label="密码"
          name="password"
          level={1}
          type="password"
          autoComplete="current-password"
          value={loginInfo.password}
          onChange={(e) => {
            e.preventDefault()
            setLoginInfo({
              ...loginInfo,
              password: e.target.value
            })
          }}
          required
        />
        <div>
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              登录 <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
