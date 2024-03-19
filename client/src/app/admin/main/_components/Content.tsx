'use client'

import { useDeleteContentById, useGetContent } from '@/ahooks/useContent'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'

import { IconPencil, IconPlus } from '@tabler/icons-react'

import DialogDelete from '@/components/DialogDelete'
import FilterSelect from '@/components/FilterSelect'
import SmalCardIcon from '@/components/card/SmalCardIcon'
import WrapPagination from '@/components/pagination/WrapPagination'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { ContentVariant } from '@/types/content'

const Content = () => {
  const arrVariant = [...Object.values(ContentVariant)]

  const searchParams = useSearchParams()

  const getResult = useGetContent({
    enabled: true,
    params: {
      limit: '6',
      page: searchParams?.get('page') || '1',
      variant: searchParams?.get('variant') as ContentVariant | undefined,
      // search: searchParams?.get("search") || undefined,
    },
  })

  const { data: contentData, isFetched, refetch } = getResult

  const { mutate: deleteContent } = useDeleteContentById()

  useEffect(() => {
    refetch()
  }, [refetch, searchParams])

  return (
    <div className="container-sm m-0">
      <div className="mb-5 flex flex-wrap items-start justify-start gap-4">
        <Button asChild variant="black_out">
          <Link href={'/admin/main/Add'}>
            <IconPlus className="mr-2" />
            Add content
          </Link>
        </Button>
        <FilterSelect arrValue={arrVariant} paramName="variant" />
      </div>
      <div className={cn('flex flex-col items-center justify-start gap-2')}>
        {contentData?.contents.map((item, idx) => (
          <SmalCardIcon key={idx} title={item.title} subTitle={item.variant}>
            <Link href={`/admin/main/${item.id}`}>
              <Button className="p-2">
                <IconPencil />
              </Button>
            </Link>
            <DialogDelete
              nameDelete="SomeItem"
              onClick={() => {
                deleteContent(item.id)
              }}
            />
          </SmalCardIcon>
        ))}
      </div>
      {contentData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {contentData && contentData.totalCount > 6 && (
        <div className="mt-8">
          <WrapPagination totalCount={contentData?.totalCount} />
        </div>
      )}
    </div>
  )
}

export default Content
