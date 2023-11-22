import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { type Metadata } from 'next'
import PrelineLoader from '@/components/PrelineLoader'

export const metadata: Metadata = {
  title: {
    template: '%s - 优代',
    default: '优代 - 你的最后一个货代平台',
  },
  description:
    '更及时，更透明，更多选择',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col bg-gray-50 dark:bg-slate-900">
        <PrelineLoader />
        {children}
      </body>
    </html>
  )
}
