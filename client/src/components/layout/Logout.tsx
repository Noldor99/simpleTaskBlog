'use client'

import { useAuthLogout } from '@/ahooks/useAuth'

import React from 'react'

import { IconLogout } from '@tabler/icons-react'

import { useUserStore } from '@/store'

const Logout = () => {
  const { mutate: logout } = useAuthLogout()

  const { user } = useUserStore()

  return (
    <>{user && <IconLogout className="ml-2  h-6 w-6 cursor-pointer" onClick={() => logout()} />}</>
  )
}

export default Logout
