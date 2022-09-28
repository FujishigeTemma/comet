import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { PageWrapper } from './pages/PageWrapper'
import { Volume } from './pages/Volume'
import { Comic } from '/@/pages/Comic'
import { ComicMetrics } from '/@/pages/ComicMetrics'
import { Comics } from '/@/pages/Comics'
import { Page } from '/@/pages/Page'
import { PageHeatmap } from '/@/pages/PageHeatmap'
import { PageMetrics } from '/@/pages/PageMetrics'
import { VolumeMetrics } from '/@/pages/VolumeMetrics'

const GazeTracker = lazy(() => import('/@/pages/GazeTracker'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/comics" />
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
        <PageMetrics />
      </PageWrapper>
    )
  },
  {
    path: '/comics/:comicId/volumes/:volumeId/pages/:pageId/heatmap',
    element: (
      <PageWrapper>
        <PageHeatmap />
      </PageWrapper>
    )
  },
  {
    path: '/comics/:comicId/volumes/:volumeId/pages/:pageId/tracker',
    element: <GazeTracker />
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
])
