import { RouterProvider } from 'react-router-dom'

import { router } from '/@/router'

export const App = () => {
  return (
    <div className="h-screen break-words font-mplus text-neutral">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
