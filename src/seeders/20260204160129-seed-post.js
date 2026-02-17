'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = [];
    for (let i = 0; i < 10; i++) {
      posts.push({
        post: faker.lorem.sentence(),
        user_id: faker.helpers.arrayElement(users).id,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('posts', posts, {} );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
