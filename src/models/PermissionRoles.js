const { Model, DataTypes } = require('sequelize');

class PermissionRoles extends Model {
  static init(sequelize) {
    super.init({
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'PermissionRoles',
      tableName: 'permission_roles',
    });
  }

  static associate(models) {
    this.belongsTo(models.Permission, { foreignKey: 'permission_id', as: 'permission' });
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }
}

module.exports = PermissionRoles;
