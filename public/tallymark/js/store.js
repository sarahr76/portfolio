/* Tallymark: everything is saved in this browser only (localStorage). */
(function () {
  var TM = window.TM = window.TM || {};
  var KEY = 'tallymark:v1';

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  TM.store = {
    ok: true,
    load: function (def) {
      var out = clone(def);
      try {
        var raw = localStorage.getItem(KEY);
        if (raw) {
          var o = JSON.parse(raw);
          if (o && typeof o === 'object') {
            if (o.prefs) Object.keys(out.prefs).forEach(function (k) { if (o.prefs[k] !== undefined) out.prefs[k] = o.prefs[k]; });
            if (Array.isArray(o.classes)) out.classes = o.classes;
            if (Array.isArray(o.entries)) out.entries = o.entries;
            if (o.goals && typeof o.goals === 'object') out.goals = o.goals;
          }
        }
      } catch (e) { this.ok = false; }
      return out;
    },
    save: function (S) {
      try { localStorage.setItem(KEY, JSON.stringify(S)); this.ok = true; } catch (e) { this.ok = false; }
      return this.ok;
    },
    wipe: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };
})();
