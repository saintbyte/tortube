'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.addColumn(
          'Videos',
          'width',
          Sequelize.INTEGER
      );
      queryInterface.addColumn(
          'Videos',
          'height',
          Sequelize.INTEGER
      );
      queryInterface.addColumn(
          'Videos',
          'duration',
          Sequelize.INTEGER
      );
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn(
          'Videos',
          'width',
          Sequelize.INTEGER
      );
      queryInterface.removeColumn(
          'Videos',
          'height',
          Sequelize.INTEGER
      );
      queryInterface.removeColumn(
          'Videos',
          'duration',
          Sequelize.INTEGER
      );
  }
};
