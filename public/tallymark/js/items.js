/* Tallymark: things that can appear on a sheet or card. An item is text, a shape, or a color swatch.
   Every item has a key (k) for matching, a spoken name (n), and a type (t). */
(function () {
  var TM = window.TM = window.TM || {};
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var INK = '#111827';

  var COLORS = [
    { n: 'red', c: '#e03131' }, { n: 'orange', c: '#f76707' }, { n: 'yellow', c: '#fcc419' }, { n: 'green', c: '#2f9e44' },
    { n: 'blue', c: '#1c7ed6' }, { n: 'purple', c: '#7048e8' }, { n: 'pink', c: '#f783ac' }, { n: 'brown', c: '#8d5524' },
    { n: 'black', c: '#212529' }, { n: 'gray', c: '#868e96' }
  ];
  var SHAPES = ['circle', 'oval', 'square', 'rectangle', 'triangle', 'diamond', 'star', 'heart', 'hexagon', 'pentagon'];

  function norm(pts) {
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    pts.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, s = Math.max(x1 - x0, y1 - y0) / 2;
    return pts.map(function (p) { return [(p[0] - cx) / s, (p[1] - cy) / s]; });
  }
  function ngon(n, rot, r) { var o = []; for (var i = 0; i < n; i++) { var a = rot + i * 2 * Math.PI / n; o.push([Math.cos(a) * r, Math.sin(a) * r]); } return o; }

  var POLY = {};
  POLY.circle = norm(ngon(48, 0, 1));
  POLY.oval = norm(ngon(48, 0, 1).map(function (p) { return [p[0], p[1] * 0.62]; }));
  POLY.square = norm([[-1, -1], [1, -1], [1, 1], [-1, 1]]);
  POLY.rectangle = norm([[-1, -0.62], [1, -0.62], [1, 0.62], [-1, 0.62]]);
  POLY.triangle = norm([[0, -0.95], [1, 0.8], [-1, 0.8]]);
  POLY.diamond = norm([[0, -1], [0.72, 0], [0, 1], [-0.72, 0]]);
  (function () {
    var s = [];
    for (var i = 0; i < 10; i++) { var r = i % 2 ? 0.42 : 1, a = -Math.PI / 2 + i * Math.PI / 5; s.push([Math.cos(a) * r, Math.sin(a) * r]); }
    POLY.star = norm(s);
    var h = [];
    for (var j = 0; j < 72; j++) {
      var t = j * 2 * Math.PI / 72;
      h.push([16 * Math.pow(Math.sin(t), 3), -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))]);
    }
    POLY.heart = norm(h);
  })();
  POLY.hexagon = norm(ngon(6, 0, 1));
  POLY.pentagon = norm(ngon(5, -Math.PI / 2, 1));

  var POINTS = {};
  Object.keys(POLY).forEach(function (k) { POINTS[k] = POLY[k].map(function (p) { return p[0].toFixed(3) + ',' + p[1].toFixed(3); }).join(' '); });

  function T(v) { return { k: v, t: 'text', v: v, n: v }; }
  function colorItem(col) { return { k: 'color:' + col.n, t: 'color', c: col.c, n: col.n }; }
  function shapeItem(s, col) { return { k: 'shape:' + s + ':' + (col ? col.n : ''), t: 'shape', s: s, c: col ? col.c : '#25407a', n: col ? col.n + ' ' + s : s }; }
  function colorByName(n) { for (var i = 0; i < COLORS.length; i++) if (COLORS[i].n === n) return COLORS[i]; return null; }

  TM.items = { T: T, colorItem: colorItem, shapeItem: shapeItem, COLORS: COLORS, SHAPES: SHAPES, POLY: POLY, colorByName: colorByName, INK: INK };

  function fontEst(text, maxW, maxF) { return Math.min(maxF, maxW / (Math.max(1, String(text).length) * 0.56)); }
  TM.fontEst = fontEst;

  // HTML for one item (sizing comes from the CSS variable --vs on a parent, or from the caller).
  TM.draw = {
    html: function (item) {
      if (item.t === 'text') return esc(item.v);
      if (item.t === 'color') return '<span class="sw" style="background:' + item.c + '"></span>';
      return '<svg class="shp" viewBox="-1.1 -1.1 2.2 2.2" aria-hidden="true" focusable="false"><polygon points="' + POINTS[item.s] + '" fill="' + item.c + '" stroke="' + INK + '" stroke-width=".07" stroke-linejoin="round"/></svg>';
    },

    // A face for a card or bingo square. cw, ch are the cell size in inches.
    face: function (item, cw, ch, o) {
      o = o || {};
      if (o.free) return '<span class="ft free" style="font-size:' + (Math.min(ch * 0.28, 0.32) / 0.085).toFixed(2) + 'cqw">FREE</span>';
      if (item.t === 'text') {
        var fs = fontEst(item.v, cw * 0.86, Math.min(o.maxFont || 0.9, ch * 0.5));
        return '<span class="ft" style="font-size:' + (fs / 0.085).toFixed(2) + 'cqw">' + esc(item.v) + '</span>';
      }
      var s = Math.min(cw * 0.62, ch * (o.label ? 0.5 : 0.62));
      var h = '<span class="fv" style="--vs:' + (s / 0.085).toFixed(2) + 'cqw">' + TM.draw.html(item) + '</span>';
      if (o.label) h += '<span class="fl" style="font-size:' + (Math.min(0.22, ch * 0.12) / 0.085).toFixed(2) + 'cqw">' + esc(item.n) + '</span>';
      return h;
    }
  };
})();
