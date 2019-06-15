

const cacheName = "cache-v1";
const precacheResources = [
  "/",
  "index.html",
  "offline.html",
  "next.png",
  "prev.png",
  "disc.png"
];

//Cache static assets on install
self.addEventListener("install", event => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
      .catch(error => {
        throw new Error(error);
      })
  );
});

//Activation handles management of old caches
self.addEventListener("activate", event => {
  console.log("Service worker activate event!");
});

//If cache has request return it, otherwise fetch from network and     ***** store new asset in cache
self.addEventListener("fetch", event => {
  // console.log("Fetch intercepted for:", event.request.url);


  // if (navigator.onLine === false){
  //   return event.respondWith(
  //     fetch(event.request).catch(() => caches.match('offline.html'))
  //   )
  // }


  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        //Cache has response return from cache
        return cachedResponse;
      }
      //Cache doesn't have requested asset, retrieve from network and store in cache
      return fetch(event.request).then(response => {
        //This can be used to                                         ***** store new asset in cache
        //Don't cache socket.io and google maps requests
        // if (!event.request.url.includes("socket.io") || !event.request.url.includes("maps.googleapis.com")) {
        //   caches.open(cacheName).then(cache => {
        //     cache.put(event.request, response.clone());
        //   });
        // }
        return response;
      });
    })
  );
});
