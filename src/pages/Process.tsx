import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { process } from '../content/process'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'
import styles from './Process.module.css'

export function Process() {
  return (
    <>
      <Head>
        <title>Process & tools | Sarah Reilly</title>
        <meta property="og:title" content="How Sarah Reilly works" />
        <meta property="og:description" content="How Sarah Reilly works: from understanding a problem to a documented design system and shipped product, with the tools she uses." />
        <meta
          name="description"
          content="How Sarah Reilly works: from understanding a problem to a documented design system and shipped product, with the tools she uses."
        />
      </Head>

      <header className={`container ${styles.header}`}>
        <p className="label">Process &amp; tools</p>
        <h1 style={{ marginTop: 'var(--space-2)' }}>How I work</h1>
        <p className={styles.lead}>{process.lead}</p>
      </header>

      <section className={styles.section}>
        <div className="container">
          <SectionHeader label="01 · The process" title="Six stages, and why each one is there" />
          <ol className={styles.stages}>
            {process.stages.map((s) => (
              <li key={s.title} className={styles.stage}>
                <h3>{s.title}</h3>
                <p>{s.what}</p>
                <p className={styles.why}><b>Why</b>{s.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`}>
        <div className="container">
          <SectionHeader label="02 · In practice" title="Where this shows up">
            Past employer work, kept anonymous. The visuals are my own redrawn illustrations, not the real product.
          </SectionHeader>
          <div className={`${styles.grid} ${styles.grid2}`}>
            {process.inPractice.map((p) => (
              <Card key={p.to}>
                <Link viewTransition className={styles.cardLink} to={p.to}>
                  <h3>{p.title} →</h3>
                  <p style={{ color: 'var(--color-ink-soft)' }}>{p.text}</p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <SectionHeader label="03 · Design systems" title="How I build and document them" />
          <div className={`${styles.grid} ${styles.grid3}`}>
            {process.systems.map((s) => (
              <Card key={s.title} outline>
                <h3>{s.title}</h3>
                <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-ink-soft)' }}>{s.text}</p>
              </Card>
            ))}
          </div>
          <p style={{ marginTop: 'var(--space-4)' }}>
            See it for real: <Link viewTransition to="/style">this site’s own style guide →</Link>
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`}>
        <div className="container">
          <SectionHeader label="04 · AI in my workflow" title="Faster, with the judgment still mine" />
          <div className={styles.prose}>
            {process.ai.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <SectionHeader label="05 · Tools" title="What I work with" />
          <dl className={styles.defs}>
            {process.tools.map((t) => (
              <div key={t.group}><dt>{t.group}</dt><dd>{t.items}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band} ${styles.cta}`}>
        <div className="container">
          <h2>Want to see it in action?</h2>
          <div className={styles.actions}>
            <Button to="/work/foxed">Read the Foxed case study</Button>
            <Button variant="secondary" to="/about#contact">Get in touch</Button>
          </div>
        </div>
      </section>
    </>
  )
}
