const express = require('express')
const app = express()

const conf = require('dotenv').config().parsed;

// console.log(conf);

const port = conf.HTTPPORT;

// Objeto que será executado quando houver uma requisição.
const thing = {
  getAll: async (req, res) => {
    res.json({"req": req.method, "status": "ok"});
  },

  getOne: async (req, res) => {
    const id = req.params.id;
    res.json({"req": req.method, "id": id, "status": "ok"});
  },

  post: async (req, res) => {
    const id = req.params.id;
    res.json({"req": req.method, "id": id, "body": req.body, "status": "ok"});
  },

  put: async (req, res) => {
    const id = req.params.id;
    res.json({"req": req.method, "id": id, "body": req.body, "status": "ok"});
  },

  delete: async (req, res) => {
    const id = req.params.id;
    res.json({"req": req.method, "id": id, "status": "ok"});
  }
}

// Objeto que trata requisições para o user
const user = {
  getOne: async (req, res) => {
    res.json({"req": req.method, "status": "ok"});
  },

  post: async (req, res) => {
    res.json({"req": req.method, "status": "ok"});
  },

  put: async (req, res) => {
    res.json({"req": req.method, "status": "ok"});
  },

  delete: async (req, res) => {
    res.json({"req": req.method, "status": "ok"});
  }
}

// Recebe os dados do body HTTP e valida em JSON -> POST e PUT.
const bodyParser = require('body-parser').json();

// Rota para GET -> getAll() -> Recebe, por exemplo, todos os registros.
app.get('/', thing.getAll);

// Rota para GET -> get(id) -> Recebe apenas o registro identificando.
app.get('/:id', thing.getOne);

// Rota para DELETE -> delete(id).
app.delete('/:id', thing.delete);

// Rota para POST -> post() -> bodyParser (no hook) é usado para garantir a chegada de um JSON.
app.post('/', bodyParser, thing.post);

// Rota para PUT -> put(id) -> bodyParser (no hook) é usado para garantir a chegada de um JSON.
app.put('/:id', bodyParser, thing.put);

// Rotas para o usuário
app.get('/user/:id', user.getOne);
app.put('/user/:id', user.put);
app.delete('/user/:id', user.delete);

// Inicia o servidor, ouvindo a porta atual e executando uma função.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})