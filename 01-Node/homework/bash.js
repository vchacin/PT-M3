//   console.log(process)
//   console.log(process)
//   console.log(process)
//   console.log(Object.keys(process))
  
  /*
  // Output un prompt
  process.stdout.write('prompt > ');
  // El evento stdin 'data' se dispara cuando el user escribe una línea
  process.stdin.on('data', function (data) {
    var cmd = data.toString().trim(); // remueve la nueva línea
    process.stdout.write('You typed: ' + cmd);
    process.stdout.write('\nprompt > ');
  });
  */


const commands = require('./commands/index.js');

/*
const cmd = 'pwd';
commands[cmd]() // la función dentro de la propiedad pwd
*/

const done = function(output){
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' '); // remueve la nueva línea
  var cmd = args.shift();

  if(commands.hasOwnProperty(cmd)) {
    commands[cmd](args, done)
  } else {
    process.stdout.write('Command not found');
  }
  // process.stdout.write('\nprompt > ');
});




// afdjuanjo

// afdjuanjo


