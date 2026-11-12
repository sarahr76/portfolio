// Site-wide content. Edit here, not inside components.
export const site = {
  name: 'Sarah Reilly',
  url: 'https://sarahmreilly.com',
  // Link-preview card shown when a page is shared. Each published case study has its own at /og/<slug>.png.
  ogImage: '/og/site.png',
  ogImageAlt: 'Sarah Reilly, UX/UI designer: I design systems that make software feel human.',
  title: 'Sarah Reilly | UX/UI designer',
  nav: [
    { label: 'Work', to: '/#work' },
    { label: 'Process', to: '/process' },
    { label: 'About', to: '/about' },
  ],
  linkedin: 'https://www.linkedin.com/in/sarahloebker',
  // Add a public email here when you decide which one to publish; the contact card appears automatically.
  email: 'hello@sarahmreilly.com',
  resume: { label: 'Résumé', href: '/resume.pdf' },
  contact: { label: 'Contact', to: '/about#contact' },
} as const
