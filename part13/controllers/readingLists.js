const { Blog, User, ReadingList } = require("../models");

const addToReadingList = async (req, res, next) => {
  try {
    const { blogId, userId } = req.body;

    if (!blogId || !userId) {
      return res.status(400).json({ error: "blogId and userId are required" });
    }

    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: "invalid blogId" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "invalid userId" });
    }

    const readingList = await ReadingList.create({
      blogId,
      userId,
      read: false,
    });

    return res.status(201).json({
      id: readingList.id,
      blog_id: readingList.blogId,
      user_id: readingList.userId,
      read: readingList.read,
    });
  } catch (error) {
    return next(error);
  }
};

const markReadingAsRead = async (req, res, next) => {
  try {
    const { read } = req.body;
    if (typeof read !== "boolean") {
      return res.status(400).json({ error: "read must be a boolean" });
    }

    const readingList = await ReadingList.findByPk(req.params.id);
    if (!readingList) {
      return res.status(404).json({ error: "reading list entry not found" });
    }

    if (readingList.userId !== req.decodedToken.id) {
      return res.status(401).json({ error: "not authorized" });
    }

    readingList.read = read;
    await readingList.save();

    return res.json({
      id: readingList.id,
      blog_id: readingList.blogId,
      user_id: readingList.userId,
      read: readingList.read,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addToReadingList,
  markReadingAsRead,
};
