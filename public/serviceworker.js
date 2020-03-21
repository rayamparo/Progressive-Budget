const DATASTORE = 'my-api-cache-v1';
const STATICSTORE = 'my-static-files-v1';

const Files2Cache = [
    '/',
    '/index.html',
    '/index.js',
    '/db.js',
    '/styles.css',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
]

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(STATICSTORE).then(cache => {
            console.log('cache created or opened!');
            return cache.addAll(Files2Cache)
        })
    )
})

self.addEventListener('fetch', function (e) {
    if (e.request.url.includes('/api')) {
        e.respondWith(
            caches.open(DATASTORE).then(cache => {
                return fetch(e.request)
                    .then(response => {
                        console.log(response)
                        if (response.status === 200) {
                            cache.put(e.request.url, response.clone())
                        }
                        return response
                    }).catch(err => {
                        return caches.match(e.request)
                    })
            })
        )
        return
    }
    e.respondWith(
        fetch(e.request).catch(
            function () {
                return caches.match(e.request).then(function (res) {
                    if (res) {
                        return res
                    } else {
                        return caches.match('/')
                    }
                })
            }))
})