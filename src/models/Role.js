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
            tableName: 'Roles',
        })
    }
}