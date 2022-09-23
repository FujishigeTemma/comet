import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center py-8">
      <div className="max-w-3xl">
        <h1>Home</h1>
        <a onClick={() => navigate('/comics/comicId/volumes/metrics')}>volume metrics</a>
      </div>
    </div>
  )
}
