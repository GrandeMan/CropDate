self.addEventListener("install", (event) => {
  caches.open("assets").then((cache) => {
    cache.addAll([
      "/",
      "/dist/assets/index-kK3Sg4ld.css",
      "/dist/assets/index-X1Ff2pNK.js",
      "/dist/assets/index-X1Ff2pNK.js.map",
      "sw-register.js",
      "https://rsms.me/inter/inter.css",
    ]);
  });
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("assets").then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          .catch((error) => {
            console.log(error);
            throw error;
          });
        return response || fetchPromise;
      });
    }),
  );
});
