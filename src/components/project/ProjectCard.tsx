import { Link } from 'react-router-dom'
import { TagList } from '../ui/Tag'
import styles from './ProjectCard.module.css'
import { useReveal } from '../ui/useReveal'

type Props = {
  kicker: string
  title: string
  summary: string
  tags: readonly string[]
  to: string
  imageSrc?: string
  imageAlt?: string
  /** Narrow-screen crop, swapped in below 720px. */
  imageSrcMobile?: string
  /** Compact card with no image box, for projects without visuals. */
  textOnly?: boolean
  /** Smaller card for the "Smaller projects" row: tighter padding and type. */
  compact?: boolean
}

export function ProjectCard({ kicker, title, summary, tags, to, imageSrc, imageAlt = '', imageSrcMobile, textOnly = false, compact = false }: Props) {
  const reveal = useReveal<HTMLElement>()
  return (
    <article ref={reveal} className={`${styles.card} ${compact ? styles.compact : ''}`}>
      {textOnly ? null : imageSrc ? (
        <picture>
          {imageSrcMobile && <source media="(max-width: 719px)" srcSet={imageSrcMobile} />}
          <img src={imageSrc} alt={imageAlt} width={1600} height={900} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </picture>
      ) : (
        <div className={styles.image} aria-hidden="true">Project image</div>
      )}
      <div className={styles.body}>
        <p className="label">{kicker}</p>
        <h3 className={styles.title}>
          <Link viewTransition className={styles.link} to={to}>{title}</Link>
        </h3>
        <p className={styles.summary}>{summary}</p>
        <TagList items={tags} onSand />
      </div>
    </article>
  )
}
