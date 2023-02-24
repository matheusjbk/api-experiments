// Importa a biblioteca "Express".
import express from "express";
// Atribui o conteúdo da biblioteca "Express" na constante "app".
const app = express();

// Obtém configurações do aplicativo.
import dotenv from "dotenv";
const conf = dotenv.config().parsed;

// Importa a biblioteca "MySQL2".
import mysql from "mysql2";
const conn = mysql
  .createPool({
    host: conf.HOSTNAME,
    user: conf.USERNAME,
    password: conf.PASSWORD,
    database: conf.DATABASE,
  })
  .promise();

// Configuração da porta do servidor HTTP.
const port = conf.HTTPPORT || 3000;

// Configuração do nome do aplicativo.
const appName = conf.APP_NAME;

// Objeto que será executado quando ocorrer uma requisição HTTP para a entidade "things".
const thing = {
  getAll: async (req, res) => {
    try {
      // Query que obtém os dados do banco de dados.
      const sql = "SELECT * FROM things WHERE tstatus='on' ORDER BY tdate DESC";
      const [rows] = await conn.query(sql);

      // View de dados.
      res.json({ data: rows });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },

  getOne: async (req, res) => {
    try {
      // ID da requisição.
      const id = req.params.id;

      // Query que obtém um dado do banco de dados.
      const sql =
        "SELECT * FROM things WHERE tid=? AND tstatus='on' ORDER BY tdate DESC";
      const [rows] = await conn.query(sql, [id]);

      // View de dados.
      res.json({ data: rows });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },

  delete: async (req, res) => {
    try {
      // ID da requisição.
      const id = req.params.id;

      // Query que muda o status para "del".
      const sql = "UPDATE things SET tstatus='del' WHERE tid=?";
      const [rows] = await conn.query(sql, [id]);

      // View de feedback.
      res.json({ id: id, status: "success" });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },

  post: async (req, res) => {
    try {
      // Extrai os campos do "req.body".
      const { user, name, photo, description, location, options } = req.body;

      // Query de inserção do registro.
      const sql =
        "INSERT INTO things (tuser, tname, tphoto, tdescription, tlocation, toptions) VALUES (?, ?, ?, ?, ?, ?)";
      const [rows] = await conn.query(sql, [
        user,
        name,
        photo,
        description,
        location,
        options,
      ]);

      // View de feedback.
      res.json({ id: rows.insertId, status: "success" });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },

  put: async (req, res) => {
    try {
      // ID da requisição.
      const id = req.params.id;

      // Extrai os campos do "req.body".
      const { user, name, photo, description, location, options } = req.body;

      // Query que atualiza o registro.
      const sql =
        "UPDATE things SET tuser=?, tname=?, tphoto=?, tdescription=?, tlocation=?, toptions=? WHERE tid=?";
      const [rows] = await conn.query(sql, [
        user,
        name,
        photo,
        description,
        location,
        options,
        id,
      ]);

      // View de feedback.
      res.json({ id: id, status: "success" });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },
};

// Objeto que será executado quando ocorrer uma requisição HTTP para a entidade "users".
const user = {
  getOne: async (req, res) => {
    res.json({ req: req.method, status: "ok" });
  },

  delete: async (req, res) => {
    res.json({ req: req.method, status: "ok" });
  },

  post: async (req, res) => {
    res.json({ req: req.method, status: "ok" });
  },

  put: async (req, res) => {
    res.json({ req: req.method, status: "ok" });
  },
};

// Extrai os dados do cabeçalho da requisição usando "JSON".
import bodyParser from "body-parser";
const bodyParsed = bodyParser.json();

// Rota para GET, retornando todos os registros.
app.get("/", thing.getAll);

// Rota para GET, retornando apenas um registro.
app.get("/:id", thing.getOne);

// Rota para DELETE, atualizando o status para "del".
app.delete("/:id", thing.delete);

// Rota para POST, inserindo um registro na tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
app.post("/", bodyParsed, thing.post);

// Rota para PUT, atualizando um registro da tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
app.put("/:id", bodyParsed, thing.put);

// Rotas para o usuário.
app.get("/user/:id", user.getOne);
app.delete("/user/:id", user.delete);
app.post("/user/", user.post);
app.put("/user/:id", user.put);

// Inicia o servidor, ouvindo a porta no primeiro argumento, e executando uma função no segundo.
app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`);
});
