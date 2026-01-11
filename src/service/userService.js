const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

module.exports = {
    async seeProfile(userId) {
        if (!userId || isNaN(userId)) {
            throw new Error("ID_INVALIDO");
        }
        const findProfile = await User.findByPk(userId, {
            attributes: ['id', 'name', 'created_at'],
            include: [
                {
                   model: Post,
                   as: 'posts',
                   attributes: ['post', 'created_at']
                }
            ]
        });

        if (!findProfile) {
            throw new Error("PERFIL_NAO_ENCONTRADO");
        }

        return findProfile;
    },
    
    async updateName(userId, name, password) {
        if (!userId || isNaN(userId)) {
            throw new Error("ID_INVALIDO");
        }

        if (!name || !password) {
            throw new Error("CREDENCIAIS_NAO_INFORMADAS");
        }

        const user = await User.findByPk(userId, {
            attributes: ['id', 'password']
        });

        if (!user) {
            throw new Error("USUARIO_NAO_ENCONTRADO");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("SENHA_INCORRETA");
        }

        await User.update({ name }, { where: { id: userId } });

        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });


        return updatedUser;
    },
    
    async updatePassword(userId, password, newPassword) {
        if (!userId || isNaN(userId)) {
            throw new Error("ID_INVALIDO");
        }

        if (!password || !newPassword) {
            throw new Error("CREDENCIAIS_INVALIDAS");
        }

        const user = await User.findByPk(userId, {
            attributes: ['id', 'password']
        });

        if (!user) {
            throw new Error("USUARIO_NAO_ENCONTRADO");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("SENHA_INCORRETA");
        }

        if (password === newPassword) {
            throw new Error("AS_SENHAS_NAO_PODEM_SER_IGUAIS");
        }

        const hash = await bcrypt.hash(newPassword, 10);

        await User.update({ password: hash }, { where: { id: userId } });

        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        return updatedUser;
    },

    async deleteAccount(userId, password){
        if (!userId || isNaN(userId)){
            throw new Error("ID_INVALIDO");
        }

        if (!password){
            throw new Error("CREDENCIAL_INVALIDO");
        }

        const user = await User.findByPk(userId, {
            attributes: [ 'id', 'password' ]
        });

        if (!user){
            throw new Error("USUARIO_NAO_ENCONTRADO"); 
        }

        const math = await bcrypt.compare(password, user.password);
        if (!math){
            throw new Error("SENHA_INCORRETA") 
        }

        const destroyAccount = await User.destroy({ where: { id: userId }});

        return destroyAccount

    },

    

};
