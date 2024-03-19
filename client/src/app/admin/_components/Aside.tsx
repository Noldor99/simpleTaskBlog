'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useUserStore } from '@/store'

import { cn } from '@/lib/utils'

import { RolesEnum } from '@/types/user'

export const Aside = () => {
  const { user, isAdmin } = useUserStore()

  const pathname = usePathname()

  const navs = [{ title: 'Content', path: '/admin/main', role: RolesEnum.MODER }]

  if (!user) {
    return null
  }

  const filteredNavs = isAdmin
    ? navs
    : navs.filter(({ role }) => user?.roles?.some((i) => i === role))

  return (
    <div className="fixed hidden h-screen flex-1 border-r border-black  bg-white md:flex md:w-60">
      <div className="flex w-full flex-col space-y-6">
        <div className="flex flex-col px-6 py-20">
          {filteredNavs.length &&
            filteredNavs.map((item, idx) => {
              const isCurrentPath = pathname?.startsWith(item.path.split('?')[0])
              return (
                <Link
                  key={idx}
                  href={item.path}
                  className={cn(
                    'file: flex flex-row items-center space-x-4 rounded-lg p-2',
                    isCurrentPath && 'font-bold'
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}
