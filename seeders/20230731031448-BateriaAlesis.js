'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('productos', [{
        name: 'Bateria Alesis Nitro Mesh',
        price: 400000,
        type: 'Percusion',
        seller: 'Emi Castro',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
     
     await queryInterface.bulkDelete('productos', null, {});
  }
};
