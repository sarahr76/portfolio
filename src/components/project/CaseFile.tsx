import type { Decision } from '../../content/caseStudies'
import { ShotGroup } from '../ui/ShotGroup'
import styles from './CaseFile.module.css'

/** One key decision: problem, approach, outcome. The part to rehearse for interviews. */
export function CaseFile({ n, decision }: { n: number; decision: Decision }) {
  const blocks = [
    ['Problem', decision.problem],
    ['Approach', decision.approach],
    ['Outcome', decision.outcome],
  ] as const
  const shots = decision.shots ?? (decision.shot ? [decision.shot] : [])
  return (
    <article className={styles.file}>
      <div className={styles.num} aria-hidden="true">{String(n).padStart(2, '0')}</div>
      <div>
        <h3>{decision.title}</h3>
        <p className={styles.tag}>{decision.tag}</p>
        {blocks.map(([k, text]) => (
          <div key={k} className={styles.block}>
            <p className="label" style={{ marginBottom: 4 }}>{k}</p>
            <p>{text}</p>
          </div>
        ))}
        {shots.length > 0 && (
          <ShotGroup shots={shots} />
        )}
      </div>
    </article>
  )
}
