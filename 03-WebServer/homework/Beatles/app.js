var http = require('http');
var fs   = require('fs');

var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo

http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
 //Para crear un response empezamos escribiendo el header
//  res.writeHead(200, { 'Content-Type':'text/plain' }) //Le ponemos el status code y algunos pair-values en el header

    var baseUrl = req.url;


    function checkPath (path) {

      res.writeHead(200, { 'Content-Type':'text/html' }) 
      var html = fs.readFileSync(__dirname +'/beatle.html', 'utf8'); //Codificamos el buffer para que sea una String
      
      var nombre = path; //Esta es la variable con la que vamos a reemplazar el template
      var birthdate = beatles[0].birthdate;
      var image = beatles[0].profilePic;

      html = html.replaceAll('{beatle_name}', nombre); // Usamos el método replace es del objeto String
      html = html.replace('{birthday}', birthdate); // Usamos el método replace es del objeto String
      html = html.replace('{source}', image); // Usamos el método replace es del objeto String

      res.end(html);
    }

    if ( baseUrl === '/api'){
      res.writeHead(200, { 'Content-Type':'application/json' }) 
      res.end(JSON.stringify(beatles));
    } else if ( baseUrl === '/api/john%20lennon'){
      checkPath('John Lennon')
    } else if ( baseUrl === '/api/paul%20mccartney'){
      checkPath('Paul McCartney')
    } else if ( baseUrl === '/api/george%20harrison'){
      checkPath('George Harrison')
    } else if ( baseUrl === '/api/richard%20starkey'){
      checkPath('Richard Starkey')
    } else {
      res.writeHead(404, { 'Content-Type':'text/text' }) 
      res.end('Not found');
    }




}).listen(1337, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]
