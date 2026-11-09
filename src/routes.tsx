import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { StyleGuide } from './pages/StyleGuide'
import { CaseStudy } from './pages/CaseStudy'
import { About } from './pages/About'
import { caseStudies } from './content/caseStudies'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'style', element: <StyleGuide /> },
      {
        path: 'work/:slug',
        element: <CaseStudy />,
        // One prerendered page per case study that has content.
        getStaticPaths: () => caseStudies.map((c) => `work/${c.slug}`),
      },
      // Prerendered at /404/ and copied to /404.html after build (see scripts/copy-404.mjs).
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
