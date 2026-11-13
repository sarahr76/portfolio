/* Format: one-minute fluency sheet, with a teacher scoring copy. */
(function () {
  var TM = window.TM = window.TM || {};
  var esc = TM.util.esc;

  function unitCap(u) { return u.charAt(0).toUpperCase() + u.slice(1); }
  function dirFor(p) {
    if (!p.teacher) return p.dir;
    return 'Slash each miss. When time is up, draw a line after the last ' + p.unit + ' reached. The small numbers show the count at the end of each row.' + (p.teacherNote || '');
  }
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  function visual(p) { return p.list.length && p.list[0].t !== 'text'; }

  TM.registerPageType('fluency', {
    html: function (p) {
      var L = p.layout, t = p.teacher, vis = visual(p), rows = '';
      var vs = vis ? ((t ? L.vis * 0.74 : L.vis) / 0.085).toFixed(2) + 'cqw' : '';
      for (var i = 0; i < L.rows; i++) {
        var cells = p.list.slice(i * L.cols, i * L.cols + L.cols).map(function (it) {
          if (!vis) return '<div class="cell">' + esc(it.v) + '</div>';
          return '<div class="cell v">' + TM.draw.html(it) + (t ? '<span class="lab">' + esc(it.n) + '</span>' : '') + '</div>';
        }).join('');
        rows += '<div class="r' + (t ? ' t' : '') + '">' + (t ? '<div class="cnt">' + ((i + 1) * L.cols) + '</div>' : '') + cells + '</div>';
      }
      var name = p.student ? '<span class="nm">' + esc(p.student) + '</span>' : '<i></i>';
      var head = '<div class="top"><h2>' + esc(p.title) + '</h2><span class="tag' + (t ? ' t' : '') + '">' + (t ? 'Teacher copy' : '1 minute') + '</span></div>' +
        '<div class="meta"><div class="field">Name ' + name + '</div><div class="field">Date <i></i></div></div>' +
        '<div class="dir">' + esc(dirFor(p)) + '</div>';
      var foot;
      if (t) {
        foot = '<div class="score"><div class="box">Reached</div><div class="box">Errors</div><div class="box">Correct</div></div>' +
          '<div class="missed">' + unitCap(p.unit) + 's missed <i></i></div>' +
          '<div class="foot"><span>' + esc(p.footer) + '</span><span>Correct = reached minus errors</span></div>';
      } else {
        foot = '<div class="days"><div class="dl">Practice days <span>write the number correct</span></div><div class="dg">' +
          DAYS.map(function (d) { return '<div class="dy"><b>' + d + '</b><i></i></div>'; }).join('') + '</div></div>' +
          '<div class="foot"><span>' + esc(p.footer) + '</span><span>Stop when time is up</span></div>';
      }
      return '<section class="sheet" aria-label="' + esc(p.title) + (t ? ' teacher copy' : '') + '"><div class="page" style="--cols:' + L.cols + ';--rows:' + L.rows + ';--fs:' + (L.font / 0.085).toFixed(2) + 'cqw;--vs:' + vs + '">' +
        head + '<div class="grid">' + rows + '</div>' + foot + '</div></section>';
    },

    pdf: function (doc, K, p) {
      var t = p.teacher, L = p.layout, u = K.u, mx = K.mx, W = K.W, bottom = K.bottom, inner = K.inner, vis = visual(p);
      K.txt(p.title, mx, 0.88, 'Andika', 'bold', 4 * u, K.INK);
      var tag = t ? 'Teacher copy' : '1 minute';
      doc.setFont('helvetica', 'bold'); doc.setFontSize(K.pt(1.9 * u));
      var tw = doc.getTextWidth(tag), pw = tw + 2 * 2.4 * u, ph = 0.27, px = W - mx - pw, py = 0.88 - 0.2;
      doc.setLineWidth(0.02); doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]);
      if (t) { doc.setFillColor(K.INK[0], K.INK[1], K.INK[2]); doc.roundedRect(px, py, pw, ph, ph / 2, ph / 2, 'FD'); }
      else doc.roundedRect(px, py, pw, ph, ph / 2, ph / 2, 'S');
      K.txt(tag, px + pw / 2, py + 0.185, 'helvetica', 'bold', 1.9 * u, t ? [255, 255, 255] : K.INK, { align: 'center' });

      var y = 1.3, half = (inner - 4 * u) / 2;
      doc.setLineWidth(0.02); doc.setDrawColor(K.INK[0], K.INK[1], K.INK[2]);
      K.txt('Name', mx, y, 'helvetica', 'normal', 2.2 * u, K.INK);
      if (p.student) K.txt(p.student, mx + 0.6, y, 'Andika', 'normal', 2.3 * u, K.INK);
      doc.line(mx + 0.55, y + 0.02, mx + half, y + 0.02);
      var dx = mx + half + 4 * u;
      K.txt('Date', dx, y, 'helvetica', 'normal', 2.2 * u, K.INK);
      doc.line(dx + 0.5, y + 0.02, W - mx, y + 0.02);

      doc.setFont('helvetica', 'normal'); doc.setFontSize(K.pt(2.1 * u));
      var lines = doc.splitTextToSize(K.safe(dirFor(p)), inner);
      var dy = y + 0.4, lh = 0.2;
      lines.forEach(function (l, i) { K.txt(l, mx, dy + i * lh, 'helvetica', 'normal', 2.1 * u, K.SOFT); });
      var gt = dy + (lines.length - 1) * lh + 0.2, gb = t ? 9.2 : bottom - 0.28 - 1.1;
      var rh = (gb - gt) / L.rows, off = t ? 4.5 * u : 0, cw = (inner - off) / L.cols, gx = mx + off;
      doc.setDrawColor(K.HAIR[0], K.HAIR[1], K.HAIR[2]); doc.setLineWidth(0.011);
      for (var r = 0; r < L.rows; r++) {
        var ry = gt + r * rh;
        doc.line(mx, ry + rh, W - mx, ry + rh);
        if (t) K.txt(String((r + 1) * L.cols), mx, ry + rh / 2 + 0.04, 'helvetica', 'normal', 1.5 * u, K.FAINT);
        for (var c = 0; c < L.cols; c++) {
          var item = p.list[r * L.cols + c]; if (!item) continue;
          var cx = gx + cw * c + cw / 2, cy = ry + rh / 2;
          if (!vis) K.item(item, cx, cy, { font: L.font, maxW: cw * 0.94 });
          else if (t) {
            var s = Math.min(L.vis * 0.74, rh * 0.6);
            K.item(item, cx, cy - 0.06, { size: s });
            K.txt(item.n, cx, cy - 0.06 + s / 2 + 0.115, 'helvetica', 'normal', 0.105, K.FAINT, { align: 'center' });
          } else K.item(item, cx, cy, { size: Math.min(L.vis, rh * 0.7) });
        }
      }
      doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]); doc.setLineWidth(0.02); doc.line(mx, gt, W - mx, gt);

      if (t) {
        var bw = (inner - 2 * 3 * u) / 3, boxTop = 9.35;
        doc.setLineWidth(0.02); doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]);
        ['Reached', 'Errors', 'Correct'].forEach(function (lb, i) {
          var bx = mx + i * (bw + 3 * u);
          doc.roundedRect(bx, boxTop, bw, 0.64, 0.085, 0.085, 'S');
          K.txt(lb, bx + 0.15, boxTop + 0.22, 'helvetica', 'bold', 1.8 * u, K.INK);
        });
        var ml = unitCap(p.unit) + 's missed';
        K.txt(ml, mx, 10.2, 'helvetica', 'normal', 1.9 * u, K.INK);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(K.pt(1.9 * u));
        doc.setDrawColor(K.INK[0], K.INK[1], K.INK[2]); doc.line(mx + doc.getTextWidth(ml) + 0.12, 10.21, W - mx, 10.21);
        K.txt('Correct = reached minus errors', W - mx, bottom, 'helvetica', 'normal', 1.6 * u, K.FAINT, { align: 'right' });
      } else {
        var ty = bottom - 0.28 - 0.88, dw = (inner - 6 * 0.1) / 7;
        K.txt('Practice days', mx, ty, 'helvetica', 'bold', 1.9 * u, K.INK);
        K.txt('write the number correct', mx + 1.25, ty, 'helvetica', 'normal', 1.7 * u, K.FAINT);
        doc.setLineWidth(0.02); doc.setDrawColor(K.RULE[0], K.RULE[1], K.RULE[2]);
        DAYS.forEach(function (d, i) {
          var bx = mx + i * (dw + 0.1);
          doc.roundedRect(bx, ty + 0.1, dw, 0.62, 0.085, 0.085, 'S');
          K.txt(d, bx + dw / 2, ty + 0.27, 'helvetica', 'bold', 1.6 * u, K.SOFT, { align: 'center' });
        });
        K.txt('Stop when time is up', W - mx, bottom, 'helvetica', 'normal', 1.6 * u, K.FAINT, { align: 'right' });
      }
      K.txt(p.footer, mx, bottom, 'helvetica', 'normal', 1.6 * u, K.FAINT);
    }
  });

  TM.registerFormat({
    id: 'fluency', name: 'Fluency sheet', blurb: 'One-minute timed sheets, with a teacher copy for scoring.',
    students: 'full', copies: { student: 'Student copies', teacher: 'Teacher copies' },
    options: [{ key: 'large', label: 'Larger type, fewer per page', def: false }],
    plan: function (env) {
      var student = [], teacher = [];
      env.sets.forEach(function (set) {
        env.variants.forEach(function (v) {
          var gctx = env.opts && env.opts.large ? Object.assign({}, env.ctx, { large: true }) : env.ctx;
          var grid = TM.makeGrid(set, gctx, env.seed([set.id, env.sig, env.diff ? v.id : '']));
          var page = { type: 'fluency', setId: set.id, title: TM.setTitle(set, env.ctx), dir: set.dir, teacherNote: set.teacherNote, unit: set.unit,
            list: grid.list, layout: grid.layout, student: v ? v.name : '', footer: env.footer };
          var a = Object.assign({}, page, { teacher: false }), b = Object.assign({}, page, { teacher: true });
          student.push(a); teacher.push(b);
        });
      });
      return { student: student, teacher: teacher, info: env.filled ? ' for ' + env.nStudents + (env.nStudents === 1 ? ' student' : ' students') : '' };
    }
  });
})();
