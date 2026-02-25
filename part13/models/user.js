const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name cannot be empty",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "username must be unique",
      },
      validate: {
        isEmail: {
          msg: "username must be a valid email address",
        },
        notEmpty: {
          msg: "username cannot be empty",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password cannot be empty",
        },
      },
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  },
);

module.exports = User;
