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
        '<div class="cgrid2" style="--cols:' + p.cols + ';--rows:' + p.rows + '">' + cells + '</div><div class="foot"><span>' + esc(p.footer) + '</span></div></div></section>';
    },
    pdf: function (doc, K, p) {
      var cw = GW / p.cols, ch = GH / p.rows, x0 = 0.5, y0 = 0.5;
      p.cells.forEach(function (c, i) {
        var col = i % p.cols, row = Math.floor(i / p.cols);
        K.face(c.item, x0 + col * cw + cw / 2, y0 + row * ch + ch / 2, cw, ch, { label: c.label, maxFont: p.maxFont });
      });
      doc.setDrawColor(K.FAINT[0], K.FAINT[1], K.FAINT[2]); doc.setLineWidth(0.012); doc.setLineDashPattern([0.07, 0.05], 0);
      for (var c = 0; c <= p.cols; c++) doc.line(x0 + c * cw, y0, x0 + c * cw, y0 + GH);
      for (var r = 0; r <= p.rows; r++) doc.line(x0, y0 + r * ch, x0 + GW, y0 + r * ch);
      doc.setLineDashPattern([], 0);
      K.txt(p.footer, x0, 10.65, 'helvetica', 'normal', 0.13, K.FAINT);
    }
  });

  function pageFont(cells, big) {
    var m = 0; cells.forEach(function (c) { if (c.item.t === 'text') m = Math.max(m, c.item.v.length); });
    return m <= 2 ? big : Math.min(big, 0.6);
  }
  function chunk(arr, n) { var o = []; for (var i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o; }

  var LAYOUT = { '6': [2, 3, 1.3], '8': [2, 4, 1.1], '12': [3, 4, 0.9] };

  TM.registerFormat({
    id: 'flashcards', name: 'Flashcards', blurb: 'Big cards to cut apart, one item on each.',
    students: 'none', copies: {},
    options: [
      { key: 'per', label: 'Cards per page', type: 'select', def: '8', choices: [{ v: '6', l: '6 (large)' }, { v: '8', l: '8' }, { v: '12', l: '12 (small)' }] },
      { key: 'labels', label: 'Print the name under shapes and colors', type: 'check', def: false },
      { key: 'scramble', label: 'Scramble the order', type: 'check', def: false }
    ],
    plan: function (env) {
      var L = LAYOUT[env.opts.per] || LAYOUT['8'], per = L[0] * L[1], student = [], total = 0;
      env.sets.forEach(function (set) {
        var pool = set.pool(env.ctx), name = TM.setName(set, env.ctx);
        if (env.opts.scramble) pool = TM.deal(pool, pool.length, env.seed([set.id, 'flash', env.sig]));
        total += pool.length;
        chunk(pool, per).forEach(function (pg) {
          var cells = pg.map(function (it) { return { item: it, label: !!env.opts.labels && it.t !== 'text' }; });
          student.push({ type: 'cards', cols: L[0], rows: L[1], maxFont: pageFont(cells, L[2]), footer: name + ' flashcards  -  cut along the dotted lines', cells: cells });
        });
      });
      return { student: student, teacher: [], info: ' with ' + total + ' cards' };
    }
  });

  TM.registerFormat({
    id: 'memory', name: 'Matching cards', blurb: 'Memory pairs to cut apart. Letters match their other case, shapes match their name.',
    students: 'none', copies: {},
    options: [{ key: 'pairs', label: 'Pairs to make', type: 'select', def: '8', choices: [{ v: '6', l: '6 pairs' }, { v: '8', l: '8 pairs' }, { v: '10', l: '10 pairs' }, { v: '12', l: '12 pairs' }] }],
    plan: function (env) {
      var student = [], warn = '', total = 0;
      env.sets.forEach(function (set) {
        var pairs = TM.setPairs(set, env.ctx), name = TM.setName(set, env.ctx), n = Math.min(+env.opts.pairs || 8, pairs.length);
        if (n < 2) { warn = '"' + name + '" needs at least 2 items to make matching cards.'; return; }
        var chosen = TM.deal(pairs, n, env.seed([set.id, 'mem', env.sig])), cards = [];
        chosen.forEach(function (pr) { cards.push(pr[0]); cards.push(pr[1]); });
        cards = TM.deal(cards, cards.length, env.seed([set.id, 'memshuffle', env.sig]));
        total += n;
        chunk(cards, 12).forEach(function (pg) {
          var cells = pg.map(function (it) { return { item: it, label: false }; });
          student.push({ type: 'cards', cols: 3, rows: 4, maxFont: pageFont(cells, 0.9), footer: name + ' matching cards  -  cut apart, turn face down, and find the pairs', cells: cells });
        });
      });
      return { student: student, teacher: [], warn: warn, info: ' with ' + total + ' pairs' };
    }
  });
})();
