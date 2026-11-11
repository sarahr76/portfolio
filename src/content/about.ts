// About page content. Draft copy based on the résumé; edit freely in your own voice.
export const about = {
  // Update these two lines whenever they change.
  currently: { reading: 'The Red Rising saga', updated: 'November 2026' },
  intro: [
    'I’m a UX/UI designer in Cincinnati, Ohio, with nearly eight years in digital product work. I started out writing front-end code in React, and over time grew into design, most recently shaping UX for SaaS products.',
    'I like the place where design and code meet: the system underneath a screen, and the details that make it feel considered. I use AI tools every day in my design and development work, and I pick up new tools quickly.',
    'Outside of work, I’m a mom of three, and my favorite thing is time with my kids. When I get a quiet moment I’m usually reading or playing video games. I even designed an app to keep track of my reading.',
  ],
  looking: [
    { label: 'Role', value: 'UX/UI or product designer' },
    { label: 'Type', value: 'Full-time, or part-time for the right fit' },
    { label: 'Where', value: 'Remote, based in Cincinnati, Ohio (Eastern time)' },
  ],
  path: [
    {
      when: '2005 – 2020',
      title: 'Florist and creative generalist',
      text: 'Fifteen years designing arrangements for weddings, funerals and events, and training new teammates. Alongside it came stints in airline service, public relations and marketing. It taught me to design for real people on real deadlines.',
    },
    {
      when: '2018 – 2022',
      title: 'Front-end consultant',
      text: 'Built React front ends for a global consumer-goods company, working alongside developers and directly with stakeholders, and improved the front-end design of several of their products.',
    },
    {
      when: '2022 – 2026',
      title: 'UX/UI designer',
      text: 'Moved from React developer and designer into a UX/UI design role, learning Figma on the job. Designed SaaS products, including a multi-module admin tool and an AI-first construction platform, and wrote the requirements and tickets that carried work into development.',
    },
    {
      when: 'Now',
      title: 'Building this portfolio',
      text: 'Designing and coding it myself, in the open: tokens, components and all.',
    },
  ],
  skills: [
    'Design systems',
    'Wireframing & prototyping',
    'Figma',
    'Product requirements (PRDs)',
    'Branding guides',
    'React',
    'HTML & CSS',
    'AI-assisted workflows',
    'Jira',
  ],
  education: [
    'Associate of Arts, Web & Multimedia Design, Cincinnati State Technical and Community College',
    'Bachelor of Arts, Public Relations, Northern Kentucky University',
  ],
} as const
