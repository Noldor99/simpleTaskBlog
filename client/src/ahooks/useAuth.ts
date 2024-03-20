import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useUserStore } from '@/store'
import { ApiAuth } from '@/actions/client/authAction'


export const useAuthRefresh = ({ enabled = true }: { enabled?: boolean }) => {
  const { push } = useRouter()
  const pathname = usePathname()

  const { setUser } = useUserStore()
  const query = useQuery({
    queryKey: ['user', 'refresh'],
    queryFn: ApiAuth.refresh,
    enabled,
  })
  const { isError, isSuccess, isFetched, data } = query

  useEffect(() => {
    if (isFetched) {
      if (isError) {
        setUser(null)
      }
      if (isSuccess) {
        setUser(data)
      }
    }
  }, [isError, isSuccess, isFetched, data, setUser, push, pathname])

  return query
}

export const useRegistration = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ApiAuth.registration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      push('/login')
    },
  })
  return mutation
}

export const useAuthLogin = () => {
  const { push } = useRouter()
  const { setUser } = useUserStore()
  const mutation = useMutation({
    mutationFn: ApiAuth.login,
    onSuccess: (data) => {
      setUser(data)
      push('/')
      window.location.reload()
    },
  })

  return mutation
}

export const useAuthLogout = () => {
  const { push } = useRouter();
  const { setUser } = useUserStore();
  const mutation = useMutation({
    mutationFn: ApiAuth.logout,
    onSettled: () => {
      setUser(null);
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      push('/');
    },
  });

  return mutation;
};



