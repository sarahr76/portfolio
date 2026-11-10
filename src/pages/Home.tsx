import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { projects } from '../content/projects'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'
import { TokenCaption } from '../components/ui/TokenCaption'
import { ProjectCard } from '../components/project/ProjectCard'
import styles from './Home.module.css'

const peek = [
  ['--color-cream', '#FBF6EE'],
  ['--color-sand', '#F3E6D6'],
  ['--color-accent', '#B04A30'],
  ['--color-ink', '#2B2320'],
  ['--color-sage', '#6F8F72'],
  ['--space-4', null],
] as const

const approach = [
  { title: 'Understand', text: 'I learn the domain and the people first, then write the problem down so a team can build against it.' },
  { title: 'Systemize', text: 'Tokens, components and written rules get decided early, so every screen builds on the same foundation.' },
  { title: 'Build & refine', text: 'I can build what I design, and I use it for real before it ships.' },
] as const

export function Home() {
  return (
    <>
      <Head>
        <title>Sarah Reilly | UX/UI designer who builds design systems</title>
        <meta
          name="description"
          content="Portfolio of Sarah Reilly, a UX/UI designer who designs and builds design systems."
        />
        <meta property="og:title" content="Sarah Reilly | UX/UI designer who builds design systems" />
      </Head>

      {/* 1. Hero */}
      <div className="container">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroText}>
            <h1 id="hero-title">I design systems that make software feel human.</h1>
            <p className={styles.lead}>[Draft: one or two sentences on what you do and for whom.]</p>
            <div className={styles.actions}>
              <Button to="/#work">See my work</Button>
              <Button variant="secondary" to="/about#contact">Get in touch</Button>
            </div>
            <p className={styles.status}>UX/UI designer · open to remote roles, full-time or part-time</p>
          </div>
          <div className={styles.portrait} role="img" aria-label="Placeholder for a portrait photo">
            Photo goes here
          </div>
        </section>
      </div>

      {/* 2. Selected work */}
      <section id="work" className={styles.section} aria-labelledby="work-title">
        <div className="container">
          <h2 id="work-title" style={{ marginBottom: 'var(--space-5)' }}>Selected work</h2>
          <div className={styles.workGrid}>
            {projects.filter((p) => p.group === 'selected').map((p) => (
              <ProjectCard
                key={p.slug}
                kicker={p.kicker}
                title={p.title}
                summary={p.summary}
                tags={p.tags}
                to={`/work/${p.slug}`}
                imageSrc={p.imageSrc}
                imageSrcMobile={p.imageSrcMobile}
                imageAlt={p.imageAlt}
              />
            ))}
          </div>

          <h3 style={{ margin: 'var(--space-6) 0 var(--space-1)' }}>Professional work</h3>
          <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-ink-soft)', maxWidth: 'var(--reading-width)' }}>
            Past employer projects, shared as text only and kept anonymous.
          </p>
          <div className={styles.proGrid}>
            {projects.filter((p) => p.group === 'professional').map((p) => (
              <ProjectCard
                key={p.slug}
                textOnly
                kicker={p.kicker}
                title={p.title}
                summary={p.summary}
                tags={p.tags}
                to={`/work/${p.slug}`}
                imageSrc={p.imageSrc}
                imageSrcMobile={p.imageSrcMobile}
                imageAlt={p.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. System peek */}
      <section className={`${styles.section} ${styles.band}`} aria-labelledby="peek-title">
        <div className="container">
          <h2 id="peek-title">A peek at how I build systems</h2>
          <div className={styles.swatches}>
            {peek.map(([token, hex]) => (
              <div key={token} className={styles.swatch}>
                <div
                  className={styles.chip}
                  style={hex ? { background: hex } : { background: 'var(--color-cream)', display: 'flex', alignItems: 'center', padding: 'var(--space-4)' }}
                  aria-hidden="true"
                >
                  {!hex && <div style={{ width: 'var(--space-4)', height: 16, background: 'var(--color-accent)' }} />}
                </div>
                <TokenCaption>{token}</TokenCaption>
              </div>
            ))}
          </div>
          <Button variant="secondary" to="/process">See the process →</Button>
        </div>
      </section>

      {/* 4. How I work */}
      <section className={styles.section}>
        <div className="container">
          <SectionHeader label="Approach" title="How I work" />
          <div className={styles.three}>
            {approach.map((a) => (
              <Card key={a.title} outline>
                <h3>{a.title}</h3>
                <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-ink-soft)' }}>{a.text}</p>
              </Card>
            ))}
          </div>
          <p style={{ marginTop: 'var(--space-4)' }}><Link to="/process">Read my full process →</Link></p>
        </div>
      </section>

      {/* 5. About teaser */}
      <section className={styles.section} aria-labelledby="about-title">
        <div className={`container ${styles.about}`}>
          <div className={styles.avatar} role="img" aria-label="Placeholder for a small photo">Small photo</div>
          <div>
            <h2 id="about-title">A little about me</h2>
            <p style={{ marginTop: 'var(--space-2)', maxWidth: 'var(--reading-width)', color: 'var(--color-ink-soft)' }}>
              [Two or three warm sentences: who you are and what you care about.]
            </p>
            <p style={{ marginTop: 'var(--space-3)' }}><Link to="/about">More about me →</Link></p>
          </div>
        </div>
      </section>

      {/* 6. Closing call to action */}
      <section className={`${styles.section} ${styles.band} ${styles.cta}`} aria-labelledby="cta-title">
        <div className="container">
          <h2 id="cta-title">Let's talk</h2>
          <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-ink-soft)' }}>
            Looking for a remote UX/UI design role, full-time or part-time.
          </p>
          <div className={styles.actions}>
            <Button to="/about#contact">Email me</Button>
            <Button variant="secondary" href="/resume.pdf" external kind="PDF">View résumé</Button>
          </div>
        </div>
      </section>
    </>
  )
}
