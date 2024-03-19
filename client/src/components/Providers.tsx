'use client'

import { type ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/queryClient'

type ProvidersPropsType = {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersPropsType) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
