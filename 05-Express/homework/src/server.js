// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

let nextId = 1;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();

// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

/*
server.get('/indice', function(req, res){ //Ruta para un GET a /
    res.send('Hola mundo!'); // response "Hola mundo!" en la pagina principal
});

server.get('/otro', function(req, res){
    var obj = {
      saludo: 'Hola mundo!'
    }
    res.json( obj );
});


server.get('/', function(req, res){
    var obj = {
     saludo: 'Hola' + req.body.name,
   }
   res.json( obj );
});
*/

server.post('/posts', function(req, res){
    const { author, title, contents } = req.body;

    if (!author || !title || !contents ) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }

    const newPost = {
        id: nextId,
        author,
        title,
        contents
        // contents = contents
    }

    posts.push(newPost);
    nextId++;
    return res.status(STATUS_OK).json(newPost);
});

server.post('/posts/author/:author', function(req, res){
    const { title, contents } = req.body;
    const { author } = req.params;

    if (!author || !title || !contents ) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }

    const newPost = {
        id: nextId,
        author,
        title,
        contents
        // contents = contents
    }

    posts.push(newPost);
    nextId++;
    return res.status(STATUS_OK).json(newPost);
});


server.get('/posts', function(req, res){

    // Obtengo el termino por query
    const { term } = req.query;

    if (term){
        const newList = posts.filter(post => post.title.includes(term) || post.contents.includes(term));
        return res.status(STATUS_OK).json(newList);
    }

    return res.status(STATUS_OK).json(posts);
});

server.get('/posts/:author', function(req, res){
    const { author } = req.params;

    const newList = posts.filter(post => post.author === author);

    if (newList.length === 0){
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    } 
    
    return res.status(STATUS_OK).json(newList);
});

server.get('/posts/:author/:title', function(req, res){
    const { author, title } = req.params;

    const newList = posts.filter(post => post.author === author && post.title === title);

    if (newList.length === 0){
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    } 
    
    return res.status(STATUS_OK).json(newList);
});

server.put('/posts', function(req, res){

    const { id, title, contents } = req.body;

    if (!id || !title || !contents ) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }

    const postId = posts.find(post => post.id === id);

    if (!postId){
        return res.status(STATUS_USER_ERROR).json({error: "El id indicado no corresponde con un Post existente"})
    }

    // Sobreescribo el valor de la propiedad

    postId.title = title;
    postId.contents = contents;

    return res.status(STATUS_OK).json(postId);

});

server.delete('/posts', function(req, res){
    const { id } = req.body;

    if (!id){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }

    const postId = posts.find(post => post.id === id);

    if (!postId){
        return res.status(STATUS_USER_ERROR).json({error: "El id indicado no corresponde con un Post existente"})
    }

    posts = posts.filter(post => post.id !== id);

    return res.status(STATUS_OK).json({ success: true });
});

server.delete('/author', function(req, res){
    const { author } = req.body;

    if (!author){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }

    const postauthor = posts.filter(post => post.author === author);

    if (!postauthor.length){
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }

    posts = posts.filter(post => post.author !== author);

    return res.status(STATUS_OK).json(postauthor);
});

module.exports = { posts, server };
