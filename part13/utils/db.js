const { Sequelize } = require("sequelize");
const { DB_CONNECTION_STRING, DEBUG } = require("./config");

const sequelize = new Sequelize(DB_CONNECTION_STRING, {
  logging: DEBUG ? console.log : false,
});

const connectToDatabase = async () => {
  await sequelize.authenticate();
};

module.exports = {
  sequelize,
  connectToDatabase,
};
