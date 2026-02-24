const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET } = require("../utils/config");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
    });

    const passwordCorrect = password === process.env.SECRET;

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: "24h" },
    );

    return res.json({ token, username: user.username, name: user.name });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};
