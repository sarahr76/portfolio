// Case study content. Edit text here; the CaseStudy page renders it with one shared template.

export type Shot = { label: string; src?: string; alt?: string }

export type Decision = {
  title: string
  tag: string
  problem: string
  approach: string
  outcome: string
  shot?: Shot
}

export type CaseStudy = {
  slug: string
  /** Placeholder pages get noindex until this is removed. */
  draft?: boolean
  title: string
  kicker: string
  tagline: string
  dek: string
  description: string
  meta: { role: string; timeline: string; tools: string; deliverables: string }
  stats?: readonly { value: string; label: string }[]
  /** Omit for text-only pages: no empty image box is rendered. */
  hero?: Shot
  summary: { problem: string; did: string; result: string }
  problem: { heading: string; paragraphs: readonly string[]; constraintsIntro?: string; constraints?: readonly string[] }
  system?: {
    intro: string
    palette: readonly { name: string; hex: string; note: string }[]
    paletteTitle: string
    type: { title: string; rows: readonly { role: string; spec: string }[] }
    voice: { quote: string; lines: readonly string[] }
    rules: { title: string; items: readonly string[] }
  }
  decisions: { heading: string; intro: string; items: readonly Decision[]; gallery?: readonly Shot[] }
  process: { heading: string; intro: string; items: readonly { title: string; text: string }[] }
  outcomes: {
    heading: string
    shipped?: readonly { title: string; text: string }[]
    honest: string
  }
  next: { title: string; to: string }
}

export const foxed: CaseStudy = {
  slug: 'foxed',
  title: 'Foxed',
  kicker: 'Case study 01 · Designed & built',
  tagline: 'Your reading, well-loved.',
  dek: 'A fic-and-book tracker for readers who live on AO3, designed and built solo, end to end, with Claude Code as an implementation partner. Four months, 141 commits, one very opinionated idea about what a reading app should feel like.',
  description:
    'Foxed is a fic-and-book tracker for readers who live on AO3. Designed and built solo: no accounts, no servers, and a design system decided before the first screen.',
  meta: {
    role: 'Product design & solo development',
    timeline: 'Jul – Nov 2026, ongoing',
    tools: 'Expo / React Native, on-device SQLite, Claude Code',
    deliverables: 'iOS app (private beta), design system',
  },
  stats: [
    { value: '141', label: 'Commits' },
    { value: '~4 mo', label: 'Timeline' },
    { value: 'Solo', label: 'Team' },
    { value: 'iOS', label: 'Platform' },
    { value: '9', label: 'Themes' },
    { value: '0', label: 'Servers' },
  ],
  hero: { label: 'Hero: best Foxed screen or a short product clip' },
  summary: {
    problem:
      'Readers who live on AO3 track progress across tabs, bookmarks and memory, and no tool treats a fic and a book as the same kind of finished.',
    did: 'Designed and built an iOS tracker with no accounts, no servers and no hosted story content, around one status model and a design system decided up front.',
    result:
      'In private beta on TestFlight with a handful of friends. Five decisions, below, shaped what it is.',
  },
  problem: {
    heading: 'Nobody treats a fic and a book as the same kind of finished.',
    paragraphs: [
      'Readers who live on Archive of Our Own track progress across browser tabs, bookmarks, and memory. Readers who track books use Goodreads or StoryGraph. Nobody who does both gets to treat “I finished this” as one feeling, because no tool treats fic and prose as the same category of thing, even though emotionally they are.',
      'Worse, most tools that touch AO3 at all do it carelessly: scraping full story text, building a competing reading surface, or quietly forgetting that hits, kudos, and comments are how fan authors are paid.',
    ],
    constraintsIntro:
      'Foxed starts from a constraint, not a feature list. Design the whole product around what’s left once you take these off the table:',
    constraints: [
      'Never host a word of story content.',
      'Never require an account.',
      'Never run a server.',
    ],
  },
  system: {
    intro:
      'Foxed is built against one living reference doc (colors, type, iconography and voice) that has been revised more often than any individual screen. These are excerpts from the real thing, not a reconstruction for this write-up.',
    paletteTitle: 'Palette: warm alphas only, never flat gray',
    palette: [
      { name: 'Ink base', hex: '#171310', note: 'App background' },
      { name: 'Rust', hex: '#C06A38', note: 'Primary actions, fic strip' },
      { name: 'Amber', hex: '#D9A84E', note: 'Streaks, warnings, gold moments' },
      { name: 'Moss', hex: '#8A8A5C', note: 'Books, toggles-on' },
      { name: 'Parchment', hex: '#EFE6CF', note: 'Generated covers' },
      { name: 'Cream', hex: '#F6F0E3', note: 'Text, via alphas' },
    ],
    type: {
      title: 'Type: two roles, never mixed',
      rows: [
        { role: 'Display', spec: 'Serif, for greetings and quiet moments of voice' },
        { role: 'Buttons & emphasis', spec: 'Karla, 700' },
        { role: 'Body & rows', spec: 'Karla, 400, cream at 85%' },
        { role: 'Overline labels', spec: 'Tracked +14%' },
      ],
    },
    voice: {
      quote:
        'Warm, bookish, lightly foxy. Honest about AO3: reading happens on AO3, authors see your hits and kudos. Never corporate, never gamified-pushy, no exclamation-point pileups.',
      lines: [
        '“Here’s what the fox dragged in.”',
        '“Resting to stay under AO3’s radar.”',
        '“Your shelf is waiting.”',
      ],
    },
    rules: {
      title: 'Icons & motion',
      items: [
        '24×24 grid, 2px stroke, round caps, exactly one rust accent per icon.',
        'No emoji glyphs in UI chrome (user content like shelf names is exempt).',
        'Quiet, paper-like motion: fade plus a 4–6px slide, 200–300ms ease.',
        'No bounces, no confetti. Haptics on status changes and streak moments only.',
      ],
    },
  },
  decisions: {
    heading: 'The choices that actually shaped the product',
    intro:
      'Not a feature tour. These are the handful of calls where the obvious, easy version of the idea was wrong, and the real one took more nerve.',
    items: [
      {
        title: 'The Nightstand cap',
        tag: 'Scarcity as a feature, not a limitation',
        problem:
          'A “To Read” list is where good intentions go to die. Nothing stops it from growing to 400 items, and an infinite list applies zero pressure to actually choose.',
        approach:
          'Split “To Read” into two shelves: a capacity-limited Nightstand (your real next-up queue: 8 by default, adjustable from 4 to 12) and a looser Shelf for “maybe someday.” Add a ninth book to a full Nightstand and nothing silently succeeds. A swap sheet opens, asking what comes off before the new one goes on.',
        outcome:
          'The decision happens at the cheapest possible moment, when adding one thing, instead of later, staring at an unmanageable pile. It also surfaced real engineering edge cases worth naming: a modal-presentation race that could silently swallow the swap sheet, and a capacity-check race when two adds landed in the same instant. Committing to a constraint meaning something is what made those bugs visible at all.',
        shot: { label: 'Screenshot: Nightstand full, swap sheet open' },
      },
      {
        title: 'The Companion',
        tag: 'A notes space that can’t spoil you',
        problem:
          'Long, multi-work series are exactly where readers want a running notes space, and exactly where showing the wrong thing at the wrong time does real damage.',
        approach:
          'Every note, fact and connection in the Companion is stamped with the series position it was written at. The page only ever reveals what’s at or before wherever the reader currently stands, with no manual spoiler tagging. Categories aren’t pre-defined either: the app notices a reader has been tracking “characters” or “places” as the notes accumulate, instead of handing over empty buckets labeled in advance.',
        outcome:
          'A notes feature that works while a series is still unfolding, not only in hindsight after it’s finished. That is the harder and more useful version of the idea.',
        shot: { label: 'Screenshot: Companion, spoiler-gated entity page' },
      },
      {
        title: 'The celebration economy',
        tag: 'Rewarding without nagging',
        problem:
          'Most reading-tracker gamification (streak flames, badge walls, reading challenges) reads as warm for a week and naggy for the rest of the year.',
        approach:
          'Every reward moment is tiered deliberately, by how often it should happen. Daily streaks stay almost silent: a calendar mark, with a “pressed leaf” forgiving one missed day automatically. Wax-seal achievements are rare and get the one genuinely animated moment in the whole app. A yearly Recap, in the style of a music-streaming “wrapped,” is the single big annual event. Nothing competes for the same moment twice.',
        outcome:
          'A reward system with a point of view about restraint, and a system that made room to remove a tier that wasn’t earning its place (see the last decision).',
        shot: { label: 'Screenshot: streak calendar and yearly Recap card' },
      },
      {
        title: 'Reading Focus',
        tag: 'One switch, not a settings maze',
        problem:
          'A reader who only tracks books doesn’t care about fandoms, ships, AO3 ratings or update alerts. The obvious fix, ten individual toggles, is its own kind of broken: a settings screen nobody actually goes and tunes.',
        approach:
          'Reading Focus is a single switch. Flip it, and every AO3- and fic-specific surface across the entire app disappears at once: filters, stat cards, the favorite-tags widget, the AO3 footer link, the Waiting status. Flip it back and nothing was lost. It was all just hidden, not deleted.',
        outcome:
          'The inverse of feature-flag sprawl: one well-placed decision point instead of a dozen half-measures scattered through the app.',
      },
      {
        title: 'Cutting the Ink Cellar',
        tag: 'Killing a feature without deleting it',
        problem:
          'A word-count ritual, an “ink bottle” that fills as you read and corks at a milestone, collected in an “Ink Cellar,” shipped, got real use, and still didn’t feel load-bearing. It was competing for attention with the celebration moments that mattered more.',
        approach:
          'Instead of ripping it out, along with the data model, achievements and backup fields that had grown up around it, it got hidden behind a single feature flag. Every entry point (a Stats card, a celebration sheet, a Field Guide entry, a month-recap link) was gated off in one place, while the underlying word tracking kept running quietly underneath.',
        outcome:
          'Cutting a feature doesn’t have to mean deciding its fate forever, or throwing away data a reader already built up. If it’s ever worth a second look, flipping the flag back on picks up exactly where it left off.',
      },
    ],
    gallery: [{ label: 'Home' }, { label: 'Library' }, { label: 'Fic detail' }],
  },
  process: {
    heading: 'Built solo, with Claude Code as the implementation partner',
    intro:
      'Every product call (what to build, what voice it should speak in, what to cut, what actually ships) was mine. Claude Code wrote most of the code, under close, continuous review, across roughly 140 incremental commits over four months.',
    items: [
      {
        title: 'One screen at a time, tested on a real device',
        text: 'Nothing shipped on faith. Every change was read, built, and actually used on a physical phone before it got pushed. The working rhythm was build, test, “push it,” never the reverse.',
      },
      {
        title: 'Bugs get fixed as a class, not a case',
        text: 'When one modal-presentation race turned up, the fix wasn’t just that one screen. It was auditing every root-mounted sheet in the app for the same mistake, and fixing every instance found in the same pass. The same discipline applied to a timezone bug in streak math and a stale-tier bug in the Nightstand logic.',
      },
      {
        title: 'Privacy as an engineering constraint, not a policy page',
        text: 'No accounts, no servers, and, deliberately, zero analytics or crash reporting. That tradeoff is real: it means a hand-run manual QA checklist is the only thing standing between a broken build and a friend’s phone, run in full before every share.',
      },
      {
        title: 'One living design doc, not tribal knowledge',
        text: 'Color, type, iconography and voice all live in a single reference file that every session gets pointed at first. A new screen gets built against the system, not improvised and reconciled later.',
      },
    ],
  },
  outcomes: {
    heading: 'What shipped, and what’s honestly still early',
    shipped: [
      { title: 'Fic + book tracking', text: 'One status model, one celebration system, for both' },
      { title: 'AO3 import', text: 'Bookmarks, series, and author/series following' },
      { title: 'Goodreads & CSV import', text: 'With duplicate detection across and within files' },
      { title: 'The Companion', text: 'Spoiler-safe notes wiki, per series' },
      { title: 'Nightstand & Shelf', text: 'A deliberately capacity-limited queue' },
      { title: 'Background update checks', text: 'Real notifications, opt-in, tied to the moment it matters' },
      { title: '9 themes, 2 type pairs', text: 'Including a true-black “Candlelight” mode' },
      { title: 'Demo Mode', text: 'Show the app without exposing a real library' },
    ],
    honest:
      'Foxed is in private beta, shared with a handful of friends via TestFlight. This isn’t a growth story with a user count worth bragging about. It’s a depth-of-craft one. The goal was never scale; it was building something specific and well-loved for people who actually live in this niche, including myself. One open design question is still sitting unresolved on purpose: whether streak milestones should stay silent or become a rare wax seal.',
  },
  next: { title: 'Plumbing company website', to: '/work/plumbing' },
}

const placeholderDecision = (n: number): Decision => ({
  title: `[Decision ${n}]`,
  tag: '[One line: what made this call interesting]',
  problem: '[What was wrong with the obvious approach?]',
  approach: '[What you did instead, and the options you weighed.]',
  outcome: '[What changed because of it. Qualitative is fine; no confidential numbers.]',
})

export const adminConsole: CaseStudy = {
  slug: 'admin-console',
  draft: true,
  title: 'A multi-module SaaS admin console',
  kicker: 'Professional work · Previous employer · Text only',
  tagline: '[One line: what it helped administrators do]',
  dek: '[Two or three sentences: what the product is, who uses it, and your part in it. Keep it anonymous: no product, client or employer names.]',
  description:
    'Text-only case study: designing and systematizing a multi-module SaaS admin console. Product details are kept anonymous.',
  meta: {
    role: 'Senior UX/UI designer',
    timeline: '[Dates or duration]',
    tools: '[Figma, React, ...]',
    deliverables: '[Design system, specs, flows, ...]',
  },
  summary: {
    problem: '[One or two sentences on the problem.]',
    did: '[One or two sentences on what you did.]',
    result: '[One or two sentences on the outcome, described qualitatively.]',
  },
  problem: {
    heading: '[A headline that states the problem]',
    paragraphs: [
      '[Context: who the administrators are and what made the product hard to use or hard to scale.]',
      '[Constraints: team, timeline, legacy, technical limits. Anything you can say without breaking confidentiality.]',
    ],
  },
  decisions: {
    heading: 'The choices that shaped the product',
    intro: '[One sentence on how you chose which decisions to show.]',
    items: [placeholderDecision(1), placeholderDecision(2), placeholderDecision(3)],
  },
  process: {
    heading: 'How I worked',
    intro: '[One or two sentences on your role and the people around you.]',
    items: [
      { title: '[Step 1]', text: '[What you did and why.]' },
      { title: '[Step 2]', text: '[What you did and why.]' },
      { title: '[Step 3]', text: '[What you did and why.]' },
    ],
  },
  outcomes: {
    heading: 'Outcomes and what I learned',
    honest:
      '[What changed, described qualitatively unless you have approved numbers. Then what you learned or would do differently.]',
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

export const constructionPlatform: CaseStudy = {
  ...adminConsole,
  slug: 'construction-platform',
  title: 'An AI-first construction platform',
  tagline: '[One line: what it helped construction teams do]',
  dek: '[Two or three sentences: what the product is, who uses it, and your part in it. Keep it anonymous: no product, client or employer names.]',
  description:
    'Text-only case study: designing an AI-first construction software platform. Product details are kept anonymous.',
  problem: {
    heading: '[A headline that states the problem]',
    paragraphs: [
      '[Context: who the users are (for example, site and office teams) and what was hard about their work.]',
      '[What was different about designing for AI-first features, and the constraints you worked within.]',
    ],
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

export const caseStudies: readonly CaseStudy[] = [foxed, adminConsole, constructionPlatform]
export const getCaseStudy = (slug: string | undefined) => caseStudies.find((c) => c.slug === slug)
