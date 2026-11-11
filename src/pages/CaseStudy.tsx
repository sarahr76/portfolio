import { Head } from 'vite-react-ssg'
import { Link, useParams } from 'react-router-dom'
import { getCaseStudy } from '../content/caseStudies'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Shot } from '../components/ui/Shot'
import { ShotGroup } from '../components/ui/ShotGroup'
import { Swatch } from '../components/ui/Swatch'
import { CaseFile } from '../components/project/CaseFile'
import { CaseStudyMeta } from '../components/project/CaseStudyMeta'
import { StatStrip } from '../components/project/StatStrip'
import { NotFound } from './NotFound'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import styles from './CaseStudy.module.css'

const tocAll = [
  ['problem', 'Problem'],
  ['system', 'Design system'],
  ['decisions', 'Key decisions'],
  ['process', 'Process'],
  ['outcomes', 'Outcomes'],
] as const

export function CaseStudy() {
  const { slug } = useParams()
  const cs = getCaseStudy(slug)
  if (!cs) return <NotFound />

  // Text-only pages have no design system section, so the nav and numbering adapt.
  const toc = tocAll.filter(([id]) => id !== 'system' || cs.system)
  const num = (id: string) => String(toc.findIndex(([t]) => t === id) + 1).padStart(2, '0')

  const tocLinks = toc.map(([id, label]) => (
    <li key={id}><a href={`#${id}`}>{label}</a></li>
  ))

  return (
    <article>
      <Head>
        <title>{`${cs.title} case study | Sarah Reilly`}</title>
        <meta name="description" content={cs.description} />
        {cs.draft && <meta name="robots" content="noindex" />}
        <meta property="og:title" content={`${cs.title}: ${cs.tagline}`} />
        <meta property="og:description" content={cs.description} />
      </Head>

      <header className={`container ${styles.header}`}>
        <p className="label">{cs.kicker}</p>
        <h1 style={{ marginTop: 'var(--space-2)' }}>{cs.title}</h1>
        <p className={styles.tagline}>{cs.tagline}</p>
        <p className={styles.dek}>{cs.dek}</p>
        {cs.liveSite && (
          <div className={styles.live}>
            <Button href={cs.liveSite.href} external>{cs.liveSite.label}</Button>
            {cs.liveSite.note && <p>{cs.liveSite.note}</p>}
          </div>
        )}
        <CaseStudyMeta {...cs.meta} />
        {cs.stats && <StatStrip stats={cs.stats} />}
      </header>

      {cs.hero && <div className={`container ${styles.hero}`}><Shot {...cs.hero} /></div>}

      <section className={styles.band} aria-label="The 30-second version">
        <Reveal className="container">
          <p className="label" style={{ marginBottom: 'var(--space-3)' }}>The 30-second version</p>
          <div className={styles.three}>
            <div><h3>The problem</h3><p>{cs.summary.problem}</p></div>
            <div><h3>What I did</h3><p>{cs.summary.did}</p></div>
            <div><h3>The result</h3><p>{cs.summary.result}</p></div>
          </div>
        </Reveal>
      </section>

      <div className={`container ${styles.layout}`}>
        <aside aria-label="On this page">
          <details className={styles.tocMobile}>
            <summary>Jump to section <span aria-hidden="true">▾</span></summary>
            <ul>{tocLinks}</ul>
          </details>
          <nav className={styles.tocDesktop} aria-label="On this page">
            <p className="label">On this page</p>
            <ul className={styles.tocList}>{tocLinks}</ul>
          </nav>
        </aside>

        <div className={styles.content}>
          <Reveal as="section" id="problem">
            <SectionHeader label={`${num('problem')} · The problem`} title={cs.problem.heading} />
            <div className={styles.prose}>
              {cs.problem.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              {cs.problem.constraintsIntro && <p><strong>{cs.problem.constraintsIntro}</strong></p>}
            </div>
            {cs.problem.constraints && (
              <ul className={styles.constraints}>
                {cs.problem.constraints.map((c) => <li key={c}>{c}</li>)}
              </ul>
            )}
            {cs.problem.shots && (
              <ShotGroup shots={cs.problem.shots} />
            )}
          </Reveal>

          {cs.system && (
          <Reveal as="section" id="system">
            <SectionHeader label={`${num('system')} · Design system`} title={cs.system.title ?? 'A system decided before a single screen was drawn'}>
              {cs.system.intro}
            </SectionHeader>
            <div className={styles.exhibits}>
              <Card outline>
                <p className="label" style={{ marginBottom: 'var(--space-3)' }}>{cs.system.paletteTitle}</p>
                <div className={styles.swatches}>
                  {cs.system.palette.map((c) => <Swatch key={c.name} {...c} />)}
                </div>
              </Card>
              <Card outline>
                <p className="label" style={{ marginBottom: 'var(--space-3)' }}>{cs.system.type.title}</p>
                <dl className={styles.defs}>
                  {cs.system.type.rows.map((r) => (
                    <div key={r.role}><dt>{r.role}</dt><dd>{r.spec}</dd></div>
                  ))}
                </dl>
              </Card>
              <Card outline>
                <p className="label" style={{ marginBottom: 'var(--space-3)' }}>Voice</p>
                <blockquote className={styles.voice}>{cs.system.voice.quote}</blockquote>
                <ul className={styles.lines}>
                  {cs.system.voice.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </Card>
              <Card outline>
                <p className="label" style={{ marginBottom: 'var(--space-3)' }}>{cs.system.rules.title}</p>
                <ul className={styles.rules}>
                  {cs.system.rules.items.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </Card>
            </div>
          </Reveal>
          )}

          <Reveal as="section" id="decisions">
            <SectionHeader label={`${num('decisions')} · Key decisions`} title={cs.decisions.heading}>
              {cs.decisions.intro}
            </SectionHeader>
            {cs.decisions.items.map((d, i) => <CaseFile key={d.title} n={i + 1} decision={d} />)}
            {cs.decisions.gallery && (
              <ShotGroup shots={cs.decisions.gallery} />
            )}
          </Reveal>

          <Reveal as="section" id="process">
            <SectionHeader label={`${num('process')} · Process`} title={cs.process.heading}>{cs.process.intro}</SectionHeader>
            <ol className={styles.steps}>
              {cs.process.items.map((s) => (
                <li key={s.title}><div><h3>{s.title}</h3><p>{s.text}</p></div></li>
              ))}
            </ol>
          </Reveal>

          <Reveal as="section" id="outcomes">
            <SectionHeader label={`${num('outcomes')} · Outcomes`} title={cs.outcomes.heading} />
            {cs.outcomes.shipped && (
              <ul className={styles.shipped}>
                {cs.outcomes.shipped.map((s) => (
                  <li key={s.title}><b>{s.title}</b>{s.text}</li>
                ))}
              </ul>
            )}
            <p className={styles.honest}><strong>Honestly: </strong>{cs.outcomes.honest}</p>
          </Reveal>
        </div>
      </div>

      <section className={styles.next} aria-label="Next project">
        <div className="container">
          <p className="label">Next project</p>
          <p style={{ marginTop: 'var(--space-2)' }}>
            <Link viewTransition className={styles.nextLink} to={cs.next.to}>{cs.next.title} →</Link>
          </p>
        </div>
      </section>
    </article>
  )
}
