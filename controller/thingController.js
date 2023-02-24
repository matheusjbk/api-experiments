// Importa conector do banco de dados.
import conn from "../model/mysql";

// Objeto que será executado quando ocorrer uma requisição HTTP para a entidade "things".
const thingController = {
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

// Exporta o módulo.
export default thingController;
