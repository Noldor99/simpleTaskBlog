import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  IContentSchema,
  QueryContentParams,
  apiContent,
} from '@/actions/client/contentAction'


export const useCreateContent = () => {
  const queryClient = useQueryClient()
  const { push } = useRouter()
  return useMutation({
    mutationFn: apiContent.create,
    onSuccess: () => {
      push('/admin/main')
      queryClient.invalidateQueries({
        queryKey: ['content'],
      })
    },
  })
}

export const useUpdateContent = (id: string) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: IContentSchema) => apiContent.update(id!, body),
    onSuccess: () => {
      push('/admin/main')
      queryClient.invalidateQueries({
        queryKey: ['content'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['content', id],
      // })
    },
  })
}

export const useGetContent = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryContentParams
}) =>
  useQuery({
    queryKey: ['content'],
    queryFn: () => apiContent.getAll(params ?? {}),
    enabled,
  })

export const useDeleteContentById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiContent.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['content'],
      })
    },
  })
}

export const useGetContentById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['content', id],
    queryFn: () => apiContent.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['content'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


