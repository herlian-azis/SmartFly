"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
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
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      userName: {
        type: DataTypes.STRING,
      },
      subsStatus: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: (user) => {
          if (!user.userName) {
            user.userName = user.email;
          }
          user.password = hashPassword(user.password);
          if (!user.subsStatus) {
            user.subsStatus = false;
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
