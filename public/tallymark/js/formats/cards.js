/* Formats: flashcards and matching (memory) cards. Both print as a grid of cut-apart cards. */
(function () {
  var TM = window.TM = window.TM || {};
  var esc = TM.util.esc;
  var GW = 7.5, GH = 9.75;

  TM.registerPageType('cards', {
    html: function (p) {
      var cw = GW / p.cols, ch = GH / p.rows, total = p.cols * p.rows, cells = '';
      for (var i = 0; i < total; i++) {
        var c = p.cells[i];
        cells += '<div class="ccard">' + (c ? TM.draw.face(c.item, cw, ch, { label: c.label, maxFont: p.maxFont }) : '') + '</div>';
      }
      return '<section class="sheet" aria-label="' + esc(p.footer) + '"><div class="page cards">' +
        '<div class="cgrid2' + (p.cut === false ? ' nocut' : '') + '" style="--cols:' + p.cols + ';--rows:' + p.rows + '">' + cells + '</div><div class="foot"><span>' + esc(p.footer) + '</span></div></div></section>';
    },
    pdf: function (doc, K, p) {
      var cw = GW / p.cols, ch = GH / p.rows, x0 = 0.5, y0 = 0.5;
      p.cells.forEach(function (c, i) {
        var col = i % p.cols, row = Math.floor(i / p.cols);
        K.face(c.item, x0 + col * cw + cw / 2, y0 + row * ch + ch / 2, cw, ch, { label: c.label, maxFont: p.maxFont });
      });
      if (p.cut !== false) {
        doc.setDrawColor(K.FAINT[0], K.FAINT[1], K.FAINT[2]); doc.setLineWidth(0.012); doc.setLineDashPattern([0.07, 0.05], 0);
        for (var c = 0; c <= p.cols; c++) doc.line(x0 + c * cw, y0, x0 + c * cw, y0 + GH);
        for (var r = 0; r <= p.rows; r++) doc.line(x0, y0 + r * ch, x0 + GW, y0 + r * ch);
        doc.setLineDashPattern([], 0);
      }
      K.txt(p.footer, x0, 10.65, 'helvetica', 'normal', 0.13, K.FAINT);
    }
  });

  function pageFont(cells, big) {
    var m = 0; cells.forEach(function (c) { if (c.item.t === 'text') m = Math.max(m, c.item.v.length); });
    return m <= 2 ? big : Math.min(big, big > 1.3 ? 0.6 * big / 1.3 : 0.6);
  }
  function chunk(arr, n) { var o = []; for (var i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o; }

  var LAYOUT = { '1': [1, 1, 3.4], '2': [1, 2, 2.4], '4': [2, 2, 1.8], '6': [2, 3, 1.3], '8': [2, 4, 1.1], '12': [3, 4, 0.9] };

  // The other side of a card: its name or partner, found from the set's pairs (a twin when the set has none).
  function backMap(set, ctx) {
    var m = {};
    TM.setPairs(set, ctx).forEach(function (pr) { m[pr[0].k] = pr[1]; if (!(pr[1].k in m)) m[pr[1].k] = pr[0]; });
    return m;
  }
  // Mirror each row so the back lines up with the front when printed two-sided (flip on the long edge).
  function mirror(cells, cols, rows) {
    var out = [];
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var src = cells[r * cols + (cols - 1 - c)];
      if (src) out.push(src);
    }
    return out;
  }

  TM.registerFormat({
    id: 'flashcards', name: 'Flashcards', blurb: 'Big cards to cut apart, one item on each.',
    students: 'none', copies: {},
    options: [
      { key: 'per', label: 'Cards per page', type: 'select', def: '8', choices: [{ v: '1', l: '1 (full page)' }, { v: '2', l: '2' }, { v: '4', l: '4' }, { v: '6', l: '6 (large)' }, { v: '8', l: '8' }, { v: '12', l: '12 (small)' }] },
      { key: 'back', label: 'Back of card', type: 'select', def: 'none', choices: [{ v: 'none', l: 'Blank (print one side)' }, { v: 'name', l: 'Name or other case (print two-sided)' }] },
      { key: 'cut', label: 'Dotted cut lines', type: 'check', def: true },
      { key: 'labels', label: 'Print the name under shapes and colors', type: 'check', def: false },
      { key: 'scramble', label: 'Scramble the order', type: 'check', def: false }
    ],
    plan: function (env) {
      var L = LAYOUT[env.opts.per] || LAYOUT['8'], per = L[0] * L[1], student = [], total = 0;
      env.sets.forEach(function (set) {
        var pool = set.pool(env.ctx), name = TM.setName(set, env.ctx);
        if (env.opts.scramble) pool = TM.deal(pool, pool.length, env.seed([set.id, 'flash', env.sig]));
        total += pool.length;
        var cut = env.opts.cut !== false, back = env.opts.back === 'name', bm = back ? backMap(set, env.ctx) : null;
        chunk(pool, per).forEach(function (pg) {
          var cells = pg.map(function (it) { return { item: it, label: !!env.opts.labels && it.t !== 'text' }; });
          student.push({ type: 'cards', cols: L[0], rows: L[1], cut: cut, maxFont: pageFont(cells, L[2]), footer: name + ' flashcards' + (cut ? '  -  cut along the dotted lines' : ''), cells: cells });
          if (back) {
            var bc = mirror(pg.map(function (it) { return { item: bm[it.k] || it, label: false }; }), L[0], L[1]);
            student.push({ type: 'cards', cols: L[0], rows: L[1], cut: cut, maxFont: pageFont(bc, L[2]), footer: name + ' flashcards, backs  -  print two-sided, flip on the long edge', cells: bc });
          }
        });
      });
      return { student: student, teacher: [], info: ' with ' + total + ' cards' };
    }
  });

  // Letter sets can pair a letter with a word that starts with it; everything else uses the set's own pairs.
  function pairsFor(set, env) {
    if (env.opts.style === 'word' && set.group === 'letters') {
      var low = set.id === 'lower' || set.id === 'sounds';
      return env.ctx.letters.map(function (l) { return [TM.items.T(low ? l : l.toUpperCase()), TM.items.T(TM.ALPHA_WORDS[l] || l)]; });
    }
    return TM.setPairs(set, env.ctx);
  }

  TM.registerPageType('pairkey', {
    html: function (p) {
      var rows = Math.ceil(p.pairs.length / 2), rh = Math.min(1.1, 8.2 / rows), fw = 1.5, fh = rh * 0.86;
      var cells = p.pairs.map(function (pr) {
        return '<div class="pk"><span class="pf">' + TM.draw.face(pr[0], fw, fh, { maxFont: 0.5 }) + '</span><span class="eq">=</span><span class="pf">' + TM.draw.face(pr[1], fw, fh, { maxFont: 0.5 }) + '</span></div>';
      }).join('');
      return '<section class="sheet" aria-label="' + esc(p.title) + '"><div class="page"><div class="top"><h2 style="font-size:' + Math.min(4, 52 / (p.title.length * 0.6)).toFixed(2) + 'cqw">' + esc(p.title) + '</h2><span class="tag t">Answer key</span></div>' +
        '<div class="dir" style="margin-top:3cqw">Each row shows two cards that make a pair.</div>' +
        '<div class="pkgrid" style="--rh:' + (rh / 0.085).toFixed(2) + 'cqw">' + cells + '</div>' +
        '<div class="foot"><span>' + esc(p.footer || '') + '</span><span>' + p.pairs.length + ' pairs</span></div></div></section>';
    },
    pdf: function (doc, K, p) {
      var mx = K.mx, rows = Math.ceil(p.pairs.length / 2), rh = Math.min(1.1, 8.2 / rows), cw = K.inner / 2;
      var tag = 'Answer key'; doc.setFont('helvetica', 'bold'); doc.setFontSize(K.pt(0.1615));
      var pw = doc.getTextWidth(tag) + 0.408, px = K.W - mx - pw;
      doc.setFont('Andika', 'bold'); doc.setFontSize(K.pt(0.34));
      var tw0 = doc.getTextWidth(K.safe(p.title)), tmax = px - mx - 0.2, tsz = tw0 > tmax ? 0.34 * tmax / tw0 : 0.34;
      K.txt(p.title, mx, 0.88, 'Andika', 'bold', tsz, K.INK);
      doc.setFillColor(K.INK[0], K.INK[1], K.INK[2]); doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]); doc.setLineWidth(0.02);
      doc.roundedRect(px, 0.68, pw, 0.27, 0.135, 0.135, 'FD'); K.txt(tag, px + pw / 2, 0.865, 'helvetica', 'bold', 0.1615, [255, 255, 255], { align: 'center' });
      K.txt('Each row shows two cards that make a pair.', mx, 1.3, 'helvetica', 'normal', 0.1785, K.SOFT);
      var gt = 1.6;
      doc.setDrawColor(K.HAIR[0], K.HAIR[1], K.HAIR[2]); doc.setLineWidth(0.011);
      p.pairs.forEach(function (pr, i) {
        var c = i % 2, r = Math.floor(i / 2), x = mx + c * cw, y = gt + r * rh, cx = x + cw / 2;
        if (c === 0) doc.line(mx, y + rh, K.W - mx, y + rh);
        K.face(pr[0], cx - 0.78, y + rh / 2, 1.3, rh * 0.86, { maxFont: 0.5 });
        K.txt('=', cx, y + rh / 2 + 0.06, 'helvetica', 'normal', 0.24, K.FAINT, { align: 'center' });
        K.face(pr[1], cx + 0.78, y + rh / 2, 1.3, rh * 0.86, { maxFont: 0.5 });
      });
      doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]); doc.setLineWidth(0.02); doc.line(mx, gt, K.W - mx, gt);
      K.txt(p.footer || '', mx, K.bottom, 'helvetica', 'normal', 0.136, K.FAINT);
      K.txt(p.pairs.length + ' pairs', K.W - mx, K.bottom, 'helvetica', 'normal', 0.136, K.FAINT, { align: 'right' });
    }
  });

  TM.registerFormat({
    id: 'memory', name: 'Matching cards', blurb: 'Memory pairs to cut apart. Letters match their other case, shapes match their name.',
    students: 'none', copies: { teacher: 'Answer key' },
    options: [
      { key: 'pairs', label: 'Pairs to make', type: 'select', def: '8', choices: [{ v: '6', l: '6 pairs' }, { v: '8', l: '8 pairs' }, { v: '10', l: '10 pairs' }, { v: '12', l: '12 pairs' }] },
      { key: 'size', label: 'Card size', type: 'select', def: '12', choices: [{ v: '12', l: 'Small (12 per page)' }, { v: '8', l: 'Medium (8 per page)' }, { v: '6', l: 'Large (6 per page)' }] },
      { key: 'style', label: 'Letter pairs', type: 'select', def: 'case', choices: [{ v: 'case', l: 'Match the other case' }, { v: 'word', l: 'Match a word that starts with the letter' }] },
      { key: 'cut', label: 'Dotted cut lines', type: 'check', def: true }
    ],
    plan: function (env) {
      var student = [], teacher = [], warn = '', total = 0, L = LAYOUT[env.opts.size] || LAYOUT['12'], cut = env.opts.cut !== false;
      env.sets.forEach(function (set) {
        var pairs = pairsFor(set, env), name = TM.setName(set, env.ctx), n = Math.min(+env.opts.pairs || 8, pairs.length);
        if (n < 2) { warn = '"' + name + '" needs at least 2 items to make matching cards.'; return; }
        var chosen = TM.deal(pairs, n, env.seed([set.id, 'mem', env.sig])), cards = [];
        chosen.forEach(function (pr) { cards.push(pr[0]); cards.push(pr[1]); });
        cards = TM.deal(cards, cards.length, env.seed([set.id, 'memshuffle', env.sig]));
        total += n;
        chunk(cards, L[0] * L[1]).forEach(function (pg) {
          var cells = pg.map(function (it) { return { item: it, label: false }; });
          student.push({ type: 'cards', cols: L[0], rows: L[1], cut: cut, maxFont: pageFont(cells, L[2] === 1.3 ? 1.3 : L[2] === 1.1 ? 1.1 : 0.9), footer: name + ' matching cards' + (cut ? '  -  cut apart, turn face down, and find the pairs' : '  -  turn face down and find the pairs'), cells: cells });
        });
        teacher.push({ type: 'pairkey', title: 'Answer key: ' + name, pairs: chosen, footer: env.footer });
      });
      return { student: student, teacher: teacher, warn: warn, info: ' with ' + total + ' pairs' };
    }
  });
})();
