'use strict';

const { faker } = require('@faker-js/faker');

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    const plainPassword = 'Password1!';
    const hash = await bcrypt.hash(plainPassword, 10);

    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.person.fullName(),
        password: hash,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};