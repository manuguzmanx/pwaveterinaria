const nombreCache = 'apv-v7';

const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];

// Cuando se instala el serviceWorker
self.addEventListener('install', e => {
    console.log('SW Instalado');
    console.log(e);

    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                console.log('Cacheando');
                cache.addAll(archivos);
            })

    );
})

// Activar sl ServiceWorker
self.addEventListener('activate', e => {
    console.log('SW Acivado');

    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== nombreCache)
                        .map(key => caches.delete(key)) //borra los demás
                )
            })
    )
})

// Evento fetch para descargar archivos estáticos
self.addEventListener('fetch', e => {
    console.log('Fetch', e);

    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => (respuestaCache ? respuestaCache : caches.match('/error.html')))
    )
})