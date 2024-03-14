import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import { QueryProvider, GoogleProvider, SocketProvider } from './components/providers'
import { ThemeProvider } from './components/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <GoogleProvider>
        <QueryProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </QueryProvider>
      </GoogleProvider>
    </SocketProvider>
  </React.StrictMode>
)
