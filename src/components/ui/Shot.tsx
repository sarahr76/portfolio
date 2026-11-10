import styles from './Shot.module.css'

type Props = {
  label: string
  src?: string
  /** Narrow-screen crop, swapped in below 720px. */
  srcMobile?: string
  alt?: string
  caption?: string
  phone?: boolean
  /** Above-the-fold image: load immediately instead of lazily. */
  priority?: boolean
  width?: number
  height?: number
}

/** A real screenshot when `src` is set; otherwise a labeled placeholder showing what to add. */
export function Shot({ label, src, srcMobile, alt = '', caption, phone = false, priority = false, width, height }: Props) {
  if (src) {
    const img = (
      <img
        className={`${styles.img} ${phone ? styles.imgPhone : ''}`}
        src={src}
        alt={alt}
        width={phone ? 640 : width}
        height={phone ? 1299 : height}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
      />
    )
    const media = srcMobile ? (
      <picture>
        <source media="(max-width: 719px)" srcSet={srcMobile} />
        {img}
      </picture>
    ) : (
      img
    )
    return caption ? (
      <figure className={styles.figure}>
        {media}
        <figcaption className={styles.caption}>{caption}</figcaption>
      </figure>
    ) : (
      media
    )
  }
  return (
    <div className={`${styles.shot} ${phone ? styles.phone : ''}`} role="img" aria-label={`Placeholder. ${label}`}>
      <span>{label}</span>
    </div>
  )
}
