/* Toko Kita – service worker. Naikkan nomor VERSI setiap kali index.html diperbarui. */
const VERSI='tokokita-v3';
const INTI=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSI).then(c=>c.addAll(INTI)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSI).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(VERSI).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return}
 if(u.origin===location.origin||/(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.host)){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(VERSI).then(c=>c.put(r,cp))}return res})))}});
