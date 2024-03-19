'use client'

import React from 'react'

import { useUserStore } from '@/store'

import Logout from './Logout'

const UserInfo = () => {
  const { user } = useUserStore()

  if (!user) {
    return null
  }

  return (
    <div className=" flex items-center justify-between border-b border-black px-3 ">
      <p className="text-center">{user?.username ?? user?.username}</p>
      <Logout />
    </div>
  )
}

export default UserInfo
