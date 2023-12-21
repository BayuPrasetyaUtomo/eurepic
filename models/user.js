"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne("Profile");
      User.hasMany("Picture");
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username cannot be empty",
        },
        notEmpty: {
          msg: "Username cannot be empty",
        },
      },
      password: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be empty",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (User) => {
          const salt = bcrypt.genSaltSync(10);
          User.password = bcrypt.hashSync(User.password, salt);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
