/* Tallymark: the interface. */
(function () {
  var TM = window.TM, U = TM.util, esc = U.esc;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var DEFAULT = {
    v: 1,
    prefs: { format: 'fluency', opts: {}, kinds: ['upper', 'lower'], letters: '', mode: 'weekly', code: '', classId: '', studentMode: 'same', names: 'blank',
      student: true, teacher: true, customTitle: '', customText: '', paper: 'letter' },
    classes: [], entries: [], goals: {}, setups: [], meta: {}
  };
  var S = TM.store.load(DEFAULT), P = S.prefs;
  var offset = 0, salt = 0, editClassId = null;
  var PREVIEW_MAX = 6;

  function save() {
    if (!S.meta.since && (S.classes.length || S.entries.length)) S.meta.since = U.today();
    TM.store.save(S);
  }
  function getClass(id) { for (var i = 0; i < S.classes.length; i++) if (S.classes[i].id === id) return S.classes[i]; return null; }
  function activeClass() {
    var c = getClass(P.classId);
    if (!c && S.classes.length) { c = S.classes[0]; P.classId = c.id; }
    return c;
  }

  /* ---------- Plan: which pages exist ---------- */
  function ctx() { return { letters: TM.lettersPool(P.letters), customItems: TM.parseItems(P.customText), customTitle: P.customTitle.trim() }; }
  function currentFormat() { return TM.formats[P.format] || TM.formats.fluency; }
  function optsFor(fmt) {
    var o = {}, saved = P.opts && P.opts[fmt.id] || {};
    fmt.options.forEach(function (op) { o[op.key] = saved[op.key] !== undefined ? saved[op.key] : op.def; });
    return o;
  }

  function plan() {
    var week = U.monday(offset), c = ctx(), cls = P.classId ? getClass(P.classId) : null, fmt = currentFormat();
    var students = cls ? cls.students.filter(function (s) { return s.name.trim(); }) : [];
    var diff = fmt.students === 'full' && P.studentMode === 'diff' && students.length > 0;
    var filled = fmt.students !== 'none' && students.length > 0 && (diff || P.names === 'filled');
    var variants = fmt.students === 'full' && filled ? students : [null];
    var base = P.mode === 'weekly' ? 'w' + U.iso(week) : 'c' + P.code.trim().toLowerCase();
    var footer = P.mode === 'weekly' ? 'Week of ' + U.pretty(week) : (P.code.trim() ? 'Code: ' + P.code.trim() : '');
    var sets = [], warn = '';
    TM.SETS.forEach(function (k) {
      if (P.kinds.indexOf(k.id) < 0) return;
      if (k.id === 'custom' && !c.customItems.length) { warn = 'Add some items to your own list to use it.'; return; }
      sets.push(k);
    });
    var env = { sets: sets, ctx: c, students: students, variants: variants, filled: filled, diff: diff, base: base, footer: footer,
      sig: c.letters.join('') + '|' + c.customItems.join(','), opts: optsFor(fmt), nStudents: students.length,
      seed: function (parts) { return [base].concat(parts).concat([salt]).join('|'); } };
    var res = sets.length ? fmt.plan(env) : { student: [], teacher: [] };
    var wantS = fmt.copies.student ? P.student : true, wantT = fmt.copies.teacher ? P.teacher : false;
    return { pages: (wantS ? res.student : []).concat(wantT ? res.teacher : []), warn: res.warn || warn, week: week, info: res.info || '', fmt: fmt };
  }

  /* ---------- Make view ---------- */
  function buildFormats() {
    $('#formatSeg').innerHTML = TM.formatList.map(function (f) {
      return '<label><input type="radio" name="format" value="' + f.id + '"><span><strong>' + esc(f.name) + '</strong><small>' + esc(f.blurb) + '</small></span></label>';
    }).join('');
  }

  function buildChips() {
    TM.SETS.forEach(function (k) {
      var box = $('#chips-' + k.group);
      var lab = document.createElement('label'); lab.className = 'chip';
      lab.innerHTML = '<input type="checkbox" data-kind="' + k.id + '"> ' + esc(k.label);
      box.appendChild(lab);
    });
  }

  function renderFormatOpts() {
    var fmt = currentFormat(), o = optsFor(fmt), h = '';
    fmt.options.forEach(function (op) {
      var id = 'opt-' + op.key;
      if (op.type === 'select') {
        h += '<label class="field" for="' + id + '">' + esc(op.label) + '<select id="' + id + '" data-opt="' + op.key + '">' +
          op.choices.map(function (ch) { return '<option value="' + ch.v + '"' + (String(o[op.key]) === ch.v ? ' selected' : '') + '>' + esc(ch.l) + '</option>'; }).join('') + '</select></label>';
      } else if (op.type === 'number') {
        h += '<label class="field" for="' + id + '">' + esc(op.label) + '<input type="number" id="' + id + '" data-opt="' + op.key + '" min="' + op.min + '" max="' + op.max + '" value="' + esc(o[op.key]) + '" inputmode="numeric"></label>';
      } else {
        h += '<label class="chip"><input type="checkbox" id="' + id + '" data-opt="' + op.key + '"' + (o[op.key] ? ' checked' : '') + '> ' + esc(op.label) + '</label>';
      }
    });
    $('#formatOpts').innerHTML = h;
    $('#formatOpts').hidden = !h;
  }

  function syncControls() {
    $$('#controls [data-kind]').forEach(function (el) { el.checked = P.kinds.indexOf(el.getAttribute('data-kind')) >= 0; });
    $$('input[name=format]').forEach(function (r) { r.checked = r.value === currentFormat().id; });
    $('#letters').value = P.letters;
    $('#customBox').hidden = P.kinds.indexOf('custom') < 0;
    $('#customTitle').value = P.customTitle; $('#customText').value = P.customText;
    $$('input[name=mode]').forEach(function (r) { r.checked = r.value === P.mode; });
    $('#code').value = P.code; $('#paper').value = P.paper;
    $('#copyStudent').checked = P.student; $('#copyTeacher').checked = P.teacher;
    renderFormatOpts(); renderClassSelect();
  }

  function renderClassSelect() {
    var sel = $('#classSel'), html = '<option value="">No class (blank name lines)</option>';
    S.classes.forEach(function (c) { html += '<option value="' + c.id + '">' + esc(c.name) + ' (' + c.students.length + ')</option>'; });
    sel.innerHTML = html; sel.value = P.classId && getClass(P.classId) ? P.classId : '';
  }

  function updateMake() {
    var fmt = currentFormat(), cls = P.classId ? getClass(P.classId) : null, hasStu = !!(cls && cls.students.length);
    $('#weeklyBox').hidden = P.mode !== 'weekly'; $('#codeBox').hidden = P.mode !== 'code';
    $('#wkLabel').textContent = 'Week of ' + U.pretty(U.monday(offset));
    $('#wkNow').hidden = offset === 0;
    $('#scrambleNote').textContent = P.mode === 'weekly'
      ? 'The order changes every Monday. Use the arrows to print another week.'
      : 'The same code always gives the same result. Share it with a teammate so you both print the same thing.';
    $('#fsStudents').hidden = fmt.students === 'none';
    $('#stuMode').hidden = fmt.students !== 'full';
    $('#chipStudent').hidden = !fmt.copies.student; $('#chipTeacher').hidden = !fmt.copies.teacher;
    if (fmt.copies.student) $('#lblStudent').textContent = fmt.copies.student;
    if (fmt.copies.teacher) $('#lblTeacher').textContent = fmt.copies.teacher;
    $$('input[name=studentMode]').forEach(function (r) { r.checked = r.value === P.studentMode; r.disabled = !hasStu && r.value === 'diff'; });
    var diff = fmt.students === 'full' && P.studentMode === 'diff' && hasStu;
    $$('input[name=names]').forEach(function (r) { r.checked = (diff ? 'filled' : P.names) === r.value; r.disabled = !hasStu || diff; });
    $('#nameMode').classList.toggle('dis', !hasStu || diff);
    $('#stuMode').classList.toggle('dis', !hasStu);
    $('#studentNote').textContent = !hasStu
      ? 'Add a class on the Classes tab to print names' + (fmt.students === 'cards' ? ' and make one card per student.' : ' and give each child their own sheet.')
      : fmt.students === 'cards' ? 'One card for each of the ' + cls.students.length + ' students.'
        : diff ? 'Each student gets their own scramble, with their name printed on every page.' : 'One scramble for the whole class.';
    ['phonics', 'themes'].forEach(function (g) {
      var n = TM.SETS.filter(function (k) { return k.group === g && P.kinds.indexOf(k.id) >= 0; }).length;
      $('#badge-' + g).textContent = n ? n + ' selected' : '';
    });
    var pl = plan(), n = pl.pages.length, sheets = $('#sheets');
    if (!n) {
      var msg = pl.warn || (!P.kinds.length ? 'Choose something to practice on the left.' : 'Turn on a copy type to see pages.');
      sheets.innerHTML = '<div class="empty">' + esc(msg) + '</div>';
    } else {
      sheets.innerHTML = pl.pages.slice(0, PREVIEW_MAX).map(TM.pageHTML).join('');
    }
    $('#count').textContent = n ? n + (n === 1 ? ' page' : ' pages') + pl.info : '';
    $('#moreNote').textContent = n > PREVIEW_MAX ? 'Showing the first ' + PREVIEW_MAX + ' of ' + n + ' pages. Print and Save PDF include all of them.' : (pl.warn && n ? pl.warn : '');
    $('#printBtn').disabled = !n; $('#pdfBtn').disabled = !n;
    applyPaper(); renderSetups();
    save();
  }

  function applyPaper() {
    var a4 = P.paper === 'a4';
    $('#sheets').classList.toggle('a4', a4); $('#printRoot').classList.toggle('a4', a4);
    $('#pageStyle').textContent = '@page{size:' + (a4 ? 'A4' : 'letter') + ';margin:0}';
  }

  function fileName(pl) {
    var tail = P.mode === 'weekly' ? 'week-of-' + U.pretty(pl.week).toLowerCase().replace(/\s+/g, '-') : 'code-' + (P.code.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'sheet');
    return 'tallymark-' + pl.fmt.id + '-' + tail + '.pdf';
  }

  function printAll() {
    var pl = plan(); if (!pl.pages.length) return;
    $('#printRoot').innerHTML = pl.pages.map(TM.pageHTML).join('');
    window.print();
  }
  window.addEventListener('beforeprint', function () {
    var root = $('#printRoot');
    root.classList.toggle('a4', P.paper === 'a4');
    if (!root.firstChild) root.innerHTML = plan().pages.map(TM.pageHTML).join('');
  });
  window.addEventListener('afterprint', function () { $('#printRoot').innerHTML = ''; });

  function savePdf() {
    var pl = plan(); if (!pl.pages.length) return;
    var btn = $('#pdfBtn'), old = btn.textContent; btn.disabled = true; btn.textContent = 'Building...';
    setTimeout(function () {
      try { TM.makePdf(pl.pages, P.paper).save(fileName(pl)); }
      catch (e) { $('#count').textContent = 'The PDF could not be built. Try Print instead.'; if (window.console) console.error(e); }
      btn.textContent = old; btn.disabled = false;
    }, 30);
  }

  function wireMake() {
    buildFormats(); buildChips();
    $('#controls').addEventListener('change', function (e) {
      var t = e.target;
      if (t.hasAttribute('data-kind')) {
        var id = t.getAttribute('data-kind'), i = P.kinds.indexOf(id);
        if (t.checked && i < 0) P.kinds.push(id);
        if (!t.checked && i >= 0) P.kinds.splice(i, 1);
        $('#customBox').hidden = P.kinds.indexOf('custom') < 0;
      } else if (t.hasAttribute('data-opt')) {
        var fmt = currentFormat(); P.opts[fmt.id] = P.opts[fmt.id] || {};
        P.opts[fmt.id][t.getAttribute('data-opt')] = t.type === 'checkbox' ? t.checked : t.type === 'number' ? (parseInt(t.value, 10) || 0) : t.value;
      } else if (t.name === 'format') { P.format = t.value; renderFormatOpts(); }
      else if (t.name === 'mode') { P.mode = t.value; salt = 0; }
      else if (t.name === 'studentMode') P.studentMode = t.value;
      else if (t.name === 'names') P.names = t.value;
      else if (t.id === 'paper') P.paper = t.value === 'a4' ? 'a4' : 'letter';
      else if (t.id === 'copyStudent') P.student = t.checked;
      else if (t.id === 'copyTeacher') P.teacher = t.checked;
      else if (t.id === 'classSel') { P.classId = t.value; if (!t.value) P.studentMode = 'same'; lv.student = ''; renderLog(); }
      updateMake();
    });
    $('#controls').addEventListener('input', function (e) {
      var t = e.target;
      if (t.id === 'letters') P.letters = t.value.replace(/[^a-zA-Z]/g, '');
      else if (t.id === 'code') P.code = t.value;
      else if (t.id === 'customTitle') P.customTitle = t.value;
      else if (t.id === 'customText') P.customText = t.value;
      else if (t.hasAttribute('data-opt') && t.type === 'number') {
        var f = currentFormat(); P.opts[f.id] = P.opts[f.id] || {}; P.opts[f.id][t.getAttribute('data-opt')] = parseInt(t.value, 10) || 0;
      } else return;
      if (t.id === 'letters' && t.value !== P.letters) t.value = P.letters;
      updateMake();
    });
    $('#controls').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#wkPrev').addEventListener('click', function () { offset--; salt = 0; updateMake(); });
    $('#wkNext').addEventListener('click', function () { offset++; salt = 0; updateMake(); });
    $('#wkNow').addEventListener('click', function () { offset = 0; salt = 0; updateMake(); });
    $('#reshuffle').addEventListener('click', function () { salt++; updateMake(); });
    $('#printBtn').addEventListener('click', printAll);
    $('#pdfBtn').addEventListener('click', savePdf);
  }

  /* ---------- Saved setups ---------- */
  var SNAP = ['format', 'opts', 'kinds', 'letters', 'mode', 'code', 'classId', 'studentMode', 'names', 'student', 'teacher', 'customTitle', 'customText', 'paper'];
  function copy(o) { return JSON.parse(JSON.stringify(o)); }

  function renderSetups() {
    var box = $('#setupList'); if (!box) return;
    if (!S.setups.length) { box.innerHTML = '<p class="note">Save what you have picked so you can bring it back in one click.</p>'; return; }
    box.innerHTML = S.setups.map(function (u) {
      return '<div class="setup-row"><button type="button" class="btn use" data-use="' + u.id + '">' + esc(u.name) + '</button>' +
        '<button type="button" class="x" data-rm="' + u.id + '" aria-label="Remove setup ' + esc(u.name) + '">Remove</button></div>';
    }).join('');
  }

  function wireSetups() {
    $('#setupSave').addEventListener('click', saveSetup);
    $('#setupName').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); saveSetup(); } });
    function saveSetup() {
      var name = $('#setupName').value.trim().slice(0, 40), m = $('#setupMsg');
      if (!name) { m.textContent = 'Give the setup a name first.'; return; }
      var snap = {}; SNAP.forEach(function (k) { snap[k] = copy(P[k]); });
      var old = S.setups.filter(function (u) { return u.name.toLowerCase() === name.toLowerCase(); })[0];
      if (old) { old.data = snap; old.name = name; m.textContent = 'Updated "' + name + '".'; }
      else { S.setups.push({ id: U.uid(), name: name, data: snap }); m.textContent = 'Saved "' + name + '".'; }
      $('#setupName').value = ''; save(); renderSetups();
    }
    $('#setupList').addEventListener('click', function (e) {
      var t = e.target, id = t.getAttribute('data-use') || t.getAttribute('data-rm');
      if (!id) return;
      var u = S.setups.filter(function (x) { return x.id === id; })[0]; if (!u) return;
      if (t.hasAttribute('data-rm')) { S.setups = S.setups.filter(function (x) { return x.id !== id; }); save(); renderSetups(); $('#setupMsg').textContent = 'Removed.'; return; }
      SNAP.forEach(function (k) { if (u.data[k] !== undefined) P[k] = copy(u.data[k]); });
      if (P.classId && !getClass(P.classId)) { P.classId = ''; P.studentMode = 'same'; }
      offset = 0; salt = 0; lv.student = '';
      syncControls(); updateMake(); renderLog();
      $('#setupMsg').textContent = 'Using "' + u.name + '".';
    });
  }

  /* ---------- Timer and quick score ---------- */
  var lv = { student: '', kind: '' };
  var T = { len: 60, left: 60, end: 0, id: 0, run: false, audio: null, lock: null, done: false };

  function clockText(n) { var m = Math.floor(n / 60), r = n % 60; return m + ':' + (r < 10 ? '0' : '') + r; }
  function showClock() {
    var c = $('#clock'); c.textContent = clockText(T.left); c.classList.toggle('done', T.done);
    $('#tStart').textContent = T.run ? 'Pause' : (T.left < T.len && T.left > 0 ? 'Resume' : 'Start');
  }
  function ensureAudio() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      T.audio = T.audio || new AC();
      if (T.audio.state === 'suspended') T.audio.resume();
    } catch (e) {}
  }
  function beep() {
    if (!$('#tSound').checked || !T.audio) return;
    try {
      var a = T.audio, t = a.currentTime;
      [0, 0.3, 0.6].forEach(function (d) {
        var o = a.createOscillator(), g = a.createGain(); o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.3, t + d + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.22);
        o.connect(g); g.connect(a.destination); o.start(t + d); o.stop(t + d + 0.25);
      });
    } catch (e) {}
  }
  function holdScreen(on) {
    try {
      if (on && navigator.wakeLock) navigator.wakeLock.request('screen').then(function (l) { T.lock = l; }, function () {});
      else if (!on && T.lock) { T.lock.release(); T.lock = null; }
    } catch (e) {}
  }
  function stopTimer() { clearInterval(T.id); T.run = false; holdScreen(false); }
  function tick() {
    var ms = T.end - Date.now();
    if (ms <= 0) {
      stopTimer(); T.left = 0; T.done = true; showClock(); beep();
      $('#tMsg').textContent = 'Time. Mark the last item reached, then enter the score below.';
      var r = $('#lReached'); if (r) r.focus();
      return;
    }
    var n = Math.ceil(ms / 1000);
    if (n !== T.left) { T.left = n; showClock(); }
  }
  function startPause() {
    if (T.run) { stopTimer(); T.left = Math.max(1, Math.ceil((T.end - Date.now()) / 1000)); $('#tMsg').textContent = 'Paused.'; showClock(); return; }
    if (T.left <= 0) T.left = T.len;
    T.done = false; ensureAudio(); holdScreen(true);
    T.end = Date.now() + T.left * 1000; T.run = true; T.id = setInterval(tick, 200);
    $('#tMsg').textContent = 'Timing. Say go.'; showClock();
  }
  function resetTimer() { stopTimer(); T.left = T.len; T.done = false; $('#tMsg').textContent = ''; showClock(); }

  function prevCorrect(studentId, kind) {
    var e = S.entries.filter(function (x) { return x.studentId === studentId && x.kind === kind; }).sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
    return e.length ? e[0].correct : null;
  }
  function addEntry(cls, studentId, kind, date, reached, errs) {
    if (isNaN(reached) || reached < 0) return 'Enter how many were reached.';
    if (errs < 0 || errs > reached) return 'Errors cannot be more than reached.';
    S.entries.push({ id: U.uid(), classId: cls.id, studentId: studentId, kind: kind, date: date, reached: reached, errors: errs, correct: reached - errs });
    save(); return '';
  }
  function trendWords(now, before) {
    if (before === null) return 'This is the first score for this sheet.';
    var d = now - before;
    return d > 0 ? 'Up ' + d + ' from last time.' : d < 0 ? 'Down ' + (-d) + ' from last time.' : 'The same as last time.';
  }

  function renderLog() {
    var box = $('#logBox'); if (!box) return;
    var cls = activeClass();
    if (!cls || !cls.students.length) {
      box.innerHTML = '<p class="note">To save a score, <a href="#class">add a class and its students</a> first. You can still use the timer on its own.</p>'; return;
    }
    if (!cls.students.some(function (s) { return s.id === lv.student; })) lv.student = cls.students[0].id;
    if (!lv.kind || !TM.kindById(lv.kind)) lv.kind = P.kinds[0] || 'upper';
    var stu = cls.students.map(function (x) { return '<option value="' + x.id + '"' + (x.id === lv.student ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('');
    box.innerHTML = '<div class="logrow">' +
      '<label class="field" for="lStu">Student<select id="lStu">' + stu + '</select></label>' +
      '<label class="field" for="lKind">Sheet<select id="lKind">' + kindOptions(lv.kind) + '</select></label>' +
      '<label class="field" for="lReached">Reached<input type="number" id="lReached" min="0" max="999" inputmode="numeric"></label>' +
      '<label class="field" for="lErrors">Errors<input type="number" id="lErrors" min="0" max="999" value="0" inputmode="numeric"></label>' +
      '<p class="calc" id="lCalc" aria-live="polite">Correct: </p>' +
      '<button type="button" class="btn primary" id="lAdd">Save score</button></div><p class="msg" id="lMsg" role="status"></p>';
  }

  function wireTimer() {
    var panel = $('#timerPanel'), btn = $('#timerBtn');
    btn.addEventListener('click', function () {
      panel.hidden = !panel.hidden; btn.setAttribute('aria-expanded', String(!panel.hidden));
      if (!panel.hidden) { renderLog(); showClock(); }
    });
    $('#tStart').addEventListener('click', startPause);
    $('#tReset').addEventListener('click', resetTimer);
    $('#tLen').addEventListener('input', function (e) {
      var n = parseInt(e.target.value, 10);
      if (n >= 10 && n <= 600) { T.len = n; if (!T.run) { T.left = n; T.done = false; showClock(); } }
    });
    var box = $('#logBox');
    box.addEventListener('change', function (e) {
      if (e.target.id === 'lStu') lv.student = e.target.value;
      else if (e.target.id === 'lKind') lv.kind = e.target.value;
    });
    box.addEventListener('input', function (e) {
      if (e.target.id !== 'lReached' && e.target.id !== 'lErrors') return;
      var r = parseInt($('#lReached').value, 10), er = parseInt($('#lErrors').value, 10) || 0;
      $('#lCalc').textContent = isNaN(r) ? 'Correct: ' : 'Correct: ' + Math.max(0, r - er);
    });
    box.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.target.id === 'lReached' || e.target.id === 'lErrors')) { e.preventDefault(); $('#lAdd').click(); } });
    box.addEventListener('click', function (e) {
      if (e.target.id !== 'lAdd') return;
      var cls = activeClass(), r = parseInt($('#lReached').value, 10), er = parseInt($('#lErrors').value, 10) || 0, m = $('#lMsg');
      var before = prevCorrect(lv.student, lv.kind);
      var err = addEntry(cls, lv.student, lv.kind, U.today(), r, er);
      if (err) { m.textContent = err; return; }
      var name = cls.students.filter(function (x) { return x.id === lv.student; })[0].name;
      renderLog(); $('#lMsg').textContent = 'Saved for ' + name + ': ' + (r - er) + ' correct. ' + trendWords(r - er, before);
      resetTimer(); $('#lReached').focus();
    });
  }

  /* ---------- Backup reminder ---------- */
  function daysSince(iso) { return Math.floor((new Date(U.today() + 'T00:00:00') - new Date(iso + 'T00:00:00')) / 86400000); }
  function hasData() { return S.classes.length > 0 || S.entries.length > 0; }
  function backupDue() {
    if (!hasData()) return 0;
    var base = S.meta.lastBackup || S.meta.since; if (!base) return 0;
    if (S.meta.snooze && S.meta.snooze >= U.today()) return 0;
    var n = daysSince(base); return n >= 30 ? n : 0;
  }
  function renderNudge() {
    var el = $('#nudge'), n = backupDue();
    el.hidden = !n;
    if (!n) return;
    el.innerHTML = '<p>' + (S.meta.lastBackup ? 'It has been ' + n + ' days since your last backup.' : 'You have not backed up yet.') +
      ' Classes and scores live only on this device.</p><div class="row"><button type="button" class="btn primary small" id="nudgeNow">Back up now</button>' +
      '<button type="button" class="btn small" id="nudgeLater">Remind me in a week</button></div>';
  }
  function downloadBackup() {
    download('tallymark-backup-' + U.today() + '.json', JSON.stringify({ v: 1, classes: S.classes, entries: S.entries, goals: S.goals, setups: S.setups }, null, 1), 'application/json');
    S.meta.lastBackup = U.today(); delete S.meta.snooze; save(); renderNudge();
    var m = $('#dataMsg'); if (m) m.textContent = 'Backup downloaded.';
    var lb = $('#lastBackup'); if (lb) lb.textContent = 'Last backup: ' + U.prettyFull(S.meta.lastBackup) + '.';
  }
  function wireNudge() {
    $('#nudge').addEventListener('click', function (e) {
      if (e.target.id === 'nudgeNow') downloadBackup();
      else if (e.target.id === 'nudgeLater') {
        var d = new Date(); d.setDate(d.getDate() + 7);
        S.meta.snooze = U.iso(d); save(); renderNudge();
      }
    });
    $('#welcomeOk').addEventListener('click', function () { S.meta.welcomed = true; save(); $('#welcome').hidden = true; });
  }

  /* ---------- Classes view ---------- */
  function renderClasses() {
    if (!editClassId || !getClass(editClassId)) editClassId = (activeClass() || {}).id || null;
    var list = '<h2>Classes</h2>';
    S.classes.forEach(function (c) {
      list += '<button type="button" class="cls-item" data-cls="' + c.id + '"' + (c.id === editClassId ? ' aria-current="true"' : '') + '><span>' + esc(c.name || 'Untitled') + '</span><small>' + c.students.length + '</small></button>';
    });
    list += '<div class="row"><label class="field" for="newClass">New class<input type="text" id="newClass" maxlength="40" placeholder="Room 12"></label><button type="button" class="btn" id="addClass">Add</button></div>';
    $('#classList').innerHTML = list;

    var c = getClass(editClassId), ed = $('#classEditor');
    if (!c) { ed.innerHTML = '<h2>No classes yet</h2><p class="muted">Add a class on the left, then list your students. You can print their names on the sheets and track their scores.</p>'; return; }
    var h = '<h2>' + esc(c.name || 'Untitled') + '</h2>' +
      '<label class="field" for="clsName">Class name<input type="text" id="clsName" maxlength="40" value="' + esc(c.name) + '"></label>' +
      '<div class="stu-list" id="stuList">';
    c.students.forEach(function (s) {
      h += '<div class="stu-row"><input type="text" data-sid="' + s.id + '" maxlength="40" value="' + esc(s.name) + '" aria-label="Student name"><button type="button" class="x" data-del="' + s.id + '" aria-label="Remove ' + esc(s.name) + '">Remove</button></div>';
    });
    h += '</div>' +
      '<div class="row"><label class="field" for="newStu">Add a student<input type="text" id="newStu" maxlength="40" placeholder="First name and initial"></label><button type="button" class="btn" id="addStu">Add</button></div>' +
      '<label class="field" for="bulk">Or paste a list <span class="sub">(one name per line)</span><textarea id="bulk" rows="4" spellcheck="false"></textarea></label>' +
      '<div class="row"><button type="button" class="btn" id="addBulk">Add pasted names</button><button type="button" class="btn primary" id="useClass">Make sheets for this class</button></div>' +
      '<p class="msg" id="clsMsg"></p>' +
      '<div class="row"><button type="button" class="btn danger" id="delClass">Delete this class</button></div>';
    ed.innerHTML = h;
  }

  function wireClasses() {
    $('#classList').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cls]');
      if (b) { editClassId = b.getAttribute('data-cls'); P.classId = editClassId; save(); renderClasses(); renderClassSelect(); return; }
      if (e.target.id === 'addClass') addClass();
    });
    $('#classList').addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'newClass') { e.preventDefault(); addClass(); } });
    function addClass() {
      var name = $('#newClass').value.trim() || 'My class';
      var c = { id: U.uid(), name: name, students: [] };
      S.classes.push(c); editClassId = c.id; P.classId = c.id; save(); renderClasses(); renderClassSelect();
    }
    var ed = $('#classEditor');
    ed.addEventListener('input', function (e) {
      var c = getClass(editClassId); if (!c) return;
      if (e.target.id === 'clsName') { c.name = e.target.value; save(); var item = $('[data-cls="' + c.id + '"] span'); if (item) item.textContent = c.name || 'Untitled'; renderClassSelect(); }
      else if (e.target.hasAttribute('data-sid')) {
        var s = c.students.filter(function (x) { return x.id === e.target.getAttribute('data-sid'); })[0];
        if (s) { s.name = e.target.value; save(); }
      }
    });
    ed.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'newStu') { e.preventDefault(); addStudents([e.target.value]); } });
    ed.addEventListener('click', function (e) {
      var c = getClass(editClassId); if (!c) return;
      var t = e.target;
      if (t.hasAttribute('data-del')) {
        var id = t.getAttribute('data-del');
        c.students = c.students.filter(function (s) { return s.id !== id; }); save(); renderClasses(); renderClassSelect();
      } else if (t.id === 'addStu') addStudents([$('#newStu').value]);
      else if (t.id === 'addBulk') addStudents($('#bulk').value.split(/\r?\n/));
      else if (t.id === 'useClass') { P.classId = c.id; save(); location.hash = '#make'; }
      else if (t.id === 'delClass') {
        if (!t.classList.contains('armed')) { t.classList.add('armed'); t.textContent = 'Click again to delete the class and its scores'; return; }
        S.classes = S.classes.filter(function (x) { return x.id !== c.id; });
        S.entries = S.entries.filter(function (x) { return x.classId !== c.id; });
        if (P.classId === c.id) P.classId = '';
        editClassId = null; save(); renderClasses(); renderClassSelect();
      }
    });
    function addStudents(names) {
      var c = getClass(editClassId); if (!c) return;
      var n = 0;
      names.forEach(function (nm) { nm = nm.trim().slice(0, 40); if (nm) { c.students.push({ id: U.uid(), name: nm }); n++; } });
      save(); renderClasses(); renderClassSelect();
      var m = $('#clsMsg'); if (m) m.textContent = n ? 'Added ' + n + (n === 1 ? ' student.' : ' students.') : '';
      var f = $('#newStu'); if (f) f.focus();
    }
  }

  /* ---------- Progress view ---------- */
  var pv = { student: '', kind: '' };

  function kindOptions(sel) {
    var c = ctx();
    return TM.GROUPS.map(function (g) {
      return '<optgroup label="' + esc(g.label) + '">' + TM.SETS.filter(function (k) { return k.group === g.id; }).map(function (k) {
        return '<option value="' + k.id + '"' + (k.id === sel ? ' selected' : '') + '>' + esc(TM.kindShort(k, c)) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');
  }

  function renderProgress() {
    var body = $('#progressBody'), cls = activeClass();
    if (!cls || !cls.students.length) {
      body.innerHTML = '<div class="panel"><h2>Add students first</h2><p class="muted">Scores are saved for each child, so start by listing your class.</p><div class="row"><a class="btn primary" href="#class" style="text-decoration:none">Go to Classes</a></div></div>';
      return;
    }
    if (!cls.students.some(function (s) { return s.id === pv.student; })) pv.student = cls.students[0].id;
    if (!pv.kind || !TM.kindById(pv.kind)) pv.kind = P.kinds[0] || 'upper';
    var stuOpts = cls.students.map(function (s) { return '<option value="' + s.id + '"' + (s.id === pv.student ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('');
    var classOpts = S.classes.map(function (c) { return '<option value="' + c.id + '"' + (c.id === cls.id ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('');
    var mine = S.entries.filter(function (e) { return e.studentId === pv.student && e.kind === pv.kind; }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    var goal = S.goals[pv.kind] || '';

    var left = '<div class="panel"><h2>Log a score</h2>' +
      '<label class="field" for="pClass">Class<select id="pClass">' + classOpts + '</select></label>' +
      '<label class="field" for="pStu">Student<select id="pStu">' + stuOpts + '</select></label>' +
      '<label class="field" for="pKind">Sheet<select id="pKind">' + kindOptions(pv.kind) + '</select></label>' +
      '<label class="field" for="pDate">Date<input type="date" id="pDate" value="' + U.today() + '"></label>' +
      '<div class="row"><label class="field" for="pReached">Reached<input type="number" id="pReached" min="0" max="999" inputmode="numeric"></label>' +
      '<label class="field" for="pErrors">Errors<input type="number" id="pErrors" min="0" max="999" value="0" inputmode="numeric"></label></div>' +
      '<p class="calc" id="pCalc" aria-live="polite">Correct: </p>' +
      '<button type="button" class="btn primary" id="pAdd">Add score</button><p class="msg" id="pMsg" role="status"></p></div>';

    var right = '<div class="panel chartbox"><h2>' + esc(cls.students.filter(function (s) { return s.id === pv.student; })[0].name) + ': ' + esc(TM.kindShort(TM.kindById(pv.kind), ctx())) + '</h2>';
    if (mine.length) {
      right += TM.chart(mine.map(function (e) { return { date: e.date, value: e.correct }; }), goal ? +goal : null, 'Correct per minute');
    } else {
      right += '<div class="empty">No scores yet for this sheet. Log the first one on the left.</div>';
    }
    if (mine.length) right += '<p class="trend">' + trendSummary(mine, goal) + '</p>';
    right += '<div class="row"><label class="field" for="pGoal">Goal, correct per minute <span class="sub">(optional)</span><input type="number" id="pGoal" min="0" max="999" value="' + esc(goal) + '" inputmode="numeric"></label></div>';
    if (mine.length) {
      right += '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Reached</th><th>Errors</th><th>Correct</th><th></th></tr></thead><tbody>' +
        mine.slice().reverse().map(function (e) {
          return '<tr><td>' + U.prettyFull(e.date) + '</td><td class="n">' + e.reached + '</td><td class="n">' + e.errors + '</td><td class="n"><strong>' + e.correct + '</strong></td><td><button type="button" class="x" data-del-entry="' + e.id + '" aria-label="Delete score from ' + U.prettyFull(e.date) + '">Delete</button></td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    right += '</div>';

    var overview = classOverview(cls);
    var tools = '<div class="panel"><h2>Your data</h2><p class="muted" style="margin:0">Saved only in this browser. Back it up if you use another computer or clear your browsing data.</p>' +
      '<p class="muted" id="lastBackup" style="margin:0">' + (S.meta.lastBackup ? 'Last backup: ' + U.prettyFull(S.meta.lastBackup) + '.' : 'You have not made a backup yet.') + '</p>' +
      '<div class="row"><button type="button" class="btn" id="expJson">Download backup</button><button type="button" class="btn" id="expCsv">Download scores as CSV</button>' +
      '<label class="btn" for="impFile" style="cursor:pointer">Restore from backup</label><input type="file" id="impFile" accept=".json,application/json" hidden>' +
      '<button type="button" class="btn danger" id="wipe">Erase everything</button></div><p class="msg" id="dataMsg" role="status"></p></div>';
    body.innerHTML = '<div class="pgrid">' + left + right + '</div><div style="height:20px"></div>' + overview + '<div style="height:20px"></div>' + tools;
    updateCalc();
  }

  function trendSummary(mine, goal) {
    var last = mine[mine.length - 1].correct, best = 0, parts = [];
    mine.forEach(function (e) { if (e.correct > best) best = e.correct; });
    parts.push('<strong>Latest: ' + last + ' correct.</strong>');
    if (mine.length > 1) parts.push(trendWords(last, mine[mine.length - 2].correct));
    if (mine.length > 2) { var d = last - mine[0].correct; parts.push(d > 0 ? 'Up ' + d + ' since the first score.' : d < 0 ? 'Down ' + (-d) + ' since the first score.' : 'Level with the first score.'); }
    parts.push('Best: ' + best + '.');
    if (goal) parts.push(last >= goal ? 'Goal of ' + goal + ' reached.' : (goal - last) + ' to go to reach the goal of ' + goal + '.');
    return parts.join(' ');
  }

  function classOverview(cls) {
    var used = TM.KINDS.filter(function (k) { return S.entries.some(function (e) { return e.classId === cls.id && e.kind === k.id; }); });
    if (!used.length) return '';
    var c = ctx();
    var h = '<div class="panel"><h2>' + esc(cls.name) + ': latest scores</h2><div class="table-wrap"><table><thead><tr><th>Student</th>' +
      used.map(function (k) { return '<th>' + esc(TM.kindShort(k, c)) + '</th>'; }).join('') + '</tr></thead><tbody>';
    cls.students.forEach(function (s) {
      h += '<tr><td>' + esc(s.name) + '</td>';
      used.forEach(function (k) {
        var e = S.entries.filter(function (x) { return x.studentId === s.id && x.kind === k.id; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
        if (!e.length) { h += '<td class="muted">-</td>'; return; }
        var d = e.length > 1 ? e[0].correct - e[1].correct : null;
        h += '<td class="n"><strong>' + e[0].correct + '</strong>' + (d === null ? '' : ' <span class="' + (d >= 0 ? 'ok' : 'muted') + '">' + (d > 0 ? '+' : '') + d + '</span>') + '</td>';
      });
      h += '</tr>';
    });
    return h + '</tbody></table></div></div>';
  }

  function updateCalc() {
    var r = $('#pReached'), e = $('#pErrors'), out = $('#pCalc'); if (!r) return;
    var reached = parseInt(r.value, 10), errs = parseInt(e.value, 10) || 0;
    out.textContent = isNaN(reached) ? 'Correct: ' : 'Correct: ' + Math.max(0, reached - errs);
  }

  function download(name, text, type) {
    var url = URL.createObjectURL(new Blob([text], { type: type }));
    var a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 500);
  }

  function wireProgress() {
    var body = $('#progressBody');
    body.addEventListener('change', function (e) {
      var t = e.target;
      if (t.id === 'pClass') { P.classId = t.value; save(); renderProgress(); renderClassSelect(); }
      else if (t.id === 'pStu') { pv.student = t.value; renderProgress(); }
      else if (t.id === 'pKind') { pv.kind = t.value; renderProgress(); }
      else if (t.id === 'pGoal') { var g = parseInt(t.value, 10); if (g > 0) S.goals[pv.kind] = g; else delete S.goals[pv.kind]; save(); renderProgress(); }
      else if (t.id === 'impFile' && t.files[0]) importBackup(t.files[0]);
    });
    body.addEventListener('input', function (e) { if (e.target.id === 'pReached' || e.target.id === 'pErrors') updateCalc(); });
    body.addEventListener('click', function (e) {
      var t = e.target;
      if (t.id === 'pAdd') {
        var reached = parseInt($('#pReached').value, 10), errs = parseInt($('#pErrors').value, 10) || 0, date = $('#pDate').value || U.today();
        var cls = activeClass(), before = prevCorrect(pv.student, pv.kind);
        var err = addEntry(cls, pv.student, pv.kind, date, reached, errs);
        if (err) { $('#pMsg').textContent = err; return; }
        renderProgress();
        var m = $('#pMsg'); if (m) m.textContent = 'Saved: ' + (reached - errs) + ' correct. ' + trendWords(reached - errs, before);
        var r = $('#pReached'); if (r) r.focus();
      } else if (t.hasAttribute('data-del-entry')) {
        var id = t.getAttribute('data-del-entry'); S.entries = S.entries.filter(function (x) { return x.id !== id; }); save(); renderProgress();
      } else if (t.id === 'expJson') {
        downloadBackup();
      } else if (t.id === 'expCsv') {
        var c = ctx(), rows = [['Date', 'Class', 'Student', 'Sheet', 'Reached', 'Errors', 'Correct']];
        S.entries.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; }).forEach(function (e) {
          var cl = getClass(e.classId), st = null;
          if (cl) st = cl.students.filter(function (s) { return s.id === e.studentId; })[0];
          rows.push([e.date, cl ? cl.name : '', st ? st.name : '', TM.kindShort(TM.kindById(e.kind) || { id: '', group: '', label: e.kind }, c), e.reached, e.errors, e.correct]);
        });
        download('tallymark-scores.csv', rows.map(function (r) { return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(','); }).join('\n'), 'text/csv');
      } else if (t.id === 'wipe') {
        if (!t.classList.contains('armed')) { t.classList.add('armed'); t.textContent = 'Click again to erase all classes and scores'; return; }
        S.classes = []; S.entries = []; S.goals = {}; P.classId = ''; editClassId = null; save(); renderProgress(); renderClassSelect();
      }
    });
  }

  function importBackup(file) {
    var rd = new FileReader();
    rd.onload = function () {
      var msg = $('#dataMsg');
      try {
        var o = JSON.parse(rd.result), nc = 0, ne = 0;
        (o.classes || []).forEach(function (c) { if (c && c.id && Array.isArray(c.students) && !getClass(c.id)) { S.classes.push(c); nc++; } });
        var have = {}; S.entries.forEach(function (e) { have[e.id] = 1; });
        (o.entries || []).forEach(function (e) { if (e && e.id && !have[e.id]) { S.entries.push(e); ne++; } });
        var haveS = {}; S.setups.forEach(function (u) { haveS[u.id] = 1; });
        (o.setups || []).forEach(function (u) { if (u && u.id && u.name && u.data && !haveS[u.id]) S.setups.push(u); });
        Object.keys(o.goals || {}).forEach(function (k) { if (!S.goals[k]) S.goals[k] = o.goals[k]; });
        save(); renderProgress(); renderClassSelect();
        var m2 = $('#dataMsg'); if (m2) m2.textContent = 'Restored ' + nc + ' classes and ' + ne + ' scores.';
      } catch (err) { if (msg) msg.textContent = 'That file is not a Tallymark backup.'; }
    };
    rd.readAsText(file);
  }

  /* ---------- Routing ---------- */
  function route() {
    var tab = (location.hash || '#make').replace('#', '');
    if (['make', 'class', 'progress', 'help'].indexOf(tab) < 0) tab = 'make';
    $$('.view').forEach(function (v) { v.hidden = v.getAttribute('data-view') !== tab; });
    $$('.tabs a').forEach(function (a) { if (a.getAttribute('data-tab') === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    $('#welcome').hidden = !(tab === 'make' && !S.meta.welcomed);
    renderNudge();
    if (tab === 'make') { syncControls(); updateMake(); if (!$('#timerPanel').hidden) renderLog(); }
    if (tab === 'class') renderClasses();
    if (tab === 'progress') renderProgress();
    window.scrollTo(0, 0);
  }

  /* ---------- Install and offline ---------- */
  var installEvt = null, installBtn = $('#installBtn');
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); installEvt = e; installBtn.hidden = false; });
  installBtn.addEventListener('click', function () {
    if (!installEvt) return;
    installEvt.prompt();
    installEvt.userChoice.then(function () { installEvt = null; installBtn.hidden = true; });
  });
  window.addEventListener('appinstalled', function () { installBtn.hidden = true; });
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  wireMake(); wireSetups(); wireTimer(); wireNudge(); wireClasses(); wireProgress(); showClock();
  window.addEventListener('hashchange', route);
  route();
  if (!TM.store.ok) { var n = document.createElement('p'); n.className = 'note'; n.textContent = 'This browser is blocking saved data, so classes and scores will not be kept after you close the page.'; $('main').prepend(n); }
})();
