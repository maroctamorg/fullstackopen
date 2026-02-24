const { Blog } = require("../models");
const { sequelize } = require("../utils/db");

const getAuthors = async (_req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      ],
      group: ["author"],
      order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
    });

    res.json(authors);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAuthors,
};
