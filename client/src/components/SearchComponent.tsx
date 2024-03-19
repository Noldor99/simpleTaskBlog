'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useRef, useState } from 'react'

import { IconSearch } from '@tabler/icons-react'

import { useDebounce } from '@/hooks/useDebounce'

import { cn } from '@/lib/utils'

interface SearchComponentProps {
  link: string
  search?: string
}

const SearchComponent = ({ search, link }: SearchComponentProps) => {
  const router = useRouter()
  const initialRender = useRef(true)

  const [text, setText] = useState(search)
  const debouncedValue = useDebounce(text, 300)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    if (debouncedValue === undefined) return
    if (!debouncedValue) {
      router.push(`/${link}`)
    } else {
      router.push(`/${link}?search=${debouncedValue}`)
    }
  }, [debouncedValue])

  return (
    <div className={cn('flex flex-1 items-center justify-start', 'border border-black')}>
      <IconSearch className="mx-2" />
      <input
        value={text}
        placeholder="Search movies..."
        onChange={(e) => setText(e.target.value)}
        className={cn('mt-0 w-full px-3 py-1', 'border-none bg-transparent outline-none')}
      />
    </div>
  )
}

export default SearchComponent
