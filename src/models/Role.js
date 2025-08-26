const { Model, DataTypes } = require('sequelize');

class Role extends Model {
    static init(sequelize) {
        super.init({
            role: {
                type: DataTypes.ENUM('admin', 'moderador', 'user'),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Role',
            tableName: 'roles',
        })
    }
    static associate(models) {
        this.belongsToMany(models.User, { through: models.UserRoles, foreignKey: 'role_id', otherKey: 'user_id', as: 'users'});
        this.belongsToMany(models.Permissions, { through: models.PermissionsRoles, foreignKey: 'role_id', otherKey: 'permission_id', as: 'permissions'});
    }
}

module.exports = Role