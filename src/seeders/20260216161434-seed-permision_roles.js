'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const permissions = await queryInterface.sequelize.query(
      'SELECT id FROM permissions',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const roles = await queryInterface.sequelize.query(
      'SELECT id FROM roles',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const permissionRoles = [];

    for (const role of roles) {
      for (const permission of permissions) {
        permissionRoles.push({
          role_id: role.id,
          permission_id: permission.id,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }

    await queryInterface.bulkInsert(
      'permission_roles',
      permissionRoles,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permission_roles', null, {});
  }
};
