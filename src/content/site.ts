// Site-wide content. Edit here, not inside components.
export const site = {
  name: 'Sarah Reilly',
  url: 'https://sarahmreilly.com',
  title: 'Sarah Reilly | UX/UI designer',
  nav: [
    { label: 'Work', to: '/#work' },
    { label: 'Process', to: '/process' },
    { label: 'About', to: '/about' },
  ],
  linkedin: 'https://www.linkedin.com/in/sarahloebker',
  // Add a public email here when you decide which one to publish; the contact card appears automatically.
  email: 'sarahmreilly76@gmail.com',
  resume: { label: 'Résumé', href: '/resume.pdf' },
  contact: { label: 'Contact', to: '/about#contact' },
} as const
