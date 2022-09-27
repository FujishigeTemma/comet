import { RouterProvider } from 'react-router-dom'

import { Sidebar } from './components/Nav/Sidebar'
import { router } from '/@/router'

export const App = () => {
  return (
    <div className="h-screen break-words font-mplus">
      <div className="flex">
        <Sidebar />
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
