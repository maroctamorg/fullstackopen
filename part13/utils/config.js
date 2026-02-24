require("dotenv").config();

const PORT = process.env.PORT || 3001;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DEBUG = String(process.env.DEBUG || "").toLowerCase() === "true";
const SECRET = process.env.SECRET || "your-secret-key";

module.exports = {
  PORT,
  DB_CONNECTION_STRING,
  DEBUG,
  SECRET,
};
