# Tallymark

Printable fluency sheets and games for early readers. Pick **what to make** (a format) and **what to practice** (a content set), and any set works with any format. It is a plain static website: no server, no account, no build step.

## Try it
Open `index.html` in a browser. Everything works from the folder, including Print and Save PDF.

## Put it on the web (free)
- **Netlify Drop.** Go to app.netlify.com/drop and drag this whole folder onto the page.
- **GitHub Pages.** Put these files in a repository, then Settings > Pages > deploy from the main branch.
- **Any web host.** Upload the folder as is.

Each teacher's classes and scores are saved in their own browser, so nothing is shared between people.

## What it makes (formats)
| Format | What you get |
| --- | --- |
| Fluency sheet | One-minute timed sheets with a teacher copy (running counts, boxes for reached, errors and correct). Per-student scrambles with names printed. |
| Bingo cards | A different card for each student (3x3, 4x4 or 5x5 with a free space), two cards per page, plus a caller list in a random call order. |
| Flashcards | 6, 8 or 12 big cards per page with cut lines. Optional names under shapes and colors. |
| Matching cards | Memory pairs with cut lines. Letters match their other case, numbers match their number word, shapes and colors match their name. |

## What it practices (content sets)
Letters (uppercase, lowercase, mixed, sounds), numbers 0 to 20 and 0 to 100, number words, shapes, colors, colored shapes, shape words, color words, Dolch sight words (pre-primer to third grade and nouns), phonics words (short vowels, L, R and S blends, digraphs, silent e, vowel teams, r-controlled), word themes (days, months, animals, classroom), and your own list. Color sheets need a color printer.

## Teachers
Classes, class lists and progress charts are in the Classes and Progress tabs. Scores are for fluency sheets. Back up or export from the Progress tab.

## Adding your own ideas
The site is built from two kinds of pieces, so a new idea is usually one small addition.

**A new content set** (for example "Dinosaurs" or "Vowel teams: ou, ow"): add one entry to the `SETS` list in `js/data.js`. For a word list it is one line:

    text(['dinos', 'themes', 'Dinosaurs', 'Dinosaur words'], words('rex raptor stego bronto')),

The fields are an id, the group it appears under, the chip label, and the name used as the sheet title. Every format picks it up automatically.

**A new format** (for example a word search or a sorting mat): add a file in `js/formats/` that does two things, then add a `<script>` line for it in `index.html`:
1. `TM.registerPageType('mytype', { html(page), pdf(doc, K, page) })` draws one page for the preview and for the PDF. `K` has helpers for text, shapes, colors and fitting words into a space.
2. `TM.registerFormat({ id, name, blurb, students, copies, options, plan(env) })` says what to offer and builds the pages. `env` gives you the chosen sets, the class, the weekly seed and the options. Look at `js/formats/cards.js` for a short example.

**A new kind of item** (for example pictures): add a type next to text, shape and color in `js/items.js`.

## Change the name or look
- Name: search for `Tallymark` in `index.html`.
- Colors and spacing: the tokens at the top of `css/styles.css`.

## Privacy
Class lists and scores are stored with `localStorage` in the visitor's browser only. There is no analytics, no tracking and no network request after the page loads.

## Credits and licenses
- Andika and Inter fonts: SIL Open Font License 1.1.
- jsPDF (`vendor/jspdf.umd.min.js`): MIT.
- Dolch sight word lists: public domain.

## Install as an app and offline use
Tallymark is a progressive web app. Open the hosted site in Chrome, Edge or Android and use the Install app button (or the browser's install icon). On iPhone or iPad, tap Share, then Add to Home Screen. After the first visit it works offline. Service workers need HTTPS (or localhost), so a file opened straight from disk will still work as a website but cannot install.

When you change any file, bump `VERSION` in `sw.js` (for example `tallymark-v2-2`) so installed copies pick up the update.

## Brand
`brand/` holds the logo files, the app icon and `BRAND.md`, a one-page guide to color, type, voice and sheet layout. "Tallymark" is a working name: check trademarks, domain and app-store availability before launch. Stores will also need a privacy policy and terms.

## Timer, setups and more
- **Timer and score** (on the Make tab): a countdown with a chime and a screen wake lock where the browser allows it. When time is up, enter Reached and Errors and the score goes straight into the class progress chart, with a note on change since last time.
- **Saved setups**: save the format, sets and options under a name and bring them back in one click. Stored with the rest of your data and included in backups.
- **Help tab** and a first-visit guide that can be dismissed.
- **Backup reminder** after 30 days (or if you have never backed up), with Back up now and Remind me in a week.
- **Paper size**: US Letter or A4. A4 PDFs use the same layout scaled to about 97%.
- **Larger type** on fluency sheets: fewer, bigger items per page.
- Letter sheets now have 10 per row.

## Options by format
Each format has its own options (js/formats/*.js, the `options` array). Fluency: timer length (30 sec, 1 min, 2 min), larger type, practice days row. Bingo: card size, free space, number of cards. Flashcards: 1 to 12 per page, optional printed backs for two-sided printing, cut lines, labels, scramble. Matching: pairs, card size, letter pairs (other case or a word that starts with the letter), cut lines, and an answer key (the teacher copy).

## Make page layout
The Make page is three numbered steps (what to make, what to practice, who and when) with a More options drawer for copies and paper size. The preview shows one page at a time, with tabs to switch. Saved setups are a menu at the top right.

## Sample classroom

`js/demo.js` builds two made-up classes, about ten weeks of scores and three saved setups. Buttons labelled "Load a sample classroom" appear on the Classes page, the Progress page and under Your data. Every sample record has an id starting with `demo-`, so "Remove sample classroom" deletes only sample data and never your own.
