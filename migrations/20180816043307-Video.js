'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.addColumn(
          'Videos',
          'title',
          Sequelize.STRING
      );
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn(
          'Videos',
          'title'
      );
  }
};
