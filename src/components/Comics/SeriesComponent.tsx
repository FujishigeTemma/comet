import { Link } from 'react-router-dom'

interface Props {
  series: {
    id: number
    name: string
    author: string
    coverImgUrl: string
  }
}

export const SeriesComponent = ({ series }: Props) => {
  return (
    <div className="relative">
      <Link to={`/comics/${series.id}`}>
        <img src={series.coverImgUrl} className="w-full" />
        <div className="absolute flex items-center justify-center group inset-0 z-10 hover:bg-opacity-70 bg-gray-900 bg-opacity-0 transition p-2">
          <div className="opacity-0 group-hover:opacity-100 transition text-gray-100 font-bold">{series.name}</div>
        </div>
      </Link>
    </div>
  )
}
