import styles from './Shot.module.css'

type Props = { label: string; src?: string; alt?: string; phone?: boolean }

/** A real screenshot when `src` is set; otherwise a labeled placeholder showing what to add. */
export function Shot({ label, src, alt = '', phone = false }: Props) {
  if (src) {
    return <img className={styles.img} src={src} alt={alt} loading="lazy" />
  }
  return (
    <div className={`${styles.shot} ${phone ? styles.phone : ''}`} role="img" aria-label={`Placeholder. ${label}`}>
      <span>{label}</span>
    </div>
  )
}
