import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useComicsMeta } from '/@/comicsMetaState'
import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

const useVolumeMeta = (comicId: number, volumeId: number) => {
  const list = useComicsMeta()
  const comic = list.find(comic => comic.id === comicId)
  if (comic === undefined) {
    throw new Error()
  }
  return comic.volumes.find(volume => volume.id === volumeId)
}

export const Volume = () => {
  const { comicId, volumeId } = useParams()
  const meta = useVolumeMeta(mustConvertToIntNumber(comicId), mustConvertToIntNumber(volumeId))
  if (meta === undefined) {
    throw new Error()
  }

  const pages = useMemo(() => {
    const list = []
    for (let i = 1; i <= meta.pages; i++) {
      list.push(
        <li key={i}>
          <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${Math.ceil(i / 2)}`}>
            <img src={getPageImgUrl(comicId, volumeId, i)} decoding={'async'} />
          </Link>
        </li>
      )
    }
    return list
  }, [meta, comicId, volumeId])

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="font-bold text-xl">{meta.name}</h1>
      <ul className="grid grid-cols-comic-cover">{pages}</ul>
    </div>
  )
}
