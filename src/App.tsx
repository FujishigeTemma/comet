import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import { Home } from '/@/pages/Home'

export const App = () => {
  return (
    <div className="h-screen text-primary break-words">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
