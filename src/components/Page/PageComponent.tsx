import { Link } from 'react-router-dom'

import { getPageImgUrl } from '/@/utils'

interface Props {
  comicId: number
  volumeId: number
  pageId: number
}

export const PageComponent = ({ comicId, volumeId, pageId }: Props) => {
  // MEMO: 範囲外に飛ぶことあるけどまぁええか
  return (
    <div className="flex w-full h-screen">
      <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${pageId - 1}`} className="w-1/2">
        <img className="w-full h-full object-contain" src={getPageImgUrl(comicId, volumeId, pageId * 2 - 1)} />
      </Link>
      <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${pageId + 1}`} className="w-1/2">
        <img className="w-full h-full object-contain" src={getPageImgUrl(comicId, volumeId, pageId * 2)} />
      </Link>
    </div>
  )
}
