const CACHE = 'dashboard-v4';
// Derive base path dynamically so this SW works at any deployment path (not just /Dashboard/)
const BASE = new URL('./', self.location.href).pathname;
const ASSETS = [BASE, BASE + 'index.html'];

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
  var url = e.request.url;
  // Network-first for HTML so deployments are always picked up immediately
  var isNav = e.request.mode === 'navigate' || url.endsWith('index.html') || url.endsWith(BASE) || url.endsWith(BASE.replace(/\/$/, ''));
  if (isNav) {
    e.respondWith(
      fetch(e.request).then(function(res) {
        var clone = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        return res;
      }).catch(function() {
        return caches.match(e.request) || caches.match(BASE + 'index.html');
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});

self.addEventListener('message', function(e) {
  // CLEAR_AUTH: remove cached entries that may contain stale auth state
  if (e.data && e.data.type === 'CLEAR_AUTH') {
    caches.open(CACHE).then(function(c) {
      c.keys().then(function(keys) {
        keys.forEach(function(req) {
          if (req.url.indexOf('#') !== -1) c.delete(req);
        });
      });
    });
  }
});
