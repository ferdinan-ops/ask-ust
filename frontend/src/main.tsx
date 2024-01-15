import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
