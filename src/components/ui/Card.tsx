import type { ReactNode } from 'react'
import styles from './Card.module.css'
import { useReveal } from './useReveal'

export function Card({ children, outline = false }: { children: ReactNode; outline?: boolean }) {
  const reveal = useReveal<HTMLDivElement>()
  return <div ref={reveal} className={`${styles.card} ${outline ? styles.outline : ''}`}>{children}</div>
}
