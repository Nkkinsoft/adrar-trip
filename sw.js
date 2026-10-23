/* Adrar Voyages — service worker (offline support for GitHub Pages)
   Pages: network-first, falling back to cache, then an offline page.
   Assets: stale-while-revalidate, so updates arrive on the next visit. */
const CACHE_NAME = 'adrar-v8';
const BASE = '/adrar-trip/';
const PRECACHE = [
  BASE + 'css/design-system.css?v=8',
  BASE + 'css/refinements.css?v=8',
  BASE + 'css/enhancements.css?v=8',
  BASE + 'assets/icons/logo.svg',
  BASE + 'assets/images/sahara-640.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE)).catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('adrar-') && k !== CACHE_NAME).map(k => caches.delete(k)));
  await self.clients.claim();
})()));

const offlinePage = () => new Response(
  '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>You are offline — Adrar Voyages</title>' +
  '<body style="font-family:system-ui,sans-serif;background:#f5f0e8;color:#2a211b;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px;text-align:center">' +
  '<div><h1 style="font-weight:500">You are offline</h1><p>Reconnect to continue planning your Morocco journey.</p>' +
  '<p><a href="' + BASE + 'en/" style="color:#b44d2d">Try again</a></p></div></body></html>',
  { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
);

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      } catch {
        return (await cache.match(request)) || offlinePage();
      }
    })());
    return;
  }

  if (['style', 'script', 'image', 'font', 'manifest'].includes(request.destination)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      const network = fetch(request).then(response => {
        if (response.ok) cache.put(request, response.clone());
        return response;
      }).catch(() => cached || new Response('', { status: 503 }));
      return cached || network;
    })());
  }
});
