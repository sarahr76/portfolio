// Project summaries for cards. Full case study content arrives in step 5.
export type ProjectSummary = {
  slug: string
  kicker: string
  title: string
  summary: string
  tags: readonly string[]
  group: 'selected' | 'professional' | 'small'
  imageSrc?: string
  imageAlt?: string
  imageSrcMobile?: string
  /** Hidden from the Home page until the project is ready to show. The page itself still builds. */
  unlisted?: boolean
}

export const projects: readonly ProjectSummary[] = [
  {
    slug: 'foxed',
    kicker: '01 · Designed & built',
    title: 'Foxed',
    summary: 'A local-only reading tracker for fanfic readers, built around how people really read.',
    tags: ['Product design', 'Design system', 'React Native'],
    group: 'selected',
    imageSrc: '/foxed/hero.webp',
    imageSrcMobile: '/foxed/hero-mobile.webp',
    imageAlt: 'Foxed, an iOS reading tracker: three phones showing a fic detail screen, the Home screen, and a yearly recap.',
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
    title: 'Petals-n-Glass',
    summary: 'A concept site for a neighborhood flower boutique: nine pages in desktop and mobile, from first browse to checkout.',
    tags: ['Web design', 'Design system'],
    group: 'selected',
  },
  {
    slug: 'admin-console',
    kicker: 'Professional work · Text only',
    title: 'A multi-module SaaS admin console',
    summary: '[One line on the problem and your part in it.]',
    tags: ['UX/UI design', 'Design system'],
    group: 'professional',
  },
  {
    slug: 'construction-platform',
    kicker: 'Professional work · Text only',
    title: 'An AI-first construction platform',
    summary: '[One line on the problem and your part in it.]',
    tags: ['UX/UI design', 'AI-first product'],
    group: 'professional',
  },
  {
    slug: 'thinking-differently',
    kicker: 'Small project · Brand identity',
    title: 'Thinking Differently',
    summary: 'A small brand guide for a coaching practice whose logo is the owner’s own painted mark.',
    tags: ['Brand identity', 'Logo system'],
    group: 'small',
    // Remove once the client has OK'd showing her logo and brand name.
    unlisted: true,
    imageSrc: '/thinking-differently/logo-primary.webp',
    imageAlt: 'The Thinking Differently logo: a circular painted mark above the line “Thinking Differently. Starting with Me.”',
  },
]
