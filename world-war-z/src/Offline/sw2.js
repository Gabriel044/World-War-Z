//este codigo regresa una pagina cuando encuentre un error de carga
//en este caso brb.html, util para cuando no tienes internet 
self.addEventListener("fetch", function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match("brb.html");
      })
    );
  });
  
  self.addEventListener("install", (e) =>{
    e.waitUntil(
      caches.open("mitilichero").then( (cache) =>{
        return cache.add("brb.html");
      })
    );
    });
  