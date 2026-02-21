const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'User',
            tableName: 'users',
        });
    }

    static associate(models) {
        this.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id', otherKey: 'role_id', as: 'roles' })
        this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    }
}

module.exports = User;

