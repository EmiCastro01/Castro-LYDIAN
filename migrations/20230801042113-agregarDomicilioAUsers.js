'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'domicilio', {
      type: Sequelize.STRING,
      allowNull: true // Opcional: Define si la columna permite valores nulos o no.
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'domicilio');
  }
};