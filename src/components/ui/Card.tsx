import type { ReactNode } from 'react'
import styles from './Card.module.css'

export function Card({ children, outline = false }: { children: ReactNode; outline?: boolean }) {
  return <div className={`${styles.card} ${outline ? styles.outline : ''}`}>{children}</div>
}
