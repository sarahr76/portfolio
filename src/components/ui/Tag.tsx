import type { ReactNode } from 'react'
import styles from './Tag.module.css'

/** Describes a project. Never clickable, never decorative. */
export function Tag({ children, onSand = false }: { children: ReactNode; onSand?: boolean }) {
  return <span className={`${styles.tag} ${onSand ? styles.onSand : ''}`}>{children}</span>
}

export function TagList({ items, onSand = false }: { items: readonly string[]; onSand?: boolean }) {
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map((t) => (
        <li key={t}><Tag onSand={onSand}>{t}</Tag></li>
      ))}
    </ul>
  )
}
