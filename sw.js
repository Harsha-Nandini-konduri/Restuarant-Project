let cache_name = "my-db";
let url_to_be_load = [];   //let url_to_be_load = [./index.html]
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cache_name)
    .then((cache) => {
      cache.addAll(url_to_be_load)
    })
  )
})
this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(cache_name)
    .then((cache) => {
      return cache.match(event.request)
        .then((res) => {
          return res || fetch(event.request)
            .then((res) => {
              cache.put(event.request, res.clone());
              return res
            })
        })
    })
  )
})
