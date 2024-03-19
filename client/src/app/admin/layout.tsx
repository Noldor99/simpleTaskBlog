'use client'

import { useAuthRefresh } from '@/ahooks/useAuth'

import { useRouter } from 'next/navigation'

import { type ReactNode, useEffect } from 'react'

import { Aside } from '@/app/admin/_components/Aside'

import { Header } from '@/components/layout/Header'

import { useUserStore } from '@/store'

type RootLayoutPropsT = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutPropsT) => {
  const { user } = useUserStore()
  const { push } = useRouter()
  const {
    data: userData,
    isFetched,
    refetch,
    isError,
  } = useAuthRefresh({
    enabled: false,
  })

  useEffect(() => {
    console.log(user)
    if (!user) {
      refetch()
      if (!userData && isFetched) {
        push('/login')
      }
      if (isError) {
        push('/login')
      }
    }
  }, [userData, user])

  return (
    <>
      <Header />
      <div className="flex">
        <Aside />
        <main className="flex-1">
          <div className="flex flex-1 flex-col md:ml-60">
            <div className="flex flex-grow flex-col space-y-2 px-4 pb-4 pt-2">{children}</div>
          </div>
        </main>
      </div>
    </>
  )
}

export default RootLayout
