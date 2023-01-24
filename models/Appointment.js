"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      Appointment.belongsTo(models.Property, {
        foreignKey: "propertyId",
        targetKey: "id",
      });
    }
  }
  Appointment.init(
    {
      time: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      propertyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
