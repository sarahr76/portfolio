import { Link } from 'react-router-dom'
import { TagList } from '../ui/Tag'
import styles from './ProjectCard.module.css'

type Props = {
  kicker: string
  title: string
  summary: string
  tags: readonly string[]
  to: string
  imageSrc?: string
  imageAlt?: string
  /** Compact card with no image box, for projects without visuals. */
  textOnly?: boolean
}

export function ProjectCard({ kicker, title, summary, tags, to, imageSrc, imageAlt = '', textOnly = false }: Props) {
  return (
    <article className={styles.card}>
      {textOnly ? null : imageSrc ? (
        <img src={imageSrc} alt={imageAlt} loading="lazy" style={{ width: '100%', height: 'auto' }} />
      ) : (
        <div className={styles.image} aria-hidden="true">Project image</div>
      )}
      <div className={styles.body}>
        <p className="label">{kicker}</p>
        <h3 className={styles.title}>
          <Link className={styles.link} to={to}>{title}</Link>
        </h3>
        <p className={styles.summary}>{summary}</p>
        <TagList items={tags} onSand />
      </div>
    </article>
  )
}
