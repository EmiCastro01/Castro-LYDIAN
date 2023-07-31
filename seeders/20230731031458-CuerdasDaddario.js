'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('productos', [{
        name: 'Cuerdas Daddario',
        price: 6000,
        type: 'Accesorio',
        seller: 'Olmos Music',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
     
     await queryInterface.bulkDelete('productos', null, {});
  }
};
