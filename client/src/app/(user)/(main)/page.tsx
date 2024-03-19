import { QueryContentParams } from '@/actions/client/contentAction'

import { ContentList } from './_components/ContentList'

export const generateMetadata = async () => {
  return {
    title: 'Home Page',
    description: 'Simple - Home Page',
  }
}

export type PageProps = {
  params: { [key: string]: string | string[] | undefined }
  searchParams?: QueryContentParams
}

const HomePage = async (props: PageProps) => {
  return (
    <section>
      <div className="container">
        <ContentList {...props} />
      </div>
    </section>
  )
}

export default HomePage
