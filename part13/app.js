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
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");
const tokenExtractor = require("./middleware/tokenExtractor");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.post("/api/users", createUser);
app.get("/api/users", getAllUsers);
app.put("/api/users/:username", updateUserName);

app.post("/api/login", login);

app.get("/api/blogs", getAllBlogs);
app.post("/api/blogs", tokenExtractor, createBlog);
app.delete("/api/blogs/:id", tokenExtractor, deleteBlog);
app.put("/api/blogs/:id", updateBlogLikes);

app.use(errorHandler);

module.exports = app;
