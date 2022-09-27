import { Link, useParams } from 'react-router-dom'

import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

export const Page = () => {
  const { comicId, volumeId, pageId } = useParams()

  // MEMO: 範囲外に飛ぶことあるけどまぁええか
  return (
    <div className="flex w-full h-screen">
      <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${mustConvertToIntNumber(pageId) - 1}`} className="w-1/2">
        <img className="w-full h-full object-contain" src={getPageImgUrl(comicId, volumeId, mustConvertToIntNumber(pageId) * 2 - 1)} />
      </Link>
      <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${mustConvertToIntNumber(pageId) + 1}`} className="w-1/2">
        <img className="w-full h-full object-contain" src={getPageImgUrl(comicId, volumeId, mustConvertToIntNumber(pageId) * 2)} />
      </Link>
    </div>
  )
}
