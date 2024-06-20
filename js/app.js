if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registrado => console.log('Registrado!', registrado))
        .catch(error => console.log('Falló :c', error))
} else {
    console.log('No soporta :C');
}