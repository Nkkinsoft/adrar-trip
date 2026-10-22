require('fs').writeFileSync('sw.js', `const CACHE_NAME = 'adrar-v5';
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('adrar-') && k !== CACHE_NAME).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    if(request.mode==='navigate') {
      try {const response=await fetch(request);if(response.ok)await cache.put(request,response.clone());return response;}
      catch {return await cache.match(request)||new Response('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>You are offline</title><body><h1>You are offline</h1><p>Reconnect to continue planning your Morocco journey.</p></body></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});}
    }
    const cached=await cache.match(request);
    if(cached)return cached;
    try{const response=await fetch(request);if(response.ok&&['style','script','image','font'].includes(request.destination))await cache.put(request,response.clone());return response;}
    catch{return new Response('',{status:503});}
  })());
});
`);
