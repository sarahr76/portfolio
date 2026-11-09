import { Card } from '../ui/Card'

type Props = { decision: string; options: string; why: string }

/** Decision, options, why: the part of a case study to rehearse for interviews. */
export function DecisionCard({ decision, options, why }: Props) {
  const rows = [
    ['Decision', decision, true],
    ['Options', options, false],
    ['Why', why, false],
  ] as const
  return (
    <Card>
      <dl style={{ margin: 0, display: 'grid', gap: 'var(--space-3)' }}>
        {rows.map(([term, text, strong]) => (
          <div key={term}>
            <dt className="label">{term}</dt>
            <dd style={{ margin: '2px 0 0', fontWeight: strong ? 700 : 400, color: strong ? 'inherit' : 'var(--color-ink-soft)' }}>
              {text}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}
