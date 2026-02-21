const { Model, DataTypes } = require('sequelize');

class Role extends Model {
    static init(sequelize) {
        super.init({
            role: {
              type: DataTypes.ENUM('admin', 'moderador', 'user'),
              defaultValue: 'user',
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
        this.belongsToMany(models.User, { through: models.UserRole, foreignKey: 'role_id', otherKey: 'user_id', as: 'users'});
        this.belongsToMany(models.Permission, { through: models.PermissionRoles, foreignKey: 'role_id', otherKey: 'permission_id', as: 'permissions'});
    }
}

module.exports = Role