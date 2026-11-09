import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ExternalIcon } from './ExternalLink'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary'

type Props = {
  variant?: Variant
  children: ReactNode
  /** Opens in a new tab: adds the icon and screen-reader hint. Only for `href`. */
  external?: boolean
  /** What it opens, for screen readers, e.g. "PDF". */
  kind?: string
} & (
  | { to: string; href?: never; onClick?: never; type?: never }
  | { href: string; to?: never; onClick?: never; type?: never }
  | { to?: never; href?: never; onClick?: () => void; type?: 'button' | 'submit' }
)

/** One component, three jobs: internal link, plain link or file, or real button. */
export function Button({ variant = 'primary', children, external = false, kind, ...rest }: Props) {
  const className = `${styles.btn} ${styles[variant]}`
  if (rest.to !== undefined) {
    return <Link className={className} to={rest.to}>{children}</Link>
  }
  if (rest.href !== undefined) {
    if (external) {
      return (
        <a className={className} href={rest.href} target="_blank" rel="noopener noreferrer">
          {children}
          <ExternalIcon />
          <span className="sr-only">{kind ? ` (${kind}, opens in new tab)` : ' (opens in new tab)'}</span>
        </a>
      )
    }
    return <a className={className} href={rest.href}>{children}</a>
  }
  return (
    <button className={className} type={rest.type ?? 'button'} onClick={rest.onClick}>
      {children}
    </button>
  )
}
