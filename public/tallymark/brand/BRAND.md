# Tallymark brand guide

Tokens live in `css/styles.css`. Logo files are in this folder.

Tallymark makes printable fluency sheets, bingo, flashcards and matching cards for teachers and parents. The look is a quiet tool page in navy ink with one red grading-pen slash, so the printed sheets stay the loudest thing on the screen.

## Voice
- Plain and warm, written to a busy teacher. Short sentences, no hype: "Pick what to make and what to practice, then print or save a PDF."
- Sentence case everywhere. Say "sheets", "students", "teacher copy", "reached", "errors". Never "worksheet generator" or "AI".
- Name one key word per page heading and highlight it with `hi`: "Sheets and games, <mark>scrambled fresh</mark> every week."
- Say the privacy fact plainly where data is entered: class lists and scores stay on this device and are never uploaded.
- No emoji. No exclamation marks.

## Logo
- Use `assets/Logo/logo-lockup.svg` on light grounds and `logo-lockup-on-dark.svg` on dark. Use `logo-lockup-one-color.svg` for single-ink print and `logo-mark.svg` when the name is already nearby.
- The mark is four vertical bars and one diagonal slash: a tally. Bars are `primary`; the slash is `pen`. On dark, bars are white and the slash is `#ff6b78`.
- Keep clear space of one bar width on every side, and a minimum mark height of 16px. Never recolor, rotate, outline or add effects.
- App icon: `assets/Logo/app-icon.svg`, a navy tile with a coral slash. Maskable icons keep the mark inside the central 80%.
- `<img>` cannot inherit color, so the one-color lockup is navy `#1b2f5e`; make a white copy for dark ink-on-print needs.

## Color
- Set text in `fg` on `bg`, `surface` and `surface-2`; secondary text in `muted`. Each pair is at least 5:1 in both themes.
- `primary` fills the main action; text on it is `primary-fg`. `alt` is the secondary action and the 3px focus ring.
- `pen` is for teacher marks, the logo slash and errors, always with a word beside it. `ok` is for confirmation, always with a word or check.
- `hi` sits behind a single key word per heading; keep `fg` text on it.
- Printed sheets are always `paper` with `ink`, in both themes, because they model paper.
- Dark theme lightens `primary` and `alt` and darkens their text (`primary-fg`, `alt-fg`) rather than using white.

## Type
- Headings and everything printed: Andika, chosen for letterforms children can read (distinct a, g, I, l). Bold for titles.
- Interface text: Inter at `body` 15px. Labels 13px semibold. Notes 13px in `muted`.
- Never use a decorative or handwriting font for letters or numbers on a sheet; learners must see the standard form.

## Layout and shape
- Buttons and inputs use `radius-md`, panels `radius-lg`, chips and the page tag `radius-pill`. Keep a 16px minimum gutter on phones and a 1180px maximum content width.
- Prefer borders in `line` to shadows.
- Tap targets are at least 44px tall.

## Printed sheets
- US Letter, 0.595in side margins, one title, a Name and Date line, one-line directions, then the grid, then a footer with the week.
- Student copy and teacher copy always share the same scramble. The teacher copy adds running counts at the end of each row and boxes for Reached, Errors and Correct ("Correct = reached minus errors").
- Shapes and colors use a black outline and a text label on the teacher copy, so color is never the only cue.

## Accessibility
- Body and secondary text meet 4.5:1 in light and dark; the focus ring is a solid 3px `alt` outline with 2px offset.
- Never rely on red or green alone: pair `pen` and `ok` with words.
- Respect the system color scheme and reduced motion; there is no animation to disable.

## Naming
- "Tallymark" is a working name. Check trademarks, domains and app-store names before launch.
