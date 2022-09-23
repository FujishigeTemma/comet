import { createBrowserRouter } from 'react-router-dom'

import { Home } from '/@/pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/comics/:',
    element: <a />
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
])
