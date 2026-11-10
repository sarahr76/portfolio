/* Tallymark: a small line chart for one child's scores over time. */
(function () {
  var TM = window.TM = window.TM || {};
  var esc = TM.util.esc;

  function niceMax(v) {
    if (v <= 10) return 10;
    var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p;
    var step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return step * p;
  }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12).getTime(); }
  function short(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }

  // points: [{date:'YYYY-MM-DD', value:n}] sorted by date. goal: number or null.
  TM.chart = function (points, goal, label) {
    var W = 640, H = 280, ml = 44, mr = 24, mt = 20, mb = 40;
    var iw = W - ml - mr, ih = H - mt - mb;
    var top = 0; points.forEach(function (p) { top = Math.max(top, p.value); });
    if (goal) top = Math.max(top, goal);
    var max = niceMax(Math.max(top * 1.08, 5));
    function y(v) { return mt + ih - (v / max) * ih; }
    var t0 = points.length ? parse(points[0].date) : 0, t1 = points.length ? parse(points[points.length - 1].date) : 0;
    function x(d) { return points.length < 2 || t1 === t0 ? ml + iw / 2 : ml + ((parse(d) - t0) / (t1 - t0)) * iw; }

    var g = '';
    for (var i = 0; i <= 4; i++) {
      var v = (max / 4) * i, yy = y(v);
      g += '<line class="gl" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + yy + '" y2="' + yy + '"/>';
      g += '<text class="ax" x="' + (ml - 8) + '" y="' + (yy + 4) + '" text-anchor="end">' + (Math.round(v * 10) / 10) + '</text>';
    }
    var goalSvg = '';
    if (goal) {
      goalSvg = '<line class="goal" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + y(goal) + '" y2="' + y(goal) + '"/>' +
        '<text class="goaltxt" x="' + (W - mr) + '" y="' + (y(goal) - 6) + '" text-anchor="end">Goal ' + goal + '</text>';
    }
    var path = '', dots = '', xl = '';
    points.forEach(function (p, i) {
      var px = x(p.date), py = y(p.value);
      path += (i ? 'L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1);
      var last = i === points.length - 1;
      dots += '<circle class="dot' + (last ? ' last' : '') + '" cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="' + (last ? 6 : 4) + '"/>';
      if (points.length <= 12 || last || i === 0) dots += '<text class="val" x="' + px.toFixed(1) + '" y="' + (py - 11).toFixed(1) + '" text-anchor="middle">' + p.value + '</text>';
    });
    var every = Math.max(1, Math.ceil(points.length / 6));
    points.forEach(function (p, i) {
      if (i % every === 0 || i === points.length - 1) xl += '<text class="ax" x="' + x(p.date).toFixed(1) + '" y="' + (H - 14) + '" text-anchor="middle">' + short(p.date) + '</text>';
    });
    var desc = label + ': ' + points.map(function (p) { return short(p.date) + ' ' + p.value; }).join(', ');
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(desc) + '">' + g + goalSvg +
      (points.length > 1 ? '<path class="line" d="' + path + '"/>' : '') + dots + xl + '</svg>';
  };
})();
