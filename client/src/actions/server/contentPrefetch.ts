import { queryClient } from '@/lib/queryClient'
import { QueryContentParams, apiContent } from '../client/contentAction'

export const contentPrefetch = async (params: QueryContentParams) => {
  const key = ['content']
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiContent.getAll(params) })
}

export const contentByIdPrefetch = async (id: string) => {
  const key = ['content', id]
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiContent.getOne(id) })
}
