const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
const { sumArray, pluck } = require('../utils')

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });
  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 4})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('function sumArray', () => {
    const arr = [1, 2, 3, 4]
    it('si encuentra la suma retorna true', () => {
      expect(sumArray(arr, 5)).toBe(true)
    })
    it('si no encuentra la suma retorna false', () => {
      expect(sumArray(arr, 85)).toBe(false)
    })
    it('si no le paso un array retorna error', () => {
      expect(() => sumArray(1, 85)).toThrow(TypeError)
    })
    it('no deberia sumar 2 veces el mismo número', () => {
      expect(sumArray(arr, 2)).toBe(false)
    })
  });

  describe('POST /sumArray', () => {
    it('si retorna 400 no devuelve informacion', () => agent.post('/sumArray').expect(400));
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    it('returns true if the sum of one of the numbers from the array is equal to the number', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
  });

  describe('POST /numString', () => {
    it('responds with 200', () => agent.post('/numString').send({word: 'hola'}).expect(200));
    it('si mando hola retorna 4', () =>
      agent.post('/numString')
        .send({word: 'hola'})
        .then((res) => {
          expect(res.body.result).toEqual(4);
      }));
  });

  describe('function pluck', () => {
    const arr = [{nombre: 'fede', apellido: 'panella'}, {nombre: 'fran', apellido: 'etchevery'}]
    it('responds with 200', () => agent.post('/pluck').send({array: arr}).expect(200));

    it('retorna un array con solo los nombres', () => {
      expect(pluck(arr, 'nombre')).toEqual(['fede', 'fran'])
    })
  });

  describe('POST /pluck', () => {
    const arr = [{nombre: 'fede', apellido: 'panella'}, {nombre: 'fran', apellido: 'etchevery'}]
    it('responds with 200', () => agent.post('/pluck').send({array: arr, prop: 'nombre'}).expect(200));
    it('si le mando el array me devuelve los nombres', () =>
      agent.post('/pluck')
        .send({array: arr})
        .then((res) => {
          expect(res.body.result).toEqual(['fede', 'fran']);
      }));
  });

});

