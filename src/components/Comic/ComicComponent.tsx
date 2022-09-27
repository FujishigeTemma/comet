import { Link } from 'react-router-dom'

import type { ComicVolumeMeta } from '/@/comicsMetaState'

interface Props {
  comicsId: number
  comic: ComicVolumeMeta
}

export const ComicComponent = ({ comicsId, comic }: Props) => {
  return (
    <div className="relative">
      <Link to={`/comics/${comicsId}/volumes/${comic.id}`}>
        <img src={`/comics-meta/${comicsId}/${comic.id}/${comic.cover}.jpg`} className="w-full" />
        <div className="absolute flex items-center justify-center group inset-0 z-10 hover:bg-opacity-70 bg-gray-900 bg-opacity-0 transition p-2">
          <div className="opacity-0 group-hover:opacity-100 transition text-gray-100 font-bold">{comic.name}</div>
        </div>
      </Link>
    </div>
  )
}
