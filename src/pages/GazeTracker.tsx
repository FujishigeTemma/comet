import { Gazer } from '/@/components/Gazer'

import { Link, useParams } from 'react-router-dom'

import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

export const GazeTracker = () => {
  const { comicId, volumeId, pageId } = useParams()
  const firstImg = <img className="h-full object-contain" src={getPageImgUrl(comicId, volumeId, mustConvertToIntNumber(pageId) * 2 - 1)} />
  const secondImg = <img className="h-full object-contain" src={getPageImgUrl(comicId, volumeId, mustConvertToIntNumber(pageId) * 2)} />

  return (
    <div className="flex w-full h-screen">
      <Gazer />
      {secondImg}
      {firstImg}
    </div>
  )
}

export default GazeTracker
