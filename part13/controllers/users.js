const { User } = require("../models");

const createUser = async (req, res, next) => {
  try {
    const { name, username } = req.body;
    const user = await User.create({
      name,
      username,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        association: "blogs",
        attributes: { exclude: ["userId"] },
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({
      where: { username: req.params.username },
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    user.name = name;
    await user.save();
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUserName,
};
