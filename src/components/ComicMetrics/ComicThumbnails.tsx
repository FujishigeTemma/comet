import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useComicsMeta } from '/@/comicsMetaState'
import { mustConvertToIntNumber } from '/@/utils'

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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const coverImgUrl = (i: number) => `/comics-meta/${meta.id}/${meta.volumes[i - 1]!.id}/${meta.volumes[i - 1]!.cover}.jpg`
      list.push(
        <li key={i}>
          <Link to={`/comics/${comicId}/volumes/${i}/pages/${1}`}>
            <img src={coverImgUrl(i)} className={i === focused ? 'max-w-[8rem]' : 'max-w-[6rem]'} />
          </Link>
        </li>
      )
    }
    return list
  }, [meta, comicId, focused])

  useEffect(() => {
    location.hash = 'page' + (focused ?? 1)
  }, [focused])

  return <ol>{pages}</ol>
}
