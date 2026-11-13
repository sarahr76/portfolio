/* Tallymark: sample classroom. Fills the app with made-up classes and scores so every page can be seen working.
   Every sample record has an id that starts with "demo-", so it can be removed without touching real data. */
(function () {
  var TM = window.TM = window.TM || {};
  var U = TM.util;

  var CLASSES = [
    { id: 'demo-k', name: 'Room 4, Kindergarten', students: [
      'Ava M.', 'Noah B.', 'Mia L.', 'Liam R.', 'Zoe T.', 'Ethan K.', 'Isla P.', 'Mateo G.', 'Harper J.', 'Leo W.', 'Nora S.', 'Kai D.', 'Ruby F.', 'Omar H.'] },
    { id: 'demo-g1', name: 'Reading group, Grade 1', students: ['Ella C.', 'Jack N.', 'Priya V.', 'Theo A.', 'Maya Q.', 'Finn O.'] }
  ];

  /* [class, sheet id, first score, weekly gain, goal] */
  var PLANS = [
    ['demo-k', 'upper', 14, 2.4, 40],
    ['demo-k', 'lower', 9, 2.2, 35],
    ['demo-k', 'num20', 12, 1.8, 30],
    ['demo-k', 'shapes', 10, 1.6, 25],
    ['demo-g1', 'dolch-pp', 18, 2.6, 45],
    ['demo-g1', 'cvc-a', 15, 2.1, 40]
  ];

  function id(n) { return 'demo-' + n; }

  /* A steady, repeatable "random" number per child and week, so the sample always looks the same. */
  function noise(seed) { var r = U.rng(U.hash(seed)); return r(); }

  function build() {
    var classes = CLASSES.map(function (c) {
      return { id: c.id, name: c.name, students: c.students.map(function (n, i) { return { id: c.id + '-s' + (i + 1), name: n }; }) };
    });
    var entries = [], goals = {}, weeks = 10, mon = U.monday(0);
    PLANS.forEach(function (p) {
      var cls = classes.filter(function (c) { return c.id === p[0]; })[0];
      goals[p[1]] = p[4];
      cls.students.forEach(function (s, si) {
        var skill = 0.7 + noise(s.id) * 0.8;                 /* each child learns at their own pace */
        var start = Math.round(p[2] * (0.6 + noise(s.id + p[1]) * 0.8));
        var skipFrom = si % 5 === 3 ? 6 : 99;                /* a few children missed some weeks */
        for (var w = 0; w < weeks; w++) {
          if (w >= skipFrom && w % 2 === 1) continue;
          var d = new Date(mon); d.setDate(d.getDate() - (weeks - 1 - w) * 7 + (si % 3));
          if (d > new Date()) continue;
          var wobble = Math.round((noise(s.id + p[1] + w) - 0.45) * 6);
          var correct = Math.max(3, Math.round(start + w * p[3] * skill) + wobble);
          var errors = Math.round(noise(p[1] + s.id + 'e' + w) * Math.max(1, 5 - w * 0.35));
          entries.push({ id: id(s.id + '-' + p[1] + '-' + w), classId: cls.id, studentId: s.id, kind: p[1], date: U.iso(d),
            reached: correct + errors, errors: errors, correct: correct });
        }
      });
    });
    var setups = [
      { id: id('setup-1'), name: 'Monday letters, Room 4', data: { format: 'fluency', opts: {}, kinds: ['upper', 'lower'], mode: 'weekly', classId: 'demo-k', studentMode: 'same', names: 'name', student: true, teacher: true, paper: 'letter' } },
      { id: id('setup-2'), name: 'Friday bingo, shapes', data: { format: 'bingo', opts: {}, kinds: ['shapes'], mode: 'weekly', classId: 'demo-k', studentMode: 'same', names: 'name', student: true, teacher: true, paper: 'letter' } },
      { id: id('setup-3'), name: 'Sight words, reading group', data: { format: 'fluency', opts: {}, kinds: ['dolch-pp'], mode: 'weekly', classId: 'demo-g1', studentMode: 'same', names: 'name', student: true, teacher: true, paper: 'letter' } }
    ];
    return { classes: classes, entries: entries, goals: goals, setups: setups };
  }

  function isDemo(x) { return x && typeof x.id === 'string' && x.id.indexOf('demo-') === 0; }

  TM.demo = { build: build, isDemo: isDemo };
})();
