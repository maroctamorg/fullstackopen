const express = require("express");
const {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlogLikes,
} = require("./controllers/blogs");
const {
  createUser,
  getAllUsers,
  updateUserName,
} = require("./controllers/users");
const { login } = require("./controllers/login");
const { getAuthors } = require("./controllers/authors");
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");
const tokenExtractor = require("./middleware/tokenExtractor");
const { Blog, User } = require("./models");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.post("/api/users", createUser);
app.get("/api/users", getAllUsers);
app.put("/api/users/:username", updateUserName);

app.post("/api/login", login);

app.get("/api/blogs", getAllBlogs);
app.post("/api/blogs", tokenExtractor, createBlog);
app.delete("/api/blogs/:id", tokenExtractor, deleteBlog);
app.put("/api/blogs/:id", updateBlogLikes);

app.get("/api/authors", getAuthors);

app.post("/api/reset", async (_req, res) => {
  await Blog.destroy({ where: {}, truncate: true, cascade: true });
  await User.destroy({ where: {}, truncate: true, cascade: true });
  res.status(204).end();
});

app.use(errorHandler);

module.exports = app;
