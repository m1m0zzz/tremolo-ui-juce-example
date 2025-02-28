import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@tremolo-ui/react/styles/index.css'
import './index.css'
import App from './App.tsx'

if (import.meta.env.PROD) {
  const html = document.getElementsByTagName('html')[0]
  if (html) {
    html.oncontextmenu = (() => false)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
