/* Akademi English — çevrimdışı önbellek. Sayfa: önce ağ (her zaman güncel sürüm), ağ yoksa önbellek.
   Supabase (giriş, senkron, kitaplık) ve diğer sitelerin istekleri önbelleğe alınmaz. */
const SURUM = "202610092259";
const ONBELLEK = "akademi-" + SURUM;
const TEMEL = ["./", "index.html", "bulut-ayar.js", "gizlilik.html", "manifest.webmanifest", "ikon-192.png", "ikon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(ONBELLEK).then(c => c.addAll(TEMEL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== ONBELLEK).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET") return;
  const ayni = u.origin === location.origin, yazi = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (!ayni && !yazi) return;
  if (yazi) {   // yazı tipleri: önbellek önce
    e.respondWith(caches.match(r).then(h => h || fetch(r).then(y => { const k = y.clone(); caches.open(ONBELLEK).then(c => c.put(r, k)); return y; })));
    return;
  }
  e.respondWith(fetch(r).then(y => { if (y.ok) { const k = y.clone(); caches.open(ONBELLEK).then(c => c.put(r, k)); } return y; })
    .catch(() => caches.match(r).then(h => h || (r.mode === "navigate" ? caches.match("index.html") : Response.error()))));
});
