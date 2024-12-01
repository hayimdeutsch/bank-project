import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WebsiteThemeProvider from './utils/WebsiteThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebsiteThemeProvider>
      <App />
    </WebsiteThemeProvider>
  </StrictMode>,
)
