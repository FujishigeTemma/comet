import { useParams } from 'react-router-dom'

import { PageComponent } from '/@/components/Page/PageComponent'

import { mustConvertToIntNumber } from '/@/utils'

export const Page = () => {
  const { comicId, volumeId, pageId } = useParams()

  return (
    <PageComponent
      className="w-full h-screen"
      comicId={mustConvertToIntNumber(comicId)}
      volumeId={mustConvertToIntNumber(volumeId)}
      pageId={mustConvertToIntNumber(pageId)}
      withLink
    />
  )
}
