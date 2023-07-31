'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('productos', [{
        name: 'Harmonizer',
        price: 20000,
        type: 'Vientos',
        seller: 'Tres Octavas',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
     
     await queryInterface.bulkDelete('productos', null, {});
  }
};
