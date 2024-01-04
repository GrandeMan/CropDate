self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("assets").then((cache) => {
      return cache.addAll([
        "/",
        "/crops",
        "/sw-register.js",
        "https://rsms.me/inter/inter.css",
        ...getAssetFiles(),
      ]);
    }),
  );
});

function getAssetFiles() {
  return new Promise((resolve) => {
    const assetsFiles = [];

    caches.open("assets").then((cache) => {
      cache.keys().then((keys) => {
        keys.forEach((key) => {
          if (key.url.includes("/assets/")) {
            assetsFiles.push(key.url);
          }
        });

        resolve(assetsFiles);
      });
    });
  });
}

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
