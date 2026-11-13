/* Tallymark service worker: makes the app work offline.
   Pages and files are fetched fresh when online, and served from the saved copy when offline.
   Change VERSION whenever you add or rename files, so old copies are cleared. */
var VERSION = 'tallymark-v2-12';
var FILES = [
  './',
  'css/styles.css',
  'fonts/andika-latin-400-normal.woff2',
  'fonts/andika-latin-700-normal.woff2',
  'fonts/andika-latin-ext-400-normal.woff2',
  'fonts/andika-latin-ext-700-normal.woff2',
  'fonts/inter-latin-400-normal.woff2',
  'fonts/inter-latin-500-normal.woff2',
  'fonts/inter-latin-600-normal.woff2',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/icon.svg',
  'index.html',
  'js/app.js',
  'js/chart.js',
  'js/data.js',
  'js/demo.js',
  'js/engine.js',
  'js/fonts-data.js',
  'js/formats/bingo.js',
  'js/formats/cards.js',
  'js/formats/fluency.js',
  'js/items.js',
  'js/pdfkit.js',
  'js/store.js',
  'manifest.webmanifest',
  'vendor/jspdf.umd.min.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req).then(function (res) {
    if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (hit) { return hit || caches.match('index.html'); });
  }));
});
