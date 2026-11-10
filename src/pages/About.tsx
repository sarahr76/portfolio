import { Head } from 'vite-react-ssg'
import { about } from '../content/about'
import { site } from '../content/site'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import styles from './About.module.css'

export function About() {
  return (
    <>
      <Head>
        <title>About | Sarah Reilly</title>
        <meta
          name="description"
          content="Sarah Reilly is a UX/UI designer in Cincinnati, Ohio, who designs and builds design systems. Open to remote roles."
        />
      </Head>

      <div className="container">
        <section className={styles.intro} aria-labelledby="about-title">
          <div className={styles.photo}>
            <img src="/desk-illustration.svg" width={320} height={400} alt="Illustration of a designer’s desk: a laptop showing a color palette, a mug, a plant and a sketchbook." />
          </div>
          <div>
            <h1 id="about-title">Hi, I’m Sarah.</h1>
            <div className={styles.prose}>
              {about.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            <div className={styles.actions}>
              <Button href={site.resume.href} external kind="PDF">View résumé</Button>
              <Button variant="secondary" href={site.linkedin} external>Connect on LinkedIn</Button>
            </div>
          </div>
        </section>
      </div>

      <section className={`${styles.section} ${styles.band}`}>
        <div className="container">
          <p className="label">Looking for</p>
          <h2 style={{ margin: 'var(--space-2) 0 var(--space-4)' }}>What I’m looking for</h2>
          <div className={styles.three}>
            {about.looking.map((l) => (
              <Card key={l.label}>
                <p className="label">{l.label}</p>
                <p style={{ marginTop: 4, fontWeight: 700 }}>{l.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="label">Path</p>
          <h2 style={{ margin: 'var(--space-2) 0 var(--space-5)' }}>My path</h2>
          <ol className={styles.tl}>
            {about.path.map((s) => (
              <li key={s.title}>
                <p className="label" style={{ margin: 0 }}>{s.when}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`}>
        <div className="container">
          <p className="label">Skills</p>
          <h2 style={{ margin: 'var(--space-2) 0 var(--space-4)' }}>What I’m good at</h2>
          <ul className={styles.chips}>
            {about.skills.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <h3 style={{ marginTop: 'var(--space-5)' }}>Education</h3>
          <ul className={styles.edu}>
            {about.education.map((e) => <li key={e}>{e}</li>)}
          </ul>
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <div className="container">
          <p className="label">Contact</p>
          <h2 style={{ margin: 'var(--space-2) 0 0' }}>Let’s talk</h2>
          <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-ink-soft)', maxWidth: 'var(--reading-width)' }}>
            Looking for a remote UX/UI design role, full-time or part-time. The fastest way to reach me is below.
          </p>
          <div className={styles.contactGrid}>
            {site.email && (
              <Card outline>
                <div className={styles.contactCard}>
                  <p className="label">Email</p>
                  <Button href={`mailto:${site.email}`}>{site.email}</Button>
                </div>
              </Card>
            )}
            <Card outline>
              <div className={styles.contactCard}>
                <p className="label">LinkedIn</p>
                <Button variant={site.email ? 'secondary' : 'primary'} href={site.linkedin} external>Open profile</Button>
              </div>
            </Card>
            <Card outline>
              <div className={styles.contactCard}>
                <p className="label">Résumé (PDF)</p>
                <Button variant="secondary" href={site.resume.href} external kind="PDF">Open PDF</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
