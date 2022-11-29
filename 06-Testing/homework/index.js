const express = require('express');
const app = express();
const { sumArray } = require('./utils')

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sum', (req, res) => {
  const { a, b } = req.body;
  res.send({
    result: a + b
  });
});

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body;
  if (!array || !num){
    return res.sendStatus(400);
  }
  const result = sumArray(array, num)
  res.send({
    result
  });
});

app.post('/numString', (req, res) => {
  const { word } = req.body;
  // if (!array || !num){
  //   return req.status(400);
  // }
  const result = word.length;
  res.send({
    result
  });
});

app.post('/pluck', (req, res) => {
  const { arr, prop } = req.body;
  const result = pluck(arr, prop);
  res.send({
    result
  });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
