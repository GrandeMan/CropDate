const assets = [
  "/dist/index.html",
  "/dist/assets/*.css",
  "/dist/assets/*.js",
  "/dist/assets/*.map",
  "sw-register.js",
];

self.addEventListener("install", (event) => {
  caches.open("assets").then((cache) => {
    cache.addAll(assets);
  });
});
