"use client"

import { useState } from "react"

import { IconMenuDeep, IconX } from "@tabler/icons-react"

import { LinkWrapper } from "@/components/layout/LinkWrapper"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

type SheetHeaderPropsType = {
  nav: { name: string; url: string }[]
}

export const SheetHeader = ({ nav }: SheetHeaderPropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen((prev) => !prev)
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="p-2 xl:hidden" variant="black_out">
          <IconMenuDeep size={"26px"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex !w-full !max-w-full flex-col items-end justify-start bg-white">
        <SheetClose asChild>
          <Button className=" p-2 xl:hidden" variant="black_out">
            <IconX />
          </Button>
        </SheetClose>

        <nav className="flex flex-col items-end justify-between  gap-8 text-right xl:hidden">
          {nav.map(({ name, url }, idx) => (
            <LinkWrapper url={url} key={idx} onClick={handleToggle}>
              {name}
            </LinkWrapper>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
