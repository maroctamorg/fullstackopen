const { Session } = require("../models");

const logout = async (req, res, next) => {
  try {
    await Session.destroy({
      where: { userId: req.decodedToken.id },
    });

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  logout,
};
