import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { StyleGuide } from './pages/StyleGuide'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'style', element: <StyleGuide /> },
      // Prerendered at /404/ and copied to /404.html after build (see scripts/copy-404.mjs).
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
