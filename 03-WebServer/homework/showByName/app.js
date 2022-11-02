var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor


http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
    //Para crear un response empezamos escribiendo el header
   //Le ponemos el status code y algunos pair-values en el header
    var baseUrl = req.url;

    console.log('request----', req.url)

    function checkPath(path) {
        res.writeHead(200, { 'Content-Type':'image/jpeg' }) 
        var image = fs.readFileSync(__dirname +`/images/${path}_doge.jpg`);
        res.end(image);
    }

    if ( baseUrl === '/arcoiris' ) {
        checkPath('arcoiris')
    } else if ( baseUrl === '/badboy' ) {
        checkPath('badboy')
    } else if ( baseUrl === '/code' ) {
        checkPath('code')
    } else if ( baseUrl === '/resaca' ) {
        checkPath('resaca')
    } else if ( baseUrl === '/retrato' ) {
        checkPath('retrato')
    } else if ( baseUrl === '/sexy' ) {
        checkPath('sexy')
    } else {
        res.writeHead(400, { 'Content-Type':'text/text' }) 
        res.end('Not found'); 
    }



    if ( baseUrl === 'retrato' ) checkPath('retrato')
    if ( baseUrl === 'sexy' ) checkPath('sexy')

    

    
   
}).listen(1330, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor
   