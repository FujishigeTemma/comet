import { Link } from 'react-router-dom'

import { useComicsMeta } from '/@/comicsMetaState'

const useComicsList = () => {
  const list = useComicsMeta()
  return list.map(series => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const firstVolume = series.volumes[0]!
    return {
      id: series.id,
      name: series.name,
      author: series.author,
      coverImgUrl: `/comics-meta/${series.id}/${firstVolume.id}/${firstVolume.cover}.jpg`
    }
  })
}

export const Comics = () => {
  const list = useComicsList()

  return (
    <div>
      <ul className="grid grid-cols-8">
        {list.map(series => (
          <li key={series.id}>
            <Link to={`/comics/${series.id}`}>
              <img src={series.coverImgUrl} />
              <p>{series.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
