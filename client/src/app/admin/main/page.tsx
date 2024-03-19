import React, { Suspense } from 'react'

import Content from './_components/Content'

const page = () => {
  return (
    <Suspense fallback="Loading...">
      <Content />
    </Suspense>
  )
}

export default page
