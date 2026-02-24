const Blog = require("../models/blog");

const getAllBlogs = async (_req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { author, url, title, likes } = req.body;
    const blog = await Blog.create({
      author,
      url,
      title,
      likes: likes ?? 0,
    });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    await blog.destroy();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
};
