'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    let post = [];
    for(let i = 0; i < 10; i++) {
      const users = await queryInterface.sequelize.query(
      'SELECT id FROM users',
      { type: Sequelize.QueryTypes.SELECT }
    );

        post.push({
            post: faker.book.author(),
            user_id: faker.helpers.arrayElement(users).id,
            created_at: new Date(),
            updated_at: new Date()
        })
    }

    await queryInterface.bulkInsert('posts', post, {} );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
