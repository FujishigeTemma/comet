import { useParams } from 'react-router-dom'

import { ComicComponent } from '/@/components/Comic/ComicComponent'
import { Header } from '/@/components/Header'

import { useComicsMeta } from '/@/comicsMetaState'
import { mustConvertToIntNumber } from '/@/utils'

const useComicMeta = (comicId: number) => {
  const list = useComicsMeta()
  const meta = list.find(comic => comic.id === comicId)
  if (meta === undefined) {
    throw new Error()
  }
  return meta
}

export const Comic = () => {
  const { comicId } = useParams()
  const meta = useComicMeta(mustConvertToIntNumber(comicId))

  return (
    <div className="flex flex-col gap-4 p-4">
      <Header meta={meta} />
      <ul className="grid grid-cols-comic-cover gap-4">
        {meta.volumes.map(volume => (
          <li key={volume.id}>
            <ComicComponent comicsId={meta.id} comic={volume} />
          </li>
        ))}
      </ul>
    </div>
  )
}
