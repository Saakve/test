const cacheName = "OM_V1";
const appShellFiles = [
    "index.html",
    "icon.png",
    "main.js",
    "style.css",
    "manifest.json"
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Instalado");
    console.log(e);
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log("Cacheando todos los archivos");
        await cache.addAll(appShellFiles);
    })());
});
