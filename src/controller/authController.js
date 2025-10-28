const authService = require('../service/authService');
const UserRoles = require('../models/UserRoles');

module.exports = {
  async register(req, res) {
    try {
      const { name, password } = req.body;

      const { newUser, token } = await authService.register(name, password);

      const userRole = await UserRoles.findOne({ where: { user_id: newUser.id } });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: newUser,
        role: userRole ? userRole.role_id : null,
        token
      });

    } catch (error) {
      if (error.message === "Credenciais inválidas" || error.message === "Não foi possível criar o usuário") {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
};
