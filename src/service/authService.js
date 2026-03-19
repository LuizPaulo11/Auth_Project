const User = require('../models/User');
const UserRole = require('../models/UserRole');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async register(name, password) {

    const existingUser = await User.findOne({ where: { name }});

    if (existingUser) {
      throw new Error("USUARIO_JA_EXISTE");
    }

    const hash = await bcrypt.hash(password, 10);

    const transaction = await User.sequelize.transaction();
    try {
      const newUser = await User.create({ name, password: hash }, { transaction });

      await UserRole.create({ user_id: newUser.id, role_id: 1 }, { transaction });

      await transaction.commit(); 

      const userSafe = newUser.toJSON();
      delete userSafe.password;

      return { newUser: userSafe };
      
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async login(name, password) {

    const user = await User.findOne({ where: { name } });

    if (!user) {
      throw new Error("USUARIO_NAO_ENCONTRADO");
    }

    const math = await bcrypt.compare(password, user.password);
    
    if (!math) {
      throw new Error("NAME_OU_SENHA_INVALIDO");
    }

    const getRole = await UserRole.findOne({ where: { user_id: user.id }});
    
    const token = jwt.sign(
      { id: user.id,  role: getRole.role_id },
      process.env.SECRET,
      {expiresIn: '1d'}
    );

    return {
      id: user.id,
      name: user.name,
      role: getRole.role_id,
      token
    }
  }
}

