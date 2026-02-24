const { Sequelize, Model, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  logging: console.log,
});

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
  },
  {
    sequelize,
    modelName: "blog",
    timestamps: false,
  },
);

const printBlogs = async () => {
  const blogs = await Blog.findAll();
  blogs.forEach((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
  });

  await sequelize.close();
};

printBlogs();
