import { Link, useParams } from 'react-router-dom'

import { ComicComponent } from '../components/Comic/ComicComponent'
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
      <div className="flex gap-4">
        <h2 className="font-bold text-xl">{meta.name}</h2>
        <h2 className="mt-auto">{meta.author}</h2>
      </div>
      <ul className="grid grid-cols-8">
        {meta.volumes.map(volume => (
          <li key={volume.id}>
            <ComicComponent comicsId={meta.id} comic={volume} />
          </li>
        ))}
      </ul>
    </div>
  )
}
