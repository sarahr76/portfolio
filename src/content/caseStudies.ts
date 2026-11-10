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
        shot: {
          label: 'Screenshot: streak calendar and yearly Recap card',
          src: '/foxed/recap-october.webp',
          alt: 'The monthly recap for October. Three stat cards show finished, words and days read. A week-by-week bar chart is followed by a short line of copy, “You came out strong at the start of October,” and a list of what was still being read.',
          caption: 'The monthly recap: one quiet, voicey summary instead of badges.',
        },
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
    gallery: [
      {
        label: 'Blind Date with a Story',
        src: '/foxed/blind-date.webp',
        alt: 'The Blind Date with a Story screen: a wrapped parcel tied with a green ribbon and a tag reading “an evening, a fandom you’ve read before, domestic,” with mood chips above and an Unwrap it button below.',
        caption: 'Blind Date with a Story: a gift-wrapped pick from your own Waiting list.',
      },
      { label: 'Library' },
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

export const thinkingDifferently: CaseStudy = {
  slug: 'thinking-differently',
  // Draft until the client has OK'd showing her logo and brand name. Remove to publish.
  draft: true,
  title: 'Thinking Differently',
  kicker: 'Small project · Brand identity',
  tagline: 'A logo system and brand guide for a coaching practice.',
  dek: 'A small brand guide for a coaching practice whose logo is the owner’s own painted mark. It turns one textured painting, two lines of words and a single typeface into rules anyone can follow on a business card, a document or a sticker.',
  description:
    'A small brand guide for a coaching practice: one painted mark, one typeface, four logo versions and clear rules for print and digital use.',
  meta: {
    role: 'Brand identity & guide, built around the client’s paintings',
    timeline: 'About two weeks',
    tools: '[Confirm tools: e.g. Claude Design, Canva]',
    deliverables: 'Brand guide (PDF), logo versions, colour and type specs, print notes',
  },
  hero: {
    label: 'The primary logo',
    src: '/thinking-differently/logo-primary.webp',
    alt: 'The primary logo: a circular painted mark of black and white swirls, above the line “Thinking Differently. Starting with Me.” and the italic tagline “Exploring what’s possible.”',
    priority: true,
    width: 1400,
    height: 610,
    wide: true,
  },
  summary: {
    problem:
      'A painted, textured mark is hard to reproduce. It blurs at small sizes, and anything else on the page can compete with it.',
    did: 'Wrote a short guide that keeps everything else plain: white paper, one typeface, one dark colour taken from the mark, and four logo versions with a size rule for each.',
    result:
      'A guide that covers cards, documents, stickers and digital use. A vector and a one-colour version of the mark are still to do, and the guide says so.',
  },
  problem: {
    heading: 'A painting makes a lovely logo and a difficult one.',
    paragraphs: [
      'Thinking Differently helps people accept the way they think while staying true to themselves. The mark comes from the owner’s paintings: black and white paint that has been moved, with nothing added and nothing taken away. That is the promise of the brand, and it had to survive being printed on a business card.',
      'Painted texture is the hard part. It blurs at small sizes, falls apart in one-colour printing and loses its edge on a busy background. So the job was less about decoration and more about restraint: deciding what everything else on the page should not do.',
    ],
    constraintsIntro: 'The guide starts from three constraints:',
    constraints: [
      'One painted mark is the only thing with texture.',
      'One typeface, Glacial Indifference, free and already in Canva.',
      'Print in black ink only, on white uncoated stock.',
    ],
  },
  system: {
    title: 'The rules, kept short enough to follow',
    intro: 'Excerpts from the real guide: the colours, the type and the words that are part of the logo.',
    paletteTitle: 'Colour: the brand is mostly white',
    palette: [
      { name: 'White', hex: '#FFFFFF', note: 'All backgrounds' },
      { name: 'Black', hex: '#000000', note: 'Main line' },
      { name: 'Charcoal', hex: '#1F1E1B', note: 'Tagline, body text, dark card backs' },
      { name: 'Ring', hex: '#585752', note: 'Mark ring, secondary text' },
      { name: 'Pebble', hex: '#A8A49C', note: 'Mark only, never text' },
      { name: 'Hairline', hex: '#D9D5CC', note: 'Rules and dividers, never text' },
    ],
    type: {
      title: 'Type: one family, two styles',
      rows: [
        { role: 'Regular', spec: 'Main line, headings, body text, names' },
        { role: 'Italic', spec: 'The tagline, job titles, one stressed word at most' },
        { role: 'Bold', spec: 'Short labels inside documents, never in the logo' },
        { role: 'Print size', spec: 'No smaller than 8 pt; documents 10–11 pt' },
      ],
    },
    voice: {
      quote:
        'One sentence in Regular, never italic. If it has to break, break only after “Differently.”',
      lines: ['“Thinking Differently. Starting with Me.”', '“Exploring what’s possible.”'],
    },
    rules: {
      title: 'Don’t',
      items: [
        'Don’t recolour, outline or add a shadow to the mark.',
        'Don’t put the mark on a busy photo. On a dark background, keep a white disc behind it.',
        'Don’t set the main line in italic or the tagline upright.',
        'Don’t use any typeface other than Glacial Indifference.',
      ],
    },
  },
  decisions: {
    heading: 'The choices that shaped the guide',
    intro: 'Not every rule. These are the calls that let the painting do the work.',
    items: [
      {
        title: 'Plain on purpose',
        tag: 'Restraint around one textured thing',
        problem:
          'The mark is the only thing with texture, so anything else with personality competes with it: extra colours, a second typeface, borders, gradients.',
        approach:
          'Everything else is quiet. White backgrounds, one typeface and a single dark colour, Charcoal, taken from the mark’s own ring so it belongs to the painting instead of sitting beside it. Pebble and Hairline are never used for text.',
        outcome:
          'The painting gets the attention and the page stays calm. A rule of one dark area per piece (the back of a card, or nothing at all) stops a layout from drifting.',
      },
      {
        title: 'Two lines of words, with the order built in',
        tag: 'A tagline that can leave, a main line that can’t',
        problem:
          'A logo with words invites small edits: italics here, a missing full stop there, a break in the wrong place.',
        approach:
          'The main line is one sentence in Regular, never italic, and breaks only after “Differently.” The tagline is always italic, about 60% of the main line’s size, and can be dropped when space is tight. The main line can’t.',
        outcome: 'When space runs out there is already an answer: drop the tagline first.',
      },
      {
        title: 'Four versions, each with a size rule',
        tag: 'Deciding in advance what happens when space runs out',
        problem: 'A detailed painted mark and a long line of words don’t shrink gracefully.',
        approach:
          'Four versions: primary centred for cards and covers, horizontal for headers and signatures, compact with no tagline for anything under 2 in wide, and the mark alone for profile photos and stickers. The smallest sizes are written down: the mark at 0.35 in / 32 px and the main line at 8 pt.',
        outcome:
          'Nobody has to guess which version to use. The answer depends on the space, not on taste.',
        shots: [
          {
            label: 'Logo versions',
            src: '/thinking-differently/logo-versions.webp',
            alt: 'Three logo layouts. Horizontal: the mark beside the main line and tagline. Compact: a small mark beside the main line only. Mark only: the painted circle on its own at two sizes.',
            caption: 'Horizontal, compact and mark-only versions, each with a stated use.',
            wide: true,
          },
          {
            label: 'Business card front',
            src: '/thinking-differently/card-front.webp',
            alt: 'The front of a business card: the primary logo centred on white, with the main line and italic tagline beneath the painted mark.',
            caption: 'The business card front uses the primary version.',
            wide: true,
            maxWidth: 420,
          },
        ],
      },
      {
        title: 'Say what isn’t finished',
        tag: 'An honest list of what’s still open',
        problem:
          'The master mark is a 995 px transparent PNG that prints sharp to about 3.3 in, and one-colour methods such as embroidery or stamps would lose the texture.',
        approach:
          'The guide says so instead of papering over it: don’t print the mark below 0.35 in or in one colour until a simplified version exists, and get a vector version made for signage. Both are listed as still to do.',
        outcome:
          'Limits are written where the next person will see them, before a print run rather than after.',
      },
    ],
  },
  process: {
    heading: 'How the guide is organised',
    intro: 'It reads in the order someone would need it, from the idea to the files.',
    items: [
      {
        title: 'The idea and the words',
        text: 'It starts with why the mark looks the way it does, then fixes the wording so nothing downstream gets rewritten.',
      },
      {
        title: 'Logo, space and size',
        text: 'Four versions, clear space equal to a third of the mark’s height, and minimum sizes.',
      },
      {
        title: 'Colour and type',
        text: 'Six colours with their nearest Pantone references and one typeface, so a printer or a Canva user gets the same result.',
      },
      {
        title: 'Where it gets used',
        text: 'Business card, documents, stickers, profile photo, email signature and website: what goes where, at what size.',
      },
      {
        title: 'Don’ts and files',
        text: 'A short list of things not to do, then print notes and what is still to do.',
      },
    ],
  },
  outcomes: {
    heading: 'What came out of it, and what’s still open',
    shipped: [
      { title: 'Brand guide', text: 'Eleven short sections, from the idea to print notes' },
      { title: 'Four logo versions', text: 'With clear space and minimum sizes' },
      { title: 'Colour and type specs', text: 'Six colours, one typeface' },
      { title: 'Applications', text: 'Business card, documents, stickers, email, website' },
    ],
    honest:
      'This is a small project for a small practice, so there are no metrics to report. The client later chose a different direction, so the guide was never put into use. Still to do on the guide itself: a vector version of the mark and a simplified one-colour version for small sizes and stamps. The painting is the identity, and the guide’s job is to protect it.',
  },
  next: { title: 'Back to selected work', to: '/#work' },
}

export const caseStudies: readonly CaseStudy[] = [foxed, adminConsole, constructionPlatform, thinkingDifferently]
export const getCaseStudy = (slug: string | undefined) => caseStudies.find((c) => c.slug === slug)
