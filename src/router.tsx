import { createBrowserRouter } from 'react-router-dom'

import { GazeTracker } from '/@/pages/GazeTracker'
import { Home } from '/@/pages/Home'
import { VolumeMetrics } from '/@/pages/VolumeMetrics'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/comics/:comicId/volumes/metrics',
    element: <VolumeMetrics />
  },
  {
    path: '/comics/:comicId/volumes/:volumeId/pages/metrics',
    element: <Home />
  },
  {
    path: '/comics/:comicId/volumes/:volumeId/pages/:pageId/metrics',
    element: <Home />
  },
  {
    path: '/tracker',
    element: <GazeTracker />
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
])
