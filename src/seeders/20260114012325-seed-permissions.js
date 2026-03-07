'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
            { id: 1, name: 'read:perfil', resource: 'User', action: 'read', created_at: new Date(), updated_at: new Date(), },
            { id: 2, name: 'update:name', resource: 'User', action: 'update', created_at: new Date(), updated_at: new Date(), },
            { id: 3, name: 'update:senha', resource: 'User', action: 'update', created_at: new Date(), updated_at: new Date(), },
            { id: 4, name: 'delete:account', resource: 'User', action: 'delete', created_at: new Date(), updated_at: new Date(), } 
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};



/*

XX GET   /users/profile    # Ver perfil
XX PUT   /users/profile    # Atualizar nome/username
XX PUT   /users/password   # Alterar senha
XX _DELETE /users/account   # Excluir conta


      { id: 1, name: 'create:post', resource: 'Post', action: 'create', created_at: new Date(), updated_at: new Date(), },
      { id: 2, name: 'read:post',   resource: 'Post', action: 'read',   created_at: new Date(), updated_at: new Date(), },
      { id: 3, name: 'update:post', resource: 'Post', action: 'update', created_at: new Date(), updated_at: new Date(), },
      { id: 4, name: 'delete:post', resource: 'Post', action: 'delete', created_at: new Date(), updated_at: new Date(), },

*/