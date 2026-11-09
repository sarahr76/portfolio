import type { ReactNode } from 'react'

/** Small "opens in a new tab" arrow. Decorative: the screen-reader text lives beside it. */
export function ExternalIcon() {
  return (
    <svg
      width="0.8em"
      height="0.8em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ marginLeft: '0.3em', flex: 'none', display: 'inline-block' }}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

type Props = {
  href: string
  children: ReactNode
  className?: string
  /** What it opens, for screen readers: "PDF" gives "(PDF, opens in new tab)". */
  kind?: string
}

/** A link that opens in a new tab, with a visible icon and an accessible hint. */
export function ExternalLink({ href, children, className, kind }: Props) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalIcon />
      <span className="sr-only">{kind ? ` (${kind}, opens in new tab)` : ' (opens in new tab)'}</span>
    </a>
  )
}
