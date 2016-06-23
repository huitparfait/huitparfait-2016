'use strict';

const CACHE_NAME = "huitparfait-cache";
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache ' + CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
    );
});

this.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    let response;
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                console.log('Answering with cache');
                return response;
            })
            .catch(function (err) {
                console.log('Answering with server', err);
                return fetch(event.request, { credentials: 'include' });
            })
            .then(function (r) {
                console.log('Answering... with !');
                response = r;
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, response);
                });
                return response.clone;
            })
    );
});
