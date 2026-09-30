const CACHE_NAME = 'adrar-v3';

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    event.respondWith(
        caches.match(request).then((cached) => {
            const fetched = fetch(request).then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return response;
            }).catch(() => cached);

            if (cached) {
                return fetched;
            }

            return fetched.catch(() => {
                if (request.destination === 'document') {
                    return caches.match('/index.html');
                }
                return new Response('', { status: 404 });
            });
        })
    );
});
