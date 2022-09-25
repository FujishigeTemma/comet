import { Link, useParams } from 'react-router-dom'

import { useComicsMeta } from '/@/comicsMetaState'
import { mustConvertToIntNumber } from '/@/utils'

const useComicMeta = (comicId: number) => {
  const list = useComicsMeta()
  return list.find(comic => comic.id === comicId)
}

export const Comic = () => {
  const { comicId } = useParams()
  const meta = useComicMeta(mustConvertToIntNumber(comicId))
  if (meta === undefined) {
    throw new Error()
  }

  return (
    <div className="py-8">
      <Link to={`/comics`}>up</Link>
      <p>{meta.name}</p>
      <p>{meta.author}</p>
      <ul>
        {meta.volumes.map(volume => (
          <li key={volume.id}>
            <Link to={`/comics/${meta.id}/volumes/${volume.id}`}>
              <img src={`/comics-meta/${meta.id}/${volume.id}/${volume.cover}.jpg`} />
              <p>{volume.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
