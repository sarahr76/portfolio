// Case study content. Edit text here; the CaseStudy page renders it with one shared template.

export type Shot = {
  label: string
  src?: string
  srcMobile?: string
  alt?: string
  caption?: string
  priority?: boolean
  width?: number
  height?: number
  /** Landscape image (not a phone screen): shown at full column width. */
  wide?: boolean
  maxWidth?: number
}

export type Decision = {
  title: string
  tag: string
  problem: string
  approach: string
  outcome: string
  shot?: Shot
  /** Several screens for one decision, shown side by side. Takes precedence over `shot`. */
  shots?: readonly Shot[]
}

export type CaseStudy = {
  slug: string
  /** Placeholder pages get noindex until this is removed. */
  draft?: boolean
  /** A live site or prototype to link under the intro. */
  liveSite?: { label: string; href: string; note?: string }
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
  problem: {
    heading: string
    paragraphs: readonly string[]
    constraintsIntro?: string
    constraints?: readonly string[]
    /** Phone screens shown after the constraints, side by side. */
    shots?: readonly Shot[]
  }
  system?: {
    title?: string
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
  hero: {
    label: 'Hero: best Foxed screen or a short product clip',
    src: '/foxed/hero.webp',
    srcMobile: '/foxed/hero-mobile.webp',
    alt: 'Foxed, an iOS app. Headline: “Your reading, well-loved.” Three phones show a fic detail screen with reading progress, the Home screen with Currently Reading, Waiting on Update and Nightstand sections, and a yearly recap reading “8.4M words this year.”',
    priority: true,
    width: 1600,
    height: 900,
  },
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
    shots: [
      {
        label: 'About Foxed screen',
        src: '/foxed/about-foxed.webp',
        alt: 'The About Foxed screen. A card reads “Made by a fan, for fans: Foxed is your bookshelf, not a reading app. It doesn’t host, copy, or display any stories.” A second card reads “Your data stays here: no accounts, no servers, no analytics, no ads.”',
        caption: 'The three constraints, in the app’s own words.',
      },
      {
        label: 'Fic detail screen',
        src: '/foxed/fic-detail.webp',
        alt: 'A fic detail screen for a sample story, “salt & honey.” It shows a generated cover, word count, a progress card with a “View on AO3” button, and the note “Reading happens on AO3. Authors see your hits and kudos.” Status and shelf controls sit below.',
        caption: 'Reading happens on AO3, so authors get every hit and kudos.',
      },
      {
        label: 'All caught up sheet',
        src: '/foxed/caught-up.webp',
        alt: 'A sheet over the fic detail reading “You’re all caught up. All 12 chapters read, the rest is up to Mystery_author,” with the buttons Mark as Waiting on update and Keep it in Reading.',
        caption: 'Caught up on a work in progress isn’t finished. It’s waiting on the author.',
      },
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
        shots: [
          {
            label: 'Fic detail with Nightstand and Shelf toggle',
            src: '/foxed/fic-detail-wip.webp',
            alt: 'A fic detail screen for a sample story, “A well loved fanfiction,” sitting on The Shelf. A progress card shows Chapter 3, 25%. The status card offers Nightstand or The Shelf, with the line “The Nook: the maybe pile, unsure reads and stray tabs.”',
            caption: 'Two shelves: the Nightstand for next up, The Shelf for maybe someday.',
          },
          {
            label: 'Nightstand is full swap sheet',
            src: '/foxed/swap-sheet.webp',
            alt: 'A bottom sheet titled “The Nightstand is full.” It shows the fic moving in and a list of four items that could go back on the Shelf, with Make the swap and Leave it on the Shelf buttons.',
            caption: 'Adding to a full Nightstand opens a swap, not a silent success.',
          },
          {
            label: 'Library, Nightstand view',
            src: '/foxed/library-nightstand.webp',
            alt: 'The My Library screen filtered to To Read, with Nightstand selected. The line “You already said yes to these, no debate, just next in line” sits above two reorderable cards, one ebook and one fic, each at 0%.',
            caption: 'The Nightstand in the Library: “You already said yes to these.”',
          },
        ],
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
        shots: [
          {
            label: 'The Companion, series home',
            src: '/foxed/companion.webp',
            alt: 'The Companion for Throne of Glass. A dark header reads “Reading with you, Book 2, page 120. Everything here stops where you are.” Below are a search field, an Add a thing button, and lists of characters, locations and glossary entries.',
            caption: 'The header says it plainly: everything here stops where you are.',
          },
          {
            label: 'The Companion, a character page',
            src: '/foxed/companion-entity.webp',
            alt: 'A character page: facts under “What you know,” connections to two other characters with short notes, and a personal margin note stamped Book 1, page 300.',
            caption: 'Facts, connections and margin notes, each stamped with where you were when you wrote it.',
          },
        ],
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
        shots: [
          {
          label: 'A wax-seal achievement',
          src: '/foxed/seal.webp',
          alt: 'A bottom sheet over a fic page: a terracotta wax seal with a flame, the label “A seal, pressed,” the title “Slow Burn Survivor,” and the line “198,000 words. You saw it all the way through.” above a Lovely button.',
          caption: 'A seal, pressed: rare, quiet, and the one animated moment in the app.',
        },
          {
            label: 'Stats: Your year',
            src: '/foxed/stats.webp',
            alt: 'The Your year screen: 321k words read this year, a twelve-day streak shown as a row of dots, a progress bar toward a 1.0M-word goal, a monthly bar chart, and a row of seven wax seals with one earned.',
            caption: 'Your year: the streak is a row of dots, and seals fill in slowly.',
          },
          {
            label: 'Monthly recap, November',
            src: '/foxed/recap-november.webp',
            alt: 'The November recap. Three stat cards show 0 finished, 235k words and 10 days read. A week-by-week bar chart is followed by the line “The 8 to 14 stretch was where November really happened,” and a list of four fics still being read with their word counts this month.',
            caption: 'A month with nothing finished still gets a real story, not an empty card.',
          },
        ],
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
        shots: [
          {
            label: 'Reading Focus setting',
            src: '/foxed/reading-focus.webp',
            alt: 'The AO3 & Library settings screen. Under Reading Focus, two choices: Fic & books, selected, and Books only. Below are the AO3 account, blocked tags and following sections.',
            caption: 'Two plain choices, with the effect explained in one sentence.',
          },
          {
            label: 'Home with Fic & books',
            src: '/foxed/reading-focus-fic.webp',
            alt: 'The Foxed Home screen with Fic & books on. A banner says AO3 looks like it is down right now. Below Currently Reading is a Waiting on Update shelf with two fics, then the Nightstand.',
            caption: 'Fic & books: AO3 status and a Waiting on Update shelf.',
          },
          {
            label: 'Home with Books only',
            src: '/foxed/reading-focus-books.webp',
            alt: 'The same Home screen with Books only on. The AO3 banner and the Waiting on Update shelf are gone, leaving Currently Reading, the Nightstand and the Shelf.',
            caption: 'Books only: the same screen, with every AO3 and fic surface gone.',
          },
        ],
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
    gallery: [
      {
        label: 'Blind Date with a Story',
        src: '/foxed/blind-date.webp',
        alt: 'The Blind Date with a Story screen: a wrapped parcel tied with a green ribbon and a tag reading “an evening, a fandom you’ve read before, domestic,” with mood chips above and an Unwrap it button below.',
        caption: 'Blind Date with a Story: a gift-wrapped pick from your own Waiting list.',
      },
      {
        label: 'Welcome sheet',
        src: '/foxed/welcome.webp',
        alt: 'The first-run welcome sheet, “Welcome to Foxed,” over the Home screen. Three points: your bookshelf, not a reading app; everything stays on your phone; unofficial, and proudly so. A Start shelving button sits below.',
        caption: 'First run: three honest sentences, including that nothing leaves your phone.',
      },
      {
        label: 'Onboarding',
        src: '/foxed/onboarding.webp',
        alt: 'The first onboarding screen: a book icon and a small heart above “Track every fic and book,” with a Next button and four progress dots.',
        caption: 'Onboarding starts with one idea per screen.',
      },
    ],
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
      'Foxed is in private beta, shared with a handful of friends via TestFlight. This isn’t a growth story with a user count worth bragging about. It’s a depth-of-craft one. The goal was never scale; it was building something specific and well-loved for people who actually live in this niche, including myself.',
  },
  next: { title: 'Reilly Plumbing', to: '/work/plumbing' },
}

const placeholderDecision = (n: number): Decision => ({
  title: `[Decision ${n}]`,
  tag: '[One line: what made this call interesting]',
  problem: '[What was wrong with the obvious approach?]',
  approach: '[What you did instead, and the options you weighed.]',
  outcome: '[What changed because of it. Qualitative is fine; no confidential numbers.]',
})

const textOnlyTemplate: CaseStudy = {
  slug: 'admin-console',
  draft: true,
  title: 'A multi-module SaaS admin console',
  kicker: 'Professional work · Previous employer · Text only',
  tagline: '[One line: what it helped administrators do]',
  dek: '[Two or three sentences: what the product is, who uses it, and your part in it. Keep it anonymous: no product, client or employer names.]',
  description:
    'Text-only case study: designing and systematizing a multi-module SaaS admin console. Product details are kept anonymous.',
  meta: {
    role: 'UX/UI designer',
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

export const adminConsole: CaseStudy = {
  ...textOnlyTemplate,
  slug: 'admin-console',
  draft: false,
  title: 'A multi-module SaaS admin console',
  kicker: 'Professional work · Previous employer',
  tagline: 'Making a growing admin console modern, consistent and easier to use.',
  dek: 'A multi-module SaaS tool that gives administrators one place to manage their company’s workspace. Over about four years, with one other designer and the development team, I redesigned its patterns and built the component library that keeps every module consistent.',
  description:
    'Designing and systematizing a multi-module SaaS admin console: a component library, consistent containers and a redesigned rule builder. Product details are kept anonymous.',
  meta: {
    role: 'UX/UI designer, with one other designer and the development team',
    timeline: 'About four years',
    tools: 'Figma, Material UI, React',
    deliverables: 'A two-layer component library and token set, a developer documentation hub, full-page steppers, a drawer pattern, a rule builder, and design-to-dev handoff tickets',
  },
  summary: {
    problem:
      'As the product grew, its patterns drifted: the same kind of task looked and behaved differently from screen to screen.',
    did: 'Built a two-layer component system on top of Material UI, chose one container for each kind of task and made it identical everywhere, and redesigned the most logic-heavy feature, rule creation, around how people think about rules.',
    result:
      'The product became easier to navigate and use, components became consistent, and developers could add new APIs and features without starting each screen from scratch.',
  },
  problem: {
    heading: 'The same task looked different on every screen',
    paragraphs: [
      'The product gives administrators a single place to manage their company’s workspace across several modules. As it grew, each module built up its own habits, so a creation flow, a details view or a confirmation could look and behave differently depending on where you were.',
      'The goal, shared with my design partner, was twofold: make the application more modern and easier for clients to use, and give product, design and development a more organized way of working together.',
    ],
    constraintsIntro: 'The constraints:',
    constraints: [
      'A small design team: two designers, working closely with the developers.',
      'An existing component library (Material UI) the product already depended on, so starting over was not an option.',
      'A live product that kept growing, as developers added new APIs and features.',
    ],
  },
  decisions: {
    heading: 'The choices that shaped the product',
    intro:
      'Most of the usability gains came from one idea: pick the right container for each kind of task, then make it identical everywhere. The system underneath, and one deliberate exception, complete the picture.',
    items: [
      {
        title: 'Two layers, not a custom library',
        tag: 'Own what makes it distinct, keep the rest',
        problem:
          'A fully custom component library would have given total control, and a maintenance burden to match.',
        approach:
          'A two-layer system on top of Material UI. The base stays largely intact, and the product’s own token overrides sit on top. I also split the design files into three (Design System, Product and Working) so exploration never got tangled with finished work, and built a browser-based documentation hub where developers could look up real token data and component specs.',
        outcome:
          'The product keeps its own identity without the cost of maintaining a custom library, and designers and developers share one source of truth.',
      },
      {
        title: 'Full-page steppers instead of popup wizards',
        tag: 'Give long flows room to breathe',
        problem:
          'Creation flows involve many fields. The original popup wizards couldn’t hold that much information without cramming it in or making people scroll.',
        approach:
          'I redesigned them as full-page steppers where each step fits cleanly on the page, and used the same pattern in every module.',
        outcome:
          'Long forms are easier to navigate and easier to fill in, and the experience works the same way wherever you meet it.',
        shot: {
          label: 'Diagram: one container for each kind of task',
          src: '/gpanel-containers.webp',
          alt: 'A simplified illustration of three containers: a full-page stepper for long, linear data entry; a drawer for details about one thing; and a modal for quick confirmations, with amber for actions that can be undone and red for destructive ones.',
          caption: 'A simplified illustration of the three containers. Not the real interface.',
          wide: true,
          width: 1400,
          height: 720,
        },
      },
      {
        title: 'One drawer for details, flexible inside',
        tag: 'Consistent structure, adaptable content',
        problem:
          'Details pages relied on modals that varied from screen to screen. The hard part of fixing that: a details view has to show very different information depending on what’s being viewed.',
        approach:
          'A single drawer pattern with one consistent structure and styling, and contents that flex within it to suit the type of data.',
        outcome:
          'Details feel familiar everywhere, and a new screen can reuse the drawer instead of inventing another modal.',
      },
      {
        title: 'Modals, but only for what they’re good at',
        tag: 'Color that signals risk',
        problem:
          'With modals handling everything, quick confirmations and heavy tasks had been getting the same treatment.',
        approach:
          'Modals are reserved for quick confirmations and alerts. Amber marks reversible actions and red marks destructive ones, so the color itself signals how risky the action is.',
        outcome:
          'Red keeps its meaning, and people can tell at a glance how careful to be.',
      },
      {
        title: 'The rule builder breaks our own rule',
        tag: 'A deliberate exception to the stepper',
        problem:
          'Creating a rule involves trigger logic, a Sources panel that maps events to source types, and condition blocks with AND/OR patterns. The original stepper-style wizard made people move back and forth to check how their choices fit together. A second problem was conceptual: helping users tell apart two kinds of automation, Policies (scheduled, time-driven) and the Rules Engine (real-time, event-driven), on the Automation landing page.',
        approach:
          'I redesigned it as a single page with three sections, When, If and Then, and a summary card that keeps everything set so far visible in one place. The page also warns you when a similar rule already exists for the same event. Steppers suit long, linear data entry; a rule is a set of interrelated pieces, and people need to see how they connect.',
        outcome:
          'Rules read the way people think about them: if this happens, under these conditions, do this. Users see the whole rule without navigating between steps.',
        shot: {
          label: 'Illustration: the Create rule page',
          src: '/gpanel-create-rule.webp',
          alt: 'A simplified illustration of the Create rule page. Steps along the top read Basic info, When, If and Then. Three stacked sections follow: basic information, When this happens with a trigger event, a warning about a similar rule, frequency and trigger sources, and If these conditions are met, which is empty. A dark Rule summary card on the right fills in as the rule is built.',
          caption: 'The Create rule page, redrawn and simplified: three sections on one page, with the summary always beside them. Not the real interface.',
          wide: true,
          width: 1400,
          height: 1174,
        },
      },
    ],
  },
  process: {
    heading: 'How I worked',
    intro:
      'I worked with one other designer and the development team. When the product started I was primarily a developer, and I moved into design as it grew. Having worked on both sides shaped how I handled handoff.',
    items: [
      {
        title: 'Build the library, then keep it in one place',
        text: 'I built out the Figma component library and organized the files so a newcomer could tell what was settled and what was still exploration.',
      },
      {
        title: 'Make the system easy to look up',
        text: 'The documentation hub gave developers real token data and component specs in the browser, so they didn’t have to ask what a value was.',
      },
      {
        title: 'Hand off in terms developers already know',
        text: 'Because the patterns were consistent, tickets could point to a known component instead of describing something new each time. I also built a reusable workflow that turns Figma screens into spec docs and dev tickets, mapped against the token system.',
      },
    ],
  },
  outcomes: {
    heading: 'Outcomes and what I learned',
    shipped: [
      { title: 'Easier to use', text: 'Consistent steppers, drawers and components across modules' },
      { title: 'Smoother handoff', text: 'Work flowed from product to design to development with less back-and-forth' },
      { title: 'Clearer tickets', text: 'Developers needed fewer clarifying questions' },
      { title: 'Reusable pieces', text: 'New screens built from existing patterns, even as new APIs and features arrived' },
    ],
    honest:
      'I don’t have measured results to share; the gains above are what the team observed. If I did it again, I’d build the component library much earlier, before the patterns had a chance to drift. Having worked on both the development and design sides, I now see a shared library as the foundation of a design system rather than something to tidy up afterward.',
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

export const constructionPlatform: CaseStudy = {
  ...textOnlyTemplate,
  slug: 'ai-construction-platform',
  // Product name is intentionally generic.
  draft: false,
  title: 'AI-first construction platform',
  kicker: 'Professional work · Previous employer',
  tagline: 'From an empty canvas to a pilot-ready product.',
  dek: 'A construction platform built from the ground up over about a year. I set the product direction, supported research with the pilot team, shaped the product’s features, from the documents view, CRM, tasks and activity pages to the Submittals and RFI workflows, and turned the plan into requirements and tickets the developers could build from. A designer I worked with did all of the final design work in Figma.',
  description:
    'Case study: product direction, UX and requirements for an AI-first construction software platform, from first concepts to a pilot-ready product.',
  meta: {
    role: 'Product direction, UX, requirements and tickets, with a designer who did all the final Figma design',
    timeline: 'About a year, from first concepts to a pilot-ready product',
    tools: 'Figma Make, Figma, Tailwind, Gemini, Claude',
    deliverables: 'Concepts, PRDs, a scoping proposal with low-fidelity wireframes, 100+ feature tickets, interview note templates, demo guides, feedback sheets and a pilot-team backlog',
  },
  hero: {
    label: 'Diagram: one project, five kinds of work',
    src: '/construction/roles.webp',
    alt: 'A simplified diagram of five kinds of work on the project, left to right: product direction (concepts in Figma Make, a scoping proposal), research (interview note templates, demo guides and feedback sheets), UX and workflow design (the documents view with email ingestion, CRM, tasks and activity pages, the Submittals flow, the RFI board, with all final Figma design done by a designer), requirements (a PRD per feature), and tickets and backlog (100+ feature tickets, a backlog from pilot meetings).',
    priority: true,
    wide: true,
    width: 1400,
    height: 923,
  },
  stats: [
    { value: '~1 yr', label: 'Concept to pilot-ready' },
    { value: '100+', label: 'Feature tickets' },
  ],
  summary: {
    problem:
      'Construction teams lose profit to poor communication and follow-through, with paperwork scattered across too many places.',
    did: 'Set the product direction, shaped the product’s features around one idea (the AI does the first pass, and a person stays in control), supported research with the pilot team, and turned the plan into PRDs and more than 100 tickets.',
    result:
      'A working core platform, with document and email ingestion running in the pilot, and a pilot team warming to the AI-first direction. Submittals and RFIs were scoped, wireframed and ready for the next phase.',
  },
  problem: {
    heading: 'Profit lost between the steps',
    paragraphs: [
      'A large share of a construction team’s time goes to tasks that end up off schedule or add little value. Communication breaks down between the different parts of the process, and paperwork is scattered across too many places.',
      'The goal was a single platform that keeps project information connected and uses AI to take the repetitive work off people’s plates. The platform was built from an empty canvas, with the next phase focused on the two workflows that matter most to construction teams: submittals and RFIs.',
    ],
    constraintsIntro: 'The conditions:',
    constraints: [
      'A small team, so each person covered more than one role.',
      'A pilot team that started out unsure how yet another application would help them.',
      'A product with no starting point, and two complex workflows still to be designed.',
    ],
  },
  decisions: {
    heading: 'The choices that shaped the product',
    intro:
      'One idea ran through all of it: the AI does the first pass, and a person stays in control. Around it, the thinking went into making project information easy to find and keeping follow-through visible. These are the calls that mattered most.',
    items: [
      {
        title: 'Let the AI do the filing, and let people correct it',
        tag: 'Document and email ingestion',
        problem:
          'Project information lived in too many places, mainly SharePoint and email, and a lot of a team’s time went to finding things and organizing them by hand.',
        approach:
          'The platform ingests documents from SharePoint and emails. The AI reads them, writes a summary, auto-tags the items and organizes them, so the information arrives already sorted. My design partner and I worked out what the user sees: how the documents appear in the app and how the AI’s information is displayed, which he then designed in Figma. People can correct, edit or delete anything the AI did, and then view, search and filter the results, with saved views for the ones they return to.',
        outcome:
          'It worked in the pilot, and it was the part the pilot team seemed most interested in: having items sorted and tagged for them automatically, and then easy to find.',
        shot: {
          label: 'Diagram: document and email ingestion',
          src: '/construction/ingestion.webp',
          alt: 'A simplified diagram: documents from SharePoint and emails flow into the AI, which summarizes, auto-tags and organizes them. A person can then view, search, correct, edit or delete anything the AI did.',
          wide: true,
          width: 1400,
          height: 743,
        },
      },
      {
        title: 'Keep a person in the loop',
        tag: 'An AI-first workflow people can trust',
        problem:
          'In construction, mistakes are costly. A tool that acted on its own, without a way to check it, would not earn the pilot team’s trust.',
        approach:
          'The AI does the first pass. When a PDF loads, it highlights the submittal items it extracts, using a combination of AI and rules. The project coordinator reviews the highlights and accepts or edits them before the log is finalized. Each entry keeps a link back to its spec source, and a coordinator can attach an alternative document when no spec sheet exists.',
        outcome:
          'The AI removes the repetitive work, and the coordinator always has the final say.',
      },
      {
        title: 'Three jobs in one place',
        tag: 'Less copying, more reviewing',
        problem:
          'Reviewing submittals, adding log entries and creating cover sheets meant a lot of copying and pasting between documents.',
        approach:
          'Submittals became a four-screen chain: spec-to-log automation; cover sheets that fill in from the log; a split screen with the document and the AI’s analysis side by side; and a revision timeline, where older rejection cycles collapse into an archive so the current revision stays in focus.',
        outcome:
          'Designed to cut review time significantly, so people spend less time copying and more time reviewing what matters.',
        shot: {
          label: 'Diagram: the Submittals flow',
          src: '/construction/submittals.webp',
          alt: 'A simplified diagram of the Submittals flow as a chain of connected screens.',
          wide: true,
          width: 1400,
          height: 771,
        },
      },
      {
        title: 'Make RFI follow-through visible',
        tag: 'Questions shouldn’t fall through the cracks',
        problem:
          'RFIs sit at the heart of the communication problem: a question goes out, and the answer, or the missing answer, can be easy to lose.',
        approach:
          'A Kanban board with five statuses (Draft, Pending, Submitted, Responded, Closed) and swimlanes for cost impact, time impact and priority. A tiered approval flow, where the coordinator drafts and a manager approves before anything goes to the owner. Automated reminders for overdue responses, with custom frequency. Related submittals, tasks, change orders and emails linked inside the RFI. Admin reopen controls that require a logged justification. And AI summaries, so a 20-response thread can be understood quickly.',
        outcome:
          'Nothing requires hunting through other screens, and overdue items don’t depend on someone remembering them.',
      },
      {
        title: 'Reuse the full detail view',
        tag: 'One version, not two',
        problem:
          'A slide-in preview for RFIs would have been a second, lighter version of the same information.',
        approach:
          'We reused the full detail view instead of building a separate preview.',
        outcome:
          'The experience stays consistent, and there is only one version to maintain.',
      },
    ],
  },
  process: {
    heading: 'How I worked',
    intro:
      'On a small team, my work spanned product direction, UX/UI design, research, requirements and tickets. Here is how those pieces fit together.',
    items: [
      {
        title: 'Start fast, with concepts',
        text: 'We began with the core CRM features every project team needs: a dashboard, projects with their own sub-navigation, contacts, companies, tasks, activities, and admin and user settings. I developed the direction in Figma Make alongside my own ideas, which let me put many concepts in front of the team quickly. I handed those to our designer, who did all of the actual design work in Figma, building out the final components and visual style on Tailwind as the base for our component designs, so we could spend our time improving the experience instead of building every small piece from scratch.',
      },
      {
        title: 'Earn the pilot team’s trust',
        text: 'We ran guided tours of the app with the pilot team and gathered their feedback. To prepare, I made interview note templates, demo guides and feedback sheets. We didn’t get to formal interviews, so the tours and feedback are what we learned from. Once they saw the AI-first direction the product was built on, the pilot team began to buy in, and their feedback fed a backlog that shaped what we prioritized next.',
      },
      {
        title: 'Turn big ideas into buildable work',
        text: 'For each major feature I wrote a combined PRD covering goals, scope, flows and edge cases. I broke the features into more than 100 tickets. Submittals and RFIs were next in line, so I wrote a scoping proposal with low-fidelity wireframes to help stakeholders decide what belonged in a first version, and organized a backlog from meetings with the pilot team.',
      },
    ],
  },
  outcomes: {
    heading: 'Where it stood, and what I learned',
    shipped: [
      { title: 'Document and email ingestion', text: 'Working in the pilot: AI reads SharePoint documents and emails, summarizes, tags and organizes them, and users can correct, edit, delete, search and filter' },
      { title: 'The core platform', text: 'Dashboard, projects, contacts, companies, tasks, activities, and admin and user settings' },
      { title: 'Research materials', text: 'Interview note templates, demo guides and feedback sheets' },
      { title: 'Submittals and RFIs, ready for the next phase', text: 'Scoped, wireframed and broken into tickets' },
      { title: 'A pilot-team backlog', text: 'Organized from meetings with the pilot team' },
    ],
    honest:
      'By the time I left, the core platform was in place and the pilot team was warming to the AI-first direction. I don’t have measured results to share. On a small team my role grew into a mix of UX and workflow designer, requirements writer and ticket writer. If I did it again, I would work out early where my role sits within a small team, so I could be deliberate about which hat I was wearing instead of picking them up as I went. Using AI tools for both research and design let a small team move quickly across the whole process.',
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

// Small project, text only.
export const documentPortal: CaseStudy = {
  ...textOnlyTemplate,
  slug: 'document-portal',
  draft: false,
  title: 'A document portal for a health organization',
  kicker: 'Professional work · Small project',
  tagline: 'A simple front end for seeing what’s required, what’s missing and what’s been added.',
  dek: 'A regional health organization needed a simple front end where users could see which documents were required, spot anything missing, and upload or update files. I helped design that experience, with a focus on keeping it clear and light on effort for the people using it. The client is kept anonymous.',
  description:
    'Designing a document portal for a regional health organization, with status at a glance and a Google Drive connection that cuts out manual uploading. Client kept anonymous.',
  meta: {
    role: 'UX/UI designer',
    timeline: 'About one week',
    tools: 'Figma and Claude Code, designed with Tailwind in mind',
    deliverables: 'Portal front-end design: grouped document list, status indicators, Drive connection',
  },
  summary: {
    problem:
      'Collecting required documents means hunting for files, uploading them one at a time, and wondering what is still missing.',
    did: 'Helped design a portal that groups required documents into collapsible categories, shows the status of each one, and lets users connect Google Drive so an AI agent finds their documents for them.',
    result:
      'A deliberately simple interface that shows users where things stand. I can’t share the end result.',
  },
  problem: {
    heading: 'Collecting documents is mostly hunting and wondering',
    paragraphs: [
      'Collecting required documents usually means people hunting for files, uploading them one at a time, and wondering what is still missing.',
      'The goal was to make it easy to see what was needed and what was outstanding, and to cut down the manual uploading as much as possible.',
    ],
  },
  decisions: {
    heading: 'What I designed',
    intro: 'Three choices shaped the portal, each aimed at saving users effort.',
    items: [
      {
        title: 'A list of accordions grouped by category',
        tag: 'A short overview first',
        problem: 'A long flat list of required documents is hard to scan and easy to give up on.',
        approach:
          'Required documents are organized into collapsible groups, so users see a short, scannable overview first and open only the section they need. Inside each group, the required documents are listed with the key details for each one.',
        outcome: 'Users open only the section they need.',
      },
      {
        title: 'Status on every category and document',
        tag: 'Gaps visible without opening anything',
        problem: 'People are left wondering what is still missing.',
        approach:
          'Each category and each document shows its status, so users can tell at a glance what is still missing and what has been added, along with when it was added. The statuses on the collapsed groups mean users can spot gaps without opening anything.',
        outcome: 'What’s missing and what’s done is clear at a glance.',
        shot: {
          label: 'Diagram: status at a glance',
          src: '/document-portal/status.webp',
          alt: 'A simplified illustration with invented example content: four collapsed and expanded document categories. Identification and Training records are marked Complete; Licenses and certifications shows 1 missing and is open, listing two documents marked Added with dates and one marked Missing; Insurance shows 2 missing.',
          wide: true,
          width: 1400,
          height: 750,
        },
      },
      {
        title: 'A shortcut to skip the uploading',
        tag: 'Connect Google Drive',
        problem: 'Hunting down and uploading each file one at a time is the part people least want to do.',
        approach:
          'The main idea of the product is that users connect their Google Drive and an AI agent automatically finds the documents they need. A user just adds their documents to their Drive, and the portal picks them up. Users can still view, upload and update documents directly in the portal when something is missing or needs to change.',
        outcome: 'Most of the manual uploading goes away, and the portal still allows direct changes.',
      },
    ],
  },
  process: {
    heading: 'How I approached it',
    intro: 'This was a small project of about a week, and I was one of the designers on it.',
    items: [
      {
        title: 'Start with what users need to know',
        text: 'Which documents are required, which are missing, and what has been added and when.',
      },
      {
        title: 'Let the AI do the heavy lifting',
        text: 'Because the agent finds the documents in Drive, the design didn’t need to be complicated.',
      },
      {
        title: 'Keep the interface deliberately simple',
        text: 'The design only needs to show users where things stand.',
      },
    ],
  },
  outcomes: {
    heading: 'Outcomes and what I learned',
    honest:
      'I can’t share the end result. What I’d point to is the approach: when the AI does the heavy lifting, the design’s job is to show users clearly where things stand and stay out of the way.',
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

export const professionalFive: CaseStudy = {
  ...textOnlyTemplate,
  slug: 'safewave',
  // Draft until Sarah confirms she may show the real Safewave app. Brand icons in the screenshots are already blurred.
  draft: true,
  title: 'Safewave',
  kicker: 'Professional work · Mobile app',
  tagline: 'A companion app for a wristband that turns phone alerts into vibrations.',
  dek: 'Safewave makes a wristband that turns phone notifications into vibrations, so Deaf and hard-of-hearing people don’t miss important alerts like home security, baby monitors, alarms and texts. The companion app is how users connect their band and decide what they feel. I designed the app from scratch, including the login, the overall look, and the simple, approachable feel of the experience.',
  description:
    'Case study: designing the companion app for Safewave, a vibrating wristband for Deaf and hard-of-hearing users. A calm dark theme, one clear action on the home screen and simple alert setup.',
  meta: {
    role: 'UX/UI designer',
    timeline: 'About six months',
    tools: 'Figma',
    deliverables: 'Mobile app design: login, overall look, Home, Alerts and navigation',
  },
  hero: {
    label: 'The Safewave app: login and notification settings',
    src: '/safewave/hero.webp',
    alt: 'Two phones showing the Safewave app. One shows the login screen with the Safewave logo, email and password fields, a Login button and a Sign in with Google button. The other shows notification settings for one app, with an Enabled switch and sliders for notification strength and number of vibrations.',
    priority: true,
    width: 1600,
    height: 800,
  },
  summary: {
    problem:
      'The app is the only way Safewave users control what their band makes them feel, so a confusing setup could mean a missed security alert or a crying baby.',
    did: 'Designed the app from scratch: a dark theme with one blue accent, a home screen with a single action, a simple alert setup and three-tab navigation.',
    result: 'The app is still in use today, paired with the company’s wristband.',
  },
  problem: {
    heading: 'The app is the only way to control what you feel',
    paragraphs: [
      'For Safewave’s users, the app is the only way to control what they feel. Choosing which apps can trigger the band, and how strongly, directly affects whether someone wakes up to a security alert or a crying baby.',
      'That raised the bar for the design: setup had to be quick and clear, nothing important could be hidden, and the app had to feel trustworthy and easy to use at any hour.',
    ],
  },
  decisions: {
    heading: 'What I designed',
    intro: 'Four choices shaped the app, each aimed at making setup quick and the app easy to trust.',
    items: [
      {
        title: 'A simple, welcoming first impression',
        tag: 'Login and overall look',
        problem:
          'The app is the only way users control their band, so it had to feel trustworthy from the very first screen.',
        approach:
          'I designed the login and the overall look of the app. It uses a dark theme with a single blue accent, which keeps screens calm and readable.',
        outcome: 'The brand has a consistent identity from the first screen.',
        shot: {
          label: 'Login screen',
          src: '/safewave/login.webp',
          alt: 'The Safewave login screen on a dark blue background: the shield-and-knight logo, the Safewave wordmark, email and password fields, a blue Login button, a Sign in with Google button and a Create Account link.',
        },
      },
      {
        title: 'One clear action on the home screen',
        tag: 'Connect the band',
        problem: 'The home screen has a single job: connect the band.',
        approach:
          'A large Bluetooth button and one line of instruction: “Please press the button above to connect your Safewave band.”',
        outcome: 'It is obvious what to do next.',
        shot: {
          label: 'Home screen',
          src: '/safewave/home.webp',
          alt: 'The Safewave Home screen. A large white circle with a blue Bluetooth symbol sits under the heading Admin, with the line “Please press the button above to connect your Safewave band.” A bottom bar shows Home, Alerts and History.',
        },
      },
      {
        title: 'Straightforward alert setup',
        tag: 'Choosing what to feel',
        problem:
          'Choosing which apps can trigger the band, and how strongly, decides whether someone wakes up to a security alert or a crying baby.',
        approach:
          'The Alerts screen shows the apps that can trigger the band as a grid of familiar icons, with an add button for more. Each app has its own settings for vibration strength and number of vibrations.',
        outcome: 'Users can tailor what they feel to what matters most to them.',
        shot: {
          label: 'Alerts screen',
          src: '/safewave/alerts.webp',
          alt: 'The Safewave Alerts screen. A grid of four app icons, including a messages app and a home security app, under the line “Click on the add button in the top right to add apps you’d like to receive notifications for.”',
        },
      },
      {
        title: 'Easy navigation',
        tag: 'Three tabs',
        problem: 'The app is a means to an end, so it shouldn’t feel bigger than the task.',
        approach: 'Three tabs (Home, Alerts and History) cover everything users need.',
        outcome: 'The app never feels bigger than the task.',
      },
    ],
  },
  process: {
    heading: 'How I approached it',
    intro: 'I designed the app from scratch. These were the principles behind it.',
    items: [
      {
        title: 'Start from what’s at stake',
        text: 'Missing a notification can mean missing a security alert or a baby. So setup had to be quick and clear, and nothing important could be hidden.',
      },
      {
        title: 'Give each screen one job',
        text: 'Home connects the band. Alerts chooses what triggers it. History is a tab away. Nothing competes with the task at hand.',
      },
      {
        title: 'Keep it calm and trustworthy',
        text: 'A dark theme with a single blue accent keeps the screens readable at any hour and gives the brand one consistent identity.',
      },
    ],
  },
  outcomes: {
    heading: 'Where it stands',
    honest: 'The Safewave app is still in use today, paired with the company’s wristband.',
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

export const plumbing: CaseStudy = {
  slug: 'plumbing',
  draft: false,
  title: 'Reilly Plumbing',
  kicker: 'Case study 02 · A family business',
  liveSite: {
    label: 'View the live site',
    href: 'https://plumbing-site.sarahmreilly76.workers.dev/',
    note: 'A design demo with placeholder business details. The request form sends nothing.',
  },
  tagline: 'Honest plumbing from a family you can trust.',
  dek: 'A website and brand guide for a family-owned plumbing company, designed so a worried homeowner can say what’s going on and know what happens next. The brand was written down as a small design system, so the site stays consistent from phone to desktop.',
  description:
    'A website and design system for a family-owned plumbing company: a warm, plain-spoken brand, five components, and a guide that never invents facts.',
  meta: {
    role: 'UX/UI design, brand guide and design system',
    timeline: 'About a week',
    tools: 'Claude Design, Claude Code · Fraunces, DM Sans',
    deliverables: 'Mobile and desktop page designs, a brand guide with tokens, voice and five components, and live component previews',
  },
  stats: [
    { value: '16', label: 'Color tokens' },
    { value: '15', label: 'Text styles' },
    { value: '5', label: 'Components' },
    { value: '2', label: 'Layouts' },
  ],
  hero: {
    label: 'Hero: Reilly Plumbing',
    src: '/plumbing/hero.webp',
    srcMobile: '/plumbing/hero-mobile.webp',
    alt: 'Reilly Plumbing, a website and brand guide for a family plumbing company: the headline “Honest plumbing, made easy to ask for.” beside three phones showing the services, home and request-service screens.',
    priority: true,
    width: 1600,
    height: 900,
  },
  summary: {
    problem:
      'Someone with a leak or a clog wants to know whether this company can help and what happens when they ask. Trade-company sites often answer with jargon and a “contact us” button.',
    did: 'Designed the pages for phone and desktop, then wrote the brand down as a design system: a voice, 16 color tokens, a type scale and five components, with rules for what never to do.',
    result:
      'A working demo site, built from the guide, with placeholder business details. It isn’t published for the client yet.',
  },
  problem: {
    heading: 'A stressed customer, a plain question',
    paragraphs: [
      'Reilly Plumbing is a family-owned local company. People who reach the site usually have something wrong at home: a leak, a clog, a water heater that stopped. They aren’t browsing. They want to know whether this is the right company and what happens next.',
      'The business already had its character, a family you can trust, but nothing written down to keep a site true to it.',
    ],
    constraintsIntro: 'The design works inside a few constraints:',
    constraints: [
      'Real business details (phone, email, service area, license number) weren’t final, so the guide treats them as bracketed placeholders.',
      'Mobile first: a four-tab bottom bar below 768px, and a header with links from 768px up.',
      'No claims without a source: no years in business, ratings, guarantees or response times.',
    ],
  },
  system: {
    title: 'A brand written down before the screens multiplied',
    intro:
      'Excerpts from the guide: a deep forest green with one gold accent on a warm cream ground, a serif for headings and a plain sans for everything else.',
    paletteTitle: 'Palette: forest, one gold accent, warm neutrals',
    palette: [
      { name: 'Forest', hex: '#1F4D3A', note: 'Brand fill: buttons, hero panels' },
      { name: 'Deep', hex: '#14382A', note: 'Headings and the footer' },
      { name: 'Gold', hex: '#E5B454', note: 'The only accent, on dark grounds' },
      { name: 'Gold ink', hex: '#8A5A12', note: 'Eyebrow labels on light grounds' },
      { name: 'Cream', hex: '#F8F4EA', note: 'Page ground' },
      { name: 'Sage', hex: '#E3EDE6', note: 'Active nav pill, icon circles' },
    ],
    type: {
      title: 'Type: a sturdy serif and a plain sans',
      rows: [
        { role: 'Display', spec: 'Fraunces 600, for headlines and the wordmark only' },
        { role: 'Body', spec: 'DM Sans 16 px, for everything else' },
        { role: 'Eyebrows', spec: 'DM Sans Bold, 13 px, capitals, in gold ink' },
        { role: 'Scale', spec: 'Four display sizes, from 58 px on the desktop hero to 30 px on mobile titles' },
      ],
    },
    voice: {
      quote: 'Write like a neighbor who happens to know plumbing: warm, plain-spoken, confident, never salesy.',
      lines: [
        '“Honest plumbing from a family you can trust.”',
        '“From a leaky faucet to a burst pipe, we treat your home like our own.”',
        '“Tell us what’s going on.”',
      ],
    },
    rules: {
      title: 'Rules the screens follow',
      items: [
        'Gold is the only accent, and never text on a light ground.',
        'No gradients and no shadows: surfaces separate by fill or a 1 px line.',
        'Every tappable control is at least 44 px tall.',
        'Focus rings are always visible: 2 px, with a 2 px offset.',
        'Never invent facts: business details stay in brackets until the owner supplies them.',
      ],
    },
  },
  decisions: {
    heading: 'The choices that shaped the system',
    intro: 'Not a page-by-page tour. These are the calls that made the guide useful to the next person who touches the site.',
    items: [
      {
        title: 'Write the voice down first',
        tag: 'Words are part of the design system',
        problem:
          'Trade-company sites tend to lean on jargon and a “contact us” button, which leaves a worried customer guessing what happens next.',
        approach:
          'The guide sets a voice (a neighbor who happens to know plumbing), asks for everyday words like “leak” and “drain,” and says what happens next instead of hiding behind “contact us.” Headings and buttons use sentence case, and an exclamation point appears only to say thanks.',
        outcome:
          'Copy that sounds like the family, and a rule a future writer can follow without asking.',
        shot: {
          label: 'Confirmation screen, mobile',
          src: '/plumbing/m-confirmation.webp',
          alt: 'The confirmation screen: “Thanks! Your request is in.”, a note that a member of the Reilly family will call, and three numbered steps explaining what happens next.',
          width: 640,
          height: 1385,
        },
      },
      {
        title: 'Never invent facts',
        tag: 'Honest placeholders instead of made-up claims',
        problem:
          'It’s tempting to fill a small-business site with years in business, ratings and “24/7.” If any of it is wrong, it costs the family the trust the site is selling.',
        approach:
          'Every business detail is a bracketed placeholder until the owner supplies it: [Phone], [Cities we serve], [License #], [Family photo]. The guide forbids claims about ratings, guarantees, prices or response times without a source.',
        outcome:
          'The design could be finished without guessing, and nothing on the site can be untrue by accident.',
      },
      {
        title: 'Contrast is written into the tokens',
        tag: 'Accessibility as a property of the system',
        problem:
          'Accessibility checked at the end is accessibility fixed late, screen by screen.',
        approach:
          'Each color token records where it may be used and the contrast it clears. Cream text on forest clears 4.5:1; gold is only for fills and small icons, so text on a light ground uses a separate gold ink; form borders use their own darker line color at about 3.7:1, and decorative lines never serve as a control border.',
        outcome:
          'A designer or developer picking a color can see whether it’s allowed there, and the accessible choice is the default one.',
      },
      {
        title: 'The phone gets its own navigation',
        tag: 'A four-tab bar, then a header at 768px',
        problem:
          'On a phone, a header with several links and a phone number crowds the screen right when someone with a leak needs a clear next step.',
        approach:
          'Below 768px the site uses a four-tab bottom bar: Home, Services, Request and Family. From 768px up it becomes a header with links, the phone number and one Request service button. The active tab is marked with a pill and a bolder label, never color alone.',
        outcome:
          'The most important action, asking for service, is one thumb-tap away on a phone, and the desktop version keeps the same four destinations.',
        shot: {
          label: 'Request service, desktop',
          src: '/plumbing/request.webp',
          alt: 'The desktop request-service page: a header with Home, Services and Our family links, the phone number and a Request service button, above a short form.',
          wide: true,
          width: 1280,
          height: 1060,
        },
      },
    ],
    gallery: [
      {
        label: 'Home, mobile',
        src: '/plumbing/m-home.webp',
        alt: 'The mobile home screen: a forest-green hero panel reading “Honest plumbing from a family you can trust,” a gold Request service button, four service tiles and a Meet the Reillys card, above the four-tab bar.',
        caption: 'Home: one clear ask, then the four main services.',
      },
      {
        label: 'Services, mobile',
        src: '/plumbing/m-services.webp',
        alt: 'The mobile Services screen: a list of plumbing services, each with an icon, a name and a short description.',
        caption: 'Services: a plain list, with a clear path for emergencies.',
      },
      {
        label: 'Request service, mobile',
        src: '/plumbing/m-request.webp',
        alt: 'The mobile Request service screen: a short form with name, phone, address, what is going on and how soon it is needed.',
        caption: 'Request: a short form, with urgency as a plain choice.',
      },
      {
        label: 'Our family, mobile',
        src: '/plumbing/m-family.webp',
        alt: 'The mobile Our family screen: an introduction to the family behind the company, with placeholders for photos and details.',
        caption: 'Family: room for the story, a photo and the team. Placeholders until the family supplies them.',
      },
    ],
  },
  process: {
    heading: 'How I worked',
    intro: 'I started this as a favor for a family-owned local company, and built it in about a week with Claude Code.',
    items: [
      {
        title: 'Design the pages',
        text: 'I designed the mobile and desktop pages first: home, services, request service, the family and the confirmation.',
      },
      {
        title: 'Write the system down',
        text: 'With the screens in hand, I wrote the guide: tokens with usage notes, a voice, and five components (button, form controls, logo, navigation and service card), each with guidance and a live preview.',
      },
      {
        title: 'Build from the guide',
        text: 'I built the site from the guide in React and Tailwind with Claude Code, using the guide’s tokens as the theme, so the code and the guide stay in step.',
      },
    ],
  },
  outcomes: {
    heading: 'What came out of it',
    shipped: [
      { title: 'A brand and design system guide', text: 'Tokens, voice, rules and five components, each with live previews' },
      { title: 'Mobile and desktop layouts', text: 'Designed for a request-service flow that ends in a clear confirmation' },
    ],
    honest:
      'The site runs as a demo, and it isn’t published for the client yet. The business details, real logo and family photos are still placeholders, and the request form sends nothing until a real backend replaces the stand-in. I started it as a favor, and what it shows is how I take a brand from a written guide to a working site.',
  },
  next: { title: 'Petals-n-Glass', to: '/work/flower-shop' },
}

export const flowerShop: CaseStudy = {
  slug: 'flower-shop',
  draft: false,
  title: 'Petals-n-Glass',
  kicker: 'Case study 03 · Self-initiated concept',
  tagline: 'Flowers, gathered gently.',
  dek: 'A self-initiated concept for a neighborhood flower boutique: the whole path from first browse to a placed order, designed for desktop and mobile, with a florist’s eye for how people actually shop for flowers.',
  description:
    'Self-initiated concept: a neighborhood flower boutique designed across nine pages in desktop and mobile, from an occasion-led home page through product, cart and checkout.',
  meta: {
    role: 'UX/UI design (self-initiated)',
    timeline: 'About a week',
    tools: 'Claude Code · Fraunces, Nunito Sans',
    deliverables: 'Nine pages in desktop and mobile, a mobile menu, and clickable product, cart and checkout flows',
  },
  stats: [
    { value: '19', label: 'Screens' },
    { value: '9', label: 'Pages' },
    { value: '2', label: 'Layouts each' },
    { value: '2', label: 'Typefaces' },
  ],
  hero: {
    label: 'Hero: home page',
    src: '/petals/hero.webp',
    srcMobile: '/petals/hero-mobile.webp',
    alt: 'Petals-n-Glass, a concept site for a flower boutique: the headline “Flowers for every occasion, made simple.” beside three phones showing the gifts page, a bouquet page and the weddings page.',
    priority: true,
    width: 1600,
    height: 900,
  },
  summary: {
    problem:
      'People shop for flowers for a moment, not a product, and florist sites often hand them a long grid and leave them to sort it out. The goal was a site for a small florist who relied heavily on Facebook to show her work. People now expect to browse and order online, especially when they are spending real money on flowers.',
    did: 'Designed nine pages in desktop and mobile, from an occasion-led home page through product, cart, checkout and confirmation, in a warm sage-and-terracotta system with two typefaces.',
    result:
      'A complete, clickable concept for one shop. It is a self-initiated design, not a live site, so there are no metrics to report.',
  },
  problem: {
    heading: 'People shop for a moment, not for “flowers”.',
    paragraphs: [
      'A neighborhood flower shop sells things people rarely browse for fun. They arrive with an occasion: a birthday, a thank-you, a funeral, a wedding. The site starts from the occasion instead of a catalog.',
      'This is a self-initiated concept, and I spent years working as a florist, so I designed it around the practical questions a customer has at the counter. The most common were whether we deliver and where, what certain sizes and services cost, and whether we could recreate an inspiration photo they had brought in.',
    ],
    constraintsIntro: 'The design works inside a few constraints:',
    constraints: [
      'One small shop: ordering ends in pickup or local delivery, not shipping.',
      'Same-day matters: orders placed by 1pm can go out the same day.',
      'The phone is first-class: every page has a mobile layout.',
    ],
  },
  system: {
    title: 'A small system with a florist’s palette',
    intro:
      'Excerpts from the design: sage for structure, one terracotta accent, and cream and sand as the ground.',
    paletteTitle: 'Palette: sage, one warm accent, soft neutrals',
    palette: [
      { name: 'Sage', hex: '#4A6044', note: 'Buttons, icons, active states' },
      { name: 'Forest', hex: '#2F3D2B', note: 'Text and headings' },
      { name: 'Terracotta', hex: '#9A5238', note: 'Eyebrow labels, hover, accents' },
      { name: 'Cream', hex: '#F6F2E9', note: 'Page background' },
      { name: 'Sand', hex: '#EAE2D0', note: 'Summary cards and notices' },
      { name: 'Mist', hex: '#DDE5D3', note: 'Image panels, step numbers' },
    ],
    type: {
      title: 'Type: a soft serif and a plain sans',
      rows: [
        { role: 'Display', spec: 'Fraunces Light, for headlines, prices and card titles' },
        { role: 'Body', spec: 'Nunito Sans, 16–18 px, for everything else' },
        { role: 'Eyebrows', spec: 'Nunito Sans Bold, uppercase, wide tracking, in terracotta' },
        { role: 'Buttons', spec: 'Pills, 48–60 px tall' },
      ],
    },
    voice: {
      quote: 'Copy sounds like a florist talking across the counter: warm and short.',
      lines: [
        '“Flowers, gathered gently.”',
        '“Tell us who the flowers are for and we will build something that fits.”',
        '“Fresh blooms are waiting.”',
      ],
    },
    rules: {
      title: 'Rules the screens follow',
      items: [
        'Tap targets are at least 44 px; most buttons are 48–60 px.',
        'Every choice that changes the order (size, delivery or pickup) is a real button that exposes its state.',
        'Fields have visible labels, not placeholders alone.',
        'Quantity changes announce themselves to screen readers.',
      ],
    },
  },
  decisions: {
    heading: 'The choices that shaped the design',
    intro: 'Not a page-by-page tour. These are the calls where the obvious layout would have worked less well.',
    items: [
      {
        title: 'Organize by occasion',
        tag: 'The home page asks who the flowers are for',
        problem: 'A flat grid of arrangements makes the visitor do the sorting.',
        approach:
          'The home page leads with “Find the right flowers”: everyday bouquets, sympathy and remembrance, weddings and events, and gifts and glass. Weddings & Events and Gifts & Glass get their own pages and their own place in a four-item navigation.',
        outcome:
          'A first-time visitor can tell where they belong in one look, and the shop’s bigger services have a front door of their own. Weddings are a large part of the business and deserve space alongside other events. The shop also sells small items next to its larger services, so splitting the two keeps each easy to find.',
        shot: {
          label: 'Find the right flowers',
          src: '/petals/occasions.webp',
          alt: 'The “Find the right flowers” section: four cards for everyday bouquets, sympathy and remembrance, weddings and events, and gifts and glass, each with a one-line description and a link.',
          caption: 'Four occasions, each with a short promise and a way in.',
          wide: true,
        },
      },
      {
        title: 'Put the answers where the question comes up',
        tag: 'Delivery, pickup and same-day timing before the button',
        problem:
          'Delivery cost and timing are often learned at checkout, a familiar reason people abandon an order.',
        approach:
          'The product page says it before the button: free in-shop pickup, local delivery for $10, order by 1pm for same day. The cart repeats the delivery line and points to free pickup, and checkout turns the choice into its first question.',
        outcome:
          'Nothing about cost or timing is a surprise by the time someone reaches payment. In the prototype the total moves from $98 to $108 as the choice changes.',
        shot: {
          label: 'Product page',
          src: '/petals/product.webp',
          alt: 'The Garden Tulip Wrap product page. An illustration of tulips in kraft paper on the left. On the right: a size picker (Standard $48, Deluxe $62, Grand $78), an optional card message, an Add to cart button, and a note reading “Free in-shop pickup. Local delivery $10, order by 1pm for same-day.”',
          caption: 'Size, card message and the delivery note sit together, above the details.',
          wide: true,
        },
      },
      {
        title: 'One question changes the form',
        tag: 'Delivery or pickup decides which fields appear',
        problem: 'One long form asks pickup customers for an address they don’t have.',
        approach:
          'The first choice at checkout, “How would you like it?”, swaps the next block: recipient, date and address for delivery; a date and time slot for pickup. Details, card message and payment stay put, and the summary relabels its fee line to match.',
        outcome:
          'Each person sees only the fields they need, and a gift for someone else gets a recipient name and delivery date up front.',
        shots: [
          {
            label: 'Checkout, delivery selected',
            src: '/petals/checkout.webp',
            alt: 'Desktop checkout page. Local delivery is selected above fields for details, delivery address, gift message and payment, with an order summary on the right totaling $108.',
            caption: 'Delivery selected. The address block appears only for delivery.',
            wide: true,
            width: 1400,
            height: 1516,
            maxWidth: 640,
          },
          {
            label: 'Mobile checkout',
            src: '/petals/m-checkout.webp',
            alt: 'Mobile checkout: order summary first, then two large choices for local delivery and in-shop pickup, then the first details fields.',
            caption: 'On a phone the summary comes first and the choice stacks.',
          },
        ],
      },
      {
        title: 'The phone gets its own front door',
        tag: 'A mobile menu that answers “are you open?”',
        problem: 'On a phone, the next step is often just to order or to call.',
        approach:
          'The mobile menu is full screen, with large links and a card pinned to the bottom: today’s hours, the address, and two buttons, Order flowers and Call the shop.',
        outcome: 'The two most likely next steps are one thumb away from anywhere on the site.',
        shot: {
          label: 'Mobile menu, open',
          src: '/petals/m-menu.webp',
          alt: 'The open mobile menu: four large links (Bouquets, Weddings & Events, Gifts & Glass, Visit) and, pinned at the bottom, today’s hours, the shop address, and the buttons Order flowers and Call the shop.',
        },
      },
    ],
    gallery: [
      {
        label: 'Weddings & Events, mobile',
        src: '/petals/m-weddings.webp',
        alt: 'The Weddings & Events page on a phone: the headline “Flowers for the day you’ve been planning.”, two buttons, and a note that wedding florals start at $850.',
        caption: 'Weddings & Events, mobile.',
      },
      {
        label: 'Gifts & Glass, mobile',
        src: '/petals/m-gifts.webp',
        alt: 'The Gifts & Glass page on a phone: a two-column grid of gifts including a glass bud vase, a soy candle, a pressed flower frame and a ceramic planter, each with a price and an Add to order button.',
        caption: 'Gifts & Glass, mobile.',
      },
      {
        label: 'Product, mobile',
        src: '/petals/m-product.webp',
        alt: 'The Garden Tulip Wrap product page on a phone, with the illustration, size picker, card message field and a full-width Add to cart button.',
        caption: 'Product page, mobile.',
      },
    ],
  },
  process: {
    heading: 'How the work was shaped',
    intro: 'Mostly a build-it-and-click-it approach, drawing on my own years of working for a florist. I first built a version of this as a college HTML and CSS project, and I know what people look for.',
    items: [
      {
        title: 'Started from a small sitemap',
        text: 'Four navigation items and a cart: Bouquets, Weddings & Events, Gifts & Glass, Visit. Everything else hangs off those.',
      },
      {
        title: 'Designed desktop and mobile together',
        text: 'Each of the nine pages has a desktop and a mobile layout, built from the same system so they stay in step.',
      },
      {
        title: 'Prototyped the buying path',
        text: 'The product, cart and checkout screens are interactive: pick a size, change quantities, switch between delivery and pickup, and watch the totals update.',
      },
    ],
  },
  outcomes: {
    heading: 'What it is, and what it isn’t',
    shipped: [
      { title: 'Home', text: 'Occasion-led, with this week’s bouquets and a visit card' },
      { title: 'Bouquets and product', text: 'Sizes with stem counts, a card message, care tips' },
      { title: 'Cart to confirmation', text: 'Delivery or pickup, live totals, a next-steps page' },
      { title: 'Weddings, Gifts & Glass, Visit', text: 'The three pages around the shop' },
      { title: 'Mobile', text: 'A layout for every page, plus a full-screen menu' },
    ],
    honest:
      'This is a self-initiated concept, so there are no users or sales to report, and the shop details are placeholders. It is here to show how I think through a whole buying path, from first browse to confirmation. With a real shop I would first test whether requesting delivery online works better than taking it by phone: does it help a very busy owner, or just give her a second place to check for orders? I would also verify that delivery windows and distances match the shop’s real location.',
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

export const tallymark: CaseStudy = {
  slug: 'tallymark',
  title: 'Tallymark',
  kicker: 'Small project · In progress',
  liveSite: {
    label: 'Open the app',
    href: '/tallymark/',
    note: 'Free and installable. Class lists and scores stay on your device, and nothing is uploaded.',
  },
  tagline: 'Sheets and games, scrambled fresh every week.',
  dek: 'A free web app that makes scrambled one-minute fluency sheets, bingo, flashcards and matching cards for letters, numbers, shapes, colors and sight words. It began as one worksheet for my son and grew into a small teacher tool, designed and built solo with Claude Code as a coding partner. It is still in progress, and I’m adding to it as I learn what teachers need.',
  description:
    'Tallymark is a free, installable web app for printable one-minute fluency sheets and games, with a fresh weekly scramble, teacher scoring copies and no data leaving the browser.',
  meta: {
    role: 'Product design, brand and solo development',
    timeline: 'Started Nov 2026, still in progress',
    tools: 'HTML, CSS and JavaScript, jsPDF, Claude Code · Andika, Inter',
    deliverables: 'Installable web app, printable sheet and game designs, logo, one-page brand guide',
  },
  stats: [
    { value: '4', label: 'Printable formats' },
    { value: 'Weekly', label: 'Fresh scramble' },
    { value: 'Offline', label: 'Works installed' },
    { value: '0', label: 'Servers' },
  ],
  hero: {
    label: 'Hero: the Tallymark app',
    src: '/tallymark-study/hero.webp',
    alt: 'The Tallymark app: the headline “Sheets and games, scrambled fresh every week.”, a list of formats (fluency sheet, bingo, flashcards, matching cards) and a preview of a letter-name sheet with Print and Save PDF buttons.',
    priority: true,
    width: 1600,
    height: 900,
  },
  summary: {
    problem:
      'A fixed practice sheet gets memorized within a week, and a teacher needs a different sheet for each child plus a copy for scoring.',
    did: 'Designed a sheet system with a seeded weekly scramble, student and teacher copies and four printable formats, then built it as an installable app with its own brand.',
    result:
      'A working app that runs offline and keeps every name and score on the device. I use it at home each week. It hasn’t been tested with teachers yet.',
  },
  problem: {
    heading: 'The sheet worked until he memorized it',
    paragraphs: [
      'I time my son for one minute on letter names and sounds, and count how many he gets right. The same page every week turns into a memory test, so each week needs a new order that still covers every letter evenly.',
      'Teachers have the same need at class size. Each student needs a different sheet, a teacher copy for scoring, and a simple way to see whether the numbers are climbing.',
    ],
    constraintsIntro: 'A few constraints shaped everything else:',
    constraints: [
      'It has to print well on plain US Letter paper, in black and white.',
      'It has to be free to host and work with no account or server.',
      'Children’s names and scores must never leave the device.',
    ],
  },
  system: {
    title: 'A small brand, written down once',
    intro:
      'The interface stays quiet so the printed sheets are the loudest thing on the screen: navy ink, one red grading-pen accent and a highlighter-yellow mark behind a key word.',
    paletteTitle: 'Palette: navy ink, one pen red, a highlighter',
    palette: [
      { name: 'Navy', hex: '#1B2F5E', note: 'Primary actions and the logo bars' },
      { name: 'Pen red', hex: '#D4283B', note: 'The logo slash, teacher marks and errors' },
      { name: 'Highlighter', hex: '#FFE27A', note: 'Behind one key word per heading' },
      { name: 'Blue', hex: '#2457C5', note: 'Secondary action and the focus ring' },
      { name: 'Ink', hex: '#111827', note: 'Text on printed sheets' },
      { name: 'Mist', hex: '#F2F5F9', note: 'Page ground' },
    ],
    type: {
      title: 'Type: a reader’s typeface for the paper, a plain sans for the tool',
      rows: [
        { role: 'Sheets and headings', spec: 'Andika, made for early readers, with distinct a, g, I and l' },
        { role: 'Interface', spec: 'Inter 15 px, labels 13 px semibold' },
        { role: 'Rule', spec: 'Never a decorative or handwriting face for a letter or number on a sheet' },
      ],
    },
    voice: {
      quote: 'Write like a busy teacher’s colleague: plain, warm and brief.',
      lines: [
        '“Pick what to make and what to practice, then print or save a PDF.”',
        '“Class lists and scores stay on this device. Nothing is uploaded.”',
      ],
    },
    rules: {
      title: 'Rules the screens follow',
      items: [
        'Sheets stay white with dark ink in light and dark mode, because they model paper.',
        'Dark mode lightens the blues and puts dark text on them, rather than keeping white text on a saturated fill.',
        'Body and secondary text clear 5:1 contrast in both themes.',
        'Red and green are never the only cue; each comes with a word.',
        'Focus rings are always visible: 3 px, with a 2 px offset.',
      ],
    },
  },
  decisions: {
    heading: 'The choices that shaped it',
    intro: 'Not a feature tour. These are the calls that made the sheets useful to a parent or a teacher.',
    items: [
      {
        title: 'A scramble that is fair and repeatable',
        tag: 'Seeded by the week',
        problem: 'A random shuffle can repeat a letter back to back or skip one, and a different result every time you press Print makes two printouts disagree.',
        approach:
          'The week’s date seeds the shuffle, so the same week always gives the same sheet. Every letter appears equally often, and the order is repaired so the same letter never sits next to itself. Teachers can also type a code, like “Room 12 Unit 3”, for a sheet of their own.',
        outcome: 'The student copy and the teacher copy always match, and next week brings a new order.',
      },
      {
        title: 'The teacher copy does the counting',
        tag: 'Two copies, one scramble',
        problem: 'Scoring a one-minute timing while a child reads aloud leaves no hands free to count.',
        approach:
          'The teacher copy repeats the same letters with the running count at the end of each row. Slash each miss, draw a line where time ran out, then fill in Reached, Errors and Correct. Correct is reached minus errors.',
        outcome: 'Scoring is a glance and a subtraction, and the numbers can go straight into the progress chart.',
        shot: {
          label: 'Teacher copy',
          src: '/tallymark-study/sheet-teacher.webp',
          alt: 'A teacher copy of a letter-name sheet with running counts at the end of each row and boxes for Reached, Errors and Correct.',
          wide: true,
          maxWidth: 440,
          width: 937,
          height: 1212,
        },
      },
      {
        title: 'Separate what you practice from what you print',
        tag: 'Sets and formats',
        problem: 'Letters, numbers, shapes, colors and sight words each want sheets, bingo and flashcards. Building each pair by hand would never end.',
        approach:
          'Content is a set, and a format is a way to print it. Any set works in any format, so adding sight words or a teacher’s own list adds every game at once. Shapes and colors carry an outline and a text label so color is never the only cue.',
        outcome: 'New ideas become one line of content, and the four formats stay consistent.',
        shot: {
          label: 'Bingo cards',
          src: '/tallymark-study/bingo.webp',
          alt: 'Two bingo cards of uppercase letters, each with a free space in the middle and a name line.',
          wide: true,
          maxWidth: 440,
          width: 937,
          height: 1212,
        },
      },
      {
        title: 'Let parents track the week',
        tag: 'A practice-days row',
        problem: 'A single sheet shows one attempt. A parent wants to see whether the week is going well.',
        approach:
          'The student copy ends with seven small boxes, Monday to Sunday, to write the number correct. The grid shrinks a little to make room, and it still prints cleanly on one page.',
        outcome: 'Progress is visible on the fridge, without opening the app.',
        shot: {
          label: 'Student copy',
          src: '/tallymark-study/sheet-student.webp',
          alt: 'A student copy of a letter-name sheet with a practice-days row of seven boxes, Monday to Sunday, at the bottom.',
          wide: true,
          maxWidth: 440,
          width: 937,
          height: 1212,
        },
      },
      {
        title: 'Light and dark, with paper that stays paper',
        tag: 'Two themes, one printed page',
        problem:
          'Teachers and parents use the app at all hours, on screens set to light or dark. But a printed sheet is always black ink on white paper, so a dark preview that turned the sheet dark would lie about what comes out of the printer.',
        approach:
          'The app follows the device’s color setting. In dark mode the page and panels go navy, and the primary and secondary blues lighten with dark text on them, instead of staying saturated with white text. The highlighter dims to a muted gold behind the key word, and the pen red lightens so it still reads. The sheet itself is the exception: it stays white with dark ink in both themes, because it models paper. I checked body and secondary text against the 5:1 contrast target in both.',
        outcome:
          'The interface is comfortable in a dim room, and the preview always shows what will actually print.',
        shot: {
          label: 'Light and dark themes side by side',
          src: '/tallymark-study/light-dark.webp',
          alt: 'The Tallymark app in its light theme (pale blue-grey page, navy primary button) beside its dark theme (navy page, light blue buttons). In both, the preview sheet stays white with dark letters.',
          wide: true,
          width: 1600,
          height: 500,
        },
      },
      {
        title: 'Privacy by construction',
        tag: 'No server, so nothing to leak',
        problem: 'A class list is a list of children’s names. The safest place for it is nowhere I control.',
        approach:
          'There are no accounts, no analytics and no uploads. Class lists and scores live in the browser, with a JSON or CSV backup the teacher keeps. PDFs are drawn in the browser, so the app also works offline once installed.',
        outcome: 'Nothing about a child leaves the device, and there is nothing for me to store or secure.',
      },
    ],
  },
  process: {
    heading: 'How I worked',
    intro: 'I treated it as a small product: start from one real use, then grow the structure only when a second use showed up.',
    items: [
      { title: 'Start with one sheet', text: 'A single page of uppercase letters, timed for a minute, printed and tested at home. The first lesson was that print quality is the product.' },
      { title: 'Generalize the structure', text: 'Teachers’ needs (class lists, progress, custom lists) turned letters into sets and sheets into formats. I rebuilt around that split before adding more content.' },
      { title: 'Write the brand down', text: 'With the app working, I made the logo, tokens and a one-page guide with contrast checked in both themes, so new formats look like the same product.' },
      { title: 'Build with Claude Code', text: 'I designed the sheets and decisions, and used Claude Code to implement and test them. I reviewed every printed page and PDF myself.' },
    ],
  },
  outcomes: {
    heading: 'What it is, and what it isn’t',
    shipped: [
      { title: 'Fluency sheets', text: 'Student and teacher copies, with a practice-days row' },
      { title: 'Bingo, flashcards, matching', text: 'Printable games from the same sets' },
      { title: 'Class lists and progress', text: 'Per-student sheets, scores and a weekly chart, with backups' },
      { title: 'An installable app', text: 'Works offline, with a logo and a one-page brand guide' },
    ],
    honest:
      'This project is still in progress. I use it at home every week, but it hasn’t been tested in a classroom, so I can’t claim results for teachers yet. The name is a working one, and the first thing I would do next is watch a teacher use it and see which games actually get printed.',
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

export const caseStudies: readonly CaseStudy[] = [foxed, plumbing, flowerShop, adminConsole, constructionPlatform, documentPortal, professionalFive, tallymark]
export const getCaseStudy = (slug: string | undefined) => caseStudies.find((c) => c.slug === slug)
