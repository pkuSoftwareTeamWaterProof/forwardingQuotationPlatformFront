import Link from 'next/link'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: '登陆',
}

export default function Login() {
  return (
    <SlimLayout>
      <div className="flex">
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        登陆到您的账户
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
      <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="邮箱地址"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          label="密码"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <div>
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              登陆 <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
