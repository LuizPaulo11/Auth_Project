'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
      { name: 'action-create', resource: 'resource', action: 'create', created_at: new Date(), updated_at: new Date(), },
      { name: 'action-read',   resource: 'resource', action: 'read',   created_at: new Date(), updated_at: new Date(), },
      { name: 'action-update', resource: 'resource', action: 'update', created_at: new Date(), updated_at: new Date(), },
      { name: 'action-delete', resource: 'resource', action: 'delete', created_at: new Date(), updated_at: new Date(), },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
