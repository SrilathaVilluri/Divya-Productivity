const CACHE = 'dashboard-v3';
const ASSETS = [
  '/Dashboard/',
  '/Dashboard/index.html'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Network-first for HTML so deployments are always picked up immediately
  if (e.request.mode === 'navigate' || e.request.url.endsWith('index.html') || e.request.url.endsWith('/Dashboard/')) {
    e.respondWith(
      fetch(e.request).then(function(res) {
        var clone = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        return res;
      }).catch(function() {
        return caches.match(e.request) || caches.match('/Dashboard/index.html');
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});

// FIX 4: Handle SET_START_URL message from the app so the SW caches the correct
// hash URL after a fresh Firebase setup (e.g. after finishSetup() runs and
// _updateShareableHash() writes the #fb= fragment into location.hash).
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SET_START_URL' && e.data.hash) {
    var newUrl = '/Dashboard/' + e.data.hash;
    caches.open(CACHE).then(function(c) {
      // Fetch the base HTML and store it under the new hash URL so future
      // navigations to that URL get a cache hit.
      fetch('/Dashboard/index.html').then(function(res) {
        c.put(new Request(newUrl), res);
      }).catch(function() {});
    });
  }
});
