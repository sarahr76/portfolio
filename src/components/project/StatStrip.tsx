import styles from './StatStrip.module.css'

export function StatStrip({ stats }: { stats: readonly { value: string; label: string }[] }) {
  return (
    <dl className={styles.strip}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <dd>{s.value}</dd>
          <dt>{s.label}</dt>
        </div>
      ))}
    </dl>
  )
}
