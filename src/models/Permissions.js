const { Model, DataTypes } = require('sequelize');

class Permissions extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            resource: DataTypes.STRING,
            action: DataTypes.ENUM('create','read','update','delete'),
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Permissions',
            tableName: 'permissions'
        });
    }

    static associate(models) {
        this.belongsToMany(models.Role, { through: models.PermissionsRoles, foreignKey: 'permission_id', otherKey: 'role_id', as: 'roles' });
    }
}

module.exports = Permissions;
