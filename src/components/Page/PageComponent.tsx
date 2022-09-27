import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { getPageImgUrl } from '/@/utils'

interface Props {
  className?: string
  comicId: number
  volumeId: number
  pageId: number
  withLink: boolean
}

export const PageComponent = ({ className, comicId, volumeId, pageId, withLink }: Props) => {
  // MEMO: 範囲外に飛ぶことあるけどまぁええか

  const secondImg = <img className="flex-1 min-w-0 object-contain object-right" src={getPageImgUrl(comicId, volumeId, pageId * 2)} />
  const firstImg = <img className="flex-1 min-w-0 object-contain object-left" src={getPageImgUrl(comicId, volumeId, pageId * 2 - 1)} />

  if (withLink) {
    return (
      <div className={clsx(className, 'flex', 'justify-center')}>
        <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${pageId + 1}`} className="flex min-h-0">
          {secondImg}
        </Link>
        <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${pageId - 1}`} className="flex min-h-0">
          {firstImg}
        </Link>
      </div>
    )
  }

  return (
    <div className={clsx(className, 'flex', 'justify-center')}>
      {secondImg}
      {firstImg}
    </div>
  )
}
