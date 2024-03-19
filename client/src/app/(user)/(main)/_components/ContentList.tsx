'use server'

import Link from 'next/link'

import React from 'react'

import SearchComponent from '@/components/SearchComponent'
import { SPagination } from '@/components/_onlyServer/SPagination'
import { SToggle } from '@/components/_onlyServer/SToggle'
import { Button } from '@/components/ui/button'

import { contentPrefetch } from '@/actions/server/contentPrefetch'

import { cn } from '@/lib/utils'

import { ContentVariant } from '@/types/content'

import { PageProps } from '../page'

export type FetchFeedType = typeof fetchFeed

const PAGE_LIMIT = 8
const PAGE_VARIANT = ContentVariant.All

const fetchFeed = async ({ limit = PAGE_LIMIT, page = 1, variant = PAGE_VARIANT, search = '' }) => {
  const results = await contentPrefetch({
    limit,
    page,
    variant,
    search,
  })

  const { totalCount } = results

  return {
    data: results,
    paginationData: {
      hasNextPage: 1 + page < totalCount,
      totalPages: Math.ceil(totalCount / limit),
      limit,
      page,
      saveParam: [{ variant: variant, search: search }],
    },
    variantData: {
      variant,
      saveParam: [],
    },
  }
}

export const ContentList = async ({ searchParams }: PageProps) => {
  const pageNumber = Number(searchParams?.page || 1)
  const limit = PAGE_LIMIT
  const variant = searchParams?.variant || PAGE_VARIANT
  const search = searchParams?.search
  const page = pageNumber
  const { data, paginationData, variantData } = await fetchFeed({
    limit,
    page,
    variant,
    search,
  })

  return (
    <div className="space-y-6">
      <div className="paper-rounded flex flex-col gap-6 sm:flex-row ">
        <SToggle
          paramName="variant"
          saveParam={variantData?.saveParam}
          activeValue={variantData?.variant}
          defaultArrValue={[
            { value: 'all', text: 'All' },
            { value: 'research', text: 'Research' },
            { value: 'commentary', text: 'Commentary' },
            { value: 'news', text: 'News' },
          ]}
        />
        <SearchComponent link="/" />
      </div>
      <div className={cn('flex flex-col gap-4')}>
        {data.contents.map((content, i) => (
          <div key={i} className={cn('border-box flex flex-col justify-between')}>
            <div className="flex flex-col px-6 pb-0">
              <div className="text-h3 mb-4 line-clamp-6">{content.title}</div>
              <div className="text-s mb-1 line-clamp-6">{content.description}</div>
              <div className="flex flex-1 items-center justify-between py-6">
                <p className="text-muted">{content.variant}</p>

                <Button size={'sm'} asChild>
                  <Link href={`/${content.router}`}>Read more</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {paginationData.totalPages !== 1 && <SPagination {...paginationData} />}
    </div>
  )
}
