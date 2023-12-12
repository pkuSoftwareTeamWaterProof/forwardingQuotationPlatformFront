"use client"
import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { useState } from 'react'
import { apiURL } from '@/config'
import { useRouter } from 'next/navigation'

/*export const metadata: Metadata = {
  title: '注册',
}*/

export default function Register() {
  let [registerInfo, setRegisterInfo] = useState({
    username: '',
    password: '',
    role: '',
    telephone:'',
    email:''
  })
  let router = useRouter()
  return (
    <SlimLayout>
      <div className="flex">
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        免费试用
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        已有账号？{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          登录
        </Link>{' '}
        到您的账户。
      </p>
      <form
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
        onSubmit={ async (e) =>  {
          e.preventDefault()
          const response = await fetch(apiURL + '/api/user/create', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registerInfo), // body data type must match "Content-Type" header
          })
          if(response.status === 201) {
            router.push("/login")
          } else if(response.status === 409){
            alert("用户名已被占用！")
          }
        }}
          >
        <SelectField
          className="col-span-full"
          label="用户类型"
          name="role"
          autoComplete="organization-title"
          value={registerInfo.role}
          onChange={(e) => setRegisterInfo({
            ...registerInfo,
            role: e.target.value
          })}
          required
        >
          <option selected>请选择</option>
          <option>customer</option>
          <option>forwarder</option>
        </SelectField>
        <TextField
          className="col-span-full"
          label="用户名"
          name="username"
          type="username"
          autoComplete="username"
          value={registerInfo.username}
          onChange={(e) => setRegisterInfo({
            ...registerInfo,
            username: e.target.value
          })}
          required
        />
        <TextField
          className="col-span-full"
          label="密码"
          name="password"
          type="password"
          autoComplete="new-password"
          value={registerInfo.password}
          onChange={(e) => setRegisterInfo({
            ...registerInfo,
            password: e.target.value
          })}
          required
        />
        <TextField
          className="col-span-full"
          label="电话"
          name="telephone"
          type="telephone"
          autoComplete="tel"
          value={registerInfo.telephone}
          onChange={(e) => setRegisterInfo({
            ...registerInfo,
            telephone: e.target.value
          })}
          required
        />
        <TextField
          className="col-span-full"
          label="邮箱"
          name="email"
          type="email"
          autoComplete="email"
          value={registerInfo.email}
          onChange={(e) => setRegisterInfo({
            ...registerInfo,
            email: e.target.value
          })}
          required
        />
        <div className="col-span-full">
          <Button 
            type="submit" 
            variant="solid" 
            color="blue" 
            className="w-full"
          >
            <span>
              注册 <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
