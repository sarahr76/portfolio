// Process page content. Draft copy grounded in the résumé and the Foxed case study;
// edit freely. Past employer work stays anonymous.
export const process = {
  lead: 'I move from understanding a problem, to writing it down, to a system, to something people can use. I can design it and build it, so I tend to carry work further than a handoff. These examples are anonymized.',
  stages: [
    {
      title: 'Understand the domain and the people',
      what: 'I learn how the work really happens before I draw anything. For an AI-first construction platform, that meant researching the industry first, so the design rested on how the work is done on the ground.',
      why: 'Screens that look right but ignore how people work get abandoned.',
    },
    {
      title: 'Write it down',
      what: 'I draft product requirements and tickets so an idea becomes something a team can build, with the goal, the constraints and what done looks like.',
      why: 'A shared written version stops the same conversation happening three times.',
    },
    {
      title: 'Decide the system early',
      what: 'Color, type, spacing, components and voice get decided before individual screens, and recorded in one reference that every new screen is built against.',
      why: 'Decisions made once are cheaper than decisions remade on every screen.',
    },
    {
      title: 'Wireframe and prototype',
      what: 'I sketch structure in Figma and prototype the flows that carry the most risk, using AI tools to move faster and keeping the judgment myself.',
      why: 'The cheapest time to be wrong is before anyone builds it.',
    },
    {
      title: 'Build, or build alongside',
      what: 'I come from front-end work in React, so I can build what I design, or work closely with developers and with another designer when it is a team effort.',
      why: 'Design and code each change the other. Knowing both keeps the handoff honest.',
    },
    {
      title: 'Test, review, refine',
      what: 'Every change gets used before it ships. On my own app that means a physical phone and a manual checklist, and when a bug turns up I look for the whole class of it, not just the one case.',
      why: 'Fixing a category once beats fixing the same mistake five times.',
    },
  ],
  inPractice: [
    {
      to: '/work/admin-console',
      title: 'A multi-module SaaS admin console',
      text: 'Branding guides, wireframes and prototypes, plus the requirements and tickets that carried the work into development.',
    },
    {
      to: '/work/ai-construction-platform',
      title: 'An AI-first construction platform',
      text: 'Research with the pilot team first, then design, requirements and tickets built from what we heard.',
    },
  ],
  systems: [
    {
      title: 'Tokens first',
      text: 'Named values for color, type, spacing and radius, so a change in one place changes everywhere. This site is built that way.',
    },
    {
      title: 'Components with rules',
      text: 'Each component has a job and a short rule for when to use it and when not to. The rule matters as much as the component.',
    },
    {
      title: 'A living reference',
      text: 'One document that stays current: colors, type, icons, motion and voice. New screens are built against it, not improvised and reconciled later.',
    },
  ],
  ai: [
    'I use Claude Code to produce branding guides, wireframes and prototypes, and Gemini to draft requirements and research a domain. They make me faster.',
    'The judgment stays with me. I decide what to build, what to cut and what ships, and I read and use what comes back before it goes anywhere. Speed from AI only helps if the decisions behind it are good.',
  ],
  tools: [
    { group: 'Design', items: 'Figma, wireframing, prototyping, branding guides, product requirements, Jira' },
    { group: 'AI', items: 'Claude Code, Gemini' },
    { group: 'Front-end', items: 'HTML, CSS, React, TypeScript' },
    { group: 'Web & media', items: 'Wix, WordPress, Canva' },
  ],
} as const
