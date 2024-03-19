'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useUserStore } from '@/store'

const AdminPage = () => {
  const { user } = useUserStore()
  const { push } = useRouter()
  useEffect(() => {
    if (user) {
      push('/admin/main')
    }
  }, [user])

  return (
    <div className="container-sm">
      <div className="paper-rounded flex justify-between">
        <Link href="/login">Login</Link>
        {user && <Link href="/admin/main">Home</Link>}
      </div>
    </div>
  )
}

export default AdminPage
