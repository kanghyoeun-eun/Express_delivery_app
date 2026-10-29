const CACHE_NAME = "baedal-prototype-v71-third-store-oct29";
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css?v=20260927-figma-home-layout",
  "/script.js?v=20261029-onnuri",
  "/asset-map.js?v=20260927-figma-home-layout",
  "/manifest.json?v=20260927-figma-home-layout",
  "/home-update.css?v=20261029-badge",
  "/home-update.js?v=20261029-third-store",
  "/category-update.css?v=20261028-category",
  "/store-update.css?v=20261028-store",
  "/pickup-update.css?v=20261029-pickup",
  "/map-update.css?v=20261029-map",
  "/map-update.js?v=20261029-map",
  "/my-update.css?v=20261029-my",
  "/my-update.js?v=20261029-book",
  "/couponbook-update.css?v=20261029-book",
  "/couponbook-update.js?v=20261029-book",
  "/currency-guide.css?v=20261029-guide",
  "/currency-guide.js?v=20261029-guide",
  "/onnuri-update.css?v=20261029-home-free",
  "/onnuri-update.js?v=20261029-home-free",
  "/assets/vendor/leaflet/leaflet.css",
  "/assets/vendor/leaflet/leaflet.js"
];

function shouldUseNetworkFirst(request) {
  const url = new URL(request.url);
  return request.mode === "navigate" || ["document", "script", "style"].includes(request.destination) || url.pathname.endsWith(".html");
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (shouldUseNetworkFirst(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
