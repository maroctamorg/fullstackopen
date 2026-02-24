const { DEBUG } = require("../utils/config");

const requestLogger = (req, res, next) => {
  if (!DEBUG) {
    return next();
  }

  const start = Date.now();
  res.on("finish", () => {
    const durationMs = Date.now() - start;
    console.log(
      `[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`,
    );
  });

  return next();
};

module.exports = requestLogger;