import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"

interface SmalCardIconProps {
  img?: ReactNode
  title: string
  subTitle?: string
  children: ReactNode
}

const SmalCardIcon = (props: SmalCardIconProps) => {
  const { title, subTitle, children, img } = props
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between bg-white",
        "border border-black"
      )}
    >
      {img}
      <div className="flex w-full items-center justify-between p-5">
        <div className="flex flex-col">
        <p className="overflow-hidden text-ellipsis">{title}</p>
          <p className="text-sm1">{subTitle}</p>
        </div>
        <div className="flex gap-4">{children}</div>
      </div>
    </div>
  )
}

export default SmalCardIcon
