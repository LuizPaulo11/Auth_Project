'use strict';

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


    let permissionRoles = [];

    for (const permission of permissions) {
      for (const role of roles) {
        permissionRoles.push({
          permission_id: permission.id,
          role_id: 1,
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