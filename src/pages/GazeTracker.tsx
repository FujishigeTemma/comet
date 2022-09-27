import { Gazer } from '/@/components/Gazer'

import { Link, useParams } from 'react-router-dom'

import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

export const GazeTracker = () => {
  const { comicId, volumeId, pageId } = useParams()
  return (
    <div className="flex w-full h-screen">
      <Gazer />
      <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${mustConvertToIntNumber(pageId) - 1}`} className="w-1/2">
        <img className="w-full h-full object-contain" src={getPageImgUrl(comicId, volumeId, mustConvertToIntNumber(pageId) * 2 - 1)} />
      </Link>
      <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${mustConvertToIntNumber(pageId) + 1}`} className="w-1/2">
        <img className="w-full h-full object-contain" src={getPageImgUrl(comicId, volumeId, mustConvertToIntNumber(pageId) * 2)} />
      </Link>
    </div>
  )
}

export default GazeTracker
