import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Header } from '/@/components/Header'

import { useComicsMeta } from '/@/comicsMetaState'
import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

export const Volume = () => {
  const { comicId, volumeId } = useParams()
  const list = useComicsMeta()
  const cmeta = list.find(comic => comic.id === mustConvertToIntNumber(comicId))
  if (cmeta === undefined) {
    throw new Error()
  }
  const vmeta = cmeta.volumes.find(volume => volume.id === mustConvertToIntNumber(volumeId))
  if (vmeta === undefined) {
    throw new Error()
  }

  const pages = useMemo(() => {
    const list = []
    for (let i = 1; i <= vmeta.pages; i++) {
      list.push(
        <li key={i}>
          <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${Math.ceil(i / 2)}`}>
            <img src={getPageImgUrl(comicId, volumeId, i)} decoding={'async'} />
          </Link>
        </li>
      )
    }
    return list
  }, [vmeta, comicId, volumeId])

  return (
    <div className="flex flex-col gap-4 p-4">
      <Header meta={cmeta} volumeId={mustConvertToIntNumber(volumeId)} />
      <ul className="grid grid-cols-comic-cover">{pages}</ul>
    </div>
  )
}
