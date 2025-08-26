const { Model, DataTypes } = require('sequelize');

class PermissionsRoles extends Model {
    static init(sequelize){
        super.init({
            permissions_id: DataTypes.INTEGER,
            roles_id: DataTypes.INTEGER,
        },{
            timestamps: true,
            underscored: true,
            modelName: 'PermissionsRoles',
            tableName: 'permissions_roles',
        })
    }
    static associate(models) {
        this.belongsTo(models.Permissions, { foreignKey: 'permissions_id', as: 'permission' });
        this.belongsTo(models.Role, { foreignKey: 'roles_id', as: 'role' });
    }
}

module.exports = PermissionsRoles
