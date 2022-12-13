"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Properties", "type", {
        allowNull: false,
        defaultValue: "casa",
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Properties", "description", {
        allowNull: false,
        defaultValue: "",
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn("Properties", "neighborhood", {
        allowNull: false,
        defaultValue: "",
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Properties", "type"),
      queryInterface.removeColumn("Properties", "description"),
      queryInterface.removeColumn("Properties", "neighborhood"),
    ]);
  },
};
