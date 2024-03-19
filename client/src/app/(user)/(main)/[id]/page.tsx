import Link from 'next/link'

import { getHtml } from '@/components/editorRender/html_editor'

import { contentByIdPrefetch, contentPrefetch } from '@/actions/server/contentPrefetch'

import { dateHelpers } from '@/lib/dateHelpers'
import { cn } from '@/lib/utils'

interface MetadataProps {
  params: { id: string }
}

export const generateMetadata = async ({ params }: MetadataProps) => {
  const contentsById = await contentByIdPrefetch(params.id)

  if (contentsById) {
    return {
      title: contentsById.title,
      description: contentsById.description,
    }
  }

  return {
    title: 'Content Page By Id ' + params.id,
    description: 'V3V - Content Page',
  }
}

export async function generateStaticParams() {
  const { contents } = await contentPrefetch({ page: 1, limit: 200 })

  return contents.map((i) => ({ id: i.id }))
}

interface IContentPage {
  params: {
    id: string
  }
}

const ContentByIdPage = async ({ params }: IContentPage) => {
  const content = await contentByIdPrefetch(params.id)
  const renderedTexts: string | null = await getHtml(content.text)
  return (
    <section className="container-sm">
      <div className="">
        <div className="flex flex-col justify-start gap-4">
          <span className="text-xs text-muted">
            {dateHelpers.getDayMonthYear(content.createdAt)}
          </span>
          <div>
            <h3 className="text-h3 mb-[30px] text-left">{content.title}</h3>
          </div>
          <div className="paper-rounded">
            {renderedTexts && <div dangerouslySetInnerHTML={{ __html: renderedTexts }} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentByIdPage
