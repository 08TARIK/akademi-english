/* Akademi English — çevrimdışı önbellek. Sayfa: önce ağ (her zaman güncel sürüm), ağ yoksa önbellek.
   Supabase (giriş, senkron, kitaplık) ve diğer sitelerin istekleri önbelleğe alınmaz. */
const SURUM = "202610160119";
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

/* ---- Web Push (uygulama kapalıyken bildirim; sunucu: Supabase Edge Function "push-gonder") ---- */
self.addEventListener("push", e => {
  let v = {};
  try { v = e.data ? e.data.json() : {}; } catch (x) { v = { body: e.data ? e.data.text() : "" }; }
  const baslik = v.title || "Akademi English";
  e.waitUntil(self.registration.showNotification(baslik, {
    body: v.body || "", tag: v.tag || undefined, icon: "ikon-192.png", badge: "ikon-192.png",
    data: { url: v.url || "./" }
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const hedef = new URL((e.notification.data && e.notification.data.url) || "./", self.registration.scope);
  const git = hedef.searchParams.get("git");
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    const var_ = list.find(c => c.url.startsWith(self.registration.scope));
    if (var_) { if (git) var_.postMessage({ git }); return var_.focus(); }     // açık pencere: odakla, sayfaya git
    return self.clients.openWindow(hedef.href);                                 // kapalı: aç (?git=exam ile)
  }));
});
