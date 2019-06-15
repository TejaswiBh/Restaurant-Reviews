let cacheName = "abc";
let urlToBeLoad = [
  //   './',
  // './index.html',
  // './restaurant.html',
  // './css/styles.css'
];
this.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName)
    .then((ca) => {
      ca.addAll(urlToBeLoad)
    })
  )
})

this.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.open(cacheName)
    .then((ac) => {
      return ac.match(e.request)
        .then((result) => {
          return result || fetch(e.request)
            .then((res) => {
              ac.put(e.request, res.clone())
              return res;
            })
        })
    })
  )
})
