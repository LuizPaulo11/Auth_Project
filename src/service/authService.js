const User = require('../models/User');
const UserRoles = require('../models/UserRoles');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async register(name, password) {
    if (!name || !password) {
      throw new Error("Credenciais inválidas");
    }

    const hash = await bcrypt.hash(password, 10);

    const transaction = await User.sequelize.transaction();
    try {
      const newUser = await User.create({ name, password: hash }, { transaction });

      await UserRoles.create({ user_id: newUser.id, role_id: 1 }, { transaction });

      await transaction.commit();

      const userSafe = newUser.toJSON();
      delete userSafe.password;

      const token = jwt.sign(
        { userId: newUser.id, role: 1 },
        process.env.SECRET,
        { expiresIn: '1d' }
      );

      return { newUser: userSafe, token };
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
}

