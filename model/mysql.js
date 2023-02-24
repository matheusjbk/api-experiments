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
    port: conf.HOSTPORT || 3000,
  })
  .promise();

// Exporta o módulo.
export default conn;
