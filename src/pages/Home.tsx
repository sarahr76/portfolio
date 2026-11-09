import { Head } from 'vite-react-ssg'

export function Home() {
  return (
    <>
      <Head>
        <title>Sarah | UX/UI designer who builds design systems</title>
        <meta
          name="description"
          content="Portfolio of Sarah, a senior UX/UI designer who designs and builds design systems."
        />
      </Head>
      <div className="container" style={{ paddingBlock: 'var(--space-8)' }}>
        <p className="label">Work in progress</p>
        <h1 style={{ marginBlock: 'var(--space-3)' }}>Portfolio coming soon</h1>
        <p style={{ fontSize: 'var(--text-lead)', color: 'var(--color-ink-soft)', maxWidth: 'var(--reading-width)' }}>
          Warm Studio tokens, fonts and prerendering are wired up. Pages come next.
        </p>
      </div>
    </>
  )
}
