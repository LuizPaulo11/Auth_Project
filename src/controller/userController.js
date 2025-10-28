const userService = require('../service/userService');

module.exports = {
    async seeProfile(req, res) {
        try {
            const userId = req.params.id;

            const profile = await userService.seeProfile(userId);

            return res.json({
                message: "Informações do perfil",
                data: profile
            });
        } catch (error) {
            if (error.message === "ID inválido" || error.message === "Perfil não encontrado") {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    },

    async updateName(req, res) {
        try {
            const userId = req.params.id;
            const { name, password } = req.body;

            const updatedName = await userService.updateName(userId, name, password);

            return res.status(200).json({
                message: 'Nome atualizado com sucesso',
                user: updatedName
            });

        } catch (error) {
            if (error.message === "ID inválido" || error.message === "Credenciais não informadas") {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === "Usuário não encontrado") {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === "Senha incorreta") {
                return res.status(401).json({ message: error.message });
            }

            console.error(error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    },

    async updatePassword(req, res) {
        try {
            const userId = req.params.id;
            const { password, newPassword } = req.body;

            const updatedPassword = await userService.updatePassword(userId, password, newPassword)
            
            return res.status(200).json ({
                message: "Senha atualizada com sucesso",
                data: updatedPassword
            })


        } catch (error) {
            if (error.message === "ID inválido" || error.message === "Credenciais inválidas" || error.message === "As senhas não podem ser iguais") {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === "Usuário não encontrado"){
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            if (error.message === "Senha incorreta"){
                return res.status(401).json({ message: "Senha incorreta"});
            }


            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    },

    async deleteAccount(req, res){
        try {
            const userId = req.params.id;
            const { password } = req.body;

            await userService.deleteAccount(userId, password);

            return res.status(200).json({
                message: "Usuario deletado com sucesso",
            })
        } catch (error) {
            if (error.message === "Usuário não encontrado"){
                return res.status(404).json({ message: error.message });
            }
            if (error.message === "Senha incorreta"){
                return res.status(401).json({ message: error.message });
            }
            if (error.message === "ID inválido" || error.message === "Credencial inválida") {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno no servidor" })
        }
    }
};




