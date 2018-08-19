'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Videos','video_uid',{ type: Sequelize.STRING, unique : true, allowNull : false });
  },

  down: (queryInterface, Sequelize) => {
  }
};
