'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('roles', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('admin', 'moderador', 'user'),
        defaultValue: 'user',
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
    return queryInterface.dropTable('roles');
  }
};
