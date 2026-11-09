import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary'

type Props = {
  variant?: Variant
  children: ReactNode
} & (
  | { to: string; href?: never; onClick?: never; type?: never }
  | { href: string; to?: never; onClick?: never; type?: never }
  | { to?: never; href?: never; onClick?: () => void; type?: 'button' | 'submit' }
)

/** One component, three jobs: internal link, plain link or file, or real button. */
export function Button({ variant = 'primary', children, ...rest }: Props) {
  const className = `${styles.btn} ${styles[variant]}`
  if (rest.to !== undefined) {
    return <Link className={className} to={rest.to}>{children}</Link>
  }
  if (rest.href !== undefined) {
    return <a className={className} href={rest.href}>{children}</a>
  }
  return (
    <button className={className} type={rest.type ?? 'button'} onClick={rest.onClick}>
      {children}
    </button>
  )
}
