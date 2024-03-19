import { type ReactNode } from "react"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"

type RootLayoutPropsType = {
  children: ReactNode
}

export const LayoutWrapper = ({ children }: RootLayoutPropsType) => {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
