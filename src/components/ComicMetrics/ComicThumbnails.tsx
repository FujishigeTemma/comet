import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useComicsMeta } from '/@/comicsMetaState'
import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

interface Props {
  focused: number | null
}

const useComicMeta = (comicId: number) => {
  const list = useComicsMeta()
  const comic = list.find(comic => comic.id === comicId)
  if (comic === undefined) {
    throw new Error()
  }
  return comic
}

export const Thumbnails = ({ focused }: Props) => {
  const { comicId } = useParams()
  const meta = useComicMeta(mustConvertToIntNumber(comicId))

  const pages = useMemo(() => {
    const list = []
    for (let i = 1; i <= meta.volumes.length; i++) {
      list.push(
        <li key={i}>
          <Link to={`/comics/${comicId}/volumes/${i}/pages/${1}`}>
            <img src={getPageImgUrl(comicId, i.toString(), 1)} />
          </Link>
        </li>
      )
    }
    return list
  }, [meta, comicId])

  return <ol>{pages}</ol>
}
