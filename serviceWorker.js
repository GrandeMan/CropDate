self.addEventListener("install", (event) => {
  caches.open("assets").then((cache) => {
    cache.addAll([
      "/",
      "/crops",
      "/dist/assets/index-j6J5YLWL.js",
      "/dist/assets/index-kK3Sg4ld.css",
      "/dist/assets/stylis-w40geAFS.js",
      "/dist/assets/client-only-w40geAFS.js",
      "/dist/assets/@babel-w40geAFS.js",
      "/dist/assets/hoist-non-react-statics-XfULGpJH.js",
      "/dist/assets/react-chartjs-2-PX_YQwmI.js",
      "/dist/assets/react-spinners-RMDisIsP.js",
      "/dist/assets/react-is-cHOZVpRJ.js",
      "/dist/assets/react-router-dom-LHZ7fLK0.js",
      "/dist/assets/@emotion-ylvv3bm_.js",
      "/dist/assets/scheduler-iwWdm5Ml.js",
      "/dist/assets/@heroicons-F3PF0HlE.js",
      "/dist/assets/@kurkle-sRCxMDZz.js",
      "/dist/assets/react-router-6JlQKad3.js",
      "/dist/assets/react-m9AI7ZSS.js",
      "/dist/assets/@remix-run-pAEIRRw8.js",
      "/dist/assets/fuse.js-aCsZfKX4.js",
      "/dist/assets/axios-QLjAsgXu.js",
      "/dist/assets/@headlessui-dMw8PWQB.js",
      "/dist/assets/react-dom-EdKxLomR.js",
      "/dist/assets/chart.js-nq-IbXlf.js",
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
