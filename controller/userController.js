// Importa conector do banco de dados.
import conn from "../model/mysql";

// Objeto que será executado quando ocorrer uma requisição HTTP para a entidade "users".
const userController = {
  // Lista todos os registros de usuários.
  getAll: async (req, res) => {
    try {
      const sql = "SELECT * FROM users WHERE ustatus='on' ORDER BY uname";
      const [rows] = conn.query(sql);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Lista apenas um registro de usuário.
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const sql = "SELECT * FROM users WHERE ustatus='on' AND uid=?";
      const [rows] = conn.query(sql, [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Muda o status de um registro para "del".
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const sql = "UPDATE users SET ustatus='del' WHERE uid=?";
      const [rows] = conn.query(sql, [id]);
      res.json({ id: id, status: "success" });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Insere um registro de usuário.
  post: async (req, res) => {
    try {
      const { name, email, password, avatar, birth } = req.body;
      const sql =
        "INSERT INTO users (uname, uemail, upassword, uavatar, ubirth) VALUES (?, ?, SHA1(?), ?, ?)";
      const [rows] = conn.query(sql, [name, email, password, avatar, birth]);
      res.json({ id: rows.insertId, status: "success" });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Atualiza um registro de usuário.
  put: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, password, avatar, birth } = req.body;
      const sql =
        "UPDATE users SET uname=?, uemail=?, upassword=SHA1(?), uavatar=?, ubirth=? WHERE uid=?";
      const [rows] = conn.query(sql, [
        name,
        email,
        password,
        avatar,
        birth,
        id,
      ]);
      res.json({ id: id, status: "success" });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },
};

// Exporta o módulo.
export default userController;
