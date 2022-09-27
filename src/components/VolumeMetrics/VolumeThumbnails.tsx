import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useComicsMeta } from '/@/comicsMetaState'
import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

interface Props {
  focused: number | null
}

const useVolumeMeta = (comicId: number, volumeId: number) => {
  const list = useComicsMeta()
  const comic = list.find(comic => comic.id === comicId)
  if (comic === undefined) {
    throw new Error()
  }
  return comic.volumes.find(volume => volume.id === volumeId)
}

export const Thumbnails = ({ focused }: Props) => {
  const { comicId, volumeId } = useParams()
  const meta = useVolumeMeta(mustConvertToIntNumber(comicId), mustConvertToIntNumber(volumeId))
  if (meta === undefined) {
    throw new Error()
  }

  const pages = useMemo(() => {
    const list = []
    for (let i = 1; i <= meta.pages; i++) {
      list.push(
        <li key={i} className="carousel-item">
          <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${i}`}>
            <img id={'page' + i} src={getPageImgUrl(comicId, volumeId, i)} className={i === focused ? 'max-w-[8rem]' : 'max-w-[6rem]'} />
          </Link>
        </li>
      )
    }
    location.hash = 'page' + focused
    return list
  }, [meta, comicId, volumeId, focused])

  return <ol className="carousel carousel-center">{pages}</ol>
}
