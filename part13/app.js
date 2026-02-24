const express = require("express");
const {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlogLikes,
} = require("./controllers/blogs");
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/api/blogs", getAllBlogs);
app.post("/api/blogs", createBlog);
app.delete("/api/blogs/:id", deleteBlog);
app.put("/api/blogs/:id", updateBlogLikes);

app.use(errorHandler);

module.exports = app;
