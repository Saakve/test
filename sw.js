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

self.addEventListener("fetch",(e) => {
    console.log("E:" + e);
    e.respondWith((async () =>{
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource ${e.request.url}`);
        if(r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource ${e.request.url}`);
        cache.put(e.request, response.clone());
        console.log("RESPONSE: " + response);
        return response
    })());
});