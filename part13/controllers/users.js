const { User, Blog } = require("../models");
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/config");

const createUser = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password + SECRET, saltRounds);

    const user = await User.create({
      name,
      username,
      password: passwordHash,
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
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

const getUserById = async (req, res, next) => {
  try {
    const where = {};
    if (req.query.read === "true") {
      where.read = true;
    }
    if (req.query.read === "false") {
      where.read = false;
    }

    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "username"],
      include: {
        model: Blog,
        as: "readings",
        attributes: ["id", "url", "title", "author", "likes", "year"],
        through: {
          attributes: ["id", "read"],
          where,
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const formattedReadings = user.readings.map((reading) => ({
      id: reading.id,
      url: reading.url,
      title: reading.title,
      author: reading.author,
      likes: reading.likes,
      year: reading.year,
      reading_list: {
        id: reading.reading_list.id,
        read: reading.reading_list.read,
      },
    }));

    return res.json({
      name: user.name,
      username: user.username,
      readings: formattedReadings,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUserName,
  getUserById,
};
