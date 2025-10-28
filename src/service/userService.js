const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

module.exports = {
    async seeProfile(userId) {
        if (!userId || isNaN(userId)) {
            throw new Error("ID inválido");
        }
        const findProfile = await User.findByPk(userId, {
            attributes: ['id', 'name', 'created_at'],
            include: [
                {
                    model: Post,
                    attributes: ['post', 'created_at']
                }
            ]
        });

        if (!findProfile) {
            throw new Error("Perfil não encontrado");
        }

        return findProfile;
    },
    
    async updateName(userId, name, password) {
        if (!userId || isNaN(userId)) {
            throw new Error("ID inválido");
        }

        if (!name || !password) {
            throw new Error("Credenciais não informadas");
        }

        const user = await User.findByPk(userId, {
            attributes: ['id', 'password']
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Senha incorreta");
        }

        await User.update({ name }, { where: { id: userId } });

        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        return updatedUser;
    },
    
    async updatePassword(userId, password, newPassword) {
        if (!userId || isNaN(userId)) {
            throw new Error("ID inválido");
        }

        if (!password || !newPassword) {
            throw new Error("Credenciais inválidas");
        }

        const user = await User.findByPk(userId, {
            attributes: ['id', 'password']
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Senha incorreta");
        }

        if (password === newPassword) {
            throw new Error("As senhas não podem ser iguais");
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
            throw new Error("ID inválido");
        }

        if (!password){
            throw new Error("Credencial inválida");
        }

        const user = await User.findByPk(userId, {
            attributes: [ 'id', 'password' ]
        });

        if (!user){
            throw new Error("Usuário não encontrado"); 
        }

        const math = await bcrypt.compare(password, user.password);
        if (!math){
            throw new Error("Senha incorreta") 
        }

        const destroyAccount = await User.destroy({ where: { id: userId }});

        return destroyAccount

    },

    

};
