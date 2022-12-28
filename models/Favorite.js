"use strict";
const { type } = require("express/lib/response");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      Favorite.belongsTo(models.Property, {
        foreignKey: "propertyId",
        targetKey: "id",
      });
    }
  }
  Favorite.init(
    {
      propertyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};

