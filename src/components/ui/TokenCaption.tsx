/** The quiet "systems" detail: a mono label naming the token behind what you see. */
export function TokenCaption({ children }: { children: string }) {
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--color-ink-soft)' }}>
      {children}
    </span>
  )
}
