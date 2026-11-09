import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <>
      <Head><title>Page not found | Sarah Reilly</title></Head>
      <div className="container" style={{ paddingBlock: 'var(--space-8)' }}>
        <p className="label">404</p>
        <h1 style={{ marginBlock: 'var(--space-3)' }}>That page isn't here</h1>
        <p><Link to="/">Back to the home page</Link></p>
      </div>
    </>
  )
}
