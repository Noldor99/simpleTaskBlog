import { Loader } from '@/components/ui/loader'

export default function Loading() {
  return (
    <section className="fixed inset-0 z-[100] flex flex-1 items-center justify-center bg-muted">
      <Loader />
    </section>
  )
}
