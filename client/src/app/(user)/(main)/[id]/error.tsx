'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const Error = () => {
  const { push } = useRouter()
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-3">
      <h3 className="text-h3 mb-6">News not found!</h3>
      <Button onClick={() => push('/news')}>Go to news page</Button>
    </section>
  )
}

export default Error
