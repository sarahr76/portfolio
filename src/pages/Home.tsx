import { useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { projects } from '../content/projects'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
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
  ['--font-display', null],
] as const

const approach = [
  { title: 'Understand', text: 'I learn the domain and the people first, then write the problem down so a team can build against it.' },
  { title: 'Systemize', text: 'Tokens, components and written rules get decided early, so every screen builds on the same foundation.' },
  { title: 'Build & refine', text: 'I can build what I design, and I use it for real before it ships.' },
] as const

const smallProjects = projects.filter((p) => p.group === 'small' && !p.unlisted)

// Plays the hero entrance on the first visit to Home only; later trips back skip it.
let introPlayed = false

export function Home() {
  const [intro] = useState(() => !introPlayed)
  useEffect(() => {
    introPlayed = true
  }, [])
  return (
    <>
      <Head>
        <title>Sarah Reilly | UX/UI designer who builds design systems</title>
        <meta
          name="description"
          content="Portfolio of Sarah Reilly, a UX/UI designer with a front-end background who designs and builds design systems."
        />
        <meta property="og:title" content="Sarah Reilly | UX/UI designer who builds design systems" />
        <meta property="og:description" content="Portfolio of Sarah Reilly, a UX/UI designer with a front-end background who designs and builds design systems." />
      </Head>

      {/* 1. Hero */}
      <div className="container">
        <section className={`${styles.hero} ${intro ? styles.intro : ''}`} aria-labelledby="hero-title">
          <div className={styles.heroText}>
            <h1 id="hero-title">I design systems that make software feel human.</h1>
            <p className={styles.lead}>I’m a UX/UI designer with a front-end developer’s background. I design the system first, then build it, so what ships matches what was drawn.</p>
            <div className={styles.actions}>
              <Button to="/#work">See my work</Button>
              <Button variant="secondary" to="/about#contact">Get in touch</Button>
            </div>
            <p className={styles.status}>UX/UI designer · open to remote roles, full-time or part-time</p>
          </div>
          <div className={styles.portrait}>
            <img src="/desk-illustration.svg" width={400} height={400} alt="Illustration of a designer’s desk: a laptop showing a color palette, a mug, a plant and a sketchbook." />
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

        </div>
      </section>

      {/* 3. How I work, with a peek at the system */}
      <section className={`${styles.section} ${styles.band}`}>
        <Reveal className="container">
          <SectionHeader label="Approach" title="How I work" />
          <div className={styles.three}>
            {approach.map((a) => (
              <Card key={a.title} outline>
                <h3>{a.title}</h3>
                <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-ink-soft)' }}>{a.text}</p>
              </Card>
            ))}
          </div>
          <h3 id="peek-title" style={{ marginTop: 'var(--space-6)' }}>A peek at the system behind it</h3>
          <div className={styles.swatches}>
            {peek.map(([token, hex], i) => (
              <Reveal key={token} className={`${styles.swatch} reveal-pop`} style={{ transitionDelay: `${i * 70}ms` }}>
                <div
                  className={styles.chip}
                  style={hex ? { background: hex } : { background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-hidden="true"
                >
                  {!hex && <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', lineHeight: 1, color: 'var(--color-ink)' }}>Aa</span>}
                </div>
                <TokenCaption>{token}</TokenCaption>
              </Reveal>
            ))}
          </div>
          <Button variant="secondary" to="/process">Read my full process →</Button>
        </Reveal>
      </section>

      {/* 4. More work */}
      <section className={styles.section} aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" style={{ marginBottom: 'var(--space-5)' }}>More work</h2>
          <h3 style={{ margin: '0 0 var(--space-1)' }}>Professional work</h3>
          <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-ink-soft)', maxWidth: 'var(--reading-width)' }}>
            Past employer projects, kept anonymous. The visuals are my own redrawn illustrations, not the real product.
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

          {smallProjects.length > 0 && <h3 style={{ margin: 'var(--space-6) 0 var(--space-4)' }}>Smaller projects</h3>}
          <div className={styles.smallGrid}>
            {smallProjects.map((p) => (
              <ProjectCard
                compact
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
        </div>
      </section>


      {/* 6. Closing call to action */}
      <section className={`${styles.section} ${styles.band} ${styles.cta}`} aria-labelledby="cta-title">
        <Reveal className="container">
          <h2 id="cta-title">Let's talk</h2>
          <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-ink-soft)' }}>
            Looking for a remote UX/UI design role, full-time or part-time.
          </p>
          <div className={styles.actions}>
            <Button to="/about#contact">Email me</Button>
            <Button variant="secondary" href="/resume.pdf" external kind="PDF">View résumé</Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
