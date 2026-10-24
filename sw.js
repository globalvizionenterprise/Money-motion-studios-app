// MONEY MOTION STUDIOS - service worker (offline shell)
const CACHE = "money-motion-v4";
const SHELL = [
  "./", "./index.html", "./gallery.html", "./global.html", "./book.html", "./pay.html", "./live.html", "./dashboard.html",
  "./css/style.css", "./js/config.js", "./js/store.js", "./js/logo-data.js", "./js/pwa.js",
  "./manifest.webmanifest", "./icon.svg"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.hostname.endsWith("supabase.co")) return; // live data: network only
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then((r) => {
      const copy = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request).then((m) => m || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then((m) => m || fetch(e.request)));
});
