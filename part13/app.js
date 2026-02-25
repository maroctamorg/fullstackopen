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
  getUserById,
} = require("./controllers/users");
const { login } = require("./controllers/login");
const { logout } = require("./controllers/logout");
const { getAuthors } = require("./controllers/authors");
const {
  addToReadingList,
  markReadingAsRead,
} = require("./controllers/readingLists");
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");
const authenticator = require("./middleware/authenticator");
const { Blog, User, ReadingList, Session } = require("./models");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.post("/api/users", createUser);
app.get("/api/users", getAllUsers);
app.get("/api/users/:id", getUserById);
app.put("/api/users/:username", updateUserName);

app.post("/api/login", login);
app.delete("/api/logout", authenticator, logout);

app.get("/api/blogs", getAllBlogs);
app.post("/api/blogs", authenticator, createBlog);
app.delete("/api/blogs/:id", authenticator, deleteBlog);
app.put("/api/blogs/:id", updateBlogLikes);

app.get("/api/authors", getAuthors);

app.post("/api/readinglists", addToReadingList);
app.put("/api/readinglists/:id", authenticator, markReadingAsRead);

app.post("/api/reset", async (_req, res) => {
  await Session.destroy({ where: {}, truncate: true, cascade: true });
  await ReadingList.destroy({ where: {}, truncate: true, cascade: true });
  await Blog.destroy({ where: {}, truncate: true, cascade: true });
  await User.destroy({ where: {}, truncate: true, cascade: true });
  res.status(204).end();
});

app.use(errorHandler);

module.exports = app;
