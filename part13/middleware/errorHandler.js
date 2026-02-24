const errorHandler = (error, _req, res, _next) => {
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({ error: "internal server error" });
};

module.exports = errorHandler;
