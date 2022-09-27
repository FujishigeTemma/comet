import { SeriesComponent } from '/@/components/Comics/SeriesComponent'

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
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">シリーズ一覧</h1>
      <ul className="grid grid-cols-8">
        {list.map(series => (
          <li key={series.id}>
            <SeriesComponent series={series} />
          </li>
        ))}
      </ul>
    </div>
  )
}
