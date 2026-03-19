const authService = require('../service/authService');
const UserRole = require('../models/UserRole');

module.exports = {
  async register(req, res) {
    try {
      const { name, password } = req.body;

      if (!name || !password) {
        return res.status(400).json({
          message: "Credenciais inválidas"
        });
      }

      const { newUser } = await authService.register(name, password);

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: {
          id: newUser.id,
          name: newUser.name,
          createdAt: newUser.createdAt
        },
      });

    } catch (error) {
      if (error.message === "USUARIO_JA_EXISTE") {
        return res.status(409).json({ message: "Usuario já existe" });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  },

  async login(req, res) {
    try {
      const { name, password } = req.body;

      if (!name || !password) {
        return res.status(404).json({
          message: "Credenciais inválidas"
        });
      }

      const user = await authService.login(name, password);

      return res.status(200).json({
        message: "Logado com sucesso!",
        data: user,
      });

    } catch (error) {
      if (error.message === "USUARIO_NAO_ENCONTRADO") {
        return res.status(404).json({ message: "Usuario não encontrado" })
      }
      if (error.message === "NAME_OU_SENHA_INVALIDO") {
        return res.status(401).json({ message: "Name ou senha inválido"})
      }

      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
};
