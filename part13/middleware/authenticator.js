const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const { Session, User } = require("../models");

const authenticator = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!(authorization && authorization.toLowerCase().startsWith("bearer "))) {
    return res.status(401).json({ error: "token missing" });
  }

  const token = authorization.substring(7);

  try {
    const decodedToken = jwt.verify(token, SECRET);

    const session = await Session.findOne({
      where: {
        userId: decodedToken.id,
        token,
      },
    });

    if (!session) {
      return res.status(401).json({ error: "token expired" });
    }

    const user = await User.findByPk(decodedToken.id);
    if (!user || user.disabled) {
      return res.status(401).json({ error: "user account disabled" });
    }

    req.decodedToken = decodedToken;
    req.token = token;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      await Session.destroy({ where: { token } });
      return res.status(401).json({ error: "token expired" });
    }

    return res.status(401).json({ error: "token invalid" });
  }
};

module.exports = authenticator;
