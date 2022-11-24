"use strict";

const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    hash(password, salt) {
      return bcrypt.hash(password, salt);
    }

    validatePassword(password) {
      return this.hash(password, this.salt).then(
        (newHash) => newHash === this.pass
      );
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: true,
      },
      salt: {
        type: DataTypes.STRING,
      },
      pass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { sequelize, modelName: "user" }
  );

  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync();

    user.salt = salt;

    return user.hash(user.pass, salt).then((hash) => {
      user.pass = hash;
    });
  });

  return User;
};
