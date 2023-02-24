// Carrega a biblioteca "Express".
import express from "express";

// Cria um roteamento "Express".
const router = express.Router();

// Extrai os dados do cabeçalho da requisição usando "JSON".
import bodyParser from "body-parser";
const bodyParsed = bodyParser.json();

// Rota raíz apresenta erro.
router.get("/", (req, res) => {
  res.json({
    status: "error",
    message: "Caminho não encontrado",
  });
});

// Carrega o controller de "things".
import thingController from "../controller/thingController.js";

// Rota para GET, retornando todos os registros.
router.get("/thing/", thingController.getAll);

// Rota para GET, retornando apenas um registro.
router.get("/thing/:id", thingController.getOne);

// Rota para DELETE, atualizando o status para "del".
router.delete("/thing/:id", thingController.delete);

// Rota para POST, inserindo um registro na tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
router.post("/thing/", bodyParsed, thingController.post);

// Rota para PUT, atualizando um registro da tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
router.put("/thing/:id", bodyParsed, thingController.put);

// Carrega o controller de "users".
import userController from "../controller/userController.js";

// Rotas para o usuário.
// Rota para GET, retornando todos os registros.
router.get("/user/", userController.getAll);

// Rota para GET, retornando apenas um registro.
router.get("/user/:id", userController.getOne);

// Rota para DELETE, atualizando o status para "del".
router.delete("/user/:id", userController.delete);

// Rota para POST, inserindo um registro na tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
router.post("/user/", bodyParsed, userController.post);

// Rota para PUT, atualizando um registro da tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
router.put("/user/:id", bodyParsed, userController.put);

export default router;
