import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'cards',
        lazy: async () => ({
          Component: (await import('./pages/Cards')).default
        })
      },
      {
        path: 'card/:cardId',
        lazy: async () => ({
          Component: (await import('./pages/CardDetail')).default
        })
      },
      {
        path: 'rankings',
        lazy: async () => ({
          Component: (await import('./pages/Rankings')).default
        })
      },
      {
        path: '*',
        lazy: async () => ({
          Component: (await import('./pages/NotFound')).default
        })
      }
    ]
  }
], {
  basename: import.meta.env.BASE_URL // ← vite.config.ts の base と連動
})


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
