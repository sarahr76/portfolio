import type { ComponentProps } from 'react'
import { Shot } from './Shot'
import styles from './ShotGroup.module.css'

type ShotProps = ComponentProps<typeof Shot>

/**
 * A set of screens laid out evenly: 2 or 3 across, 2 x 2 for four, 3 across for five or six.
 * Never leaves one orphan on its own row. On phones, three or more become a swipeable row.
 * Landscape (`wide`) screens stack full width instead.
 */
export function ShotGroup({ shots, phone = true, className = '' }: { shots: readonly ShotProps[]; phone?: boolean; className?: string }) {
  if (shots.length === 0) return null
  const stacked = shots.some((s) => s.wide)
  const n = stacked ? 1 : Math.min(shots.length, 6)
  // On phones three or more screens scroll sideways, so that row needs a keyboard stop and a name.
  const scrolls = !stacked && n >= 3
  const scrollProps = scrolls ? { tabIndex: 0, role: 'group', 'aria-label': 'Screens. Scroll sideways to see more.' } : {}
  return (
    <div className={`${styles.group} ${className}`} data-n={n} data-stacked={stacked || undefined} {...scrollProps}>
      {shots.map((s) => (
        <Shot key={s.label} {...s} phone={stacked ? false : phone && !s.wide} />
      ))}
    </div>
  )
}
