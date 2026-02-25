const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: "year must be an integer",
        },
        min: {
          args: [1991],
          msg: "year must be at least 1991",
        },
        isNotInFuture(value) {
          if (value === null || value === undefined) {
            return;
          }

          const currentYear = new Date().getFullYear();
          if (value > currentYear) {
            throw new Error(`year must not be greater than ${currentYear}`);
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "blog",
    timestamps: true,
  },
);

module.exports = Blog;
