const CACHE_NAME = "baedal-prototype-v53-category-food-images-3";
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css?v=20260927-category-food-images-3",
  "/script.js?v=20260927-category-food-images-3",
  "/asset-map.js?v=20260927-category-food-images-3",
  "/manifest.json?v=20260927-category-food-images-3"
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
