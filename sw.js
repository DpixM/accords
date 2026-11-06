/* Hors-ligne : la page est toujours prise sur internet si possible (donc toujours à jour),
   sinon on sert la dernière version gardée. Le lecteur Guitar Pro (alphaTab) est gardé une fois chargé. */
const C='accords-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./icon.png','./manifest.json'])).catch(()=>{}));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.href.includes('alphaTab')){e.respondWith(caches.open(C).then(c=>c.match(r).then(m=>m||fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n;}))));return;}
  if(u.origin===location.origin){e.respondWith(fetch(r).then(n=>{if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));}return n;}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));}
});
