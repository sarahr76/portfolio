import { Outlet } from 'react-router-dom'
import { Head } from 'vite-react-ssg'

export function Layout() {
  return (
    <>
      {/* Site-wide defaults. Each page overrides the title and description. */}
      <Head>
        <title>Sarah | UX/UI designer</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sarah | UX/UI designer" />
      </Head>
      <a className="skip-link" href="#main">Skip to content</a>
      {/* Header and Footer arrive in step 3 (core components) */}
      <main id="main">
        <Outlet />
      </main>
    </>
  )
}
