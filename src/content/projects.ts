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
    title: 'Reilly Plumbing',
    summary: 'A website and brand guide for a family plumbing company, with the brand written down as a small design system.',
    tags: ['Web design', 'Design system'],
    group: 'selected',
    imageSrc: '/plumbing/hero.webp',
    imageSrcMobile: '/plumbing/hero-mobile.webp',
    imageAlt: 'Reilly Plumbing, a website and brand guide for a family plumbing company: the headline “Honest plumbing, made easy to ask for.” beside three phone screens.',
  },
  {
    slug: 'flower-shop',
    kicker: '03 · Self-initiated concept',
    title: 'Petals-n-Glass',
    summary: 'A concept site for a neighborhood flower boutique: nine pages in desktop and mobile, from first browse to checkout.',
    tags: ['Web design', 'Design system'],
    group: 'selected',
    imageSrc: '/petals/hero.webp',
    imageSrcMobile: '/petals/hero-mobile.webp',
    imageAlt: 'Petals-n-Glass, a concept flower boutique site: the headline “Flowers for every occasion, made simple.” beside three phone screens.',
  },
  {
    slug: 'admin-console',
    kicker: 'Professional work · Text only',
    title: 'A multi-module SaaS admin console',
    summary: 'Patterns had drifted as the product grew. I built the component system and redesigned the key flows so it felt consistent and easier to use.',
    tags: ['UX/UI design', 'Design system'],
    group: 'professional',
  },
  {
    slug: 'ai-construction-platform',
    kicker: 'Professional work · Text only',
    title: 'AI-first construction platform',
    summary: 'Built from an empty canvas to a pilot. I set the direction, shaped the features from documents and CRM to Submittals and RFIs, and turned the plan into tickets.',
    tags: ['Product & UX/UI design', 'AI-first product'],
    group: 'professional',
  },
  // Placeholder: Digital Canvas. Details to come from Sarah.
  {
    slug: 'digital-canvas',
    kicker: 'Professional work · Text only',
    title: 'Digital Canvas',
    summary: '[One line on the problem and your part in it.]',
    tags: ['UX/UI design'],
    group: 'professional',
  },
    {
    slug: 'safewave',
    kicker: 'Professional work · Mobile app',
    title: 'Safewave',
    summary: 'The companion app for a vibrating wristband made for Deaf and hard-of-hearing users, designed from scratch.',
    tags: ['UX/UI design', 'Mobile app'],
    group: 'professional',
    imageSrc: '/safewave/hero.webp',
    imageSrcMobile: '/safewave/hero-mobile.webp',
    imageAlt: 'Two phones showing the Safewave login and notification settings screens.',
  },
  {
    slug: 'tallymark',
    kicker: 'Small project · Designed & built',
    title: 'Tallymark',
    summary: 'A free, installable app that makes scrambled fluency sheets and printable games, with teacher scoring copies and nothing uploaded.',
    tags: ['Product design', 'Brand identity', 'PWA'],
    group: 'small',
    imageSrc: '/tallymark-study/hero.webp',
    imageAlt: 'The Tallymark app: the headline “Sheets and games, scrambled fresh every week.” beside a preview of a letter-name sheet.',
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
