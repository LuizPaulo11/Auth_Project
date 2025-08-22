'use strict';
const now = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      { id: 1, role: 'user', created_at: now, updated_at: now },
      { id: 2, role: 'moderador', created_at: now, updated_at: now },
      { id: 3, role: 'admin', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
