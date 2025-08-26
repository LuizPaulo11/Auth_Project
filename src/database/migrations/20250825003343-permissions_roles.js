'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('permissions_roles', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      permissions_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'permissions',
          key: 'id',
        },
        allowNull: false,
      },
      roles_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
     });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('permissions_roles');
  }
};
