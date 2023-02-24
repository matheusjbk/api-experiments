// Importa a biblioteca "Express".
import express from "express";
// Atribui o conteúdo da biblioteca "Express" na constante "app".
const app = express();

// Obtém as configurações do aplicativo.
import dotenv from "dotenv";
const conf = dotenv.config().parsed;

// Configuração da porta do servidor HTTP.
const port = conf.HTTPPORT || 3000;

// Configuração do nome do aplicativo.
import appRouter from "./controller/routes";

// Inicia o monitoramento das rotas.
app.use(appRouter);

// Inicia o servidor, ouvindo a porta no primeiro argumento, e executando uma função no segundo.
app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`);
});
