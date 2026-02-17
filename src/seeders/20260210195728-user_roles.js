'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users',
      { type: Sequelize.QueryTypes.SELECT }
    )

    const user = users.map(u => ({
      user_id: u.id,
      role_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('user_roles', user, {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {}); 
  }
};
