const postService = require('../service/postService');

module.exports = {

  async getFeed(req, res) {
    try {
      const feed = await postService.getFeed()

      return res.status(200).json({
        message: "Seu feed",
        data: feed
      })

    } catch (error) {
      if (error.message === "FEED_VAZIO") {
        return res.status(200).json({ message: 'O feed no momento está vazio' });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  },

  async getMyPosts(req, res) {
    try {
      const id = req.params.id

      if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Credenciais inválidas" });
      }

      const posts = await postService.getMyPosts(id);

      return res.status(200).json({
        message: "Seus posts",
        data: posts
      });

    } catch (error) {
      if (error.message === "FEED_VAZIO") {
        return res.status(200).json({ message: "Feed não encontrado" });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  },
  async getPostByID(req, res) {
    try {
      const id = req.params.id

      if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const post = await postService.getPostByID(id);

      return res.status(200).json({
        message: "Post",
        data: post
      })

    } catch (error) {
      if (error.message === "POST_NAO_ENCONTRADO") {
        return res.status(404).json({ message: "Não foi possivel localizar esse post" });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  },

  async createPost(req, res) {
    try {
      const { user_id } = req.params

      const { post } = req.body

      if (!user_id || isNaN(user_id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      if (!post || typeof post !== "string") {
        return res.status(400).json({
          message: "O post precisa ser uma string"
        });
      }

      const posts = await postService.createPost(post, user_id);

      return res.status(201).json({
        message: "Post criado com sucesso",
        data: posts
      })

    } catch (error) {
        if(error.message === "MESMO_POST") {
          return res.status(409).json({ message: "Este post já existe" });
        }

        return res.status(500).json({ message: "Erro interno no servidor", error})
    }
  }
}