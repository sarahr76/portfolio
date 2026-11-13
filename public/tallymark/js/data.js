/* Tallymark: the content sets teachers can choose from.
   To add a set, add one entry to the list at the bottom of this file. */
(function () {
  var TM = window.TM = window.TM || {};
  var I = TM.items, T = I.T;

  function range(a, b) { var o = []; for (var i = a; i <= b; i++) o.push(String(i)); return o; }
  function words(s) { return s.split(/\s+/).filter(Boolean); }
  function titleCase(s) {
    var small = { a: 1, of: 1, to: 1, and: 1, the: 1 };
    return s.split(' ').map(function (w, i) { return i && small[w] ? w : w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
  }

  // Dolch sight word lists (E. W. Dolch, 1936 and 1948; public domain).
  var DOLCH = {
    pp: words('a and away big blue can come down find for funny go help here I in is it jump little look make me my not one play red run said see the three to two up we where yellow you'),
    p: words('all am are at ate be black brown but came did do eat four get good have he into like must new no now on our out please pretty ran ride saw say she so soon that there they this too under want was well went what white who will with yes'),
    g1: words('after again an any as ask by could every fly from give going had has her him his how just know let live may of old once open over put round some stop take thank them then think walk were when'),
    g2: words("always around because been before best both buy call cold does don't fast first five found gave goes green its made many off or pull read right sing sit sleep tell their these those upon us use very wash which why wish work would write your"),
    g3: words('about better bring carry clean cut done draw drink eight fall far full got grow hold hot hurt if keep kind laugh light long much myself never only own pick seven shall show six small start ten today together try warm'),
    nouns: words('apple baby back ball bear bed bell bird birthday boat box boy bread brother cake car cat chair chicken children corn cow day dog doll door duck egg eye farm farmer father feet fire fish floor flower game garden girl goodbye grass ground hand head hill home horse house kitty leg letter man men milk money morning mother name nest night paper party picture pig rabbit rain ring robin school seed sheep shoe sister snow song squirrel stick street sun table thing time top toy tree watch water way wind window wood')
  };
  TM.DOLCH = DOLCH;

  /* ---------- Layouts ---------- */
  var LETTER = function () { return { cols: 10, rows: 13, font: 0.44 }; };
  var NUMBER = function () { return { cols: 6, rows: 12, font: 0.40 }; };
  var VISUAL = function () { return { cols: 6, rows: 12, font: 0.40, vis: 0.44 }; };
  function textLayout(fixedRows) {
    return function (pool) {
      var m = 1; pool.forEach(function (it) { m = Math.max(m, it.v.length); });
      if (m <= 1) return { cols: 10, rows: 13, font: 0.44 };
      var cols = m <= 3 ? 6 : m <= 6 ? 5 : m <= 9 ? 4 : 3;
      var font = m <= 3 ? 0.40 : m <= 6 ? 0.32 : m <= 9 ? 0.28 : 0.24;
      return { cols: cols, rows: fixedRows || Math.min(12, Math.max(9, Math.ceil(pool.length / cols))), font: font };
    };
  }

  /* ---------- Directions ---------- */
  var ACROSS = ' Start at the top left and read across each row.';
  var DIR = {
    letter: 'Say the name of each letter.' + ACROSS,
    sounds: 'Say the sound each letter makes, not its name.' + ACROSS,
    number: 'Say each number.' + ACROSS,
    word: 'Read each word.' + ACROSS,
    shape: 'Say the name of each shape.' + ACROSS,
    color: 'Say the name of each color.' + ACROSS,
    both: 'Say the color and the shape, like "red circle".' + ACROSS,
    item: 'Read each item.' + ACROSS
  };
  var SOUND_NOTE = ' Count a short, clean sound as correct. For c and g, accept either sound.';

  /* ---------- Pools ---------- */
  function lettersLower(c) { return c.letters.map(T); }
  function lettersUpper(c) { return c.letters.map(function (x) { return T(x.toUpperCase()); }); }
  function letterPairs(c) { return c.letters.map(function (x) { return [T(x.toUpperCase()), T(x)]; }); }
  function textPool(list) { return function () { return list.map(T); }; }
  var NUMWORDS = words('zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty');

  function shapePool() { return I.SHAPES.map(function (s) { return I.shapeItem(s); }); }
  function colorPool() { return I.COLORS.map(I.colorItem); }
  var CS_SHAPES = ['circle', 'square', 'triangle', 'rectangle', 'star', 'heart'];
  var CS_COLORS = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
  function colorShapePool() {
    var o = []; CS_SHAPES.forEach(function (s) { CS_COLORS.forEach(function (c) { o.push(I.shapeItem(s, I.colorByName(c))); }); }); return o;
  }

  function text(def, list, extra) {
    var o = { id: def[0], group: def[1], label: def[2], name: def[3], unit: 'word', dir: DIR.word, pool: textPool(list), layout: textLayout() };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }

  var SETS = [
    /* Letters */
    { id: 'upper', group: 'letters', label: 'Uppercase names', name: 'Uppercase letter names', unit: 'letter', dir: DIR.letter, pool: lettersUpper, layout: LETTER, pairs: letterPairs },
    { id: 'lower', group: 'letters', label: 'Lowercase names', name: 'Lowercase letter names', unit: 'letter', dir: DIR.letter, pool: lettersLower, layout: LETTER, pairs: letterPairs },
    { id: 'mixed', group: 'letters', label: 'Mixed case names', name: 'Uppercase and lowercase letter names', unit: 'letter', dir: DIR.letter,
      pool: function (c) { return lettersUpper(c).concat(lettersLower(c)); }, layout: LETTER, pairs: letterPairs },
    { id: 'sounds', group: 'letters', label: 'Letter sounds', name: 'Lowercase letter sounds', unit: 'letter', dir: DIR.sounds, teacherNote: SOUND_NOTE, pool: lettersLower, layout: LETTER },

    /* Numbers */
    { id: 'num20', group: 'numbers', label: '0 to 20', name: 'Numbers 0 to 20', title: 'Number Names 0 to 20', unit: 'number', dir: DIR.number, pool: textPool(range(0, 20)), layout: NUMBER,
      pairs: function () { return range(0, 20).map(function (n, i) { return [T(n), T(NUMWORDS[i])]; }); } },
    { id: 'num100', group: 'numbers', label: '0 to 100', name: 'Numbers 0 to 100', title: 'Number Names 0 to 100', unit: 'number', dir: DIR.number, pool: textPool(range(0, 100)), layout: NUMBER },
    text(['numwords', 'numbers', 'Number words', 'Number words zero to twenty'], NUMWORDS),

    /* Shapes and colors */
    { id: 'shapes', group: 'shapes', label: 'Shapes', name: 'Shape names', unit: 'shape', dir: DIR.shape, pool: shapePool, layout: VISUAL,
      pairs: function () { return shapePool().map(function (s) { return [s, T(s.n)]; }); } },
    { id: 'colors', group: 'shapes', label: 'Colors', name: 'Color names', unit: 'color', dir: DIR.color, pool: colorPool, layout: VISUAL,
      pairs: function () { return colorPool().map(function (c) { return [c, T(c.n)]; }); } },
    { id: 'colorshapes', group: 'shapes', label: 'Colored shapes', name: 'Colored shapes', unit: 'shape', dir: DIR.both, pool: colorShapePool, layout: VISUAL,
      pairs: function () { return colorShapePool().map(function (s) { return [s, T(s.n)]; }); } },
    text(['shapewords', 'shapes', 'Shape words', 'Shape words'], I.SHAPES),
    text(['colorwords', 'shapes', 'Color words', 'Color words'], I.COLORS.map(function (c) { return c.n; })),

    /* Sight words */
    text(['dolch-pp', 'sight', 'Pre-primer', 'Sight words: Pre-primer'], DOLCH.pp),
    text(['dolch-p', 'sight', 'Primer', 'Sight words: Primer'], DOLCH.p),
    text(['dolch-1', 'sight', 'First grade', 'Sight words: First grade'], DOLCH.g1),
    text(['dolch-2', 'sight', 'Second grade', 'Sight words: Second grade'], DOLCH.g2),
    text(['dolch-3', 'sight', 'Third grade', 'Sight words: Third grade'], DOLCH.g3),
    text(['dolch-nouns', 'sight', 'Nouns', 'Sight words: Nouns'], DOLCH.nouns),

    /* Phonics words */
    text(['cvc-a', 'phonics', 'Short a', 'Short a words'], words('cat hat mat sat bat rat pat fat can man pan ran fan van tan cap map nap tap lap bag tag wag rag jam ham dam yam bad dad had mad sad')),
    text(['cvc-e', 'phonics', 'Short e', 'Short e words'], words('bed red led fed pen ten hen men den net pet wet get jet let set web leg peg beg yes')),
    text(['cvc-i', 'phonics', 'Short i', 'Short i words'], words('pig big dig wig fig pin win bin fin tin sit hit bit fit kit lip zip dip hip rip six mix fix lid kid did')),
    text(['cvc-o', 'phonics', 'Short o', 'Short o words'], words('dog log fog hog jog hot pot dot cot lot top mop hop pop box fox job mom')),
    text(['cvc-u', 'phonics', 'Short u', 'Short u words'], words('bug rug hug mug jug sun fun run bun nut cut hut bus cup pup mud bud gum sum tub rub')),
    text(['blend-l', 'phonics', 'L blends', 'L blends: bl, cl, fl, gl, pl, sl'], words('black block blue blow clap clock cloud clam flag flat flip fly glad glass glue plan play plum plus slow slip slide sled'), { title: 'L Blends' }),
    text(['blend-r', 'phonics', 'R blends', 'R blends: br, cr, dr, fr, gr, pr, tr'], words('brown bread bring brush crab crib cry crow drum dress drip drop frog from free fruit grab grass green grow press pray prize tree trip truck track trap'), { title: 'R Blends' }),
    text(['blend-s', 'phonics', 'S blends', 'S blends: sk, sm, sn, sp, st, sw'], words('skip skin skate smile smell smoke snap snow snail spot spin spoon stop star step stick swim swing sweet'), { title: 'S Blends' }),
    text(['digraphs', 'phonics', 'sh ch th wh', 'Digraphs: sh, ch, th, wh'], words('ship shop shell fish dish wish chip chop chin much rich lunch thin thick this that with bath when what whale wheel'), { title: 'Digraphs: sh, ch, th, wh' }),
    text(['silent-e', 'phonics', 'Silent e', 'Silent e words'], words('cake make name game bike like kite nine home bone nose rope cube cute tube rule late gate five hide hope joke')),
    text(['long-a', 'phonics', 'ai, ay', 'Long a words: ai and ay'], words('rain mail tail train paint wait day play say stay way may'), { title: 'Long A Words: ai and ay' }),
    text(['long-e', 'phonics', 'ee, ea', 'Long e words: ee and ea'], words('see bee tree feet green eat sea meat team leaf beach seat'), { title: 'Long E Words: ee and ea' }),
    text(['long-o', 'phonics', 'oa, ow', 'Long o words: oa and ow'], words('boat coat road goat soap snow grow show low blow slow'), { title: 'Long O Words: oa and ow' }),
    text(['r-ctrl', 'phonics', 'R-controlled', 'R-controlled vowels: ar, er, ir, or'], words('car star farm barn park her fern bird girl first corn horse fork storm'), { title: 'R-Controlled Vowels' }),

    /* Word themes */
    text(['days', 'themes', 'Days of the week', 'Days of the week'], words('Monday Tuesday Wednesday Thursday Friday Saturday Sunday')),
    text(['months', 'themes', 'Months', 'Months of the year'], words('January February March April May June July August September October November December')),
    text(['animals', 'themes', 'Animals', 'Animal words'], words('cat dog bird fish pig cow horse duck frog bear lion tiger monkey rabbit sheep goat')),
    text(['classroom', 'themes', 'Classroom', 'Classroom words'], words('desk chair book pencil crayon paper door window board teacher clock')),

    /* Your own list */
    { id: 'custom', group: 'custom', label: 'My own list', name: 'My own list', unit: 'item', dir: DIR.item,
      titleFor: function (c) { return c.customTitle || 'Custom List'; }, nameFor: function (c) { return c.customTitle || 'My own list'; },
      pool: function (c) { return c.customItems.map(T); }, layout: textLayout(12) }
  ];

  SETS.forEach(function (s) { if (!s.title) s.title = titleCase(s.name); });

  TM.SETS = SETS; TM.KINDS = SETS;
  TM.GROUPS = [
    { id: 'letters', label: 'Letters' }, { id: 'numbers', label: 'Numbers' }, { id: 'shapes', label: 'Shapes and colors' },
    { id: 'sight', label: 'Sight words' }, { id: 'phonics', label: 'Phonics words', fold: true }, { id: 'themes', label: 'Word themes', fold: true },
    { id: 'custom', label: 'Your own list' }
  ];
  TM.setById = TM.kindById = function (id) { for (var i = 0; i < SETS.length; i++) if (SETS[i].id === id) return SETS[i]; return null; };
  TM.setTitle = TM.kindTitle = function (s, c) { return s.titleFor ? s.titleFor(c || {}) : s.title; };
  TM.setName = TM.kindShort = function (s, c) { return s.nameFor ? s.nameFor(c || {}) : s.name; };
  // Pairs for matching games: a list of [faceA, faceB]. Sets without pairs match a card with its twin.
  TM.setPairs = function (s, c) {
    if (s.pairs) return s.pairs(c);
    return s.pool(c).map(function (it) { return [it, it]; });
  };
})();
