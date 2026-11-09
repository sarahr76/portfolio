import type { ReactNode } from 'react'

type Props = { label: string; title: string; children?: ReactNode }

export function SectionHeader({ label, title, children }: Props) {
  return (
    <header style={{ marginBottom: 'var(--space-5)' }}>
      <p className="label">{label}</p>
      <h2 style={{ marginTop: 'var(--space-2)' }}>{title}</h2>
      {children && (
        <p style={{ marginTop: 'var(--space-2)', maxWidth: 'var(--reading-width)', color: 'var(--color-ink-soft)' }}>
          {children}
        </p>
      )}
    </header>
  )
}
