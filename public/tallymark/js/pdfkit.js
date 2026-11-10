/* Tallymark: shared drawing helpers for PDF output, and the page-type registry.
   A page type knows how to draw one printed page as HTML (preview and browser print) and as PDF. */
(function () {
  var TM = window.TM = window.TM || {};
  TM.pageTypes = {};
  TM.formats = {}; TM.formatList = [];
  TM.registerFormat = function (f) { TM.formats[f.id] = f; TM.formatList.push(f); };
  TM.registerPageType = function (id, def) { TM.pageTypes[id] = def; };
  TM.pageHTML = function (p) { return TM.pageTypes[p.type].html(p); };

  TM.pdfKit = function (doc) {
    var K = { W: 8.5, H: 11, mx: 0.595, u: 0.085, bottom: 11 - 0.425, inner: 8.5 - 2 * 0.595,
      INK: [17, 24, 39], SOFT: [55, 65, 81], FAINT: [123, 134, 150], HAIR: [227, 231, 238], RULE: [31, 41, 55], doc: doc };
    K.pt = function (x) { return x * 72; };
    K.safe = function (s) {
      return String(s).replace(/[\s\S]/g, function (c) {
        var n = c.charCodeAt(0);
        return (n >= 32 && n <= 126) || (n >= 160 && n <= 255) || n === 0x2019 || n === 0x2013 ? c : '?';
      });
    };
    K.txt = function (str, x, y, font, style, size, color, opts) {
      doc.setFont(font, style); doc.setFontSize(K.pt(size)); doc.setTextColor(color[0], color[1], color[2]); doc.text(K.safe(str), x, y, opts);
    };
    K.fit = function (str, maxW, maxF) {
      doc.setFont('Andika', 'normal'); doc.setFontSize(K.pt(maxF));
      var w = doc.getTextWidth(K.safe(str));
      return w > maxW ? maxF * maxW / w : maxF;
    };
    K.rgb = function (h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; };

    // Draw an item centered at (cx, cy). o.size for shapes and swatches; o.font and o.maxW for text.
    K.item = function (item, cx, cy, o) {
      if (item.t === 'text') {
        var fs = K.fit(item.v, o.maxW, o.font);
        K.txt(item.v, cx, cy + 0.33 * fs, 'Andika', 'normal', fs, K.INK, { align: 'center' });
        return;
      }
      var s = o.size, fill = K.rgb(item.c), ink = K.INK;
      doc.setFillColor(fill[0], fill[1], fill[2]); doc.setDrawColor(ink[0], ink[1], ink[2]); doc.setLineWidth(Math.max(0.012, s * 0.035));
      if (item.t === 'color') { doc.roundedRect(cx - s / 2, cy - s / 2, s, s, s * 0.16, s * 0.16, 'FD'); return; }
      var pts = TM.items.POLY[item.s].map(function (p) { return [cx + p[0] * s / 2, cy + p[1] * s / 2]; });
      var segs = []; for (var i = 1; i < pts.length; i++) segs.push([pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]]);
      doc.lines(segs, pts[0][0], pts[0][1], [1, 1], 'FD', true);
    };

    // A face in a card cell of cw x ch inches centered at (cx, cy). Mirrors TM.draw.face.
    K.face = function (item, cx, cy, cw, ch, o) {
      o = o || {};
      if (o.free) { var f = Math.min(ch * 0.28, 0.32); K.txt('FREE', cx, cy + 0.33 * f, 'Andika', 'bold', f, K.INK, { align: 'center' }); return; }
      if (item.t === 'text') { K.item(item, cx, cy, { font: Math.min(o.maxFont || 0.9, ch * 0.5), maxW: cw * 0.86 }); return; }
      var s = Math.min(cw * 0.62, ch * (o.label ? 0.5 : 0.62));
      if (o.label) {
        K.item(item, cx, cy - ch * 0.08, { size: s });
        var lf = Math.min(0.22, ch * 0.12);
        K.txt(item.n, cx, cy - ch * 0.08 + s / 2 + lf * 1.35, 'Andika', 'normal', lf, K.SOFT, { align: 'center' });
      } else K.item(item, cx, cy, { size: s });
    };
    return K;
  };

  TM.makePdf = function (pages) {
    var jsPDF = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDF) throw new Error('jsPDF missing');
    var doc = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
    doc.addFileToVFS('Andika-Regular.ttf', window.TMFONTS.r); doc.addFont('Andika-Regular.ttf', 'Andika', 'normal');
    doc.addFileToVFS('Andika-Bold.ttf', window.TMFONTS.b); doc.addFont('Andika-Bold.ttf', 'Andika', 'bold');
    var K = TM.pdfKit(doc);
    pages.forEach(function (p, n) {
      if (n > 0) doc.addPage();
      TM.pageTypes[p.type].pdf(doc, K, p);
    });
    return doc;
  };
})();
