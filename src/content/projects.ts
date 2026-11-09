// Project summaries for cards. Full case study content arrives in step 5.
export type ProjectSummary = {
  slug: string
  kicker: string
  title: string
  summary: string
  tags: readonly string[]
  group: 'selected' | 'professional'
}

export const projects: readonly ProjectSummary[] = [
  {
    slug: 'foxed',
    kicker: '01 · Designed & built',
    title: 'Foxed',
    summary: 'A local-only reading tracker for fanfic readers, built around how people really read.',
    tags: ['Product design', 'Design system', 'React Native'],
    group: 'selected',
  },
  {
    slug: 'plumbing',
    kicker: '02 · Client work',
    title: 'Plumbing company website',
    summary: 'A clear, trustworthy website for a family plumbing company. [Refine this line]',
    tags: ['Web design', 'Design system'],
    group: 'selected',
  },
  {
    slug: 'flower-shop',
    kicker: '03 · Self-initiated concept',
    title: 'Flower shop website',
    summary: 'A concept site for a local florist, designed from a brief I set myself. [Refine this line]',
    tags: ['Web design', 'Design system'],
    group: 'selected',
  },
  {
    slug: 'admin-console',
    kicker: 'Professional work · Text only',
    title: 'A multi-module SaaS admin console',
    summary: '[One line on the problem and your part in it.]',
    tags: ['Senior UX/UI', 'Design system'],
    group: 'professional',
  },
  {
    slug: 'construction-platform',
    kicker: 'Professional work · Text only',
    title: 'An AI-first construction platform',
    summary: '[One line on the problem and your part in it.]',
    tags: ['Senior UX/UI', 'AI-first product'],
    group: 'professional',
  },
]
