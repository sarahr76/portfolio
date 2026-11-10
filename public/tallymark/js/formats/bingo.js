/* Format: bingo cards, one different card per student, plus a caller list for the teacher. */
(function () {
  var TM = window.TM = window.TM || {};
  var esc = TM.util.esc;
  var CARD_W = 7.31, CARD_H = 4.8, GRID_H = 4.18;

  TM.registerPageType('bingo', {
    html: function (p) {
      var n = p.size, cw = CARD_W / n, ch = GRID_H / n, slots = [];
      for (var i = 0; i < 2; i++) {
        var card = p.cards[i];
        if (!card) { slots.push('<div class="bcard empty"></div>'); continue; }
        var cells = card.cells.map(function (it) {
          var free = it === 'free';
          return '<div class="bcell' + (free ? ' free' : '') + '">' + TM.draw.face(free ? null : it, cw, ch, { maxFont: 0.6, free: free }) + '</div>';
        }).join('');
        var nm = card.name ? '<span class="nm">' + esc(card.name) + '</span>' : '<i></i>';
        var tfs = Math.min(3.5, 48 / (p.title.length * 0.6)).toFixed(2);
        slots.push('<div class="bcard" style="--n:' + n + '"><div class="bhead"><h2 style="font-size:' + tfs + 'cqw">' + esc(p.title) + '</h2><div class="field bname">Name ' + nm + '</div></div><div class="bgrid">' + cells + '</div></div>');
      }
      return '<section class="sheet" aria-label="' + esc(p.title) + '"><div class="page bingo">' + slots.join('<div class="cutline"></div>') + '</div></section>';
    },
    pdf: function (doc, K, p) {
      var n = p.size, cw = CARD_W / n, ch = GRID_H / n, mx = K.mx;
      p.cards.forEach(function (card, i) {
        var top = 0.5 + i * (CARD_H + 0.4), gy = top + 0.62;
        doc.setFont('Andika', 'bold'); doc.setFontSize(K.pt(0.3));
        var tw0 = doc.getTextWidth(K.safe(p.title)), tmax = K.inner - 3.2, tsz = tw0 > tmax ? 0.3 * tmax / tw0 : 0.3;
        K.txt(p.title, mx, top + 0.36, 'Andika', 'bold', tsz, K.INK);
        K.txt('Name', K.W - mx - 3.0, top + 0.36, 'helvetica', 'normal', 0.17, K.INK);
        doc.setDrawColor(K.INK[0], K.INK[1], K.INK[2]); doc.setLineWidth(0.016);
        doc.line(K.W - mx - 2.45, top + 0.38, K.W - mx, top + 0.38);
        if (card.name) K.txt(card.name, K.W - mx - 2.4, top + 0.36, 'Andika', 'normal', 0.2, K.INK);
        doc.setLineWidth(0.015); doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]);
        card.cells.forEach(function (it, k) {
          var c = k % n, r = Math.floor(k / n), x = mx + c * cw, y = gy + r * ch;
          doc.rect(x, y, cw, ch, 'S');
          K.face(it === 'free' ? null : it, x + cw / 2, y + ch / 2, cw, ch, { maxFont: 0.6, free: it === 'free' });
        });
        doc.setLineWidth(0.03); doc.rect(mx, gy, CARD_W, GRID_H, 'S');
      });
      doc.setDrawColor(K.FAINT[0], K.FAINT[1], K.FAINT[2]); doc.setLineWidth(0.012); doc.setLineDashPattern([0.07, 0.05], 0);
      doc.line(0.3, 0.5 + CARD_H + 0.2, K.W - 0.3, 0.5 + CARD_H + 0.2); doc.setLineDashPattern([], 0);
    }
  });

  function callerCols(items) {
    if (items[0].t !== 'text') return 6;
    var m = 1; items.forEach(function (it) { m = Math.max(m, it.v.length); });
    return m <= 1 ? 8 : m <= 3 ? 6 : m <= 6 ? 5 : 4;
  }

  TM.registerPageType('caller', {
    html: function (p) {
      var items = p.items, cols = callerCols(items), rows = Math.ceil(items.length / cols), rh = Math.min(0.8, 8.4 / rows);
      var cw = CARD_W / cols, cells = items.map(function (it, i) {
        return '<div class="ccell"><span class="cn">' + (i + 1) + '</span>' + TM.draw.face(it, cw * 0.8, rh, { maxFont: Math.min(0.5, rh * 0.55) }) + '<span class="cb"></span></div>';
      }).join('');
      return '<section class="sheet" aria-label="' + esc(p.title) + '"><div class="page">' +
        '<div class="top"><h2 style="font-size:' + Math.min(4, 52 / (p.title.length * 0.6)).toFixed(2) + 'cqw">' + esc(p.title) + '</h2><span class="tag t">Teacher copy</span></div>' +
        '<div class="dir" style="margin-top:3cqw">Call the items in this order and check each one off. Players mark any item they have on their card. Use the list to confirm a winning card.</div>' +
        '<div class="cgrid" style="--cols:' + cols + ';--rh:' + (rh / 0.085).toFixed(2) + 'cqw">' + cells + '</div>' +
        '<div class="foot"><span>' + esc(p.footer || '') + '</span><span>' + items.length + ' items</span></div></div></section>';
    },
    pdf: function (doc, K, p) {
      var items = p.items, cols = callerCols(items), rows = Math.ceil(items.length / cols), rh = Math.min(0.8, 8.4 / rows), mx = K.mx;
      var tag = 'Teacher copy'; doc.setFont('helvetica', 'bold'); doc.setFontSize(K.pt(0.1615));
      var pw = doc.getTextWidth(tag) + 0.408, px = K.W - mx - pw;
      doc.setFont('Andika', 'bold'); doc.setFontSize(K.pt(0.34));
      var cw0 = doc.getTextWidth(K.safe(p.title)), cmax = px - mx - 0.2, csz = cw0 > cmax ? 0.34 * cmax / cw0 : 0.34;
      K.txt(p.title, mx, 0.88, 'Andika', 'bold', csz, K.INK);
      doc.setFillColor(K.INK[0], K.INK[1], K.INK[2]); doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]); doc.setLineWidth(0.02);
      doc.roundedRect(px, 0.68, pw, 0.27, 0.135, 0.135, 'FD'); K.txt(tag, px + pw / 2, 0.865, 'helvetica', 'bold', 0.1615, [255, 255, 255], { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(K.pt(0.1785));
      var lines = doc.splitTextToSize('Call the items in this order and check each one off. Players mark any item they have on their card. Use the list to confirm a winning card.', K.inner);
      lines.forEach(function (l, i) { K.txt(l, mx, 1.3 + i * 0.2, 'helvetica', 'normal', 0.1785, K.SOFT); });
      var gt = 1.3 + (lines.length - 1) * 0.2 + 0.25, cw = K.inner / cols;
      doc.setDrawColor(K.HAIR[0], K.HAIR[1], K.HAIR[2]); doc.setLineWidth(0.011);
      items.forEach(function (it, i) {
        var c = i % cols, r = Math.floor(i / cols), x = mx + c * cw, y = gt + r * rh;
        if (c === 0) doc.line(mx, y + rh, K.W - mx, y + rh);
        K.txt(String(i + 1), x + 0.04, y + 0.13, 'helvetica', 'normal', 0.095, K.FAINT);
        K.face(it, x + cw * 0.46, y + rh / 2, cw * 0.8, rh, { maxFont: Math.min(0.5, rh * 0.55) });
        doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]); doc.setLineWidth(0.014);
        doc.circle(x + cw - 0.16, y + rh / 2, 0.07, 'S');
        doc.setDrawColor(K.HAIR[0], K.HAIR[1], K.HAIR[2]); doc.setLineWidth(0.011);
      });
      doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]); doc.setLineWidth(0.02); doc.line(mx, gt, K.W - mx, gt);
      K.txt(p.footer || '', mx, K.bottom, 'helvetica', 'normal', 0.136, K.FAINT);
      K.txt(items.length + ' items', K.W - mx, K.bottom, 'helvetica', 'normal', 0.136, K.FAINT, { align: 'right' });
    }
  });

  TM.registerFormat({
    id: 'bingo', name: 'Bingo cards', blurb: 'A different card for each student, with a caller list.',
    students: 'cards', copies: { teacher: 'Caller list' },
    options: [
      { key: 'size', label: 'Card size', type: 'select', def: '5', choices: [{ v: '3', l: '3 x 3' }, { v: '4', l: '4 x 4' }, { v: '5', l: '5 x 5 with a free space' }] },
      { key: 'cards', label: 'Number of cards when no class is chosen', type: 'number', def: 12, min: 2, max: 60 }
    ],
    plan: function (env) {
      var size0 = +env.opts.size || 5, student = [], teacher = [], warn = '', total = 0;
      function need(n) { return n * n - (n % 2 ? 1 : 0); }
      env.sets.forEach(function (set) {
        var pool = set.pool(env.ctx), size = size0, name = TM.setName(set, env.ctx);
        while (size > 3 && need(size) > pool.length) size--;
        if (need(size) > pool.length) { warn = '"' + name + '" needs at least ' + need(3) + ' items to make bingo cards.'; return; }
        var count = env.students.length ? env.students.length : Math.max(1, Math.min(60, +env.opts.cards || 12)), cards = [];
        for (var i = 0; i < count; i++) {
          var cells = TM.deal(pool, need(size), env.seed([set.id, 'bingo', env.students.length ? env.students[i].id : i, env.sig]));
          if (size % 2) cells.splice((size * size - 1) / 2, 0, 'free');
          cards.push({ cells: cells, name: env.filled ? env.students[i].name : '' });
        }
        total += count;
        for (var j = 0; j < cards.length; j += 2) student.push({ type: 'bingo', title: 'Bingo: ' + name, size: size, cards: cards.slice(j, j + 2) });
        teacher.push({ type: 'caller', title: 'Bingo caller list: ' + name, items: TM.deal(pool, Math.min(pool.length, 96), env.seed([set.id, 'caller', env.sig])), footer: env.footer });
      });
      return { student: student, teacher: teacher, warn: warn, info: ' with ' + total + (total === 1 ? ' card' : ' cards') };
    }
  });
})();
