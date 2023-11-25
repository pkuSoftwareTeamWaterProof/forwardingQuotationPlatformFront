'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { NavLink } from '@/components/NavLink'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation({ logged }: { logged: boolean }) {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            { logged? (
              <>
                <MobileNavLink href="#info">个人信息</MobileNavLink>
                <MobileNavLink href="#requests">询价单</MobileNavLink>
                <MobileNavLink href="#orders">订单</MobileNavLink>
              </>
            ): (
              <></>
            )}
            <hr className="m-2 border-slate-300/40" />
            { logged? (
              <></>
            ): (
              <MobileNavLink href="/login">登录</MobileNavLink>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header({ logged }: { logged: boolean }) {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            { logged? ( 
              <div className="hidden md:flex md:gap-x-6">
                <NavLink href="#info">个人信息</NavLink>
                <NavLink href="#requests">询价单</NavLink>
                <NavLink href="#orders">订单</NavLink>
              </div>
            ): (
              <></>
            )}
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            { logged? (
              <></>
            ): (
              <>
                <div className="hidden md:block">
                  <NavLink href="/login">登录</NavLink>
                </div>
                <Button href="/register" color="blue">
                  <span>
                    免费体验 <span className="hidden lg:inline"></span>
                  </span>
                </Button>
              </>
            )}
            <div className="-mr-1 md:hidden">
              <MobileNavigation logged={logged}/>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
