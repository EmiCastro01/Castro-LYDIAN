'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('productos', [{
        name: 'Guitarra Fender',
        price: 250000,
        type: 'Cuerdas',
        seller: 'Olmos Music',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
     
     await queryInterface.bulkDelete('productos', null, {});
  }
};
