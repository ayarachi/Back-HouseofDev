const s = require("sequelize");
const db = require("../config/db ");
const bcrypt = require("bcrypt");

class User extends s.Model {
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
      type: s.STRING,
      allowNull: false,
    },
    lastName: {
      type: s.STRING,
      allowNull: false,
    },
    phone: {
      type: s.STRING,
      allowNull: false,
    },
    email: {
      type: s.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: true,
    },
    salt: {
      type: s.STRING,
    },
    pass: {
      type: s.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: s.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();

  user.salt = salt;

  return user.hash(user.pass, salt).then((hash) => {
    user.pass = hash;
  });
});

module.exports = User;
