import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: '注册',
}

export default function Register() {
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
      >
        <TextField
          label="名"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="姓"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="邮箱地址"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          className="col-span-full"
          label="密码"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <div className="col-span-full">
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              注册 <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
