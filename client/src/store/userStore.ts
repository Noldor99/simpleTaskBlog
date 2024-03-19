import { useStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

import { IUser, RolesEnum } from '@/types/user'

type UserStoreType = {
  isAdmin: boolean
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export const userStore = createStore<UserStoreType>()(
  persist(
    (set) => ({
      isAdmin: false,
      user: null,
      setUser: (user) => set((state) => ({
        isAdmin: user ? user.roles.includes(RolesEnum.ADMIN) : false,
        user: user,
      })),
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export const useUserStore = () => useStore(userStore)
