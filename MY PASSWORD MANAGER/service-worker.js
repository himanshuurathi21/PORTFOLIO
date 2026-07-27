const CACHE_NAME = 'password-manager-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'css/styles.css',
  'js/crypto.js',
  'js/database.js',
  'js/auth.js',
  'js/password-generator.js',
  'js/ui.js',
  'js/app.js',
  'icons/icon-192.jpeg',
  'icons/icon-512.jpeg'
];

function _stripQuery(url) {
  const u = new URL(url, location.href);
  return u.origin + u.pathname;
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const cacheKey = _stripQuery(e.request.url);
  e.respondWith(
    caches.match(cacheKey).then((cached) => {
      return cached || fetch(e.request).then((res) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(cacheKey, res.clone());
          return res;
        });
      }).catch(() => cached);
    })
  );
});
