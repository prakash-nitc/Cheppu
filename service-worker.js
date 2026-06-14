// Cheppu service worker.
// Strategy: network-first for the HTML page (so a new version shows up as soon as
// you're online), stale-while-revalidate for assets (fast, and self-refreshing),
// with a full offline fallback. Bumping CACHE forces a clean re-cache.
const CACHE = "cheppu-v10";
const ASSETS = [
  "./", "./index.html", "./manifest.json",
  "./icons/favicon.svg", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;                  // leave POSTs (e.g. Groq) untouched
  const url = new URL(req.url);
  if (url.hostname.includes("api.groq.com")) return; // never touch the API

  // The HTML page: network-first, fall back to cache when offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put("./index.html", copy));
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }

  // Everything else (icons, fonts, etc.): serve from cache fast, refresh in background.
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
