import { Head } from 'vite-react-ssg'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Swatch } from '../components/ui/Swatch'
import { TagList } from '../components/ui/Tag'
import { TokenCaption } from '../components/ui/TokenCaption'
import { CaseStudyMeta } from '../components/project/CaseStudyMeta'
import { DecisionCard } from '../components/project/DecisionCard'
import { ProjectCard } from '../components/project/ProjectCard'

const colors = [
  { name: 'Cream', token: '--color-cream', hex: '#FBF6EE', note: 'Page background.' },
  { name: 'Sand', token: '--color-sand', hex: '#F3E6D6', note: 'Cards, bands, tags.' },
  { name: 'Ink', token: '--color-ink', hex: '#2B2320', note: 'Body text and headings. About 14:1 on cream.' },
  { name: 'Ink soft', token: '--color-ink-soft', hex: '#5E524C', note: 'Secondary text. About 7:1 on cream.' },
  { name: 'Accent', token: '--color-accent', hex: '#B04A30', note: 'Buttons and links on cream. About 5:1.' },
  { name: 'Accent deep', token: '--color-accent-deep', hex: '#8F3A24', note: 'Accent text on sand, hover, focus ring.' },
  { name: 'Sage', token: '--color-sage', hex: '#6F8F72', note: 'Decoration only, never text.' },
  { name: 'Line', token: '--color-line', hex: '#E3D5C3', note: 'Borders and dividers only.' },
] as const

const spaces = [
  ['--space-1', 4], ['--space-2', 8], ['--space-3', 16], ['--space-4', 24],
  ['--space-5', 32], ['--space-6', 48], ['--space-7', 64], ['--space-8', 96],
] as const

const grid = (min: string) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`,
  gap: 'var(--space-4)',
}) as const

const section = { paddingBlock: 'var(--space-7)', borderBottom: '1px solid var(--color-line)' } as const

/** Hidden living style guide. Not linked from the site, not indexed. */
export function StyleGuide() {
  return (
    <>
      <Head>
        <title>Style guide | Sarah</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="container" style={{ paddingBlock: 'var(--space-7)', borderBottom: '1px solid var(--color-line)' }}>
        <p className="label">Living style guide</p>
        <h1 style={{ marginBlock: 'var(--space-2)' }}>Warm Studio</h1>
        <p style={{ fontSize: 'var(--text-lead)', color: 'var(--color-ink-soft)', maxWidth: 'var(--reading-width)' }}>
          Every piece below is the real component this site is built from, reading the same tokens as the brand guide.
        </p>
      </div>

      <section className="container" style={section}>
        <SectionHeader label="01 · Color" title="Color tokens" />
        <div style={grid('220px')}>
          {colors.map((c) => <Swatch key={c.token} {...c} />)}
        </div>
      </section>

      <section className="container" style={section}>
        <SectionHeader label="02 · Typography" title="Type" />
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div><TokenCaption>H1 · Young Serif 400 · --text-h1</TokenCaption><h1>I design systems that make software feel human</h1></div>
          <div><TokenCaption>H2 · --text-h2</TokenCaption><h2>Selected work</h2></div>
          <div><TokenCaption>H3 · --text-h3</TokenCaption><h3>Key decisions</h3></div>
          <div><TokenCaption>Lead · DM Sans 400 · --text-lead</TokenCaption><p style={{ fontSize: 'var(--text-lead)' }}>A short intro under a heading, one or two sentences.</p></div>
          <div><TokenCaption>Body · DM Sans 400 · --text-body</TokenCaption><p style={{ maxWidth: 'var(--reading-width)' }}>Most of the site is body text. Keep paragraphs to three or four lines, and keep the reading column narrow so it's easy to skim.</p></div>
          <div><TokenCaption>Label · JetBrains Mono 500 · .label</TokenCaption><p className="label">Case study 01 · --color-accent</p></div>
        </div>
      </section>

      <section className="container" style={section}>
        <SectionHeader label="03 · Spacing" title="An 8px grid" />
        <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
          {spaces.map(([token, px]) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: px, height: 16, background: 'var(--color-accent)' }} aria-hidden="true" />
              <TokenCaption>{`${token} · ${px}px`}</TokenCaption>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={section}>
        <SectionHeader label="04 · Components" title="Buttons, tags, cards" />
        <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
          <div>
            <TokenCaption>Button · primary, secondary, link</TokenCaption>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center', marginTop: 'var(--space-2)' }}>
              <Button to="/">See my work</Button>
              <Button variant="secondary" to="/">Get in touch</Button>
              <a href="/">Read the process →</a>
            </div>
          </div>
          <div>
            <TokenCaption>Tags</TokenCaption>
            <div style={{ marginTop: 'var(--space-2)' }}><TagList items={['Design system', 'React Native', 'Self-initiated']} /></div>
          </div>
          <div>
            <TokenCaption>Card</TokenCaption>
            <div style={{ marginTop: 'var(--space-2)', maxWidth: 420 }}>
              <Card><h3>Plain card</h3><p style={{ color: 'var(--color-ink-soft)' }}>A sand surface with a 16px radius.</p></Card>
            </div>
          </div>
          <div>
            <TokenCaption>Project card (whole card is one link)</TokenCaption>
            <div style={{ marginTop: 'var(--space-2)', maxWidth: 420 }}>
              <ProjectCard
                kicker="01 · Designed & built"
                title="Foxed"
                summary="One line on the problem, not a description of the screens."
                tags={['Product design', 'Design system']}
                to="/"
              />
            </div>
          </div>
          <div>
            <TokenCaption>Decision card</TokenCaption>
            <div style={{ marginTop: 'var(--space-2)', maxWidth: 420 }}>
              <DecisionCard decision="What I chose" options="What I weighed" why="The reason, in one sentence" />
            </div>
          </div>
          <div>
            <TokenCaption>Case study meta</TokenCaption>
            <div style={{ marginTop: 'var(--space-2)' }}>
              <CaseStudyMeta role="Designer & developer" timeline="[Timeline]" tools="Figma, React Native" deliverables="App, design system" />
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBlock: 'var(--space-7)' }}>
        <SectionHeader label="05 · Layout" title="Header and footer">
          The header and footer on this page are the live ones. Resize the window below 720px to see the mobile menu, and tab through to check the focus ring.
        </SectionHeader>
      </section>
    </>
  )
}
