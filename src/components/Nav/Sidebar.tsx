import { GoFlame, GoGraph } from 'react-icons/go'
import { TbBooks } from 'react-icons/tb'
import { Link, useParams } from 'react-router-dom'

export const Sidebar = () => {
  const { comicId, volumeId, pageId } = useParams()
  return (
    <div className="py-4 px-8 w-64">
      <Link to={'/'} className="flex gap-2 items-center">
        <img src="/assets/logo.png" className="w-12" />
        <div className="text-3xl font-bold text-purple-900">comet</div>
      </Link>
      <div className="mt-8 pl-2 flex flex-col gap-2">
        <Link to={'/comics'} className="flex items-center text-lg">
          <TbBooks size={28} className="ml-[0px] mr-[10px]" />
          <div>comics</div>
        </Link>
        {pageId ? (
          <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${pageId}/metrics`} className="flex items-center text-lg">
            <GoGraph size={28} className="ml-[2px] mr-[8px]" />
            <div>metrics</div>
          </Link>
        ) : volumeId ? (
          <Link to={`/comics/${comicId}/volumes/${volumeId}/metrics`} className="flex items-center text-lg">
            <GoGraph size={28} className="ml-[2px] mr-[8px]" />
            <div>metrics</div>
          </Link>
        ) : comicId ? (
          <Link to={`/comics/${comicId}/metrics`} className="flex items-center text-lg">
            <GoGraph size={28} className="ml-[2px] mr-[8px]" />
            <div>metrics</div>
          </Link>
        ) : null}
        {comicId && volumeId && pageId && (
          <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${pageId}/heatmap`} className="flex items-center text-lg">
            <GoFlame size={28} className="ml-[2px] mr-[8px]" />
            <div>heatmap</div>
          </Link>
        )}
      </div>
    </div>
  )
}
