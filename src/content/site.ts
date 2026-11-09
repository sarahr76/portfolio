// Site-wide content. Edit here, not inside components.
export const site = {
  name: 'Sarah Reilly',
  title: 'Sarah Reilly | UX/UI designer',
  nav: [
    { label: 'Work', to: '/#work' },
    { label: 'Process', to: '/process' },
    { label: 'About', to: '/about' },
  ],
  resume: { label: 'Résumé', href: '/resume.pdf' },
  contact: { label: 'Contact', to: '/about#contact' },
} as const
