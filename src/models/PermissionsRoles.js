const { Model, DataTypes } = require('sequelize');

class PermissionsRoles extends Model {
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
      modelName: 'PermissionsRoles',
      tableName: 'permissions_roles',
    });
  }

  static associate(models) {
    this.belongsTo(models.Permissions, { foreignKey: 'permission_id', as: 'permission' });
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }
}

module.exports = PermissionsRoles;
