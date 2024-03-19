'use client'

import { useGetContentById } from '@/ahooks/useContent'

import { useParams } from 'next/navigation'

import { ContentForm } from './_components/ContentForm'

const PortfolioEditPage = () => {
  const { id } = useParams<{ id: string }>() ?? { id: '' }
  const { data: content, isFetched } = useGetContentById(id as string)

  return (
    <div className="container-sm">
      {id === 'Add' ? <ContentForm /> : isFetched && <ContentForm content={content} />}
    </div>
  )
}

export default PortfolioEditPage
