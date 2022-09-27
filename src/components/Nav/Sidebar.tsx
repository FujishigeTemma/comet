import { GoGraph } from 'react-icons/go'
import { TbBooks } from 'react-icons/tb'
import { WiMeteor } from 'react-icons/wi'
import { Link, useParams } from 'react-router-dom'

export const Sidebar = () => {
  const { comicId, volumeId, pageId } = useParams()
  return (
    <div className="py-4 px-8">
      <Link to={'/'} className="flex gap-2 items-center">
        <WiMeteor size={24} />
        <div className="text-xl font-bold">comet</div>
      </Link>
      <div className="p-2 flex flex-col gap-2">
        <Link to={'/comics'} className="flex gap-2 items-center">
          <TbBooks />
          <div>comics</div>
        </Link>
        {pageId ? (
          <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${pageId}/metrics`} className="flex gap-2 items-center">
            <GoGraph />
            <div>metrics</div>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
