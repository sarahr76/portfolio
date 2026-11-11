import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { site } from '../../content/site'
import { Header } from './Header'
import { Footer } from './Footer'

/** Scroll to #hash targets (React Router doesn't do this by itself). */
function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export function Layout() {
  const { pathname } = useLocation()
  // The live site serves every page with a trailing slash (/about/), so the canonical does too.
  const path = pathname.replace(/\/+$/, '')
  const pageUrl = `${site.url}${path}/`
  return (
    <>
      {/* Site-wide defaults. Each page overrides the title and description. */}
      <Head>
        <title>{site.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.title} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
      </Head>
      <ScrollToHash />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
