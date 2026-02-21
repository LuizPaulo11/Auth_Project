const { Model, DataTypes } = require('sequelize');

class Permission extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      resource: DataTypes.STRING,
      action: DataTypes.ENUM('create', 'read', 'update', 'delete'),
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Permission',
      tableName: 'permissions',
    });
  }

  static associate(models) {
    this.belongsToMany(models.Role, { through: models.PermissionRoles, foreignKey: 'permission_id', otherKey: 'role_id', as: 'roles' });
  }
}

module.exports = Permission