const User = require('../models/User');
const bcrypty = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    async NewUserComum(req, res) {
        try {
            const { name, password } = req.body;

            if ( !name || !password ) {
                return res.status(400).json({ message: "Name ou password não informados" });
            }

            const hash = await bcrypty.hash(password, 10);
            const createdUser = await User.create({ name, password: hash, role_id: 1 });

            const userResponse = createdUser.toJSON();
            delete userResponse.password;

            const token = jwt.sign(
                { 
                  UserId: createdUser.id,
                  role: createdUser.role
                },
                process.env.SECRET,
                { expiresIn: '1d' },
            );

            return res.status(201).json({ 
                message: "Usuario criado com sucesso",
                userResponse,
                token
            });

            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Erro interno no servidor", error});
            }
        },


    async Login(req, res) {
        try {
            const { name, password } = req.body

            if ( !name || !password ) {
                return res.status(400).json({ message: "Name ou password não informados" });
            }

            const usuario = await User.findOne({ where: { name }});

            if( !usuario ){
                res.status(401).json({ message: "Credenciais invalidas", error});
            }

            const math = bcrypty.compare(password, usuario.password);

            if ( !math ){
                res.status(401).json({ message: "Credenciais invalidas", error});
            }

            const user = usuario.toJSON();
            delete user.password;

            const token = jwt.sign(
                { 
                  UserId: usuario.id,
                  role: usuario.role
                },
                process.env.SECRET,
                { expiresIn: '1d'},
            )

            res.json({
                message: "Login realizado com sucesso",
                user: user,
                token,
            })
        } catch (error) {
            return res.status(500).json({ message: "Erro interno no servidor", error})
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