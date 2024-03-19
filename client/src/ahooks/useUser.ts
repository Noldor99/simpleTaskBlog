import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useUserStore } from '@/store'
import { apiUser, QueryUserParams } from '@/actions/client/userAction'


export const useGetUser = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryUserParams
}) =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => apiUser.getUsers(params ?? {}),
    enabled
  })

export const useGetUserById = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: () => apiUser.getUserById(id),
  })

export const useUpdateUser = () => {
  const { user } = useUserStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: apiUser.updateUser,
    onSuccess: (data) => {
      if (data.id === user!.id) {
        queryClient.invalidateQueries({
          queryKey: ['user', 'refresh'],
        })
      }

      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: apiUser.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
  })
}
