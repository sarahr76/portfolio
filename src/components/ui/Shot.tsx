import styles from './Shot.module.css'

type Props = { label: string; src?: string; alt?: string; caption?: string; phone?: boolean }

/** A real screenshot when `src` is set; otherwise a labeled placeholder showing what to add. */
export function Shot({ label, src, alt = '', caption, phone = false }: Props) {
  if (src) {
    const img = (
      <img
        className={`${styles.img} ${phone ? styles.imgPhone : ''}`}
        src={src}
        alt={alt}
        width={phone ? 640 : undefined}
        height={phone ? 1299 : undefined}
        loading="lazy"
      />
    )
    return caption ? (
      <figure className={styles.figure}>
        {img}
        <figcaption className={styles.caption}>{caption}</figcaption>
      </figure>
    ) : (
      img
    )
  }
  return (
    <div className={`${styles.shot} ${phone ? styles.phone : ''}`} role="img" aria-label={`Placeholder. ${label}`}>
      <span>{label}</span>
    </div>
  )
}
