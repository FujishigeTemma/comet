import { RouterProvider } from 'react-router-dom'

import { router } from '/@/router'

export const App = () => {
  return (
    <div className="h-screen break-words font-mplus">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
