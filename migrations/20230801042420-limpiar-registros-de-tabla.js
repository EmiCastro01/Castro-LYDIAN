'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },

  down: async (queryInterface, Sequelize) => {
  }
};