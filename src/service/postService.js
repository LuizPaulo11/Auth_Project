const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {

    async getFeed() {

        const feed = await Post.findAll({
            attributes: ['post', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    attributes: ['id', 'name'],
                    model: User,
                    as: 'user',
                }
            ],
            limit: 30
        })

        if (feed.length == 0) {
            throw new Error("FEED_VAZIO");
        }

        return feed
    },

    async getMyPosts(id) {

        const posts = await Post.findAll({
            attributes: ["id", "post", "created_at"],
            order: [["created_at", "DESC"]],
            where: {
                user_id: id
            },
            limit: 10
        })

        if (posts.length == 0) {
            throw new Error("FEED_VAZIO");
        }

        return posts
    },

    async getPostByID(id) {

        const post = await Post.findByPk(id, {
            attributes: ["id", "post", "created_at", "user_id"],
        });

        if (!post || post.length === 0) {
            throw new Error("POST_NAO_ENCONTRADO");
        }

        return post
    },

    async createPost(post, user_id) {

        const existingPost = await Post.findOne({
            where: {
                post,
                user_id
            }
        });

        if (existingPost) {
            throw new Error("MESMO_POST");
        }

        const createdPost = await Post.create({ post, user_id });

        return {
            id: createdPost.id,
            post: createdPost.post,
            user_id: Number(createdPost.user_id),
            created_at: createdPost.createdAt
        };
    }
}
