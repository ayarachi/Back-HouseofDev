'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Properties", "price", {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    
  }
};
