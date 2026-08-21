const CACHE='alfred-v09';
const ASSETS=['./','./index.html','./styles.css','./app.js','./data.js','./manifest.webmanifest','./assets/alfred-mark.webp','./assets/alfred-main.webp','./assets/alfred-curious.webp','./assets/alfred-doubt.webp','./assets/alfred-idea.webp','./assets/alfred-done.webp','./assets/gsn-logo.webp','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return resp;}).catch(()=>caches.match('./index.html'))));});
