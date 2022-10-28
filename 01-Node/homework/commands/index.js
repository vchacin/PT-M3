var fs = require('fs');
var request = require('request');

module.exports = {
    pwd: function(args, done) { 
        done(Date()); 
    },
    date: function(args, done) {
        done(process.cwd());
    },
    ls: function(args, done) {
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            var out = '';
            files.forEach(function(file) {
                out = out + file + "\n"
            });
            done(out);
        });
    },
    echo: function(args, done){
        done(args.join(' '));
    },
    cat: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            done(data);
        });
    },
    head: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            const lines = data.split("\n").slice(0,9).join("\n");
            done(lines);
        });
    },
    tail: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            const lines = data.split("\n").slice(-10).join("\n");
            done(lines);
        });
    },
    curl: function(url, done){
        request(url[0], function(err, response, body){
            if(err) throw err;
            done(body);
        });
    },
    sort: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if (err) throw err;
            const lines = data.split("\n");
            const sortedLines = lines.sort((a, b) => a.localeCompare(b)).join("\n");
            done(sortedLines);
        });
    },
    wc: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            const lines = data.split("\n");
            var count = lines.length.toString();
            done(count);
        });
    },
    uniq: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if (err) throw err;
            // divido el archivo en lineas
            const lines = data.split("\n");
            // ordeno las lineas por la primera letra / caracter y los uno en un string con salto de linea
            const sortedLines = lines.sort((a, b) => a.localeCompare(b)).join("\n");
            // lo vuelvo a juntar y convierto el string en un array
            const joinedLines = sortedLines.split("\n");
            // sobre el array aplico el metodo Set que elimina elementos repetidos en un array y devuelve un objeto
            // convierto mi objeto set en un string con el spread operator para traerme todas las propiedades y lo convierto en array con los corchetes
            const [...setLines] = new Set(joinedLines);
            const uniqLines = setLines.join("\n");
            done(uniqLines);
        })
    }
}