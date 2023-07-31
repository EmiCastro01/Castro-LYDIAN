'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [{
        email: 'emilianocg.9@gmail.com',
        name: 'Emiliano',
        lastname: 'Castro',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});


  },

  async down (queryInterface, Sequelize) {
    
     
      await queryInterface.bulkDelete('users', null, {});
     
  }
};
