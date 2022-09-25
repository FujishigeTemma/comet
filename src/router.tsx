import { createBrowserRouter } from 'react-router-dom'

import { Volume } from './pages/Volume'
import { Comic } from '/@/pages/Comic'
import { Comics } from '/@/pages/Comics'
import { Home } from '/@/pages/Home'
import { Page } from '/@/pages/Page'
import { VolumeMetrics } from '/@/pages/VolumeMetrics'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/comics',
    element: <Comics />
  },
  {
    path: '/comics/:comicId',
    element: <Comic />
  },
  {
    path: '/comics/:comicId/volumes/:volumeId',
    element: <Volume />
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
    path: '/comics/:comicId/volumes/:volumeId/pages/:pageId',
    element: <Page />
  },
  {
    path: '/comics/:comicId/volumes/:volumeId/pages/:pageId/metrics',
    element: <Home />
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
])
