const User = require('../models/User');

module.exports = {
    async NewUser(req, res) {
        try {
            const { name, password, role_id } = req.body

            const NewUser = await User.create({ name, password, role_id });


            return res.status(201).json({ message: 'Usuario criado com sucesso', NewUser})

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao tentar criar usuario', error})
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