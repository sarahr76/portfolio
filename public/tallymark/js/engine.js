/* Tallymark: seeded scrambling. The same seed always gives the same sheet. */
(function () {
  var TM = window.TM = window.TM || {};

  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function shuffle(a, r) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function monday(offset) {
    var d = new Date(); d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + (offset || 0) * 7);
    return d;
  }
  function pretty(d) { return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }
  function prettyFull(s) {
    var p = s.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2], 12);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function uid() { return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3); }

  TM.util = { hash: hash, rng: rng, shuffle: shuffle, iso: iso, monday: monday, pretty: pretty, prettyFull: prettyFull, esc: esc, uid: uid,
    today: function () { return iso(new Date()); } };

  // Blocks of a shuffled pool keep every item equally frequent. A repair pass then
  // separates repeats that touch left-right or up-down.
  function sequence(pool, cols, rows, r) {
    var N = cols * rows, seq = [];
    if (!pool.length) return seq;
    if (pool.length >= N) return shuffle(pool.slice(), r).slice(0, N);
    while (seq.length < N) seq = seq.concat(shuffle(pool.slice(), r));
    seq.length = N;
    function bad(i, v) {
      var c = i % cols;
      return (c > 0 && seq[i - 1].k === v.k) || (c < cols - 1 && i + 1 < N && seq[i + 1].k === v.k) ||
             (i >= cols && seq[i - cols].k === v.k) || (i + cols < N && seq[i + cols].k === v.k);
    }
    if (pool.length > 2) {
      for (var pass = 0; pass < 6; pass++) {
        for (var i = 0; i < N; i++) {
          if (!bad(i, seq[i])) continue;
          for (var k = 0; k < 60; k++) {
            var j = Math.floor(r() * N);
            if (j !== i && !bad(i, seq[j]) && !bad(j, seq[i])) { var t = seq[i]; seq[i] = seq[j]; seq[j] = t; break; }
          }
        }
      }
    }
    return seq;
  }

  TM.lettersPool = function (text) {
    var set = [];
    String(text || '').toLowerCase().split('').forEach(function (c) {
      if (c >= 'a' && c <= 'z' && set.indexOf(c) < 0) set.push(c);
    });
    return set.length >= 2 ? set : 'abcdefghijklmnopqrstuvwxyz'.split('');
  };

  TM.parseItems = function (text) {
    var out = [], seen = {};
    String(text || '').split(/[\s,;]+/).forEach(function (s) {
      s = s.trim().slice(0, 14);
      if (s && !seen[s]) { seen[s] = 1; out.push(s); }
    });
    return out.slice(0, 500);
  };

  TM.makeGrid = function (kind, ctx, seedKey) {
    var r = rng(hash(seedKey));
    var pool = kind.pool(ctx), layout = kind.layout(pool);
    return { list: sequence(pool, layout.cols, layout.rows, r), layout: layout };
  };

  // A seeded shuffle of items, keeping the first n.
  TM.deal = function (items, n, seedKey) {
    var r = rng(hash(seedKey));
    return shuffle(items.slice(), r).slice(0, n);
  };
})();
