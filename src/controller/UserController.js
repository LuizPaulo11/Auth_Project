const User = require('../models/User');
const bcrypty = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {
    async NewUserComum(req, res) {
    try {
        const { name, password } = req.body;

        const hash = await bcrypty.hash(password, 10);

        const CreatedUser = await User.create({ name, password: hash, role_id: 1 });

        return res.status(201).json({ message: 'Usuário criado com sucesso', CreatedUser });

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao tentar criar usuário', error });
    }
 },
   


















    async GetAllUsers(req, res) {
        try {
            const GetAll = await User.findAll()


            res.json({ message: "Essa é a lista de todos os usuarios", GetAll })

        } catch (error) {
            res.json({ message: "Erro ao tentar criar usuario", error })
        }
    }
}