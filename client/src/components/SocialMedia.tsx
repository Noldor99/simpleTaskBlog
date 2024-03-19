import React from "react"
import Link from "next/link"
import {
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandX,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

const SocialMedia = () => {
  return (
    <>
      <div className="mt-6 flex items-start justify-end gap-4 md:mt-0">
        <Link href="https://telegram.org/" target="_blank">
          <Button className="p-2" variant="black_out">
            <IconBrandTelegram />
          </Button>
        </Link>
        <Link href="https://discord.com/" target="_blank">
          <Button className="p-2" variant="black_out">
            <IconBrandDiscord />
          </Button>
        </Link>
        <Link href="https://twitter.com/" target="_blank">
          <Button className="p-2" variant="black_out">
            <IconBrandX />
          </Button>
        </Link>
      </div>
    </>
  )
}

export default SocialMedia
