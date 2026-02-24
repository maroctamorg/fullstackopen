const { Blog, User } = require("../models");

const getAllBlogs = async (_req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { author, url, title, likes } = req.body;
    const userId = req.decodedToken.id;

    const blog = await Blog.create({
      author,
      url,
      title,
      likes: likes ?? 0,
      userId,
    });

    const blogWithUser = await Blog.findByPk(blog.id, {
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });

    res.status(201).json(blogWithUser);
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

    if (blog.userId !== req.decodedToken.id) {
      return res
        .status(403)
        .json({ error: "only the creator can delete this blog" });
    }

    await blog.destroy();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

const updateBlogLikes = async (req, res, next) => {
  try {
    const { likes } = req.body;

    if (!Number.isInteger(likes)) {
      return res.status(400).json({ error: "likes must be an integer" });
    }

    const blog = await Blog.findByPk(req.params.id, {
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    blog.likes = likes;
    await blog.save();

    return res.json(blog);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlogLikes,
};
