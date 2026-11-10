import type { ElementType, ReactNode } from 'react'
import { useReveal } from './useReveal'

type Props = { as?: ElementType; className?: string; id?: string; children: ReactNode }

/** Wrapper form of useReveal, for blocks that need no other ref. */
export function Reveal({ as: Tag = 'div', children, ...rest }: Props) {
  const ref = useReveal<HTMLElement>()
  return <Tag ref={ref} {...rest}>{children}</Tag>
}
