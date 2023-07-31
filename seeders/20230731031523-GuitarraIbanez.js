'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('productos', [{
        name: 'Guitarra Ibanez',
        price: 280000,
        type: 'Cuerdas',
        seller: 'San Juan Music',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
     
     await queryInterface.bulkDelete('productos', null, {});
  }
};
