import { createBrowserRouter } from 'react-router-dom'

import { PageWrapper } from './pages/PageWrapper'
import { Volume } from './pages/Volume'
import { Comic } from '/@/pages/Comic'
import { ComicMetrics } from '/@/pages/ComicMetrics'
import { Comics } from '/@/pages/Comics'
import { Home } from '/@/pages/Home'
import { Page } from '/@/pages/Page'
import { VolumeMetrics } from '/@/pages/VolumeMetrics'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageWrapper>
        <Home />
      </PageWrapper>
    )
  },
  {
    path: '/comics',
    element: (
      <PageWrapper>
        <Comics />
      </PageWrapper>
    )
  },
  {
    path: '/comics/:comicId',
    element: (
      <PageWrapper>
        <Comic />
      </PageWrapper>
    )
  },
  {
    path: '/comics/:comicId/volumes/:volumeId',
    element: (
      <PageWrapper>
        <Volume />
      </PageWrapper>
    )
  },
  {
    path: '/comics/:comicId/metrics',
    element: (
      <PageWrapper>
        <ComicMetrics />
      </PageWrapper>
    )
  },
  {
    path: '/comics/:comicId/volumes/:volumeId/metrics',
    element: (
      <PageWrapper>
        <VolumeMetrics />
      </PageWrapper>
    )
  },
  {
    path: '/comics/:comicId/volumes/:volumeId/pages/:pageId',
    element: (
      <PageWrapper>
        <Page />
      </PageWrapper>
    )
  },
  {
    path: '/comics/:comicId/volumes/:volumeId/pages/:pageId/metrics',
    element: (
      <PageWrapper>
        <Home />
      </PageWrapper>
    )
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
])
