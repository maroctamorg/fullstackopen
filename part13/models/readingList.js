const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "reading_list",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "blogId"],
        name: "reading_lists_user_id_blog_id_unique",
      },
    ],
  },
);

module.exports = ReadingList;
