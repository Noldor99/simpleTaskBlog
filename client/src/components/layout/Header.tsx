import Link from 'next/link'

import { Suspense } from 'react'

import { LinkWrapper } from '@/components/layout/LinkWrapper'
import { SheetHeader } from '@/components/layout/SheetHeader'

import UserInfo from './UserInfo'

export const Header = () => {
  const nav = [
    { name: 'Home', url: '/' },
    { name: 'Admin panel', url: '/admin' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-white py-4">
      <div className="container py-0">
        <div className="flex items-center gap-4 xl:justify-between xl:gap-8">
          <Link href="/">
            <p>Logo</p>
          </Link>
          <div className="ml-auto flex gap-4">
            <nav className="m-auto hidden items-center  justify-between gap-8 xl:flex">
              {nav.map(({ name, url }, idx) => (
                <Suspense key={idx}>
                  <LinkWrapper url={url}>{name}</LinkWrapper>
                </Suspense>
              ))}
            </nav>
            <div className="flex gap-4">
              <UserInfo />
              <SheetHeader nav={nav} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
