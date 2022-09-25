import '@fontsource/m-plus-rounded-1c'
import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <RecoilRoot>
      <Suspense>
        <App />
      </Suspense>
    </RecoilRoot>
  </StrictMode>
)
