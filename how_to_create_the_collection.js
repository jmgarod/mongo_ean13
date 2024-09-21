// Aquí se explica cómo cargar la colección dentro de mongodb a partir del archivo del repo.

// Dentro del CLI de MongoDB, conocido como mongosh, corres estas dos líneas.
data=require('fs').readFileSync('<ruta archivo eans.txt en tu máquina').toString().split('\n').map(item=>({EAN:item})
db.eans.insertMany(data)

// Las líneas anteriores las podrías unificar en una sola utilizando el siguiente código.
db.eans.insertMany(require('fs').readFileSync('<ruta archivo eans.txt en tu máquina').toString().split('\n').map(item=>({EAN:item}))
