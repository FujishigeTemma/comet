import { RouterProvider } from 'react-router-dom'

import { router } from '/@/router'

export const App = () => {
  return (
    <div className="h-screen text-primary break-words">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
