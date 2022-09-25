import { Link, useParams } from 'react-router-dom'

import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

export const Page = () => {
  const { comicId, volumeId, pageId } = useParams()

  return (
    <div className="py-8">
      <Link to={`/comics/${comicId}/volumes/${volumeId}`}>up</Link>
      <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${mustConvertToIntNumber(pageId) + 1}`}>
        <img src={getPageImgUrl(comicId, volumeId, pageId)} />
      </Link>
    </div>
  )
}
