"use client"
import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { useState } from 'react'
import { apiURL } from '@/config'
import { register } from 'module'

/*export const metadata: Metadata = {
  title: '注册',
}*/

export default function Register() {
  let [registerInfo, setRegisterInfo] = useState({
    username: '',
    password: '',
    type: ''
  })
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
          登陆
        </Link>{' '}
        到您的账户。
      </p>
      <form
        action="#"
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
        onSubmit={ async (e) =>  {
          e.preventDefault()
          await fetch(apiURL + '/api/user/create', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registerInfo), // body data type must match "Content-Type" header
          })
        }}
      >
        <SelectField
          className="col-span-full"
          label="请选择你的用户类型"
          name="type"
          form={registerInfo.type}
        >
          <option value="customer">customer</option>
          <option value="forwarder">forwarder</option>
          <option value="">else</option>
        </SelectField>
        <TextField
          className="col-span-full"
          label="邮箱地址"
          name="email"
          type="email"
          autoComplete="email"
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
        <div className="col-span-full">
          <Button 
            type="submit" 
            variant="solid" 
            color="blue" 
            className="w-full"
          >
            <Link
              href="/login"
            >
              <span>
                注册 <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>{' '}
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
