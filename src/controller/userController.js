const userService = require('../service/userService');

module.exports = {
    async seeProfile(req, res) {
        try {
            const userId = req.params.id;

            if (!userId || isNaN(userId)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const profile = await userService.seeProfile(userId);

            return res.json({
                message: "Informações do perfil",
                data: profile
            });
        } catch (error) {
            if (error.message === "PERFIL_NAO_ENCONTRADO") {
                return res.status(404).json({ message: "Usuario não encontrado" });
            }

            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    },

    async updateName(req, res) {
        try {
            const userId = req.params.id;
            const { name, password } = req.body;

            if (!userId || isNaN(userId)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            if(!name || !password) {
                return res.status(400).json({ message: "Credenciais inválidas" });
            }

            const updatedUser = await userService.updateName(userId, name, password);

            return res.status(200).json({
                message: 'Nome atualizado com sucesso',
                user: updatedUser
            });

        } catch (error) {
            if (error.message === "USUARIO_NAO_ENCONTRADO") {
                return res.status(404).json({ message: "Usuario não encontrado" });
            }
            if (error.message === "SENHA_INCORRETA") {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    },

    async updatePassword(req, res) {
        try {
            const userId = req.params.id;
            const { password, newPassword } = req.body;

            if (!userId || isNaN(userId)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            if (!password || !newPassword) {
                return res.status(400).json({ message: "Credenciais inválidas" });
            }

            const updatedPassword = await userService.updatePassword(userId, password, newPassword)
            
            return res.status(200).json ({
                message: "Senha atualizada com sucesso",
                data: updatedPassword
            })


        } catch (error) {
            if (error.message === "AS_SENHAS_NAO_PODEM_SER_IGUAIS") {
                return res.status(400).json({ message: "As senhas não podem ser iguais" });
            }

            if (error.message === "USUARIO_NAO_ENCONTRADO"){
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            if (error.message === "SENHA_INCORRETA"){
                return res.status(401).json({ message: "Credenciais inválidas"});
            }

            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    },

    async deleteAccount(req, res){
        try {
            const userId = req.params.id;
            const { password } = req.body;

            if (!userId || isNaN(userId)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            if (!password) {
                return res.status(400).json({ message: "Credenciais inválidas" });
            }

            await userService.deleteAccount(userId, password);

            return res.status(200).json({
                message: "Usuario deletado com sucesso",
            })
        } catch (error) {
            if (error.message === "USUARIO_NAO_ENCONTRADO"){
                return res.status(404).json({ message: "Usuario não encontrado" });
            }
            if (error.message === "SENHA_INCORRETA"){
                return res.status(401).json({ message: "Crendenciais inválidas" });
            }
            
            return res.status(500).json({ message: "Erro interno no servidor" })
        }
    }
};




