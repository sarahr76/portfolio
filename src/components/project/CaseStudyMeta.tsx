import styles from './CaseStudyMeta.module.css'

type Props = { role: string; timeline: string; tools: string; deliverables: string }

/** The 4-column facts strip at the top of every case study (2x2 on mobile). */
export function CaseStudyMeta({ role, timeline, tools, deliverables }: Props) {
  const items = [
    ['Role', role],
    ['Timeline', timeline],
    ['Tools', tools],
    ['Deliverables', deliverables],
  ]
  return (
    <dl className={styles.meta}>
      {items.map(([term, text]) => (
        <div key={term}>
          <dt className="label">{term}</dt>
          <dd>{text}</dd>
        </div>
      ))}
    </dl>
  )
}
