// Importa a biblioteca "Express".
const express = require('express');
// Armazena o conteúdo da biblioteca "Express" na constante "app".
const app = express();
// Importa a biblioteca "dotenv".
const conf = require('dotenv').config().parsed;
// console.log(conf);

// Importa a biblioteca "MySQL".
const mysql = require('mysql2');

// Faz a conexão com o servidor.
const conn = mysql.createPool({
    host: conf.HOSTNAME,
    user: conf.USERNAME,
    database: conf.DATABASE,
    password: conf.PASSWORD,
    port: conf.PASSWORD
}).promise();

const port = conf.HTTPPORT;

// Objeto que será executado quando houver uma requisição.
const thing = {
  getAll: async (req, res) => {
    try {
        // Query que obtém os dados do banco de dados.
        const sql = "SELECT *, DATE_FORMAT(tdate, '%d/%m/%Y às %H:%i') AS tdatebr FROM things WHERE tstatus = 'on' ORDER BY tdate DESC";
        const [rows] = await conn.query(sql);

        // View de dados.
        res.json({data: rows});
    } catch (error) {
        //Exibe mensagem de erro.
        res.json({status: "error", message: error});
    }
  },

  getOne: async (req, res) => {
    try {
        // ID da requisição.
        const id = req.params.id;

        // Query que obtém um dado do banco de dados.
        const sql = "SELECT *, DATE_FORMAT(tdate, '%d/%m/%Y às %H:%i') AS tdatebr FROM things WHERE tid = ? AND tstatus = 'on' ORDER BY tdate DESC";
        const [rows] = await conn.query(sql, [id]);

        // View de dados.
        res.json({data: rows});        
    } catch (error) {
        //Exibe mensagem de erro.
        res.json({status: "error", message: error});
    }
  },

  post: async (req, res) => {
    try {
        // Extrai os campos do req.body.
        const {user, name, photo, description, location, options} = req.body;

        // Query de inserção do registro.
        const sql = "INSERT INTO things (tuser, tname, tphoto, tdescription, tlocation, toptions) VALUES (?, ?, ?, ?, ?, ?)";
        const [rows] = await conn.query(sql, [user, name, photo, description, location, options]);

        // View de dados.
        res.json({id: rows.insertId, status: "success"});
    } catch (error) {
        //Exibe mensagem de erro.
        res.json({status: "error", message: error});
    }
  },

  put: async (req, res) => {
    try {
        // ID da requisição.
        const id = req.params.id;

        // Extrai os campos do req.body.
        const {user, name, photo, description, location, options} = req.body;

        // Query que atualiza o registro.
        const sql = "UPDATE things SET tuser = ?, tname = ?, tphoto = ?, tdescription = ?, tlocation = ?, toptions = ? WHERE tid = ?";
        const [rows] = await conn.query(sql, [user, name, photo, description, location, options, id]);

        // View de feedback.
        res.json({id: id, status: "success"});
    } catch (error) {
        //Exibe mensagem de erro.
        res.json({status: "error", message: error});
    }
  },

  delete: async (req, res) => {
    try {
        // ID da requisição.
        const id = req.params.id;

        //Query que muda o status para "del".
        const sql = "UPDATE things SET tstatus = 'del' WHERE tid = ?";
        const [rows] = await conn.query(sql, [id]);

        // View de feedback.
        res.json({id: id, status: "success"});
    } catch (error) {
        //Exibe mensagem de erro.
        res.json({status: "error", message: error});
    }
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
app.post('/user/', user.post);
app.put('/user/:id', user.put);
app.delete('/user/:id', user.delete);

// Inicia o servidor, ouvindo a porta atual e executando uma função.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})