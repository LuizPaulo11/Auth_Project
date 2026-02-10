const { Model, DataTypes } = require('sequelize');

class UserRole extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            role_id: DataTypes.INTEGER,
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'UserRole',
            tableName: 'user_roles',
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    }
}

module.exports = UserRole

