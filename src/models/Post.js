const { Model, DataTypes } = require('sequelize');


class Post extends Model {
    static init(sequelize) {
        super.init({
            post: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        }, {
            sequelize,
            modelName: 'Post',
            tableName: 'posts',
            timestamps: true,
            underscored: true,
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'})
    }
}

module.exports = Post