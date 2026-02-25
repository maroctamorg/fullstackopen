const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");
const { User, Session } = require("../models");
const { SECRET } = require("../utils/config");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
    });

    const passwordCorrect =
      user && (await bcrypt.compare(password + SECRET, user.password));

    if (!passwordCorrect) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    if (user.disabled) {
      return res.status(401).json({ error: "user account disabled" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: "24h", jwtid: randomUUID() },
    );

    await Session.create({
      userId: user.id,
      token,
    });

    return res.json({ token, username: user.username, name: user.name });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};
