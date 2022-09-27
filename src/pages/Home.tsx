import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="max-w-3xl flex flex-col gap-2">
        <h1>Home</h1>
        <Link to="/comics">comics</Link>
        <Link to="/comics/comicId/volumes/metrics">volume metrics</Link>
      </div>
    </div>
  )
}
