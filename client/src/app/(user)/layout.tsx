import { ReactNode } from 'react'

import { LayoutWrapper } from '@/components/layout/LayoutWrapper'

type RootLayoutPropsType = {
  children: ReactNode
}

const RootLayout = async ({ children }: RootLayoutPropsType) => {
  return <LayoutWrapper>{children}</LayoutWrapper>
}

export default RootLayout
