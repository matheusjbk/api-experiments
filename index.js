// Importa a biblioteca "Express".
import express from "express";
// Atribui o conteúdo da biblioteca "Express" na constante "app".
const app = express();

// Obtém configurações do aplicativo.
import dotenv from "dotenv";
const conf = dotenv.config().parsed;

// Configuração da porta do servidor HTTP.
const port = conf.HTTPPORT || 3000;

// Configuração do nome do aplicativo.
const appName = conf.APP_NAME;

// Ação a ser executada quando ocorre uma requisição HTTP.
const controller = {
  resJson: async (req, res) => {
    // Lista com alguns atributos úteis da requisição HTTP:
    const data = {
      method: req.method,
      url: req.url,
      baseUrl: req.baseUrl,
      query: req.query,
      originalURL: req.originalUrl,
      params: req.params,
      body: req.body,
      headers: req.headers,
    };

    // Envia dados na forma de texto (text/html).
    //res.send(data);

    // Envia dados na forma de JSON.
    res.json(data);
  },
};

// Extrai os dados do cabeçalho da requisição usando "JSON".
import bodyParser from "body-parser";
const bodyParsed = bodyParser.json();

// Acessa o método "get", com o primeiro argumento sendo a rota e o segundo, uma função.
app.get("/", controller.resJson);

app.get("/:id", controller.resJson);

app.delete("/:id", controller.resJson);

app.post("/", bodyParsed, controller.resJson);

app.put("/:id", bodyParsed, controller.resJson);

// Inicia o servidor, ouvindo a porta no primeiro argumento, e executando uma função no segundo.
app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`);
});
